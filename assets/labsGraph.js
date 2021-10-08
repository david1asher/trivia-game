//<![CDATA[

function showModalMessage(obj) {
    //debugger;
    if (obj == null || obj.rel == null)
        return;
    var parmeter = obj.rel;
    var name = obj.name;
    var mp = document.getElementById("modalPopUpMessage");
    if (!mp) return;
    if (mp.textContent != null) {
        mp.textContent = parmeter;
    }
    else mp.innerText = parmeter;
    var src = "../../Services/Labs/LabGraphNoMP.aspx?testId=" + parmeter + "&labName=" + name;

    document.getElementById("ifrModalPopUp").src = src;
}

function ShowModalTracking(obj) 
{
    if (obj == null || obj.rel == null)
        return;
    var parmeter = obj.rel;
    var name = obj.name;
    var mp = document.getElementById("ModalPopUpTracking");
    if (!mp) return;
    if (mp.textContent != null) 
    {
        mp.textContent = parmeter;
    }
    else
    { 
        mp.innerText = parmeter;
    }
    var src = "../../Services/Labs/LabTracking.aspx?testId=" + parmeter + "&labName=" + name;
    
    document.getElementById("ifrModalPopUpTracking").src = src;
}

//]]>