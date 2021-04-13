$(function() {
    const url = $(location).attr('href'),
        parts = url.split("/"),
        id = parts[parts.length - 1]; // article id
    // $.get('https://api.ipify.org', (data) => {
    //         $.ajax({
    //             url: `/api/articles/getIp`,
    //             type: 'POST',
    //             data: { _id: id, ip: data },
    //             success: function(data) {

    //                 console.log(data);
    //             },
    //             error: function(err) {
    //                 $('.modal-body').html(''), $('.modal-body').html(err.responseText)
    //                 setTimeout(function() {
    //                     $("#triger").click();
    //                 }, 2000);
    //             }
    //         });
    //     })
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
                            location.reload()
                        }, 3000);
                    }
                },
                error: function(err) {
                    console.log(err);
                    $('.modal-body').html(''), $('.modal-body').html(err.responseText), $("#triger").click();
                }
            })
        })
        //DELETE ARTICLE FUNCTION
    $('body').on('click', '.deleteArticle', function() {
            $('.modal-body').html(''), $('.modal-body').html(`
        <h3> ARE YOU SURE YOU WANT TO DELETE THIS ARTICLE?</h3>
        <button id="no">NO</button>
        <button id="deleteThis">YES</button>
        `), $("#triger").click();
            const article_id = ($(this).parent().attr('class').trim());
            $('body').on('click', '#no', function() {
                $('.modal-body').html(''), $("#triger").click();
            })
            $('body').on('click', '#deleteThis', function() {
                $.ajax({
                    url: `/api/articles/delete/${article_id}`,
                    type: 'GET',
                    success: function(data) {

                        $('.modal-body').html(''), $('.modal-body').html(data)

                        setTimeout(function() {
                            window.location.href = '/'

                        }, 2000);
                    },
                    error: function(err) {
                        $('.modal-body').html(''), $('.modal-body').html(err.responseText)
                        setTimeout(function() {
                            $("#triger").click();
                        }, 2000);
                    }
                });
            })
        })
        //DELETE comment FUNCTION
    $('body').on('click', '.deleteComment', function() {
        $('.modal-body').html(''), $('.modal-body').html(`
        <h3> ARE YOU SURE YOU WANT TO DELETE THIS ARTICLE?</h3>
            <button id="no">NO</button>
            <button id="deleteThis">YES</button>
            `), $("#triger").click();
        const id = ($(this).parent().attr('class').trim());
        $('body').on('click', '#no', function() {
            $('.modal-body').html(''), $("#triger").click();
        })
        $('body').on('click', '#deleteThis', function() {
            $.ajax({
                url: `/api/comments/delete/${id}`,
                type: 'DELETE',
                success: function(data) {

                    $('.modal-body').html(''), $('.modal-body').html(data)

                    setTimeout(function() {
                        location.reload()
                    }, 2000);
                },
                error: function(err) {
                    $('.modal-body').html(''), $('.modal-body').html(err.responseText)
                    setTimeout(function() {
                        $("#triger").click();
                    }, 2000);
                }
            });
        })
    })

    $.ajax({
        url: `/api/articles/getIp/${id}`,
        type: 'GET',
        success: function(data) {
            $('#views').html(`VIEW COUNT:${data.length}`)
        },
        error: function(err) {
            console.log(err);
            $('.modal-body').html(''), $('.modal-body').html(err.responseText)
            setTimeout(function() {
                $("#triger").click();
            }, 2000);
        }
    });
})