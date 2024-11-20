export function el(name, attributes = {}, ...children) {
    const e = document.createElement(name);
  
    for (const key of Object.keys(attributes)) {
      if (typeof attributes[key] === 'function') {
        e.addEventListener(key, attributes[key]);
        continue;
      }
      e.setAttribute(key, attributes[key]);
    }
  
    for (const child of children) {
      if (!child) {
        console.warn('Child is null', name, attributes);
  
        continue;
      }
  
      if (typeof child === 'string' || typeof child === 'number') {
        e.appendChild(document.createTextNode(child.toString()));
      } else {
        e.appendChild(child);
      }
    }
  
    return e;
  }
  