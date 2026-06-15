import { test, expect } from '@playwright/test';

test('renders amino acid info', async ({ page }) => {
  await page.goto('/');

  // Check title
  await expect(page.locator('h1')).toHaveText('Amino Acid Curriculum');

  // Check Alanine info (Alanine is the first one in the list)
  await expect(page.locator('h2')).toHaveText(/Alanine \(Ala \/ A\)/);

  const infoText = await page.locator('article p').allTextContents();
  expect(infoText.some(t => t.includes('Chemical Class:'))).toBeTruthy();
  expect(infoText.some(t => t.includes('Nonpolar'))).toBeTruthy();
  expect(infoText.some(t => t.includes('mRNA Codons:'))).toBeTruthy();

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

  // Use more precise text matching to avoid "Stick Model" matching "Ball & Stick Model"
  const stickContainer = page.locator('section').filter({ has: page.getByRole('heading', { name: 'Stick Model (3D)', exact: true }) });
  await expect(stickContainer.locator('canvas')).toBeVisible();

  const ballContainer = page.locator('section').filter({ has: page.getByRole('heading', { name: 'Ball & Stick Model (3D)', exact: true }) });
  await expect(ballContainer.locator('canvas')).toBeVisible();
});

test('verifies codon search', async ({ page }) => {
  await page.goto('/');

  // Search for Arginine codon 'CGU'
  const searchInput = page.locator('#codon-search');
  await searchInput.fill('CGU');

  // Check if Arginine is selected
  await expect(page.locator('h2')).toHaveText(/Arginine \(Arg \/ R\)/);

  await page.screenshot({ path: 'test-results/search-arginine.png' });
});

test('verifies chemical class filter', async ({ page }) => {
  await page.goto('/');

  // Select 'Acidic' from filter
  const classFilter = page.locator('#class-filter');
  await classFilter.selectOption('Acidic');

  // Check if only Acidic amino acids are in the selector (Aspartic acid and Glutamic acid)
  const aaSelect = page.locator('#aa-select');
  const options = await aaSelect.locator('option').allTextContents();

  expect(options).toContain('Aspartic acid (Asp)');
  expect(options).toContain('Glutamic acid (Glu)');
  expect(options.length).toBe(2);

  // Check if Aspartic acid is automatically selected
  await expect(page.locator('h2')).toHaveText(/Aspartic acid \(Asp \/ D\)/);

  await page.screenshot({ path: 'test-results/filter-acidic.png' });
});
