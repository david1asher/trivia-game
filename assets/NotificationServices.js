//<![CDATA[
    
// For NotificationServices NotesGlimps Control Load
$(document).ready(function () {
    try {
        getNotifications();

        // For  ActiveUser change. we need this because it is in an UpdatePanel
        Sys.WebForms.PageRequestManager.getInstance().add_endRequest(NotesGlimpsEndRequestHandler);
    } catch (e) {
        console.log("Error on NotificationServices.js", e);
    }  
});

function NotesGlimpsEndRequestHandler(sender, args) {
    // Update the NotesGlimpsFotter text after ActiveUser change. (we need this because it is in an UpdatePanel)
    ChangeMenuOnActiveUserChange();
}

// Update the NotesGlimpsFotter text after ActiveUser change. (we need this because it is in an UpdatePanel)
function ChangeMenuOnActiveUserChange() {
    try {
        // Get the PersonsList from MainFamilySliderControl.
        // The first obj at the list is the parent.
        var PersonsListParent = $("#PersonsList li").first();
        var PersonsListParentCssClass = PersonsListParent.attr('class').toString();
        var IsManParentIndex = PersonsListParentCssClass.indexOf("AdultManOn");
        var IsWomanParentIndex = PersonsListParentCssClass.indexOf("AdultWomanOn");
        if (IsManParentIndex >= 0 || IsWomanParentIndex >= 0) {
            $('a[id$="lnkNotesGlimpseFotter"]').css('display', 'inline-block');
            $('a[id$="lnkNotesGlimpseFotterFamilyMember"]').css('display', 'none');
        }
        else {
            $('a[id$="lnkNotesGlimpseFotterFamilyMember"]').css('display', 'inline-block');
            $('a[id$="lnkNotesGlimpseFotter"]').css('display', 'none');
        }
    } catch (e) {}
}

// If we have different width on the elements and we need all of them at same width.
function SetTheBiggestWidthToAllElementsWithClassName(elementsClassName) {
    var MaxWidth = "0";
    elementsClassNameForSearch = "." + elementsClassName;
    var AllElements = $(elementsClassNameForSearch);
    AllElements.each(function () {
        NotesGlimpseContainerIsHover = true;      // When not visible width will be 0, so we need to set it block first.
        NotesGlimpse.className = "NotesGlimpse";  // When not visible width will be 0, so we need to set it block first.
        MaxWidth = (MaxWidth < parseInt($(this).css('width'))) ? parseInt($(this).css('width')) : MaxWidth;
        NotesGlimpse.className = "NoDisplay";  // Hide NotesGlimpse, don't use "NotesGlimpseShowHide(false)" to prevent bugs of delayed hide
        NotesGlimpseContainerIsHover = false;  // Set NotesGlimpse as closed
    });

    AllElements.css('width', MaxWidth + "px"); // Set all Elements width's to the size of the bigger one.
}

