module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    [
      'module-resolver',
      {
        alias: {
          '@components': './src/components',
          '@containers': './src/containers',
          '@navigation': './src/navigation',
          '@store': './src/stores',
          '@types': './src/types',
          '@utils': './src/utils',
          '@assets': './assets',
        },
      },
    ],
  ],
};