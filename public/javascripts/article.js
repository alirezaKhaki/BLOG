$(function() {
    const url = $(location).attr('href'),
        parts = url.split("/"),
        id = parts[parts.length - 1]; // article id

    //get all coments of this article and render them
    $.get(`/api/comments/articleComment/${id}`, (data, err) => {

        if (data) {
            for (let i = 0; i < data.length; i++) {
                let date = data[i].createdAt
                date = date.substring(0, date.length - 14);
                $('.comments').append(`
                <div class="pages mt-3 col-12 col-md-6 col-lg-4" style="width:100%;">
                <div class="card">
                <div class="card-body" style="border-radius: 10px;">
                <img src="/images/avatars/${data[i].owner.avatar}" alt="avatar" style="width:50px;height:50px;border-radius:50px">
                <div class="article_text">USERNAME:${data[i].owner.username}</div>
                    <p class="card-title">COMMENT:${data[i].text} </p>
                    <p>CREATED AT:${date}</p>
                    </div>
                </div>
            </div>`)

            }
        }

    })

    // post new comment to server
    $('body').on('click', '#submit', () => {
        const comment = $('textarea#postComment').val();
        $.ajax({
            type: "POST",
            url: `/api/comments/newComment/${id}`,
            data: { text: comment },
            success: function(data) {
                if (data) {
                    $('.modal-body').html(''), $('.modal-body').html(data), $("#triger").click();
                    setTimeout(function() {
                        window.location.href = `/api/articles/${id}`
                    }, 3000);
                }
            },
            error: function(err) {
                console.log(err);
                $('.modal-body').html(''), $('.modal-body').html(err.responseText), $("#triger").click();
            }
        })
    })
})