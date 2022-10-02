class Bookmark {
    constructor(siteName, siteUrl) {
        this.siteName = siteName;
        this.siteUrl = siteUrl;
    }
}

const submitBtn = document.querySelector('#submit-btn');
const errDiv = document.querySelector('#error-div');
const bookmarksDiv = document.querySelector('#bookmarks-div')

document.addEventListener('DOMContentLoaded', displayBookmarks);

// Event listener on submit button
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    siteName = document.querySelector('#siteName').value;
    siteUrl = document.querySelector('#siteUrl').value;

    if(siteName.length === 0 || siteUrl.length === 0) {
        html = `
        <div class="alert alert-dismissible alert-primary mx-auto" style="max-width: 50rem;" >
            <strong>Oh snap!</strong> <a href="#" class="alert-link">Ensure all fields are filled correctly</a> and try submitting again.
        </div>
        `;
        errDiv.innerHTML = html;

        setTimeout(() => errDiv.innerHTML = '', 3000)
    }
    else {
        let bookmark = new Bookmark(siteName, siteUrl);
        addBookmark(bookmark);
        displayBookmarks();
        document.querySelector('#siteName').value = '';
        document.querySelector('#siteUrl').value = '';
    }
});


bookmarksDiv.addEventListener('click', (e) => {
    deleteBookmark(e.target);
});


// Function to get bookmarks from localstorage
function getBookmarks() {
    let bookmarks;
    if(localStorage.getItem('bookmarks') === null) {
        bookmarks = [];
    } 
    else {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    }
    return bookmarks;
}

// add Bookmark to local storage
function addBookmark(bookmark) {
    let bookmarks = getBookmarks();
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

function deleteBookmark(e) {
    let del = e.nextElementSibling.firstElementChild.textContent;
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    
    bookmarks.forEach((bookmark, index) => {
        if(bookmark.siteName === del) {
            //console.log('Stuff');
            bookmarks.splice(index, 1);
        }
    });

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    displayBookmarks();
}

// Display bookmarks in DOM
function displayBookmarks() {
    bookmarksDiv.innerHTML = '';
    let bookmarks = getBookmarks();
    bookmarks.forEach((bookmark, index) => {
        if(index === 0 || index % 2 === 0) {
            let div = document.createElement('div');
            div.innerHTML = `
            <div class="card text-white bg-danger mb-3 mx-auto" style="max-width: 50rem;" >
                <div class="card-header delete">X</div>
                <div class="card-body">
                    <h4 class="card-title">${bookmark.siteName}</h4>
                    <p class="card-text">${bookmark.siteUrl}</p>
                </div>
            </div>
            `;
            bookmarksDiv.appendChild(div);
        }
        else {
            let div = document.createElement('div');
            div.innerHTML = `
            <div class="card border-danger mb-3 mx-auto" style="max-width: 50rem;">
                <div class="card-header delete">X</div>
                <div class="card-body">
                    <h4 class="card-title">${bookmark.siteName}</h4>
                    <p class="card-text">${bookmark.siteUrl}</p>
                </div>
            </div>
            `;
            bookmarksDiv.appendChild(div);
        }
    });
}