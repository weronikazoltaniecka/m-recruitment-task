Given(/^I am on Juices page$/, () => {
    juicesPage.goToJuicesPage();
});

When(/^I select "(Price Low-High|Price High-Low|Name Increasing|Name Decreasing)" sort option$/, (sorting) => {
    globalVar.sortOption = sorting;
    juicesPage.selectSortOption(sorting);
});

Then(/^the items should be correctly sorted$/, () => {
    juicesPage.loadMoreItems();
    juicesPage.verifySelectedSortOption(globalVar.sortOption);
});
