export const getUrlWithBasePath = (path: string): string => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (path.startsWith("/")) {
    return `${basePath}${path}`;
  }
  return path;
};
