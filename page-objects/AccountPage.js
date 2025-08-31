export class AccountPage {

    constructor(page) {
        this.page = page
        this.pageHeader = page.getByRole('heading', { name: 'My Account'})
    }

    visit = async () => {
        await this.page.goto("/my-account")
    }

    waitForPageHeading = async () => {
        await this.pageHeader.waitFor()
        
    }
}