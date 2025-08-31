import { expect } from "@playwright/test"
import { Navigation } from "./Navigation.js"
import { isDesktopViewport } from "./../utilities/isDesktopViewport.js"

export class ProductPage {
    constructor(page) {
        this.page = page
        this.addButton = page.locator('[data-qa="product-button"]')   
        this.sortDropdownBTN = page.locator('[data-qa="sort-dropdown"]')

    }
    
    visit = async () => {
        await this.page.goto("/")
    }

    addProductToBasket = async (index) => {
        const specificAddButton = this.addButton.nth(index)
        await specificAddButton.waitFor()
        await expect(specificAddButton).toHaveText("Add to Basket")
        const navigation = new Navigation(this.page)
        
        //Only desktop viewport
        let basketCountBeforeAdding //Undefined Value
        if (isDesktopViewport(this.page)) {
            basketCountBeforeAdding = await navigation.countBasket()
        }
        await specificAddButton.click()
        await expect(specificAddButton).toHaveText("Remove from Basket")
        
        //Only desktop viewport
        if (isDesktopViewport(this.page)) {
            const basketCountAfterAdding = await navigation.countBasket()
            expect (basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding)
        }
    }
   
    sortByCheapest = async () => {
        const actualDropdown = this.sortDropdownBTN
        await actualDropdown.waitFor()
        await actualDropdown.selectOption("price-asc")
    }
}