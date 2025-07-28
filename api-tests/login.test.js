    // api-tests/login.test.js
    const request = require('supertest');
    const { expect } = require('chai'); // Using Chai for assertions

    // Import the Express app from your server.js
    // We'll need to modify server.js slightly to export the app.
    const app = require('../node-backend/server'); // Adjust path as needed

    describe('Auth API Endpoints', () => {
      // Before running tests, ensure the server is listening.
      // Supertest can automatically start and stop the server if you pass the app instance.
      // However, for this setup, we'll assume the server is already running via `node server.js`.
      // If you were to run these tests in isolation, Supertest can manage the server lifecycle.

      it('POST /login - should successfully log in with valid credentials', async () => {
        const res = await request(app)
          .post('/login')
          .send({ username: 'apiuser', password: 'apipassword123' });

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property('message', 'Login successful');
        expect(res.body).to.have.property('token', 'valid_token');
      });

      it('POST /login - should return 401 for invalid credentials', async () => {
        const res = await request(app)
          .post('/login')
          .send({ username: 'wronguser', password: 'wrongpassword' });

        expect(res.statusCode).to.equal(401);
        expect(res.body).to.have.property('message', 'Invalid credentials');
      });

      it('POST /login - should return 401 for missing credentials', async () => {
        const res = await request(app)
          .post('/login')
          .send({}); // Empty body

        expect(res.statusCode).to.equal(401);
        expect(res.body).to.have.property('message', 'Invalid credentials'); // Our API returns this for missing too
      });
    });
    