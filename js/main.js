$(document).ready(() => {
    new WOW().init({
        animateClass: 'animate__animated',
    });

    let loader = $('#loader');

    $('#kitchens').slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear'
    });

    $('#burger').click(() => {
        $('#menu').toggleClass('menu-open');
    });

    $('#close').click(() => {
        $('#menu').removeClass('menu-open');
    });

    $('#menu > a').click(() => {
        $('#menu').removeClass('menu-open');
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
        let hasError = false;
        if (!name.val()) {
            $('#name-error').show();
            event.preventDefault();
            hasError = true;
        } else {
            $('#name-error').hide();
        }
        if (!phone.val()) {
            hasError = true;
            $('#phone-error').show();
            event.preventDefault();
        } else {
            $('#phone-error').hide();
        }
        if (hasError === false) {
            $('#name-error').hide();
            $('#phone-error').hide();
            event.preventDefault();
            loader.css('display', 'flex')
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
                    alert('Ошибка заказа. Свяжитесь, пожалуйста, по номеру телефона.');
                }
            });
            loader.hide();

        }
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

        if (hasError === false) {
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
                    alert('Ошибка заказа. Свяжитесь, пожалуйста, по номеру телефона.');
                }
            });
        }
    });

});
