
module.exports = {
  reactStrictMode: true,
  env: {
	WebSocketURL: 'http://localhost:3001',
  },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/', query: { title: 'Login' } },
      '/chat': { page: '/chat', query: { title: 'chat' } }
    }
  },
  images: {
	loader: 'custom',
    path: 'http://local.chat.com/',
	myLoader: ({ src, width, quality }) => {
		return `http://local.chat.com/images/${src}?w=${width}&q=${quality || 75}`
	}
  },

}
