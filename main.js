import {el} from "./lib/elements.js";

async function fetchIndex(){
    const file ='./index.json';

    const response =await fetch(file);
    const json=await response.json();
    
    return json;
}



async function render(root){
    const indexJson =await fetchIndex();
    console.log('rendering',root, indexJson.title);
   
/*
<nav>
<a href="${url}">${title}</a>
<a href="${url}">${title}</a>
<a href="${url}">${title}</a>
</nav>

*/ 
const headerElement =el('header',{},el('h1',{},indexJson.title)) ;  
const navigationElement=el('nav',{});

for(const item of indexJson.navigation){
    const{title ,slug}=item;
   const href='#${slug}';
    const navItemElement=el('a',{href},title);
    navigationElement.appendChild(navItemElement);
}
headerElement.appendChild(navigationElement);



    
const mainElement =el('main',{},el('h2',{},el('section',{},el('p',{},indexJson.description)),));
const footerElement=el('footer',{},indexJson.footer)
   root.appendChild(headerElement);
   root.appendChild(mainElement)
   root.appendChild(footerElement);

}



const root =document.querySelector('#app');

render(root);
