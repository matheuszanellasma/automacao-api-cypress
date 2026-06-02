/// <reference types="cypress"/>


describe('Testes de autenticação da api', () => {

    it(('Autenticação com sucesso com credenciais válidas'), () => {
        cy.autenticacao('admin', 'password123').then((resultado_autenticacao) => {
            expect(resultado_autenticacao.status).to.equal(200)
            expect(resultado_autenticacao.body.token).to.exist.and.to.be.a('string')
        })
    })


    describe('Validações de campos obrigatórios na autenticação', () => {

        const cenarios_autenticacao = [
            { username: 'master', password: "password123", msg: 'usuário inválido' ,status: 401}, 
            { username: 'admin', password: "12345", msg: 'senha inválida',status: 401 },
            { username: '', password: "password123", msg: 'usuário em branco' ,status: 401},
            { username: 'admin', password: '', msg: 'senha em branco',status: 401}
        ]

        cenarios_autenticacao.forEach((cenario) => {
            it(('Login mal sucedido com ' + cenario.msg), () => {
                cy.autenticacao(cenario.username, cenario.password).then((resultado_autenticacao) => {
                    expect(resultado_autenticacao.status).to.equal(cenario.status)
                    expect(resultado_autenticacao.body.reason).to.equal('Bad credentials')

                })
            })
        })


    })
})