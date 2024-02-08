export class HomePage {
  constructor(page) {
    this.page = page
  }

  async openPage(locator) {
    await this.page.locator(`[href="/${locator}"]`).click()
  }
}