import { test, expect } from '@playwright/test'

test.describe('Action bar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('Copy CLI button is visible', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Copy CLI/i })).toBeVisible()
  })

  test('clicking Copy CLI changes the button to "Copied!" or shows a toast', async ({ page }) => {
    const copyBtn = page.getByRole('button', { name: /Copy CLI/i })
    await copyBtn.click()

    // Either the button text changes to "Copied!" or a toast appears
    const copiedBtn = page.getByRole('button', { name: /Copied!/i })
    const toast = page.getByText(/CLI command copied/i)

    await expect(copiedBtn.or(toast)).toBeVisible({ timeout: 3000 })
  })

  test('Generate .zip button is present and enabled', async ({ page }) => {
    const generateBtn = page.getByRole('button', { name: /Generate \.zip/i })
    await expect(generateBtn).toBeVisible()
    await expect(generateBtn).toBeEnabled()
  })

  test('clicking Generate .zip does not throw a JS error when backend is unavailable', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (err) => errors.push(err.message))

    const generateBtn = page.getByRole('button', { name: /Generate \.zip/i })
    await generateBtn.click()

    // Give the click handler a moment to settle
    await page.waitForTimeout(500)

    // No uncaught JavaScript errors should have been thrown
    expect(errors).toHaveLength(0)
  })
})
