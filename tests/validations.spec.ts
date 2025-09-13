import { test, expect } from "@playwright/test";
import { existsSync } from "node:fs";
import { EvincedSDK } from "@evinced/js-playwright-sdk";


test.describe('Validations Test', () => {
    test('test', async ({ page }) => {

        const evReportValidations = 'evinced-reports/validationsTest.html'
        const evincedService = new EvincedSDK(page)

        await evincedService.evStart({
            enableScreenshots: true,
        })

        await page.goto('https://demo.evinced.com/'); // Base URL

        // TEST:
        await page.getByText('Select').first().click();
        await page.getByText('Backyard').click();
        await page.getByText('Select').click();
        await page.getByText('Canada').click();
        await page.getByRole('spinbutton', { name: 'Year' }).click();
        await page.getByRole('spinbutton', { name: 'Year' }).click();
        await page.getByRole('button', { name: 'Toggle calendar' }).click();
        await page.getByRole('button', { name: 'Toggle calendar' }).click();
        await page.getByRole('button', { name: '›' }).click();
        await page.getByRole('button', { name: '›' }).click();
        await page.getByRole('button', { name: '›' }).click();
        await page.getByRole('button', { name: '›' }).click();
        await page.getByRole('button', { name: '»' }).click();
        await page.getByRole('button', { name: 'January 9,' }).click();
        await page.getByRole('button', { name: 'Toggle calendar' }).click();
        await page.getByRole('button', { name: '›' }).click();
        await page.getByLabel('Friday').click();
        await expect(page.getByRole('main')).toContainText('We basically pack your bag.');
        await expect(page.getByRole('main')).toContainText('We vetted the facilities.');
        await expect(page.getByRole('spinbutton', { name: 'Day' })).toHaveValue('9');
        await expect(page.getByRole('main')).toContainText('Our extraordinary hosts will provide you with a different locale, a different lifestyle, and a different experience for a different (read: brave, independent, present) you. Because the days are starting to melt together and you can’t feel the difference between Sunday and Wednesday anymore. Because having your food delivered to your door just reinforces that gnawing feeling that you’re not participating in your own life. This is for you.');
        await page.getByRole('textbox', { name: 'Subscribe' }).click();
        await page.getByRole('textbox', { name: 'Subscribe' }).fill('shon.h777@gmail.com');
        await page.getByRole('button', { name: 'Send' }).click();
        await page.getByText('Select').first().click();
        await page.getByText('Treehouse').click();
        await page.getByText('Select').click();
        await page.getByText('East Coast').click();
        await page.getByRole('paragraph').filter({ hasText: 'East Coast' }).click();
        await page.getByText('Alaska').click();
        await page.getByRole('paragraph').filter({ hasText: 'Treehouse' }).click();
        await page.getByText('Tent').click();
        await page.getByRole('button', { name: 'Toggle calendar' }).click();
        await page.getByRole('button', { name: '»' }).click();
        await page.getByRole('button', { name: '»' }).click();
        await page.getByRole('button', { name: '»' }).click();
        await page.getByRole('button', { name: 'September 25,' }).click();

        const issues = await evincedService.evStop()
        await evincedService.evSaveFile(issues, 'html', evReportValidations)
        expect(existsSync(evReportValidations)).toBeTruthy()
        
});
})