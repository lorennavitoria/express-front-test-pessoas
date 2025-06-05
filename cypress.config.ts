import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3001', // porta da API backend
    specPattern: 'cypress/**/*.cy.{js,ts}',
    supportFile: 'cypress/support/e2e.ts',
  },
})
