import { test } from "@playwright/test"
import { v4 as uuidv4 } from 'uuid' ;
import { ProductPage } from "../page-objects/ProductPage.js"
import { Navigation } from "../page-objects/Navigation.js"
import { CheckoutPage } from "../page-objects/CheckoutPage.js"
import { MyAccountPage } from "../page-objects/MyAccountPage.js"
import { RegisterPage } from "../page-objects/RegisterPage.js"
import { DeliveryDetailsPage } from "../page-objects//DeliveryDetailsPage.js";
import { deliveryDetails } from "../data/deliveryDetails.js";
import { PaymentPage } from "../page-objects/Paymentpage.js";
import { creditCardPayment } from "../data/creditCardPayment.js";


test("New user full end to end test journey", async ({ page }) => {
    //Open browser and visit Product Page
    const productPage = new ProductPage(page)
    await productPage.visit()
    //Sort by cheapest and add to basket first 3 options
    await productPage.sortByCheapest()
    await productPage.addProductToBasket(0)
    await productPage.addProductToBasket(1)
    await productPage.addProductToBasket(2)
    //Move to checkout Page
    const navigation = new Navigation(page)
    await navigation.moveToCheckout()
    //Remove the cheapest product and continue to checkout
    const checkout = new CheckoutPage(page)
    await checkout.removeCheapestProduct()
    await checkout.continueToCheckout()
    //Move from Login clicking on Register Button
    const myAccount = new MyAccountPage(page)
    await myAccount.moveFromLoginToRegister()
    //Register user
    const registerPage = new RegisterPage(page)
    const email = uuidv4() + "@gmail.com"
    const password = uuidv4()
    await registerPage.signUpAsNewUser(email, password)
    //Fill Delivery Details and Continue to payment
    const deliveyDetailsPage = new DeliveryDetailsPage(page)
    await deliveyDetailsPage.fillDeliveryDetails(deliveryDetails)
    await deliveyDetailsPage.saveDetails()
    await deliveyDetailsPage.continueToPayment()
    //Apply Discount
    const paymentPage = new PaymentPage(page)
    await paymentPage.applyDiscount()
    await paymentPage.payWithCreditCard(creditCardPayment)
})