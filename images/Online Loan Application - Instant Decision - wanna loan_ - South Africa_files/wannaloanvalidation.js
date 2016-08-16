
$(document).ready(function() {

    $('#btnApply1Continue').click(function() {
        if ($('#loader').css('display') == 'none') {

            $('#loader').show();
            $(this).hide();

            setTimeout(function() { $('#btnApply1Continue').click(); }, 2000);

            return false;
        }
    });

    $('#btnApply2Continue').click(function() {
        if ($('#loader').css('display') == 'none') {

            $('#loader').show();
            $(this).hide();

            setTimeout(function() { $('#btnApply2Continue').click(); }, 1000);

            return false;
        }
    });
});

function showLoader() {

    //*** Reload the image for IE ***
    document.getElementById('imgLoad').src = 'images/ajax-loader (5).gif';
    //*** Let's make the image visible ***
    document.getElementById('imgLoad').style.visibility = 'visible';

}

$(document).ready(function() {
    $('input:text').each(function() {
        $(this).focus(function() {
            FocusField(this, true);
        });

        $(this).blur(function() {
            FocusField(this, false);
            FlagField(this, false);
        });
    });
});

$(document).ready(function() {
    $("select[applydefault]").each(function() {
        $(this).focus(function() {
            FocusField(this, true);
        });

        $(this).focusout(function() {
            FocusField(this, false);
            if ($(this).val() == "-1") $(this).addClass('defaultOption');
            else $(this).removeClass('defaultOption');

            if ($(this).val() != "-1")
                FlagField(this, false);
        });

        if ($(this).val() == "-1") $(this).addClass('defaultOption');
        else $(this).removeClass('defaultOption');

        //$(this).focusout();
    });
});

$(document).ready(function() {
    $("#txtPassword").focus(function() {
        FocusField(this, true);
    });
    $("#txtConfirmPassword").focus(function() {
        FocusField(this, true);
    });

    $("#txtPassword").blur(function() {
        FlagField(this, false);
        FocusField(this, false);
    });
    $("#txtConfirmPassword").blur(function() {
        FlagField(this, false);
        FocusField(this, false);
    });
});

function CheckID(id) {
    $.ajax({ url: "Exists.aspx?id=" + id, success: function(result) {
        if (result == "1")
            $('#divExpress').show();
    }
    });
}

////Specific Validation Apply1
$(document).ready(
function() {
    $('#txtID').blur(
    function() {
        $('#divExpress').hide();
        var success = ValidateMethod(this, ValidateRSAIDNo);
        if (success && $(this).val() != '')
            CheckID($(this).val());

        //TODO: moce calculations of dob, age etc to a function
        var dob = '';
        var age = '';
        var gender = '';
        if (success && $('#txtID').val() != '') {
            var id = $(this).val();

            dob = '19' + id.substring(0, 2) + '/' + id.substring(2, 4) + '/' + id.substring(4, 6);

            var myDate = new Date();
            myDate.setDate(myDate.getDate());

            var yy = myDate.getYear();
            var mm = myDate.getMonth();
            var dd = myDate.getDate();
            var year = (yy < 1000) ? yy + 1900 : yy;

            age = parseInt(year) - parseInt('19' + id.substring(0, 2));

            if ((id.substring(2, 4) - 1) > mm) { age = age - 1 }  // next birthday not yet reached
            else if ((id.substring(2, 4) - 1) == mm && dd < id.substring(4, 6)) { age = age - 1 }

            if (parseInt(id.substring(6, 7)) < 5)
                gender = "Female";
            else
                gender = "Male";
        }
        $("#lblDOB").text(dob);
        $("#lblAge").text(age);
        $("#lblGender").text(gender);
    });
});



$(document).ready(
function() {
    $('#txtEmail').blur(
    function() {
        var success = ValidateMethod(this, ValidateEmail);
        ValidateConfirmEmail();

        if (success)
            $("#lblEmail").text($(this).val());
        else
            $("#lblEmail").text('');
    });
});

$(document).ready(
function() {
    $('#txtEmailConfirm').blur(
    function() {
        ValidateConfirmEmail();
    });
});

function ValidateConfirmEmail() {
    var success = $("#txtEmailConfirm").val() == $("#txtEmail").val();

    FlagField($("#txtEmailConfirm"), !success);
}

$(document).ready(function() {
    $('#txtCell').blur(function() {
        ValidateMethod(this, ValidateTelephone);
        ValidateWorkTelephone();
    });
});

$(document).ready(function() {
    $('#txtWorkTel').blur(function() {
        ValidateWorkTelephone();
    });
});

