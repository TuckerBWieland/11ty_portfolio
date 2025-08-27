const js = require('@eslint/js');

module.exports = [
    js.configs.recommended,
    {
        ignores: ['_site/**', 'dist/**', 'node_modules/**', '*.log', 'coverage/**', '.DS_Store']
    },
    {
        files: ['src/js/**/*.js'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'script',
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
        rules: {
            // Code quality rules
            'no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_'
                }
            ],
            'no-console': 'warn',
            'no-debugger': 'error',
            'no-alert': 'warn',
            'no-var': 'error',
            'prefer-const': 'error',
            'no-trailing-spaces': 'error',
            'eol-last': 'error'

            // Keep only non-style rules - let Prettier handle formatting
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
