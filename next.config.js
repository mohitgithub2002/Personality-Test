/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'i.postimg.cc',
            port: '',
            
          },
        ],
      },
      transpilePackages: ['@mui/x-charts']
}

module.exports = nextConfig
