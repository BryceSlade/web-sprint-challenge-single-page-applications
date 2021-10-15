describe('Pizza Order Application', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/pizza')
    })

    const nameInput = () => cy.get('input[id="name-input"]')
    const sizeDropdown = () => cy.get('select')
    const toppingBoxes = () => cy.get('[type="checkbox"]')
    const instructionsInput = () => cy.get('input[name=instructions]')
    const submitButton = () => cy.get('button[id="order-button"]')

    it('Sanity test', () => {
        expect(1 + 2).to.equal(3);
        expect(2 + 2).not.to.equal(5);
        expect({}).not.to.equal({});
        expect({}).to.eql({});
    })

    it('Elements are showing?', () => {
        nameInput().should('exist')
        sizeDropdown().should('exist')
        toppingBoxes().should('exist')
        instructionsInput().should('exist')
        submitButton().should('exist')
    })

    describe('Inputs can be filled and submitted?', () => {
        it('Inputs with interaction?', () => {
            nameInput()
                .should('have.value', '')
                .type('Bryce')
                .should('have.value', 'Bryce')
            sizeDropdown()
                .should('have.value', '')
                .select('small')
                .select('medium')
                .select('large')
                .select('extra-large')
            toppingBoxes()
                .check()
            instructionsInput()
                .should('have.value', '')
                .type('No instructions')
                .should('have.value', 'No instructions')
        })

        it('Add to Order button works?', () => {
            nameInput()
                .type('Bryce')
            sizeDropdown()
                .select('large')
            toppingBoxes()
                .check()
            instructionsInput()
                .type('No further instructions')
            submitButton()
                .click()
        })
    })

})