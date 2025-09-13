import { test, expect } from './ev-continuous-test'

test('check if fixture works - evinced demo page', async({ page, evincedService }) =>{
    await page.goto('https://demo.evinced.com')
    await expect(page).toHaveTitle(/Evinced/)
})