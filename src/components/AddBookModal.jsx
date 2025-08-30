import { useState } from "react";
import { createBook } from "../services/bookService";
import imageCompression from "browser-image-compression";
import { X as Cross } from "lucide-react";

export function AddBookModal({ open, onClose, onBookAdded }) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    isbn: "",
    quantity: 1,
    availableBooks: 1,
    coverImage: "",
  });
  const [loading, setLoading] = useState(false);

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
      } catch (err) {
        console.error(err);
        alert("Image compression failed.");
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
    if (
      !form.title ||
      !form.author ||
      !form.isbn ||
      form.quantity <= 0 ||
      form.availableBooks <= 0 ||
      form.availableBooks > form.quantity ||
      !form.coverImage
    ) {
      alert("Please fill all fields correctly.");
      return;
    }
    setLoading(true);
    try {
      await createBook(form);
      onBookAdded && onBookAdded();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to add book.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white dark:bg-black dark:text-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
        <button
          className="absolute cursor-pointer top-4 right-4 text-gray-500 hover:text-red-500 text-xl"
          onClick={onClose}
        >
          <Cross />
        </button>
        <h2 className="text-xl font-bold mb-4 text-green-500">Add New Book</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2"
            required
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
            type="text"
            name="isbn"
            placeholder="ISBN"
            value={form.isbn}
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
            required
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Book"}
          </button>
        </form>
      </div>
    </div>
  );
}
