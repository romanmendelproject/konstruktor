$(document).ready(function(){
    var form = $('.form_questions');
    console.log(form);



    form.on('submit', function(e){
        e.preventDefault();
        console.log('123');
        var nmb = $('#question_number').val();
        console.log(nmb);
        var submit_question_btn = $('#submit_question_btn')
        var test_id = submit_question_btn.data("test_id");
        console.log(test_id);
        // $('.question_item ul').append('<li>hjjhkjhkkhkhjk</li>');



    });



    var regex = /^(.+?)(\d+)$/i;
    var cloneIndex = $(".form_questions1").length;


    function clone(e){
        e.preventDefault();
        $(this).parents(".form_questions1").clone()
            .appendTo(".appendform")
            .attr("id", "form_questions1" +  cloneIndex)
            .find("*")
            .each(function() {
                var id = this.id || "";
                var match = id.match(regex) || [];
                if (match.length == 3) {
                    this.id = match[1] + (cloneIndex);
                }
            })
            .on('click', 'button.clone', clone)
            .on('click', 'button.remove', remove);
        cloneIndex++;
    }
    function remove(e){
        e.preventDefault();
        $(this).parents(".form_questions1").remove();
    }
    $("button.clone").on("click", clone);

    $("button.remove").on("click", remove);



});