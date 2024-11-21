import {el} from "./lib/elements.js";

async function fetchIndex(){
    const file ='./index.json';

    const response =await fetch(file);
    const json=await response.json();
    
    return json;
}

function renderNavigation(navigation){
    /*
<nav>
<a href="${url}">${title}</a>
<a href="${url}">${title}</a>
<a href="${url}">${title}</a>
</nav>

*/ 
    const navigationElement=el('ul',{class:'navigation__list'});
for(const item of navigation){
    
    const{title ,slug}=item;
   const href='#${slug}';
    const navItemElement=el('li',{class:'navigation__item'},el('a',{href,class:'navigation__link'},title));
    navigationElement.appendChild(navItemElement);
}

return el('nav',{class:'navigation'},navigationElement)
    
}

async function render(root){
    const indexJson =await fetchIndex();
    console.log('rendering',root, indexJson.title);
    
    
    
    const headerElement =el('header',{},el('h1',{},indexJson.title)) ;

  

headerElement.appendChild(renderNavigation(indexJson.navigation));

/*
<nav>
<a href="${url}">${title}</a>
*/

    
const mainElement =el('main',{},el('h2',{},el('section',{},el('p',{},indexJson.description)),));
const footerElement=el('footer',{},indexJson.footer)
   root.appendChild(headerElement);
   root.appendChild(mainElement)
   root.appendChild(footerElement);

}



const root =document.querySelector('#app');

render(root);
