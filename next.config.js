/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
                protocol: 'https',
                hostname: 'www.figma.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
                port: '',
                pathname: '/**',
            },
        ],
    },
    allowedDevOrigins: ['10.20.81.218'],
    transpilePackages: ['@rive-app/react-canvas', '@rive-app/canvas']
};

module.exports = nextConfig;