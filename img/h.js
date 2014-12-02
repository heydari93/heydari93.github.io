jQuery(document).ready(function ($) {

    $(window).stellar();

    $("#slide1, #slide3").each(function () {
        var slide_h = $(this).height();
        $(this).css('background-size', '100% '+slide_h+'px');
    });
    
    $(".account").click(function()
    {
        var X = $(this).attr('id');

        if(X==1)
        {
            $(".submenu").fadeOut('fast');
            $(this).attr('id', '0');	
        }
        else
        {

            $(".submenu").fadeIn('fast');
            $(this).attr('id', '1');
        }

    });

    //Mouseup textarea false
    $(".submenu").mouseup(function()
    {
        return false
    });
    $(".account").mouseup(function()
    {
        return false
    });


    //Textarea without editing.
    $(document).mouseup(function()
    {
        $(".submenu").fadeOut('fast');
        $(".account").attr('id', '');
    });
    
    
    /*
    var auto_refresh = setInterval(function(){
        $.ajax({
           url: "paper/get_new/"+$('div#latests .record:first-child').data('time'),
           cache: false,
           dataType: "json",
           success: function(returnString)
           {
                if(returnString.success === 'ok')
                {
                   $("div#latests .record:last-child").fadeOut('slow',function(){
                       $(this).remove();
                       $("div#latests").prepend(returnString.response);
                       $("div#latests .record:first-child").fadeIn().animate({'margin-top':'0px'},1000);
                       
                   });
               }
                //console.log(returnString.success);
           }
       });
   }, 5000);
   */
   
   $('#pyromonial_form').on('submit', function(e) {
       e.preventDefault();
       var post_url = $(this).attr('action');
       var form_data = $(this).serialize();
       var form_id = $(this).attr('id');
       do_submit(post_url, form_data, form_id);
    });
    function do_submit(post_url, form_data, form_id)
    {
        
        $.post(post_url, form_data, function(data, response, xhr) {
            var obj = $.parseJSON(data);
            var notice = '<div class="alert alert-'+ obj.status +'">'+obj.message+'</div>';
            $('#pyromonial_result').html('');
            $('#pyromonial_result').prepend(notice);
            $('#pyromonial_form').fadeOut();
            $('.message').fadeIn('normal');
            
            setTimeout(function(){
                $('div.alert').fadeOut('normal');
                $('#pmcont').val('');
                $('div#pyromonial_form').fadeIn();
            },5000);
        });
    }
    
    $("#pyromonial").carouFredSel({
        auto : {
            play: true,
            timeoutDuration : 6000,
            duration : 1000,
            pauseOnHover: 'immediate-resume'
        },
        circular    : true,
        infinite    : false,
        direction: 'down',
        scroll: {
                items: 1,
                duration: 1000,
                pauseOnHover: 'immediate-resume'
        },
        pagination : "#pyromonial_pager"
    });

});
