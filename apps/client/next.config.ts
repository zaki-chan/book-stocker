import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    reactStrictMode: true,
    // Google Books APIの書影画像をnext/imageで使用
    images: {
        remotePatterns:[
            {
                protocol: 'http',
                hostname: 'books.google.com'
            },
        ],
    }
}

export default nextConfig