"use server";

import { BaseNavbar } from "./baseNavbar";
import {
  AdminNavbarProps,
  MenuItem,
  ProfileItem,
  ProfileTuple,
} from "../../types/navbar";

export async function StudentNavbar({ user }: AdminNavbarProps) {
  console.log("StudentNavbar - User data:", user);
  console.log("StudentNavbar - User image:", user?.image);
  console.log("StudentNavbar - User name:", user?.name);

  const menuItems: MenuItem[] = [
    { label: "Home", link: "/student/dashboard" },
    { label: "LinkerrAI", link: "/student/reviews" },
    {
      label: "Edit Profile",
      link: "/student/profile",
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
  console.log("StudentNavbar - Profile data being passed:", profileData);

  return <BaseNavbar menuItems={menuItems} profileItems={profileData} />;
}
