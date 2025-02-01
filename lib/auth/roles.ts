/* eslint-disable @typescript-eslint/no-explicit-any */
import { isLoggedIn } from "./validate";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

export async function getBackendPermission(app = "") {
  const response = await isLoggedIn();
  if (!response.isValid)
    return {
      isValid: false,
      error: NextResponse.json({ error: "Not logged in" }, { status: 401 }),
    };
  const user = response.user;

  if (app === "admin") {
    return user.role === "ADMIN"
      ? { isValid: true, user }
      : {
          isValid: false,
          error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
        };
  } else if (app === "employer") {
    return user.role === "EMPLOYER"
      ? { isValid: true, user }
      : {
          isValid: false,
          error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
        };
  } else if (app === "student") {
    return user.role === "STUDENT"
      ? { isValid: true, user }
      : {
          isValid: false,
          error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
        };
  } else {
    return {
      isValid: true,
      user,
    };
  }
}

export async function getFrontendPermission(app = "") {
  const response = await isLoggedIn();
  if (!response.isValid)
    return {
      isValid: false,
      error: redirect("/auth/login"),
    };
  const user = response.user;

  if (app === "admin") {
    return user.role === "ADMIN"
      ? { isValid: true, user }
      : { isValid: false, error: redirect("/auth/login") };
  } else if (app === "employer") {
    return user.role === "EMPLOYER"
      ? { isValid: true, user }
      : { isValid: false, error: redirect("/auth/login") };
  } else if (app === "student") {
    return user.role === "STUDENT"
      ? { isValid: true, user }
      : { isValid: false, error: redirect("/auth/login") };
  } else {
    return {
      isValid: true,
      user,
    };
  }
}

export function getApp(user: any) {
  switch (user.role) {
    case "ADMIN":
      return "/admin/dashboard";
    case "EMPLOYER":
      return "/employer/dashboard";
    case "STUDENT":
      return "/student/profile";
    default:
      return "/unauthorized";
  }
}
