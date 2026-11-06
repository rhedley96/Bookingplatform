import { test as setup, expect } from './fixtures';


const memberFile = '.auth/member.json'

setup('authenticate as member', async ({ loginPage }) => {
  await loginPage.page.goto('/');
  await loginPage.page.getByRole('link', { name: 'Sign In' }).click();
  await expect(loginPage.page).toHaveURL('/auth/login');

  await loginPage.login('memberb@email.com', 'password');
  await expect(loginPage.page).toHaveURL('/lakeview-bowls');

  await loginPage.page.context().storageState({ path: memberFile });
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
