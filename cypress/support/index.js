const {Given, Then, When} = require('cypress-cucumber-preprocessor/steps');

global.Given = Given;
global.When = When;
global.Then = Then;

const chai = require('chai');
chai.use(require('chai-sorted'));
global.expect = chai.expect;

const BasketPage = require('../elements/pages/BasketPage');
global.basketPage = new BasketPage();

const JuicesPage = require('../elements/pages/JuicesPage');
global.juicesPage = new JuicesPage();

const FormatHelper = require('../elements/helpers/FormatHelper')
global.formatHelper = new FormatHelper();

const GlobalVars = require('../fixtures/GlobalVars');
global.globalVar = new GlobalVars();

beforeEach( () => {
    cy.clearLocalStorage({ log:false });
    cy.visit('/');
    cy.get('.main-menu__item', {timeout: 30000}).first().should('be.visible');
});


