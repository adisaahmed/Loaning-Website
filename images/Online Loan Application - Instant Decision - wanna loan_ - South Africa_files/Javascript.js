
var mouseX = 0;
var mouseY = 0;
var isExplorer = false;
var isOpera = false;
var isFireFox = false;
var isSafari = false;
var isNetscape = false;
var isMozilla = false;
var isOther = false;

//Set the browser variables
setBrowser();

//Set the mouse XY position
document.onmousemove = setMouseXY;



//This sets the Global value to show which browser is used
function setBrowser() {
    var agt = navigator.userAgent.toLowerCase();
    if (agt.indexOf("opera") != -1) { isOpera = true; }
    if (agt.indexOf("firefox") != -1) { isFireFox = true; }
    if (agt.indexOf("safari") != -1) { isSafari = true; }
    if (agt.indexOf("msie") != -1) { isExplorer = true; }
    if (agt.indexOf("netscape") != -1) { isNetscape = true; }
    if (agt.indexOf("mozilla/5.0") != -1) { isMozilla = true; }
    if (agt.indexOf('\/') != -1) {
        if (agt.substr(0, agt.indexOf('\/')) != 'mozilla') {
            isOther = true;
        }
        else
            isNetScape = true;
    }
    else if (agt.indexOf(' ') != -1)
        isOther = true;
    else
        isOther = true;
}




// Maximize browser window on client
function maximizePage() {
    top.window.moveTo(0, 0);
    if (document.all) {
        top.window.resizeTo(screen.availWidth, screen.availHeight);
    }
    else if (document.layers || document.getElementById) {
        if (top.window.outerHeight < screen.availHeight || top.window.outerWidth < screen.availWidth) {
            top.window.outerHeight = screen.availHeight;
            top.window.outerWidth = screen.availWidth;
        }
    }
}




// Sets the global variables's value for mouse XY position
function setMouseXY(e) {
    if (isExplorer) {
        mouseX = event.x;
        mouseY = event.y;
    }
    else {
        if (e.clientX || e.clientY) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }
        else {
            if (e.pageX || e.pageY) {
                mouseX = e.pageX;
                mouseY = e.pageY;
            }
        }
    }
}




// Click button if enter is pressed
function submitOnEnter(idToSubmit, e) {
    var isAnEnter = window.event == null ? e.keyCode == 13 : window.event.keyCode == 13;

    if (event.which || event.keyCode) {
        if ((event.which == 13) || (event.keyCode == 13)) {
            document.getElementById(idToSubmit).click();
            return false;
        }
    }
    else {
        return true;
    }
}




// Sets the height and width of specified obj to max width and height
function Resize(obj, FormObj, heightFactor) {
    if (document.getElementById(obj) != null && FormObj != null) {
        var height = FormObj.clientHeight - heightFactor;

        var theobj = document.getElementById(obj);
        theobj.style.height = height + "px";
    }
}




// Sets the height and width of specified obj to max width and height
function ResizeObj(obj, heightFactor) {
    if (document.getElementById(obj) != null) {
        var height = getDocumentHeight() - findPosY(obj) - heightFactor;

        var theobj = document.getElementById(obj);
        theobj.style.height = height + "px";
    }
}




// Set the XY co-ordinates for the object so it will appear in middle of the screen.
function SetXYOrigin(ObjName) {
    if (document.getElementById(ObjName) != null) {
        var IObj = document.getElementById(ObjName);

        var X = screen.availWidth / 2;
        X = X - (IObj.style.width.replace("px", "") * 1 / 2);
        var Y = screen.availHeight / 2;
        Y = Y - (IObj.style.height.replace("px", "") * 1);

        IObj.style.left = X + "px";
        IObj.style.top = Y + "px";
    }
}




