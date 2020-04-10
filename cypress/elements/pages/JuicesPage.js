class JuicesPage {

    /**
     * Goes to Juices Page
     */
    goToJuicesPage() {
        cy.get('.main-menu__item a[href="/category/groceries/8/"]').trigger('mouseover');
        cy.get('a[href="/category/juices/14/"]').click();
        cy.get('.sc-bMVAic.eyGjCJ').first().should('be.visible');
    }


    /**
     * Selects sort options
     * @param {string} sortOption - sort option to be selected. Supported values: "Price Low-High", "Price High-Low",
     * "Name Increasing", "Name Decreasing"
     */
    selectSortOption(sortOption) {
        cy.get('.sc-gipzik.bdqRPy').click();
        cy.get('[id^="react-select-2"]').contains(`${sortOption}`).click();
        cy.get('.sc-gipzik.bdqRPy').invoke('text')
            .then((text) => {
                expect(text.trim()).to.eql(sortOption);
            });
    }

    /**
     * Verifies that items are correctly sorted by price
     * @param {boolean} descending - whether the list should be sorted in descending or ascending order
     */
    verifySortByPrice(descending) {
        cy.get('.sc-iujRgT.cWuyuM')
            .then($prices => {
                const prices = $prices
                    .toArray()
                    .map($el => (formatHelper.getPriceFormattedValue($el.innerText)).toFixed(2));
                expect(prices).to.be.sorted(descending);
            });
    }

    /**
     * Loads more items
     */
    loadMoreItems() {
        cy.get('.sc-gzVnrw.eLCqQM', {timeout: 10000}).should('be.visible');
        cy.get('.sc-gzVnrw.eLCqQM').click();
        cy.get('.sc-kGXeez.DZmXt', {timeout: 10000}).should('be.visible')
            .then(() => {
                cy.get('.sc-kGXeez.DZmXt').should('not.be.visible')
            });
    }

    /**
     * Verifies that items are correctly sorted
     * @param {string} sortOption - sort option. Supported values: "Price Low-High", "Price High-Low", "Name Increasing",
     * "Name Decreasing"
     */
    verifySelectedSortOption(sortOption) {
        switch (sortOption) {
            case 'Price Low-High': {
                this.verifySortByPrice(false);
                break;
            }
            case 'Price High-Low': {
                this.verifySortByPrice(true);
                break;
            }
            case 'Name Increasing': {
                this.verifySortByName(false);
                break;
            }
            case 'Name Decreasing': {
                this.verifySortByName(true);
                break;
            }
            default: {
                throw new Error('Incorrect sort option');
            }
        }
    }

    /**
     * Verifies that items are correctly sorted by name
     * @param {boolean} descending - whether the list should be sorted in descending or ascending order
     */
    verifySortByName(descending) {
        cy.get('.sc-bAeIUo.cpiuyN')
            .then($names => {
                const names = $names.toArray();
                expect(names).to.be.sorted(descending);
            });
    }

    /**
     * Goes to specified juice Product Page
     * @param {string} flavor - juice flavor. Exemplary values: "banana", "orange", "bean"
     */
    goToJuiceItemPage(flavor) {
        this.loadMoreItems();
        cy.get(`a[href^="/product/${flavor}-juice/"]`).should('be.visible');
        cy.get(`a[href^="/product/${flavor}-juice/"]`).click();
    }

    /**
     * Adds juice to basket
     * @param {number} amount - how many bottles will be added
     * @param {number} size - bottle size. Supported values: 0.5, 1, 2
     */
    addJuiceToBasket(amount, size) {
        const bottleSize = (size < 1) ? size * 100 : size;
        cy.get('.sc-jTzLTM.kmwxxB', {timeout: 10000}).should('be.visible');
        cy.get('.sc-jTzLTM.kmwxxB').first().click();
        cy.get('.sc-fYxtnH.hdYsNe').contains(`${bottleSize}`).click();
        cy.get('.sc-cSHVUG.gKbeaI').eq(1).type(`{selectall}${amount}`);
        cy.get('.product-description')
            .then($el => {
                let index;
                if ($el.find('.product-description__undiscounted_price').length > 0) {   //evaluates as true
                    index = 2;
                } else {
                    index = 0;
                }
                cy.get('.product-description span').eq(index).invoke('text')
                    .then((text) => {
                        globalVar.productPrice = formatHelper.getPriceFormattedValue(text);
                    });
            });
        cy.get('[class^="product-description__action"]').click();
    }
}

module.exports = JuicesPage;
