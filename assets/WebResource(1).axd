
/* Force table to not be like tables anymore */
.ClalitGridTable table,
.ClalitGridTable thead,
.ClalitGridTable tbody,
.ClalitGridTable th,
.ClalitGridTable td,
.ClalitGridTable tr {
    display: block;
}

.ClalitGridTable { border-bottom: 0; }

/* Hide table headers (but not display: none;, for accessibility) */
.ClalitGridTable thead tr {
    position: absolute !important;
    top: -9999px !important;
    right: -9999px !important;
}

.ClalitGridTable tr {
    border: 1px solid #cfd3d6;
    margin-bottom: 20px;
    padding: 5px 10px 5px 10px !important;
}
.ClalitGridTable tr td {
    /* Behave  like a "row" */
    border: none !important;
    position: relative !important;
    padding: 3px !important;
}

.ClalitGridTable .ThMovedToTd {
    /* Now like a table header */
    right: 10px !important;
    padding-left: 5px !important;
    white-space: nowrap !important;
    text-align: right !important;
    font-weight: bold;
}

.ClalitGridRow.ClalitGridSelected,
.ClalitGridAltRow.ClalitGridSelected { 
    margin-bottom: 0; border-bottom: 0; 
}

.DescBlockCell .ThMovedToTd {
    display: none;
}
tr.DescBlockRow { border-top: 0; }
.ClalitGridTable td.DescBlockCell {
    padding-right: 0;
}
.DescBlockRow.NoDisplay { display: none; }

td.ClalitGridActions {
    padding: 5px 10px 2px 10px !important; 
    width: 100%; 
    vertical-align: middle !important; 
    text-align:center !important;
}
.ClalitGridActions span { display: none; }

a.ClalitGridCloseImg,
.ClalitGridActions a,
.ClalitGridActions .online_blue_button {
    width: 100%; font-size: 22px;
    text-decoration: none !important; border: 0; 
    background: #407bac; 
    padding-right: 5px; padding-left: 5px; cursor: pointer; color: white !important; min-width: 55px; 
    display: inline-block; text-align: center; margin: 0 auto; line-height: 37px;
    border-radius: 5px;  
}

/* At mobile change the X button to close button. gets the text from the title attribute by JS at ResponsiveTables.js */
a.ClalitGridCloseImg { 
    float: none; height: auto;
    padding: 0 5px 0 5px;
    margin: 20px auto 0 auto;
}

.ClalitGridCounterTitle { margin-bottom: 10px !important; }





/* Start Pager */
.ClalitGridPagerContainer .PagerNumberLink { display:none }
.ClalitGridPagerContainer span.NextPrevLink,
.ClalitGridPagerContainer a.NextPrevLink{  
    width:48%; height: auto;
    color: #fff;
    text-align: center; vertical-align: middle;
    background-repeat: no-repeat;
    padding: 10px 0;
    font-size: 1.3rem;
}
.ClalitGridPagerContainer .RightPagerButton
{
    background: #407bac;
    background: url(WebResource.axd?d=dgwbMqDJXD-UqJy20WkvDtHrGZ98kj8-YeAW4zYH1pRsyuI5b16w9Y7zsD2Ev7LazcLuuAUKXUGD-1qNe3K1RjUoFWZ4YB896NnY8sToQJaH-tdBGcfmHz6Xpsm_Z-i85K7Z1oxUbi0FZbimHW1v_zhvQ5WHDlM3MGCfgNstdhc1&t=637658363300000000), #407bac;
    background-position: 95% 50%;
    background-repeat: no-repeat;
}
.ClalitGridPagerContainer .LeftPagerButton
{
    background: #407bac;
    background: url(WebResource.axd?d=pEBHpASqiiwp8rnAjqakgpxYTMK9IYRh8aM-CPQ67oDfwpj72QBASzKl8Vc-_3GVj225Yjqd82R-XZ0ySXuA2W8_mlpcarAd5G-tIbjaIXrw2bNg1OEm7CwfYrlSvO4c4dQcWvpQxzJdYZPPe8-7Ei9N1uO667ViAtMtOG3n-rg1&t=637658363300000000), #407bac;
    background-position: 5% 50%;
    background-repeat: no-repeat;
}
.ClalitGridPagerContainer span.NextPrevSpan {
    width:48%; height: auto;
    color: #fff;
    text-align: center; vertical-align: middle;
    background-repeat: no-repeat;
    padding: 10px 0;
    font-size: 1.3rem;
    background: #bebebe;
}
.ClalitGridPagerContainer span.RightPagerButton
{
    background: #bebebe;
    background: url(WebResource.axd?d=dgwbMqDJXD-UqJy20WkvDtHrGZ98kj8-YeAW4zYH1pRsyuI5b16w9Y7zsD2Ev7LazcLuuAUKXUGD-1qNe3K1RjUoFWZ4YB896NnY8sToQJaH-tdBGcfmHz6Xpsm_Z-i85K7Z1oxUbi0FZbimHW1v_zhvQ5WHDlM3MGCfgNstdhc1&t=637658363300000000), #bebebe;
    background-position: 95% 50%;
    background-repeat: no-repeat;
}
.ClalitGridPagerContainer span.LeftPagerButton
{
    background: #006db1;
    background: url(WebResource.axd?d=pEBHpASqiiwp8rnAjqakgpxYTMK9IYRh8aM-CPQ67oDfwpj72QBASzKl8Vc-_3GVj225Yjqd82R-XZ0ySXuA2W8_mlpcarAd5G-tIbjaIXrw2bNg1OEm7CwfYrlSvO4c4dQcWvpQxzJdYZPPe8-7Ei9N1uO667ViAtMtOG3n-rg1&t=637658363300000000), #bebebe;
    background-position: 5% 50%;
    background-repeat: no-repeat;
}

.OnlineCustomGridPagerItemList
{
    padding: 0;
    margin: 0;
    list-style-type: none;
}
.OnlineCustomGridPagerItemList li
{
    padding: 0;
    margin: 0;
}
/* End Pager */
.ClalitCustomGridActionList { display:table; width:100%; list-style-type: none; margin:0; padding:0; }
.ClalitCustomGridActionList li { display: table-cell; padding-left: 10px; }
.ClalitCustomGridActionList li:last-child { padding-left: 0; }
.ClalitCustomGridActionList li a { white-space: nowrap }


