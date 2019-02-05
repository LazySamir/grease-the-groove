describe('Exercise input form', function() {
  it('loads correctly', function() {
  	cy.visit('http://localhost:3000')
    cy.contains('Add a new excercise and max reps')
  })
  it('focuses on exercise form', function() {
    cy.get('[name="excerciseInputBox"]').focus()
  })
  describe('Exercise input box', function(){
	  it('accepts text', function(){
	  	cy.get('[name="excerciseInputBox"]')
        .type('PullupTest')
        .should('have.value', 'PullupTest')
	  })
  })
  describe('Max Reps input box', function() {
    it('does not accepts letters', function(){
      cy.get('[name="maxRepsInputBox"]')
        .type('one')
        .should('have.value', '')
    })
    it('accepts numbers', function(){
	  	cy.get('[name="maxRepsInputBox"]')
        .type('1')
        .should('have.value', '1')
	  })
  })
  describe('Exercise add button', function() {
    it('creates a new entry when clicked', function(){
      cy.get('[name="addButton"')
        .click()
      cy.contains('PullupTest 1')
    })
  })
  describe('Exercise remove button', function() {
    xit('removes the associated exercise when clicked', function(){

    })
  })
})