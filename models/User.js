const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const pool = mysql.createPool(config.database);

const User = {
  findById: async (id) => {
    const [rows] = await pool.execute(
      'SELECT id, username, email, role FROM users WHERE id = ?',
      [id]
    );
    return rows[0];
  },

  findByEmail: async (email) => {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0];
  },

  create: async (userData) => {
    const { username, email, password, role = 'user' } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const [result] = await pool.execute(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, role]
    );
    
    return { id: result.insertId, username, email, role };
  },

  comparePassword: async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
  },

  // Admin functions
  getAllUsers: async () => {
    const [rows] = await pool.execute(
      'SELECT id, username, email, role, created_at FROM users'
    );
    return rows;
  },

  updateUserRole: async (userId, role) => {
    const [result] = await pool.execute(
      'UPDATE users SET role = ? WHERE id = ?',
      [role, userId]
    );
    
    if (result.affectedRows === 0) {
      return null;
    }

    const [rows] = await pool.execute(
      'SELECT id, username, email, role FROM users WHERE id = ?',
      [userId]
    );
    return rows[0];
  },

  deleteUser: async (userId) => {
    const [result] = await pool.execute(
      'DELETE FROM users WHERE id = ?',
      [userId]
    );
    return result.affectedRows > 0;
  },

  // Admin statistics
  getStatistics: async () => {
    const stats = {
      totalUsers: 0,
      usersByRole: {},
      recentUsers: []
    };

    // Get total users and role distribution
    const [roleStats] = await pool.execute(
      'SELECT role, COUNT(*) as count FROM users GROUP BY role'
    );
    
    roleStats.forEach(stat => {
      stats.totalUsers += stat.count;
      stats.usersByRole[stat.role] = stat.count;
    });

    // Get recent users
    const [recentUsers] = await pool.execute(
      'SELECT id, username, email, role, created_at FROM users ORDER BY created_at DESC LIMIT 5'
    );
    stats.recentUsers = recentUsers;

    return stats;
  }
};

module.exports = User;
