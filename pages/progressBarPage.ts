import {expect, type Locator, Page} from "@playwright/test";


export class ProgressBarPage {
  readonly page: Page
  readonly start: Locator
  readonly stop: Locator
  readonly progressBar: Locator
  readonly progressBarValue: Locator
  readonly result: Locator

  constructor(page) {
    this.page = page
    this.start = page.locator('#startButton')
    this.stop = page.locator('#stopButton')
    this.progressBar = page.locator('#progressBar')
    this.progressBarValue = page.locator('#progressBar').getAttribute('arie-valuenow')
    this.result = page.locator('#result')
  }

  async clickToStart() {
    await expect(this.start).toBeVisible()
    await this.start.click()
  }

  async clickToStopButton() {
    await expect(this.start).toBeVisible()
    await this.stop.click()
  }

  async stopProgressBar(percentage) {
    await this.clickToStart()
    while(parseInt(await this.progressBar.getAttribute('aria-valuenow'))<percentage) {}
    await this.clickToStopButton()
  }

  async logResult() {
    console.log(await this.result.textContent())
  }
}