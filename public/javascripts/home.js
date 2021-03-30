$(function() {
    $.get('/api/articles/getAll', (data, err) => {

        if (data) {
            for (let i = 0; i < data.length; i++) {
                let date = data[i].createdAt
                date = date.substring(0, date.length - 14);
                $('.articles').append(`
                <div class="pages mt-3 col-12 col-md-6 col-lg-4" style="width:100%;">
                <div class="card">
                    <div class="card-body" style="border-radius: 10px;">
                    <h5 class="card-title">TITLE:${data[i].title} </h5>
                    <div><p id="more" class="card-text">TEXT:${data[i].text}</p><a href="/api/articles/${data[i]._id}">more</a></div>
                    <p>CREATED BY:${data[i].owner.username}</p
                    <p>CREATED AT:${date}</p>
                    <img src="/images/avatars/${data[i].avatar}" alt="avatar" class="photo">
                    </div>
                </div>
    
            </div>`)

            }
        }
    })
})