import request from 'supertest';
import { app } from '../app';
import createConnection from '../database';

describe('Users', () => {
    beforeAll(async() => {
        const connect = await createConnection();
        await connect.runMigrations();
    });

    it('should create a new user ', async () => {
        const response = await request(app).post("/users").send({
            email: "User@example.com",
            name: "User exmaple"
        });

        expect(response.status).toBe(201);
    });

    it('should not create a user whit the same email', async () => {
        const response = await request(app).post("/users").send({
            email: "User@example.com",
            name: "User exmaple"
        });

        expect(response.status).toBe(400);
    });
});