import { expect, test } from "@playwright/test";

test('GET /api/bookings list', { tag: '@api' }, async ({ request }) => {
    const response =await request.get('api/bookings');
    expect (response.status()).toBe(200);
    const body =await response.json();
    expect(body.length).toBeGreaterThan(0)
    expect(body[0]).toHaveProperty('status');
});


test("POST /api/auth/register rejects missing values", { tag: "@api" }, async ({ request }, testInfo) => {
  const response = await request.post("/api/auth/register", { data: {} });
  const responseBody = await response.text();
  await testInfo.attach("registration-response-body", {
    body: responseBody,
    contentType: response.headers()["content-type"] ?? "text/plain",
  });

  expect(response.status()).toBe(400);
  expect(JSON.parse(responseBody)).toEqual({
    error: "Email and password required",
  });
});