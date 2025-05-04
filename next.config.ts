import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        domains: ['avatars.yandex.net', "lh3.googleusercontent.com" ]
    },
    env:{
        AUTH_CLIENT_ID: process.env.AUTH_CLIENT_ID,
    }
};

export default nextConfig;