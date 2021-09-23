// Class definition

var KTRegister = function () {
    // Private functions


    var handleSignUpFormSubmit = function () {
        $('#kt_login_signup_submit').click(function (e) {
            e.preventDefault();

            var btn = $(this);
            var form = $(this).closest('form');

            form.validate({
                rules: {
                    first_name: {
                        required: true,
                        maxlength: 100
                    },
                    last_name: {
                        required: true,
                        maxlength: 100
                    },
                    phone_number: {
                        required: true,
                        minlength: 10,
                        maxlength: 10
                    },
                    id_card: {
                        required: true,
                        minlength: 13,
                        maxlength: 13
                    },
                    date_of_birth: {
                        required: true,
                    },
                    password: {
                        required: true,
                    },
                    cpassword: {
                        required: true,
                    },
                    gender: {
                        required: true,
                    },
                    caregiverType: {
                        required: true
                    },


                }
            });

            if (!form.valid()) {
                return;
            }

            form.ajaxSubmit({
                url: 'api/v1/customer/register',
                method: "POST",
                success: function (response, status, xhr, $form) {
                    btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
                    if (response.status == true) {
                        setTimeout(function () {
                            btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
                            form.clearForm();
                            form.validate().resetForm();

                            // display signup form
                            displaySignInForm();
                            var signInForm = login.find('.kt-login__signin form');
                            signInForm.clearForm();
                            signInForm.validate().resetForm();

                            Swal.fire({
                                type: 'success',
                                title: response.title,
                                text: response.text,
                            })
                        }, 2000);
                    }
                    if (response.status == false) {
                        btn.removeClass('kt-spinner kt-spinner--right kt-spinner--sm kt-spinner--light').attr('disabled', false);
                        Swal.fire({
                            type: 'warning',
                            title: response.title,
                            text: response.text,
                        })
                    }



                }
            });
        });
    }
    return {
        // public functions
        init: function () {

            handleSignUpFormSubmit();
        }
    };

    return {
        // public functions
        init: function () {
            caregiver();
        }
    };
}();

jQuery(document).ready(function () {
    KTRegister.init();
});