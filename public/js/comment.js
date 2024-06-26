document.addEventListener("DOMContentLoaded", (event) => {    
    const submitBtn = document.querySelector('#submitComment');
    submitBtn.addEventListener("click", function(event){
        event.preventDefault();

        const div = document.querySelector('div[data-postId]');
        const postId = div.getAttribute('data-postId');

        const comment = document.querySelector('#commentInput').value.trim();
        const userId = localStorage.getItem('userId')

        if (comment && userId) {
            console.log(comment, userId, postId)
            fetch('/api/comments/', {
                method: 'POST',
                body: JSON.stringify({ 
                    "content": comment, 
                    "user_id": userId, 
                    "post_id": postId,
                }),
                headers: { 'Content-Type': 'application/json' },
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to post comment');
                }
            })
            .then(data => {
                console.log(data);
                document.location.reload();
            })
            .catch(error => {
                alert(error);
            });
        }
    })
});
  