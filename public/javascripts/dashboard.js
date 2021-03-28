$(function() {
    $(".edit").hide();
    $(".password").hide();
    $(".delete").hide();
    $(".my_profile").hide();
    $('body').on('click', '#my_profile', function() {
        $(".password").slideUp(1200);
        $(".delete").slideUp(1200);
        $(".edit").slideUp(1200);
        $(".container").slideUp(1200);
        $(".my_profile").slideDown(1200);
    })
    $('body').on('click', '#closeAbout', function() {
        $(".my_profile").slideUp(1200);
        $(".container").slideDown(1200);
    })

    $('body').on('click', '#edit', function() {
        $(".container").slideUp(1200);
        $(".password").slideUp(1200);
        $(".delete").slideUp(1200);
        $(".my_profile").slideUp(1200);
        $(".edit").slideDown(1200);

    });
    $('body').on('click', '#close', function() {
        $('.edit').slideToggle(1200);
        $(".container").slideToggle(1200);
    });
    $('body').on('click', '#save', function() {
        const username = $('#username').val();
        const password = $('#password').val();
        const firstName = $('#firstName').val();
        const lastName = $('#lastName').val();
        const gender = $('input[name="gender"]:checked').val();
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
        $(".container").slideUp(1200);
        $(".edit").slideUp(1200);
        $(".delete").slideUp(1200);
        $(".my_profile").slideUp(1200);
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
        $(".container").slideToggle(1200);
    });
    $('body').on('click', '#delete_account_close', function() {
        $('.delete').slideToggle(1200);
        $(".container").slideToggle(1200);
    });
    $('body').on('click', '#delete', function() {
        $(".container").slideUp(1200);
        $(".password").slideUp(1200);
        $(".edit").slideUp(1200);
        $(".my_profile").slideUp(1200);
        $('.delete').slideDown(1200);
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
    $('body').on('click', '#deleteImage', function() {
        $.ajax({
            url: '/api/dashboard/deleteAvatar',
            type: 'DELETE',
            success: function(data) {

                $('.modal-body').html(''), $('.modal-body').html(data)

                setTimeout(function() {
                    window.location.href = '/api/register'

                }, 2000);
            },
            error: function(err) {
                $('.modal-body').html(''), $('.modal-body').html(err.responseText)
                setTimeout(function() {
                    $("#triger").click();
                }, 2000);
            }
        });
    });
    $('body').on('click', '#userAvatar', function() {
        $('.modal-body').html(''), $('.modal-body').html(` 
        <form id='avatarForm' action="/api/dashboard/avatar" method="post" enctype="multipart/form-data">
        <input type="file" class='form-control form-control-sm' name="avatar" id='avatarInput'>
        <button type="submit" value="submit">Submit</button>
        </form>
        <button id="deleteImage">Delete Avatar</button>`), $("#triger").click();
    })


});
/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "200px";
    document.body.style.backgroundColor = "rgba(216, 213, 213,0.4)";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.body.style.backgroundColor = "#d8d5d5";
}