// Set the XY co-ordinates for the object so it will appear in middle of the screen.                                                             */
function SetXYOrigin(ObjName, divName) {
    if (document.getElementById(ObjName) != null) {
        var IObj = document.getElementById(ObjName);

        var X = screen.availWidth / 2;
        X = X - (IObj.offsetWidth * 1 / 2);
        var Y = screen.availHeight / 2;
        Y = Y - (IObj.offsetHeight * 1);

        //Adjust to cater for div's borders
        X = X - 40;
        Y = Y - 40;
        //IObj.style.left = X + "px";
        //IObj.style.top = Y + "px";

        document.getElementById(divName).style.left = X + "px";
        document.getElementById(divName).style.top = Y + "px";
    }
}




// Set the XY co-ordinates for the object so it will appear in middle of the screen.
// If a negative number is passed as the Y, then the object Y will be centered to the screen.
function SetCustomXYOrigin(ObjName, X, Y) {
    if (document.getElementById(ObjName) != null) {
        var IObj = document.getElementById(ObjName);
        IObj.style.top = Y;

        if (X > 0) {
            IObj.style.left = X;
        }
        else {
            X = screen.availWidth / 2;
            X = X - (IObj.style.width.replace("px", "") * 1 / 2);
            IObj.style.left = X;
        }
    }
}




//
function setupPopup(objId, X, Y) {
    var obj = document.getElementById(objId);

    if (obj != null) {
        if (obj.style.width.replace("px", "") > screen.availWidth - X) {
            obj.style.width = screen.availWidth - 6;
            obj.style.overflow = "auto";
            obj.style.left = 3 + "px";
        }
        else {
            obj.style.left = X + "px";
        }

        if (obj.style.height.replace("px", "") > screen.availHeight - Y) {
            obj.style.height = screen.availHeight - 6;
            obj.style.overflow = "auto";
            obj.style.top = 3 + "px";
        }
        else {
            obj.style.top = Y + "px";
        }
    }
}




// Standard javascript obj set value
function setObjValue(objToSetId, objValue) {
    var obj = document.getElementById(objToSetId);

    if (obj != null) {
        obj.value = objValue;
    }
}





// Change the z index of an object
function moveObjZIndex(objToFrontId, zIndex) {
    var obj = document.getElementById(objToFrontId);

    if (obj != null) {
        obj.style.zIndex = zIndex;
    }
}




// Get Control Width
function getObjWidth(objId) {
    return document.getElementById(objId).style.width.replace("px", "");
}




// Get Control Height
function getObjHeight(objId) {
    return document.getElementById(objId).style.height.replace("px", "");
}




// Formatting to include comma delimiting
function FormatCommaDelimit(amount) {
    if (amount < 0) { minus = "-"; }
    else { minus = ""; }

    amount = amount + "";

    var delimiter = ","; // replace comma if desired
    var a = amount.split('.', 2);
    var d = a[1];
    var i = parseInt(a[0]);
    i = Math.abs(i);
    var n = new String(i);
    while (n.length > 3) {
        var nn = n.substr(n.length - 3);
        a.unshift(nn);
        n = n.substr(0, n.length - 3);
    }
    if (n.length > 0) { a.unshift(n); }
    n = a.join(delimiter);
    if (d.length < 1) { amount = n; }
    else { amount = n + '.' + d; }
    amount = minus + amount;
    return amount;
}




// 
function initNumeric(oTextBox) {
    if (oTextBox.value * 1 == 0) {
        oTextBox.value = "";
    }
}




// Function that rounds a value to 2 decimal places
function fRound(dValue) {
    return Math.round(dValue * Math.pow(10, 2)) / Math.pow(10, 2);
}




