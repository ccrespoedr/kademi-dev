(function ($) {
    $(function () {
        var components = $('[data-type="component-panelKpiTarget"]');
        
        if (components.length > 0) {
            components.each(function () {
                initKnob($(this));
            });
            
            $(document.body).on('pageDateChanged', function () {
                flog('pageDateChanged for panelKpiTarget');
                
                components.find('[data-dynamic-href]').reloadFragment({
                    whenComplete: function () {
                        components.each(function () {
                            initKnob($(this));
                        });
                    }
                });
            });
        }
    });
    
    function initKnob(component) {
        var colours = component.find('.circle-sale-colors');
        
        component.find('.circle-sale-knob').each(function () {
            var knob = $(this);
            
            var fgColor = '';
            if (knob.hasClass('circle-sale-primary')) {
                fgColor = colours.find('.btn-primary').css('background-color');
            } else if (knob.hasClass('circle-sale-info')) {
                fgColor = colours.find('.btn-info').css('background-color');
            } else if (knob.hasClass('circle-sale-success')) {
                fgColor = colours.find('.btn-success').css('background-color');
            } else if (knob.hasClass('circle-sale-warning')) {
                fgColor = colours.find('.btn-warning').css('background-color');
            } else if (knob.hasClass('circle-sale-danger')) {
                fgColor = colours.find('.btn-danger').css('background-color');
            }
            
            knob.attr({
                'data-width': '100%',
                'data-displayinput': 'false',
                'data-thickness': '.15',
                'data-bgColor': 'rgba(255, 255, 255, .2)',
                'data-fgColor': fgColor
            }).knob({
                readOnly: true
            });
        });
    }
    
})(jQuery);