//#region Search Menu WT
var WT_SearchMenu = {
    //#region SearchMenu
    // לחיצה על אייקון חיפוש
    searchClick: { service: searchPageTitle(), action: "חיפוש", location: "header", destination: "חיפוש" },
    // ביצוע חיפוש עם תוצאות
    searchResults: { service: searchPageTitle(), action: "ביצוע חיפוש עם תוצאות", location: "search", destination: "GoToLink" },
    // ביצוע חיפוש ללא תוצאות
    searchResultsNotFound: { service: searchPageTitle(), action: "ביצוע חיפוש ללא תוצאה", location: "search", destination: "חיפוש ללא תוצאה" },
    //#endregion SearchMenu

    searchTxtFromInput: function searchTxtFromInput() {
        return $('.inputSearchTxt').val();
    },
}

function IsPatientTheLoggedInUser() {
    var PersonsListLi = $('#PersonsList li');
    var PersonsListFirstLi = PersonsListLi.first();
    if (PersonsListLi.get(0) == undefined || PersonsListFirstLi.hasClass('FStabBg_AdultManOn') || PersonsListFirstLi.hasClass('FStabBg_AdultWomanOn')) {
        return "1";
    }
    else {
        return "0";
    }
}
function searchPageTitle() {
    return $('body title').text();
}

