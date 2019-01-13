describe('When visiting app', function() {
  it('App loads correctly', function() {
  	cy.visit('http://localhost:3000') 
    cy.contains('Add a new excercise and max reps')
  })
})