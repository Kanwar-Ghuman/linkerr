"use client";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";
import { usePathname } from "next/navigation";
import React from "react";
import Image from "next/image";

import { BaseNavbarProps, ProfileTuple } from "../../types/navbar";
import { signOut } from "../home/signout";

/**
 * BaseNavbar Component
 *
 * A responsive navigation bar component that supports:
 * - Logo display with optional linking
 * - Menu items with active state indication
 * - User profile dropdown with avatar
 * - Mobile hamburger menu
 *
 * @param logoLink - Optional URL for logo link
 * @param menuItems - Array of navigation menu items
 * @param profileItems - User profile data and dropdown menu items
 */
export function BaseNavbar({
  logoLink,
  menuItems,
  profileItems,
}: BaseNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const currentPath = usePathname();

  /**
   * Renders the user profile avatar with fallback support
   * Attempts to display Google profile image, falls back to initials
   */
  const renderProfileAvatar = () => {
    if (!Array.isArray(profileItems) || profileItems.length !== 2) {
      return <div>{profileItems}</div>;
    }

    const [userName, userImage] = profileItems[0];
    const userInitial = userName ? userName.charAt(0).toUpperCase() : "U";

    return (
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <div className="flex items-center">
            {userImage ? (
              // Profile image container with fallback
              <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-gray-300 cursor-pointer hover:border-blue-500 transition-colors">
                <Image
                  src={userImage}
                  alt={userName || "Profile"}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    // Hide failed images gracefully
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                {/* Fallback initials behind image */}
                <div className="absolute inset-0 bg-blue-500 flex items-center justify-center text-white text-sm font-semibold">
                  {userInitial}
                </div>
              </div>
            ) : (
              // Initials-only avatar when no image provided
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-semibold border-2 border-gray-300 cursor-pointer hover:border-blue-500 transition-colors">
                {userInitial}
              </div>
            )}
          </div>
        </DropdownTrigger>

        {/* Profile dropdown menu */}
        <DropdownMenu
          aria-label="User menu"
          items={(profileItems as ProfileTuple)[1]}
          className="bg-white"
        >
          {(item) => (
            <DropdownItem
              key={item.key}
              color={item.color}
              className={item.className}
              onPress={item.key === "logout" ? () => signOut() : undefined}
            >
              {item.label}
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    );
  };

  /**
   * Renders the main logo with optional linking
   */
  const renderLogo = () => {
    const logoElement = (
      <Image
        src="/linkerr.png"
        alt="Linkerr Logo"
        width={120}
        height={40}
        className="mr-6"
        priority
      />
    );

    return logoLink ? <Link href={logoLink}>{logoElement}</Link> : logoElement;
  };

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      className="bg-gradient-to-br from-blue-100 to-white p-5"
      classNames={{
        // Active menu item styling
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-[#5771FF]",
        ],
      }}
    >
      {/* Left side: Mobile menu toggle + Logo + Desktop menu */}
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />

        {renderLogo()}

        {/* Desktop navigation menu */}
        <NavbarContent className="hidden sm:flex gap-6" justify="center">
          {menuItems?.map((item, index) => (
            <NavbarItem
              key={`${item.label}-${index}`}
              isActive={currentPath === item.link}
            >
              <Link
                href={item.link}
                aria-current={currentPath === item.link ? "page" : undefined}
                color={currentPath === item.link ? "primary" : "foreground"}
                className="text-gray-700 hover:text-gray-900 justify-end"
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
      </NavbarContent>

      {/* Right side: User profile */}
      <NavbarContent justify="end">{renderProfileAvatar()}</NavbarContent>

      {/* Mobile navigation menu */}
      <NavbarMenu>
        {menuItems?.map((item, index) => (
          <NavbarMenuItem
            key={`${item.label}-${index}`}
            isActive={currentPath === item.link}
          >
            <Link
              className="w-full"
              href={item.link}
              size="lg"
              color={currentPath === item.link ? "primary" : "foreground"}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