function ValidateWorkTelephone() {

    var success = ValidateMethod($('#txtWorkTel'), ValidateTelephone);
    var reg = /^((?:\+27|27)|0)(61|60|71|72|73|74|76|78|79|81|82|83|84)(\d{7})$/;
    var regex = new RegExp(reg);

    if (!success)
        $('#divWork').attr('error', 'Please enter a valid (number only) Work Telephone no eg 0111234567. No mobile numbers.');

    else if ($('#txtWorkTel').val() != '') {
        var theSame = $('#txtWorkTel').val().replace(/ /g, '') == $('#txtCell').val().replace(/ /g, '');
        FlagField($('#txtWorkTel'), theSame);
        if (theSame)
            $('#divWork').attr('error', 'Your Work number and Mobile number cannot be the same.');

        if (success && !theSame) {
            var isMobile = regex.test($('#txtWorkTel').val());
            FlagField($('#txtWorkTel'), isMobile);

            if (isMobile)
                $('#divWork').attr('error', 'Your Work number cannot be a Mobile number. Only a Landline number.');
        }
    }
}

$(document).ready(function() {
    $('#txtPassword').blur(function() {
        var success = ValidateMethod(this, ValidatePassword);
        ValidateConfirmPassword();
    });

    $('#txtConfirmPassword').blur(function() {
        ValidateConfirmPassword();
    });
});

function ValidateConfirmPassword() {
    var success = $("#txtConfirmPassword").val() == $("#txtPassword").val();

    FlagField($("#txtConfirmPassword"), !success);
}



//Specific validation Apply2
$(document).ready(function() {
    $('#txtBankAccountNumber').blur(
    function() {
        ValidateMethod(this, ValidateNumber);
    });
});
$(document).ready(function() {
    $('#ddlBankName').change(function() {
        FlagField('#txtBankBranchCode', false);
    });
});


//Income
$(document).ready(function() {
    $('#txtGrossIncome').blur(
    function() {
        SetEmptyNumberToZero();
        ValidateMethod(this, ValidateMoney);
        CalculateTotalIncome();
        CalculateDisposableIncome();
    });
});
$(document).ready(function() {
$('#txtAdditionalIncome').blur(
    function() {
        SetEmptyNumberToZero();
        ValidateMethod(this, ValidateMoney);
        CalculateTotalIncome();
        CalculateDisposableIncome();
    });
});

//Expences
$(document).ready(function() {
$('#txtLivingExpenses').blur(
    function() {
        SetEmptyNumberToZero();
        ValidateMethod(this, ValidateMoney);
        CalculateTotalExpences();
        CalculateDisposableIncome();
    });
});
$(document).ready(function() {
    $('#txtOtherExpences').blur(
    function() {
        SetEmptyNumberToZero();
        ValidateMethod(this, ValidateMoney);
        CalculateTotalExpences();
        CalculateDisposableIncome();
    });
});

function SetEmptyNumberToZero() {

    var setzero = (0.00).toFixed(2);
    if ($('#txtGrossIncome').val() == "") {
        $('#txtGrossIncome').val(setzero);
    }
    else {
        var setdecimal = parseFloat($('#txtGrossIncome').val());
        $('#txtGrossIncome').val(setdecimal.toFixed(2));
    }
    
    if ($('#txtAdditionalIncome').val() == "") {
        $('#txtAdditionalIncome').val(ssetzero);
    }
    else{
        var setdecimal = parseFloat($('#txtAdditionalIncome').val());
        $('#txtAdditionalIncome').val(setdecimal.toFixed(2));
        }
        
    if ($('#txtLivingExpenses').val() == "") {
        $('#txtLivingExpenses').val(setzero);
    }
    else{
        var setdecimal = parseFloat($('#txtLivingExpenses').val());
        $('#txtLivingExpenses').val(setdecimal.toFixed(2));
        }

        if ($('#txtOtherExpences').val() == "") {
            $('#txtOtherExpences').val(setzero);
        }
        else {
            var setdecimal = parseFloat($('#txtOtherExpences').val());
            $('#txtOtherExpences').val(setdecimal.toFixed(2));
            
        }
}

function CalculateTotalIncome() {
    if (
        ValidateMethod($('#txtGrossIncome'), ValidateMoney) &&
        ValidateMethod($('#txtAdditionalIncome'), ValidateMoney)
    ) {
        var gross = parseFloat($('#txtGrossIncome').val());
        var additional = parseFloat($('#txtAdditionalIncome').val());

        var totalincome = gross + additional;

        $('#lblTotalMonthlyIncome').text(totalincome.toFixed(2));
    }
}
function CalculateTotalExpences() {
    if (
        ValidateMethod($('#txtLivingExpenses'), ValidateMoney) &&
        ValidateMethod($('#txtOtherExpences'), ValidateMoney)
    ) {
        var living = parseFloat($('#txtLivingExpenses').val());
        var other = parseFloat($('#txtOtherExpences').val());

        var totalexpences = living + other;

        $('#lblTotalExpences').text(totalexpences.toFixed(2));
    }
}

