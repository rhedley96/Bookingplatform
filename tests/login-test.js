import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 1,
  iterations: 1,
};

const BASE_URL = (__ENV.BASE_URL || 'http://localhost:3000').replace(/\/$/, '');

export default function () {
  const email = __ENV.TEST_EMAIL;
  const password = __ENV.TEST_PASSWORD;
  if (!email || !password) {
    throw new Error('Set TEST_EMAIL and TEST_PASSWORD to a test account');
  }

  const csrf = http.get(`${BASE_URL}/api/auth/csrf`).json('csrfToken');

  const login = http.post(
    `${BASE_URL}/api/auth/callback/credentials`,
    {
      csrfToken: csrf,
      callbackUrl: `${BASE_URL}/dashboard`,
      json: 'true',
      email,
      password,
    },
  );
  check(login, { 'login request succeeds': (r) => r.status === 200 });

  const sessionRes = http.get(`${BASE_URL}/api/auth/session`);
  const loggedIn = check(sessionRes, {
    'logged in as test account': (r) => r.status === 200 && r.json('user.email') === email,
  });
  if (!loggedIn) return;

  const dashboardRes = http.get(`${BASE_URL}/dashboard/bookings`);
  check(dashboardRes, {
    'member bookings dashboard loads': (r) => r.status === 200,
  });

  const bookingsRes = http.get(`${BASE_URL}/api/bookings`);
  check(bookingsRes, {
    'authenticated bookings data loads': (r) => r.status === 200,
  });
}