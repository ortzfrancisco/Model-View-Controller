document.addEventListener("DOMContentLoaded", (event) => {
    const blogPosts = document.querySelectorAll(".blog-post");

    blogPosts.forEach((post) => {
        post.addEventListener("click", function (event) {
            event.preventDefault();

            const postId = post.dataset.postId;
            console.log("card clicked", postId);

            const editForm = document.querySelector(
                `.edit-form[data-post-id="${postId}"]`
            );

            const header = document.querySelector(
                `.header[data-post-id="${postId}"]`
            );
            // Remove the 'hidden' class
            if (editForm) {
                editForm.classList.remove("hidden");
                header.classList.add("hidden");

                const deleteBtn = editForm.querySelector(".delete-btn");
                deleteBtn.addEventListener("click", function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    console.log("delete clicked", postId);

                    fetch("api/posts/", {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ id: postId }),
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            console.log(data);
                            location.reload();
                        })
                        .catch((error) => {
                            console.error("Error:", error);
                        });
                });

                const updateBtn = editForm.querySelector(".update-btn");
                updateBtn.addEventListener("click", function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    console.log("update clicked", postId);

                    const titleUpdate = document.querySelector(
                        `.edit-form[data-post-id="${postId}"] .title-update`
                    );
                    const contentUpdate = document.querySelector(
                        `.edit-form[data-post-id="${postId}"] .content-update`
                    );

                    const newTitle = titleUpdate.value;
                    const newContent = contentUpdate.value;

                    fetch('api/posts/', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id: postId,
                            user_id: localStorage.getItem("userId"),
                            title: newTitle,
                            description: newContent,
                        }),
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data)
                            location.reload()
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                });
            } else {
                console.error(`No edit form found for post ID ${postId}`);
            }
        });
    });

    document
        .getElementById("submit-btn")
        .addEventListener("click", async function (event) {
            event.preventDefault(); // Prevent the form from submitting normally

            const title = document.getElementById("title").value;
            const description = document.getElementById("content").value;
            const userId = localStorage.getItem("userId");

            const data = {
                title: title,
                description: description,
                user_id: userId,
            };

            try {
                const response = await fetch("/api/posts/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const postData = await response.json();
                console.log("Success:", postData);
                location.reload();
            } catch (error) {
                console.error("Error:", error);
            }
        });
});