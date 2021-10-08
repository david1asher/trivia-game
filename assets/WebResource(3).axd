
// For ClalitGrid table, TR open/close
function ClalitGridTrClick(ClickedLinkObj, ClickedTrObj) {

    if (ClickedTrObj != null && ClickedTrObj != undefined) {
        var ObjDisplay = $(ClickedTrObj).next().css('display');
        if (ObjDisplay == "none" || ObjDisplay == null || ObjDisplay == undefined) {
            $(ClickedTrObj).next().removeClass('NoDisplay');
            $(ClickedTrObj).addClass("ClalitGridSelected");
            ClickedLinkObj.text(ClickedLinkObj.attr('data-titleClose')); // to change link text from open to close
        }
        else {
            $(ClickedTrObj).next().addClass('NoDisplay');
            $(ClickedTrObj).removeClass("ClalitGridSelected");
            ClickedLinkObj.text(ClickedLinkObj.attr('data-titleOpen')); // to change link text from open to close
        }
    }
}
// For ClalitGrid table, TR close 
function ClalitGridTrClose(ClickedTrObj) {
    if (ClickedTrObj != null && ClickedTrObj != undefined) {
        $(ClickedTrObj).next().addClass('NoDisplay');
        $(ClickedTrObj).removeClass("ClalitGridSelected");

        // to change link text from close to open
        var $ClickedLinkObj = ClickedTrObj.find('a[data-titleOpen]');
        $ClickedLinkObj.text($ClickedLinkObj.attr('data-titleOpen'));
        $ClickedLinkObj.focus();
    }
}
