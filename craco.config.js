const { POSTCSS_MODES } = require("@craco/craco");
const CracoAlias = require('craco-alias');  //추가

module.exports = {
  style: {
    postcss: {
      mode: POSTCSS_MODES.file
    }
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'jsconfig',
        baseUrl: "./src"
      },
    },
  ],
};