// *********************** Start NotificationServices ***********************
// Creates the Notifications Glimpse module and adds it to the page.
function CreateNotificationsGlimpse(data) {
    try {
        //xmlhttp = new XMLHttpRequest();
        //xmlhttp.open("GET", "/OnlineWeb/Services/NotificationServices/NotificationsTeststingMockup.xml", false);
        //xmlhttp.send();
        //data = xmlhttp.responseXML;

    var notesGlimpseContainer = document.getElementById('NotesGlimpseContainer');
    // Clears the container before insert new data
    notesGlimpseContainer.innerHTML = "";

    var containerUL = document.createElement("ul");
    var innerLI, innerLink;
    var mainNotifications = data.getElementsByTagName("Notifications")[0];
    if (mainNotifications != undefined && mainNotifications != null) {

        NotesGlimpseOnLoad();  // Sets events MouseOver Focus

        var lnkNotesGlimpseOpener = $('a[id$="lnkNotesGlimpseOpener"]');
        var allNotificationsArr = data.getElementsByTagName("Notification");

        if (allNotificationsArr.length > 0) {

            var NotesGlimpseIndicator = document.getElementById("NotesGlimpseIndicator");
            var UnreadCount = $(mainNotifications).attr('UnreadCount');
            NotesGlimpseIndicator.className = "NotesGlimpseIndicator";

            if (UnreadCount != undefined && UnreadCount != null && UnreadCount != "0" && UnreadCount != "") {
                
                if (IsMobileJS()) {
                    $(NotesGlimpseIndicator).attr('data-glimpscount', UnreadCount);
                    $('#NotesGlimpseMain').css('display', 'inline-block');  // For mobile
                }
                else {
                    NotesGlimpseIndicator.innerHTML = UnreadCount;  // For web;
                }

                // Animate the NotesGlimpseIndicator, move it a bit down and do fade in.
                $(NotesGlimpseIndicator).css('background-color', 'White');
                $(NotesGlimpseIndicator).css('opacity', '0');
                $(NotesGlimpseIndicator).animate({
                    opacity: 0.25,
                    marginTop: "+=15px"
                }, 500, function () {
                    $(NotesGlimpseIndicator).css('opacity', '1');
                    $(NotesGlimpseIndicator).css('background-color', 'transparent');
                });

            }
            else { // For IE7
                $(NotesGlimpseIndicator).css('background','none');
            }

            var NotesGlimpse = document.getElementById("NotesGlimpse");
            NotesGlimpse.className = "NoDisplay";
            document.getElementById("NotesGlimpseFotter").className = "NotesGlimpseFotter";
            lnkNotesGlimpseOpener.get(0).href = "javascript:void(0);";
            lnkNotesGlimpseOpener.get(0).className = "MenuItemLink NotesGlimpseNoLink";

            
            var currObj, IconURL, Text, Link, ItemDate, PatientFName, Name, Read, UID;

            for (var i = 0; i < allNotificationsArr.length; i++) {
                try {
                    innerLI = document.createElement("li");

                    Read = $(allNotificationsArr[i]).attr('Read');
                    UID = $(allNotificationsArr[i]).attr('UID');

                    IconURL = (allNotificationsArr[i].getElementsByTagName("IconURL")[0].childNodes[0]) ? allNotificationsArr[i].getElementsByTagName("IconURL")[0].childNodes[0].nodeValue : "";
                    Text = allNotificationsArr[i].getElementsByTagName("Text")[0].childNodes[0].nodeValue;
                    Link = allNotificationsArr[i].getElementsByTagName("Link")[0].childNodes[0].nodeValue;
                    ItemDate = allNotificationsArr[i].getElementsByTagName("ItemDate")[0].childNodes[0].nodeValue;
                    PatientFName = allNotificationsArr[i].getElementsByTagName("PatientFName")[0];
                    Name = (PatientFName != undefined && PatientFName != null && PatientFName.childNodes.length > 0) ? allNotificationsArr[i].getElementsByTagName("PatientFName")[0].childNodes[0].nodeValue : "";

                    // Add Link which contains all line elements.
                    innerLink = document.createElement("a");
                    innerLink.href = Link;
                    innerLink.setAttribute("data-UID", UID);

                    $(innerLink).click(function () {
                        SendElementWTParams(lnkNotesGlimpseOpener);
                        var NotificationUID = $(this).attr("data-UID");
                        UpdateNotificationRead(NotificationUID);
                    });
                    
                    // If the notification wasn't read before.
                    if (Read == "false") innerLink.className = "BoldStyle";
                    // Create span, if don't need icon put empty space, else Add icon.
                    currObj = document.createElement("span");
                    currObj.className = "NotesGlimpseIcon";
                    if (IconURL != "" && IconURL != undefined && IconURL != null) {
                        var IconImg = document.createElement("img");
                        IconImg.src = IconURL;
                        IconImg.alt = "";
                        currObj.appendChild(IconImg);
                    }
                        
                    innerLink.appendChild(currObj);
                    // Add subject
                    currObj = document.createElement("span");
                    currObj.innerHTML = Text;
                    currObj.className = "NotesGlimpseSubject";
                    innerLink.appendChild(currObj);
                    // Add name
                    currObj = document.createElement("span");
                    currObj.innerHTML = Name;
                    currObj.className = "NotesGlimpseName";
                    innerLink.appendChild(currObj);
                    // Add date
                    currObj = document.createElement("span");
                    currObj.innerHTML = ItemDate.replace("/", ".").replace("/", ".");
                    currObj.className = "NotesGlimpseDate";
                    innerLink.appendChild(currObj);

                    innerLI.appendChild(innerLink);
                    containerUL.appendChild(innerLI);
                } catch (e) {} // on XML error don't add new li  //alert(e.Message);
            }

            notesGlimpseContainer.appendChild(containerUL);
            // We have different width on the Elements and we need all of them to be at the same width.
            SetTheBiggestWidthToAllElementsWithClassName("NotesGlimpseSubject");
            SetTheBiggestWidthToAllElementsWithClassName("NotesGlimpseName");
            NotesGlimpse.style.width = $(NotesGlimpse).css('width').toString(); // For IE7 to set new width size.
        }
        else { SetNotesGlimpseOpenerAsLink(); }
    }
    else { SetNotesGlimpseOpenerAsLink(); }

    } catch (e) {
        console.log("Error on CreateNotificationsGlimpse", e);
    }
}

