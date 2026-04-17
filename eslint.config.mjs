import nextVitals from 'eslint-config-next/core-web-vitals'

const config = [{
        ignores: ['fix.js', 'scratch/**', '.next/**'],
    },
    ...nextVitals,
]

export default config