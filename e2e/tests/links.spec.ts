import { test, expect } from '@playwright/test';

test.describe('Dead link detection', () => {
  const pages = ['/', '/music', '/shows', '/about', '/merch'];

  for (const path of pages) {
    test(`${path} has no broken internal links`, async ({ page }) => {
      await page.goto(path);
      const links = await page.locator('a[href^="/"]').all();

      for (const link of links) {
        const href = await link.getAttribute('href');
        if (!href) continue;
        const response = await page.request.get(href);
        expect(response.status(), `Broken link: ${href} on ${path}`).toBeLessThan(400);
      }
    });
  }
});
