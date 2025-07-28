    // api-tests/items.test.js
    const request = require('supertest');
    const { expect } = require('chai');

    const app = require('../node-backend/server'); // Adjust path as needed

    // We'll store the token obtained from login to use in subsequent tests
    let authToken = '';
    let createdUserId = ''; // To store ID of created user for update/delete tests

    describe('Items API Endpoints (CRUD)', () => {
      // Before all tests in this suite, log in to get an auth token
      before(async () => {
        const res = await request(app)
          .post('/login')
          .send({ username: 'apiuser', password: 'apipassword123' });

        expect(res.statusCode).to.equal(200);
        authToken = res.body.token;
        expect(authToken).to.exist;
      });

      it('GET /items - Positive test case ==> should retrieve all items (users) with valid token', async () => {
        const res = await request(app)
          .get('/items')
          .set('Authorization', `Bearer ${authToken}`); // Set auth header

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.at.least(3); // Initial dummy users
        expect(res.body[0]).to.have.property('name', 'Alice Smith');
      });

      it('GET /items - Negative test case ==> should return 401 without authentication token', async () => {
        const res = await request(app)
          .get('/items'); // No auth header

        expect(res.statusCode).to.equal(401);
        expect(res.body).to.have.property('message', 'Authentication token required');
      });

      it('POST /items - Positive ==> should create a new item (user) with valid token', async () => {
        const newUser = { name: 'API Test User', email: 'api.test.user@example.com', role: 'User' };
        const res = await request(app)
          .post('/items')
          .set('Authorization', `Bearer ${authToken}`)
          .send(newUser);

        expect(res.statusCode).to.equal(201);
        expect(res.body).to.have.property('message', 'User created successfully');
        expect(res.body.user).to.have.property('id');
        expect(res.body.user).to.include(newUser); // Check if created user includes submitted data
        createdUserId = res.body.user.id; // Store ID for subsequent tests
      });

      it('POST /items Negative test case ==> should return 400 for missing fields when creating user', async () => {
        const res = await request(app)
          .post('/items')
          .set('Authorization', `Bearer ${authToken}`)
          .send({ name: 'Partial User' }); // Missing email

        expect(res.statusCode).to.equal(400);
        expect(res.body).to.have.property('message', 'Name and email are required');
      });

      it('POST /items - Negative test case ==> should return 409 for duplicate email when creating user', async () => {
        const res = await request(app)
          .post('/items')
          .set('Authorization', `Bearer ${authToken}`)
          .send({ name: 'Duplicate User', email: 'alice@example.com' }); // Existing email

        expect(res.statusCode).to.equal(409);
        expect(res.body).to.have.property('message', 'User with this email already exists');
      });

      it('PUT /items/:id - Positive test case ==> should update an existing item (user) with valid token', async () => {
        // Ensure the user exists (from initial data or previous create test)
        const userToUpdateId = '1'; // Alice Smith's ID
        const updatedData = { name: 'Alice Updated API', email: 'alice.updated.api@example.com', role: 'Admin' };
        const res = await request(app)
          .put(`/items/${userToUpdateId}`)
          .set('Authorization', `Bearer ${authToken}`)
          .send(updatedData);

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property('message', 'User updated successfully');
        expect(res.body.user).to.include(updatedData);
        expect(res.body.user).to.have.property('id', userToUpdateId);
      });

      it('PUT /items/:id - Negative test case ==> should return 404 for non-existent user ID', async () => {
        const res = await request(app)
          .put('/items/nonexistentid')
          .set('Authorization', `Bearer ${authToken}`)
          .send({ name: 'Non Existent', email: 'nonexistent@example.com' });

        expect(res.statusCode).to.equal(404);
        expect(res.body).to.have.property('message', 'User not found');
      });

      it('PUT /items/:id -  Negative test case ==> should return 400 for missing fields when updating user', async () => {
        const res = await request(app)
          .put(`/items/${createdUserId}`) // Use the ID of the user we just created
          .set('Authorization', `Bearer ${authToken}`)
          .send({ name: '' }); // Missing email and empty name

        expect(res.statusCode).to.equal(400);
        expect(res.body).to.have.property('message', 'Name and email are required');
      });

      it('PUT /items/:id - Negative test case ==> should return 409 for duplicate email when updating user', async () => {
        // Creating a temporary user to cause a conflict
        const tempUser = { name: 'Temp', email: 'temp@example.com', role: 'User' };
        const createRes = await request(app)
          .post('/items')
          .set('Authorization', `Bearer ${authToken}`)
          .send(tempUser);
        const tempUserId = createRes.body.user.id;

        // Try to update Alice (ID 1) with tempUser's email
        const res = await request(app)
          .put('/items/1') // Alice's ID
          .set('Authorization', `Bearer ${authToken}`)
          .send({ email: tempUser.email }); // Try to change Alice's email to tempUser's email

        expect(res.statusCode).to.equal(409);
        expect(res.body).to.have.property('message', 'User with this email already exists');

        // Clean up the temporary user
        await request(app)
          .delete(`/items/${tempUserId}`)
          .set('Authorization', `Bearer ${authToken}`);
      });

      it('DELETE /items/:id Positive test case ==> should delete an existing item (user) with valid token', async () => {
        // Use the ID of the user we created earlier
        const res = await request(app)
          .delete(`/items/${createdUserId}`)
          .set('Authorization', `Bearer ${authToken}`);

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property('message', 'User deleted successfully');

        // Verify it's actually deleted by trying to get all items
        const getRes = await request(app)
          .get('/items')
          .set('Authorization', `Bearer ${authToken}`);
        const deletedUserExists = getRes.body.some(user => user.id === createdUserId);
        expect(deletedUserExists).to.be.false;
      });

      it('DELETE /items/:id - Negative test case ==> should return 404 for non-existent user ID', async () => {
        const res = await request(app)
          .delete('/items/nonexistentid')
          .set('Authorization', `Bearer ${authToken}`);

        expect(res.statusCode).to.equal(404);
        expect(res.body).to.have.property('message', 'User not found');
      });
    });
    