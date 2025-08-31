import { isDesktopViewport } from "./../utilities/isDesktopViewport"

export class Navigation {
    
    constructor(page) {
        this.page = page

        this.basketCounter = page.locator('[data-qa="header-basket-count"]')
        this.checkoutBTN = page.getByRole('link', { name: 'Checkout'})
        this.mobileBurgerBTN = page.locator('[data-qa="burger-button"]')
    }

    countBasket = async () => {
        await this.basketCounter.waitFor()
        const basketCounterNumber = await this.basketCounter.innerText()
        return parseInt(basketCounterNumber, 10)   
    }


    moveToCheckout = async () => {
        // If mobile version, first open the burger menu
        if (!isDesktopViewport(this.page)) {
            await this.mobileBurgerBTN.waitFor()
            await this.mobileBurgerBTN.click()
        }
        await this.checkoutBTN.waitFor()
        await this.checkoutBTN.click()
        await this.page.waitForURL("/basket")
    }



}
