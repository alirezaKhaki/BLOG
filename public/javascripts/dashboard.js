$(function() {
    $(".edit").hide();
    $(".password").hide();
    $(".delete").hide();
    $('body').on('click', '#edit', function() {
        $(".edit").slideToggle(1200);

    });
    $('body').on('click', '#close', function() {
        $('.edit').slideToggle(1200);
    });
    $('body').on('click', '#save', function() {
        const username = $('#username').val();
        const password = $('#password').val();
        const firstName = $('#firstName').val();
        const lastName = $('#lastName').val();
        const gender = $('#gender').val();
        const number = $('#number').val();

        const user_edit = {
            username: username,
            password: password,
            firstName: firstName,
            mobile: number,
            lastName: lastName,
            sex: gender
        }
        console.log(user_edit);
        $.ajax({
            type: "POST",
            url: "/api/dashboard/edit",
            data: user_edit,
            success: function(data) {
                console.log(data);
                if (data.msg === "success") {

                    $('.modal-body').html(''), $('.modal-body').html('your information edited sucssesfully you need to login again'), $("#triger").click();

                    setTimeout(function() {
                        window.location.href = '/api/login'

                    }, 3000);

                }
            },
            error: function(err) {
                console.log(err);
                $('.modal-body').html(''), $('.modal-body').html(err.responseText), $("#triger").click();


            }
        })
    });
    $('body').on('click', '#change', function() {
        $('.password').slideToggle(1200);
    });
    $('body').on('click', '#pass_save', function() {
        const id = $('#id').val();
        const pass = $('#old_pass').val();
        const new_password = $('#new_pass').val();

        const new_pass = {
            _id: id,
            password: pass,
            new_password: new_password
        }
        $.ajax({
            type: "POST",
            url: "/api/dashboard/password",
            data: new_pass,
            success: function(data) {

                if (data.msg === 'sucsses') {

                    $('.modal-body').html(''), $('.modal-body').html('your password sucssesfully changed you need to login again'), $("#triger").click();

                    setTimeout(function() {
                        window.location.href = '/api/login'

                    }, 3000);

                }
            },
            error: function(err) {
                $('.modal-body').html(''), $('.modal-body').html(err.responseText), $("#triger").click();


            }
        })
    });
    $('body').on('click', '#pass_close', function() {
        $('.password').slideToggle(1200);
    });
    $('body').on('click', '#delete', function() {
        $('.delete').slideToggle(1200);
    });
    $('body').on('click', '#delete_account', function() {
        const pass = $('#delete_pass').val()

        const check_pass = {
            username: $('#username').val(),
            password: pass
        }
        console.log(check_pass);
        $.ajax({
            type: "POST",
            url: "/api/dashboard/delete",
            data: check_pass,
            success: function(data) {

                if (data === 'deleted') {

                    $('.modal-body').html(''), $('.modal-body').html('your account has been deleted!'), $("#triger").click();

                    setTimeout(function() {
                        window.location.href = '/api/register'

                    }, 3000);

                }
            },
            error: function(err) {
                $('.modal-body').html(''), $('.modal-body').html(err.responseText), $("#triger").click();

            }
        })
    });
    $('body').on('click', '#delete_account_close', function() {
        $('.delete').slideToggle(1200);
    });
});