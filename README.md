
# 🧪 Projeto de Automação de Testes de API - Restful-Booker

Este repositório contém o projeto de automação de testes de API para a aplicação **Restful-Booker**, uma API pública de gerenciamento de reservas de hotel. O objetivo deste projeto é garantir a qualidade, estabilidade e o funcionamento correto dos endpoints principais da aplicação.

🔗 **Site da API:** [Restful-Booker API Doc](https://restful-booker.herokuapp.com/apidoc/index.html)

💡 **O Plano de Testes Completo (com descrição de casos de teste e report de bugs) pode ser acessado aqui:** 
👉 [Plano de Testes Detalhado - Restful-Booker](docs/plano-de-testes-e-bugs.docx)
---

## 🚀 Tecnologias Utilizadas

* **Framework de Testes:** Cypress / Postman
* **Linguagem:** JavaScript / Node.js

---

## 🎯 Cenários de Testes Automatizados

Com foco em garantir o comportamento esperado da API, os cenários foram mapeados por Histórias de Usuário e estruturados da seguinte forma:

### - Autenticação
* **Caso de teste Autenticação 1** – Autenticação com sucesso com credenciais válidas
* **Caso de teste Autenticação 2** – Validações de campos obrigatórios na autenticação

###  – Buscar reserva
* **Caso de teste Busca 1** – Busca de reserva com sucesso
* **Caso de teste Busca 2** – Busca de reserva inexistente
* **Caso de teste Busca 3** – Busca de reserva passando ID com caracteres especiais
* **Caso de teste Busca 4** – Busca de reserva passando ID com número inválido (negativo)

###  – Cadastrar reserva
* **Caso de teste Cadastro 1** – Cadastrar reserva com sucesso
* **Caso de teste Cadastro 2** – Cadastrar reserva passando payload vazio
* **Caso de teste Cadastro 3** – Validações de campos e tipos de dados no cadastro

### - Atualizar reserva completa
* **Caso de teste Atualização Completa 1** – Atualizar reserva completa com sucesso
* **Caso de teste Atualização Completa 2** – Tentar atualizar reserva inexistente
* **Caso de teste Atualização Completa 3** – Tentar atualizar reserva com payload vazio
* **Caso de teste Atualização Completa 4** – Validar rejeição de atualização sem token válido

### - Atualizar reserva parcial
* **Caso de teste Atualização Parcial 1** – Atualizar parcialmente dados da reserva com sucesso
* **Caso de teste Atualização Parcial 2** – Tentar atualizar parcialmente reserva com payload vazio
* **Caso de teste Atualização Parcial 3** – Tentar atualizar parcialmente reserva inexistente
* **Caso de teste Atualização Parcial 4** – Validar rejeição de atualização parcial sem token válido

###  – Deletar reserva
* **Caso de teste Exclusão 1** – Deletar reserva com sucesso
* **Caso de teste Exclusão 2** – Tentar deletar reserva já excluída
* **Caso de teste Exclusão 3** – Tentar deletar reserva inexistente
* **Caso de teste Exclusão 4** – Validar rejeição de exclusão sem token válido

---

## 🐛 Bugs Encontrados nos Testes

Durante a execução da automação, foram identificadas as seguintes inconformidades entre o comportamento real da API e as boas práticas de desenvolvimento/regras de negócio:

* **[BUG] [API-Auth]** Autenticação retorna Status `200 OK` em falhas de autenticação.
* **[BUG] [API-Booking]** Busca retorna Status `404 Not Found` para IDs malformados.
* **[BUG] [API-Booking]** Cadastro retorna Status `500 Internal Server Error` para payloads incompletos ou vazios.
* **[BUG] [API-Booking]** Cadastro retorna Status `500 Internal Server Error` ao enviar campo *firstname* preenchido com números.
* **[BUG] [API-Booking]** Cadastro de reserva com sucesso recebendo dados inválidos ou em branco.
* **[BUG] [API-Booking]** Atualização parcial retorna Status `405 Method Not Allowed` para ID inexistente.
* **[BUG] [API-Booking]** Atualização completa retorna Status `405 Method Not Allowed` para ID inexistente.
* **[BUG] [API-Booking]** Exclusão retorna Status `405 Method Not Allowed` para ID inexistente.
* **[BUG] [API-Booking]** Exclusão retorna Status `201 Created` em exclusões bem-sucedidas.

---

## 👤 Autor

* **Matheus Koehler Zanella** - Quality Assurance Engineer
