import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'gt5a4y',
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    excludeSpecPattern : [
      'e2e/1-getting-started/**/*', 
      'e2e/2-advanced-examples/**/*'
    ]
  },
});
