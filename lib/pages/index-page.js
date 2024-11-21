import { renderNavigation } from '../components/navigation.js';
import { el } from '../elements.js';

export function renderIndexPage(root, indexJson) {
  // 构建页面标题
  const headerElement = el('header', {}, el('h1', {}, indexJson.title));

  // 添加导航
  headerElement.appendChild(renderNavigation(indexJson.navigation));

  // 添加描述
  const mainElement = el(
    'main',
    {},
    el('section', {}, el('p', {}, indexJson.description))
  );

  // 添加页脚
  const footerElement = el('footer', {}, indexJson.footer);

  root.appendChild(headerElement);
  root.appendChild(mainElement);
  root.appendChild(footerElement);
}
