$(function() {
    //*****HIDE ALL TABS ON PAGE RENDERING */
    $(".edit").hide();
    $(".newArticle").hide();
    $(".password").hide();
    $(".delete").hide();
    $(".my_profile").hide();
    //*****BUTTONS*****

    //CLOSE BUTTON
    $('body').on('click', '#closeBtn', function() {
            $(".password").slideUp(1200);
            $(".delete").slideUp(1200);
            $(".edit").slideUp(1200);
            $(".my_profile").slideUp(1200);
            $(".newArticle").slideUp(1200);
            $(".container").slideDown(1200);
            $(".container").css({ "overflow-y": 'scroll' });
        })
        // OPEN MY PROFILE PANEL
    $('body').on('click', '#my_profile', function() {
            $(".password").slideUp(1200);
            $(".delete").slideUp(1200);
            $(".edit").slideUp(1200);
            $(".container").slideUp(1200);
            $(".newArticle").slideUp(1200);
            $(".my_profile").slideDown(1200);
        })
        //OPEN EDIT PANEL
    $('body').on('click', '#edit', function() {
        $(".container").slideUp(1200);
        $(".password").slideUp(1200);
        $(".delete").slideUp(1200);
        $(".my_profile").slideUp(1200);
        $(".newArticle").slideUp(1200);
        $(".edit").slideDown(1200);

    });
    //OPEN CHANGE PASSWORD PANEL
    $('body').on('click', '#change', function() {
        $(".container").slideUp(1200);
        $(".edit").slideUp(1200);
        $(".delete").slideUp(1200);
        $(".my_profile").slideUp(1200);
        $(".newArticle").slideUp(1200);
        $('.password').slideToggle(1200);
    });
    //OPNE DELETE ACCOUNT PANEL

    $('body').on('click', '#delete', function() {
        $(".container").slideUp(1200);
        $(".password").slideUp(1200);
        $(".edit").slideUp(1200);
        $(".my_profile").slideUp(1200);
        $(".newArticle").slideUp(1200);
        $('.delete').slideDown(1200);
    });
    //OPEN ADD NEW ARTICLE PANEL
    $('body').on('click', '#addArticle', function() {
        $(".container").slideUp(1200);
        $(".password").slideUp(1200);
        $(".edit").slideUp(1200);
        $(".my_profile").slideUp(1200);
        $('.delete').slideUp(1200);
        $('.newArticle').slideDown(1200);

    });

    //*****FUNCTIONS*****
    //SEND EDIT PANEL DATA TO SERVER
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
    // SEND CHANGE PASSWORD DATA TO SERVER
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
    // SEND DELETE ACCOUNT DATA TO SERVER

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
    // SEND DELETE AVATAR IMAGE DATA TO SERVER

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
    // SEND ADD NEW AVATAR DATA TO SERVER

    $('body').on('click', '#userAvatar', function() {
        $('.modal-body').html(''), $('.modal-body').html(` 
        <form id='avatarForm' action="/api/dashboard/avatar" method="post" enctype="multipart/form-data">
        <input type="file" class='form-control form-control-sm' name="avatar" id='avatarInput'>
        <button type="submit" value="submit">Submit</button>
        </form>
        <button id="deleteImage">Delete Avatar</button>`), $("#triger").click();
    })

    //GET USER ARTICLES FROM SERVER AND RENDER THEM
    $.ajax({
        url: `/api/articles/myArticles/${$('#id').val()}`,
        type: 'get',
        success: function(data) {

            for (let i = 0; i < data.article.length; i++) {
                let date = data.article[i].createdAt
                date = date.substring(0, date.length - 14);
                $('.container').append(`
                
                <div class="pages mt-3 col-12 col-md-6 col-lg-4" style="width:100%;">
                <div class="card">
                    <div class="card-body" style="border-radius: 10px;">
                        <h5 class="card-title">TITLE:${data.article[i].title} </h5>
                        <div> <p class="card-text">TEXT:${data.article[i].text}</p> <a href="/api/articles/${data.article[i]._id}">more...</a></div> 
                        <p>CREATED AT:${date}</p>
                        <img src="/images/avatars/${data.article[i].avatar}" alt="avatar" class="photo">
                    </div>
                </div>
    
            </div>`)

            }



        },
        error: function(err) {
            console.log(err);
            $('.modal-body').html(''), $('.modal-body').html(err.responseText)
            setTimeout(function() {
                $("#triger").click();
            }, 2000);
        }
    });

    //SEND NEW ARTICLE DATA TO SERVER
    $("form[name='avatarForm']").on("submit", function(ev) {
        ev.preventDefault(); // Prevent browser default submit.

        var formData = new FormData(this);
        console.log(formData);


        $.ajax({
            url: "/api/articles/newArticle",
            type: "POST",
            data: formData,
            success: function(msg) {
                $('.modal-body').html(''), $('.modal-body').html(msg), $("#triger").click();
                setTimeout(function() {
                    window.location.href = '/api/dashboard'
                }, 2000);
            },
            error: function(err) {
                $('.modal-body').html(''), $('.modal-body').html(err.responseText), $("#triger").click();

            },
            cache: false,
            contentType: false,
            processData: false
        });

    });
});
//GET ALL ARTICLES FROM SERVER AND RENDER THEM








//*****SIDE NAV FUNCTIONS *****/
/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "200px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}
var getCookies = function() {
    var pairs = document.cookie.split(";");
    var cookies = {};
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split("=");
        cookies[(pair[0] + '').trim()] = unescape(pair.slice(1).join('='));
    }
    return cookies;
}
var myCookies = getCookies();
console.log(myCookies);