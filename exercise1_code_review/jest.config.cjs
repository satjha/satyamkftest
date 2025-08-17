module.exports = { 
    preset: 'ts-jest', 
    testEnvironment: 'jsdom', 
    setupFilesAfterEnv: ['<rootDir>/src/jest.setup.ts'], 
    moduleNameMapper: { '^@/(.*)$': '/src/$1', }, 
    transform: { 
        '^.+\.tsx?$': ['ts-jest', { 
                useESM: true, 
                tsconfig: {
                 module: 'ESNext', target: 'ES2022', 
                    lib: ['ES2022', 'DOM', 'DOM.Iterable'], 
                    moduleResolution: 'bundler', 
                    allowImportingTsExtensions: true, 
                    verbatimModuleSyntax: false, 
                    moduleDetection: 'force', 
                    noEmit: true, 
                    jsx: 'react-jsx', 
                    types: ['vite/client', 'node'], 
                    strict: true, 
                    noUnusedLocals: true, 
                    noUnusedParameters: true, 
                    erasableSyntaxOnly: true, 
                    noFallthroughCasesInSwitch: true, 
                    noUncheckedSideEffectImports: true, 
                    esModuleInterop: true, 
                    skipLibCheck: true, 
                    useDefineForClassFields: true 
                } 
             }], 
            }, 
            extensionsToTreatAsEsm: ['.ts', '.tsx'], 
            globals: { 
                'ts-jest': { 
                    useESM: true, 
                }, 
            }, 
            testEnvironmentOptions: { 
                customExportConditions: ['node', 'node-addons'], 
            }, 
        };