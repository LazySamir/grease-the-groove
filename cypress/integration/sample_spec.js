describe('Exercise input form', function() {
  it('loads correctly', function() {
  	cy.visit('http://localhost:3000')
    cy.contains('Add a new excercise and max reps')
  })
  it('focuses on exercise form', function() {
  	cy.visit('http://localhost:3000')
    cy.get('[name="excerciseInputBox"]').focus()
  })
  describe('When adding a new excericise', function(){
	  it('The Excercise input box accepts text', function(){
	  	cy.get('[name="excerciseInputBox"]').type('PullupTest')
	  })
	  it('The Max Reps input box accepts numbers', function(){
	  	cy.get('[name="maxRepsInputBox"]').type('1')
	  })
	  it('Clicking add will create a new entry', function(){
	  	cy.get('[name="addButton"').click()
	  	cy.contains('PullupTest 1')
	  })
	})
})
