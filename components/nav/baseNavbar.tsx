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
import { BaseNavbarProps, ProfileTuple } from "../../types/navbar";
import Image from "next/image";
import { signOut } from "../home/signout";

export function BaseNavbar({
  logoLink,
  menuItems,
  profileItems,
}: BaseNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const routerUrl = usePathname();

  // Debug the profile items
  if (Array.isArray(profileItems) && profileItems.length === 2) {
    console.log("BaseNavbar - Profile name:", profileItems[0][0]);
    console.log("BaseNavbar - Profile image URL:", profileItems[0][1]);
    console.log("BaseNavbar - Image URL type:", typeof profileItems[0][1]);
    console.log("BaseNavbar - Image URL length:", profileItems[0][1]?.length);
  }

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      className="bg-gradient-to-br from-blue-100 to-white p-5"
      classNames={{
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
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        {logoLink ? (
          <Link href={logoLink}>
            <Image
              src="/linkerr.png"
              alt="Linkerr Logo"
              width={120}
              height={40}
              className="mr-6"
            />
          </Link>
        ) : (
          <Image
            src="/linkerr.png"
            alt="Linkerr Logo"
            width={120}
            height={40}
            className="mr-6"
          />
        )}

        <NavbarContent className="hidden sm:flex gap-6" justify="center">
          {menuItems?.map((item, index) => (
            <NavbarItem
              key={`${item.label}-${index}`}
              isActive={routerUrl === item.link}
            >
              <Link
                href={item.link}
                aria-current={routerUrl === item.link ? "page" : undefined}
                color={routerUrl === item.link ? "primary" : "foreground"}
                className="text-gray-700 hover:text-gray-900 justify-end"
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
      </NavbarContent>
      <NavbarContent justify="end">
        {Array.isArray(profileItems) && profileItems.length === 2 ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <div className="flex items-center">
                {profileItems[0][1] ? (
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-gray-300 cursor-pointer hover:border-blue-500 transition-colors">
                    <Image
                      src={profileItems[0][1]}
                      alt={profileItems[0][0] || "Profile"}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        console.error(
                          "Profile image failed to load:",
                          profileItems[0][1]
                        );
                        // Hide the image on error
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    {/* Fallback avatar with initials */}
                    <div className="absolute inset-0 bg-blue-500 flex items-center justify-center text-white text-sm font-semibold">
                      {profileItems[0][0]
                        ? profileItems[0][0].charAt(0).toUpperCase()
                        : "U"}
                    </div>
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-semibold border-2 border-gray-300 cursor-pointer hover:border-blue-500 transition-colors">
                    {profileItems[0][0]
                      ? profileItems[0][0].charAt(0).toUpperCase()
                      : "U"}
                  </div>
                )}
              </div>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Dynamic Actions"
              items={(profileItems as ProfileTuple)[1]}
              className="bg-white"
            >
              {(item) => (
                <DropdownItem
                  key={item.key}
                  color={item.color}
                  className={item.className}
                  onPress={
                    item.key === "logout"
                      ? () => {
                          signOut();
                        }
                      : undefined
                  }
                >
                  {item.label}
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        ) : (
          <div>{profileItems}</div>
        )}
      </NavbarContent>
      <NavbarMenu>
        {menuItems?.map((item, index) => (
          <NavbarMenuItem
            key={`${item.label}-${index}`}
            isActive={routerUrl === item.link}
          >
            <Link
              className="w-full"
              href={item.link}
              size="lg"
              color={routerUrl === item.link ? "primary" : "foreground"}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