// Function to FORMAT to 2 decimals
function fFormatMoney(dValue, ShowComma) {
    var ReturnValue = "";
    var TempValue = "";
    var j = 0;
    var AddComma = 0;

    if (dValue > 0) {
        var iRemainder = dValue - Math.floor(dValue);

        /* FORMAT decimals */
        if (iRemainder == 0)
        { dValue = dValue + '.00'; }
        else {
            iRemainder = (dValue * 10) - Math.floor(dValue * 10);
            if (iRemainder == 0)
            { dValue = dValue + '0'; }
        }

        /* FORMAT WITH COMMA SEPERATOR*/
        if (ShowComma == 1) {
            TempValue = dValue + '';
            for (var i = TempValue.length; i >= 0; i--) {
                if (TempValue.charAt(i) == ".") {
                    AddComma = 1;
                    j = -1;
                }

                if ((j == 3) && (AddComma == 1)) {
                    ReturnValue = "," + ReturnValue;
                    j = 0;
                }

                ReturnValue = TempValue.charAt(i) + ReturnValue;
                j = j + 1;
            }
        }
        else
        { ReturnValue = dValue; }

        return ReturnValue;
    }
    else
    { return "0.00"; }
}




// Test if Value of object is an integer
function isInteger(oTextBox, defaultValue) {
    var sValue = oTextBox.value;
    var sAllowedChars = '0123456789';
    var sReturnValue = '';

    for (var i = 0; i < sValue.length; i++) {
        if (sAllowedChars.indexOf(sValue.charAt(i)) >= 0) {
            sReturnValue = sReturnValue + sValue.charAt(i);
        }
    }
    if ((sReturnValue * 1) == 0)
    { oTextBox.value = defaultValue; }
    else
    { oTextBox.value = sReturnValue * 1; }
}




// Function that rounds a value to 2 decimal places
function fRound2Dec(dValue) {
    return Math.round(dValue * Math.pow(10, 2)) / Math.pow(10, 2);
}




// Function that validates the input and checks if its an unsigned INT
function isUInt(e) {
    if (e.charCode == null) {
        //Internet Explorer has no charCode in event - perform this test
        return e.keyCode >= 48 && e.keyCode <= 57 ? true : false;
    }
    else {
        //Other Browsers have charCode in event - perform this test
        return e.charCode ? (e.charCode >= 48 && e.charCode <= 57 ? true : false) :
                (e.keyCode == 8 || e.keyCode == 9 || e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 46 ? true : false);
    }
}




// Function that validates the input and checks if its numeric
// -function will allow 1 decimal point if hasDecimal true
function validateInputIsNumeric(e, hasDecimal) {
  
    var unicode = e.charCode ? e.charCode : e.keyCode;
    //var actualkey=String.fromCharCode(unicode);
    var allowkey = true;
    var text = e.srcElement.value;
    var decimalPointLoc = text.indexOf('.');

    //unicode: 8 = backspace
    //         9 = tab
    //alert(unicode);		
    if (unicode != 8 && unicode != 9) {
        //These are all strangely(or not so strangely) a .
        if ((unicode == 46 || unicode == 110 || unicode == 190) && hasDecimal) {
            //If there is already a . then dont allow it
            if (decimalPointLoc > 0 || text.length == 0) {
                allowkey = false;
            }
        }
        else {
            //This is the range of numbers at top of keyboard and on numpad
            if (unicode < 48 || (unicode > 57 && unicode < 95) || unicode > 106) {
                allowkey = false;
            }
        }
    }
    return allowkey;
}

// Find X-Pos of object
function findPosX(objID) {
    var curleft = 0;
    var obj = document.getElementById(objID);

    if (obj.offsetParent) {
        while (1) {
            curleft += obj.offsetLeft;
            if (!obj.offsetParent)
                break;
            obj = obj.offsetParent;
        }
    } else if (obj.x) {
        curleft += obj.x;
    }

    return curleft;
}




// Find Y-Pos of object
function findPosY(objID) {
    var curtop = 0;
    var obj = document.getElementById(objID);

    if (obj.offsetParent) {
        while (1) {
            curtop += obj.offsetTop;
            if (!obj.offsetParent)
                break;
            obj = obj.offsetParent;
        }
    }
    else if (obj.y) {
        curtop += obj.y;
    }

    return curtop;
}




///A modified version of the alertSize function that only gets back the document height.
function getDocumentHeight() {
    var myHeight = 0;
    if (typeof (window.innerWidth) == 'number') {
        //Non-IE
        myHeight = window.innerHeight;
    } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        //IE 6+ in 'standards compliant mode'
        myHeight = document.documentElement.clientHeight;
    } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
        //IE 4 compatible
        myHeight = document.body.clientHeight;
    }

    if (myHeight == 0) {
        myHeight = screen.availHeight;
    }

    return myHeight;
}




