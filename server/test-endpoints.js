require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');

const app = require('./app');
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/TESTT';

console.log('=== Testing Backend Endpoints ===\n');

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    
    const server = app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}\n`);
      
      // Test endpoints after server starts
      testEndpoints(server);
    });
  } catch (error) {
    console.error('❌ Server startup failed:', error.message);
    process.exit(1);
  }
};

const testEndpoints = async (server) => {
  const http = require('http');
  
  const endpoints = [
    { method: 'GET', path: '/api/rage/wall', name: 'Wall of Shame' },
  ];

  for (const endpoint of endpoints) {
    console.log(`Testing: ${endpoint.name} (${endpoint.method} ${endpoint.path})`);
    
    try {
      const req = http.request({
        hostname: 'localhost',
        port: PORT,
        path: endpoint.path,
        method: endpoint.method,
        headers: {
          'Content-Type': 'application/json',
        },
      }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            console.log(`  Status: ${res.statusCode}`);
            console.log(`  Response: ${JSON.stringify(parsed).substring(0, 100)}...`);
          } catch (e) {
            console.log(`  Status: ${res.statusCode}`);
            console.log(`  Response: ${data.substring(0, 100)}`);
          }
          console.log('');
        });
      });

      req.on('error', (error) => {
        console.error(`  ❌ Error: ${error.message}\n`);
      });

      if (endpoint.method === 'POST') {
        req.write(JSON.stringify({}));
      }
      req.end();
    } catch (error) {
      console.error(`  ❌ Error: ${error.message}\n`);
    }
  }

  // Test Shame Report after a delay
  setTimeout(() => {
    console.log('Testing: Generate Shame Report (POST /api/rage/shame-report)');
    const req = http.request({
      hostname: 'localhost',
      port: PORT,
      path: '/api/rage/shame-report',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (res.statusCode !== 200) {
            console.log(`  ❌ Status: ${res.statusCode}`);
            console.log(`  Error: ${parsed.message || JSON.stringify(parsed)}`);
          } else {
            console.log(`  ✅ Status: ${res.statusCode}`);
            console.log(`  Response: ${JSON.stringify(parsed).substring(0, 150)}...`);
          }
        } catch (e) {
          console.log(`  Status: ${res.statusCode}`);
          console.log(`  Response: ${data.substring(0, 100)}`);
        }
        
        console.log('\n=== Done ===\n');
        server.close();
        mongoose.connection.close();
      });
    });

    req.on('error', (error) => {
      console.error(`  ❌ Error: ${error.message}\n`);
      server.close();
      mongoose.connection.close();
    });

    req.write(JSON.stringify({}));
    req.end();
  }, 1000);
};

startServer();
