import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookByIsbn, deleteBook } from "../services/bookService";
import { borrowBook } from "../services/borrowService";
import { useAuth } from "../contexts/AuthContext";
import { EditBookModal } from "../components/EditBookModal";

export default function BookDetails() {
  const { isbn } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    async function fetchBook() {
      setLoading(true);
      setError("");
      try {
        const res = await getBookByIsbn(isbn);
        if (res && res.book) {
          setBook(res.book);
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.error(err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    fetchBook();
  }, [isbn]);

  const handleBorrow = async () => {
    setError("");
    try {
      const res = await borrowBook({ bookId: book._id });
      console.log(res);
    } catch (err) {
      setError(err.message || "Book is already borrowed.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await deleteBook(book.isbn);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Failed to delete book.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <span className="text-lg text-gray-500">Loading...</span>
      </div>
    );
  }

  if (notFound || !book) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-2xl font-bold text-red-500 mb-2">Book Not Found</h2>
        <p className="text-gray-600">
          The book with ISBN <span className="font-mono">{isbn}</span> does not
          exist.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 p-8 max-w-4xl mx-auto bg-white dark:bg-black dark:text-white rounded-xl shadow-lg dark:shadow-white/20 mt-8">
      <div className="flex-shrink-0 flex justify-center items-center md:w-1/3">
        <img
          src={book.coverImage}
          alt="Book cover"
          className="w-64 h-80 object-cover rounded-lg shadow-md"
        />
      </div>

      <div className="flex flex-col justify-between flex-1 gap-6">
        <div>
          <h1 className="text-3xl font-bold text-green-600 mb-2">
            {book.title}
          </h1>
          <div className="text-lg text-gray-700 dark:text-gray-300 mb-1">
            By <span className="font-semibold">{book.author}</span>
          </div>
          <div className="text-sm text-gray-500 mb-4">ISBN: {book.isbn}</div>
          <div className="flex gap-4 mb-2">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              {book.availableBooks} available
            </span>
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
              {book.quantity} total
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 md:w-1/2">
          {user?.role === "librarian" ? (
            <>
              <button
                className="w-full px-6 py-3 rounded-lg font-semibold text-white bg-green-500 hover:bg-green-600 transition-colors duration-200"
                onClick={() => setShowEditModal(true)}
              >
                Edit Book
              </button>
              <button
                className="w-full px-6 py-3 rounded-lg font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors duration-200"
                onClick={handleDelete}
              >
                Delete Book
              </button>
            </>
          ) : (
            <>
              <button
                className="w-full px-6 py-3 rounded-lg font-semibold text-white bg-green-500 hover:bg-green-600 transition-colors duration-200"
                onClick={handleBorrow}
              >
                Borrow Book
              </button>
            </>
          )}

          {showEditModal && (
            <EditBookModal
              open={showEditModal}
              onClose={() => setShowEditModal(false)}
              book={book}
              onBookUpdated={(updatedBook) => {
                setBook(updatedBook);
                setShowEditModal(false);
              }}
            />
          )}

          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        </div>
      </div>
    </div>
  );
}
