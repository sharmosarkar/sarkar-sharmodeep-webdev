
$(function () {
    $(document).scroll(function () {
        var $nav = $(".navbar-fixed-top");


        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());

    });


});

// $(window).on('shown.bs.modal', function() {
//     $('#modalRegister').modal('show');
//     $('#ModalLogin').modal('show');
//     $('#signupbutton').modal('hide');
//     // alert('shown');
// });

