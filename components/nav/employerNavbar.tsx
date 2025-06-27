"use server";

import { BaseNavbar } from "./baseNavbar";
import {
  AdminNavbarProps,
  ProfileItem,
  ProfileTuple,
} from "../../types/navbar";

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
  console.log("EmployerNavbar - User data:", user);
  console.log("EmployerNavbar - User image:", user?.image);
  console.log("EmployerNavbar - User name:", user?.name);

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
      className: "h-20 gap-2",
      link: "/profile",
    },
    { key: "logout", label: "Log Out", color: "danger" },
  ];

  const profileData: ProfileTuple = [
    [user?.name || "", user?.image || ""],
    profile,
  ];
  console.log("EmployerNavbar - Profile data being passed:", profileData);

  return <BaseNavbar menuItems={menuItems} profileItems={profileData} />;
}
