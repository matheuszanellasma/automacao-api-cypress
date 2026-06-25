

describe('Testes de atualizar reserva completa', () => {

    let token = ''

    beforeEach(() => {
        cy.autenticacao('admin', 'password123').then((resultado_autenticacao) => {
            token = resultado_autenticacao.body.token
        })
    })

    it('Atualizar reserva com sucesso ', { tags: '@smoke' }, () => {
        const reserva = gera_reserva()
        const nova_reserva = gera_reserva()
        cy.cadastrar_reserva(reserva).then((resultado_cadastro) => {
            const id_cadastro = resultado_cadastro.body.bookingid
            cy.atualizar_reserva_completa(nova_reserva, id_cadastro, token).then((resultado_atualizar_completo) => {
                expect(resultado_atualizar_completo.status).to.equal(200)
                valida_corpo_reserva(resultado_atualizar_completo, nova_reserva)
                cy.deletar_reserva(id_cadastro, token)
            })
        })
    })


    it('Atualizar reserva inexistente', () => {
        const reserva = gera_reserva()
        cy.atualizar_reserva_completa(reserva, '9999', token).its('status').should('equal', 404)
    })


    it('Atualizar com payload vazio', () => {
        const reserva = gera_reserva()

        cy.cadastrar_reserva(reserva).then((resultado_cadastro) => {
            const id_cadastro = resultado_cadastro.body.bookingid
            cy.atualizar_reserva_completa({}, id_cadastro, token).its('status').should('equal', 400)
            cy.deletar_reserva(id_cadastro, token)
        })
    })


    const cenarios_erro_token = [
        { token: '', msg: 'vazio', status: 403 },
        { token: 'xpto', msg: 'inválido', status: 403 }
    ]


    cenarios_erro_token.forEach((cenario) => {
        it('Atualizar reserva completa com token de auth ' + cenario.msg, () => {
            const reserva = gera_reserva()
            const reserva_nova = gera_reserva()
            cy.cadastrar_reserva(reserva).then((resultado_cadastro) => {
                const id_cadastro = resultado_cadastro.body.bookingid
                cy.atualizar_reserva_completa(reserva_nova, id_cadastro, cenario.token).then((resultado_atualizar_parcial) => {
                    expect(resultado_atualizar_parcial.status).to.equal(cenario.status)
                    cy.deletar_reserva(id_cadastro, token)
                })
            })
        })
    })
})