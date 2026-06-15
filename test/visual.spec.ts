import { test, expect } from '@playwright/test';

test('renders amino acid info', async ({ page }) => {
  await page.goto('/');

  // Check title
  await expect(page.locator('h1')).toHaveText('Amino Acid Curriculum');

  // Check Alanine info
  await expect(page.locator('h2')).toHaveText('Alanine (Ala)');
  const infoText = await page.locator('div:has(h2) >> p').allTextContents();
  expect(infoText.some(t => t.includes('Class: Nonpolar'))).toBeTruthy();
  expect(infoText.some(t => t.includes('Codons: GCU, GCC, GCA, GCG'))).toBeTruthy();

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
