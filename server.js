const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let blogPosts = [];

/* ===========================
   GET ALL BLOGS
=========================== */

app.get("/api/blogs", (req, res) => {
    res.json(blogPosts);
});

/* ===========================
   ADD BLOG
=========================== */

app.post("/api/blogs", (req, res) => {

    const { title, author, category, content } = req.body;

    if (!title || !author || !content) {
        return res.status(400).json({
            message: "Please fill all required fields."
        });
    }

    const newBlog = {
    id: Date.now(),
    title,
    author,
    category: category || "Technology",
    content
};

    blogPosts.push(newBlog);

    res.status(201).json(newBlog);

});

/* ===========================
   EDIT BLOG
=========================== */

app.put("/api/blogs/:id", (req, res) => {

    const id = Number(req.params.id);

    const blog = blogPosts.find(b => b.id === id);

    if (!blog) {
        return res.status(404).json({
            message: "Blog not found"
        });
    }

    blog.title = req.body.title;
    blog.author = req.body.author;
    blog.category = req.body.category;
    blog.content = req.body.content;

    res.json(blog);

});

/* ===========================
   DELETE BLOG
=========================== */

app.delete("/api/blogs/:id", (req, res) => {

    const id = Number(req.params.id);

    blogPosts = blogPosts.filter(blog => blog.id !== id);

    res.json({
        message: "Blog deleted successfully"
    });

});

/* ===========================
   START SERVER
=========================== */

app.listen(PORT, () => {

    console.log(`🚀 Server running at http://localhost:${PORT}`);

});