import { test, expect } from '@playwright/test'

test.describe('Dependency panel', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('clicking "+ Add" opens the dependency panel', async ({ page }) => {
    await page.getByRole('button', { name: 'Add' }).click()
    await expect(page.getByText('Add dependencies')).toBeVisible()
  })

  test('dependency panel shows a search input', async ({ page }) => {
    await page.getByRole('button', { name: 'Add' }).click()
    await expect(page.getByPlaceholder('Search dependencies…')).toBeVisible()
  })

  test('searching "prisma" filters the list to show Prisma', async ({ page }) => {
    await page.getByRole('button', { name: 'Add' }).click()
    await page.getByPlaceholder('Search dependencies…').fill('prisma')
    await expect(page.getByText('Prisma').first()).toBeVisible()
    // Unrelated items should be hidden
    await expect(page.getByText('Jest')).not.toBeVisible()
  })

  test('clicking Prisma row marks it selected (counter increases)', async ({ page }) => {
    await page.getByRole('button', { name: 'Add' }).click()
    // Click the Prisma name text — event bubbles to the row's onClick handler
    await page.getByText('Prisma').first().click()
    // Footer counter should update to "1 selected"
    await expect(page.getByText('1 selected')).toBeVisible()
  })

  test('clicking Done closes the panel', async ({ page }) => {
    await page.getByRole('button', { name: 'Add' }).click()
    await expect(page.getByText('Add dependencies')).toBeVisible()
    await page.getByRole('button', { name: 'Done' }).click()
    await expect(page.getByText('Add dependencies')).not.toBeVisible()
  })

  test('selected dependency appears in the dependencies list after closing panel', async ({ page }) => {
    await page.getByRole('button', { name: 'Add' }).click()
    await page.getByText('Prisma').first().click()
    await page.getByRole('button', { name: 'Done' }).click()
    // After closing, Prisma should appear in the main dependency section
    await expect(page.getByText('Prisma').first()).toBeVisible()
  })

  test('clicking × on a selected dependency removes it', async ({ page }) => {
    // Add Prisma
    await page.getByRole('button', { name: 'Add' }).click()
    await page.getByText('Prisma').first().click()
    await page.getByRole('button', { name: 'Done' }).click()

    // Verify Prisma appears in the dep list
    await expect(page.getByText('Prisma').first()).toBeVisible()

    // Click the × (SVG close icon) remove button inside the Dependencies section
    // The section header says "Dependencies" and each dep row has a single button (the × remove btn)
    const depsSection = page.locator('section').filter({ hasText: 'Dependencies' }).first()
    await depsSection.locator('button').click()

    // After removal the empty-state placeholder should appear
    await expect(page.getByText('No dependencies yet')).toBeVisible()
  })
})
