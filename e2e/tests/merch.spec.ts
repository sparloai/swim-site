import { test, expect } from '@playwright/test';

test.describe('Merch (no token)', () => {
  test('shows coming soon message when no API token', async ({ page }) => {
    await page.goto('/merch');
    await expect(page.locator('h1')).toContainText('Merch');
    await expect(page.getByText('coming soon')).toBeVisible();
  });

  test('cart icon renders in empty state', async ({ page }) => {
    await page.goto('/merch');
    const cartButton = page.locator('button[aria-label*="Cart"]');
    await expect(cartButton).toBeVisible();
  });
});
