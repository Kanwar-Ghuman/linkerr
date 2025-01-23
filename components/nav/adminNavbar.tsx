"use server";
import { BaseNavbar } from "./baseNavbar";

interface User {
  email: string;
  name: string;
  image: string;
}

interface ProfileItem {
  key: string;
  label: string | JSX.Element; // Allow both string and JSX.Element
  className?: string;
  link?: string;
  color?:
    | "default"
    | "secondary"
    | "success"
    | "primary"
    | "warning"
    | "danger";
}

export async function AdminNavbar({ user }: { user: User }) {
  const menuItems = [
    { label: "Dashboard", link: "/admin/tutor-requests" },
    { label: "Add Tutor", link: "/admin/add-tutor" },
  ];

  const profile: ProfileItem[] = [
    {
      key: "profile",
      label: (
        <>
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{user.email}</p>
        </>
      ),
      className: "h-14 gap-2",
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
