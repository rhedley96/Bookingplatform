import { expect, test } from "@playwright/test";
import { request } from "node:http";


test('GET /api/bookings list', { tag: '@api' }, async ({ request }) => {
    const response =await request.get('api/bookings');
    expect (response.status()).toBe(200);
    const body =await response.json();
    expect(body.length).toBeGreaterThan(0)
    expect(body[0]).toHaveProperty('status');
    console.log(JSON.stringify(body[0], null, 2))
});

test('POST api/auth/register rejects missing values', { tag: '@api'}, async ({ request }) => {
        const response =await request.get('api/auth/register', { data: {}});

            expect (response.status()).toBe(400);
            const body =await response.json();

})

