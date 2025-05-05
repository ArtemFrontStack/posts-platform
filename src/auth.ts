import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Yandex from "next-auth/providers/yandex";

export const { handlers, auth, signIn } = NextAuth({
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID as string,
            clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
        }),
        Yandex({
            clientId: process.env.AUTH_YANDEX_ID as string,
            clientSecret: process.env.AUTH_YANDEX_SECRET as string,
        }),
    ],
    secret: process.env.AUTH_SECRET, // Ключ для подписи сессий
});