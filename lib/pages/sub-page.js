import { el } from '../elements.js';
import { fetcher } from '../fetcher.js';
import { renderNavigation } from '../components/navigation.js';

export async function renderSubpage(root, indexJson, type) {
  const contentJson = await fetcher(`/data/${type}/index.json`);


  const headerElement = el('header', {}, el('h1', {}, contentJson.title));
  headerElement.appendChild(renderNavigation(indexJson.navigation));

  const mainElement = el(
    'main',
    {},
    el('p', {}, contentJson.text), 
    el(
      'ul',
      {},
      ...contentJson.content.map((item) =>
        el(
          'li',
          {},
          el(
            'a',
            { href: `/?type=${type}&content=${item.slug}` },
            `${item.title}: ${item.text}`
          )
        )
      )
    )
  );

  const footerElement = el('footer', {}, indexJson.footer);

  root.appendChild(headerElement);
  root.appendChild(mainElement);
  root.appendChild(footerElement);
}