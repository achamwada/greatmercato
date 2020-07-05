module.exports = api => {
  api.cache(false)
  const plugins = []
  const presets = [
    [
      '@babel/env',
      {
        targets: {
          browsers: ['last 2 versions'],
        },
      },
    ],
    '@babel/react',
  ]
  return {
    plugins,
    presets,
  }
}
