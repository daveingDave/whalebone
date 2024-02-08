import {expect} from "@playwright/test";

export class LoadDelayPage {
  constructor(page) {
    this.page = page
    this.spinner = page.locator('#spinner')
    this.button = page.locator('button[type="button"]')
  }

  async waitForSpinner(timeout) {
    await expect(this.spinner).not.toBeVisible({timeout: timeout})
  }

  async checkButtonIsVisible() {
    await expect(this.button.getByText('Button Appearing After Delay')).toBeVisible()
    await this.button.getByText('Button Appearing After Delay').click()
  }
}