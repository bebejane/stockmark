import { routing } from '@/i18n/routing'

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
    title: locale === 'en' ? 'About us' : 'Om oss',
    slug: routing.pathnames['/om-oss'][locale],
  }, {
    id: 'about-you',
    title: locale === 'en' ? 'You' : 'Om dig',
    slug: routing.pathnames['/om-dig'][locale],
  }, {
    id: 'manifest',
    title: 'Manifest',
    slug: routing.pathnames['/manifest'][locale],
  }, {
    id: 'portfolio',
    title: locale === 'en' ? 'Portfolio' : 'Portfölj',
    slug: routing.pathnames['/portfolj'][locale],
  }, {
    id: 'contact',
    title: locale === 'en' ? 'Contact' : 'Kontakt',
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