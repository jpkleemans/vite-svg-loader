import { test, expect } from '@playwright/test'

test.describe('Vite SVG Loader', () => {
  test('successfully loads test page', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=Hello Vue 3 + Vite')).toBeVisible()
  })

  test('loads svg file', async ({ page }) => {
    await page.goto('/')
    const svg = page.locator('#component svg')
    await expect(svg).toBeVisible()
    const width = await svg.evaluate((el: SVGSVGElement) => el.width.baseVal.value)
    expect(width).toBe(467)
  })

  test('accepts classes', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('#component svg.test-svg')).toBeVisible()
  })

  test('accepts other attributes', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('#component svg[data-animal="bird"]')).toBeVisible()
    await expect(page.locator('#component svg[aria-hidden="true"]')).toBeVisible()
  })

  test('loads svg file via <img>', async ({ page }) => {
    await page.goto('/')
    const img = page.locator('#image img')
    await expect(img).toBeVisible()
    const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth)
    expect(naturalWidth).toBe(467)
  })

  test('supports async components', async ({ page }) => {
    await page.goto('/')
    const svg = page.locator('#async svg')
    await expect(svg).toBeVisible()
    const width = await svg.evaluate((el: SVGSVGElement) => el.width.baseVal.value)
    expect(width).toBe(400)
  })

  test('keeps style tag in components', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('#style-tag svg style')).toBeAttached()
  })

  test('supports ?url param', async ({ page }) => {
    await page.goto('/')
    const text = await page.locator('#url').textContent()
    expect(text).toMatch(/^data:image\/svg\+xml|^\/assets\/test.*\.svg/)
  })

  test('supports ?raw param', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('#raw')).toContainText('<?xml version="1.0"?>')
  })

  test('uses svgo', async ({ page }) => {
    await page.goto('/')
    const svg = page.locator('#component svg')
    await expect(svg).not.toHaveAttribute('id')
  })

  test('supports ?skipsvgo param', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('#skipsvgo svg')).toHaveAttribute('id')
  })

  test('ignores root files references', async ({ page }) => {
    await page.goto('/')
    const img = page.locator('#root img')
    await expect(img).toBeVisible()
    const width = await img.evaluate((el: HTMLImageElement) => el.width)
    expect(width).toBe(355)
  })

  test('sends path to svgo', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('#component svg .test_svg__rectangle')).toBeVisible()
  })
})
