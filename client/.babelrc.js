module.exports = (api) => {
  const isDevelopment = api.env('development');

  return {
    presets: [
      [
        '@babel/preset-env',
        { modules: false }
      ],
      [
        '@babel/preset-react',
        { modules: false }
      ]
    ],
    plugins: [
      '@babel/plugin-transform-runtime',
      !isDevelopment && [
        'babel-plugin-styled-components',
        { 'pure': true }
      ],
      !isDevelopment && [
        'transform-react-remove-prop-types',
        { 'ignoreFilenames': ['node_modules'] }
      ],
      isDevelopment && 'react-refresh/babel'
    ].filter(Boolean),
    compact: !isDevelopment,
    minified: !isDevelopment
  }

};