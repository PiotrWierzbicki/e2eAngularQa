describe('E2E tests of Form Page', () => {
    let name = 'Geralt z Rivii'
    let power = 'Weather Changer'

    beforeEach(() => {
        cy.visit('form');
    });

    it('creatingNewHero', () => {
        let alterEgo = 'Our Alter Ego'

        cy.get('button').contains('New Hero').click();
        cy.actionOnSumbitButton("disabled");

        cy.get('#alterEgo').type(alterEgo).then( () => {
            cy.actionOnSumbitButton("disabled");
        });
        
        cy.get('#name').type(name).then( () => {
            cy.actionOnSumbitButton("disabled");
        });

        cy.get('#name').clear().next().should('have.not.hidden')

        cy.get('#name').type(name).then( () => {
            cy.get('#power').select(power)
            cy.actionOnSumbitButton("notDisabled");
            cy.actionOnSumbitButton("click");
        })   

        cy.checkHero(name, alterEgo, power);
    })
    
    it("editHero", () => {
        let alterEgo = "Ciri"
        let changedPower = 'Super Flexible'

        cy.get('#name').clear().type(name)
        cy.get('#alterEgo').clear().type(alterEgo)
        cy.get('#power').select(power)
        cy.checkHero(name, alterEgo, power)

        cy.actionOnSumbitButton("click").then( () => {
            cy.get('button').contains('Edit').click().then( () => {
                cy.get('#power').select(changedPower)
                cy.actionOnSumbitButton("click").then( () => {
                    cy.checkHero(name, alterEgo, changedPower)
                })
            })
        })
    })
})  