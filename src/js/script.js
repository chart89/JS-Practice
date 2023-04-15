'use strict';
// DISPLAY BOOKS BASED ON TEMPLE
const templateBooks = document.querySelector('#template-book').innerHTML;
const tplBooks = Handlebars.compile(templateBooks);

const booksList = document.querySelector('.books-list');

function render(){
  for (let dataBooks of dataSource.books){
    const generatedHTML = tplBooks(dataBooks); 
    const showBooks = utils.createDOMFromHTML(generatedHTML);
    booksList.appendChild(showBooks);
  }
}

render();

//FAVORITE BOOKS
const favoriteBooks = [];
const doubleClickElement = document.querySelectorAll('.book__image');

function initActions(){
  for(let show of doubleClickElement){
    show.addEventListener('dblclick', function(){
      event.preventDefault();
      const addId = show.getAttribute('data-id');
      const idIndex = favoriteBooks.indexOf(addId);
      if(idIndex === -1){
        show.classList.add('favorite');
        favoriteBooks.push(addId);
      } else {
        show.classList.remove('favorite');
        favoriteBooks.splice(idIndex, 1);
      }
      console.log(favoriteBooks);
    });
    
  }
}
initActions();

  





