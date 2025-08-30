import { useEffect, useState } from "react";
import { BookCard } from "../components/BookCard";
import { AddBookModal } from "../components/AddBookModal";
import { useAuth } from "../contexts/AuthContext";
import { getAllBooks } from "../services/bookService";
import { Plus } from "lucide-react";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();

  async function fetchData() {
    setLoading(true);
    try {
      const res = await getAllBooks();
      setBooks(res.books || []);
    } catch (err) {
      console.error(err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border dark:border-white dark:text-white rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="text-lg text-gray-500">Loading books...</span>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6 mx-auto">
          {filteredBooks.map((book) => (
            <BookCard key={book.isbn} {...book} />
          ))}
        </div>
      )}

      {user?.role === "librarian" && (
        <>
          <button
            className="fixed bottom-20 right-16 z-40 cursor-pointer bg-green-500 hover:bg-green-600 dark:text-white rounded-full shadow-lg p-4 flex items-center justify-center text-3xl"
            onClick={() => setShowModal(true)}
            aria-label="Add Book"
          >
            <Plus />
          </button>
          <AddBookModal
            open={showModal}
            onClose={() => setShowModal(false)}
            onBookAdded={fetchData}
          />
        </>
      )}
    </div>
  );
}
