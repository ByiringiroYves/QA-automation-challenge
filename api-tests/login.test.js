    // api-tests/login.test.js
    const request = require('supertest');
    const { expect } = require('chai'); // Using Chai for assertions

    // Importing the Express app 
    // We'll need to modify server.js slightly to export the app.
    const app = require('../node-backend/server'); // Adjust path as needed

    describe('Auth API Endpoints', () => {
     
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
    