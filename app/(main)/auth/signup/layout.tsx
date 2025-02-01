import { auth } from "@/auth";
import { getApp } from "@/lib/auth/roles";
import { redirect } from "next/navigation";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth();

    if (session) {
        return redirect(getApp(session.user))
    }
    return <div>{children}</div>;
};

export default Layout;

