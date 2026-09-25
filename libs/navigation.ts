export type NavItem = {
  label: string;
  href: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Overview", href: "/" },
  { label: "Letters", href: "/letters" },
  { label: "Reports", href: "/reports" },
  { label: "Settings", href: "/settings" },
];
