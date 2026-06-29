import { FlatMenuItem, MenuItem } from "@/src/types/landingPage";

export const flattenTree = (items: MenuItem[], parentId = "", list: FlatMenuItem[] = []): FlatMenuItem[] => {
  if (!items || !Array.isArray(items)) return list;
  items.forEach((item, index) => {
    const id = item._id || Math.random().toString(36).substring(2, 9);
    list.push({
      id,
      title: item.title || "",
      link_type: item.link_type || "Link",
      parent_id: parentId,
      mega_menu: !!item.mega_menu,
      mega_menu_type: item.mega_menu_type || "Simple",
      target_blank: !!item.target_blank,
      page_link: item.page_link || "",
      path: item.path || "",
      link_image: item.link_image || "",
      badge_text: item.badge_text || "",
      badge_color: item.badge_color || "red",
      status: item.status !== false,
      sort_order: index,
      description: item.description || "",
      icon: item.icon || "",
    });
    if (item.children && Array.isArray(item.children)) {
      flattenTree(item.children, id, list);
    }
  });
  return list;
};

export const buildTree = (flatList: FlatMenuItem[], parentId = ""): MenuItem[] => {
  return flatList
    .filter((item) => item.parent_id === parentId)
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((item) => {
      const children = buildTree(flatList, item.id);
      const result: MenuItem = {
        _id: item.id,
        title: item.title,
        link_type: item.link_type,
        mega_menu: item.mega_menu,
        mega_menu_type: item.mega_menu_type,
        target_blank: item.target_blank,
        page_link: item.page_link,
        path: item.path,
        link_image: item.link_image,
        badge_text: item.badge_text,
        badge_color: item.badge_color,
        status: item.status,
        description: item.description,
        icon: item.icon,
      };
      if (children.length > 0) {
        result.children = children;
      }
      return result;
    });
};

export const getBadgeColorHex = (color: string): string => {
  if (!color) return "#ef4444";
  if (color.startsWith("#")) return color;
  const fallbacks: Record<string, string> = {
    red: "#ef4444",
    green: "#10b981",
    yellow: "#f59e0b",
    black: "#000000",
  };
  return fallbacks[color] || "#ef4444";
};

export const getBadgeStyle = (color: string) => {
  const hex = getBadgeColorHex(color);
  return { backgroundColor: hex };
};
