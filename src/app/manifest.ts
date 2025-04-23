import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'nome completo do medQRE',
    short_name: 'medQRE',
    description: 'medQRE é um aplicativo para leitura de QR Codes',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f0',
    theme_color: '#fff',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}