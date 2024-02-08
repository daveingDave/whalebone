import {Page} from "@playwright/test";


export class HomePage {
  readonly page: Page
  constructor(page) {
    this.page = page
  }

  async openPage(locator) {
    await this.page.locator(`[href="/${locator}"]`).click()
  }
}