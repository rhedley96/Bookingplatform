import { test, expect, type Page } from '@playwright/test';

const URL = 'http://localhost:3000'

async function loginAsMember({ page }: { page: Page }) {
    await page.goto(URL);
    await page.getByRole ('link', {name: "Sign In"}).click()

    await expect(page).toHaveURL ('http://localhost:3000/auth/login')

    await page.getByPlaceholder('Email').fill('memberb@email.com')
    await page.getByPlaceholder('Password').fill('password')
    await page.getByRole ('button', {name: "Sign In"}).click()
    await expect(page).toHaveURL ('http://localhost:3000/dashboard')

}

test('has title', async ({ page }) => {
  await page.goto(URL);

  await expect(page).toHaveTitle(/Club Management Platform/);
});

test('has header', async ({ page }) => {
  await page.goto(URL);

  await expect(page.getByRole('heading', { name: 'Browse Clubs' })).toBeVisible();
});


test('valid login', async ({ page }) => {
  await loginAsMember({page});
  await expect(page).toHaveTitle(/Management Platform/);


});

test('invalid login', async ({ page }) =>{
  
  await page.goto(URL);
  await page.getByRole ('link', {name: "Sign In"}).click()

  await expect(page).toHaveURL ('http://localhost:3000/auth/login')

  await page.getByPlaceholder('Email').fill('memberb@email.com')
  await page.getByPlaceholder('Password').fill('fakepassword')
  await page.getByRole ('button', {name: "Sign In"}).click()

  await expect(page).toHaveURL ('http://localhost:3000/auth/login')
  await expect(page.getByText('Invalid email or password')).toBeVisible();

});


test('booking rink', async ({ page }) => {
  await loginAsMember({page});

  await page.getByRole('link', { name: 'Book Now' }).click();
  await page.getByRole('button', { name: 'Book Rink 1 at 09:' }).click();
  await page.getByRole('button', { name: 'Request Booking' }).click();
  await expect(page.getByText('Booking requested for you successfully!')).toBeVisible();

  });