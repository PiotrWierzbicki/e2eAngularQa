describe('E2E tests of Stepper Page', () => {
    let name = 'Geralt';
    let longName = 'VeryLongNameHave23Chars';

    let address = '1 Radomir St, Novigrad';
    let longAddress = '999 Last Street on Vulcano, Honolulu, Hawaii, USA'

    beforeEach(() => {
      cy.visit('stepper');
    });
  
    it('emptyName', () => {
        cy.get('#mat-input-0').click();
        cy.get('[type="submit"]').contains('Next').click();
        cy.get('.text-danger').should('have.text', ' This field is required. ')
    })
   
    it('longName', () => {
        cy.get('#mat-input-0').type(longName)
        cy.get('.text-danger').should('have.text', ' The maximum length for this field is 20 characters. ')
    })

    it('longAddress', () => {
        cy.get('#mat-input-0').type(name)
        cy.get('[type="submit"]').contains('Next').click();

        cy.get('#mat-input-1').type(longAddress);
        cy.get('.text-danger').should('have.text', ' The maximum length for this field is 30 characters. ')
    })

    it('correctCase', () => {
        cy.get('#mat-input-0').type(name)
        cy.get('[type="submit"]').contains('Next').click();

        cy.get('#mat-input-1').type(address);
        cy.get('[type="submit"]').eq(1).click();

        cy.get('#cdk-step-content-0-2').children().eq(1).should('have.text', ' Name: ' + name + ' ');
        cy.get('#cdk-step-content-0-2').children().eq(2).should('have.text', ' Address: ' + address + ' ');
    })

    it('testResetButton', () => {
        cy.get('#mat-input-0').type(name)
        cy.get('[type="submit"]').contains('Next').click();

        cy.get('#mat-input-1').type(address);
        cy.get('[type="submit"]').eq(1).click();

        cy.get('[aria-posinset="1"]').should('have.attr', 'aria-selected', 'false');
        cy.get('[aria-posinset="3"]').should('have.attr', 'aria-selected', 'true');

        cy.get('button').contains('Reset').click();

        cy.get('[aria-posinset="1"]').should('have.attr', 'aria-selected', 'true');
        cy.get('[aria-posinset="3"]').should('have.attr', 'aria-selected', 'false');
    })

    it('testBackButtonTwoTimes', () => {
        cy.get('[aria-posinset="1"]').should('have.attr', 'aria-selected', 'true');
        cy.get('#mat-input-0').type(name)
        cy.get('[type="submit"]').contains('Next').click();

        cy.get('[aria-posinset="2"]').should('have.attr', 'aria-selected', 'true');
        cy.get('#mat-input-1').type(address);
        cy.get('[type="submit"]').eq(1).click();
        
        cy.get('[aria-posinset="3"]').should('have.attr', 'aria-selected', 'true');
        cy.get('[type="button"]').eq(1).click();
        cy.get('[aria-posinset="3"]').should('have.attr', 'aria-selected', 'false');
        cy.get('[aria-posinset="2"]').should('have.attr', 'aria-selected', 'true');

        cy.get('[type="button"]').eq(0).click();
        cy.get('[aria-posinset="2"]').should('have.attr', 'aria-selected', 'false');
        cy.get('[aria-posinset="1"]').should('have.attr', 'aria-selected', 'true');
    })
})