// Centre the DIV
function deadCenterDiv(divid) {
    var scrolledX = 0, scrolledY = 0;
    if (self.pageYOffset) {
        scrolledX = self.pageXOffset;
        scrolledY = self.pageYOffset;
    } else if (document.documentElement && document.documentElement.scrolltop) {
        scrolledX = document.documentElement.scrollLeft;
        scrolledY = document.documentElement.scrolltop;
    } else if (document.body) {
        scrolledX = document.body.scrollLeft;
        scrolledY = document.body.scrollTop;
    }

    // Next, determine the coordinates of the center of browser's window

    var centerX, centerY;
    if (self.innerHeight) {
        centerX = self.innerWidth;
        centerY = self.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) {
        centerX = document.documentElement.clientWidth;
        centerY = document.documentElement.clientHeight;
    } else if (document.body) {
        centerX = document.body.clientWidth;
        centerY = document.body.clientHeight;
    }

    // The initial width and height of the div can be set in the
    // style sheet with display:none; divid is passed as an argument to // the function
    var obj = document.getElementById(divid);
    // Xwidth is the width of the div, Yheight is the height of the
    // div passed as arguments to the function:
    var leftoffset = scrolledX + (centerX - obj.offsetWidth) / 2;
    var topOffset = scrolledY + (centerY - obj.offsetHeight) / 2;
    var r = obj.style;
    r.position = 'absolute';
    r.top = topOffset + 'px';
    r.left = leftoffset + 'px';
    r.visibility = "visible";
}




/*-------------------------------------------------------------------------*/
/* Highlight the input control */
/*-------------------------------------------------------------------------*/
function selCtrl(ctrl, highlight) {
    if (highlight == 1) {
        ctrl.select();
    }
    ctrl.style.backgroundColor = "#FFD5D5";
}




/*-------------------------------------------------------------------------*/
/* Highlight the input control */
/*-------------------------------------------------------------------------*/
function unselCtrl(ctrl) {
    ctrl.style.backgroundColor = "WHITE";
}




function validateDecimalInput(e, amountOfDecimals)
/*-------------------------------------------------------------------------*/
/* Function that validates the input and checks if its numeric             */
/* -function will allow 1 decimal point if hasDecimal true                 */
/*-------------------------------------------------------------------------*/
{
    var unicode = e.charCode ? e.charCode : e.keyCode;
    //var actualkey=String.fromCharCode(unicode);
    var allowkey = true;
    var text = e.srcElement.value;
    var decimalPointLoc = text.indexOf('.');

    if (decimalPointLoc < 0) {
        decimalPointLoc = 0;
    }

    //unicode: 8 = backspace
    //         9 = tab
    //alert(unicode);		
    if (unicode != 8 && unicode != 9) {
        //These are all strangely(or not so strangely) a .
        if ((unicode == 46 || unicode == 110 || unicode == 190) && (amountOfDecimals > 0)) {
            //If there is already a . then dont allow it
            if (decimalPointLoc > 0 || text.length == 0) {
                allowkey = false;
            }
        }
        else {
            //This is the range of numbers at top of keyboard and on numpad
            if (unicode < 48 || (unicode > 57 && unicode < 95) || unicode > 106) {
                allowkey = false;
            }
            else {
                //Check that the amount of decimals is allowed
                if (decimalPointLoc > 0) {
                    var decimalText = text.substring(decimalPointLoc, text.length);

                    if (decimalText.length > amountOfDecimals) {
                        allowkey = false;
                    }
                }
            }
        }
    }
    return allowkey;
}

