import {SessionProvider} from "next-auth/react";
import Dashboard from "@/app/account/dashboard";

export default function Administrator() {
    return (
        <SessionProvider>
            <Dashboard />
        </SessionProvider>
    )
}