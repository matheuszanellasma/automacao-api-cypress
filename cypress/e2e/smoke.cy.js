describe('Testes Smoke da API', () => {

    describe('Testes de autenticação da api', () => {
        it('Autenticação com sucesso com credenciais válidas', { tags: '@smoke' }, () => {
            cy.autenticacao('admin', 'password123').then((resultado_autenticacao) => {
                expect(resultado_autenticacao.status).to.equal(200)
                expect(resultado_autenticacao.body.token).to.exist.and.to.be.a('string')
            })
        })
    })

    describe('Testes de cadastro de reserva', () => {
        let token = ''

        beforeEach(() => {
            cy.autenticacao('admin', 'password123').then((resultado_autenticacao) => {
                token = resultado_autenticacao.body.token
            })
        })

        it('Cadastro de reserva com sucesso', { tags: '@smoke' }, () => {
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
    })

    describe('Testes de busca de reserva', () => {
        let token = ''

        beforeEach(() => {
            cy.autenticacao('admin', 'password123').then((resultado_autenticacao) => {
                token = resultado_autenticacao.body.token
            })
        })

        it('Buscar reserva com sucesso', { tags: '@smoke' }, () => {
            const reserva = gera_reserva()
            cy.cadastrar_reserva(reserva).then((resultado_cadastro) => {
                const id_cadastro = resultado_cadastro.body.bookingid
                cy.buscar_reserva(id_cadastro).then((resultado_busca) => {
                    expect(resultado_busca.status).to.equal(200)
                    valida_corpo_reserva(resultado_busca, reserva)
                    cy.deletar_reserva(id_cadastro, token)
                })
            })
        })
    })

    describe('Testes de atualizar reserva completa', () => {
        let token = ''

        beforeEach(() => {
            cy.autenticacao('admin', 'password123').then((resultado_autenticacao) => {
                token = resultado_autenticacao.body.token
            })
        })

        it('Atualizar reserva com sucesso', { tags: '@smoke' }, () => {
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
    })

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

        it('Atualizar parcialmente reserva com sucesso', { tags: '@smoke' }, () => {
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
    })

    describe('Testes de deletar reservas', () => {
        let token = ''

        beforeEach(() => {
            cy.autenticacao('admin', 'password123').then((resultado_autenticacao) => {
                token = resultado_autenticacao.body.token
            })
        })

        it('Deletar reserva com sucesso', { tags: '@smoke' }, () => {
            const reserva = gera_reserva()
            cy.cadastrar_reserva(reserva).then((resultado_cadastro) => {
                const id_cadastro = resultado_cadastro.body.bookingid
                cy.deletar_reserva(id_cadastro, token).its('status').should('equal', 201)
                cy.buscar_reserva(id_cadastro).its('status').should('equal', 404)
            })
        })
    })

})
