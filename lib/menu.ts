import { apiQuery } from 'next-dato-utils/api';
//import { MenuDocument } from '@graphql';

export type MenuItem = {
  id: string,
  title: string,
  slug?: string,
  href?: string,
  sub?: MenuItem[],

}

export type Menu = MenuItem[]

export const buildMenu = async (): Promise<Menu> => {


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
    slug: '/portfolio',
  }, {
    id: 'contact',
    title: 'Kontakt',
    slug: '/kontakt',
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