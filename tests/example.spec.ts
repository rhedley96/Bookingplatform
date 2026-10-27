import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Club Management Platform/);
});

test('has header', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Expects page to have a heading with the name of Browse Clubs
  await expect(page.getByRole('heading', { name: 'Browse Clubs' })).toBeVisible();
});
