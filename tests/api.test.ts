import { expect, test } from "@playwright/test";


test('GET /api/bookings list', { tag: '@api' }, async ({ request }) => {
    const response =await request.get('api/bookings');
    expect (response.status()).toBe(200);
    const body =await response.json();
    expect(body.length).toBeGreaterThan(0)
    expect(body[0]).toHaveProperty('status');
    console.log(JSON.stringify(body[0], null, 2))
});

test('GET /api/booking list', { tag: '@api'}, async ({ request }) => {
    const response= await request.get('api/bookings');
    expect (response.status()).toBe(200);
    const body =await response.json();
    expect(body.length).toBeGreaterThan(0)
    expect(body[0]).toHaveProperty('id');
    console.log(JSON.stringify(body[0], null, 2))
});

