"use server";

import { BaseNavbar } from "./baseNavbar";
import { AdminNavbarProps, ProfileItem } from "../../types/navbar";

export interface MenuItem {
  key: string;
  label: string;
  className: string;
  link: string;
}

export interface BaseNavbarProps {
  menuItems: MenuItem[];
  profileItems: ProfileItem[];
  className?: string;
}

export async function EmployerNavbar({ user }: AdminNavbarProps) {
  const menuItems: MenuItem[] = [
    {
      key: "Home",
      label: "Home",
      className: "flex justify-end",
      link: "/employer/dashboard",
    },
    {
      key: "post-job",
      label: "Post Job",

      className: "flex justify-end",

      link: "/employer/create",
    },
  ];

    const profile: ProfileItem[] = [
        {
            key: "profile",
            label: (
                <>
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">{user?.email}</p>
                </>
            ),
            className: "h-20  gap-2",
            link: "/profile",
        },
        { key: "logout", label: "Log Out", color: "danger" },
    ];

  return (
    <BaseNavbar
        menuItems={menuItems}
        profileItems={[[user?.name || "", user?.image || ""], profile]} // Add fallbacks
    />
  );
}
