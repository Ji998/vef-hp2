import { el } from '../elements.js';

export function renderNavigation(navigation) {
  const navigationElement = el('ul', { class: 'navigation__list' });

  for (const item of navigation) {
    const { title, slug } = item;

    const baseLink = `/?type=${slug}`;
    const subLinks = [
      { text: 'Lectures', href: `${baseLink}&content=lectures` },
      { text: 'Keywords', href: `${baseLink}&content=keywords` },
      { text: 'Questions', href: `${baseLink}&content=questions` },
    ];

    const navItemElement = el(
      'li',
      { class: 'navigation__item' },
      el('a', { href: baseLink, class: 'navigation__link' }, title),
      el(
        'ul',
        {},
        ...subLinks.map((link) =>
          el(
            'li',
            { class: 'navigation__sub-item' },
            el('a', { href: link.href, class: 'navigation__sub-link' }, link.text)
          )
        )
      )
    );

    navigationElement.appendChild(navItemElement);
  }

  return el('nav', { class: 'navigation' }, navigationElement);
}