//function ValidateRSAIDNo(ctrlID, ctrlDOB, ctrlGender, ctrlAge) {
//    var varOdd = "";
//    var varEven = 0;
//    var varOddSum = 0;
//    var VarSum = 0;
//    var varLastDigit = "";
//    var varCheckDigit = "";
//    var tbID = document.getElementById(ctrlID).value;
//    var ix = 0;
//    var i = 1;
//    var c;
//    var val = "";
//    var val2 = "";
//    var iVal2 = 0;
//    var vEven = "";
//    var iEven = 0;
//    var ii = "";
//    varCheckDigit = varLastDigit = tbID.substring(13, 0);
//    //Loop through the number and add only Even Numbers

//    varCheckDigit = tbID.substring(12, 13);

//    val = tbID.substring(1, 2);
//    val += tbID.substring(3, 4);
//    val += tbID.substring(5, 6);
//    val += tbID.substring(7, 8);
//    val += tbID.substring(9, 10);
//    val += tbID.substring(11, 12);

//    if (val.substring(0, 1) == '0') {
//        val = val.substring(1, val.length);
//        if (val.substring(0, 1) == '0') {
//            val = val.substring(1, val.length);
//            if (val.substring(0, 1) == '0') {
//                val = val.substring(1, val.length);
//                if (val.substring(0, 1) == '0') {
//                    val = val.substring(1, val.length);
//                }
//            }
//        }
//    }

//    vEven = String(parseInt(val) * 2);

//    if (vEven.length == 4) {
//        iEven = parseInt(vEven.substring(0, 1));
//        iEven += parseInt(vEven.substring(1, 2));
//        iEven += parseInt(vEven.substring(2, 3));
//        iEven += parseInt(vEven.substring(3, 4));
//    }


//    if (vEven.length == 5) {
//        iEven = parseInt(vEven.substring(0, 1));
//        iEven += parseInt(vEven.substring(1, 2));
//        iEven += parseInt(vEven.substring(2, 3));
//        iEven += parseInt(vEven.substring(3, 4));
//        iEven += parseInt(vEven.substring(4, 5));

//    }

//    if (vEven.length == 6) {
//        iEven = parseInt(vEven.substring(0, 1));
//        iEven += parseInt(vEven.substring(1, 2));
//        iEven += parseInt(vEven.substring(2, 3));
//        iEven += parseInt(vEven.substring(3, 4));
//        iEven += parseInt(vEven.substring(4, 5));
//        iEven += parseInt(vEven.substring(5, 6));
//    }

//    if (vEven.length == 7) {
//        iEven = parseInt(vEven.substring(0, 1));
//        iEven += parseInt(vEven.substring(1, 2));
//        iEven += parseInt(vEven.substring(2, 3));
//        iEven += parseInt(vEven.substring(3, 4));
//        iEven += parseInt(vEven.substring(4, 5));
//        iEven += parseInt(vEven.substring(5, 6));
//        iEven += parseInt(vEven.substring(6, 7));
//    }

//    iVal2 = parseInt(tbID.substring(0, 1));

//    iVal2 += parseInt(tbID.substring(2, 3));

//    iVal2 += parseInt(tbID.substring(4, 5));

//    iVal2 += parseInt(tbID.substring(6, 7));

//    iVal2 += parseInt(tbID.substring(8, 9));

//    iVal2 += parseInt(tbID.substring(10, 11));

//    var digit = String(iVal2 + iEven).substring(1, 2);

//    ii = String(10 - (parseInt(digit)));

//    if (ii == 10) {
//        ii = 0;
//    }


//    if (ii != varCheckDigit) {
//        document.getElementById(ctrlID).style.backgroundColor = "#FFD5D5";
//    }
//    else {

//        document.getElementById(ctrlDOB).innerHTML = '19' + tbID.substring(0, 2) + '/' + tbID.substring(2, 4) + '/' + tbID.substring(4, 6);

//        document.getElementById(ctrlID).style.backgroundColor = "#FFFFFF";

//        var myDate = new Date();
//        myDate.setDate(myDate.getDate());

//        var yy = myDate.getYear();
//        var mm = myDate.getMonth();
//        var dd = myDate.getDate();
//        var year = (yy < 1000) ? yy + 1900 : yy;

