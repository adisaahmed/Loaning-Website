
function ValidateEmail(cvalue) {

    var atpos = cvalue.indexOf("@");
    var dotpos = cvalue.lastIndexOf(".");

    var iChars = "!#$%^&*()+=[]\\\';,/{}|\":<>?";
    var retval = "0";
    for (var i = 0; i < cvalue.length; i++) {
        if (iChars.indexOf(cvalue.charAt(i)) != -1) {
            retval = "1";
        }
    }

    var success = false;

    if (retval != "1") {
        if (cvalue.value != "") {
            if (!(atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= cvalue.length)) {

                success = true;
            }
        }
    }

    return success;
}

function ValidatePassword(cvalue) {
    return true; //validation for a strong password
}

//function ValidateRSAIDNo(ctrlID, ctrlDOB, ctrlGender, ctrlAge) {
function ValidateRSAIDNo(tbID) {
    var varOdd = "";
    var varEven = 0;
    var varOddSum = 0;
    var VarSum = 0;
    var varLastDigit = "";
    var varCheckDigit = "";
    var ix = 0;
    var i = 1;
    var c;
    var val = "";
    var val2 = "";
    var iVal2 = 0;
    var vEven = "";
    var iEven = 0;
    var ii = "";
    varCheckDigit = varLastDigit = tbID.substring(13, 0);
    //Loop through the number and add only Even Numbers

    varCheckDigit = tbID.substring(12, 13);

    val = tbID.substring(1, 2);
    val += tbID.substring(3, 4);
    val += tbID.substring(5, 6);
    val += tbID.substring(7, 8);
    val += tbID.substring(9, 10);
    val += tbID.substring(11, 12);

    if (val.substring(0, 1) == '0') {
        val = val.substring(1, val.length);
        if (val.substring(0, 1) == '0') {
            val = val.substring(1, val.length);
            if (val.substring(0, 1) == '0') {
                val = val.substring(1, val.length);
                if (val.substring(0, 1) == '0') {
                    val = val.substring(1, val.length);
                }
            }
        }
    }

    vEven = String(parseInt(val) * 2);

    if (vEven.length == 2) {
        iEven = parseInt(vEven.substring(0, 1));
        iEven += parseInt(vEven.substring(1, 2));
    }

    if (vEven.length == 3) {
        iEven = parseInt(vEven.substring(0, 1));
        iEven += parseInt(vEven.substring(1, 2));
        iEven += parseInt(vEven.substring(2, 3));
    }

    if (vEven.length == 4) {
        iEven = parseInt(vEven.substring(0, 1));
        iEven += parseInt(vEven.substring(1, 2));
        iEven += parseInt(vEven.substring(2, 3));
        iEven += parseInt(vEven.substring(3, 4));
    }


    if (vEven.length == 5) {
        iEven = parseInt(vEven.substring(0, 1));
        iEven += parseInt(vEven.substring(1, 2));
        iEven += parseInt(vEven.substring(2, 3));
        iEven += parseInt(vEven.substring(3, 4));
        iEven += parseInt(vEven.substring(4, 5));

    }

    if (vEven.length == 6) {
        iEven = parseInt(vEven.substring(0, 1));
        iEven += parseInt(vEven.substring(1, 2));
        iEven += parseInt(vEven.substring(2, 3));
        iEven += parseInt(vEven.substring(3, 4));
        iEven += parseInt(vEven.substring(4, 5));
        iEven += parseInt(vEven.substring(5, 6));
    }

    if (vEven.length == 7) {
        iEven = parseInt(vEven.substring(0, 1));
        iEven += parseInt(vEven.substring(1, 2));
        iEven += parseInt(vEven.substring(2, 3));
        iEven += parseInt(vEven.substring(3, 4));
        iEven += parseInt(vEven.substring(4, 5));
        iEven += parseInt(vEven.substring(5, 6));
        iEven += parseInt(vEven.substring(6, 7));
    }

    iVal2 = parseInt(tbID.substring(0, 1));

    iVal2 += parseInt(tbID.substring(2, 3));

    iVal2 += parseInt(tbID.substring(4, 5));

    iVal2 += parseInt(tbID.substring(6, 7));

    iVal2 += parseInt(tbID.substring(8, 9));

    iVal2 += parseInt(tbID.substring(10, 11));

    var digit = String(iVal2 + iEven).substring(1, 2);

    ii = String(10 - (parseInt(digit)));

    if (ii == 10) {
        ii = 0;
    }


    return (ii == varCheckDigit);
}

function ValidateTelephone(cvalue) {

    cvalue = cvalue.replace(/ /g, '');
    if (cvalue.length != 10) return false;

    return ValidateNumber(cvalue);
}

function ValidateNumber(cvalue) {
    var iChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()+=-[]\\\';,./{}|\":<>?";

    var success = false;

    if (cvalue != "") {
        success = true;
        for (var i = 0; i < cvalue.length; i++) {
            if (iChars.indexOf(cvalue.charAt(i)) != -1) {
                success = false;
                break;
            }
        }
    }

    return success;
}

function ValidateMoney(cvalue) {
    var success = true;
    cvalue = cvalue.replace(/ /g, '');
    var regexp = "^\d*([.]\d{2})?$";

    if (!(parseInt(cvalue) || cvalue == 0)) {
        if (!cvalue.match(regexp))
            return false;
    }

    return true;
}