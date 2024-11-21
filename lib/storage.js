export function saveProgress(type, content, data) {
    const progress = JSON.parse(localStorage.getItem('progress')) || {};
    if (!progress[type]) {
      progress[type] = {};
    }
    progress[type][content] = data;
    localStorage.setItem('progress', JSON.stringify(progress));
  }
  
  export function loadProgress(type, content) {
    const progress = JSON.parse(localStorage.getItem('progress')) || {};
    return progress[type]?.[content] || null;
  }
  