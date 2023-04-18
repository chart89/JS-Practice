'use strict';

const templateBooks = document.querySelector('#template-book').innerHTML;
const tplBooks = Handlebars.compile(templateBooks);
const booksList = document.querySelector('.books-list');
const form = document.querySelector('.filters');
const bookImage = document.querySelectorAll('.book__image');



// DISPLAY BOOKS BASED ON TEMPLE
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
const filters =[];

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
    }
  }); 
  form.addEventListener('change', function(){
    event.preventDefault();
    if(event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter'){
      if(event.target.checked && filters.indexOf(event.target.value) === -1){
        filters.push(event.target.value);
      } else{
        filters.splice(event.target.value, 1);
      }
    }
    
    console.log(filters);
    filterBox();
  });
  
} 

initActions();

//FILTERS BOOKS BASED ON CATEGORY
function filterBox(){
  for(let dataBooks of dataSource.books){
    let shouldBeHidden = false;
    for(let filter of filters){
      if(dataBooks.details[filter] !== true){
        shouldBeHidden = true;
        break;
      }
    }
    const shouldBeDispaly = document.querySelector('.book__image[data-id="' + dataBooks.id + '"]');
    if(shouldBeHidden != true){
      shouldBeDispaly.classList.remove('hidden');
    } else {
      shouldBeDispaly.classList.add('hidden');
    }
  }
}



