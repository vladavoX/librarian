/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['ucarecdn.com'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'ucarecdn.com',
				port: '',
				pathname: '/**'
			}
		]
	}
}

export default nextConfig
