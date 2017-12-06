$(document).ready(function(){
    var form = $('.form_question');
    console.log(form);

    form.on('submit', function(e){
        e.preventDefault();
        console.log('123');
        var Q_title = $('#question_title').val();
        var Q_number = $('#question_number').val();
        var Q_check = document.getElementById("question_check").checked;
        var submit_question_btn = $('#submit_question_btn')
        var test_id = submit_question_btn.data("test_id");

        var data = {};
        data.test_id = test_id;
        data.Q_title  = Q_title;
        data.Q_number  = Q_number;
        data.Q_check  = Q_check;
        var csrf_token = $('#form_question1 [name="csrfmiddlewaretoken"]').val();
        data["csrfmiddlewaretoken"] = csrf_token;

        var url = form.attr("action");

        console.log(data)
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            cache: true,
            success: function (data) {
                console.log("OK");
                console.log(data.question_id);
            },
            error: function(){
                console.log("error")
            }
        })

    });




/*    var cloneIndex = $(".form_question").length;
    function clone(e){
        e.preventDefault();
        $(this).parents(".form_question").clone()
            .appendTo(".appendform")
            .attr("id", "form_question" +  cloneIndex)
            .on('click', 'button.clone', clone)
            .on('click', 'button.remove', remove);
        cloneIndex++;
    }
    function remove(e){
        e.preventDefault();
        $(this).parents(".form_question").remove();
    }
    $("button.clone").on("click", clone);
    $("button.remove").on("click", remove);*/
});