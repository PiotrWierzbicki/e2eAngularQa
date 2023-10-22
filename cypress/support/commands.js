Cypress.Commands.add('clickElement', (selector) => {
    cy.get('[id='+selector+']').click();
})

Cypress.Commands.add('verifyTerminalText', (btnText, terminalText) => {
    cy.get('span').contains(btnText).click();
    cy.get('.terminal').then(btnText => {
        expect(btnText).to.contain(terminalText);
    })
})

Cypress.Commands.add('goToExternalPage', (selector, selectorIsTitle = true) => {
    if(selectorIsTitle) {
        selector = '[title="'+selector+'"]'

        cy.get(selector)    
        .invoke('removeAttr', 'target')
        .click().then((link) => {
            cy.request(link.prop('href'))
            .its('status')
            .should('eq', 200)
            cy.go('back');
        });
    } else {
        cy.get('a').contains(selector).parent()
        .invoke('removeAttr', 'target')
        .click().then((link) => {
            cy.request(link.prop('href'))
            .its('status')
            .should('eq', 200)
            cy.go('back');
        });
    }
})

Cypress.Commands.add('actionOnSumbitButton', (action) => {
    if(action === "click"){
        cy.get('[type="submit"]').click()
    } else if(action === "notDisabled") {
        cy.get('[type="submit"]').should('have.not.disabled')
    } else if(action === "disabled") {
        cy.get('[type="submit"]').should('have.disabled')
    }
})

Cypress.Commands.add('checkHero', (name, ego, power) => {
    cy.get('.row').children().eq(1).should('have.text', name)
    cy.get('.row').children().eq(3).should('have.text', ego)
    cy.get('.row').children().eq(5).should('have.text', power)
})