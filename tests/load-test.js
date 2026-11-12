import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '15s', target: 10 },  // Baseline load
    { duration: '15s', target: 50 },  // Heavy load
    { duration: '15s', target: 660 }, // Stress load (pushing for slowdowns/errors)
    { duration: '15s', target: 0 },   // Cool down
  ],
};


export default function () {
  // 1. User opens the Homepage
  const homeRes = http.get('http://localhost:3000/');
  check(homeRes, { 'Homepage status 200': (r) => r.status === 200 });
  sleep(1); // Pause 1 second to simulate reading

  // 2. User navigates to the Bookings page
  const bookingRes = http.get('http://localhost:3000/dashboard/bookings');
  check(bookingRes, { 'Booking status 200': (r) => r.status === 200 });
  sleep(1);
}
