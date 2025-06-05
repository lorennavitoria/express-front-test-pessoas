describe('API Pessoas', () => {
  it('GET /pessoas deve retornar lista', () => {
    cy.request('/pessoas').then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body).to.be.an('array')
    })
  })
})
