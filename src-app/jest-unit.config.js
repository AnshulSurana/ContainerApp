module.exports = {
  rootDir: ".",
  verbose: true,
  collectCoverage: true,
  testEnvironment: "jsdom",
  collectCoverage: true,
  coverageDirectory: "<rootDir>/coverage",
  coverageReporters: ["text", "lcov"],
  setupFilesAfterEnv: ["<rootDir>/__setup__/setupTests.tsx"],
  coverageThreshold: {
    global: {
      branches: 40,
      lines: 40,
    },
  },
  reporters: [
    "default",
    [
      "<rootDir>/node_modules/jest-html-reporter",
      {
        pageTitle: "Test Report",
        outputPath: "./__tests__/reports/test-report.html",
        includeFailureMsg: true,
      },
    ],
  ],
  testMatch: ["<rootDir>/src/test/**/*.test.js", "<rootDir>/src/test/**/*.test.tsx", "<rootDir>/src/test/**/*.test.ts"],
  testPathIgnorePatterns: ["<rootDir>/__tests__/setup/"],
  globals: {
    IS_DEVELOPMENT: true,
    FONT_PATH: "fonts/",
    DEVELOPMENT_MARKETPLACE_DOMAIN: "https://testmarketplace.-place-.com",
  },
  testURL: "https://testmarketplace.-place-.com/channel/marketplace/credit-memo"
};
