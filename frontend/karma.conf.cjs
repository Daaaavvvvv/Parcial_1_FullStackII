const fs = require('fs');

if (process.platform === 'win32' && !process.env.CHROME_BIN) {
  const chrome64 = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome32 = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
  if (fs.existsSync(chrome64)) {
    process.env.CHROME_BIN = chrome64;
  } else if (fs.existsSync(chrome32)) {
    process.env.CHROME_BIN = chrome32;
  }
}

module.exports = function (config) {
  const coverage = process.argv.includes('--coverage');

  config.set({
    frameworks: ['jasmine', 'webpack'],
    plugins: [
      require('karma-jasmine'),
      require('karma-webpack'),
      require('karma-chrome-launcher'),
      require('karma-edge-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-junit-reporter'),
      require('karma-coverage')
    ],
    files: [
      'src/test/setup.js',
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
            type: 'javascript/auto',
            use: {
              loader: 'babel-loader',
              options: {
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

    browsers: ['ChromeHeadless', 'EdgeHeadlessCustom'],

    customLaunchers: {
      ChromeHeadlessCI: { base: 'ChromeHeadless', flags: ['--no-sandbox'] },
      EdgeHeadlessCustom: {
        base: 'Edge',
        flags: [
          '--headless=new',
          '--disable-gpu',
          '--no-sandbox'
        ]
      }
    },
    singleRun: true, // Se ejecuta una vez y se cierra automáticamente al finalizar
    restartOnFileChange: false,
  });
};