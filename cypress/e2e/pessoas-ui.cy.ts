describe('Fluxo UI Pessoas', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/pessoas').as('getPessoas')
    cy.intercept('POST', '**/pessoas').as('postPessoa') // intercepta POST também

    cy.visit('http://localhost:3000')
    cy.wait('@getPessoas')
  })

  it('Deve criar uma nova pessoa via interface', () => {
    const id = Date.now()

    cy.get('input[placeholder="Nome"]').type(`Teste Cypress ${id}`)
    cy.get('input[placeholder="CPF"]').type(`00000${id.toString().slice(-6)}`)
    cy.get('input[placeholder="Data de nascimento"]').type('2000-01-01')
    cy.get('input[placeholder="Email"]').type(`teste${id}@cypress.com`)

    cy.get('button[type="submit"]').click()

    cy.wait('@postPessoa') // espera o POST
    cy.wait('@getPessoas') // espera a lista recarregar

    cy.contains(`Teste Cypress ${id}`)
  })
})
