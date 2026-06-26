import { test, expect } from '@playwright/test'

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('shows "right away" in the header', async ({ page }) => {
    await expect(page.getByText('right away')).toBeVisible()
  })

  test('hero section shows PROJECT GENERATOR badge', async ({ page }) => {
    await expect(page.getByText('PROJECT GENERATOR')).toBeVisible()
  })

  test('all 6 framework cards are visible', async ({ page }) => {
    for (const name of ['NestJS', 'Express', 'Fastify', 'Hono', 'Next.js', 'Vite']) {
      await expect(page.getByText(name).first()).toBeVisible()
    }
  })

  test('package manager section shows 4 options', async ({ page }) => {
    for (const pm of ['npm', 'yarn', 'pnpm', 'bun']) {
      await expect(page.getByText(pm).first()).toBeVisible()
    }
  })

  test('project structure section is visible', async ({ page }) => {
    await expect(page.getByText('Project structure')).toBeVisible()
  })
})
