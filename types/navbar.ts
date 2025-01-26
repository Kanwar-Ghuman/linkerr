export interface MenuItem {
  label: string;
  link: string;
}

export interface ProfileItem {
  key: string;
  label: React.ReactNode;
  className?: string;
  link?: string;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
}

export type ProfileTuple = [string[], ProfileItem[]];

export interface BaseNavbarProps {
  logoLink?: string;
  menuItems?: Array<{
    label: string;
    link: string;
  }>;
  profileItems: ProfileTuple | React.ReactNode;
}

export interface AdminNavbarProps {
  user: {
    name: string;
    email: string;
    image: string;
  };
}
