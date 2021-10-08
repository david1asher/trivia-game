

var runAccessibility = true;

/*
if (document.addEventListener) {
	alert("you got IE9 or greater");
}
*/

if (isAccessibilityIE() && isAccessibilityIE() < 9) {
	// disable if IE8 or older
	runAccessibility = false;
}
else {
	if (window.isAppMode === true || localStorage.getItem('isAppMode')) {
		// disable for App
		runAccessibility = false;
	}
}


if (runAccessibility) {
	var ClalitAccessibilityServer = "accessibility.clalit.co.il";
	if(window.location.href.indexOf(".org.il") > -1) {
		   ClalitAccessibilityServer = "accessibility.clalit.org.il";
	}

	var ClalitAccessibilityButton = "https://"+ClalitAccessibilityServer+"/ClalitStyle/accessibility-icon-black-right.svg";

var _u1stSettings = {
	accessibilityBtn: {
			useMyClass: "useMyUser1st",
			style:
				  {
					 
					  tablet:  [{ "background-color": "transparent" }, { "background-image": "url(" + ClalitAccessibilityButton + ")" }, { "bottom": "0px" }, { "width": "48px" }, { "height": "48px" }, { "font-size": "0" }, { "padding": "0" }, { "margin": "0" }, { "background-repeat": "no-repeat" }, { "right": "0" }, { "z-index": "1000000" }, {"border-radius": "0px"}]
				  }
		}
	};


	var isActive = ((/u1stIsActive=1/).test(document.cookie));
	var script = "<script type='text/javascript'  id='User1st_Loader' src='https://" + ClalitAccessibilityServer + "/loader/head' ";
	(!isActive) && (script += "async='true'");
	script += "><\/script>";
	document.write(script);

}


function isAccessibilityIE() {
  var myNav = navigator.userAgent.toLowerCase();
  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}


// mobile:  [{ "background-color": "transparent" }, { "background-image": "url(" + ClalitAccessibilityButton + ")" }, { "bottom": "0px" }, { "width": "48px" }, { "height": "48px" }, { "font-size": "0" }, { "padding": "0" }, { "margin": "0" }, { "background-repeat": "no-repeat" }, { "right": "0" }, { "z-index": "1000000" }, {"border-radius": "0px"}],