function CalculateDisposableIncome() {
    if (ValidateMethod($('#txtGrossIncome'), ValidateMoney) &&
        ValidateMethod($('#txtAdditionalIncome'), ValidateMoney) &&
        ValidateMethod($('#txtLivingExpenses'), ValidateMoney) &&
        ValidateMethod($('#txtOtherExpences'), ValidateMoney)
    ) {
        var gross = parseFloat($('#txtGrossIncome').val());
        var additional = parseFloat($('#txtAdditionalIncome').val());

        var totalincome = gross + additional;
        
        var living = parseFloat($('#txtLivingExpenses').val());
        var other = parseFloat($('#txtOtherExpences').val());

        var totalexpences = living + other;

        var disposable = totalincome - totalexpences;

        $('#lblDisposableIncome').text(disposable.toFixed(2));
    }
}



//This has to be after all of the validation methods as it needs to run afterwards
$(document).ready(function() {
    //$("#divError").hide(); //Hide if jquery is available

    DisplayError();
    $('input:text').each(function() {
        $(this).blur(function() {
            DisplayError();
        });
    });

    $('input:password').each(function() {
        $(this).blur(function() {
            DisplayError();
        });
    });

    $("select[applydefault]").each(function() {
        $(this).focusout(function() {
            DisplayError();
        });
    });
});

function FlagField(obj, flag) {
    if (flag === true) {
        $(obj).parent().addClass("error");
    }
    else {
        $(obj).parent().removeClass("error");
    }
}

function FocusField(obj, flag) {
    if (flag === true) {
        $(obj).parent().addClass("focus");
    }
    else {
        $(obj).parent().removeClass("focus");
    }
}

function ValidateMethod(obj, method) {
    var val = $(obj).val();
    var success = val == "" || method(val);

    FlagField(obj, !success);

    return success;
}


//Code to display the errors - first error is displayed in error div
function DisplayError() {

    DisplayErrorSpecific('divPersonalDetails');
    DisplayErrorSpecific('divContactDetails');
    DisplayErrorSpecific('divLivingDetails');
    DisplayErrorSpecific('divCurrentAddress');
    DisplayErrorSpecific('divRegistration');
    DisplayErrorSpecific('divConfirmation');

    DisplayErrorSpecific('divEmploymentDetails');
    DisplayErrorSpecific('divAffordability');
    DisplayErrorSpecific('divBankDetails');
    DisplayErrorSpecific('divVerification');

    DisplayErrorSpecific('divCZPersonalDetails');
    DisplayErrorSpecific('divCZAddressDetails');
    DisplayErrorSpecific('divCZAccount');
    DisplayErrorSpecific2('divCZAccount');
}

function DisplayErrorSpecific(parentDivName) {

    var parentDiv = $('#' + parentDivName);

    var obj = parentDiv.children().children().filter('.error').first();

    var errorDiv = parentDiv.children('.errorMessage').first();

    if (obj.html() == null) {
        errorDiv.css('display', 'none');
    }
    else {
        var msg = obj.attr('error');

        if (msg == '' || msg == undefined)
            msg = 'Please fill in mandatory fields.';

        errorDiv.css('display', 'block');

        errorDiv.children().first().text(msg);
    }
}

//Hack for nested password fields on clientzone profile
function DisplayErrorSpecific2(parentDivName) {

    var parentDiv = $('#' + parentDivName);

    var obj = parentDiv.children().children().children().filter('.error').first();

    var errorDiv = parentDiv.children('.errorMessage').first();

    if (obj.html() == null) {
        errorDiv.css('display', 'none');
    }
    else {
        var msg = obj.attr('error');

        if (msg == '' || msg == undefined)
            msg = 'Please fill in mandatory fields.';

        errorDiv.css('display', 'block');

        errorDiv.children().first().text(msg);

        $('#divChangePassword').css('display', 'block');
    }
}

// Function that validates the input and checks if its numeric
// Specify if decimal values are allowed
function validateInputIsNumeric(e, hasDecimal) {

    var key = e.which ? e.which : e.keyCode;
    var allowkey = true;
    var text = e.srcElement.value;
    var decimalPointLoc = text.indexOf('.');

    //Check for a dcimal
    if ((key == 46 || key == 110 || key == 190) && hasDecimal) {
        //If there is already a . then dont allow it
        if (decimalPointLoc > 0 || text.length == 0) {
            return false;
        }
        else {

            return true;
        }
    }

    //enter key  //backspace //tabkey      //escape key
    if ((key >= 48 && key <= 57) || key == 13 || key == 8 || key == 9 || key == 27) {

        return true;
    }

    else {
        return false;
    }

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
