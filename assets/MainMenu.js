function MainMenuWT() {
    try {
        var menuWrapper = $('#menuWrapper');
        var mainMenu = $('#uiTabWrapper');

        //#region ***** Tyto *****
        // לחיצה על ייעוץ רפואי און־ליין - data-tab-id='123' => MenuItemId on admin
        menuWrapper.find("li[data-tab-id='tab_123']").first().find('a').click(function () {
            var link = $(this);
            var medicalAdviceOnlineWT = { service: "navigation menu", action: "open menu", location: link.text(), next_module: link.text() };
            webTrendsObj.SendElementWTParams(medicalAdviceOnlineWT);
        });

        // לחיצה על כותרת טייטו + לחיצה על קישור להפעלת השירות
        mainMenu.find("a[href$='TytoCareActivate.aspx']").click(function () {
            var link = $(this);
            if (link.parent().get(0).tagName == "H3") {
                var containerTab = link.closest('div.ui-tab-wrapper').attr('id');
                var dataTabId = menuWrapper.find("li[data-tab-id='" + containerTab + "']").first().find('a');
                var parentTxt = dataTabId.text();
            }
            else {
                var parentTxt = link.parent().closest('div').prev('h3').text();
            }

            var tytoActivateLinkWT = { service: "navigation menu", action: "click on link", location: parentTxt, next_module: link.text() };
            webTrendsObj.SendElementWTParams(tytoActivateLinkWT);
        });

        // לחיצה על קישור למידע ולרכישה
        mainMenu.find("a[href$='Tyto/Pages/preview.aspx']").click(function () {
            var link = $(this);
            var parentTxt = link.parent().closest('div').prev('h3').text();
            var tytoPurchaseLinkWT = { service: "navigation menu", action: "click on link", location: parentTxt, next_module: link.text() };
            webTrendsObj.SendElementWTParams(tytoPurchaseLinkWT);
        });
        //#endregion ***** Tyto *****

    } catch (e) {
        oLError("Error on CommonAllPlatforms.js at MainMenuWT: ", e);
    }
}

$(document).ready(function () {
    try {
        MainMenuWT();
    } catch (e) {
        oLError("Error on WT_Data\MainMenu.js at document ready: ", e);
    }
});

