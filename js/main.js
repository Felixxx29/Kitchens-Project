$(document).ready(() => {
    new WOW().init({
        animateClass: 'animate__animated',
    });

    $('.slick-prev').addClass('wow bounceIn');

    $('#kitchens').slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear'
    });


    $(document).on('submit', '.form-order', function (e) {
        e.preventDefault();
    });

    $(document).on('submit', '.order-call', function (e) {
        e.preventDefault();
    });


    $('.open-modal').click(() => {
        $('#order-container').css('display', 'flex');
    });

    $('#order-container').click((e) => {
        if (e.target.id === 'order-container') {
            $('#order-container').hide();
        }
    });

    $('.order-call').click(function (event) {
        let name = $('#name');
        let phone = $('#phone');
        if (!name.val()) {
            $('#name-error').show();
            event.preventDefault();
        } else {
            $('#name-error').hide();
        }
        if (!phone.val()) {
            $('#phone-error').show();
            event.preventDefault();
        } else  {
            $('#phone-error').hide();
        }
        if (name.val() && phone.val()){
            $('#name-error').hide();
            $('#phone-error').hide();
            event.preventDefault();
            $.ajax({
                type: 'post',
                url: 'mail.php',
                data: 'name=' + name.val() + '&phone=' + phone.val(),
                success: () => {
                    $('#order-success').show();
                    $('#order').hide();
                },
                error: () => {
                    $('#order-container').hide();
                    alert('Ошибка бронирования. Свяжитесь, пожалуйста, по номеру телефона.');
                }
            });
        }
        name.val('');
        phone.val('');
    });

    $('.form-order').click(function (event) {
        let name = $('#form-name');
        let phone = $('#form-phone');
        let data = $('#form-data');
        let hasError = false;
        if (!name.val()) {
            $('#form-name-error').show();
            name.addClass('border-red');
            hasError = true;
            event.preventDefault();
        } else {
            name.removeClass('border-red');
            $('#form-name-error').hide();
            event.preventDefault();
        }
        if (!phone.val()) {
            $('#form-phone-error').show();
            phone.addClass('border-red');
            hasError = true;
            event.preventDefault();
        } else {
            phone.removeClass('border-red');
            $('#form-phone-error').hide();
            event.preventDefault();
        }
        if (!data.val()) {
            $('#form-data-error').show();
            data.addClass('border-red');
            hasError = true;
            event.preventDefault();
        } else {
            data.removeClass('border-red');
            $('#form-data-error').hide();
            event.preventDefault();
        }

        if (name.val() && phone.val() && data.val()) {
            $.ajax({
                type: 'post',
                url: 'mail.php',
                data: 'name=' + name.val() + '&phone=' + phone.val() + '&data=' + data.val(),
                success: () => {
                    $('#order-container').show();
                    $('#order-success').show();
                    $('#order').hide();
                },
                error: () => {
                    $('#order-container').hide();
                    alert('Ошибка бронирования. Свяжитесь, пожалуйста, по номеру телефона.');
                }
            });
        };
    });
});
