import { test, expect } from "@playwright/test";
import { existsSync } from "node:fs";
import { EvincedSDK } from "@evinced/js-playwright-sdk";

test.describe('Navigation Test', () => {
    test('test', async ({ page }) => {
        const evReportHomePage = 'evinced-reports/homePage.html'
        const evReportResultsPage = 'evinced-reports/resultsPage.html'
        const evincedService = new EvincedSDK(page)

        await page.goto('https://demo.evinced.com/'); // Base URL

        const issuesHomePage = await evincedService.evAnalyze({  // Single Run Mode (1st snapshot)
        enableScreenshots: true,
        }) 
        await evincedService.evSaveFile(issuesHomePage, "html", evReportHomePage);
        expect(existsSync(evReportHomePage)).toBeTruthy();


        //      await evincedService.evStart({ // Continuous Mode
        //     enableScreenshots: true,
        // })

        // TEST:
        await page.getByText('Select').first().click();
        await page.getByText('Tiny House').click();
        await page.getByText('Select').click();
        await page.getByText('East Coast').click();
        await page.getByText('Search').click(); // clicking on search starts first navigation
        await expect(page.getByRole('heading', { name: 'Results for: Tiny House in' })).toBeVisible(); // ensure we navigated successfully before we continue
        await expect(page.locator('#results-container')).toContainText('Fall asleep to the sounds of the desert, wake up with the sunrise.'); // text validation


        const issuesResultPage = await evincedService.evAnalyze({  // Single Run Mode (2nd snapshot)
        enableScreenshots: true,
        }) 
        await evincedService.evSaveFile(issuesResultPage, "html", evReportResultsPage);
        expect(existsSync(evReportResultsPage)).toBeTruthy();


        await page.getByRole('link', { name: 'Go back to the homepage' }).click(); // Navigating back to home page
});
})
