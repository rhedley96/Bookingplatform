import { test as setup, expect, Page } from '@playwright/test';

const URL = 'http://localhost:3000';

const memberFile = '.auth/member.json'


setup('authenticate as member', async ({ page }) => {
  await page.goto(URL);
  await page.getByRole('link', { name: 'Sign In' }).click();
  await expect(page).toHaveURL('http://localhost:3000/auth/login');

  await page.getByPlaceholder('Email').fill('memberb@email.com');
  await page.getByPlaceholder('Password').fill('password');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page).toHaveURL('http://localhost:3000/lakeview-bowls');

  await page.context().storageState({ path: memberFile });
});


// const adminFile = '.auth/admin.json'

// setup('authenticate as admin', async ({ page }) => {
//   await page.goto(URL);
//   await page.getByRole('link', { name: 'Sign In' }).click();
//   await expect(page).toHaveURL('http://localhost:3000/auth/login');

//   await page.getByPlaceholder('Email').fill('admin@wlbooking.com'); 
//   await page.getByPlaceholder('Password').fill('admin123'); 
//   await page.getByRole('button', { name: 'Sign In' }).click();
//   await expect(page).toHaveURL('http://localhost:3000/dashboard'); 

//   await page.context().storageState({ path: adminFile });
// });

