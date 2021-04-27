$(function() {
    $('body').on('click', '#signup', function() {
        window.location.href = '/api/register'
    })
    $('body').on('click', '#register', function() {
        const username = $('#username').val()
        const password = $('#password').val()
        if (username.length === 0 || password.length === 0) {
            return $('.modal-body').html(''), $('.modal-body').html('please fill the inputs'), $("#triger").click();
        }

        const newUser = {
            username: username,
            password: password
        }


        $.ajax({
            type: "POST",
            url: "/api/login",
            data: newUser,
            success: function(data) {



                $('.modal-body').html(''), $('.modal-body').html(data), $("#triger").click();
                setTimeout(function() { window.location.href = '/api/login' }, 2000);




            },
            error: function(err) {
                $('.modal-body').html(''), $('.modal-body').html(err.responseText), $("#triger").click();
                setTimeout(function() { window.location.href = '/api/login' }, 2000);

            }

        });
    })



    /*
     ****************************************************
     *****************FORGOT PASSWORD********************
     ****************************************************
     */
    $('body').on('click', '#forgot', function() {
        $('.modal-body').html(''), $('.modal-body').html(`
                    <p>Enter your UserName</p>
                    <input class="userName form-control" type="text" placeholder="username">
                    <p>Enter Your Email Adress</p>
                    <input class=" email form-control" type="text" placeholder="Email">
                    <button id="send">Send Password Recovery Email</button>
                    <button id="cansel">Cansel</button>

                 `)
        $("#triger").click();
        $('body').on('click', '#send', function() {
            const email = $('.email').val()
            const userName = $('.userName').val()
            const data = {
                email: email,
                username: userName
            }
            $.ajax({
                type: "POST",
                url: "/api/login/forgot",
                data: data,
                success: function(data) {
                    $('.modal-body').html(''), $('.modal-body').html(data)
                    setTimeout(function() {
                        $("#triger").click();
                    }, 2000);
                },
                error: function(err) {
                    $('.modal-body').html(''), $('.modal-body').html(err.responseText)
                    setTimeout(function() {
                        $("#triger").click();
                    }, 2000);

                }

            })
        })
        $('body').on('click', '#cansel', function() {
            $("#triger").click();
        })
    })
});