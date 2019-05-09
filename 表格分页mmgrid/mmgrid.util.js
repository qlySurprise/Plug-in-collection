var Util = {
    /**
     *
     * @param url
     * @param root
     * @param cols
     * @param multiSelect  多选
     * @param checkCol     checkbox
     * @param page         是否分页
     * @returns {*}
     */
    initGrid: function initGrid(url, cols, multiSelect, checkCol, remoteSort, fullWidthRows, paginator) {
        multiSelect = multiSelect == undefined ? true : multiSelect;
        checkCol = checkCol == undefined ? true : checkCol;
        remoteSort = remoteSort == undefined ? true : remoteSort;
        fullWidthRows = fullWidthRows == undefined ? true : fullWidthRows;
        paginator = paginator == undefined ? true : paginator;
        var tabGrid;
        if (paginator) {
            tabGrid = jQuery("#table11-1").mmGrid({
                indexColWidth: 35,
                url: url,
                method: 'post',
                root: 'dataList',
                cols: cols,
                multiSelect: multiSelect,
                checkCol: checkCol,
                height: 550,
                remoteSort: remoteSort,
                fullWidthRows: fullWidthRows,
                nowrap: true,
                showBackboard: true,
                autoLoad: false,
                noDataText: '没有数据',
                plugins: [
                    jQuery('#paginator11-1').mmPaginator({
                        limit: 50,
                        limitList: [20,30, 40, 50, 100],
                        totalCountName: 'total',
                        pageParamName: 'pageIndex',
                        limitParamName: 'pageLimit'
                    })
                ]
            });
        }else{
            tabGrid = jQuery("#table11-1").mmGrid({
                indexColWidth: 35,
                url: url,
                method: 'post',
                root: 'dataList',
                cols: cols,
                multiSelect: multiSelect,
                checkCol: checkCol,
                height: 550,
                remoteSort: remoteSort,
                fullWidthRows: fullWidthRows,
                nowrap: true,
                showBackboard: true,
                autoLoad: false,
                noDataText: '没有数据',
                plugins: []
            });
        }
        return tabGrid;
    },

    selectedCount: function selectedCount() {
        jQuery('#selectedCount').html(jQuery('.mmg-body tr td input[name="_chk"]:checked').length / 2);
    },

    /**
     * 不包含空属性
     * @param tabGrid
     */
    initParams: function initParams(tabGrid) {
        tabGrid.opts.params = {};
        var tagArray = [];
        var trList = document.getElementsByClassName('inner-tag-name');//数组
        for(var i=0;i<trList.length;i++){
            //遍历数组
            tagArray.push(trList[i].innerHTML)
        };
        jQuery('#searchForm').find(":input").each(function () {
            var $that = jQuery(this);
            if ($that.val()) {
                if ($that.is(':checked')) {
                    if ($that.is(":radio")) {
                        tabGrid.opts.params[$that.attr("name")] = $that.val();
                        tabGrid.opts.params[tagArray] = JSON.stringify(tagArray);
                    } else {
                        tabGrid.opts.params[$that.attr("name")] = $that.is(':checked');
                        tabGrid.opts.params[tagArray] = JSON.stringify(tagArray);
                    }
                } else {
                    if (!$that.is(":radio")) {
                        tabGrid.opts.params[$that.attr("name")] = $that.val();
                        tabGrid.opts.params[tagArray] = JSON.stringify(tagArray);
                    }
                }
            }
        });
    },

    /**
     * 包含空属性
     * @param tabGrid
     */
    initParams2: function initParams(tabGrid) {
        tabGrid.opts.params = {};
        jQuery('#searchForm').find(":input").each(function () {
            var $that = jQuery(this);
            if ($that.is(':checked')) {
                if ($that.is(":radio")) {
                    tabGrid.opts.params[$that.attr("name")] = $that.val();
                } else {
                    tabGrid.opts.params[$that.attr("name")] = $that.is(':checked');
                }
            } else {
                if (!$that.is(":radio")) {
                    tabGrid.opts.params[$that.attr("name")] = $that.val();
                }
            }
        });
    },

    /**
     *  获取选中行的ID
     * @param tabGrid
     * @param filedName  id对应的字段名称
     * @returns {Array}
     */
    getSelectRowIds: function getSelectRowIds(tabGrid, filedName) {
        var items = tabGrid.selectedRows();
        var idArr = new Array();
        for (var i in items) {
            var item = items[i];
            jQuery.each(item, function (k, v) {
                if (k == filedName) {
                    if (idArr.indexOf(v) < 0) {
                        idArr.push(v);
                    }
                }
            })
        }
        return idArr;
    },

    /**
     * 获取未选中的行ID
     * @param tabGrid
     * @param filedName  id对应的字段名称
     * @returns {Array}
     */
    getDisSelectRowIds: function getDisSelectRowIds(tabGrid, filedName) {
        var allItems = tabGrid.rows();
        var selectItems = tabGrid.selectedRows();
        var idArr = new Array();
        for (var i in allItems) {
            var item = allItems[i];
            if (selectItems.indexOf(item) >= 0) {
                continue;
            }
            jQuery.each(item, function (k, v) {
                if (k == filedName) {
                    if (idArr.indexOf(v) < 0) {
                        idArr.push(v);
                    }
                }
            })
        }
        return idArr;
    },


}








