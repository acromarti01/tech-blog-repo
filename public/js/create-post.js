const createPost_El = document.getElementById("create-btn");

const createPostHandler = async (event) => {
    event.preventDefault();

    const title = document.getElementById("title-textarea").value.trim();
    const content = document.getElementById("content-textarea").value.trim();

    if (title && content) {
        const response = await fetch('/dashboard', {
            method: "POST",
            body: JSON.stringify({ title, content }),
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) { document.location.replace("/dashboard"); }
        else { alert(response.statusText); }
    }
    else { alert("Title or Content is not filled in"); }
};

createPost_El.addEventListener("click", createPostHandler);
