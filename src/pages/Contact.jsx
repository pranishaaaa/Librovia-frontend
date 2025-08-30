export default function Contact() {
  return (
    <div className="max-w-xl mx-auto mt-8 bg-white dark:bg-black rounded-xl shadow-lg dark:shadow-white/20 p-8">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Contact Us</h1>
      <p className="mb-6 text-gray-700 dark:text-gray-300">
        Have a question, issue, or feedback? Fill out the form below and we'll
        get back to you as soon as possible.
      </p>
      <form className="flex flex-col gap-4 dark:text-white">
        <input
          type="text"
          placeholder="Your Name"
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <textarea
          placeholder="Your Message"
          rows={5}
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
          required
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 cursor-pointer dark:text-white font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
