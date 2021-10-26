describe('Vite SVG Loader', () => {
  it('successfully loads test page', () => {
    cy.visit('/')
    cy.contains('Hello Vue 3 + Vite')
  })

  it('loads svg file', () => {
    cy.get('svg')
      .should('exist')
      .and(($svg) => {
        expect($svg[0].width.baseVal.value).to.equal(467)
      })
  })

  it('loads svg file via <img>', () => {
    cy.get('img')
      .should('exist')
      .and(($img) => {
        expect($img[0].naturalWidth).to.equal(467)
      })
  })

  it('accepts classes', () => {
    cy.get('svg.test-svg').should('exist')
  })

  it('supports ?url param', () => {
    cy.get('#url').contains(/^\/assets\/test\..+\.svg/)
  })

  it('supports ?raw param', () => {
    cy.get('#raw').contains('<?xml version="1.0"?>')
  })
})
