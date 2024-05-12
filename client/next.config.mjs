/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BACKEND_URL: 'https://stuneckt-assignment.onrender.com',
    },
    images: {
        domains: ['upload.wikimedia.org', 'github.githubassets.com', 'encrypted-tbn0.gstatic.com'],
    },
};

export default nextConfig;
