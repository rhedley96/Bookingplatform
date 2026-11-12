import { BOOKINGS } from '@/utils/testHelpers';
import { USER_CREDENTIALS, INVALID_LOGIN_CASES } from '@/test-data/testData';
import { test, expect } from './fixtures';
import { faker } from '@faker-js/faker'; //used to create a fake registration for a new member

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    console.error(`Test failed: ${testInfo.title}`);
    console.error(`Page URL: ${page.url()}`);
  }
});
test.describe('logged out user tests', () => {
  test.use({ storageState: { cookies: [], origins: [] } });
  
//register new member test
  test('user can register as a new member', async ({ registeringPage }) => {
    const randomName = faker.person.fullName();
    const randomEmail = faker.internet.email();
    const randomPassword = faker.internet.password();
    await registeringPage.navigateToRegistering();
    await registeringPage.register(randomName, randomEmail, randomPassword, '');
    await expect(registeringPage.successMessage).toBeVisible();
  });

 test.describe('login tests', () => {
   test.beforeEach(async ({ page }) => {
     await page.goto('/');
   });

   for (const testCase of INVALID_LOGIN_CASES) {
     test(`invalid login - ${testCase.case}`, async ({ page, homePage, loginPage }) => {
       await homePage.clickSignIn();
       await page.waitForLoadState();
       await expect(page).toHaveURL('/auth/login');

       await loginPage.login(testCase.email, testCase.password);
       await page.waitForLoadState();
       await expect(page).toHaveURL('/auth/login');
       await expect(page.getByText(testCase.error)).toBeVisible();
     });
   }

   test.describe('security tests', () => {
     test('user cannot log in with invalid credentials', async ({ page, homePage, loginPage }) => {
       await homePage.clickSignIn();
       await page.waitForLoadState();
       await expect(page).toHaveURL('/auth/login');

       await loginPage.login(USER_CREDENTIALS.member.email, USER_CREDENTIALS.member.invalidPassword);
       await page.waitForLoadState();
       await expect(page).toHaveURL('/auth/login');
       await expect(page.getByText('Invalid email or password')).toBeVisible();
     });
   });
 });
});

test.describe('Platform navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/lakeview-bowls');
  });

  test('member can sign out of a logged-in session', async ({ loggedInUser }) => {
    await loggedInUser.getByRole('button', { name: 'Sign Out' }).click();
    await expect(loggedInUser).toHaveURL('/');
    await expect(loggedInUser.getByRole('link', { name: 'Sign In' })).toBeVisible();
  });

// booking rink test
test('member can book a rink @smoke', async ({ loggedInUser, bookingPage }) => {
  await test.step('Open booking form', async () => {
    await bookingPage.navigateToBooking();
  });
  await test.step('Select a rink slot and submit booking', async () => {
    await bookingPage.selectRinkSlot(BOOKINGS.rink1.fullMessage);
    await bookingPage.confirmBooking();
  });
  await test.step('Verify booking confirmation', async () => {
    await expect(bookingPage.successMessage).toBeVisible();
  });
});

//check availability test
test('member can check availability of rinks', async ({ loggedInUser }) => {
    await loggedInUser.getByRole('link', { name: 'Check Availability' }).click();
    await loggedInUser.waitForLoadState();
    await expect(loggedInUser).toHaveURL('/lakeview-bowls/availability');
    await expect(loggedInUser.getByRole('heading', { name: 'Main Green' })).toBeVisible();
    await expect(loggedInUser.getByRole('heading', { name: 'All Weather Green' })).toBeVisible();
});
//member can log in with valid credentials test
test('member can log in with valid credentials', async ({ loggedInUser }) => {
  await expect(loggedInUser).toHaveTitle(/Management Platform/);
  console.log('Logged in successfully as member');
});

//test that will fail until the bug is fixed
//member cannot book a rink in the past
test('member books a rink in the past', 
  { 
  tag: '@defect',
  annotation: { 
    type: 'defect', 
    description: "DEF-002: booking made in the past"
  } 
  }, async ({ loggedInUser, bookingPage }) => {
  await bookingPage.navigateToBooking();
  await bookingPage.selectRinkSlot(BOOKINGS.rink1past.fullMessage);
  await bookingPage.confirmBooking();

  await expect(
    bookingPage.page.getByText('Bookings cannot be made in the past')
  ).toBeVisible();
});
});

//testing that a user cannot register with a password that is less than 8 characters long
test.describe('registration password validation', () => {
test('registration rejects a password that is less than 8 characters long',
  {
    tag: '@defect',
    annotation: {
      type: 'defect',
      description: 'DEF-004: user password validation',
    },
  },
  async ({ registeringPage }) => {
    const randomName = faker.person.fullName();
    const randomEmail = faker.internet.email();

    await registeringPage.navigateToRegistering();
    await registeringPage.register(randomName, randomEmail, 'short1!', '');

    await expect(
      registeringPage.page.getByText('Password must be at least 8 characters long')
    ).toBeVisible();
  }
);
//testing that a user cannot register with a password that does not contain a number
test('registration rejects a password that does not contain a number',
  {
    tag: '@defect',
    annotation: {
      type: 'defect',
      description: 'DEF-004: user password validation',
    },
  },
  async ({ registeringPage }) => {
    const randomName = faker.person.fullName();
    const randomEmail = faker.internet.email();
    await registeringPage.navigateToRegistering();
    await registeringPage.register(randomName, randomEmail, 'NoNumber!', '');
    
    await expect(
      registeringPage.page.getByText('Password must contain at least one number')
    ).toBeVisible();
  }
);
//testing that a user cannot register with a password that does not contain a special character
test('registration rejects a password that does not contain a special character',
  {
    tag: '@defect',
    annotation: {
      type: 'defect',
      description: 'DEF-004: user password validation',
    },
  },
  async ({ registeringPage }) => {
    const randomName = faker.person.fullName();
    const randomEmail = faker.internet.email();
    await registeringPage.navigateToRegistering();
    await registeringPage.register(randomName, randomEmail, 'NoSpecial1', '');

    await expect(
      registeringPage.page.getByText('Password must contain at least one special character')
    ).toBeVisible();
  }
);
});
