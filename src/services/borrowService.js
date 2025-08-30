import { getRequest, postRequest } from "./apiService";

export async function borrowBook({ bookId }) {
  const response = await postRequest("/borrow", { bookId });
  return response;
}

export async function returnBook({ borrowId }) {
  const response = await postRequest("/borrow/return", { borrowId });
  return response;
}

export async function getBorrowHistory() {
  const response = await getRequest("/borrow/history");
  return response;
}
