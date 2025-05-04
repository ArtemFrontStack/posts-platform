import {SessionProvider} from "next-auth/react";
import {SignInWithGoogle} from "../components/SignInGoogle";
import {SignInWithYandex} from "../components/SignInYandex";

export default function Page() {
    return (
        <SessionProvider>
            <div className='flex min-h-screen items-center justify-center '>
                <div className='flex flex-col items-center justify-center gap-2 rounded-lg p-8 shadow-lg'>
                    <SignInWithGoogle/>
                    <SignInWithYandex />
                </div>
            </div>
        </SessionProvider>
    )
}