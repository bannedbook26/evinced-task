import { test, expect } from './ev-continuous-test'

test('check if fixture works - google.com', async({ page, evincedService }) =>{
    await page.goto('https://www.google.com/')
    await expect(page).toHaveTitle(/Google/)
})