import type {Config} from 'jest';

const config: Config = {
  preset: 'ts-jest',
  verbose: true,
  coveragePathIgnorePatterns: ['node_modules', 'middleware', 'firebase', 'postController.ts', 'applicationController.ts'],
};

export default config;

// /** @type {import('ts-jest').JestConfigWithTsJest} */
// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
//   testPathIgnorePatterns: ['middleware']
// };