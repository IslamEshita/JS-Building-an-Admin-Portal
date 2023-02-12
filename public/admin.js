// Your Code Here
async function showBookList() {

    let response = await fetch('http://localhost:3001/listBooks');
    let books = await response.json();

    books.forEach(showBook)
}


async function updateBook(id, quantity) {
    // Update the book
    let response = await fetch('http://localhost:3001/updateBook', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',            
        },
        body: JSON.stringify({
            "id": id,
            "quantity": quantity
        }),
    });
    // Convert to JSON
    let updatedBook = await response.json();

    // Log the result
    console.log(updatedBook);
}



function showBook(book)
{
    let div = document.createElement('div');
    div.id = "div_" + "book" + book.id;
    // Book Title
    let spanTitle = document.createElement('span');
    spanTitle.textContent = book.title;
    div.appendChild(spanTitle);
    // Book Quantity
    let inputTextQuantity = document.createElement('input');
    inputTextQuantity.id = "text_" + "book" + book.id;
    inputTextQuantity.setAttribute('type', 'text');
    inputTextQuantity.setAttribute('value', book.quantity);
    inputTextQuantity.setAttribute('size', 4);
    div.appendChild(inputTextQuantity);
    // Save button
    let inputSubmitButton = document.createElement('input');
    inputSubmitButton.id  = `button_book${book.id}`; 
    inputSubmitButton.setAttribute('type', 'button');
    inputSubmitButton.setAttribute('value', "Save");
    inputSubmitButton.onclick = function(e)
    {       
        // Get the book ID
        let bookID = parseInt(this.id.replace('button_book',''));
        // Generate the input text text ID
        let textID =  `text_book${bookID}`;         
        let quantity = document.getElementById(textID).value;        
        console.log("ID = " + bookID);
        console.log("Qty = " + quantity);
        updateBook(bookID, quantity);
        e.preventDefault();
        e.stopPropagation();
    }
    div.appendChild(inputSubmitButton);

    let root = document.getElementById('root');
    root.appendChild(div);
}

showBookList();