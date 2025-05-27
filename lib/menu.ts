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
    slug: '/om-oss',
  }, {
    id: 'about-you',
    title: locale === 'en' ? 'You' : 'Om dig',
    slug: '/om-dig',
  }, {
    id: 'manifest',
    title: 'Manifest',
    slug: '/manifest',
  }, {
    id: 'portfolio',
    title: locale === 'en' ? 'Companies' : 'Bolag',
    slug: '/portfolj',
  }, {
    id: 'contact',
    title: locale === 'en' ? 'Contact' : 'Kontakt',
  }]
  return menu
}

export const getSelectedMenuItem = (menu: Menu, pathname: string): MenuItem | null => {
  const selectedSubFromPathname = menu.find(({ slug }) => pathname === slug)?.id;
  return menu.find(({ sub }) => sub?.find(({ id }) => id === selectedSubFromPathname)) ?? null;
}