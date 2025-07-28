    // node-backend/server.js
    const express = require('express');
    const bodyParser = require('body-parser');
    const cors = require('cors');

    const app = express();
    const PORT = 5000;

    // Middleware
    app.use(cors());
    app.use(bodyParser.json());

    // In-memory "database" for users (items)
    let users = [
      { id: '1', name: 'Alice Smith', email: 'alice@example.com', role: 'Admin' },
      { id: '2', name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
      { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', role: 'User' },
    ];

    // Simple authentication middleware (simulated)
    const authenticateToken = (req, res, next) => {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1]; // Expects "Bearer TOKEN"

      if (token == null) {
        return res.status(401).json({ message: 'Authentication token required' });
      }

      if (token === 'valid_token') {
        next();
      } else {
        return res.status(403).json({ message: 'Invalid token' });
      }
    };

    // --- API Endpoints ---

    // POST /login
    app.post('/login', (req, res) => {
      const { username, password } = req.body;

      if (username === 'apiuser' && password === 'apipassword123') {
        res.status(200).json({ message: 'Login successful', token: 'valid_token' });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    });

    // GET /items (Get all users) - Requires authentication
    app.get('/items', authenticateToken, (req, res) => {
      res.status(200).json(users);
    });

    // POST /items (Create a new user) - Requires authentication
    app.post('/items', authenticateToken, (req, res) => {
      const { name, email, role } = req.body;

      if (!name || !email) {
        return res.status(400).json({ message: 'Name and email are required' });
      }
      if (users.some(u => u.email === email)) {
        return res.status(409).json({ message: 'User with this email already exists' });
      }

      const newUser = {
        id: String(Date.now()),
        name,
        email,
        role: role || 'User'
      };
      users.push(newUser);
      res.status(201).json({ message: 'User created successfully', user: newUser });
    });

    // PUT /items/:id (Update an existing user) - Requires authentication
app.put('/items/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body; // Destructure all potential fields

  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Get the existing user's data to merge with updates
  let existingUser = users[userIndex];
  let updatedUser = { ...existingUser }; // Start with existing data

  // Apply updates only if provided in the request body
  if (name !== undefined) { // Check if name is explicitly provided (can be empty string)
      updatedUser.name = name;
  }
  if (email !== undefined) { // Check if email is explicitly provided
      updatedUser.email = email;
  }
  if (role !== undefined) { // Check if role is explicitly provided
      updatedUser.role = role;
  }


  // 1. Basic validation for required fields (after applying updates)
  if (!updatedUser.name || !updatedUser.email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  // 2. Check for email conflict (only if email was provided in the request body OR if the email changed)
  if (email !== undefined && users.some(u => u.email === updatedUser.email && u.id !== id)) {
    return res.status(409).json({ message: 'User with this email already exists' });
  }

  users[userIndex] = updatedUser; // Update the user in the array
  res.status(200).json({ message: 'User updated successfully', user: users[userIndex] });
});

    // DELETE /items/:id (Delete a user) - Requires authentication
    app.delete('/items/:id', authenticateToken, (req, res) => {
      const { id } = req.params;

      const initialLength = users.length;
      users = users.filter(u => u.id !== id);

      if (users.length === initialLength) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
    });

    // Export the app for testing purposes
    module.exports = app;

    // Start the server only if this file is run directly (not imported as a module)
    if (require.main === module) {
      app.listen(PORT, () => {
        console.log(`Node.js API running on http://localhost:${PORT}`);
        console.log('Endpoints:');
        console.log(`  POST /login (username: apiuser, password: apipassword123)`);
        console.log(`  GET /items (Auth: Bearer valid_token)`);
        console.log(`  POST /items (Auth: Bearer valid_token)`);
        console.log(`  PUT /items/:id (Auth: Bearer valid_token)`);
        console.log(`  DELETE /items/:id (Auth: Bearer valid_token)`);
      })
      .on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          console.error(`Port ${PORT} is already in use. Please free up the port or choose a different one.`);
        } else {
          console.error('Server failed to start:', err);
        }
        process.exit(1);
      });
    }
    