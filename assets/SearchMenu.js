var openDiv = false;
var availableTags = [];


$("#searchBtnMenu").click(function () {
    openSearch();
});

function openSearch() {
    if (IsMobileJS()) {
        searchPopupToggle();
    }
    else {
        $("#searchDiv").addClass("searchDivOpen").removeClass("NoDisplay");
        $("#disablePage").removeClass("NoDisplay");
    }

    getTags();

    // WT open Search
    webTrendsObj.SendElementWTParams(WT_SearchMenu.searchClick, ['IsPatientTheLoggedInUser', IsPatientTheLoggedInUser()]);
}

function closeSearch() {
    $('body').css('overflow', '');
    $("#searchBtnMenu").removeClass("searchBtnHover");
    $("#searchDiv").removeClass("searchDivOpen").addClass("NoDisplay");;
    $("#disablePage").removeClass("disabledPage");

    $(".inputSearchTxt").val('');
    $(".selectPersonDdl").val($(".searchPersonHidden").val());

    $("#disablePage").addClass("NoDisplay");
      
    $("#searchNoResultsHidden").removeClass('NoResultsText');
    $("#searchNoResultsHidden").addClass('NoDisplayImp');
}

function submitToserver() {
    // WT click Search
    if ($("#searchNoResultsHidden").hasClass('NoDisplayImp')) {
        webTrendsObj.SendElementWTParams(WT_SearchMenu.searchResults, ['keyword', WT_SearchMenu.searchTxtFromInput(), 'IsPatientTheLoggedInUser', IsPatientTheLoggedInUser()]);
    }
    else {
        webTrendsObj.SendElementWTParams(WT_SearchMenu.searchResultsNotFound, ['keyword', WT_SearchMenu.searchTxtFromInput(), 'IsPatientTheLoggedInUser', IsPatientTheLoggedInUser()]);
    }

    var pageValue = $("#tags").val();
    var url = '/../OnlineWeb/api/Search/GoToLink/' + pageValue;

    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            var obj = JSON.parse(result);
            window.location.replace("/OnlineWeb/" + obj.url);
        }
    });    
}

function getTags() {
    try {
        var PersonName;
        //if (!IsMobileJS()) {
            var PersonNameFromDdlSelected = $(".selectPersonDdl option:selected");
            var PersonName = (PersonNameFromDdlSelected.get(0) != undefined) ? PersonNameFromDdlSelected.text() : $('.searchPersonHidden').val();
        //}
        //else {      //remove because bug- moving to the new page but person doesn't change
        //    PersonName = $('.searchPersonHidden').val();
        //}

        var url = '/../OnlineWeb/api/Search/GetTagsByUserRolls/' + PersonName;
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function (result) {
                try {
                    availableTags = [];

                    if (result.length > 2) {
                        var obj = [];
                        obj = JSON.parse(result); //converts to a regular object

                        for (i = 0; i < obj.length; i++) {
                            availableTags.push({ label: obj[i].label, value: obj[i].value });
                        }
                    }
                } catch (e) {
                    oLError("Error on SearchMenu.js at getTags() ajax success: ", e);
                    if (IsMobileJS()) {
                        $("#MainMenuOpener").trigger("click");
                    }
                }
            }
        });

    } catch (e) {
        oLError("Error on SearchMenu.js at getTags(): ", e);
        if (IsMobileJS()) {
            $("#MainMenuOpener").trigger("click");
        }
    }
}

$(".selectPersonDdl").change(function () {
    $(".inputSearchTxt").val('');
    getTags();
});

function addLiSearchToMenu() {
    var str = "";
    if (IsMobileJS()) {
        str = "<li id='liSearch' class='ui-tab-item SearchLi MenuItem'><a href='javascript:void(0);' onclick='javascript:openSearch(); return false' class='SearchLink MenuItemLink'>חיפוש</a></li>";
        $("#MainMenu").find(' > li:nth-last-child(1)').before(str);
    }
    else {
        str = "<div id='liSearch' class='ui-tab-item SearchLi ui-mouse-over'><a href='javascript:void(0);' onclick='javascript:openSearch(); return false' class='SearchLink'><div id='searchBtnMenu' class='searchBtnIcon'></div></a></div>";
        $("#MainMenu").after(str);
        $('.SearchLink').hover(function () {
            $('#MainMenu li').removeClass('ui-item-active').removeClass('ui-last-active');
        });
    }

}

