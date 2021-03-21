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
                setTimeout(function() { window.location.href = '/api/login' }, 3000);




            },
            error: function(err) {
                $('.modal-body').html(''), $('.modal-body').html(err.responseText), $("#triger").click();


            }

        });
    })
});