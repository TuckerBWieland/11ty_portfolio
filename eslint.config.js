module.exports = [
    {
        ignores: ['_site/**', 'dist/**', 'node_modules/**', '*.log', 'coverage/**', '.DS_Store']
    },
    {
        files: ['src/scripts/**/*.ts'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            parser: require('@typescript-eslint/parser'),
            parserOptions: {
                project: './tsconfig.json'
            },
            globals: {
                window: 'readonly',
                document: 'readonly',
                console: 'readonly',
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
                setInterval: 'readonly',
                clearInterval: 'readonly',
                JSON: 'readonly',
                Array: 'readonly',
                parseInt: 'readonly'
            }
        },
        plugins: {
            '@typescript-eslint': require('@typescript-eslint/eslint-plugin')
        },
        rules: {
            // TypeScript specific rules
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_'
                }
            ],
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/explicit-function-return-type': 'error',
            '@typescript-eslint/no-inferrable-types': 'error',
            // Basic recommended rules
            'no-console': 'warn',
            'no-debugger': 'error',
            'no-alert': 'warn',
            'no-var': 'error',
            'prefer-const': 'error',
            'no-trailing-spaces': 'error',
            'eol-last': 'error'
        }
    },
    {
        files: ['*.config.js'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                module: 'readonly',
                require: 'readonly',
                process: 'readonly',
                __dirname: 'readonly'
            }
        },
        rules: {
            'no-console': 'off'
        }
    }
];
