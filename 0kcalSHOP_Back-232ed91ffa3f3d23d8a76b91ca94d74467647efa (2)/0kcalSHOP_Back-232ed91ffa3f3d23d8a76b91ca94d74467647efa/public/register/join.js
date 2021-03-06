function join() {
    const form = document.join_form;
    const chkPw2 = checkValidPassword2(form);
    const chkPw = checkValidPassword(form);
    const chkEmail = checkValidEmail(form);
    const chkId=checkValidId(form);
    const chkUsername = checkValidUsername(form);

    if (chkUsername) {
        document.getElementById('alert_username').innerText = "";
        form.name.style.border = '2px solid';
        form.name.style.borderColor = '#00D000';
    } else {
        form.name.style.border = '2px solid';
        form.name.style.borderColor = '#FF0000';
        document.getElementById('alert_username').style.color = '#FF0000';
    }

    if(chkId){
        document.getElementById('alert_id').innerText="";
        form.id.style.border='2px solid';
        form.id.style.borderColor='#00D000';
    } else {
        form.id.style.border='2px solid';
        form.id.style.borderColor='#FF0000';
        document.getElementById('alert_id').style.color='#FF0000';
    }

    if (chkEmail) {
        document.getElementById('alert_email').innerText = "";
        form.email.style.border = '2px solid';
        form.email.style.borderColor = '#00D000';
    } else {
        form.email.style.border = '2px solid';
        form.email.style.borderColor = '#FF0000';
        document.getElementById('alert_email').style.color = '#FF0000';
    }

    if (chkPw) {
        document.getElementById('alert_password').innerText = "";
        form.password.style.border = '2px solid';
        form.password.style.borderColor = '#00D000';
    } else {
        form.password.style.border = '2px solid';
        form.password.style.borderColor = '#FF0000';
        document.getElementById('alert_password').style.color = '#FF0000';
    }
    if (chkPw2) {
        document.getElementById('alert_password2').innerText = "";
        form.password2.style.border = '2px solid';
        form.password2.style.borderColor = '#00D000';
    } else {
        form.password2.style.border = '2px solid';
        form.password2.style.borderColor = '#FF0000';
        document.getElementById('alert_password2').style.color = '#FF0000';
    }

    if (chkUsername && chkEmail&& chkId && chkPw && chkPw2) {
        console.log('complete. form.submit();');
        form.submit();
    }
}

function checkValidUsername(form) {
    if (form.name.value == "") {
        document.getElementById('alert_username').innerText = "????????? ???????????? ?????????.";
        form.name.focus();
        return false;
    }

    return true;
}

function checkValidId(form){
    if(form.id.value==""){
        document.getElementById('alert_id').innerText="???????????? ???????????? ?????????.";
        form.id.focus();
        return false;
    }
    return true;
}

function checkValidEmail(form) {
    if (form.email.value == "") {
        document.getElementById('alert_email').innerText = "???????????? ???????????? ?????????.";
        form.email.focus();
        return false;
    }

    const exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

    if (exptext.test(form.email.value) === false) {
        document.getElementById('alert_email').innerText = "????????? ????????? ????????? ???????????? ?????????.";
        form.email.select();
        return false;
    }

    return true;
}


function checkValidPassword(form) {
    if (form.password.value == "") {
        document.getElementById('alert_password').innerText = "??????????????? ???????????? ?????????.";
        form.password.focus();
        return false;
    }

    const pw = form.password.value;
    const num = pw.search(/[0-9]/g);
    const eng = pw.search(/[a-z]/ig);
    const spe = pw.search(/[`~!@@#$%^&*|?????????'???";:???/?]/gi);

    if (pw.length < 8) {
        document.getElementById('alert_password').innerText = "??????????????? 8??? ???????????? ???????????? ?????????.";
        form.password.focus();
        return false;
    } else if (pw.search(/\s/) != -1) {
        document.getElementById('alert_password').innerText = "??????????????? ?????? ?????? ???????????? ?????????.";
        form.password.focus();
        return false;
    } else if (num < 0 && eng < 0 && spe < 0) {
        document.getElementById('alert_password').innerText = "??????????????? ??????, ??????, ??????????????? ???????????? ?????????..";
        form.password.focus();
        return false;
    }

    return true;
}

function checkValidPassword2(form) {
    if (form.password2.value == "") {
        document.getElementById('alert_password2').innerText = "???????????? ????????? ???????????? ?????????.";
        form.password2.focus();
        return false;
    }

    if (form.password.value !== form.password2.value) {
        document.getElementById('alert_password2').innerText = "??????????????? ???????????? ????????????.";
        form.password.style.border = '2px solid';
        form.password.style.borderColor = '#FF0000';
        document.getElementById('alert_password').style.color = '#FF0000';
        form.password2.focus();
        return false;
    }

    return true;
}

function back_main(){
    const back='/';
    window.location.href=back;
}