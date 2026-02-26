export interface CategoryTheme {
  bg: string;
  border: string;
  text: string;
  badge: string;
  activeDot: string;
  darkBg: string;
  darkBorder: string;
  darkBadge: string;
  backBg: string;
  backBorder: string;
  gradient: string;
  darkGradient: string;
  icon: string;
}

const palette: CategoryTheme[] = [
  { bg: "bg-violet-50", border: "border-violet-300", text: "text-violet-600", badge: "bg-violet-100 text-violet-700", activeDot: "bg-violet-500", darkBg: "dark:bg-violet-950/30", darkBorder: "dark:border-violet-700/50", darkBadge: "dark:bg-violet-900/50 dark:text-violet-300", backBg: "bg-violet-50", backBorder: "border-violet-200 dark:border-violet-800/40", gradient: "from-violet-500 to-purple-600", darkGradient: "dark:from-violet-600 dark:to-purple-700", icon: "research" },
  { bg: "bg-blue-50", border: "border-blue-300", text: "text-blue-600", badge: "bg-blue-100 text-blue-700", activeDot: "bg-blue-500", darkBg: "dark:bg-blue-950/30", darkBorder: "dark:border-blue-700/50", darkBadge: "dark:bg-blue-900/50 dark:text-blue-300", backBg: "bg-blue-50", backBorder: "border-blue-200 dark:border-blue-800/40", gradient: "from-blue-500 to-indigo-600", darkGradient: "dark:from-blue-600 dark:to-indigo-700", icon: "components" },
  { bg: "bg-emerald-50", border: "border-emerald-300", text: "text-emerald-600", badge: "bg-emerald-100 text-emerald-700", activeDot: "bg-emerald-500", darkBg: "dark:bg-emerald-950/30", darkBorder: "dark:border-emerald-700/50", darkBadge: "dark:bg-emerald-900/50 dark:text-emerald-300", backBg: "bg-emerald-50", backBorder: "border-emerald-200 dark:border-emerald-800/40", gradient: "from-emerald-500 to-teal-600", darkGradient: "dark:from-emerald-600 dark:to-teal-700", icon: "usability" },
  { bg: "bg-amber-50", border: "border-amber-300", text: "text-amber-600", badge: "bg-amber-100 text-amber-700", activeDot: "bg-amber-500", darkBg: "dark:bg-amber-950/30", darkBorder: "dark:border-amber-700/50", darkBadge: "dark:bg-amber-900/50 dark:text-amber-300", backBg: "bg-amber-50", backBorder: "border-amber-200 dark:border-amber-800/40", gradient: "from-amber-500 to-orange-600", darkGradient: "dark:from-amber-600 dark:to-orange-700", icon: "writing" },
  { bg: "bg-rose-50", border: "border-rose-300", text: "text-rose-600", badge: "bg-rose-100 text-rose-700", activeDot: "bg-rose-500", darkBg: "dark:bg-rose-950/30", darkBorder: "dark:border-rose-700/50", darkBadge: "dark:bg-rose-900/50 dark:text-rose-300", backBg: "bg-rose-50", backBorder: "border-rose-200 dark:border-rose-800/40", gradient: "from-rose-500 to-pink-600", darkGradient: "dark:from-rose-600 dark:to-pink-700", icon: "layouts" },
  { bg: "bg-cyan-50", border: "border-cyan-300", text: "text-cyan-600", badge: "bg-cyan-100 text-cyan-700", activeDot: "bg-cyan-500", darkBg: "dark:bg-cyan-950/30", darkBorder: "dark:border-cyan-700/50", darkBadge: "dark:bg-cyan-900/50 dark:text-cyan-300", backBg: "bg-cyan-50", backBorder: "border-cyan-200 dark:border-cyan-800/40", gradient: "from-cyan-500 to-blue-600", darkGradient: "dark:from-cyan-600 dark:to-blue-700", icon: "accessibility" },
  { bg: "bg-orange-50", border: "border-orange-300", text: "text-orange-600", badge: "bg-orange-100 text-orange-700", activeDot: "bg-orange-500", darkBg: "dark:bg-orange-950/30", darkBorder: "dark:border-orange-700/50", darkBadge: "dark:bg-orange-900/50 dark:text-orange-300", backBg: "bg-orange-50", backBorder: "border-orange-200 dark:border-orange-800/40", gradient: "from-orange-500 to-red-600", darkGradient: "dark:from-orange-600 dark:to-red-700", icon: "figma" },
  { bg: "bg-pink-50", border: "border-pink-300", text: "text-pink-600", badge: "bg-pink-100 text-pink-700", activeDot: "bg-pink-500", darkBg: "dark:bg-pink-950/30", darkBorder: "dark:border-pink-700/50", darkBadge: "dark:bg-pink-900/50 dark:text-pink-300", backBg: "bg-pink-50", backBorder: "border-pink-200 dark:border-pink-800/40", gradient: "from-pink-500 to-fuchsia-600", darkGradient: "dark:from-pink-600 dark:to-fuchsia-700", icon: "interaction" },
];

const cache = new Map<string, CategoryTheme>();

export function getCategoryColor(category: string, allCategories: string[]) {
  const key = `${category}::${allCategories.length}`;
  if (cache.has(key)) return cache.get(key)!;

  const sorted = [...allCategories].sort();
  const idx = sorted.indexOf(category);
  const color = palette[idx >= 0 ? idx % palette.length : 0];
  cache.set(key, color);
  return color;
}
