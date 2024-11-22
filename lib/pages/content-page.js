import { el } from '../elements.js';
import { fetcher } from '../fetcher.js';

export async function renderContentPage(root, indexJson) {
  const params = new URLSearchParams(window.location.search);
  const type = params.get('type');
  const content = params.get('content');

  const contentJson = await fetcher(`/data/${type}/${content}.json`);


  const headerElement = el('header', {}, el('h1', {}, contentJson.title));

  const mainElement = el('main', {});
  switch(content) {
    case 'lectures':
      // code block
      contentJson[content].forEach((lecture) => {
        const section = el('section', {}, el('h2', {}, lecture.title));
        mainElement.appendChild(section);
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
      });
      break;
    case 'keywords':
      console.log(contentJson[content]);
      contentJson[content].forEach((item) => {
        const section = el('section', {}, el('h2', {}, item.title));
        mainElement.appendChild(section);
        if(item.english){
          section.appendChild(el('h4', {}, item.english));
        }
        section.appendChild(el('p', {}, item.content));
      });
      // code block
      break;
    case 'questions':
      const form = el('form', {});
      mainElement.appendChild(form);
      contentJson[content].forEach((item, i) => {
        const section = el('section', {}, el('h3', {}, item.question));
        form.appendChild(section);
        item.answers.forEach((answer) => {
          section.appendChild(el('input', {type: 'radio', id: 'q'+i, value: answer.correct, name: i}));
          section.appendChild(el('label',{for: 'q'+i}, answer.answer));
          section.appendChild(el('br',{}));
        });
      });
    default:
      // code block
  }

  const footerElement = el('footer', {}, indexJson.footer);

  root.appendChild(headerElement);
  root.appendChild(mainElement);
  root.appendChild(footerElement);
}
