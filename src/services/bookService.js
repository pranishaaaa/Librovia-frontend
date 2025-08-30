import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from "./apiService";

export async function getAllBooks() {
  const response = await getRequest("/books");
  return response;
}

export async function getBookByIsbn(isbn) {
  const response = await getRequest(`/books/${isbn}`);
  return response;
}

export async function createBook({
  title,
  author,
  isbn,
  quantity,
  availableBooks,
  coverImage,
}) {
  const response = await postRequest("/books", {
    title,
    author,
    isbn,
    quantity,
    availableBooks,
    coverImage,
  });
  return response;
}

export async function updateBook(
  isbn,
  { title, author, quantity, availableBooks, coverImage }
) {
  const response = await putRequest(`/books/${isbn}`, {
    title,
    author,
    quantity,
    availableBooks,
    coverImage,
  });
  return response;
}

export async function deleteBook(isbn) {
  const response = await deleteRequest(`/books/${isbn}`);
  return response;
}
