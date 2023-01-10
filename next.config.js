/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.google.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'img.youtube.com',
                port: '',
            }
        ],
    },
}

module.exports = nextConfig
