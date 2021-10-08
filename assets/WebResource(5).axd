var oldValidatorUpdateDisplay;
var Page_HighlightValidators = new Array();
var Page_HighlightValidatorsSummaryByControl = new Array();


function newValidatorUpdateDisplay(val)
{
    // call hijacked ValidatorUpdateDisplay() method
    oldValidatorUpdateDisplay(val);
   
   
    for (i = 0; i < Page_HighlightValidators.length; i++)
    {
        var validatorID = Page_HighlightValidators[i][0];
        var controlID = Page_HighlightValidators[i][1];
        var errorClassName = Page_HighlightValidators[i][2];
        var errorCallFunction = Page_HighlightValidators[i][3];
        
        if (val.id == validatorID && val.controltovalidate == controlID)
        {
            var control = document.getElementById(controlID);

            
            // add class and change tooltip
            
            if (errorClassName != "")
            {
                // remove error class name and title if no one of the previous validators
                // with the same controltovalidate property wasn't failed
                var hasErrors = false;
                for (i in Page_HighlightValidatorsSummaryByControl[controlID])
                {
                    if (!Page_HighlightValidatorsSummaryByControl[controlID][i].isvalid) hasErrors = true;
                }
                
                if (!hasErrors)
                {
                    RemoveClassName(control, errorClassName);
                    if (control != null)
                    {
                        //control.removeAttribute("aria-invalid");
                        control.setAttribute("aria-invalid", "false");
                        control.removeAttribute("aria-describedby");

                        //if (control.title != null)
                        //{
                        //    control.title = "";
                        //}
                    }
                }


                if (!val.isvalid) {
                    //here
                    
                    if (control != null) {
                        control.setAttribute("aria-invalid", "true");
                        control.setAttribute("aria-describedby", validatorID);
                    }

                    AddClassName(control, errorClassName);
                    //if (control.title != null && val.attributes.title != null) {
                    //    control.title = val.attributes.title.value;
                        try {
                            control.focus();
                        }
                        catch (aa) { };

                    //}
                }
                
                if (typeof(Page_HighlightValidatorsSummaryByControl[controlID]) == "undefined")
                {
                    Page_HighlightValidatorsSummaryByControl[controlID] = new Array();
                }
                
                Page_HighlightValidatorsSummaryByControl[controlID][validatorID] = val;
            }
            
            // call custom function 
            if (errorCallFunction != "" && eval("typeof("+errorCallFunction+")") == "function")
            {
                if (!val.isvalid)
                {
                    eval(errorCallFunction+"(val)");
                }
            }
        }
    }
}

function trim(str) {
    return str.replace(/^\s+|\s+$/, "");
}

function AddClassName (elem, className) {
    RemoveClassName(elem, className);
    elem.className = trim(elem.className + " " + className);
}

function RemoveClassName(elem, className)
{
    if (elem != null)
    {
        elem.className = trim(elem.className.replace(className, ""));
    }
}

window.onload = function()
{
    // hijack ValidatorUpdateDisplay() method
    oldValidatorUpdateDisplay = ValidatorUpdateDisplay;
    ValidatorUpdateDisplay = newValidatorUpdateDisplay;
}

function ValidatorUpdateDisplay(val) {
    if (typeof(val.display) == "string") {    
        if (val.display == "None") {
            return;
        }
        if (val.display == "Dynamic") {
            val.style.display = val.isvalid ? "none" : "inline";
            return;
        }
    }
    val.style.visibility = val.isvalid ? "hidden" : "visible";
}