import { test, expect } from '@playwright/test';

test('renders amino acid info', async ({ page }) => {
  await page.goto('/');

  // Check title
  await expect(page.locator('h1')).toHaveText('Amino Acid Curriculum');

  // Check Alanine info
  await expect(page.locator('h2')).toHaveText('Alanine (Ala)');
  await expect(page.getByText('Class: Nonpolar')).toBeVisible();
  await expect(page.getByText('Codons: GCU, GCC, GCA, GCG')).toBeVisible();

  // Check if SVG is rendered
  const svg = page.locator('svg');
  await expect(svg).toBeVisible();

  // Check if some atoms are rendered (Alanine has 6 atoms in JSON)
  const circles = svg.locator('circle');
  await expect(circles).toHaveCount(6);

  // Capture screenshot
  await page.screenshot({ path: 'test-results/alanine-2d.png' });
});
