import React, { useEffect, useState } from 'react';
import { apiFetch } from '../../utils/api';

const BookManagement = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const data = await apiFetch('/books');
      setBooks(data);
    } catch (err) {
      setError('Failed to load books');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      await apiFetch('/books', {
        method: 'POST',
        body: JSON.stringify({ title, author }),
      });
      setTitle('');
      setAuthor('');
      fetchBooks();
    } catch (err) {
      setError('Failed to add book');
    }
  };

  if (loading) return <div>Loading books...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Book Management</h1>
      <form onSubmit={handleAddBook} className="mb-4 flex gap-2">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="border p-2 rounded" required />
        <input value={author} onChange={e => setAuthor(e.target.value)} placeholder="Author" className="border p-2 rounded" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Book</button>
      </form>
      <ul className="bg-white rounded shadow p-2">
        {books.length === 0 ? (
          <li className="text-gray-500">No books found.</li>
        ) : (
          books.map(book => (
            <li key={book.id} className="flex justify-between items-center border-b py-2">
              <span>{book.title} by {book.author}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default BookManagement;