//        var Age = parseInt(year) - parseInt('19' + tbID.substring(0, 2));

//        if ((tbID.substring(2, 4) - 1) > mm) { Age = Age - 1 }  // next birthday not yet reached
//        else if ((tbID.substring(2, 4) - 1) == mm && dd < tbID.substring(4, 6)) { Age = Age - 1 }

//        document.getElementById(ctrlAge).innerHTML = Age;

//        if (parseInt(tbID.substring(6, 7)) < 5) {
//            document.getElementById(ctrlGender).innerHTML = "Female";
//        }
//        else {
//            document.getElementById(ctrlGender).innerHTML = "Male";
//        }
//    }
//}

function checkNo(control) {
    var cvalue = document.getElementById(control).value;

    cvalue = cvalue.replace(/ /g, '');

    var iChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()+=-[]\\\';,./{}|\":<>?";

    var retval = "0";

    if (cvalue.value == "") {
        document.getElementById(control).style.backgroundColor = "#FFD5D5";
    }
    else {
        for (var i = 0; i < cvalue.length; i++) {
            if (iChars.indexOf(cvalue.charAt(i)) != -1) {
                document.getElementById(control).style.backgroundColor = "#FFFFFF";
            }
        }
    }

    if (cvalue.length != 10) {
        document.getElementById(control).style.backgroundColor = "#FFD5D5";
    }
    else { document.getElementById(control).style.backgroundColor = "#FFFFFF"; }

}

function checkMoney(control) {
    var cvalue = document.getElementById(control).value;

    cvalue = cvalue.replace(/ /g, '');
    var regexp = "^\d*([.]\d{2})?$";

    //First check if it is an int
    if (parseInt(cvalue) || cvalue == 0) {
        //Convert to Decimal
        cvalue = parseFloat(cvalue).toFixed(2);
        document.getElementById(control).innerHTML = cvalue;
        document.getElementById(control).style.backgroundColor = "#FFFFFF";
    }
    else {
        if (cvalue.match(regexp)) {
            document.getElementById(control).style.backgroundColor = "#FFFFFF";
        }
        else
            document.getElementById(control).style.backgroundColor = "#FFD5D5";
    }

}

//function validateEmail(control, lbl) {

//    var cvalue = document.getElementById(control).value;
//    var atpos = cvalue.indexOf("@");
//    var dotpos = cvalue.lastIndexOf(".");

//    var iChars = "!#$%^&*()+=[]\\\';,/{}|\":<>?";
//    var retval = "0";
//    for (var i = 0; i < cvalue.length; i++) {
//        if (iChars.indexOf(cvalue.charAt(i)) != -1) {
//            retval = "1";
//        }
//    }

//    if (retval != "1") {
//        if (cvalue.value != "") {
//            if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= cvalue.length) {

//                document.getElementById(control).style.backgroundColor = "#FFD5D5";
//            }
//            else {
//                document.getElementById(control).style.backgroundColor = "#FFFFFF";
//                if (control == "txtEmailConfirm") {

//                    if (cvalue == document.getElementById("txtEmail").value) {
//                        document.getElementById(control).style.backgroundColor = "#FFFFFF";
//                        document.getElementById(lbl).innerHTML = cvalue;
//                    }
//                    else {
//                        document.getElementById(control).style.backgroundColor = "#FFD5D5";

//                    }
//                }
//            }
//        }
//        else {
//            document.getElementById(control).style.backgroundColor = "#FFD5D5";
//        }
//    }
//    else {
//        document.getElementById(control).style.backgroundColor = "#FFD5D5";
//    }
//}

function disableBtn(btnID, newText) {
    var btn = document.getElementById(btnID);
    setTimeout("setImage('" + btnID + "')", 10);
    btn.disabled = true;
}

function setImage(btnID) {
    var btn = document.getElementById(btnID);
    btn.style.background = 'url(images/Loading_blocks_altered.gif)';
    btn.style.backgroundRepeat = 'no-repeat';
    
}