function searchPopupToggle() {
    var searchPopup = $('#searchDiv');
    var disablePage = $('#disablePage');

    if (searchPopup.is(':visible')) {
        searchPopup.addClass('NoDisplay');
        disablePage.addClass('NoDisplay');
        $('body').css('overflow', '');
    }
    else {
        $('#MainMenuOpener').click();
        searchPopup.addClass('lightbox_web_mobile');
        $('.SearchPopupTitle').removeClass('NoDisplayImp');
        $('.SearchPopupForPerson').removeClass('NoDisplayImp');
        $('.SearchPopupFind').removeClass('NoDisplayImp');

        searchPopup.removeClass('NoDisplay');
        disablePage.removeClass('NoDisplay');

        $('body').css('overflow','hidden');
    }
}

$(function () {
    try {
        if (webConfigShowValue.toLowerCase() === 'true') {
            if (IsMobileJS()) {
                $("#searchBtnMenu").remove();
                $(".SearchLink").attr("style", "background: url(../Images/SearchBWeb.png); background-repeat: no-repeat; background-position: center;")
                    .addClass(" MenuItemLink");
                $(".SearchLi").addClass("MenuItem");
            }
            else {
                if (!IsMobileJS()) {
                    $('.redirectImageBtn').val('');
                }
            }

            addLiSearchToMenu();
            if (!$(".inputSearchTxt").val()) {
                $(".inputSearchTxt").attr("placeholder", $("#searchPlaceholderHidden").text());
            }

            $(".searchDataHidden option").each(function () {
                availableTags.push($(this).val());
            });

            function split(val) {
                return val.split(/,\s*/);
            }

            function extractLast(term) {
                return split(term).pop();
            }

            $("#tags").on("change paste keyup", function () {
                if($(this).val().length < 2)
                    {
                        $("#searchNoResultsHidden").removeClass('NoResultsText');
                        $("#searchNoResultsHidden").addClass('NoDisplayImp');
                    }
            });

            $("#tags").autocomplete({
                minLength: 2,
                source: function (request, response) {
                    // delegate back to autocomplete, but extract the last term
                    var labels = availableTags.map(function (item) {
                        return item.label;
                    });
                    //var list = $.ui.autocomplete.filter(labels, extractLast(request.term));
                    if (request.term && availableTags.length > 0) {
                        var regex = new RegExp('(' + $.ui.autocomplete.escapeRegex(request.term) + ')', "gi");
                        var list = availableTags.map(function (item) {
                            if (item.label.indexOf(request.term) >= 0) {
                                return {
                                    value: item.value.replace(" - " + item.label, '') + " - " + item.label.replace(regex, '<strong>$1</strong>'),
                                    label: item.value,
                                }
                            }
                        })
                    }
                    var listNew = [];
                    for (var i = 0; i < list.length; i++) {
                        if (list[i] !== undefined) {
                            listNew.push(list[i]);
                        }
                    }                    
                    response(listNew);

                    var searchNoResultsHidden = $("#searchNoResultsHidden");
                    if (listNew.length < 1) {
                        searchNoResultsHidden.removeClass('NoDisplayImp');
                        searchNoResultsHidden.addClass('NoResultsText');
                    }
                    else {
                        searchNoResultsHidden.removeClass('NoResultsText');
                        searchNoResultsHidden.addClass('NoDisplayImp');
                    }
                },
                focus: function (event, ui) {                  
                    $(".inputSearchTxt").val(ui.item.label);
                    return false;
                },
                select: function (event, ui) {                  
                    $(".inputSearchTxt").val(ui.item.label);
                    return false;
                }
            });
            $("#tags").data('uiAutocomplete')._renderItem = function (ul, item) {
                return $("<li>").append(item.value).appendTo(ul);
            }
        }
    } catch (e) {
        oLError("Error on SearchMenu.js at $(function ()... ", e);
    }
});



