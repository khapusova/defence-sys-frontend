const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@text': './src/text.json',
    '@atoms': './src/components/atoms',
    '@constants': './src/constants',
    '@molecules': './src/components/molecules',
    '@organisms': './src/components/organisms',
    '@templates': './src/components/templates',
    '@utils': './src/utils',
    '@pages': './src/pages',
    '@styles': './src/styles',
    '@navigation': './src/navigation',
    '@store': './src/store',
    '@mixins': './src/mixins',
    '@translations': './src/translations',
    '@public': './public',
    '@svgs': './src/assets/svgs',
    '@pngs': './src/assets/pngs',
    '@gifs': './src/assets/gifs',
    '@hocs': './src/hocs',
    '@hooks': './src/hooks',
    '@providers': './src/providers'
  })(config);

  return config;
};
