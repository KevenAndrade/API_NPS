import request from 'supertest';
import { app } from '../app';
import createConnection from '../database';

describe('Surveys', () => {
    beforeAll(async() => {
        const connect = await createConnection();
        await connect.runMigrations();
    });

    it('should create a new Servey ', async () => {
        const response = await request(app).post("/surveys").send({
            title: 'Survey exemple',
            description: 'Survey description',
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        
    });

    it('should to get all survey',async () => {
        await request(app).post("/surveys").send({
            title: 'Survey exemple2',
            description: 'Survey description2',
        });

        const response = await request(app).get("/surveys");

        expect(response.body.length).toBe(2)
    })
});