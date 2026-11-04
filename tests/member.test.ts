import { test, expect, type Page } from '@playwright/test';
import { LoginPage } from '../src/pages/login-page';
import { HomePage } from '../src/pages/home-page';
import { BookingPage } from '../src/pages/booking-page';

let loginPage: LoginPage;
let homePage: HomePage;
let bookingPage: BookingPage;

test.beforeEach(async({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    bookingPage = new BookingPage(page);
});

//invalid login test
test('invalid login', async ({ page }) => {
  await page.goto(`/`);
  await homePage.clickSignIn();
  await page.waitForLoadState();
  await expect(page).toHaveURL(`/auth/login`);
  await loginPage.login('memberb@email.com', 'fakepassword');
  await page.waitForLoadState();
  await expect(page).toHaveURL(`/auth/login`);
await expect(page.getByText('Invalid email or password')).toBeVisible();
});

    //signs the user in before every test in this describe block
  test.describe('Member Login', () => {
  test.use({ storageState: '.auth/member.json' });
 //navigate to the lakeview-bowls page before each test in this describe block
  test.beforeEach(async ({ page }) => {
    await page.goto(`/lakeview-bowls`);
  });

//valid login test
test('valid login', async ({ page }) => {
  await expect(page).toHaveTitle(/Management Platform/);
});

// booking rink test
test('booking rink', async ({ page }) => {
    await page.waitForLoadState();
  await bookingPage.navigateToBooking();
  await bookingPage.selectRinkSlot('Book Rink 1 at 09:');
  await bookingPage.confirmBooking();
    await expect(bookingPage.successMessage).toBeVisible();
});


  //member sign out test
  test('member can sign out', async ({ page }) => {
    await page.getByRole('button', { name: 'Sign Out' }).click();
    await expect(page).toHaveURL(`/`);
    await expect(page.getByRole('link', { name: 'Sign In' })).toBeVisible();
});

//check availability test
test('member can check availability of rinks', async ({ page }) => {
    await page.getByRole('link', { name: 'Check Availability' }).click();
    await page.waitForLoadState();
    await expect(page).toHaveURL(`/lakeview-bowls/availability`);
    await expect(page.getByRole('heading', { name: 'Main Green' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'All Weather Green' })).toBeVisible();
});

});   