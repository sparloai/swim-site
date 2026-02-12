import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('renders all sections', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('New Moon');
    await expect(page.getByText('Listen Now')).toBeVisible();
    await expect(page.getByText('Latest Releases')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Otherside EP' })).toBeVisible();
    await expect(page.getByText('Gallery')).toBeVisible();
    await expect(page.getByText('Upcoming Shows')).toBeVisible();
  });

  test('Listen Now CTA links to streaming', async ({ page }) => {
    await page.goto('/');
    const cta = page.getByText('Listen Now');
    await expect(cta).toHaveAttribute('href', 'https://ffm.to/swimnewmoon');
  });

  test('has proper meta tags', async ({ page }) => {
    await page.goto('/');
    const title = await page.title();
    expect(title).toContain('SWIM');
  });
});
