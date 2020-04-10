class BasketPage {

    /**
     * Verifies total price for selected products
     */
    verifyTotalPrice() {
        let price = 0;
        let quantity = 0;
        let totalPrice = 0;
        cy.get('.cart-table__thumbnail').its('length').then((length) => {
            for (let item = 0; item < length; item++) {
                cy.get('tr').eq(item + 1).find('td').eq(1).then(($btn) => {
                    price = formatHelper.getPriceFormattedValue($btn.text());
                });
                cy.get('.cart-table__quantity-cell__controls').eq(item).then(($btn) => {
                    quantity = parseFloat($btn.text());
                    totalPrice += quantity * price;
                });
            }
        });
        cy.get('tfoot').find('td').eq(1).then(($btn) => {
            const total = (formatHelper.getPriceFormattedValue($btn.text())).toFixed(2);
            expect(total).to.eql((totalPrice).toFixed(2));
        });
    }

    /**
     * Goes to the basket
     */
    goToBasket() {
        cy.get('.main-menu__icon.main-menu__cart').should('be.visible');
        cy.get('.main-menu__icon.main-menu__cart').click();
        cy.get('.button.secondary', {timeout: 10000}).should('be.visible');
        cy.get('.button.secondary').contains('Go to my bag').click();
        cy.get('.cart-page__checkout-action button').should('be.visible');
    }
}

module.exports = BasketPage;
