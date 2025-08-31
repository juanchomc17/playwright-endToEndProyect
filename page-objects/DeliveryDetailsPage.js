import { expect } from "@playwright/test"

export class DeliveryDetailsPage {
    constructor(page) {
        this.page = page
        this.firstNameInput = page.getByPlaceholder('First name')
        this.lastNameInput = page.getByPlaceholder('Last name')
        this.streetInput = page.getByPlaceholder('Street')
        this.postCodeInput = page.getByPlaceholder('Post code')
        this.cityInput = page.getByPlaceholder('City')
        this.countryDropdown = page.locator('[data-qa="country-dropdown"]')
        this.saveAdressBTN = page.locator('[data-qa="save-address-button"]')
        this.continueToPaymentBTN = page.locator('[data-qa="continue-to-payment-button"]')
        this.savedLocationBox = page.locator('[data-qa="saved-address-container"]')
        this.savedFirstName = page.locator('[data-qa="saved-address-firstName"]')
        this.savedLastName = page.locator('[data-qa="saved-address-lastName"]')
        this.savedStreet = page.locator('[data-qa="saved-address-street"]')
        this.savedPostCode = page.locator('[data-qa="saved-address-postcode"]')
        this.savedCity = page.locator('[data-qa="saved-address-city"]')
        this.savedCountry = page.locator('[data-qa="saved-address-country"]')
    }


    fillDeliveryDetails = async (deliveryDetails) => {
        //Fill First Name
        await this.firstNameInput.waitFor()
        await this.firstNameInput.fill(deliveryDetails.firstName)
        
        //Fill Last Name
        await this.lastNameInput.waitFor()
        await this.lastNameInput.fill(deliveryDetails.lastName)

        //Fill Street
        await this.streetInput.waitFor()
        await this.streetInput.fill(deliveryDetails.street)

        //Fill Post Code
        await this.postCodeInput.waitFor()
        await this.postCodeInput.fill(deliveryDetails.postCode)

        //Fill City
        await this.cityInput.waitFor()
        await this.cityInput.fill(deliveryDetails.city)

        //Country Dropdown
        await this.countryDropdown.waitFor()
        await this.countryDropdown.selectOption(deliveryDetails.country)


    }


    saveDetails = async () => {
        const addressCountBefoureSaving = await this.savedLocationBox.count()
        //Save Adress for next time
        await this.saveAdressBTN.waitFor()
        await this.saveAdressBTN.click()
        await this.savedLocationBox.waitFor()
        //Assert address locator box has been created
        await expect(this.savedLocationBox).toHaveCount(parseInt(addressCountBefoureSaving, 10) + 1)
        //Assert Adress locator box has the same values input in FillDeliveryDetails
        await this.savedFirstName.first().waitFor()
        expect(await this.savedFirstName.first().innerText()).toBe(await this.firstNameInput.inputValue())
        await this.savedLastName.first().waitFor()
        expect(await this.savedLastName.first().innerText()).toBe(await this.lastNameInput.inputValue())
        await this.savedStreet.first().waitFor()
        expect(await this.savedStreet.first().innerText()).toBe(await this.streetInput.inputValue())
        await this.savedPostCode.first().waitFor()
        expect(await this.savedPostCode.first().innerText()).toBe(await this.postCodeInput.inputValue())
        await this.savedCity.first().waitFor()
        expect(await this.savedCity.first().innerText()).toBe(await this.cityInput.inputValue())
        await this.savedCountry.first().waitFor()
        expect(await this.savedCountry.first().innerText()).toBe(await this.countryDropdown.inputValue())


    }

    continueToPayment = async () => {
        //Click on Continue to Payment Button
        await this.continueToPaymentBTN.waitFor()
        await this.continueToPaymentBTN.click()
        await this.page.waitForURL(/\/payment/, { timeout: 3000})
    }

}


