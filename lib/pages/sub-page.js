import { el } from '../elements.js';
import { fetcher } from '../fetcher.js';
import { renderNavigation } from '../components/navigation.js';

export async function renderSubpage(root, indexJson, type) {
  const contentJson = await fetcher(`/data/${type}/index.json`);

  // 构建页面标题和导航
  const headerElement = el('header', {}, el('h1', {}, contentJson.title));
  headerElement.appendChild(renderNavigation(indexJson.navigation));

  // 构建分类内容
  const mainElement = el(
    'main',
    {},
    el('p', {}, contentJson.text), // 分类描述
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
