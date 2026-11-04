import { expect, test as base, Page } from '@playwright/test';
import { BookingPage } from '../src/pages/booking-page';
import { HomePage } from '../src/pages/home-page';
import { LoginPage } from '../src/pages/login-page';
import { USER_CREDENTIALS } from '@/test-data/testData';

type Fixtures = {
  bookingPage: BookingPage;
  homePage: HomePage;
  loginPage: LoginPage;
  loggedInUser: Page;
};

export const test = base.extend<Fixtures>({
  bookingPage: async ({ page }, use) => {
    await use(new BookingPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  // Log in as a member before each test
  loggedInUser: async ({ page }, use) => {
    await page.goto('/auth/login');
    await page.getByPlaceholder('Email').fill(USER_CREDENTIALS.member.email);
    await page.getByPlaceholder('Password').fill(USER_CREDENTIALS.member.password);
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForURL('/lakeview-bowls');
    await use(page);
  }
});

export { expect };