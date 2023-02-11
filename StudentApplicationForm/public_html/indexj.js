


var  jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIRL  = "/api/irl";
var jpdbIML = "/api/iml";
var stuDBName = "SCHOOL-DB";
var stuRelName = "STUDENT-TABLE";
var connToken = "90932652|-31949276107222501|90948770";

$('#stuId').focus();

function saveRecNo2LS(jsonObj){
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno",lvData.rec_no);
}

function getstuIdAsJsonObj(){
    var stuId = $('#stuId').val();
    var jsonStr ={
        rollNo :stuId
    };
    return JSON.stringify(jsonStr);
}


function fillData(jsonObj){
    saveRecNo2LS(jsonObj);
    var record  = JSON.parse(jsonObj.data).record;
    $('#stuId').val(record.rollNo);
    $('#stuName').val(record.name);
    $('#stuClass').val(record.class);
    $('#stuBirth').val(record.birth);
    $('#stuAddress').val(record.address);
    $('#stuEnrollment').val(record.enrollment); 
    
}



function saveData(){
    var jsonStrObj= validateData();
    if(jsonStrObj === " "){
        return " ";
    }
    var putRequest = createPUTRequest(connToken, jsonStrObj, stuDBName, stuRelName);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest,jpdbBaseURL,jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $('stuId').focus();
}

function changeData(){
    $('#change').prop('disabled', true);
    jsonChg = validateData();
    var updateRequest = createUPDATERecordRequest(connToken, jsonChg, stuDBName,stuRelName,localStorage.getItem('recno'));
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest,jpdbBaseURL,jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();
    $('#stuId').focus();
}


function resetForm(){
    $('#stuId').val("");
    $('#stuName').val("");
    $('#stuClass').val("");
    $('#stuBirth').val("");
    $('#stuAddress').val("");
    $('#stuEnrollment').val(""); 
    $('#stuId').prop('disabled',false);
    $('#save').prop('disabled',true);
    $('#change').prop('disabled',true);
    $('#reset').prop('disabled',true);
    $('#stuId').focus();
}

function validateData(){
    var stuId,stuName,stuClass,stuBirth,stuAddress,stuEnrollment;
    stuId=$('#stuId').val();
    stuName=$('#stuName').val();
    stuClass=$('#stuClass').val();
    stuBirth=$('#stuBirth').val();
    stuAddress=$('#stuAddress').val();
    stuEnrollment=$('#stuEnrollment').val();
    if(stuId===""){
        alert("Roll Number is missing");
        $('#stuId').focus();
        return "";
    }
    if(stuName===""){
        alert("Name is missing");
        $('#stuName').focus();
        return "";
    }
    if(stuClass===""){
        alert("Class  is missing");
        $('#stuClass').focus();
        return "";
    }
    if(stuBirth===""){
        alert("Birth Date is missing");
        $('#stuBirth').focus();
        return "";
    }
    if(stuAddress===""){
        alert("Address is missing");
        $('#stuAddress').focus();
        return "";
    }
    if(stuEnrollment===""){
        alert("Enrollment is missing");
        $('#stuEnrollment').focus();
        return "";
    }
    var jsonStrObj = {
        rollNo : stuId,
        name : stuName,
        class : stuClass,
        birth : stuBirth,
        address : stuAddress,
        enrollment : stuEnrollment
    };
    return JSON.stringify(jsonStrObj);
}

function getStu(){
    var stuIdJsonObj = getstuIdAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken,stuDBName,stuRelName,stuIdJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest,jpdbBaseURL,jpdbIRL);
    jQuery.ajaxSetup({async: true});
    if(resJsonObj.status === 400){
        $('#save').prop("disabled", false);
        $('#reset').prop("disabled", false);
        $('#stuName').focus();
    }
    else if(resJsonObj.status === 200) {
        $('#stuId').prop("disabled",true);
        fillData(resJsonObj);
         $('#change').prop("disabled", false);
        $('#reset').prop("disabled", false);
        $('#stuName').focus();
    }
}


