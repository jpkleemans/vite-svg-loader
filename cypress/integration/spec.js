describe('Vite SVG Loader', () => {
  it('successfully loads test page', () => {
    cy.visit('/')
    cy.contains('Hello Vue 3 + Vite')
  })

  it('loads svg file', () => {
    cy.get('#component svg')
      .should('exist')
      .and(($svg) => {
        expect($svg[0].width.baseVal.value).to.equal(467)
      })
  })

  it('accepts classes', () => {
    cy.get('#component svg.test-svg').should('exist')
  })

  it('accepts other attributes', () => {
    cy.get('#component svg[data-animal="bird"]').should('exist')
    cy.get('#component svg[aria-hidden="true"]').should('exist')
  })

  it('loads svg file via <img>', () => {
    cy.get('#image img')
      .should('exist')
      .and(($img) => {
        expect($img[0].naturalWidth).to.equal(467)
      })
  })

  it('supports async components', () => {
    cy.get('#async svg')
      .should('exist')
      .and(($svg) => {
        expect($svg[0].width.baseVal.value).to.equal(400)
      })
  })

  it('supports ?url param', () => {
    cy.get('#url').contains(/^\/assets\/test\..+\.svg/)
  })

  it('supports ?raw param', () => {
    cy.get('#raw').contains('<?xml version="1.0"?>')
  })

  it('uses svgo', () => {
    cy.get('#component svg')
      .should('not.have.attr', 'id') // Should be stripped by svgo
  })

  it('supports ?skipsvgo param', () => {
    cy.get('#skipsvgo svg')
      .should('have.attr', 'id')
  })

  it('ignores root files references', () => {
    cy.get('#root img')
      .should('exist')
      .and(($img) => {
        expect($img[0].width).to.equal(355)
      })
  })

  it('it send path to svgo', () => {
    cy.get('#component svg .test_svg__rectangle').should('exist')
  })
})
