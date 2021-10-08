// WebTrends SmartSource Data Collector Tag
// Version: 9.3.0
// Tag Builder Version: 3.1
// Created: 12/26/2010 7:00:45 AM

function WebTrends(ClalitDomain, ClalitFpcdom, Dcsid) {
    var that = this;
    // begin: user modifiable
    this.dcsid = (Dcsid != undefined && Dcsid != "") ? Dcsid : window.dscid;
    if (this.dcsid == undefined || this.dcsid == "") {
        this.dcsid = "dcse3xxlu1000000w41963in1_7u3l";
        if (IsConsoleActive()) { console.log("Error: WT dcsid key is missing on web.config - using default"); }
    }
    //this.dcsid="dcse3xxlu1000000w41963in1_7u3l";
    //this.domain = "sdc.clalit.org.il";
    this.domain = ClalitDomain.toString();  // takes the domain from web.config
    this.timezone = 2;
    //this.fpcdom=".clalit.org.il";
    this.fpcdom = ClalitFpcdom.toString();  // takes the fpcdom from web.config
    this.enabled = true;
    this.i18n = false;
    this.fpc = "WT_FPC";
    this.paidsearchparams = "gclid";
    this.splitvalue = "";
    this.preserve = true;  // the default was false
    // end: user modifiable
    this.DCS = {};
    this.WT = {};
    this.DCSext = {};
    this.images = [];
    this.index = 0;
    this.exre = (function () { return (window.RegExp ? new RegExp("dcs(uri)|(ref)|(aut)|(met)|(sta)|(sip)|(pro)|(byt)|(dat)|(p3p)|(cfg)|(redirect)|(cip)", "i") : ""); })();
    this.re = (function () { return (window.RegExp ? (that.i18n ? { "%25": /%/g, "%26": /&/g } : { "%09": /\t/g, "%20": /\s/g, "%23": /#/g, "%26": /&/g, "%2B": /\+/g, "%3F": /\?/g, "%5C": /\\/g, "%22": /"/g, "%7F": /x7F/g, "%A0": /xA0/g }) : ""); })();
}
WebTrends.prototype.dcsGetId = function () {
    if (this.enabled && (document.cookie.indexOf(this.fpc + "=") == -1) && (document.cookie.indexOf("WTLOPTOUT=") == -1)) {
        document.write("<scr" + "ipt type='text/javascript' src='" + "http" + (window.location.protocol.indexOf("https:") == 0 ? "s" : "") + "://" + this.domain + "/" + this.dcsid + "/wtid.js" + "'><\/scr" + "ipt>");
    }
};
WebTrends.prototype.dcsGetCookie = function (name) {
    var cookies = document.cookie.split("; ");
    var cmatch = [];
    var idx = 0;
    var i = 0;
    var namelen = name.length;
    var clen = cookies.length;
    var c;
    for (i = 0; i < clen; i++) {
        c = cookies[i];
        if ((c.substring(0, namelen + 1)) == (name + "=")) {
            cmatch[idx++] = c;
        }
    }
    var cmatchCount = cmatch.length;
    if (cmatchCount > 0) {
        idx = 0;
        if ((cmatchCount > 1) && (name == this.fpc)) {
            var dLatest = new Date(0);
            var lv;
            var dLst;
            for (i = 0; i < cmatchCount; i++) {
                lv = parseInt(this.dcsGetCrumb(cmatch[i], "lv"));
                dLst = new Date(lv);
                if (dLst > dLatest) {
                    dLatest.setTime(dLst.getTime());
                    idx = i;
                }
            }
        }
        return unescape(cmatch[idx].substring(namelen + 1));
    }
    else {
        return null;
    }
};
WebTrends.prototype.dcsGetCrumb = function (cval, crumb, sep) {
    var aCookie = cval.split(sep || ":");
    var i = 0;
    var aCrumb;
    for (i = 0; i < aCookie.length; i++) {
        aCrumb = aCookie[i].split("=");
        if (crumb == aCrumb[0]) {
            return aCrumb[1];
        }
    }
    return null;
};
WebTrends.prototype.dcsGetIdCrumb = function (cval, crumb) {
    var id = cval.substring(0, cval.indexOf(":lv="));
    var aCrumb = id.split("=");
    var i = 0;
    for (i = 0; i < aCrumb.length; i++) {
        if (crumb == aCrumb[0]) {
            return aCrumb[1];
        }
    }
    return null;
};
WebTrends.prototype.dcsIsFpcSet = function (name, id, lv, ss) {
    var c = this.dcsGetCookie(name);
    if (c) {
        return ((id == this.dcsGetIdCrumb(c, "id")) && (lv == this.dcsGetCrumb(c, "lv")) && (ss == this.dcsGetCrumb(c, "ss"))) ? 0 : 3;
    }
    return 2;
};
WebTrends.prototype.dcsFPC = function () {
    if (document.cookie.indexOf("WTLOPTOUT=") != -1) {
        return;
    }
    var WT = this.WT;
    var name = this.fpc;
    var dCur = new Date();
    var adj = (dCur.getTimezoneOffset() * 60000) + (this.timezone * 3600000);
    dCur.setTime(dCur.getTime() + adj);
    var dExp = new Date(dCur.getTime() + 315360000000);
    var dSes = new Date(dCur.getTime());
    WT.co_f = "";
    WT.vtid = "";
    WT.vtvs = "";
    WT.vt_f = "";
    WT.vt_f_a = "";
    WT.vt_f_s = "";
    WT.vt_f_d = "";
    WT.vt_f_tlh = "";
    WT.vt_f_tlv = "";
    if (document.cookie.indexOf(name + "=") == -1) {
        if ((typeof (gWtId) != "undefined") && (gWtId != "")) {
            WT.co_f = gWtId;
        }
        else if ((typeof (gTempWtId) != "undefined") && (gTempWtId != "")) {
            WT.co_f = gTempWtId;
            WT.vt_f = "1";
        }
        else {
            WT.co_f = "2";
            var curt = dCur.getTime().toString();
            var i;
            for (i = 2; i <= (32 - curt.length) ; i++) {
                WT.co_f += Math.floor(Math.random() * 16.0).toString(16);
            }
            WT.co_f += curt;
            WT.vt_f = "1";
        }
        if (typeof (gWtAccountRollup) == "undefined") {
            WT.vt_f_a = "1";
        }
        WT.vt_f_s = "1";
        WT.vt_f_d = "1";
        WT.vt_f_tlh = "0";
        WT.vt_f_tlv = "0";
    }
    else {
        var c = this.dcsGetCookie(name);
        var id = this.dcsGetIdCrumb(c, "id");
        var lv = parseInt(this.dcsGetCrumb(c, "lv"));
        var ss = parseInt(this.dcsGetCrumb(c, "ss"));
        if ((id == null) || (id == "null") || isNaN(lv) || isNaN(ss)) {
            return;
        }
        WT.co_f = id;
        var dLst = new Date(lv);
        WT.vt_f_tlh = Math.floor((dLst.getTime() - adj) / 1000);
        dSes.setTime(ss);
        if ((dCur.getTime() > (dLst.getTime() + 1800000)) || (dCur.getTime() > (dSes.getTime() + 28800000))) {
            WT.vt_f_tlv = Math.floor((dSes.getTime() - adj) / 1000);
            dSes.setTime(dCur.getTime());
            WT.vt_f_s = "1";
        }
        if ((dCur.getDay() != dLst.getDay()) || (dCur.getMonth() != dLst.getMonth()) || (dCur.getYear() != dLst.getYear())) {
            WT.vt_f_d = "1";
        }
    }
    WT.co_f = escape(WT.co_f);
    WT.vtid = (typeof (this.vtid) == "undefined") ? WT.co_f : (this.vtid || "");
    WT.vtvs = dSes.getTime() - adj;
    WT.vtvs = WT.vtvs.toString();
    var expiry = "; expires=" + dExp.toGMTString();
    var cur = dCur.getTime().toString();
    var ses = dSes.getTime().toString();
    document.cookie = name + "=" + "id=" + WT.co_f + ":lv=" + cur + ":ss=" + ses + expiry + "; path=/" + (this.fpcdom != "" ? "; domain=" + this.fpcdom : "");
    var rc = this.dcsIsFpcSet(name, WT.co_f, cur, ses);
    if (rc != 0) {
        WT.co_f = "";
        WT.vtvs = "";
        WT.vt_f_s = "";
        WT.vt_f_d = "";
        WT.vt_f_tlh = "";
        WT.vt_f_tlv = "";
        if (typeof (this.vtid) == "undefined") {
            WT.vtid = "";
        }
        WT.vt_f = rc;
        WT.vt_f_a = rc;
    }
};
WebTrends.prototype.dcsMultiTrack = function () {
    var args = dcsMultiTrack.arguments ? dcsMultiTrack.arguments : arguments;
    if (args.length % 2 == 0) {
        this.dcsSaveProps(args);
        this.dcsSetProps(args);
        var dCurrent = new Date();
        this.DCS.dcsdat = dCurrent.getTime();
        this.dcsFPC();
        this.dcsTag();
        this.dcsRestoreProps();
    }
};

WebTrends.prototype.dcsCleanUp = function () {
    this.DCS = {};
    this.WT = {};
    this.DCSext = {};
    if (arguments.length % 2 == 0) {
        this.dcsSetProps(arguments);
    }
};
WebTrends.prototype.dcsSetProps = function (args) {
    var i = 0;
    for (i = 0; i < args.length; i += 2) {
        if (args[i].indexOf("WT.") == 0) {
            this.WT[args[i].substring(3)] = args[i + 1];
        }
        else if (args[i].indexOf("DCS.") == 0) {
            this.DCS[args[i].substring(4)] = args[i + 1];
        }
        else if (args[i].indexOf("DCSext.") == 0) {
            this.DCSext[args[i].substring(7)] = args[i + 1];
        }
    }
};
WebTrends.prototype.dcsSaveProps = function (args) {
    var i, key, param;
    if (this.preserve) {
        this.args = [];
        for (i = 0; i < args.length; i += 2) {
            param = args[i];
            if (param.indexOf("WT.") == 0) {
                key = param.substring(3);
                this.args[i] = param;
                this.args[i + 1] = this.WT[key] || "";
            }
            else if (param.indexOf("DCS.") == 0) {
                key = param.substring(4);
                this.args[i] = param;
                this.args[i + 1] = this.DCS[key] || "";
            }
            else if (param.indexOf("DCSext.") == 0) {
                key = param.substring(7);
                this.args[i] = param;
                this.args[i + 1] = this.DCSext[key] || "";
            }
        }
    }
};
WebTrends.prototype.dcsRestoreProps = function () {
    if (this.preserve) {
        this.dcsSetProps(this.args);
        this.args = [];
    }
};
WebTrends.prototype.dcsAdv = function () {
    this.dcsFPC();
};
WebTrends.prototype.dcsVar = function () {
    var dCurrent = new Date();
    var WT = this.WT;
    var DCS = this.DCS;
    WT.tz = parseInt(dCurrent.getTimezoneOffset() / 60 * -1) || "0";
    WT.bh = dCurrent.getHours() || "0";
    WT.ul = navigator.appName == "Netscape" ? navigator.language : navigator.userLanguage;
    if (typeof (screen) == "object") {
        WT.cd = navigator.appName == "Netscape" ? screen.pixelDepth : screen.colorDepth;
        WT.sr = screen.width + "x" + screen.height;
    }
    if (typeof (navigator.javaEnabled()) == "boolean") {
        WT.jo = navigator.javaEnabled() ? "Yes" : "No";
    }
    if (document.title) {
        if (window.RegExp) {
            var tire = new RegExp("^" + window.location.protocol + "//" + window.location.hostname + "\\s-\\s");
            WT.ti = document.title.replace(tire, "");
        }
        else {
            WT.ti = document.title;
        }
    }
    WT.js = "Yes";
    WT.jv = (function () {
        var agt = navigator.userAgent.toLowerCase();
        var major = parseInt(navigator.appVersion);
        var mac = (agt.indexOf("mac") != -1);
        var ff = (agt.indexOf("firefox") != -1);
        var ff0 = (agt.indexOf("firefox/0.") != -1);
        var ff10 = (agt.indexOf("firefox/1.0") != -1);
        var ff15 = (agt.indexOf("firefox/1.5") != -1);
        var ff20 = (agt.indexOf("firefox/2.0") != -1);
        var ff3up = (ff && !ff0 && !ff10 & !ff15 & !ff20);
        var nn = (!ff && (agt.indexOf("mozilla") != -1) && (agt.indexOf("compatible") == -1));
        var nn4 = (nn && (major == 4));
        var nn6up = (nn && (major >= 5));
        var ie = ((agt.indexOf("msie") != -1) && (agt.indexOf("opera") == -1));
        var ie4 = (ie && (major == 4) && (agt.indexOf("msie 4") != -1));
        var ie5up = (ie && !ie4);
        var op = (agt.indexOf("opera") != -1);
        var op5 = (agt.indexOf("opera 5") != -1 || agt.indexOf("opera/5") != -1);
        var op6 = (agt.indexOf("opera 6") != -1 || agt.indexOf("opera/6") != -1);
        var op7up = (op && !op5 && !op6);
        var jv = "1.1";
        if (ff3up) {
            jv = "1.8";
        }
        else if (ff20) {
            jv = "1.7";
        }
        else if (ff15) {
            jv = "1.6";
        }
        else if (ff0 || ff10 || nn6up || op7up) {
            jv = "1.5";
        }
        else if ((mac && ie5up) || op6) {
            jv = "1.4";
        }
        else if (ie5up || nn4 || op5) {
            jv = "1.3";
        }
        else if (ie4) {
            jv = "1.2";
        }
        return jv;
    })();
    WT.ct = "unknown";
    if (document.body && document.body.addBehavior) {
        try {
            document.body.addBehavior("#default#clientCaps");
            WT.ct = document.body.connectionType || "unknown";
            document.body.addBehavior("#default#homePage");
            WT.hp = document.body.isHomePage(location.href) ? "1" : "0";
        }
        catch (e) {
        }
    }
    if (document.all) {
        WT.bs = document.body ? document.body.offsetWidth + "x" + document.body.offsetHeight : "unknown";
    }
    else {
        WT.bs = window.innerWidth + "x" + window.innerHeight;
    }
    WT.fv = (function () {
        var i, flash;
        if (window.ActiveXObject) {
            for (i = 15; i > 0; i--) {
                try {
                    flash = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + i);
                    return i + ".0";
                }
                catch (e) {
                }
            }
        }
        else if (navigator.plugins && navigator.plugins.length) {
            for (i = 0; i < navigator.plugins.length; i++) {
                if (navigator.plugins[i].name.indexOf("Shockwave Flash") != -1) {
                    return navigator.plugins[i].description.split(" ")[2];
                }
            }
        }
        return "Not enabled";
    })();
    WT.slv = (function () {
        var slv = "Not enabled";
        try {
            if (navigator.userAgent.indexOf("MSIE") != -1) {
                var sli = new ActiveXObject("AgControl.AgControl");
                if (sli) {
                    slv = "Unknown";
                }
            }
            else if (navigator.plugins["Silverlight Plug-In"]) {
                slv = "Unknown";
            }
        }
        catch (e) {
        }
        if (slv != "Not enabled") {
            var i, m, M, F;
            if ((typeof (Silverlight) == "object") && (typeof (Silverlight.isInstalled) == "function")) {
                for (i = 9; i > 0; i--) {
                    M = i;
                    if (Silverlight.isInstalled(M + ".0")) {
                        break;
                    }
                    if (slv == M) {
                        break;
                    }
                }
                for (m = 9; m >= 0; m--) {
                    F = M + "." + m;
                    if (Silverlight.isInstalled(F)) {
                        slv = F;
                        break;
                    }
                    if (slv == F) {
                        break;
                    }
                }
            }
        }
        return slv;
    })();
    if (this.i18n) {
        if (typeof (document.defaultCharset) == "string") {
            WT.le = document.defaultCharset;
        }
        else if (typeof (document.characterSet) == "string") {
            WT.le = document.characterSet;
        }
        else {
            WT.le = "unknown";
        }
    }
    WT.tv = "9.3.0";
    WT.sp = this.splitvalue;
    WT.dl = "0";
    WT.ssl = (window.location.protocol.indexOf("https:") == 0) ? "1" : "0";
    DCS.dcsdat = dCurrent.getTime();
    DCS.dcssip = window.location.hostname;
    DCS.dcsuri = window.location.pathname;
    WT.es = DCS.dcssip + DCS.dcsuri;
    if (window.location.search) {
        DCS.dcsqry = window.location.search;
    }
    if (DCS.dcsqry) {
        var dcsqry = DCS.dcsqry.toLowerCase();
        var params = this.paidsearchparams.length ? this.paidsearchparams.toLowerCase().split(",") : [];
        var i = 0;
        for (i = 0; i < params.length; i++) {
            if (dcsqry.indexOf(params[i] + "=") != -1) {
                WT.srch = "1";
                break;
            }
        }
    }
    if ((window.document.referrer != "") && (window.document.referrer != "-")) {
        if (!(navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion) < 4)) {
            DCS.dcsref = window.document.referrer;
        }
    }
};
WebTrends.prototype.dcsEscape = function (S, REL) {
    if (REL != "") {
        S = S.toString();
        var R;
        for (R in REL) {
            if (REL[R] instanceof RegExp) {
                S = S.replace(REL[R], R);
            }
        }
        return S;
    }
    else {
        return escape(S);
    }
};
WebTrends.prototype.dcsA = function (N, V) {
    if (this.i18n && (this.exre != "") && !this.exre.test(N)) {
        if (N == "dcsqry") {
            var newV = "";
            var params = V.substring(1).split("&");
            for (var i = 0; i < params.length; i++) {
                var pair = params[i];
                var pos = pair.indexOf("=");
                if (pos != -1) {
                    var key = pair.substring(0, pos);
                    var val = pair.substring(pos + 1);
                    if (i != 0) {
                        newV += "&";
                    }
                    newV += key + "=" + this.dcsEncode(val);
                }
            }
            V = V.substring(0, 1) + newV;
        }
        else {
            V = this.dcsEncode(V);
        }
    }
    return "&" + N + "=" + this.dcsEscape(V, this.re);
};
WebTrends.prototype.dcsEncode = function (S) {
    return (typeof (encodeURIComponent) == "function") ? encodeURIComponent(S) : escape(S);
};
WebTrends.prototype.dcsCreateImage = function (dcsSrc) {
    if (document.images) {
        this.images[this.index] = new Image();
        this.images[this.index].src = dcsSrc;
        this.index++;
    }
    else {
        document.write('<img alt="" border="0" name="DCSIMG" width="1" height="1" src="' + dcsSrc + '">');
    }
};
WebTrends.prototype.dcsMeta = function () {
    var elems;
    if (document.documentElement) {
        elems = document.getElementsByTagName("meta");
    }
    else if (document.all) {
        elems = document.all.tags("meta");
    }
    if (typeof (elems) != "undefined") {
        var length = elems.length;
        for (var i = 0; i < length; i++) {
            var name = elems.item(i).name;
            var content = elems.item(i).content;
            var equiv = elems.item(i).httpEquiv;
            if (name.length > 0) {
                if (name.toUpperCase().indexOf("WT.") == 0) {
                    this.WT[name.substring(3)] = content;
                }
                else if (name.toUpperCase().indexOf("DCSEXT.") == 0) {
                    this.DCSext[name.substring(7)] = content;
                }
                else if (name.toUpperCase().indexOf("DCS.") == 0) {
                    this.DCS[name.substring(4)] = content;
                }
            }
        }
    }
};
WebTrends.prototype.dcsTag = function () {
    if (document.cookie.indexOf("WTLOPTOUT=") != -1) {
        return;
    }
    var WT = this.WT;
    var DCS = this.DCS;
    var DCSext = this.DCSext;
    var i18n = this.i18n;
    var P = "http" + (window.location.protocol.indexOf("https:") == 0 ? "s" : "") + "://" + this.domain + (this.dcsid == "" ? "" : "/" + this.dcsid) + "/dcs.gif?";
    if (i18n) {
        WT.dep = "";
    }
    for (var N in DCS) {
        if (DCS[N] && (typeof DCS[N] != "function")) {
            P += this.dcsA(N, DCS[N]);
        }
    }
    for (N in WT) {
        if (WT[N] && (typeof WT[N] != "function")) {
            P += this.dcsA("WT." + N, WT[N]);
        }
    }
    for (N in DCSext) {
        if (DCSext[N] && (typeof DCSext[N] != "function")) {
            if (i18n) {
                WT.dep = (WT.dep.length == 0) ? N : (WT.dep + ";" + N);
            }
            P += this.dcsA(N, DCSext[N]);
        }
    }
    if (i18n && (WT.dep.length > 0)) {
        P += this.dcsA("WT.dep", WT.dep);
    }
    if (P.length > 2048 && navigator.userAgent.indexOf("MSIE") >= 0) {
        P = P.substring(0, 2040) + "&WT.tu=1";
    }
    this.dcsCreateImage(P);
    this.WT.ad = "";
};
WebTrends.prototype.dcsDebug = function () {
    var t = this;
    var i = t.images[0].src;
    var q = i.indexOf("?");
    var r = i.substring(0, q).split("/");
    var m = "<b>Protocol</b><br><code>" + r[0] + "<br></code>";
    m += "<b>Domain</b><br><code>" + r[2] + "<br></code>";
    m += "<b>Path</b><br><code>/" + r[3] + "/" + r[4] + "<br></code>";
    m += "<b>Query Params</b><code>" + i.substring(q + 1).replace(/&/g, "<br>") + "</code>";
    m += "<br><b>Cookies</b><br><code>" + document.cookie.replace(/;/g, "<br>") + "</code>";
    if (t.w && !t.w.closed) {
        t.w.close();
    }
    t.w = window.open("", "dcsDebug", "width=500,height=650,scrollbars=yes,resizable=yes");
    t.w.document.write(m);
    t.w.focus();
};
WebTrends.prototype.dcsCollect = function () {
    if (this.enabled) {
        this.dcsVar();
        this.dcsMeta();
        this.dcsAdv();
        if (typeof (this.dcsCustom) == "function") {
            this.dcsCustom();
        }
        this.dcsTag();
    }
};

function dcsMultiTrack() {
    if (typeof (_tag) != "undefined") {
        return (_tag.dcsMultiTrack());
    }
}

function dcsDebug() {
    if (typeof (_tag) != "undefined") {
        return (_tag.dcsDebug());
    }
}

Function.prototype.wtbind = function (obj) {
    var method = this;
    var temp = function () {
        return method.apply(obj, arguments);
    };
    return temp;
}


// **************************************************************************
// **************************** Start Online Functions **********************
var ConstWTcu = "cu", ConstWTau = "au";
var WTSourceObjectsArr = [];  // To Save the Objects we already run "CopyWTParams" function on them.

function WTSetEventForObj() {
    try {
        // For data-click Event type
        $("*[data-click]").each(function () {
            var data = $.parseJSON($(this).attr("data-click"));
            var args = GetArgsFromData(data);

            $(this).click(function () {
                WTAddGeneralParams(args); // On Event add the current dynamic parameters.
                GetWTDynamicValue(args, $(this)); // On Event add the dynamic parameters values.
                if (IsConsoleActive()) { console.log(args); } // Use this line to track the events - for debug use.

                setTimeout(dcsMultiTrack.apply(null, args), 25);
                return true;
            });

            // To Copy WebTrends Parameters For one Obj to another.
            CopyWTParams(this, args);
        });


        // For data-onchange Event type (for DropDownList)
        $("*[data-onchange]").each(function () {
            var data = $.parseJSON($(this).attr("data-onchange"));
            var args = GetArgsFromData(data);

            $(this).change(function () {
                WTAddGeneralParams(args);  // On Event add the current dynamic parameters.
                GetWTDynamicValue(args, $(this)); // On Event add the dynamic parameters values.
                if (IsConsoleActive()) { console.log(args); } // Use this line to track the events - for debug use.

                setTimeout(dcsMultiTrack.apply(null, args), 25);
                return true;
            });
        });


        // For data-webtrancedata Event type
        $("*[data-webtrancedata]").each(function () {

            var IsActive = $(this).is(":visible");  // Checks if the element is "visible".
            if (IsActive || this.name == "WTPageLoad") { // WTPageLoad is for the meta tag to be sent on PageLoad
                var data = $.parseJSON($(this).attr("data-webtrancedata"));
                var args = GetArgsFromData(data);
                WTAddGeneralParams(args);  // On Event add the current dynamic parameters.
                GetWTDynamicValue(args, $(this)); // On Event add the dynamic parameters values.
                if (IsConsoleActive()) { console.log(args); } // Use this line to track the events - for debug use.

                setTimeout(dcsMultiTrack.apply(null, args), 25);
                return true;
            }
        });

    } catch (e) {
        // Show error Msg at console
        if (IsConsoleActive()) { console.log("Error at WTSetEventForObj() at webtrends.js, Check JSON attributes structure"); }
    }

}


// Transforms the data we got from the Element json attribute,
// And returns it as WebTrends args.
function GetArgsFromData(data, hasDynamicParam) {
    var args = [];
    args.push("DCS.dcsuri");
    args.push("" + window.location + "");

    var tiParamFlag = false;  // For the Check if there is no ".ti" tag

    $.each(data, function (name, value) {
        var nameFirstThreeChars = name.toString().substring(0, 3);  // Check if we already get WT. prefix from administration
        if (nameFirstThreeChars == "WT.")
            args.push("" + name + "");
        else
            args.push("WT." + name + "");

        if (name == "ti" || name == "WT.ti") tiParamFlag = true;  // ".ti" tag was found

        args.push("" + value + "");
    });

    // If there is no ".ti" tag, we add it with dynamic page title tag text.
    if (!tiParamFlag) {
        args.push("" + "WT.ti" + "");
        args.push("" + document.title.toString() + "");
    }

    return args;
}

// Use This function when You are already inside the Element Click Event
// And You need to send the WebTrends data to server.
function SendElementWTParams(element, thisElement) {
    try {
        var dataClickAttr = $(element).attr("data-click");
        if (dataClickAttr != undefined && dataClickAttr != null && dataClickAttr != "") {
            var data = $.parseJSON(dataClickAttr);
            var args = GetArgsFromData(data);
            WTAddGeneralParams(args); // On Event add the current dynamic parameters.
            if (thisElement != null && thisElement != undefined) {
                GetWTDynamicValue(args, $(element), $(thisElement)); // add dynamic parameters values From two elements.
            }
            else {
                GetWTDynamicValue(args, $(element), $(element)); // On Event add the dynamic parameters values.

            }
            if (IsConsoleActive()) { console.log(args); } // Use this line to track the events - for debug use.

            setTimeout(dcsMultiTrack.apply(null, args), 25);
            return true;
        }
    } catch (e) {
        // Show error Msg at console
        if (IsConsoleActive()) { console.log("Error at SendElementWTParams() at webtrends.js"); }
    }
}

// Checks if "obj" is at the "a" array, returns boolean value.
function WTArrContains(a, obj) {
    var i = a.length;
    while (i--) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}

// Don't use this function! needs improvment.
// To Copy WebTrends Parameters From one Obj to another - OnClick Event.
// The 'WTCopySource' is the Obj which gets his data from Administration.
// The 'WTCopyTarget' is the Obj which gets his data from the 'WTCopySource'.
// You can add more then one'WTCopyTarget' and they all will get the same Parameters.
// Use 'WTCopySource2' and 'WTCopyTarget2' if there is more then one case of Parameters copy at the Page.
function CopyWTParams(SourceObj, args) {
    var WTClassName = SourceObj.className;
    var WTCopySourceIndex = WTClassName.indexOf("WTCopySource");
    if (WTCopySourceIndex >= 0) {
        var WTCopySource = WTClassName.substring(WTCopySourceIndex, WTClassName.length).split(" ")[0];
        var WTCopySourceNum = WTCopySource.substring("WTCopySource".length, WTCopySource.length);
        var WTCopyTargetWithNum = ".WTCopyTarget" + WTCopySourceNum;

        var WTCopySourceFull = "WTCopySource" + WTCopySourceNum;
        var SourceObjectAlreadyCopied = WTArrContains(WTSourceObjectsArr, WTCopySourceFull);
        // If SourceObject is in repeater, run the copy only once.
        if (!SourceObjectAlreadyCopied) {
            WTSourceObjectsArr.push(WTCopySourceFull);

            $(WTCopyTargetWithNum).each(function () {
                // Copy the Params to Target Obj so we can see it at "Developer-ToolBar".
                // We don't realy need it for WebTrends to work.
                this.setAttribute("data-click", $(SourceObj).attr("data-click"));
                // Add the Params to Target Obj click event. This part runs WebTrends at click event.
                $(this).click(function () {
                    setTimeout(dcsMultiTrack.apply(null, args), 25);
                    return true;
                });
            });
        }
    }
}


// Add value from Metadata to args collection
function WTAddParamsByMetadataOrId(args, NameOrId, elemType) {
    try {
        var nameOrId = NameOrId;
        if (elemType == "meta") {
            var metaSelector = "meta[name='" + nameOrId + "']";
            MetaElem = $(metaSelector).get(0);

            var giveDeviceTypeDefaultValue = (MetaElem == undefined && nameOrId == "WT.DeviceTypeFromServer") ? true : false;

            if (MetaElem != undefined || giveDeviceTypeDefaultValue) {
                if (nameOrId == "WT.DeviceTypeFromServer") { nameOrId = "WT.DeviceType"; }  // We need only one WT.DeviceType parameter, so we change it after getting the element
                var MetaNameIndex = $.inArray(nameOrId, args);

                var MetaElemContent = (!giveDeviceTypeDefaultValue) ? "" + MetaElem.content + "" : "Clalit-aps";
                if (MetaNameIndex > -1) {
                    // The parameter name is already Exist from previos event, just change its value.
                    args[MetaNameIndex + 1] = MetaElemContent;
                }
                else {
                    // First event, the parameter name doesn't Exist.
                    args.push("" + nameOrId + "");
                    args.push(MetaElemContent);
                }
            }
        }
        else {
            var MetaElem = document.getElementById(nameOrId);
            if (MetaElem != undefined) {
                var MetaNameIndex = $.inArray("WT." + nameOrId, args);

                if (MetaNameIndex > -1) {
                    // The parameter name is already Exist from previos event, just change its value.
                    args[MetaNameIndex + 1] = "" + MetaElem.value.toString() + "";
                }
                else {
                    // First event, the parameter name doesn't Exist.
                    args.push("" + "WT." + nameOrId + "");
                    args.push("" + MetaElem.value.toString() + "");
                }
            }
        }
    } catch (e) {
        if (IsConsoleActive()) { console.log("Error on webtrends.js at WTAddParamsByMetadataOrId() ", e); }
    }
    return args;
}

// Add Encripted userId, and DeviceType parameters to args collection
function WTAddGeneralParams(args) {
    // If running under application we take the "WT.DeviceTypeFromServer" value and put it in "DeviceType" value
    if ($('meta[name="WT.DeviceTypeFromServer"]').get(0) != undefined || window.isAppMode === true || localStorage.getItem("isAppMode")) {
        WTAddParamsByMetadataOrId(args, "WT.DeviceTypeFromServer", "meta");
    }
    else {
        WTAddParamsByMetadataOrId(args, "WT.DeviceType", "meta");
    }

    WTAddParamsByMetadataOrId(args, ConstWTcu, "input");
    WTAddParamsByMetadataOrId(args, ConstWTau, "input");
    return args;
}


// Add Dynamic parameters values to args collection
function GetWTDynamicValue(args, element, thisElement) {

    try {
        var dataDynaminAttr = element.attr("data-dynamic");
        if (dataDynaminAttr != undefined && dataDynaminAttr != "") {

            var dynamicValueArr, dynamicValueCtrID = "", dynamicValueAttrOrCtrType = "", dynamicNameIdStr = "", dynamicSourceElement;
            var dynamicData = $.parseJSON(element.attr("data-dynamic"));

            $.each(dynamicData, function (dynamicName, dynamicValue) {

                dynamicValueArr = dynamicValue.split("$");
                if (dynamicValueArr[0] == "") dynamicValueArr.splice(0, 1); // Remove the first array object. If starts with $ then [0] will be "" so we don't need it.
                if (dynamicValueArr[dynamicValueArr.length - 1] == "") dynamicValueArr.splice(dynamicValueArr.length - 1, dynamicValueArr.length); // Remove the last array object. If ends with $ then last object will be "" so we don't need it.

                for (var i = 0; i < dynamicValueArr.length - 1; i += 2) {

                    dynamicValueCtrID = dynamicValueArr[i];
                    dynamicValueAttrOrCtrType = (dynamicValueArr.length > i + 1) ? dynamicValueArr[i + 1] : "";
                    dynamicValueAttrOrCtrType = dynamicValueAttrOrCtrType.toLowerCase();

                    if (dynamicValueCtrID != "") {

                        if (dynamicValueCtrID.toLowerCase() == "this") {  // If we need the element that was clicked (or any other WT event).
                            dynamicSourceElement = element;
                        }
                        else {  
                            try {
                                // Gets the element by the given ID at the administration parameter
                                if (dynamicValueCtrID.substring(0, 11) == "thisElement") { //Get element by reletive selector
                                    dynamicSourceElement = evaluate(thisElement, dynamicValueCtrID);
                                    //dynamicSourceElement = new Function([dynamicValueCtrID.split(".")[0]], 'return ' + dynamicValueCtrID)();
                                }
                                else if (dynamicValueCtrID.indexOf("(") == 0) {
                                    //dynamicSourceElement = eval("$" + dynamicValueCtrID);
                                    var dynamicValueSplit = dynamicValueCtrID.split("'");
                                    if (dynamicValueSplit.length > 1) {
                                        dynamicSourceElement = $(dynamicValueSplit[1]);
                                    }
                                }
                                else
                                {
                                    dynamicNameIdStr = "[id$=" + dynamicValueCtrID + "]";
                                    dynamicSourceElement = $(dynamicNameIdStr).first();
                                }
                            } catch (e) {
                                if (IsConsoleActive()) { console.log("OL_Error: WT wrong selector in GetWTDynamicValue", e); }
                            }
                        }

                        switch (dynamicValueAttrOrCtrType) {
                            case "dropdownlist": { dynamicValue = dynamicSourceElement.find(":selected").text(); break; }
                            case "textbox": { dynamicValue = dynamicSourceElement.val(); break; }
                            case "checkbox": { dynamicValue = dynamicSourceElement.attr("checked"); break; }
                            case "span": { dynamicValue = dynamicSourceElement.text(); break; }

                            default: dynamicValue = dynamicSourceElement.attr(dynamicValueAttrOrCtrType);
                        }

                        var dynamicNameIndex = $.inArray("WT." + dynamicName, args);
                        if (dynamicNameIndex > -1) {
                            // The dynamicName is already Exist from previos event, just change its value.
                            args[dynamicNameIndex + 1] = "" + dynamicValue + "";
                        }
                        else {
                            // First event, the dynamicName doesn't Exist.
                            args.push("" + "WT." + dynamicName + "");
                            args.push("" + dynamicValue + "");
                        }

                    }  // end if
                }  // end for
            });   // end $.each
        }  // end if

    } catch (e) { if (IsConsoleActive()) { console.log("GetWTDynamicValue() Error. args=" + args + " element " + element); } }

    return args;
}

// Add dynamic parameters values From two elements.
function GetWTDynamicValueByTwoSources(args, element, thisElement) {
    try {
        var dataDynaminAttr = element.attr("data-dynamic");
        if (dataDynaminAttr != undefined && dataDynaminAttr != "") {

            var dynamicValueArr, dynamicValueCtrID = "", dynamicValueAttrOrCtrType = "", dynamicNameIdStr = "", dynamicSourceElement;
            var dynamicData = $.parseJSON(element.attr("data-dynamic"));

            $.each(dynamicData, function (dynamicName, dynamicValue) {

                dynamicValueArr = dynamicValue.split("$");
                if (dynamicValueArr[0] == "") dynamicValueArr.splice(0, 1); // Remove the first array object. If starts with $ then [0] will be "" so we don't need it.
                if (dynamicValueArr[dynamicValueArr.length - 1] == "") dynamicValueArr.splice(dynamicValueArr.length - 1, dynamicValueArr.length); // Remove the last array object. If ends with $ then last object will be "" so we don't need it.

                for (var i = 0; i < dynamicValueArr.length - 1; i += 2) {

                    dynamicValueCtrID = dynamicValueArr[i];
                    dynamicValueAttrOrCtrType = (dynamicValueArr.length > i + 1) ? dynamicValueArr[i + 1] : "";
                    dynamicValueAttrOrCtrType = dynamicValueAttrOrCtrType.toLowerCase();

                    if (dynamicValueCtrID != "") {

                        if (dynamicValueCtrID == "this" || dynamicValueCtrID == "This") {  // If we need the element that was clicked (or any other WT event).
                            dynamicSourceElement = element;
                        }
                        else {  // Gets the element by the given ID at the administration parameter
                            try {
                                dynamicNameIdStr = "[id$=" + dynamicValueCtrID + "]";
                                dynamicSourceElement = $(dynamicNameIdStr).first();
                            } catch (e) {
                                try {
                                    dynamicSourceElement = eval(dynamicValueCtrID);
                                } catch (e) {
                                    if (IsConsoleActive()) { console.log("Error on webtrends.js at GetWTDynamicValueByTwoSources: ", e); }
                                }
                            }
                        }

                        switch (dynamicValueAttrOrCtrType) {
                            case "dropdownlist": { dynamicValue = dynamicSourceElement.find(":selected").text(); break; }
                            case "textbox": { dynamicValue = dynamicSourceElement.val(); break; }
                            case "checkbox": { dynamicValue = dynamicSourceElement.attr("checked"); break; }
                            case "span": { dynamicValue = dynamicSourceElement.text(); break; }

                            default: dynamicValue = dynamicSourceElement.attr(dynamicValueAttrOrCtrType);
                        }

                        var dynamicNameIndex = $.inArray("WT." + dynamicName, args);
                        if (dynamicNameIndex > -1) {
                            // The dynamicName is already Exist from previos event, just change its value.
                            if (dynamicValue != null && dynamicValue != undefined) {
                                args[dynamicNameIndex + 1] = "" + dynamicValue + "";
                            }
                        }
                        else {
                            // First event, the dynamicName doesn't Exist.
                            args.push("" + "WT." + dynamicName + "");
                            args.push("" + dynamicValue + "");
                        }

                    }  // end if
                }  // end for
            }); // end $.each
        }  // end if

    } catch (e) {

    }
}

// Add one parameter to JSON data, given by parameter name and parameter value
function addSingleDataToJson(jsonData, name, value) {
    var jsonDataWithNew = jsonData;
    try {
        var jsonObj = JSON.parse(jsonDataWithNew);
        jsonObj[name] = value;
        jsonDataWithNew = JSON.stringify(jsonObj);
    } catch (e) {
        if (IsConsoleActive()) { console.log("Error on webtrends.js at addSingleDataToJson: ", e); }
    }
    return jsonDataWithNew;
}
// Add parameters to JSON data
function addDataToJson(jsonData, jsonDataToAdd) {
    var jsonDataWithNew = jsonData;
    try {
        var jsonObj = JSON.parse(jsonDataWithNew);
        var jsonToAddObj = JSON.parse(jsonDataToAdd);
        for (param in jsonToAddObj) {
            jsonObj[param] = jsonToAddObj[param];
        }
        jsonDataWithNew = JSON.stringify(jsonObj);
    } catch (e) {
        if (IsConsoleActive()) { console.log("Error on webtrends.js at addDataToJson: ", e); }
    }
    return jsonDataWithNew;
}

// Checks if Browser has Console at DeveloperToolBar (F12). Returns true if active, false if not.
function IsConsoleActive() {
    if (window.console != undefined) return true;
    return false;
}



// *************************** End Online Functions ***********************
// ************************************************************************



//#region Clalit Functions - work without admin, WT params are on this website
// **************************************************************************

function writeToLocalStorageForDebugWT(wt_args) {
    localStorage.setItem("WT" + Math.floor(Math.random() * 1000000), wt_args);
}
function getLocalStorageForDebugWT() {
    var WTInfoBoxContent = $("<div></div>"), br = "<br />", item;
    for (var i = 0, len = localStorage.length; i < len; ++i) {
        item = localStorage.getItem(localStorage.key(i));
        $(WTInfoBoxContent).append($("<div>" + localStorage.getItem(localStorage.key(i)).toString() + "</div>"));
        $(WTInfoBoxContent).append(br);
    }
    var elem = this;
    elem.win = window.open("", "writeToLocalStorageForDebugWT", "width=750,height=650,scrollbars=yes,resizable=yes");
    elem.win.document.write(WTInfoBoxContent.get(0).innerHTML);
    elem.win.focus();
}

var webTrendsObj = {
    SendElementWTParams: function (jsonDataStr, extraParamsArr) {  // extraParamsArr is optional
        try {
            var args = GetArgsFromData(jsonDataStr);
            if (extraParamsArr != undefined && extraParamsArr != '') {
                extraParamsArrWithPrefix = addWTPrefixToExtraParams(extraParamsArr);
                args = args.concat(extraParamsArrWithPrefix); // Adds more parameters, like dynamic parameters
            }
            if (IsConsoleActive()) { console.log(args); } // Use this line to track the events
            //writeToLocalStorageForDebugWT(args);

            setTimeout(dcsMultiTrack.apply(null, args), 25);
            return true;
        }
        catch (e) {
            if (IsConsoleActive()) { console.log("Error at webtrends.js on webTrendsObj SendElementWTParams func: ", e); }
        }
    },
    
}

function addWTPrefixToExtraParams(extraParamsArr) {
    var paramsArrResult = [], nameFirstThreeChars;
    try {
        for (var i = 0; i < extraParamsArr.length; i++) {
            paramsArrResult.push(extraParamsArr[i]);
            if (i % 2 == 0) {
                nameFirstThreeChars = extraParamsArr[i].toString().substring(0, 3);  // Check if we already get WT. prefix. if not adds it     
                if (nameFirstThreeChars != "WT.") {
                    paramsArrResult[i] = "WT." + extraParamsArr[i];
                }
            }
        }
    } catch (e) {
        if (IsConsoleActive()) { console.log("Error at webtrends.js on webTrendsObj addWTPrefixToExtraParams func: ", e); }
    }

    return paramsArrResult;
}

// **************************************************************************
//#endregion Clalit Functions - work without admin, WT params are on this website



// ************************************************************************
// ******************* Functions for internal Debugging *******************
// ************************************************************************
// Build and shows WTInfoBox. shows WebTrends attributes on the page.
// Wrong attributes (Json format problem) will be presented with Red text color.
// Double attributes will be presented with Purple text color.
// The Link to run The WebTrends WTInfoBox for Debug.
// javascript:WebTrendsTagsChecker();
// javascript:WTChecker();
function WTChecker() {  // Just to have a shorter name for the function.
    WebTrendsTagsChecker();
}
function WebTrendsTagsChecker() {

    var WTInfoBox = document.createElement("div");
    var WTInfoBoxContent = "";

    // For data-click Event type
    $("*[data-click] ,*[data-onchange] ,*[data-webtrancedata] ,*[data-dynamic]").each(function () {

        var WTInfoBoxType = this.tagName;
        var WTInfoBoxId = this.id;
        var WTInfoBoxName = this.name;

        var DataClick = $(this).attr("data-click");
        var DataWebtrancedata = $(this).attr("data-webtrancedata");
        var DataOnchange = $(this).attr("data-onchange");
        var DataDynamic = $(this).attr("data-dynamic");

        var AllEventsAttr = "";
        var WTInfoBoxAttr = "";
        var AttrTypesCounter = 0;
        if (DataClick) { WTInfoBoxAttr = " data-click=" + DataClick; AllEventsAttr = DataClick; AttrTypesCounter++ }
        if (DataWebtrancedata) { WTInfoBoxAttr += " data-webtrancedata=" + DataWebtrancedata; AllEventsAttr += DataWebtrancedata; AttrTypesCounter++ }
        if (DataOnchange) { WTInfoBoxAttr += " data-onchange=" + DataOnchange; AllEventsAttr += DataOnchange; AttrTypesCounter++ }
        if (DataDynamic) { WTInfoBoxAttr += " data-dynamic=" + DataDynamic; AllEventsAttr += DataDynamic; AttrTypesCounter++ }

        var AttrStyle = "";
        var AttrErrorMsg = "";
        try {
            var data = $.parseJSON(AllEventsAttr);
        } catch (e) {
            if (AttrTypesCounter < 2) {
                AttrStyle = "color:red";
                AttrErrorMsg = "Json structure problem.";
            }
            else {
                AttrStyle = "color:#9933FF";
                AttrErrorMsg = "Parameters with more then one event type, Check Administration parameters.";
            }
        }

        WTInfoBoxContent = WTInfoBoxContent = "<br /><div>" + "Element Type = " + WTInfoBoxType + "</div>";
        if (WTInfoBoxId != "") { WTInfoBoxContent += "<div>" + "Id = " + WTInfoBoxId + "</div>" }
        if (WTInfoBoxName != "" && WTInfoBoxName != undefined) { WTInfoBoxContent += "<div>" + "Name = " + WTInfoBoxName + "</div>" }
        WTInfoBoxContent += "<div style=" + AttrStyle + ">" + WTInfoBoxAttr + "</div>";
        if (AttrErrorMsg != "") { WTInfoBoxContent += "<div style=" + AttrStyle + ">" + "Error Type = " + AttrErrorMsg + "</div>"; }
        $("<div>" + WTInfoBoxContent + "</div>").appendTo(WTInfoBox);

        var elem = this;
        elem.win = window.open("", "WebTrendsTagsChecker", "width=750,height=650,scrollbars=yes,resizable=yes");
        elem.win.document.write(WTInfoBoxContent);
        elem.win.focus();

    });

}

// ************************************************************************
// ***************** End Functions for internal Debugging *****************
// ************************************************************************