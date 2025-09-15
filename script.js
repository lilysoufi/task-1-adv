

class Book {
/*properties */
 #title
 #author
 #catagory
 #isAvailable
   /* Methods for class Book setters , getters and a constructor */
 setTitle(title) {
    this.#title = title ; 
 }
 getTitle () {
     return this.#title;
 }

 setAuthor(author) {
    this.#author = author ; 
 }
 getAuthor () {
     return this.#author;
 }

 setCatagory(catagory) {
    this.#catagory = catagory ; 
 }
 getCatagory () {
     return this.#catagory;
 }

 setIsAvailable(isAvailable) {
    this.#isAvailable = isAvailable ; 
 }
 getIsAvailable () {
     return this.#isAvailable;
 }
 constructor (title , author , catagory , isAvailable) {
     this.#title = title;
     this.#author = author;
     this.#catagory = catagory;
     this.#isAvailable = isAvailable;
 }
 displayInfo() {
   return `This book's title is ${this.#title} and its Author is ${this.#author} and it's catagory is ${this.#catagory} and it's ${ this.#isAvailable ? "Available" : "Not Available"}`
 }
    render() {
    const card = document.createElement('div');
    card.classList.add('book-card');
    
    card.innerHTML = `
      <h3>${this.getTitle()}</h3>
      <p><strong>Author:</strong> ${this.getAuthor()}</p>
      <p><strong>Catagory</strong> ${this.getCatagory()}</p>
      <p id="para-available">${this.getIsAvailable() ? "Available" : "Not Available" }</p>
      <button id="availibity">Available/Not Available</button>
      
    `; 
    return card ;
    
    }
}


class Library {
    
    /* we create a new object from class Book and we push it into our book array then we redisplay the book cards */
    addBook (title , author , catagory , isAvailable){
      const newBook = new Book(title , author , catagory , isAvailable);
          bookData.push(newBook)
          displayCards(bookData);
    }
    
    /* we filter our book array to exclude the book we deleted and we redisplay the book cards */
    removeBook (title) {
       const newBookData =bookData.filter(book =>  {return book.getTitle() !== title });
       
       
       displayCards(newBookData);
    }

    /*we take the string that is inputed in the search bar at the home page and we start filtering the books by their titles or authors and we display the books that match */
    searchBooks (e) {
    
     const searchText = e.target.value.toLowerCase() ;
     
    
     const filteredBooks = bookData.filter((book) => {
      return (

         book.getTitle().toLowerCase().includes(searchText) ||
         book.getAuthor().toLowerCase().includes(searchText)

      );
     }

     )
     
     displayCards(filteredBooks);
    } 
  

     /*  we get the selected value from the drop down list and we filter our book array to find the books with the chosen catagory and we redisplay the book cards */
     filterByCatagory(e) {
            const selectElement = document.getElementById("Catagories");
            const selectedValue = e.target.value.toLowerCase();
            
            
            const filteredCatagory = bookData.filter((book) => {
            return book.getCatagory().toLowerCase() === selectedValue 
        } );
     
     displayCards(filteredCatagory);
     
     }
    
     /* we toggle the value (isAvailable) when the button is clicked */
    toggleAvailibity (e) {
      
      const availibityParagraph = document.getElementById("para-available");
       
       if (availibityParagraph.textContent === "Available") {
          availibityParagraph.textContent="Not Available";
        }
        else {
         availibityParagraph.textContent="Available";
        }
      }
}
 /* we get the html div container and render each book in the book array */
 function displayCards(booklist) {
      const bookGridContainer = document.getElementById('book-grid-container');
       document.getElementById('book-grid-container').innerHTML = ""; 
     
     booklist.forEach(book => {
     bookGridContainer.appendChild(book.render());
    }); 
  }


class ReferenceBook extends Book {

   #locationCode

    setLocationCode(locationCode) {
    this.#locationCode = locationCode ; 
 }
 getLocationCode () {
     return this.#locationCode;
 }
 constructor (title , author , catagory , isAvailable , locationCode) {
  super(title , author , catagory , isAvailable);
  this.#locationCode= locationCode;
 } 
 /* we used Polymorphism to re define the function that was inherited from Book Class */
 displayInfo () {
  return `This book's title is ${this.getTitle()} and its Author is ${this.getAuthor()} and it's catagory is ${this.getCatagory()} and it's ${ this.getIsAvailable() ? "Available" : "Not Available"} and its Location Code is ${this.#locationCode}`
 }
}

  const bookData = [
  new Book('The Hitchhiker\'s Guide to the Galaxy', 'Douglas Adams', 'fiction', false),
  new Book('Pride and Prejudice', 'Jane Austen', 'Drama', true),
  new Book('1984', 'George Orwell', 'Fiction', false),
  new Book('Powerless' , 'Lauren Roberts' , 'fiction' , false),
  new Book('Once Upon a Broken Heart' ,'Stephanie Garber' ,'Fiction' , false)
];

let lib = new Library().addBook('Like gold' ,'Sakura', 'Poetry' , true)

console.log(bookData)

let lib2 = new Library();
lib2.removeBook("1984");
console.log(bookData);

const searchBar =document.getElementById("search-input");

searchBar.addEventListener("input" ,(e) =>  {
  new Library().searchBooks(e)
})
 
 const selectElement = document.getElementById("Catagories");
 selectElement.addEventListener("change", (e) =>  {
  new Library().filterByCatagory(e)
})

const availibityButton = document.getElementById("availibity");
availibityButton.addEventListener("click" ,  (e) =>  {
  new Library().toggleAvailibity(e)
})