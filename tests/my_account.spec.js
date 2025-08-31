import { test } from "@playwright/test"
import { AccountPage } from "./../page-objects/AccountPage"
import { getLoginToken } from "./../api-calls/getLoginToken"
import { adminDetails } from "./../data/userCredentials"


test("My Account using cookie injection ", async ({ page }) => {
    //Make request to get login token
    const loginToken = await getLoginToken(adminDetails.username, adminDetails.password)
    const myAccount = new AccountPage(page)
    await myAccount.visit()
    //Inject the login token into the browser
    await page.evaluate(([loginTokenInsideBrowserCode])=> {
        document.cookie = "token=" + loginTokenInsideBrowserCode
    }, [loginToken])
    await myAccount.visit()
    await myAccount.waitForPageHeading()
})     