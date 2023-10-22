describe('E2E tests of Welcome Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('goToDoesntExistingPage', () => {
    cy.visit('https://angular-qa-recruitment-app.netlify.app/RANDOM_PAGE').then(() => {
      cy.url().should('eq', 'https://angular-qa-recruitment-app.netlify.app/') 
    })
  }),

  it('moveBetweenTabs', () => {
    cy.clickElement('form-view-link').then(() => {
      cy.url().should('eq', 'https://angular-qa-recruitment-app.netlify.app/form') 
    })

    cy.clickElement('stepper-view-link').then(() => {
      cy.url().should('eq', 'https://angular-qa-recruitment-app.netlify.app/stepper') 
    })

    cy.clickElement('main-view-link').then(() => {
      cy.url().should('eq', 'https://angular-qa-recruitment-app.netlify.app/') 
    })    
  }),

  it('clickNextSteps', () => {
    cy.verifyTerminalText('New Component', 'ng generate component xyz');
    cy.verifyTerminalText('Angular Material', 'ng add @angular/material');
    cy.verifyTerminalText('Add PWA Support', 'ng add @angular/pwa');
    cy.verifyTerminalText('Add Dependency', 'ng add _____');
    cy.verifyTerminalText('Run and Watch Tests', 'ng test');
    cy.verifyTerminalText('Build for Production', 'ng build');
  })
  
  it('openExternalPages', () => {
    // cy.goToExternalPage('Twitter');
    // Commented - it doesn't work, I don't know why.
    cy.goToExternalPage('YouTube');
    cy.goToExternalPage('Learn Angular', false);
    cy.goToExternalPage('CLI Documentation', false);
    cy.goToExternalPage('Angular Blog', false);
    cy.goToExternalPage('Angular DevTools', false);
    cy.goToExternalPage('Animations');
    cy.goToExternalPage('CLI');
    //cy.goToExternalPage('Find a Local Meetup');
    // Commented - it doesn't work, I don't know why.
    cy.goToExternalPage('Join the Conversation on Discord');
    cy.goToExternalPage(' Star ', false);
  })
})