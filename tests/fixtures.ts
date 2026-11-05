import { expect, test as base, Page } from '@playwright/test';
import { BookingPage } from '../src/pages/booking-page';
import { HomePage } from '../src/pages/home-page';
import { LoginPage } from '../src/pages/login-page';
import { USER_CREDENTIALS } from '@/test-data/testData';
import { RegisteringPage } from '@/pages/registering-page';

type Fixtures = {
  bookingPage: BookingPage;
  homePage: HomePage;
  loginPage: LoginPage;
  loggedInUser: Page;
  registeringPage: RegisteringPage;
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
  registeringPage: async ({ page }, use) => {
    await use(new RegisteringPage(page));
  },
});


export { expect };