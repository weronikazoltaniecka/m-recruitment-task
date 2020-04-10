Given(/^I have "(\d+)" bottles of "(0.5|1|2)" l "([^"]*)" juice added to the basket$/, (amount, size, flavor) => {
    globalVar.juiceFlavor = flavor;
    globalVar.productQuantity = amount;
    juicesPage.goToJuicesPage();
    juicesPage.goToJuiceItemPage(flavor);
    juicesPage.addJuiceToBasket(amount, size);
});

When(/^I proceed to my bag$/, () => {
    basketPage.goToBasket();
});

Then(/^I should see proper products in the bag$/, () => {
    basketPage.verifyProductInBasket(globalVar.juiceFlavor, globalVar.productQuantity, globalVar.productPrice);
});

Then(/^total price should be correctly calculated in the bag$/, () => {
    basketPage.verifyTotalPrice();
});

