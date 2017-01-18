(function ($) {
    var KEditor = $.keditor;
    var flog = KEditor.log;

    KEditor.components['singleValue'] = {
        settingEnabled: true,
        settingTitle: 'Single Value Settings',
        initSettingForm: function (form, keditor) {
            flog('initSettingForm "singleValue" component');

            return $.ajax({
                url: '_components/singleValue?settings',
                type: 'get',
                dataType: 'HTML',
                success: function (resp) {
                    form.html(resp);

                    form.find('.select-query').on('change', function () {
                        var selectedQuery = this.value;
                        var component = keditor.getSettingComponent();
                        var dynamicElement = component.find('[data-dynamic-href]');

                        component.attr('data-query', selectedQuery);
                        keditor.initDynamicContent(dynamicElement);

                        var aggsSelect = form.find(".select-agg");
                        self.initSelect(aggsSelect, selectedQuery, null);
                    });

                    form.find('.select-agg').on('change', function () {
                        var selectedAgg = this.value;
                        var component = keditor.getSettingComponent();
                        var dynamicElement = component.find('[data-dynamic-href]');
                        component.attr('data-agg', selectedAgg);

                        keditor.initDynamicContent(dynamicElement);
                    });

                    form.find('.value-label').on('change', function () {
                        var component = keditor.getSettingComponent();
                        var dynamicElement = component.find('[data-dynamic-href]');
                        component.attr('data-label', this.value);

                        keditor.initDynamicContent(dynamicElement);
                    });

                    form.find('.value-icon').on('change', function () {
                        var component = keditor.getSettingComponent();
                        var dynamicElement = component.find('[data-dynamic-href]');
                        component.attr('data-icon', this.value);

                        keditor.initDynamicContent(dynamicElement);
                    });

                    form.find('.value-link').on('change', function () {
                        var component = keditor.getSettingComponent();
                        var dynamicElement = component.find('[data-dynamic-href]');
                        component.attr('data-link', this.value);

                        keditor.initDynamicContent(dynamicElement);
                    });
                }
            });
        },

        showSettingForm: function (form, component, keditor) {
            flog('showSettingForm "queryTable" component');

            var dataAttributes = keditor.getDataAttributes(component, ['data-type'], false);
            var selectedQuery = dataAttributes['data-query'];
            var selectedAgg = dataAttributes['data-agg'];

            form.find('.select-query').val(dataAttributes['data-query']);
            form.find('.select-agg').val(dataAttributes['data-agg']);
            form.find('.value-label').val(dataAttributes['data-label']);
            form.find('.value-icon').val(dataAttributes['data-icon']);
            form.find('.value-link').val(dataAttributes['data-link']);

            if (selectedQuery) {
                var aggsSelect = form.find(".select-agg");
                self.initSelect(aggsSelect, selectedQuery, selectedAgg);
            }
        },

        initSelect: function (aggsSelect, selectedQuery, selectedAgg) {
            flog("initSelect", selectedQuery, selectedAgg);

            $.ajax({
                url: "/queries/" + selectedQuery + "?run",
                type: 'GET',
                dataType: 'json',
                success: function (resp) {
                    flog('resp', resp);

                    var aggsHtml = '<option value""> - None - </option>';
                    var aggs = resp.aggregations;
                    for (var key in aggs) {
                        aggsHtml += '<option value="' + key + '">' + key + '</option>';
                    }
                    aggsSelect.html(aggsHtml);

                    if (selectedAgg) {
                        aggsSelect.val(selectedAgg);
                    }
                },
                error: function (e) {
                    Msg.error(e.status + ': ' + e.statusText);
                }
            });
        }
    };

})(jQuery);