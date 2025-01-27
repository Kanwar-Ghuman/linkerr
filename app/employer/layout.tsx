"use server";

import React, { ReactNode } from "react";

import { isLoggedIn } from "@/lib/auth/validate";
import { redirect } from "next/navigation";
import { EmployerNavbar } from "@/components/nav/employerNavbar";

async function Layout({ children }: { children: ReactNode }) {
  const { isValid, user, error } = await isLoggedIn();

  if (!isValid || error || !user) {
    redirect("/login");
  }

  return (
    <div className="bg-gradient-to-br from-blue-100 to-white">
      <EmployerNavbar user={user} />
      {children}
    </div>
  );
}

export default Layout;
