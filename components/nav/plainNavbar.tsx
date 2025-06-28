"use server";

import { BaseNavbar } from "./baseNavbar";
import {
  AdminNavbarProps,
  MenuItem,
  ProfileItem,
  ProfileTuple,
} from "../../types/navbar";

/**
 * StudentNavbar Component
 *
 * Renders the navigation bar specifically for student users.
 * Includes student-specific menu items and user profile functionality.
 *
 * @param user - User object containing profile information (name, email, image)
 * @returns Configured BaseNavbar component for students
 */
export async function StudentNavbar({ user }: AdminNavbarProps) {
  // Define navigation menu items for high school students
  const menuItems: MenuItem[] = [
    { label: "Home", link: "/student/dashboard" },
    { label: "LinkerrAI", link: "/student/reviews" },
    { label: "Edit Profile", link: "/student/profile" },
  ];

  // Configure profile dropdown menu items
  const profileMenuItems: ProfileItem[] = [
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
    {
      key: "logout",
      label: "Log Out",
      color: "danger",
    },
  ];

  // Combine user data with menu items for profile dropdown
  const profileData: ProfileTuple = [
    [user?.name || "", user?.image || ""],
    profileMenuItems,
  ];

  return <BaseNavbar menuItems={menuItems} profileItems={profileData} />;
}
