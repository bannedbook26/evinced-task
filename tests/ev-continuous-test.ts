import { test as base, expect } from '@playwright/test'
import { EvincedSDK } from '@evinced/js-playwright-sdk'

type EvFixtures = { evincedService: EvincedSDK }

export const test = base.extend<EvFixtures>({
  evincedService: async ({ page }, use) => {
    const evincedService = new EvincedSDK(page) // picks up evConfig.json

    await evincedService.evStart({
      enableScreenshots: true,
    }) // start continuous monitoring

    await use(evincedService)      // hand the service to the test

    // stop + collect issues (contributes to aggregated report too)
    const issues = await evincedService.evStop()

    // optional console.log:
    console.log(`[Evinced] ${issues.length} issues detected in "${page.url()}"`)
  },
})

export { expect }
