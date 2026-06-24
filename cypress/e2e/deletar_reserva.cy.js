

describe('Testes de deletar reservas', () => {

    let token = ''

    beforeEach(() => {
        cy.autenticacao('admin', 'password123').then((resultado_autenticacao) => {
            token = resultado_autenticacao.body.token
        })
    })

    it('Deletar reserva com sucesso', { tags: 'smoke' }, () => {
        const reserva = gera_reserva()
        cy.cadastrar_reserva(reserva).then((resultado_cadastro) => {
            const id_cadastro = resultado_cadastro.body.bookingid
            cy.deletar_reserva(id_cadastro, token).its('status').should('equal', 200)
            cy.buscar_reserva(id_cadastro).its('status').should('equal', 404)
        })
    })

    it('Deletar reserva deletada', () => {
        const reserva = gera_reserva()
        cy.cadastrar_reserva(reserva).then((resultado_cadastro) => {
            const id_cadastro = resultado_cadastro.body.bookingid
            cy.deletar_reserva(id_cadastro, token)
            cy.deletar_reserva(id_cadastro, token).its('status').should('equal', 404)
        })
    })

    it('Deletar reserva inexistente', () => {
        cy.deletar_reserva(9999, token).its('status').should('equal', 404)
    })

    const cenarios_erro_token = [
        { token: '', msg: 'vazio', status: 403 },
        { token: 'xpto', msg: 'inválido', status: 403 }
    ]
    
    cenarios_erro_token.forEach((cenario) => {
        it('Deletar reserva com token de auth ' + cenario.msg, () => {
            const reserva = gera_reserva()
            cy.cadastrar_reserva(reserva).then((resultado_cadastro) => {
                const id_cadastro = resultado_cadastro.body.bookingid
                cy.deletar_reserva(id_cadastro, cenario.token).its('status').should('equal', cenario.status)
                cy.deletar_reserva(id_cadastro, token)
            })
        })
    })
})