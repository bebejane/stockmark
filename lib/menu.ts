
export type MenuItem = {
  id: string,
  title: string,
  slug?: string,
  href?: string,
  sub?: MenuItem[],

}

export type Menu = MenuItem[]

export const buildMenu = async (locale: SiteLocale): Promise<Menu> => {

  const menu: Menu = [{
    id: 'about',
    title: 'Om oss',
    slug: '/om-oss',
  }, {
    id: 'about-you',
    title: 'Om dig',
    slug: '/om-dig',
  }, {
    id: 'manifest',
    title: 'Manifest',
    slug: '/manifest',
  }, {
    id: 'portfolio',
    title: 'Portfölj',
    slug: '/portfolj',
  }, {
    id: 'contact',
    title: 'Kontakt',
  }]
  return menu
}

export const getSelectedMenuItem = (menu: Menu, pathname: string, qs: string): MenuItem | null => {
  const fullPath = `${pathname}${qs ? `?${qs.toString()}` : ""}`;
  const selectedSubFromPathname = menu
    .map(({ sub }) => sub)
    .flat()
    .find(({ slug }) => fullPath === slug)?.id;
  return menu.find(({ sub }) => sub?.find(({ id }) => id === selectedSubFromPathname)) ?? null;
}