import { useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function About() {
  const images = ["/library-1.webp", "/library-2.webp", "/library-3.webp"];
  const [current, setCurrent] = useState(0);

  const prevImage = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 bg-white dark:bg-black rounded-xl shadow-lg dark:shadow-white/20 p-8">
      <h1 className="text-3xl font-bold text-green-500 mb-4">
        About Librovia Library
      </h1>

      <p className="mb-6 text-gray-700 dark:text-gray-300 text-lg">
        Librovia Library is dedicated to providing a modern and efficient way
        for users to discover, borrow, and manage books. Our system streamlines
        the library experience, making it easy to search for books, track
        borrowed items, and stay informed about overdue returns. Whether you are
        a student, researcher, or avid reader, Librovia helps you access
        knowledge with convenience and simplicity.
      </p>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-green-600 mb-2">Gallery</h2>
        <div className="relative flex items-center justify-center">
          <button
            onClick={prevImage}
            className="absolute cursor-pointer left-0 z-10 bg-green-500 hover:bg-green-600 text-white rounded-full p-2 shadow transition-colors"
            aria-label="Previous"
          >
            <ArrowLeft />
          </button>

          <img
            key={current}
            src={images[current]}
            alt={`Library view ${current + 1}`}
            className={`h-96 object-cover rounded-lg shadow mx-auto`}
          />

          <button
            onClick={nextImage}
            className="absolute cursor-pointer right-0 z-10 bg-green-500 hover:bg-green-600 text-white rounded-full p-2 shadow transition-colors"
            aria-label="Next"
          >
            <ArrowRight />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              className={`h-2 w-6 cursor-pointer rounded-full transition-all ${
                idx === current ? "bg-green-500" : "bg-gray-300"
              }`}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="text-gray-600 dark:text-gray-400">
        <strong>Our Purpose:</strong> To empower our community with easy access
        to books and resources, while providing librarians with powerful tools
        to manage inventory and user activity. Librovia is built with a focus on
        usability, speed, and a delightful user experience.
      </div>
    </div>
  );
}
