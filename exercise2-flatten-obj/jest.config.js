module.exports = { 
    preset: 'ts-jest', 
    testEnvironment: 'node', 
    roots: ['<rootDir>/src'], 
    testMatch: ['**/?(*.)+(spec|test).ts'], 
    transform: { '^.+\.tsx?$': 'ts-jest'}, 
    moduleFileExtensions: ['ts', 'js', 'json', 'node'], 
    globals: { 'ts-jest': { tsconfig: 'tsconfig.json' } }, 
    transformIgnorePatterns: ['/node_modules/'],
};

