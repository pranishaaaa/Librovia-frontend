import { useState } from "react";
import imageCompression from "browser-image-compression";
import { updateBook } from "../services/bookService";

export function EditBookModal({ open, onClose, book, onBookUpdated }) {
  const [form, setForm] = useState({
    title: book.title,
    author: book.author,
    quantity: book.quantity,
    availableBooks: book.availableBooks,
    coverImage: book.coverImage,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.onloadend = () => {
          setForm((f) => ({ ...f, coverImage: reader.result }));
        };
        reader.readAsDataURL(compressedFile);
      } catch {
        setError("Image compression failed.");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]:
        name === "quantity" || name === "availableBooks"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await updateBook(book.isbn, form);
      if (res.book) {
        onBookUpdated(res.book);
      } else {
        setError("Failed to update book.");
      }
    } catch {
      setError("Failed to update book.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 text-blue-500">Edit Book</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2"
            required
            disabled
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={form.author}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2"
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            min={1}
            value={form.quantity}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2"
            required
          />
          <input
            type="number"
            name="availableBooks"
            placeholder="Available Books"
            min={1}
            max={form.quantity}
            value={form.availableBooks}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border rounded-lg px-4 py-2"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        </form>
      </div>
    </div>
  );
}
