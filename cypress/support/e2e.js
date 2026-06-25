// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

const { gera_reserva } = require('./factories/gera_reserva')
const { valida_corpo_reserva } = require('./helpers')

global.gera_reserva = gera_reserva
global.valida_corpo_reserva = valida_corpo_reserva