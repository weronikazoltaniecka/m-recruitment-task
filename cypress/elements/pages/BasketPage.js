class BasketPage {

    /**
     * Verifies total price for selected products
     */
    verifyTotalPrice() {
        let price = 0;
        let quantity = 0;
        let totalPrice = 0;
        cy.get('.cart-table__thumbnail').its('length')
            .then((length) => {
                for (let item = 0; item < length; item++) {
                    cy.get('tr').eq(item + 1).find('td').eq(1)
                        .then(($btn) => {
                            price = formatHelper.getPriceFormattedValue($btn.text());
                        });
                    cy.get('.cart-table__quantity-cell__controls').eq(item)
                        .then(($btn) => {
                            quantity = parseFloat($btn.text());
                            totalPrice += quantity * price;
                        });
                }
            });
        cy.get('tfoot').find('td').eq(1)
            .then(($btn) => {
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
        cy.get('.button.secondary', {timeout: 30000}).should('be.visible');
        cy.get('.button.secondary').contains('Go to my bag').click();
        cy.get('.cart-page__checkout-action button').should('be.visible');
    }

    /**
     * Verifies product in basket
     * @param {string} productName - name of the product added to basket
     * @param {number} quantity - amount of product
     * @param {number} unitPrice - unit price of product
     */
    verifyProductInBasket(productName, quantity, unitPrice) {
        cy.get('.cart-table__thumbnail').its('length').should('eq', 1);
        cy.get('.cart-table__thumbnail').invoke('text')
            .then((text) => {
                expect(text.toLowerCase()).to.include(
                    `${productName}`,
                    `${productName} should be added instead of ${text}`
                );
            });
        cy.get('.cart-table__quantity-cell__controls').invoke('text')
            .then((text) => {
                expect(text.trim()).to.eql(
                    `${quantity}`,
                    `${quantity} product/s should be visible in a bag`
                );
            });
        cy.get('tr').eq(1).find('td').eq(1).invoke('text')
            .then((text) => {
                const price = formatHelper.getPriceFormattedValue(text);
                expect(price).to.eql(unitPrice, `Product price in basket should be equal to ${unitPrice}`);
            });
    }
}

module.exports = BasketPage;
