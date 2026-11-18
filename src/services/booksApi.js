
const API_URL = 'https://www.googleapis.com/books/v1/volumes';
const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_BOOKS_API_KEY;
// formats the Google Books response into a consistent book object
function formatBook(book) {

    const info = book.volumeInfo;
// id title author image description pagecount publishedDate publisher category
    return {
        id: book.id,
        title: info.title || 'Unknown Title',
        authors: info.authors || ['Unknown Author'],
        thumbnail: info.imageLinks?.thumbnail || null,
        description: info.description || 'No description available.',
        pageCount: info.pageCount || 0,
        publishedDate: info.publishedDate || 'Unknown',
        publisher: info.publisher || 'Unknown Publisher',
        categories: info.categories || []
    };
}

// searches Google Books using a search term

export async function searchBooks(query) {
    try {
        const url = `${API_URL}?q=${encodeURIComponent(query.trim())}&maxResults=20`;
        console.log('Request URL:', url);

        const response = await fetch(
            `${API_URL}?q=${encodeURIComponent(query.trim())}&maxResults=20&key=${API_KEY}`
        );



        console.log('HTTP Status:', response.status);
        console.log('Response OK:', response.ok);

        const data = await response.json();

        console.log('Google Books response:', data);
        if (!response.ok) {
            throw new Error(JSON.stringify(data));
        }

        return (data.items || []).map(formatBook);

        
    } catch (error) {
        console.error('Actual API error:', error.message);
        throw error;
    }
}

