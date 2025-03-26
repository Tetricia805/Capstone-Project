const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const config = require('./database');

async function setupDatabase() {
  try {
    // Create connection
    const connection = await mysql.createConnection({
      host: config.database.host,
      user: config.database.user,
      password: config.database.password,
    });

    // Create and use database
    await connection.query('CREATE DATABASE IF NOT EXISTS job_portal');
    await connection.query('USE job_portal');

    // Create users table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('job_seeker', 'employer', 'admin') NOT NULL DEFAULT 'job_seeker',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create administrators table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS administrators (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin') NOT NULL DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create jobs table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS jobs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        employer_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        company VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        type ENUM('full-time', 'part-time', 'contract', 'remote') NOT NULL,
        description TEXT NOT NULL,
        requirements TEXT NOT NULL,
        salary DECIMAL(10, 2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (employer_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Create applications table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS applications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        job_id INT NOT NULL,
        applicant_id INT NOT NULL,
        cover_letter TEXT NOT NULL,
        status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
        FOREIGN KEY (applicant_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Create admin user if it doesn't exist
    const hashedPassword = await bcrypt.hash('admin123', 10);
    try {
      await connection.query(`
        INSERT INTO administrators (username, email, password)
        VALUES ('admin', 'admin@jobportal.com', ?)
      `, [hashedPassword]);
      console.log('Admin user created successfully');
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        console.log('Admin user already exists');
      } else {
        throw err;
      }
    }

    console.log('Database setup completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase();
