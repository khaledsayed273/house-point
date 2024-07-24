/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'dashboard.insurance-skay.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
    // output: "export" 
};

export default nextConfig;
