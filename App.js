Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    launch: function () {
        console.log("launch()");
        Ext.create('Rally.data.wsapi.TreeStoreBuilder').build({
            models: ['PortfolioItem/Feature'],
            autoLoad: true,
            enableHierarchy: true,
            fetch: ['Name', 'State', 'RefinedEstimate']
        }).then({
            success: this._onStoreBuilt,
            scope: this
        });
    },

    _onStoreBuilt: function (store) {
        console.log("_onStoreBuilt()");
        var modelNames = ['PortfolioItem/Feature'];
        var context = this.getContext();
        var me = this;

        var myGrid = me.add({
            xtype: 'rallygridboard',
            context: context,
            modelNames: modelNames,
            toggleState: 'grid',

            gridConfig: {
                store: store,
                alwaysShowDefaultColumns: true,
                columnCfgs: [
                    'Name',
                    'State',
                    {
                        text: 'Refined',
                        dataIndex: 'RefinedEstimate',
                        renderer: function (value) {
                            console.log("RefinedEstimate:renderer");
                            return value + " EUR";
                        }
                    },
                    {
                        text: 'Department (Yrs)',
                        xtype: 'templatecolumn',
                        tpl: '{RefinedEstimate} ({Name})'
                    }
                ]
            },
            height: me.getHeight()
        });
        console.log("myGrid = ", myGrid);
    }
});