import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('homepage loads with hero section', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('New Moon');
    await expect(page.locator('nav')).toBeVisible();
  });

  test('can navigate to Music page', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="/music"]');
    await expect(page).toHaveURL('/music');
    await expect(page.locator('h1')).toContainText('Music');
  });

  test('can navigate to Shows page', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="/shows"]');
    await expect(page).toHaveURL('/shows');
    await expect(page.locator('h1')).toContainText('Shows');
  });

  test('can navigate to Merch page', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="/merch"]');
    await expect(page).toHaveURL('/merch');
    await expect(page.locator('h1')).toContainText('Merch');
  });

  test('SWIM logo links to homepage', async ({ page }) => {
    await page.goto('/music');
    await page.click('a:has-text("SWIM")');
    await expect(page).toHaveURL('/');
  });

  test('footer renders with social links', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('footer')).toContainText('SWIM');
  });
});
