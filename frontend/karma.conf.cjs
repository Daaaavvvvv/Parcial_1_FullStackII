// Configuración de Karma: abre un navegador real, carga las pruebas de Jasmine y muestra resultados.
// Es .cjs porque Karma lee su configuración con require() (CommonJS) y el proyecto es "type": "module".
module.exports = function (config) {
  // `karma start --coverage` activa la medición de cobertura (Parte 6.6).
  const coverage = process.argv.includes('--coverage')

  config.set({
    frameworks: ['jasmine', 'webpack'],
    files: [
      'src/test/setup.js',
      // Dos patrones en vez de '*.spec.{js,jsx}': Karma 6 falla con las llaves {…} en los globs.
      { pattern: 'src/**/*.spec.js', watched: false },
      { pattern: 'src/**/*.spec.jsx', watched: false },
    ],
    preprocessors: {
      'src/test/setup.js': ['webpack'],
      'src/**/*.spec.js': ['webpack'],
      'src/**/*.spec.jsx': ['webpack'],
    },
    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      resolve: { extensions: ['.js', '.jsx'] },
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            // El proyecto es "type": "module"; sin esto webpack trata src/ como ESM estricto y el
            // `import X from` de paquetes CommonJS (como jasmine-dom) devuelve { default: X }.
            type: 'javascript/auto',
            use: {
              loader: 'babel-loader',
              options: {
                // configFile/babelrc en false: esta config de Babel es solo para las pruebas.
                babelrc: false,
                configFile: false,
                presets: [['@babel/preset-react', { runtime: 'automatic' }]],
                plugins: coverage
                  ? [['istanbul', { exclude: ['**/*.spec.{js,jsx}', 'src/test/**'] }]]
                  : [],
              },
            },
          },
        ],
      },
    },
    reporters: ['progress', 'kjhtml', 'junit', ...(coverage ? ['coverage'] : [])],
    // Informe JUnit (XML): lo entienden GitHub Actions, Jenkins, GitLab… Sirve como evidencia.
    junitReporter: { outputDir: 'test-results', useBrowserName: false, outputFile: 'junit.xml' },
    coverageReporter: {
      dir: 'coverage',
      subdir: '.',
      reporters: [{ type: 'text' }, { type: 'html' }, { type: 'lcovonly' }],
      check: {
        global: { statements: 80, branches: 80, functions: 80, lines: 80 },
      },
    },
    client: { jasmine: { random: true }, clearContext: false },
    browsers: ['ChromeHeadless'],
    customLaunchers: {
      ChromeHeadlessCI: { base: 'ChromeHeadless', flags: ['--no-sandbox'] },
    },
    restartOnFileChange: true,
  })
} 