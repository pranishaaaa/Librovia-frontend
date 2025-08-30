export default function Footer() {
  return (
    <footer className="h-12 bg-green-500 dark:text-white text-center p-4">
      <small>
        &copy; {new Date().getFullYear()} Librovia. Pranisha Karki. All rights
        reserved.
      </small>
    </footer>
  );
}
