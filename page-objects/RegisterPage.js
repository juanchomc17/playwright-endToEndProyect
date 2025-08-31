
export class RegisterPage {
    
    constructor(page) {
        this.page = page
        this.registerEmailInput = page.getByPlaceholder('e-mail')
        this.registerPasswordInput = page.getByPlaceholder('password')
        this.registerBTN = page.getByRole('button', { name: 'Register' })
    }

    signUpAsNewUser = async (email, password) => {
        //Input Email
        await this.registerEmailInput.waitFor()
        await this.registerEmailInput.fill(email)
        //Input password
        await this.registerPasswordInput.waitFor()
        await this.registerPasswordInput.fill(password)
        //Click on Register.
        await this.registerBTN.waitFor()
        await this.registerBTN.click()

    }

}