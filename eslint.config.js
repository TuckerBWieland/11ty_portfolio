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
            'eol-last': 'error',

            // Style rules
            indent: ['error', 4],
            quotes: ['error', 'single', { avoidEscape: true }],
            semi: ['error', 'always'],
            'comma-dangle': ['error', 'never'],
            'brace-style': ['error', '1tbs'],

            // Function rules
            'function-paren-newline': ['error', 'multiline'],
            'space-before-function-paren': [
                'error',
                {
                    anonymous: 'never',
                    named: 'never',
                    asyncArrow: 'always'
                }
            ],

            // Object/Array rules
            'object-curly-spacing': ['error', 'always'],
            'array-bracket-spacing': ['error', 'never'],
            'key-spacing': ['error', { beforeColon: false, afterColon: true }]
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
