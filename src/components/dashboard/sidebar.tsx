export interface SidebarItem {
  title: string;
  href: string;
  icon: string;
  adminOnly?: boolean;
}

export const adminSidebarItems: SidebarItem[] = [
  {
    title: "Traffic Insights",
    href: "/admin/page-views",
    icon: "Eye",
    adminOnly: true,
  },
];

export default adminSidebarItems;
