import { expect } from "@playwright/test"

export class PaymentPage {
    
    constructor(page) {
        this.page = page
        //Iframe Locator
        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]')
        this.discountInput = page.getByPlaceholder('Discount code')
        this.submitDiscountButton = page.locator('[data-qa="submit-discount-button"]')
        this.discoutActivatedPopup = page.locator('[data-qa="discount-active-message"]')
        this.totalAmountWithoutDiscount = page.locator('[data-qa="total-value"]')
        this.totalAmountWithDiscount = page.locator('[data-qa="total-with-discount-value"]')
        this.creditCardOwner = page.getByPlaceholder('Credit card owner')
        this.creditCardNumber = page.getByPlaceholder('Credit card number')
        this.validUntil = page.getByPlaceholder('Valid until')
        this.creditCardCVC = page.getByPlaceholder('Credit card CVC')
        this.payBTN = page.locator('[data-qa="pay-button"]')
    }

    applyDiscount = async () => {
        //Find discount code and input the code
        await this.discountCode.waitFor()
        const code = await this.discountCode.innerText()
        await this.discountInput.waitFor()
        await this.discountInput.fill(code)
        await expect(this.discountInput).toHaveValue(code)
        //Validate any discount pop up is visible
        expect(await this.totalAmountWithDiscount.isVisible()).toBe(false)
        expect(await this.discoutActivatedPopup.isVisible()).toBe(false)
        //Submit Discount Btn
        await this.submitDiscountButton.waitFor()
        await this.submitDiscountButton.click()
        //Wait to discount Activated Popup 
        await this.discoutActivatedPopup.waitFor()
        //Wait to total amount with discount
        await this.totalAmountWithDiscount.waitFor()
        const discountTotalValueText = await this.totalAmountWithDiscount.innerText()
        const discountTotalValueOnlyStringNumber = discountTotalValueText.replace("$", "")
        const discountTotalNumber = parseInt(discountTotalValueOnlyStringNumber, 10)
        //Total amount withoput discount
        await this.totalAmountWithoutDiscount.waitFor()
        const TotalValueText = await this.totalAmountWithoutDiscount.innerText()
        const TotalValueOnlyStringNumber = TotalValueText.replace("$", "")
        const TotalNumber = parseInt(TotalValueOnlyStringNumber, 10)
        //Check if Discount Total price is smaller than the regular price
        expect(discountTotalNumber).toBeLessThan(TotalNumber)

    }

    payWithCreditCard = async (creditCardPayment) => {
        //Fill credit card owner
        await this.creditCardOwner.waitFor()
        await this.creditCardOwner.fill(creditCardPayment.creditCardOwner)
        //Fill credit card Number
        await this.creditCardNumber.waitFor()
        await this.creditCardNumber.fill(creditCardPayment.creditCardNumber)
        //Fill credit card valid until date
        await this.validUntil.waitFor()
        await this.validUntil.fill(creditCardPayment.validUntilDate)
        //Fill credit card CVC
        await this.creditCardCVC.waitFor()
        await this.creditCardCVC.fill(creditCardPayment.cvc)
        //Click on Pay button
        await this.payBTN.waitFor()
        await this.payBTN.click()
        await this.page.waitForURL(/\/thank-you/, { timeout: 3000})
        
    }



}