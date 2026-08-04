const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Serve frontend files
app.use(express.static("public"));


// Home page
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});


// Store blogs temporarily
let blogs = [];


// Get all blogs
app.get("/api/blogs", (req, res) => {
    res.json(blogs);
});


// Add new blog
app.post("/api/blogs", (req, res) => {

    const { title, author, content } = req.body;

    if (!title || !author || !content) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const newBlog = {
        id: Date.now(),
        title,
        author,
        content
    };

    blogs.push(newBlog);

    res.status(201).json({
        message: "Blog submitted successfully",
        blog: newBlog
    });
});


// Edit blog
app.put("/api/blogs/:id", (req, res) => {

    const id = Number(req.params.id);

    const blog = blogs.find(blog => blog.id === id);

    if (!blog) {
        return res.status(404).json({
            message: "Blog not found"
        });
    }

    blog.title = req.body.title || blog.title;
    blog.author = req.body.author || blog.author;
    blog.content = req.body.content || blog.content;

    res.json({
        message: "Blog updated successfully",
        blog
    });
});


// Delete blog
app.delete("/api/blogs/:id", (req, res) => {

    const id = Number(req.params.id);

    blogs = blogs.filter(blog => blog.id !== id);

    res.json({
        message: "Blog deleted successfully"
    });
});


// Start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});