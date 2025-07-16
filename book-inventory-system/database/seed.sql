-- Seed books
INSERT INTO books (title, author, barcode, qrcode, status) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', '1234567890', 'QRGATSBY1', 'available'),
('1984', 'George Orwell', '2345678901', 'QR1984', 'available'),
('To Kill a Mockingbird', 'Harper Lee', '3456789012', 'QRMOCKINGBIRD', 'available'),
('Pride and Prejudice', 'Jane Austen', '4567890123', 'QRPRIDE', 'available'),
('The Catcher in the Rye', 'J.D. Salinger', '5678901234', 'QRCATCHER', 'available');

-- Seed students
INSERT INTO students (name, email) VALUES
('Alice Smith', 'alice@example.com'),
('Bob Johnson', 'bob@example.com'),
('Carol Davis', 'carol@example.com'),
('David Wilson', 'david@example.com'),
('Emma Brown', 'emma@example.com');

-- Seed staff (email: librarian@gmail.com, password: libpassword)
INSERT INTO staff (name, email, password_hash) VALUES
('Librarian', 'librarian@gmail.com', '$2a$10$k6CnwQdL1m6XTkSBtHzu0.Pf8FvsyDeTp9iDy11do/61.dcKQPHta');