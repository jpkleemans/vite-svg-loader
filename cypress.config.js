const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    "baseUrl": "http://localhost:5173",
    "pluginsFile": false,
    "supportFile": false,
    "screenshotOnRunFailure": false,
    "video": false
  }
})
