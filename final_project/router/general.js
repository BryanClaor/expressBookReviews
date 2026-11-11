const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Register a new user
public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required"
    });
  }

  if (isValid(username)) {
    return res.status(409).json({
      message: "Username already exists"
    });
  }

  users.push({username, password});

  return res.status(201).json({
    message: "User successfully registered"
  });
});

// Task 1 - Get all books
public_users.get('/', function (req, res) {
  return res.status(200).json(books);
});

// Task 2 - Get book by ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;

  if (books[isbn]) {
    return res.status(200).json(books[isbn]);
  }

  return res.status(404).json({message: "Book not found"});
});

// Task 3 - Get books by author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  const result = {};

  Object.keys(books).forEach(isbn => {
    if (books[isbn].author === author) {
      result[isbn] = books[isbn];
    }
  });

  return res.status(200).json(result);
});

// Task 4 - Get books by title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  const result = {};

  Object.keys(books).forEach(isbn => {
    if (books[isbn].title === title) {
      result[isbn] = books[isbn];
    }
  });

  return res.status(200).json(result);
});

// Task 5 - Get book reviews
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;

  if (!books[isbn]) {
    return res.status(404).json({message: "Book not found"});
  }

  return res.status(200).json(books[isbn].reviews);
});

module.exports.general = public_users;
// Task 10 - Get all books using async/await and Axios
const axios = require('axios');

const getAllBooksAsync = async () => {
  try {
    const response = await axios.get('http://localhost:5000/');
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error.message);
    throw error;
  }
};

module.exports.getAllBooksAsync = getAllBooksAsync;

// Task 11 - Get book by ISBN using async/await
const getBookByISBNAsync = async (isbn) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/isbn/${encodeURIComponent(isbn)}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching book:', error.message);
    throw error;
  }
};

module.exports.getBookByISBNAsync = getBookByISBNAsync;

// Task 12 - Get books by author using async/await
const getBooksByAuthorAsync = async (author) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/author/${encodeURIComponent(author)}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching books by author:', error.message);
    throw error;
  }
};

module.exports.getBooksByAuthorAsync = getBooksByAuthorAsync;

// Task 13 - Get books by title using async/await
const getBooksByTitleAsync = async (title) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/title/${encodeURIComponent(title)}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching books by title:', error.message);
    throw error;
  }
};

module.exports.getBooksByTitleAsync = getBooksByTitleAsync;
