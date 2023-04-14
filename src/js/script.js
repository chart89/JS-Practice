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
    show.addEventListener('click', function(){
      event.preventDefault();
      show.classList.add('favorite');
      const addId = show.getAttribute('data-id');
      favoriteBooks.push(addId);
      console.log(favoriteBooks);
    });
  }
}
initActions();

  




