
$(document).ready(function() {
    $('#login').on('click', function(event) {
        let user = {
            email: $('#nombre').val(),
            password: $('#pass').val(),
        };
        $.ajax({
            url: '/login',
            type: 'post',
            data: user,
            success: function(data) {
                localStorage.setItem('token', data);
                console.log('token: ', data);
                location.href ="http://localhost:3000/";
            },
            error: function(err) {
                console.log(err);
            }
        });
        event.preventDefault();
    });
});