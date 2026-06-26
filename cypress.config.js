const { defineConfig } = require("cypress");

module.exports = defineConfig({
    reporter: 'mochawesome',
    e2e: {
        baseUrl: 'https://restful-booker.herokuapp.com',
        allowCypressEnv: false,
        projectId: "4ngizh",
        setupNodeEvents(on, config) {

        },
    },
});