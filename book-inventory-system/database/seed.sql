-- Seed books
INSERT INTO books (title, author, barcode, qrcode, status) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', '1234567890', 'QRGATSBY1', 'available'),
('1984', 'George Orwell', '2345678901', 'QR1984', 'available');

-- Seed students
INSERT INTO students (name, email) VALUES
('Alice Smith', 'alice@example.com'),
('Bob Johnson', 'bob@example.com');

-- Seed staff
INSERT INTO staff (name, email, password_hash) VALUES
('Librarian', 'librarian@example.com', '$2b$10$saltsaltsaltsaltsaltsaltsaltsaltsaltsalt1234567890'); -- bcrypt hash placeholder