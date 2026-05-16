module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['./src/setupTests.js'],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
    '\\.(svg|png|jpg|gif)$': '<rootDir>/src/__mocks__/fileMock.cjs',
  },
  testMatch: ['**/src/__tests__/**/*.test.[jt]sx'],
}
