

describe('Testes de atualizar parcialmente reservas', () => {

    let token = ''

    beforeEach(() => {
        cy.autenticacao('admin', 'password123').then((resultado_autenticacao) => {
            token = resultado_autenticacao.body.token
        })
    })

    const reserva_parcial = {
        firstname: 'Michael',
        lastname: 'Jordan'
    }

    it('Atualizar parcialmente reserva com sucesso @smoke', { tags: '@smoke' }, () => {

        const reserva = gera_reserva() 

        cy.cadastrar_reserva(reserva).then((resultado_cadastro) => {
            const id_cadastro = resultado_cadastro.body.bookingid

            cy.atualizar_reserva_parcial(reserva_parcial, id_cadastro, token).then((resultado_atualizar_parcial) => {
                expect(resultado_atualizar_parcial.status).to.equal(200)

                expect(reserva_parcial.firstname).to.equal(resultado_atualizar_parcial.body.firstname)
                expect(reserva_parcial.lastname).to.equal(resultado_atualizar_parcial.body.lastname)
                expect(resultado_cadastro.body.booking.totalprice).to.equal(resultado_atualizar_parcial.body.totalprice)
                expect(resultado_cadastro.body.booking.depositpaid).to.equal(resultado_atualizar_parcial.body.depositpaid)
                expect(resultado_cadastro.body.booking.additionalneeds).to.equal(resultado_atualizar_parcial.body.additionalneeds)

                expect(resultado_cadastro.body.booking.bookingdates.checkin).to.equal(resultado_atualizar_parcial.body.bookingdates.checkin)
                expect(resultado_cadastro.body.booking.bookingdates.checkout).to.equal(resultado_atualizar_parcial.body.bookingdates.checkout)

                cy.deletar_reserva(id_cadastro, token)
            })
        })
    })

    it('Atualizar parcialmente reserva inexistente', { tags: '@leke' }, () => {
        cy.atualizar_reserva_parcial(reserva_parcial, 9999 , token).its('status').should('equal', 404)
    })

    it('Atualizar parcialmente reserva com payload vazio', { tags: '@leke' }, () => {
        const reserva = gera_reserva()
        cy.cadastrar_reserva(reserva).then((resultado_cadastro) => {
            const id_cadastro = resultado_cadastro.body.bookingid
            cy.atualizar_reserva_parcial({}, id_cadastro, token).then((resultado_atualizar_parcial) => {
                expect(resultado_atualizar_parcial.status).to.equal(200)
                valida_corpo_reserva (resultado_atualizar_parcial, reserva)                
                cy.deletar_reserva(id_cadastro, token)
            })
        })
    })

    const cenarios_erro_token = [
        { token: '', msg: 'vazio' ,status : 403},
        { token: 'xpto', msg: 'inválido', status: 403 }
    ]


    cenarios_erro_token.forEach((cenario) => {
        it('Atualizar parcialmente reserva com token de auth ' + cenario.msg, { tags: '@leke' }, () => {
            const reserva = gera_reserva()
            cy.cadastrar_reserva(reserva).then((resultado_cadastro) => {
                const id_cadastro = resultado_cadastro.body.bookingid
                cy.atualizar_reserva_parcial(reserva_parcial, id_cadastro, cenario.token).then((resultado_atualizar_parcial) => {

                    expect(resultado_atualizar_parcial.status).to.equal(cenario.status)

                    cy.deletar_reserva(id_cadastro, token)
                })
            })
        })
    })

})