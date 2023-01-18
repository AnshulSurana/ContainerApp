module.exports = {
  rootDir: '.',
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 10,
      lines: 25,
      statements: 25
    }
  },
  reporters: [
    'default',
    [
      '<rootDir>/node_modules/jest-html-reporter',
      {
        pageTitle: 'Test Report',
        outputPath: './__tests__/reports/test-report.html',
        includeFailureMsg: true,
        theme: 'lightTheme'
      }
    ]
  ],
  testMatch: ['<rootDir>/src/**/*.test.js'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/routes/navigation/*.{js,jsx}',
    '!src/config/*.{js,jsx}'
  ],
  coveragePathIgnorePatterns: ['src/routes/navigation', 'src/config/'],
  globals: {
    IS_DEVELOPMENT: true,
    FONT_PATH: 'fonts/',
    DEVELOPMENT_MARKETPLACE_DOMAIN: 'https://testmarketplace.-place-.com'
  }
};
