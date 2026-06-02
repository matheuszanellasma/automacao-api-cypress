/// <reference types="cypress"/>

const { gera_reserva } = require("../fixtures/gera_reserva")

describe('Testes de cadastro de reserva', () => {

    let token = ''

    beforeEach(() => {
        cy.autenticacao('admin', 'password123').then((resultado_autenticacao) => {
            token = resultado_autenticacao.body.token
        })
    })

    it('Cadastro de reserva com sucesso', () => {
        const reserva = gera_reserva()
        cy.cadastrar_reserva(reserva).then((resultado_cadastro) => {
            expect(resultado_cadastro.status).to.equal(200)
            expect(resultado_cadastro.body.bookingid).to.exist.and.to.be.a('number').and.to.be.greaterThan(0)

            expect(resultado_cadastro.body.booking.firstname).to.equal(reserva.firstname)
            expect(resultado_cadastro.body.booking.lastname).to.equal(reserva.lastname)
            expect(resultado_cadastro.body.booking.totalprice).to.equal(reserva.totalprice)
            expect(resultado_cadastro.body.booking.depositpaid).to.equal(reserva.depositpaid)
            expect(resultado_cadastro.body.booking.additionalneeds).to.equal(reserva.additionalneeds)

            expect(resultado_cadastro.body.booking.bookingdates.checkin).to.equal(reserva.bookingdates.checkin)
            expect(resultado_cadastro.body.booking.bookingdates.checkout).to.equal(reserva.bookingdates.checkout)

            cy.deletar_reserva(resultado_cadastro.body.bookingid, token)
        })
    })

    it('Cadastro de reserva enviando payload incompleto', () => {
        cy.cadastrar_reserva({}).its('status').should('equal', 400)  // recomendado ser 400 bad request
    })

    describe('Validações de campos obrigatórios no Cadastro', () => {

        const cenarios_erro = [
            { campo: 'firstname', valor: '', status: 400, msg: 'firstname em branco' },   // 400 bad request
            { campo: 'firstname', valor: 123, status: 400, msg: 'firstname em números' },  // 400 bad request
            { campo: 'totalprice', valor: 'grátis', status: 400, msg: 'totalprice com texto' }, // 400 bad request
            { campo: 'totalprice', valor: -100, status: 400, msg: 'totalprice negativo' },  // 400 bad request
            { campo: 'depositpaid', valor: 300, status: 400, msg: 'depositpaid com número' },   // 400 bad request
            { campo: 'depositpaid', valor: 'feito', status: 400, msg: 'depositpaid com string' }  // 400 bad request
        ]

        cenarios_erro.forEach((cenario) => {
            it(`Enviar cadastro com ` + cenario.msg, () => {
                const payload = gera_reserva({ [cenario.campo] : cenario.valor })
                cy.cadastrar_reserva(payload).then((res) => {                
                    expect(res.status).to.equal(cenario.status)
                })
            })
        })
    })
})