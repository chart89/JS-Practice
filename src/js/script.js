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

function initActions(){
  booksList.addEventListener('dblclick', function(){
    event.preventDefault();
    if(event.target.offsetParent.classList.contains('book__image')){
      const addId = event.target.offsetParent.getAttribute('data-id');
      const idIndex = favoriteBooks.indexOf(addId);
      if(idIndex === -1){
        event.target.offsetParent.classList.add('favorite');
        favoriteBooks.push(addId);
      } else {
        event.target.offsetParent.classList.remove('favorite');
        favoriteBooks.splice(idIndex, 1);
      }
      console.log(favoriteBooks);
    }
  }); 
} 

initActions();




