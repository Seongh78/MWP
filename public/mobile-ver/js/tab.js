// ;
window.onload = function(){


(function($) {
    $.fn.tab = function(options) {

        var opts = $.extend({}, $.fn.tab.defaults, options);
        return this.each(function() {
            var obj = $(this);

            var title = $("#titleContainer").text();
            if(title == ""){
                var ta = $("li.bottomBar-list-active > p").text();
                $("#titleContainer").text(ta);
            }


            $(obj).find('.bottomBar-ul li').on(opts.trigger_event_type, function() {
                $(obj).find('.bottomBar-ul li').removeClass('activeTab');
                $(this).addClass('activeTab');

                $(obj).find('.bottomBar-ul li').removeClass('bottomBar-list-active');
                $(this).addClass('bottomBar-list-active');

                var ta = $("li.bottomBar-list-active > p").text();
                $("#titleContainer").text(ta);


                $(obj).find('.tabContent div').hide();
                $(obj).find('.tabContent div').eq($(this).index()).show();
            })
        });
    }
    $.fn.tab.defaults = {
        trigger_event_type: 'click' //mouseover | click 默认是click
    };

})(jQuery);/**
 * Created by KIM-ATIV on 2016-12-13.
 */


}