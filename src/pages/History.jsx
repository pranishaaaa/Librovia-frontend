import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBorrowHistory, returnBook } from "../services/borrowService";

const filters = [
  { label: "Borrowed", value: "borrowed" },
  { label: "Returned", value: "returned" },
];

export default function History() {
  const [filter, setFilter] = useState("borrowed");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [borrowedCount, setBorrowedCount] = useState(0);
  const [returnedCount, setReturnedCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchHistory() {
      setLoading(true);
      try {
        const res = await getBorrowHistory();
        const borrows = res.borrows || [];
        setHistory(borrows);

        setBorrowedCount(borrows.filter((b) => !b.returnDate).length);
        setReturnedCount(borrows.filter((b) => b.returnDate).length);
      } catch (err) {
        console.error(err);
        setHistory([]);
        setBorrowedCount(0);
        setReturnedCount(0);
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  function getStatus(borrow) {
    if (borrow.returnDate) return "returned";
    return "borrowed";
  }

  const filteredHistory = history.filter((item) => getStatus(item) === filter);

  const handleReturn = async (borrowId) => {
    try {
      const res = await returnBook({ borrowId });
      if (res.success) {
        // Refetch borrow history from backend to ensure UI is up-to-date
        const updatedHistory = await getBorrowHistory();
        setHistory(updatedHistory);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-white dark:bg-black rounded-xl shadow-lg dark:shadow-white/20">
      <h1 className="text-2xl font-bold text-green-500 mb-6 text-center">
        Borrow History
      </h1>

      <div className="flex flex-row gap-12 flex-1 justify-center mb-6">
        <div className="bg-green-50 rounded-lg p-3 flex items-center gap-2 shadow min-w-[90px]">
          <span className="text-xl font-bold text-green-700">
            {borrowedCount}
          </span>
          <span className="text-xs text-green-700">Borrowed</span>
        </div>
        <div className="bg-red-50 rounded-lg p-3 flex items-center gap-2 shadow min-w-[90px]">
          <span className="text-xl font-bold text-red-700">
            {returnedCount}
          </span>
          <span className="text-xs text-red-700">Returned</span>
        </div>
      </div>

      <div className="flex justify-center gap-4 mb-6">
        {filters.map((f) => (
          <button
            key={f.value}
            className={`px-4 py-1 cursor-pointer rounded-full font-medium transition-colors ${
              filter === f.value
                ? "bg-green-500 text-white"
                : "bg-gray-100 text-green-700 hover:bg-green-100"
            }`}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {loading ? (
          <div className="text-center text-gray-500 py-8">Loading...</div>
        ) : filteredHistory.length === 0 ? (
          <div className="text-center text-gray-500 py-8">No books found.</div>
        ) : (
          filteredHistory.map((borrow) => (
            <div
              key={borrow._id}
              className="flex items-center gap-4 p-4 rounded-lg shadow cursor-pointer hover:bg-green-50 transition"
              onClick={() => navigate(`/books/${borrow.bookId.isbn}`)}
            >
              <img
                src={borrow.bookId.coverImage}
                alt={borrow.bookId.title}
                className="h-16 w-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <div className="font-semibold text-lg text-green-700">
                  {borrow.bookId.title}
                </div>
                <div className="text-sm text-gray-600">
                  By {borrow.bookId.author}
                </div>
                <div className="text-xs text-gray-500">
                  Taken: {borrow.borrowDate?.slice(0, 10)}
                  {" | "}
                  {borrow.returnDate && (
                    <>
                      {" | "}
                      Returned: {borrow.returnDate?.slice(0, 10)}
                    </>
                  )}
                </div>
              </div>
              {getStatus(borrow) !== "returned" && (
                <button
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReturn(borrow._id);
                  }}
                >
                  Return
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
