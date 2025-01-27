"use server";

import React, { ReactNode } from "react";

import { isLoggedIn } from "@/lib/auth/validate";
import { redirect } from "next/navigation";
import { StudentNavbar } from "@/components/nav/plainNavbar";

async function Layout({ children }: { children: ReactNode }) {
  const { isValid, user, error } = await isLoggedIn();

  if (!isValid || error || !user) {
    redirect("/login");
  }

  return (
    <div className="bg-gradient-to-br from-blue-100 to-white">
      <StudentNavbar user={user} />
      {children}
    </div>
  );
}

export default Layout;
