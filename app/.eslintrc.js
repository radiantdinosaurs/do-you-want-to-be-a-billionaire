module.exports = {
    env: {
        node: true,
        mocha: true
    },
    extends: ['standard', 'plugin:react/recommended'],
    rules: {
        indent: ['error', 4, { SwitchCase: 1 }],
        'space-before-function-paren': ['error', 'never'],
        camelcase: 0,
        semi: ['error', 'always']
    },
    globals: {
        fetch: false,
        sessionStorage: false
    },
    plugins: ['react'],
    settings: {
        react: {
            createClass: 'createReactClass',
            pragma: 'React',
            version: '15.0',
            flowVersion: '0.53'
        },
        propWrapperFunctions: ['forbidExtraProps']
    }
};
