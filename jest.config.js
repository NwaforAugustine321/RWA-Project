module.exports = {
    // Indicates which environment to use for testing
    testEnvironment: 'node',
  
    // The test match pattern specifies the files Jest should include in the test run
    testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  
    // An array of file extensions your modules use
    moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  
    // The glob patterns Jest uses to detect test files
    testPathIgnorePatterns: [
      '/node_modules/',
      '/build/',
      '/dist/',
    ],
  
    // Setup Files After Env
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  
    // Add any other Jest configurations as needed
  };
  