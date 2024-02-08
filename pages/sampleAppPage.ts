import {expect, type Locator, Page} from "@playwright/test";


export class SampleAppPage {
  readonly page: Page
  readonly name: Locator
  readonly password: Locator
  readonly loginButton: Locator
  readonly loginStatus: Locator

  constructor(page) {
    this.page = page
    this.name = page.locator('[name="UserName"]')
    this.password = page.locator('[name="Password"]')
    this.loginButton = page.locator('#login')
    this.loginStatus = page.locator('#loginstatus')

  }

  async signIn(name, password) {
    await this.name.fill(name)
    await this.password.fill(password)
    await this.clickToLoginButton()
  }

  async clickToLoginButton() {
    await this.loginButton.click()
  }

  async checkInfoMessage(name) {
    await expect(this.loginStatus).toHaveText(`Welcome, ${name}!`)

  }

  async checkErrorMessage() {
    await expect(this.loginStatus).toHaveText('Invalid username/password')
  }

  async checkLogoutMessage() {
    await expect(this.loginStatus).toHaveText('User logged out.')
  }
}