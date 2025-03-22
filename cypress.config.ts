const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // Change this to your FlexiCraft URL
    experimentalSessionAndOrigin: true,
    setupNodeEvents(on, config) {
      // Implement event listeners if needed
      
    },
  },
});
