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

  // Check if some atoms are rendered (Alanine now has 13 atoms including hydrogens)
  const circles = svg.locator('circle');
  await expect(circles).toHaveCount(13);

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

test('verifies rendering of newly added amino acid Glutamine', async ({ page }) => {
  await page.goto('/');

  // Select Glutamine
  const aaSelect = page.locator('#aa-select');
  await aaSelect.selectOption('Gln');

  // Check info
  await expect(page.locator('h2')).toHaveText(/Glutamine \(Gln \/ Q\)/);

  // Check if SVG is rendered
  const svg = page.locator('svg');
  await expect(svg).toBeVisible();

  // Glutamine has 20 atoms now
  const circles = svg.locator('circle');
  await expect(circles).toHaveCount(20);

  // Check if 3D canvases are visible
  const stickCanvas = page.locator('section').filter({ has: page.getByRole('heading', { name: 'Stick Model (3D)', exact: true }) }).locator('canvas');
  await expect(stickCanvas).toBeVisible();

  await page.screenshot({ path: 'test-results/glutamine-rendering.png' });
});

test('verifies rendering of Glycine', async ({ page }) => {
  await page.goto('/');

  // Select Glycine
  const aaSelect = page.locator('#aa-select');
  await aaSelect.selectOption('Gly');

  // Check info
  await expect(page.locator('h2')).toHaveText(/Glycine \(Gly \/ G\)/);

  // Check if SVG is rendered
  const svg = page.locator('svg');
  await expect(svg).toBeVisible();

  // Glycine has 10 atoms now
  const circles = svg.locator('circle');
  await expect(circles).toHaveCount(10);

  await page.screenshot({ path: 'test-results/glycine-rendering.png' });
});

test('verifies rendering of Phenylalanine', async ({ page }) => {
  await page.goto('/');

  // Select Phenylalanine
  const aaSelect = page.locator('#aa-select');
  await aaSelect.selectOption('Phe');

  // Check info
  await expect(page.locator('h2')).toHaveText(/Phenylalanine \(Phe \/ F\)/);

  // Check if SVG is rendered
  const svg = page.locator('svg');
  await expect(svg).toBeVisible();

  // Phenylalanine has 23 atoms now
  const circles = svg.locator('circle');
  await expect(circles).toHaveCount(23);

  await page.screenshot({ path: 'test-results/phenylalanine-rendering.png' });
});

test('verifies rendering of Serine', async ({ page }) => {
  await page.goto('/');

  // Select Serine
  const aaSelect = page.locator('#aa-select');
  await aaSelect.selectOption('Ser');

  // Check info
  await expect(page.locator('h2')).toHaveText(/Serine \(Ser \/ S\)/);

  // Check if SVG is rendered
  const svg = page.locator('svg');
  await expect(svg).toBeVisible();

  // Serine has 14 atoms now
  const circles = svg.locator('circle');
  await expect(circles).toHaveCount(14);

  await page.screenshot({ path: 'test-results/serine-rendering.png' });
});

test('verifies rendering of Tryptophan', async ({ page }) => {
  await page.goto('/');
  const aaSelect = page.locator('#aa-select');
  await aaSelect.selectOption('Trp');
  await expect(page.locator('h2')).toHaveText(/Tryptophan \(Trp \/ W\)/);
  const svg = page.locator('svg');
  await expect(svg).toBeVisible();
  const circles = svg.locator('circle');
  await expect(circles).toHaveCount(27);
  await page.screenshot({ path: 'test-results/tryptophan-rendering.png' });
});

test('verifies rendering of Tyrosine', async ({ page }) => {
  await page.goto('/');
  const aaSelect = page.locator('#aa-select');
  await aaSelect.selectOption('Tyr');
  await expect(page.locator('h2')).toHaveText(/Tyrosine \(Tyr \/ Y\)/);
  const svg = page.locator('svg');
  await expect(svg).toBeVisible();
  const circles = svg.locator('circle');
  await expect(circles).toHaveCount(24);
  await page.screenshot({ path: 'test-results/tyrosine-rendering.png' });
});

test('verifies rendering of Selenocysteine', async ({ page }) => {
  await page.goto('/');
  const aaSelect = page.locator('#aa-select');
  await aaSelect.selectOption('Sec');
  await expect(page.locator('h2')).toHaveText(/Selenocysteine \(Sec \/ U\)/);
  const svg = page.locator('svg');
  await expect(svg).toBeVisible();
  const circles = svg.locator('circle');
  await expect(circles).toHaveCount(14);
  await page.screenshot({ path: 'test-results/selenocysteine-rendering.png' });
});
