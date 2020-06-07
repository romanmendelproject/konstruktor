$(document).ready(function(){
    $('input, select').styler();
    $(document).on("click", ".create_test", function (e) {
        e.preventDefault();
        var form=$("#T_form")
        var T_title = $('#name_test').val();
        var T_summa = $('#summa_ballov').val();
        var T_time = $('#time_of_test_test').val();
        var T_check = $('#T_checkbox').prop('checked');
        var data = {};
        data.T_title  = T_title;
        data.T_summa  = T_summa;
        data.T_time  = T_time;
        data.T_check  = T_check;
        var csrf_token = $('#T_form [name="csrfmiddlewaretoken"]').val();
        data["csrfmiddlewaretoken"] = csrf_token;
        var url = form.attr("action");
        console.log(data);
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            cache: true,
            success: function (data) {
                $('#test_id').text(data.test_id);;
            },
            error: function(){
                console.log("error")
            }
        });
    });

    $(document).on("click", ".add_question", function (e) {
        e.preventDefault();
        var questions_container = $(this).parents('.questions_container');
        questions_container.find(".add_question").addClass("hidden");
        questions_container.find(".answer_clone").removeClass("hidden");
        var Q_span = questions_container.find('.question_id_span');
        console.log(Q_span)
        var Q_title = questions_container.find('#question_title').val();
        var Q_number = questions_container.find('#question_number').val();
        var Q_check = questions_container.find('#question_check').prop('checked');
        var test_id = $("#test_id").text();
        var data = {};
        data.test_id = test_id;
        data.Q_title  = Q_title;
        data.Q_number  = Q_number;
        data.Q_check  = Q_check;
        var csrf_token = questions_container.find('.form_question [name="csrfmiddlewaretoken"]').val();
        $(this [name="csrfmiddlewaretoken"]).val();
        data["csrfmiddlewaretoken"] = csrf_token;
        var url = $(this).closest('.form_question').attr("action");
        console.log(data);
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            cache: true,
            success: function (data) {
                $(Q_span).text(data.question_id);
            },
            error: function(){
                console.log("error")
            }
        });
    });

    var question_template = $('#question-template').html();

    $(document).on("click", "#add_question_btn_main", function (e) {
        e.preventDefault();
        $(question_template).hide().appendTo('.question_append_main').slideDown(500);
        $('input, checkbox').styler();
    });
    
    $(document).on("click", "button.add_question_btn", cloneQuestion);

    function cloneQuestion(e){
        e.preventDefault();
        var  question_append = $(this).parents('.questions_container').next();
        $(question_template).hide().insertAfter(question_append).slideDown(500);
        $('input, checkbox').styler();
    }

    var answer_template = $('#answer-template').html();

    function cloneAnswer(e){
        e.preventDefault();
        var  answer_append = $(this).parents('.questions_container').find('.answer_appendform');
        $(answer_template).hide().appendTo(answer_append).slideDown(500);
        $('input, checkbox').styler();
    }

    function answer_remove(e){
        e.preventDefault();
        var A_span_remove = $(this).parents('.answer_template').find('.answer_id_span').text();
        if (A_span_remove){
            var csrf_token = $(this).parents('.answer_template').find('.form_answer [name="csrfmiddlewaretoken"]').val();
            var data = {};
            data["csrfmiddlewaretoken"] = csrf_token;
            data.A_span_remove = A_span_remove;
            var url = $(this).closest('.form_answer').attr("action");
            console.log(data);
            $.ajax({
                url: url,
                type: 'POST',
                data: data,
                cache: true,
                success: function (data) {
                    console.log("OK");
                },
                error: function(){
                    console.log("error")
                }
            });
        }
        $(this).parents(".answer_template").hide(500, function(){
            $(this).parents(".answer_template").remove();
        });
    }
    $(document).on("click", ".answer_remove", answer_remove);

    function question_remove(e){
        e.preventDefault();
        var Q_span_remove = $(this).parents('.questions_container').find('.question_id_span').text();
        if (Q_span_remove){
            var csrf_token = $(this).parents('.questions_container').find('.form_question [name="csrfmiddlewaretoken"]').val();
            var data = {};
            data["csrfmiddlewaretoken"] = csrf_token;
            data.Q_span_remove = Q_span_remove;
            var url = $(this).closest('.form_question').attr("action");
            console.log(data);
            $.ajax({
                url: url,
                type: 'POST',
                data: data,
                cache: true,
                success: function (data) {
                    console.log("OK");
                },
                error: function(){
                    console.log("error")
                }
            });
        }
        $(this).parents(".questions_container").hide(500, function(){
            $(this).parents(".questions_container").remove();
        });
    }
    $(document).on("click", ".question_remove", question_remove);


    $(document).on("change", ".question_check, .question_number", function (e) {
        $(this).parents('.questions_container').find(".add_question").removeClass("hidden");
    });
    $(document).on("keyup", ".question_input, .question_number", function (e) {
        $(this).parents('.questions_container').find(".add_question").removeClass("hidden");
    });

    $(document).on("change", ".answer_check", function (e) {
        $(this).parents('.answer_template').find(".answer_btn").removeClass("hidden");
    });
    $(document).on("keyup", ".answer_title", function (e) {
        $(this).parents('.answer_template').find(".answer_btn").removeClass("hidden");
    });
    $(document).on("click", "button.answer_clone", cloneAnswer);


    $(document).on("click", ".answer_btn", function (e) {
        e.preventDefault();
        var answer_container = $(this).parents('.answer_template');
        answer_container.find(".answer_btn").addClass("hidden");
        var A_span = $(this).prev();
        var A_value = $(A_span).text();
        console.log('123');
        var data = {};
        var answer_title = answer_container.find('.answer_title').val();
        var question_id = $(this).parents('.questions_container').find('.question_id_span').text();
        var A_check = answer_container.find(".answer_check").prop('checked');
        var csrf_token = answer_container.find('.form_answer [name="csrfmiddlewaretoken"]').val();
        data["csrfmiddlewaretoken"] = csrf_token;
        data.question_id = question_id;
        data.answer_title = answer_title;
        data.A_check = A_check;
        data.A_span = A_value;
        console.log(A_span)
        var url = $(this).closest('.form_answer').attr("action");
        console.log(data);
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            cache: true,
            success: function (data) {
                console.log("OK");
                $(A_span).text(data.answer_id);
                console.log(data.answer_id);
            },
            error: function(){
                console.log("error")
            }
        });

    });

    $(document).on("click", ".answer_all", function (e) {
        e.preventDefault();
        var question_container = $(this).parents('.questions_container');
        var answer_toggle = question_container.find('.answer_toggle');
        if (answer_toggle.text() == 1){
            $(this).find(".fa").removeClass('fa-angle-up').addClass('fa-angle-down');
            $(this).addClass('action-button_active');
            answer_toggle.text('0');
            var Q_id = question_container.find('.question_id_span').text();
            console.log(Q_id)
            var data = {};
            data.Q_id = Q_id;
            var csrf_token = question_container.find('.form_question [name="csrfmiddlewaretoken"]').val();
            $(this [name="csrfmiddlewaretoken"]).val();
            data["csrfmiddlewaretoken"] = csrf_token;
            var url = '/answer_all/';
            console.log(url)
            console.log(data);
            var index = 0;
            $.ajax({
                url: url,
                type: 'POST',
                data: data,
                cache: true,
                success: function (data) {
                    console.log("OKey");
                    $.each(data.answers, function(k, v){
                        question_container.find(".answer_appendform").hide().append(answer_template).slideDown(200);
                        question_container.find(".answer_btn").addClass("hidden");
                        question_container.find(".answer_id_span").eq(index).text(v.id);
                        question_container.find(".answer_title").eq(index).val(v.answer);
                        question_container.find(".answer_check").eq(index).prop('checked', v.is_True);

                        index++;
                    $('input, checkbox').styler();
                    });
                },
                error: function(){
                    console.log("error")
                }
            });

        }
        else{
            $(this).find('.fa').removeClass('fa-angle-down').addClass('fa-angle-up');
            $(this).removeClass('action-button_active');

            answer_toggle.text('1');
            console.log("OK0");
            question_container.find(".answer_template").slideUp(500, function(){
                question_container.find(".answer_template").remove(".answer_template");
            });

        }

    });
});

