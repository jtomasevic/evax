// @flow
import { Book } from '../../model';

const getRandomPrice = (min: number, max: number) => {
    let temp = Math.random() * (max - min) + min;
    temp = Math.round(temp / 5) * 5;
    return temp;
};

// helper function to generate price as this piece of information is missing in google API, or it's not usually available.
const getBookPrice = () => (getRandomPrice(15, 200));

export const getBooks = (filter: string): Promise<Array<Book>> => new Promise<Array<Book>>(resolve => {
    if (!filter) {
        filter = 'javascript';
    }
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${filter}`)
        .then((res) => res.json())
        .then((result) => {
            console.log(result);
            if (result.error) {
                throw new Error(JSON.stringify(result));
            } else {
                return result;
            }
        }).then((result) => {
            if (result && result.items) {
                const books = result.items.map(googleBook => ({
                    id: googleBook.id,
                    title: googleBook.volumeInfo.title,
                    subtitle: googleBook.volumeInfo.subtitle,
                    publisher: googleBook.publisher,
                    images: googleBook.volumeInfo.imageLinks ? {
                        small: googleBook.volumeInfo.imageLinks.smallThumbnail ? googleBook.volumeInfo.imageLinks.smallThumbnail : '',
                        big: googleBook.volumeInfo.imageLinks.thumbnail
                    } : null,
                    language: 'sr',
                    authors: googleBook.volumeInfo.authors,
                    description: googleBook.volumeInfo.description,
                    price: getBookPrice()
                }));
                console.log('google api: ', books);
                resolve(books);
            }
        });
});
