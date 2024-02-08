import { HomePage } from '../pages/homePage'
import { SampleAppPage } from "../pages/sampleAppPage";
import { LoadDelayPage } from "../pages/loadDelayPage";
import { ProgressBarPage } from "../pages/progressBarPage";

const { test } = require('@playwright/test');


test('Login/logout test', async ({page}) => {
  const homePage = new HomePage(page)
  const sampleAppPage = new SampleAppPage(page)
  const name = 'Something'

  await page.goto('/')
  await homePage.openPage('sampleapp')
  await sampleAppPage.clickToLoginButton()
  await sampleAppPage.checkErrorMessage()
  await sampleAppPage.signIn(name, 'pwd2')
  await sampleAppPage.checkErrorMessage()
  await sampleAppPage.signIn(name, 'pwd')
  await sampleAppPage.checkInfoMessage(name)
  await sampleAppPage.clickToLoginButton()
  await sampleAppPage.checkLogoutMessage()
});

test('Load delay test', async ({page}) => {
  const homePage = new HomePage(page)
  const loadDelayPage = new LoadDelayPage(page)

  await page.goto('/')
  await homePage.openPage('loaddelay')
  await loadDelayPage.waitForSpinner(10000)
  await loadDelayPage.checkButtonIsVisible()
});

test('Progress bar test', async ({page}) => {
  const homePage = new HomePage(page)
  const progressBarPage = new ProgressBarPage(page)

  await page.goto('/')
  await homePage.openPage('progressbar')
  await progressBarPage.stopProgressBar(75)
  await progressBarPage.logResult()
});