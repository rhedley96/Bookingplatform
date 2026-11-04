import { test, expect } from './fixtures';

//invalid login test
test('invalid login', async ({ page, homePage, loginPage }) => {
  await page.goto(`/`);
  await homePage.clickSignIn();
  await page.waitForLoadState();
  await expect(page).toHaveURL(`/auth/login`);
  
  await loginPage.login('memberb@email.com', 'fakepassword');
  await page.waitForLoadState();
  await expect(page).toHaveURL(`/auth/login`);
await expect(page.getByText('Invalid email or password')).toBeVisible();
});

//valid login test
test('valid login', async ({ loggedInUser }) => {
  await expect(loggedInUser).toHaveTitle(/Management Platform/);
  console.log('Logged in successfully as member');
});

// booking rink test
test('booking rink', async ({ loggedInUser, bookingPage }) => {
  await bookingPage.navigateToBooking();
  await bookingPage.selectRinkSlot('Book Rink 1 at 09:');
  await bookingPage.confirmBooking();
  await expect(bookingPage.successMessage).toBeVisible();
});

  //member sign out test
  test('member can sign out', async ({ loggedInUser }) => {
    await loggedInUser.getByRole('button', { name: 'Sign Out' }).click();
    await expect(loggedInUser).toHaveURL(`/`);
    await expect(loggedInUser.getByRole('link', { name: 'Sign In' })).toBeVisible();
});

//check availability test
test('member can check availability of rinks', async ({ loggedInUser }) => {
    await loggedInUser.getByRole('link', { name: 'Check Availability' }).click();
    await loggedInUser.waitForLoadState();
    await expect(loggedInUser).toHaveURL(`/lakeview-bowls/availability`);
    await expect(loggedInUser.getByRole('heading', { name: 'Main Green' })).toBeVisible();
    await expect(loggedInUser.getByRole('heading', { name: 'All Weather Green' })).toBeVisible();
});