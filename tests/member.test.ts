import { BOOKINGS } from '@/utils/testHelpers';
import { USER_CREDENTIALS } from '@/test-data/testData';
import { test, expect } from './fixtures';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    console.error(`Test failed: ${testInfo.title}`);
    console.error(`Page URL: ${page.url()}`);
  }
});
  
  //member sign out test
  test('member can sign out', async ({ loggedInUser }) => {
    await loggedInUser.getByRole('button', { name: 'Sign Out' }).click();
    await expect(loggedInUser).toHaveURL('/');
    await expect(loggedInUser.getByRole('link', { name: 'Sign In' })).toBeVisible();
});

test('register new member', async ({ page }) => {
  await page.goto('/auth/register');
  await page.getByPlaceholder('First Name').fill('John');
  await page.getByPlaceholder('Last Name').fill('Doe');
  await page.getByPlaceholder('Email').fill('john.doe@email.com');
  await page.getByPlaceholder('Password').fill('password');
  await page.getByRole('button', { name: 'Register' }).click();
});

  test.describe('security tests', () => {
//invalid login test
test('invalid login', async ({ page, homePage, loginPage }) => {
  await homePage.clickSignIn();
  await page.waitForLoadState();
  await expect(page).toHaveURL('/auth/login');

  await loginPage.login(USER_CREDENTIALS.member.email, USER_CREDENTIALS.member.invalidPassword);
  await page.waitForLoadState();
  await expect(page).toHaveURL('/auth/login');
await expect(page.getByText('Invalid email or password')).toBeVisible();
});

//valid login test
test('valid login', async ({ loggedInUser }) => {
  await expect(loggedInUser).toHaveTitle(/Management Platform/);
  console.log('Logged in successfully as member');
});
});

test.describe('Platform navigation', () => {
// booking rink test
test('booking rink', async ({ loggedInUser, bookingPage }) => {
  await bookingPage.navigateToBooking();
  await bookingPage.selectRinkSlot(BOOKINGS.rink1.fullMessage);
  await bookingPage.confirmBooking();
  await expect(bookingPage.successMessage).toBeVisible();
});

//check availability test
test('member can check availability of rinks', async ({ loggedInUser }) => {
    await loggedInUser.getByRole('link', { name: 'Check Availability' }).click();
    await loggedInUser.waitForLoadState();
    await expect(loggedInUser).toHaveURL('/lakeview-bowls/availability');
    await expect(loggedInUser.getByRole('heading', { name: 'Main Green' })).toBeVisible();
    await expect(loggedInUser.getByRole('heading', { name: 'All Weather Green' })).toBeVisible();
});
});