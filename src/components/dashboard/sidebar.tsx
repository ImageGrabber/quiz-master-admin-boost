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
  {
    title: "SEO Audit",
    href: "/admin/seo-audit",
    icon: "BarChart3",
    adminOnly: true,
  },
];

export default adminSidebarItems;
