import {expect, type Locator, Page} from "@playwright/test";


export class HomePage {
  readonly page: Page
  readonly name: Locator
  readonly password: Locator
  constructor(page) {
    this.page = page
    this.name = page.locator('[name="UserName"]')
    this.password = page.locator('[name="UserName"]')
  }

  async openPage(locator) {
    await this.page.locator(`[href="/${locator}"]`).click()
  }

  async fillCredentials(name, password) {
    this.name.fill(name)
    this.password.fill(password)
  }
}