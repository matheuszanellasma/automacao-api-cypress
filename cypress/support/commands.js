// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('autenticacao', (user, password) => {
    cy.request({
        method: 'POST',
        url: '/auth',
        body: {
            username: user,
            password: password
        },
        failOnStatusCode: false
    })
})

Cypress.Commands.add('buscar_reserva', (id) => {
    cy.request({
        method: 'GET',
        url: '/booking/' + id,
        failOnStatusCode: false
    })
})
Cypress.Commands.add('cadastrar_reserva', (payload) => {
    cy.request({
        method: 'POST',
        url: "/booking",
        body: payload,
        failOnStatusCode: false
    })
})

Cypress.Commands.add('deletar_reserva', (id, token) => {
    cy.request({
        method: 'DELETE',
        url: '/booking/' + id,
        headers: {
            'cookie': 'token=' + token
        },
        failOnStatusCode: false
    })
})

Cypress.Commands.add('atualizar_reserva_parcial', (payload_parcial, id, token) => {
    cy.request({
        method: 'PATCH',
        url: '/booking/' + id,
        headers: {
            'cookie': 'token=' + token
        },
        body: payload_parcial,
        failOnStatusCode: false
    })
})

Cypress.Commands.add('atualizar_reserva_completa', (payload, id, token) =>{
    cy.request({
        method: 'PUT',
        url: '/booking/' +id,
        headers :{
            'cookie': 'token='+token
        },
        body : payload,
        failOnStatusCode : false
    })
})