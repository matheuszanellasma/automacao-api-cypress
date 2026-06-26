const { defineConfig } = require("cypress");

module.exports = defineConfig({
    reporter: 'mochawesome',
    allowCypressEnv: false,
    projectId: "4ngizh",
    e2e: {
        baseUrl: 'https://restful-booker.herokuapp.com',
        setupNodeEvents(on, config) {

        },
    },
});