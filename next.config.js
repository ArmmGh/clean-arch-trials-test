/** @type {import('next').NextConfig} */
module.exports = {
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '3mb',
    },
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",

    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8081',
        pathname: '/ipfs/**',
      },
      {
        protocol: 'https',
        hostname: 'brave-quail-62.telebit.io',
        port: '',
        pathname: '/ipfs/**',
      },
      {
        protocol: 'http',
        hostname: '35.159.162.134',
        port: '8080',
        pathname: '/ipfs/**',
      },
      {
        protocol: 'https',
        hostname: 'ipfs.io',
        port: '',
        pathname: '/ipfs/**',
      },
    ],
  },
}