function SetNotesGlimpseOpenerAsLink() {
    var lnkNotesGlimpseOpener = $('a[id$="lnkNotesGlimpseOpener"]');
    lnkNotesGlimpseOpener.get(0).href = "/OnlineWeb/Services/NotificationServices/NotificationServices.aspx";
    lnkNotesGlimpseOpener.get(0).className = "MenuItemLink NoBorder NotesGlimpseOpenerLink";
    $("#NotesGlimpse").css('display', 'none');
}

// The async call to get all Notifications.
// Activates CreateNotificationsGlimpse(data) with the data from the async call.
var IsGetNotificationsFinished = false;
var getNotificationsGetRequest;
function getNotifications() {
    getNotificationsGetRequest =
    $.ajax({
        type: "GET",
        global: false, // to prevent loader show at ajaxStart
        cache: false,
        url: "/OnlineWeb/Services/NotificationService.svc/GetNotifications",
        //url: "/OnlineWeb/Services/NotificationServices/NotificationsTeststingMockup.xml",
        data: "{ }",
        contentType: "application/json; charset=utf-8",
        dataType: "xml",
        processData: false,
        success: function (data) {
           if(data != null) CreateNotificationsGlimpse(data);
            IsGetNotificationsFinished = true;
        },
        error: function (e) { SetNotesGlimpseOpenerAsLink(); } // alert("Error Async GET NotificationService");
    });
}

// The async call to update Notification as Read.
// Calls UpdateNotificationRead(string UID)
function UpdateNotificationRead(UID) {
    $.ajax({
        async: false,
        type: "POST",
        url: "/OnlineWeb/Services/NotificationService.svc/UpdateNotificationRead",
        data: "{ \"ID\": \"" + UID + "\" }",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        processData: false,
        error: function (e) { } // alert("Error UpdateNotificationRead"); 
    });
}

// We need the hover state after the delay
var NotesGlimpseContainerIsHover = false;

function NotesGlimpseShowHide(show) {
    var NotesGlimpse = document.getElementById('NotesGlimpse');
    var NotesGlimpseMain = $('#NotesGlimpseMain');
    $("#uiTabWrapper").hide();
    if (show) {
        NotesGlimpseContainerIsHover = true;
        setTimeout(function () {
            if (NotesGlimpseContainerIsHover) {
//                NotesGlimpseMain.addClass("NotesGlimpseMainHoverForDelay");  // show NotesGlimpseRightBorder until the delay is off
                NotesGlimpse.className = "NotesGlimpse";
            }
        }, 500);
    }
    else {  // When hide NotesGlimpse do delay to fit all the MainMenu
        NotesGlimpseContainerIsHover = false;
        setTimeout(function () {
            if (!NotesGlimpseContainerIsHover) {
                NotesGlimpse.className = "NoDisplay";
//                NotesGlimpseMain.removeClass("NotesGlimpseMainHoverForDelay"); // hide NotesGlimpseRightBorder after the delay is off
            }
        }, 500);
    }
}

// Events to open/close the NotificationsGlimpse module.
function NotesGlimpseOnLoad() {
    var NotesGlimpseMain = $('#NotesGlimpseMain');
    //Highlight sub menu item on hover
    if (!IsMobileJS()) {
        NotesGlimpseMain.hover(function () {
            NotesGlimpseShowHide(true);
        }, function () {
            NotesGlimpseShowHide(false);
        });
        NotesGlimpseMain.focusin(function () {
            NotesGlimpseShowHide(true);
        }).focusout(function () {
            NotesGlimpseShowHide(false);
        });

        $('li.NotesGlimpseMenuItem').keydown(function (event) {
            var keyCode = event.keyCode || event.which;

            if (event.shiftKey && keyCode == 9) { // keyCode == 9 : 'Tab' key
                //navigateBackward
                NotesGlimpseShowHide(false);
                NotesGlimpseMain.closest('li.ui-tab-item').removeClass("ui-item-active").removeClass("ui-link-next");
            }
        });
    }
    else
    {
        NotesGlimpseMain.click(function () {
            if (typeof IsTytoClicked === 'undefined' || !IsTytoClicked)
            {
                document.location.href = "/OnlineWeb/Services/NotificationServices/NotificationServices.aspx";
            }       
        });
    }
}
// *********************** End NotificationServices ***********************


//]]>