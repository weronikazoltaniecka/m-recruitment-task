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
    cy.get('.cart-table__thumbnail').its('length').should('eq', 1);
    cy.get('.cart-table__thumbnail').invoke('text').then((text) => {
        expect(text.toLowerCase()).to.include(
            `${globalVar.juiceFlavor}`,
            `${globalVar.juiceFlavor} should be added instead of ${text}`
        );
    });
    cy.get('.cart-table__quantity-cell__controls').invoke('text').then((text) => {
        expect(text.trim()).to.eql(
            `${globalVar.productQuantity}`,
            `${globalVar.productQuantity} bottle/s should be visible in a bag`
        );
    });
    cy.get('tr').eq(1).find('td').eq(1).invoke('text').then((text) => {
        const price = parseFloat(text.substr(3).replace(',', '.'));
        expect(price).to.eql(globalVar.productPrice, `Product price in basket should equal ${globalVar.productPrice}`);
    });

});

Then(/^total price should be correctly calculated in the bag$/, () => {
    basketPage.verifyTotalPrice();
});

