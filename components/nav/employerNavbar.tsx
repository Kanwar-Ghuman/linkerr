"use server";

import { BaseNavbar } from "./baseNavbar";
import { AdminNavbarProps, MenuItem, ProfileItem } from "../../types/navbar";

export async function EmployerNavbar({ user }: AdminNavbarProps) {
  const menuItems: MenuItem[] = [];

  const profile: ProfileItem[] = [
    {
      key: "profile",
      label: (
        <>
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{user.email}</p>
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
      profileItems={[[user.name, user.image], profile]}
    />
  );
}
