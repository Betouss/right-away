import { test, expect } from '@playwright/test'

test.describe('Framework and option selectors', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('clicking Express card selects it with green border', async ({ page }) => {
    const expressCard = page.locator('div').filter({ hasText: /^Express$/ }).first()
    await expressCard.click()

    // The parent card container gets the green border when selected.
    // Find the clickable card wrapper by traversing up from the Express label.
    const card = page.locator('div').filter({ hasText: 'Express' }).filter({ hasText: 'Minimal & fast' }).first()
    const borderColor = await card.evaluate((el) => getComputedStyle(el).borderColor)
    // Selected border uses rgba(197,248,42,0.55) — the green accent colour
    expect(borderColor).toMatch(/197|rgba/)
  })

  test('clicking JavaScript button toggles language to JS', async ({ page }) => {
    const jsBtn = page.getByRole('button', { name: 'JavaScript' })
    await jsBtn.click()
    // Active button has dark text on green background
    const bg = await jsBtn.evaluate((el) => getComputedStyle(el).backgroundColor)
    expect(bg).toMatch(/197|rgb\(197/)
  })

  test('clicking TypeScript button toggles language back to TS', async ({ page }) => {
    // Switch to JS first, then back to TS
    await page.getByRole('button', { name: 'JavaScript' }).click()
    const tsBtn = page.getByRole('button', { name: 'TypeScript' })
    await tsBtn.click()
    const bg = await tsBtn.evaluate((el) => getComputedStyle(el).backgroundColor)
    expect(bg).toMatch(/197|rgb\(197/)
  })

  test('clicking CommonJS button toggles the module system', async ({ page }) => {
    const cjsBtn = page.getByRole('button', { name: 'CommonJS' })
    await cjsBtn.click()
    const bg = await cjsBtn.evaluate((el) => getComputedStyle(el).backgroundColor)
    expect(bg).toMatch(/197|rgb\(197/)
  })

  test('switching from NestJS to Express updates the project tree', async ({ page }) => {
    // NestJS tree shows app.module — Express tree does not
    await expect(page.getByText('app.module.ts')).toBeVisible()

    const expressCard = page.locator('div').filter({ hasText: 'Express' }).filter({ hasText: 'Minimal & fast' }).first()
    await expressCard.click()

    await expect(page.getByText('app.module.ts')).not.toBeVisible()
    // Express tree shows app.ts instead
    await expect(page.getByText('app.ts')).toBeVisible()
  })
})
