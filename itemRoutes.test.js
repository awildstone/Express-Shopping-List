process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('./app');

let items = require('./fakeDb');
let cheetos = {"name": "cheetos", "price": "1.99"};

beforeEach(() => {
    items.push(cheetos);
});

afterEach(() => {
    items.length = 0;
});

describe('GET /items', () => {

    test('Get all items', async () => {
        let res = await request(app).get('/items');
        expect(res.status).toBe(200);
        expect(res.body).toEqual([cheetos]);
    });

});

describe('POST /items', () => {

    test('Create new item', async () => {
        let cookies = {"name": "cookies", "price": "2.50"};
        let res = await request(app).post('/items').send(cookies);
        expect(res.status).toBe(201);
        expect(res.body).toEqual({added: cookies});
    });

    test('Try to create a new item with no data.', async () => {
        let res = await request(app).post('/items').send({});
        expect(res.status).toBe(400);
    });

    test('Try to create a new item with no name.', async () => {
        let cookies = {"price": "2.50"};
        let res = await request(app).post('/items').send(cookies);
        expect(res.status).toBe(400);
    });

    test('Try to create a new item with no price.', async () => {
        let cookies = {"name": "cookies"};
        let res = await request(app).post('/items').send(cookies);
        expect(res.status).toBe(400);
    });

    test('Try to create a new item that already exists in the DB.', async () => {
        let cheetos = {"name": "cheetos", "price": "0.99"};
        let res = await request(app).post('/items').send(cheetos);
        expect(res.status).toBe(409);
    });

});

describe('GET /items/:name', () => {

    test('Get an item by name.', async () => {
        let res = await request(app).get(`/items/${cheetos.name}`);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(cheetos);
    });

    test('Try to get an item that does not exist.', async () => {
        let res = await request(app).get('/items/eggs');
        expect(res.status).toBe(404);
    });

});

describe('PATCH /items/:name', () => {

    test('Update an item by name.', async () => {
        let updatedCheetos = {"name": "cheetos", "price": "0.99"};
        let res = await request(app).patch(`/items/${cheetos.name}`).send(updatedCheetos);
        expect(res.status).toBe(200);
        expect(res.body).toEqual({updated: updatedCheetos});
    });

    test('Try to update an item that does not exist.', async () => {
        let test = {"name": "eggs", "price": "4.99"};
        let res = await request(app).patch(`/items/${test.name}`).send(test);
        expect(res.status).toBe(404);
    });

    test('Try to update an item with no data.', async () => {
        let res = await request(app).patch(`/items/${test.name}`).send({});
        expect(res.status).toBe(400);
    });

    test('Try to update an item with no name in data.', async () => {
        let noName = {"price": "4.99"};
        let res = await request(app).patch(`/items/${test.name}`).send(noName);
        expect(res.status).toBe(400);
    });

    test('Try to update an item with no price in data.', async () => {
        let noPrice = {"name": "eggs"};
        let res = await request(app).patch(`/items/${test.name}`).send(noPrice);
        expect(res.status).toBe(400);
    });
});

describe('DELETE /items/:name', () => {

    test('Delete an item by name.', async () => {
        let res = await request(app).delete(`/items/${cheetos.name}`);
        expect(res.status).toBe(200);
        expect(res.body).toEqual({message: 'deleted'});
    });

    test('Try to delete an item that does not exist.', async () => {
        let res = await request(app).delete('/items/eggs');
        expect(res.status).toBe(404);
    });
});