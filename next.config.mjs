
import { withPayload } from '@payloadcms/next/withPayload'
import { redirects } from './redirects.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // Existing live website images
      {
        protocol: 'https',
        hostname: 'gerrys.net',
      },

      // Local Payload CMS media images
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/api/media/file/**',
      },
    ],
  },

  async redirects() {
    return redirects
  },

  poweredByHeader: false,

  // CV uploads on the Careers page
  experimental: {
    serverActions: {
      bodySizeLimit: '6mb',
    },
  },
}

export default withPayload(nextConfig, {
  devBundleServerPackages: false,
})
