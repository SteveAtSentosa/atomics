const baseConfig = require('@atomics/dev-common/babel.config.base.js')
const reactConfig = require('@atomics/dev-common/babel.config.react.js')

module.exports = {
  presets: [
    ...reactConfig.presets || [],
    ...baseConfig.presets || [],
  ],
  plugins: [
    ...reactConfig.plugins || [],
    ...baseConfig.plugins || [],
  ]
}
