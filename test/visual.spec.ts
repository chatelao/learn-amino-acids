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
  await page.screenshot({ path: 'test-results/alanine-all-modes.png' });
});

test('verifies 3D rendering modes', async ({ page }) => {
  await page.goto('/');

  // Check if Stick model canvas is present
  const stickContainer = page.locator('h3:has-text("Stick Model") + div');
  await expect(stickContainer.locator('canvas')).toBeVisible();

  // Check if Ball model canvas is present
  const ballContainer = page.locator('h3:has-text("Ball Model") + div');
  await expect(ballContainer.locator('canvas')).toBeVisible();
});
