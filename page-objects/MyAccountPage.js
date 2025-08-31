
export class MyAccountPage {
    constructor(page) {
        this.page = page
        this.registerBTN = page.locator('[data-qa="go-to-signup-button"]')
    }

    moveFromLoginToRegister = async () => {
        await this.registerBTN.waitFor()
        await this.registerBTN.click()
        await this.page.waitForURL(/\/signup/gm, {timeout: 3000})
    }

}