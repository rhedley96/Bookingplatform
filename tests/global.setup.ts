import { mkdir } from 'node:fs/promises';  //creates a auth file 
import { dirname, resolve } from 'node:path'; // builds the path for the file 
import { expect, test as setup } from '@playwright/test';
import { USER_CREDENTIALS } from '../src/test-data/testData';

const authStatePath = resolve(process.cwd(), 'playwright/.auth/member.json');
const adminAuthFile = resolve(process.cwd(), 'playwright/.auth/admin.json');

setup('authenticate as member', async ({ page }) => {
  await mkdir(dirname(authStatePath), { recursive: true });
  await page.goto('/auth/login');
  await page.getByPlaceholder('Email').fill(USER_CREDENTIALS.member.email);
  await page.getByPlaceholder('Password').fill(USER_CREDENTIALS.member.password);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page).toHaveURL('/lakeview-bowls');
  await page.context().storageState({ path: authStatePath });
});


setup('authenticate as admin', async ({ page }) => {
  await mkdir(dirname(adminAuthFile), { recursive: true });

  await page.goto('/auth/login');
  await page.getByPlaceholder('Email').fill(USER_CREDENTIALS.admin.email);
  await page.getByPlaceholder('Password').fill(USER_CREDENTIALS.admin.password);
  await page.getByRole('button', { name: 'Sign In' }).click();

  await expect(
    page.getByRole('button', { name: 'Sign Out' }),
  ).toBeVisible();

  await page.context().storageState({ path: adminAuthFile });
});