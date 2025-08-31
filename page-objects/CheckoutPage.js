import { expect } from "@playwright/test"

export class CheckoutPage {
    constructor(page) {
        this.page = page
        this.basketCards = page.locator('[data-qa="basket-card"]')
        this.basketItemPrice = page.locator('[data-qa="basket-item-price"]')
        this.removeFromBasketBTN = page.locator('[data-qa="basket-card-remove-item"]')
        this.continueToCheckoutBTN = page.locator('[data-qa="continue-to-checkout"]')
    }

    removeCheapestProduct = async (index) => {
        await this.basketCards.first().waitFor()
        const itemsBeforeRemoval = await this.basketCards.count()
        await this.basketItemPrice.first().waitFor()
        const allPriceTexts = await this.basketItemPrice.allInnerTexts()
        //Remove $ from string
        const justNumbers = allPriceTexts.map((element) => {
            const withoutDollarSign = element.replace("$", "")
            return parseInt(withoutDollarSign, 10) 
        })
        const smallestPrice = Math.min(...justNumbers)
        const smallestProceIndex = justNumbers.indexOf(smallestPrice)
        const specificRemoveBTN = this.removeFromBasketBTN.nth(smallestProceIndex)

        await specificRemoveBTN.waitFor()
        await specificRemoveBTN.click()

        await expect(this.basketCards).toHaveCount(itemsBeforeRemoval - 1)

    }
    
    continueToCheckout = async () => {
        const specificContinueBTN = this.continueToCheckoutBTN
        await specificContinueBTN.waitFor()
        await specificContinueBTN.click()
        await this.page.waitForURL(/\/login/gm, {timeout: 3000})
    }



}