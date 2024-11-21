import { el } from '../elements.js';
import { fetcher } from '../fetcher.js';

export async function renderContentPage(root, indexJson) {
  const params = new URLSearchParams(window.location.search);
  const type = params.get('type');
  const content = params.get('content');

  const contentJson = await fetcher(`/data/${type}/${content}.json`);

  // 构建页面标题
  const headerElement = el('header', {}, el('h1', {}, contentJson.title));

  const mainElement = el('main', {});
  contentJson.lectures.forEach((lecture) => {
    const section = el('section', {}, el('h2', {}, lecture.title));

    lecture.content.forEach((item) => {
      if (item.type === 'text') {
        section.appendChild(el('p', {}, item.data));
      } else if (item.type === 'heading') {
        section.appendChild(el('h3', {}, item.data));
      } else if (item.type === 'list') {
        section.appendChild(el('ul', {}, ...item.data.map((li) => el('li', {}, li))));
      } else if (item.type === 'image') {
        section.appendChild(
          el('figure', {}, el('img', { src: item.data }), el('figcaption', {}, item.caption))
        );
      }
    });

    mainElement.appendChild(section);
  });

  const footerElement = el('footer', {}, indexJson.footer);

  root.appendChild(headerElement);
  root.appendChild(mainElement);
  root.appendChild(footerElement);
}
