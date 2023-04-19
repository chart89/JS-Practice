'use strict';

const select = {
  useTemplate: '#template-book',
  booksList: '.books-list',
  form: '.filters'
};

const arrays = {
  favoriteBooks: [],
  filters: []
};

const template = {
  tplBooks: Handlebars.compile(document.querySelector(select.useTemplate).innerHTML),
};

class BooksList {
  constructor(){
    const thisBooksList = this;
    
    thisBooksList.getElements();
    thisBooksList.initData();
    thisBooksList.render();
    thisBooksList.initActions();
  }

  initData() {
    this.data = dataSource.books;
  }

  render(){
    const thisBooksList = this;
    for (let dataBooks of this.data){
      dataBooks.ratingWidth = dataBooks.rating * 10;
      dataBooks.ratingBgc = thisBooksList.determineRatingBgc(dataBooks.rating);
      const generatedHTML = template.tplBooks(dataBooks); 
      const showBooks = utils.createDOMFromHTML(generatedHTML);
      thisBooksList.booksList.appendChild(showBooks);
    }
  }

  getElements(){
    const thisBooksList = this;
    thisBooksList.booksList = document.querySelector(select.booksList);
    thisBooksList.form = document.querySelector(select.form);
  }

  initActions(){
    const thisBooksList = this;
    thisBooksList.booksList.addEventListener('dblclick', function(){
      event.preventDefault();
      if(event.target.offsetParent.classList.contains('book__image')){
        const addId = event.target.offsetParent.getAttribute('data-id');
        const idIndex = arrays.favoriteBooks.indexOf(addId);
        if(idIndex === -1){
          event.target.offsetParent.classList.add('favorite');
          arrays.favoriteBooks.push(addId);
        } else {
          event.target.offsetParent.classList.remove('favorite');
          arrays.favoriteBooks.splice(idIndex, 1);
        }
      }
    }); 
    thisBooksList.form.addEventListener('change', function(){
      event.preventDefault();
      if(event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter'){
        if(event.target.checked && arrays.filters.indexOf(event.target.value) === -1){
          arrays.filters.push(event.target.value);
        } else{
          arrays.filters.splice(event.target.value, 1);
        }
      }
      
      console.log(arrays.filters);
      thisBooksList.filterBox();
    });
  }

  filterBox(){
    for(let dataBooks of this.data){
      let shouldBeHidden = false;
      for(let filter of arrays.filters){
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

  determineRatingBgc(ratingColor){
    if(ratingColor < 6){
      const ratingBgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
      return ratingBgc;
    } else if(ratingColor >6 && ratingColor <= 8){
      const ratingBgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
      return ratingBgc;
    } else if(ratingColor > 8 && ratingColor <= 9){
      const ratingBgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
      return ratingBgc;
    } else if(ratingColor > 9){
      const ratingBgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
      return ratingBgc;
    }  
  }
}
const app = new BooksList();
