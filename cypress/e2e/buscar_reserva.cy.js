

describe('Testes de busca de reserva', ()=>{

    let token = ''

    beforeEach(()=>{
        cy.autenticacao('admin', 'password123').then((resultado_autenticacao)=>{
            token = resultado_autenticacao.body.token
        })
    })

    it('Buscar reserva com sucesso', { tags: '@smoke' },  () => {
        const reserva = gera_reserva()
        cy.cadastrar_reserva(reserva).then((resultado_cadastro) => {
            const id_cadastro = resultado_cadastro.body.bookingid
            cy.buscar_reserva(id_cadastro).then((resultado_busca) => {
                expect(resultado_busca.status).to.equal(200)
                valida_corpo_reserva (resultado_busca, reserva)
                cy.deletar_reserva(id_cadastro, token)
            })
        })
    })

    it('Buscar reserva inexistente', () => {
        cy.buscar_reserva('9999').its('status').should('equal', 404)
    })

    it('Buscar reserva passando ID com caracteres especiais', () => {
        cy.buscar_reserva('@#$%').its('status').should('equal', 400)
    })
    
    it('Buscar reserva passando ID com número inválido (negativo)', () => {
        cy.buscar_reserva('-1').its('status').should('equal', 400)
    })
     
})