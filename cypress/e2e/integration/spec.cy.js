describe('Vite SVG Loader', () => {
  it('successfully loads test page', () => {
    cy.visit('/')
    cy.contains('Hello Vue 3 + Vite')
  })

  it('loads svg file', () => {
    cy.visit('/')
    cy.get('#component svg')
      .should('exist')
      .and(($svg) => {
        expect($svg[0].width.baseVal.value).to.equal(467)
      })
  })

  it('accepts classes', () => {
    cy.visit('/')
    cy.get('#component svg.test-svg').should('exist')
  })

  it('accepts other attributes', () => {
    cy.visit('/')
    cy.get('#component svg[data-animal="bird"]').should('exist')
    cy.get('#component svg[aria-hidden="true"]').should('exist')
  })

  it('loads svg file via <img>', () => {
    cy.visit('/')
    cy.get('#image img')
      .should('exist')
      .and(($img) => {
        expect($img[0].naturalWidth).to.equal(467)
      })
  })

  it('supports async components', () => {
    cy.visit('/')
    cy.get('#async svg')
      .should('exist')
      .and(($svg) => {
        expect($svg[0].width.baseVal.value).to.equal(400)
      })
  })

  it('keeps style tag in components', () => {
    cy.visit('/')
    cy.get('#style-tag svg style')
      .should('exist')
  })

  it('supports ?url param', () => {
    cy.visit('/')
    cy.get('#url').contains(/^data:image\/svg\+xml|^\/assets\/test.*\.svg/)
  })

  it('supports ?raw param', () => {
    cy.visit('/')
    cy.get('#raw').contains('<?xml version="1.0"?>')
  })

  it('uses svgo', () => {
    cy.visit('/')
    cy.get('#component svg')
      .should('not.have.attr', 'id') // Should be stripped by svgo
  })

  it('supports ?skipsvgo param', () => {
    cy.visit('/')
    cy.get('#skipsvgo svg')
      .should('have.attr', 'id')
  })

  it('ignores root files references', () => {
    cy.visit('/')
    cy.get('#root img')
      .should('exist')
      .and(($img) => {
        expect($img[0].width).to.equal(355)
      })
  })

  it('it send path to svgo', () => {
    cy.visit('/')
    cy.get('#component svg .test_svg__rectangle').should('exist')
  })

  it('checkes title element', () => {
    cy.visit('/')
    cy.get('#component svg title')
      .should('exist')
      .and('have.text', 'Test SVG')
    cy.get('#async svg title')
      .should('exist')
      .and('have.text', 'Async')
    cy.get('#skipsvgo svg title')
      .should('exist')
      .and('have.text', 'Skip SVGO')
    cy.get('#style-tag svg title')
      .should('exist')
      .and('have.text', 'Style Tag Test')
  })
})
