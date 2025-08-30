import { useNavigate } from "react-router-dom";

export function BookCard({ isbn, title, coverImage, author, availableBooks }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/books/${isbn}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col h-96 w-60 cursor-pointer rounded-lg shadow-lg dark:shadow-white/20 dark:text-white overflow-hidden bg-white dark:bg-black border border-black/50 dark:border-white/50 group"
    >
      <div className="h-2/3 w-full py-2">
        <img
          src={coverImage}
          alt="Book cover"
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="h-1/3 flex flex-col justify-center gap-2 p-4 overflow-auto">
        <span
          className="font-semibold text-lg text-gray-800 dark:text-gray-200 truncate"
          title={title}
        >
          {title}
        </span>
        <span
          className="text-sm text-gray-600 dark:text-gray-400 truncate"
          title={author}
        >
          By <span className="font-medium">{author}</span>
        </span>
        <span className="text-sm text-green-500">
          {availableBooks} available
        </span>
      </div>
    </div>
  );
}
