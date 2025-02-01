"use server";

import React, { ReactNode } from "react";
import { AdminNavbar } from "@/components/nav/adminNavbar";
import { isLoggedIn } from "@/lib/auth/validate";
import { redirect } from "next/navigation";

async function Layout({ children }: { children: ReactNode }) {
  const { isValid, user, error } = await isLoggedIn();

  if (!isValid || error || !user) {
    redirect("/auth/login");
  }

  return (
    <div>
      <AdminNavbar user={user} />
      {children}
    </div>
  );
}

export default Layout;
