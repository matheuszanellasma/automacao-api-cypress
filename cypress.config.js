const { defineConfig } = require("cypress");

module.exports = defineConfig({
    allowCypressEnv: false,
    projectId: "4ngizh",
    e2e: {
        baseUrl: 'https://restful-booker.herokuapp.com',
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
});

