

$(document).ready(function () {
    var allTables = $(".ClalitGridTable");

    allTables.each(function () {
        var currTable = $(this);
        var TheadTHs = currTable.find("th");
        var innerElem = null;

        function getTHInnerElementByIndex(thIndex) {
            var currTH = TheadTHs.eq(thIndex);
            if (currTH != undefined) {

                var ThInnerA = currTH.find("a");

                if (ThInnerA.get(0) != undefined) {
                    innerElem = "<span class='ThMovedToTd'>" + ThInnerA.get(0).outerHTML + "</span>";
                }
                else {
                    innerElem = "<span class='ThMovedToTd'>" + currTH.text() + "</span>";
                }
            }

            return innerElem;
        }

        var rows = currTable.find("tr");
        rows.each(function () {
            var TDs = $(this).find("td");
            TDs.each(function (index, value) {
                var THInnerElement = getTHInnerElementByIndex(index);
                if (THInnerElement != null) {
                    $(this).prepend(THInnerElement);
                }
            });
        });

        // At mobile change the X button to close button. get the text from the title attribute.
        var ClalitGridCloseImgs = currTable.find(".ClalitGridCloseImg");
        ClalitGridCloseImgs.each(function () {
            $(this).html($(this).attr("title"));
        });        

    });


});