const API = "http://localhost:3000/api/blogs";

/* ===========================
   LOAD BLOGS
=========================== */

async function loadBlogs() {

    const blogList = document.getElementById("blogList");

    if (!blogList) return;

    blogList.innerHTML = "<p>Loading stories...</p>";

    try {

        const response = await fetch(API);
        const blogs = await response.json();

        if (blogs.length === 0) {

            blogList.innerHTML = `
                <div class="empty-state">
                    <h2>No stories yet</h2>
                    <p>Be the first to publish a story.</p>
                </div>
            `;

            return;
        }

        blogList.innerHTML = "";

        blogs.forEach(blog => {

            blogList.innerHTML += `
            <div class="blog-card">

                <div class="blog-content">

                    <span class="category">
                        ${blog.category || "Technology"}
                    </span>

                    <h3>${blog.title}</h3>

                    <div class="blog-meta">
                        <span>👤 ${blog.author}</span>
                    </div>

                    <p>${blog.content}</p>

                    <div class="blog-actions">

                        <button class="edit-btn"
                            onclick="editBlog(${blog.id})">

                            ✏ Edit

                        </button>

                        <button class="delete-btn"
                            onclick="deleteBlog(${blog.id})">

                            🗑 Delete

                        </button>

                    </div>

                </div>

            </div>
            `;
        });

    } catch (error) {

        console.error(error);

        blogList.innerHTML = "<p>Unable to load blogs.</p>";

    }

}

/* ===========================
   ADD BLOG
=========================== */

const form = document.getElementById("blogForm");

if(form){

form.addEventListener("submit", async function(e){

    e.preventDefault();

   const blog = {
    title: document.getElementById("title").value.trim(),
    author: document.getElementById("author").value.trim(),
    category: document.getElementById("category").value,
    content: document.getElementById("content").value.trim()
};

    const response=await fetch(API,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(blog)

    });

    if(response.ok){

        alert("🎉 Story published successfully!");

        form.reset();

    }else{

        alert("Failed to publish story.");

    }

});

}

/* ===========================
   DELETE BLOG
=========================== */

async function deleteBlog(id){

    if(!confirm("Delete this story?")) return;

    await fetch(`${API}/${id}`,{

        method:"DELETE"

    });

    loadBlogs();

}

/* ===========================
   EDIT BLOG
=========================== */

function editBlog(id){

    alert("Edit feature will be connected next.");

}

/* ===========================
   START
=========================== */

loadBlogs();
// ===========================
// TOAST NOTIFICATION
// ===========================

function showToast(title, message) {

    const toast = document.getElementById("toast");

    if (!toast) return;

    document.getElementById("toastTitle").innerText = title;
    document.getElementById("toastMessage").innerText = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}