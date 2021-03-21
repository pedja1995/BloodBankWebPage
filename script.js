
function parseDate(str) {

    var m = str.match(/^(\d{4})[\-](0?[1-9]|1[012])[\-](0?[1-9]|[12][0-9]|3[01])[T00:00:00]*$/);
    return m[3]+"." +(m[2]) + "." + m[1];
}

function loginClick()
{
    if(    document.getElementById("login_btn").innerText==="Prijavi se") {

        if (document.getElementById("loginDiv").style.display === "flex")
            document.getElementById("loginDiv").style.display = "none";
        else
            document.getElementById("loginDiv").style.display = "flex";
    }
    else
    {
        document.getElementById("request").style.display="block";

        document.getElementById("login_btn").innerText="Prijavi se";
        document.getElementById("profile").style.display="none";
        document.getElementById("headingUser").innerText=" ";

        document.cookie = "userBloodType=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "password=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "lastName=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "phone=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "address=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "place=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "contactId=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "locationId=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "sex=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "lastDonationDate=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "nextDonationDate=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "donorDonationType=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "dateOfBirth=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "realNext=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "realLast=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "realBirth=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

        aboutInfo();

    }

}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/*
function loginCheck() {
    var user= document.getElementById("txtUsername").value;
    var pass= document.getElementById("txtPassword").value;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("profileDiv").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "login.php?user=" + user + "&pass=" + pass+"", true);
    xhttp.send();
    var check = getCookie("wrong");
    if(check!="")
    {
        alert("Pogrešno korisničko ime ili lozinka!");
    }
    else
    {
        document.getElementById("profile").style.display="block";
    }


}*/

/*

function foo() {
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', "https://localhost:44373/api/donor/1");
    httpRequest.send();
    console.log(httpRequest.responseText);
}
*/

function donorCheck(){
    var user = document.getElementById("txtUsername").value;
    var pass = document.getElementById("txtPassword").value;
    if(user.length>0 && pass.length>0) {
        fetch("https://localhost:44373/api/donorcheck/" + user + "/" + pass + "")
            .then(response => response.json())
            .then(data => donorCheckResponse(data));
    }
}




function donorCheckResponse(data)
{
    if(data.length>0) {
        document.getElementById("profile").style.display="block";
        document.getElementById("request").style.display="none";

        document.getElementById("loginDiv").style.display="none";
        document.getElementById("login_btn").innerText="Odjavi se";
        document.getElementById("txtPassword").value="";
        document.getElementById("txtUsername").value="";


        document.cookie = "userBloodType="+data[0]['krvnaGrupaDonor']+"";
        document.cookie = "userId="+data[0]['donorId']+"";
        document.cookie = "username="+data[0]['registarskiBroj']+"";
        document.cookie = "password="+data[0]['lozinka']+"";
        document.cookie = "name="+data[0]['ime']+"";
        document.cookie = "lastName="+data[0]['prezime']+"";
        document.cookie = "sex="+data[0]['pol']+"";
        document.cookie = "lastDonationDate="+data[0]['datumPoslednjegDoniranja']+"";
        document.cookie = "nextDonationDate="+data[0]['datumNajranijegSledecegDoniranja']+"";
        document.cookie = "donorDonationType="+data[0]['tipPoslednjegDoniranja']+"";
        document.cookie = "dateOfBirth="+data[0]['datumRodjenja']+"";
console.log(getCookie("nextDonationDate"));
        //za datum
        document.cookie = "realNext="+parseDate(getCookie("nextDonationDate"))+"";
        document.cookie = "realLast="+parseDate(getCookie("lastDonationDate"))+"";
        document.cookie = "realBirth="+parseDate(getCookie("dateOfBirth"))+"";
        console.log(getCookie("realNext"));


        document.getElementById("headingUser").innerText=getCookie("name");

        getContact(data[0]['donorId']);
    }
    else {
        alert("Pogrešno korisničko ime ili lozinka!");
        document.getElementById("txtPassword").value="";

    }
}

function getContact(id)
{
    fetch("https://localhost:44373/api/joinkontaktdonor/" +id +"")
        .then(response => response.json())
        .then(data => retrieveContact(data));

}
function retrieveContact(data)
{
    document.cookie = "email="+data[0]['email']+"";
    document.cookie = "phone="+data[0]['brojTelefona']+"";
    document.cookie = "address="+data[0]['lokacija']['adresa']+"";
    document.cookie = "place="+data[0]['lokacija']['mjesto']+"";

    document.cookie = "contactId="+data[0]['kontaktId']+"";
    document.cookie = "locationId="+data[0]['lokacijaId']+"";

    console.log(getCookie("contactId"));
    console.log(getCookie("locationId"));

aboutInfo();

}





function profileInfo()
{

    document.getElementById("content").innerHTML=" <div   id=\"profileDiv\" style=\"display: flex;height: 420px; flex-direction: column;justify-content: center; align-content: center; align-items: center\">" +
        "<div style='margin-top:420px;display: flex;flex-direction: row;justify-items: center;align-items: center' id='bloodTypeImgDiv'><div><img onclick='' src=\"Resources/"+getCookie("userBloodType")+".png\"></div>"+
        "<div style='display: flex;flex-direction: column'><label class='labelStyle' for='txtDateOfBirth'>Datum rođenja:</label><input class='inputStyle' id='txtDateOfBirth' type='text' disabled='true' value='"+getCookie("realBirth")+"'>"+
        "<label class='labelStyle' for='txtLastDate'>Datum prethodnog doniranja:</label><input class='inputStyle' id='txtLastDate' type='text' disabled='true' value='"+getCookie("realLast")+"'>"+
        "<label class='labelStyle' for='txtNextDate'>Datum sledećeg doniranja:</label><input class='inputStyle' id='txtNextDate' type='text' disabled='true' value='"+getCookie("realNext")+"'></div>"+
        "<div id='donorHistoryDiv'><label style='align-self: center' class='labelStyle' for='donorHistoryUl'>Istorija doniranja:</label><ul id='donorHistoryUl'></ul></div>"+
        "</div>"+
        "<div style='display: flex;flex-direction: row;justify-content: center; align-content: center; align-items: center'>"+
        "        <div style='display: flex; flex-direction: column; justify-content: center;align-items: center; margin: 10px 30px 10px 30px'>" +
        "            <label class='labelStyle' for='txtName'>Ime:</label>" +
        "            <input class='inputStyle' id='txtName' type='text' disabled='true' value='"+getCookie("name")+"'>" +
        "            <label class='labelStyle' for='txtLastName'>Prezime:</label>" +
        "            <input class='inputStyle' id='txtLastName' type='text' disabled='true' value='"+getCookie("lastName")+"'>" +
        "            <label class='labelStyle' for='txtUser'>Korisničko ime:</label>" +
        "            <input class='inputStyle' id='txtUser' type='text' disabled='true' value='"+getCookie("username")+"'>" +
        "            <label class='labelStyle' for='txtPass'>Lozinka:</label>\n" +
        "            <input class='inputStyle' id='txtPass' type='password' disabled='true' value='"+getCookie("password")+"'>" +
        "            <div> <input id='showPass' type='checkbox' onclick='showPassword()' disabled='true'>Prikaži šifru</div>" +
        "        </div>" +
        "<div style='display: flex; flex-direction: column; justify-content: center;align-items: center; margin: 10px 30px 10px 30px'>" +
        "            <label class='labelStyle' for='txtAddress'>Adresa:</label>" +
        "            <input class='inputStyle' id='txtAddress' type='text' disabled='true' value='"+getCookie("address")+"'>" +
        "            <label class='labelStyle' for='txtplace'>Mjesto:</label>" +
        "            <input class='inputStyle' id='txtplace' type='text' disabled='true' value='"+getCookie("place")+"'>" +
        "            <label class='labelStyle' for='txtEmail'>Email:</label>" +
        "            <input class='inputStyle' id='txtEmail' type='text' disabled='true' value='"+getCookie("email")+"'>" +
        "            <label class='labelStyle' for='txtPhone'>Broj telefona:</label>\n" +
        "            <input class='inputStyle' id='txtPhone' type='text' disabled='true' value='"+getCookie("phone")+"'>" +
        "            <div style=''><input type='button' id='btnCancel' value='Otkaži' style='margin-right: 30px' onclick='cancelProfileChange()'><input type='button' id='btnChange' value='Izmjeni podatke' onclick='showCancel()'></div>" +
        "        </div>" +
        "</div>"+
        " </div>"
    getDonorHistory();
}



function showPassword() {
    var x = document.getElementById("txtPass");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}


function cancelProfileChange()
{
    document.getElementById("btnCancel").style.display="none";
    document.getElementById("btnChange").value="Izmjeni podatke";

    document.getElementById("txtName").disabled=true;
    document.getElementById("txtLastName").disabled=true;
    document.getElementById("txtPass").disabled=true;
    document.getElementById("showPass").disabled=true;
    document.getElementById("txtAddress").disabled=true;
    document.getElementById("txtEmail").disabled=true;
    document.getElementById("txtPhone").disabled=true;
    document.getElementById("txtplace").disabled=true;




}


function changeContent()
{

}

function bloodInfo(id)
{
    switch (id)
    {
        case "blood_A+":
            document.getElementById(id).innerHTML="<div class='blood'>Druga najzastupjenija krvna grupa. Oko 30% svjetske populacije ima ovu krvnu grupu.</div>";
            break;
        case "blood_A-":
            document.getElementById(id).innerHTML="<div class='blood'>Rijeđe zastupljena krvna grupa. Oko 6% svjetske populacije ima ovu krvnu grupu.</div>";
            break;
        case "blood_B+":
            document.getElementById(id).innerHTML="<div class='blood'>Rijeđe zastupljena krvna grupa. Oko 9% svjetske populacije ima ovu krvnu grupu.</div>";
            break;
        case "blood_B-":
            document.getElementById(id).innerHTML="<div class='blood'>Druga najređe zastupljena krvna grupa. Oko 2% populacije ima ovu krvnu grupu.</div>";
            break;
        case "blood_O+":
            document.getElementById(id).innerHTML="<div class='blood'>Najzastupljenija krvna grupa. Oko 39% populacije ima ovu krvnu grupu.</div>";
            break;
        case "blood_O-":
            document.getElementById(id).innerHTML="<div class='blood'>Rijeđe zastupljena krvna grupa. Oko 9% svjetske populacije ima ovu krvnu grupu.</div>";
            break;
        case "blood_AB+":
            document.getElementById(id).innerHTML="<div class='blood'>Rijeđe zastupljena krvna grupa. Oko 4% svjetske populacije ima ovu krvnu grupu.</div>";
            break;
        case "blood_AB-":
            document.getElementById(id).innerHTML="<div class='blood'>Najređe zastupljena krvna grupa. Oko 1% populacije ima ovu krvnu grupu.</div>";
            break;


    }
}

function bloodGroup(id)
{
    switch (id)
    {
        case "blood_A+":
            document.getElementById(id).innerHTML="<img src=\"Resources/A+.png\">";
            break;
        case "blood_A-":
            document.getElementById(id).innerHTML="<img src=\"Resources/A-.png\">";
            break;
        case "blood_B+":
            document.getElementById(id).innerHTML="<img src=\"Resources/B+.png\">";
            break;
        case "blood_B-":
            document.getElementById(id).innerHTML="<img src=\"Resources/B-.png\">";
            break;
        case "blood_O+":
            document.getElementById(id).innerHTML="<img src=\"Resources/0+.png\">";
            break;
        case "blood_O-":
            document.getElementById(id).innerHTML="<img src=\"Resources/0-.png\">";
            break;
        case "blood_AB+":
            document.getElementById(id).innerHTML="<img src=\"Resources/AB+.png\">";
            break;
        case "blood_AB-":
            document.getElementById(id).innerHTML="<img src=\"Resources/AB-.png\">";
            break;


    }
}

function showCancel()
{
    if(document.getElementById("btnChange").value==="Sačuvaj izmjene")
    {
//donor update
        var item = {
            donorId: getCookie("userId"),
            krvnaGrupaDonor:getCookie("userBloodType"),
            pol: getCookie("sex"),
            datumPoslednjegDoniranja:getCookie("lastDonationDate"),
            datumNajranijegSledecegDoniranja:getCookie("nextDonationDate"),
            tipPoslednjegDoniranja: getCookie("donorDonationType"),
            ime: document.getElementById("txtName").value,
            prezime: document.getElementById("txtLastName").value,
            registarskiBroj:getCookie("username"),
            datumRodjenja:getCookie("dateOfBirth"),
            lozinka: document.getElementById("txtPass").value,
            donacija:[],
            kontakt: []
        };
       var url = "https://localhost:44373/api/donor/"+getCookie("userId")+"";
        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        }).catch(error => console.error('Unable to update item.', error));

        //contact update
         item = {
             kontaktId:getCookie("contactId"),
             brojTelefona: document.getElementById("txtPhone").value,
             email: document.getElementById("txtEmail").value,
             lokacijaId:getCookie("locationId"),
             zdravstvenaUstanovaId: null,
             radnikId:null,
             donorId:getCookie("userId"),
             donor:null,
             lokacija: null,
             radnik: null,
             zdravstvenaUstanova: null
        };
        url = "https://localhost:44373/api/kontakt/"+getCookie("contactId")+"";
        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        }).catch(error => console.error('Unable to update item.', error));

//location update
        item = {
            lokacijaId: getCookie("locationId"),
            adresa: document.getElementById("txtAddress").value,
            mjesto: document.getElementById("txtplace").value,
            postanskiBroj:null,
            kontakt:[],
            magacin:[],
        };
        url = "https://localhost:44373/api/lokacija/"+getCookie("locationId")+"";
        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        }).catch(error => console.error('Unable to update item.', error));


        document.getElementById("btnCancel").style.display="none";
         document.getElementById("btnChange").value="Izmjeni podatke";

        document.getElementById("txtName").disabled=true;
        document.getElementById("txtLastName").disabled=true;
        document.getElementById("txtPass").disabled=true;
        document.getElementById("showPass").disabled=true;
        document.getElementById("txtAddress").disabled=true;
        document.getElementById("txtEmail").disabled=true;
        document.getElementById("txtPhone").disabled=true;
        document.getElementById("txtplace").disabled=true;

    }
    else
    {
        document.getElementById("btnCancel").style.display="inline";
        document.getElementById("btnChange").value="Sačuvaj izmjene";

        document.getElementById("txtName").disabled=false;
        document.getElementById('showPass').disabled=false;

        document.getElementById("txtEmail").disabled=false;
        document.getElementById("txtPhone").disabled=false;

        document.getElementById("txtLastName").disabled=false;
        document.getElementById("txtPass").disabled=false;
        document.getElementById("txtAddress").disabled=false;
        document.getElementById("txtplace").disabled=false;





    }
}

function contactInfo()
{
    document.getElementById("content").innerHTML="   <div id=\"contactDiv\"><div class=\"contactInfo\"><i class=\"fas fa-map-marker-alt\"></i> Adresa: Vuka Karadžića 30, 71123 Lukavica</div><div class=\"contactInfo\"> <i class=\"fas fa-envelope-square\"></i> Email: bankakrvi@mail.com</div><div class=\"contactInfo\"><i class=\"fas fa-phone-square-alt\"></i> Broj telefona: 00 38755 550 550</div><iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2878.511498854919!2d18.375674988375867!3d43.824491184273626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4758c9b6cf9dbc53%3A0x528ccd6928b807b8!2z0JXQu9C10LrRgtGA0L7RgtC10YXQvdC40YfQutC4INGE0LDQutGD0LvRgtC10YI!5e0!3m2!1sen!2sba!4v1603646430933!5m2!1sen!2sba\" width=\"800\" height=\"450\" frameborder=\"0\" style=\"border:0;\" allowfullscreen=\"\" aria-hidden=\"false\" tabindex=\"0\"></iframe></div></div>";
}

function aboutInfo()
{
    document.getElementById("content").innerHTML="<div id=\"div_about\">" +
        "        <div id=\"topDiv\">" +
        "            <div class=\"bloodGroup\" id=\"blood_A+\" onclick=\"bloodInfo(this.id)\" onmouseleave=\"bloodGroup(this.id)\"> <img src=\"Resources/A+.png\"></div>" +
        "            <div class=\"bloodGroup\"  id=\"blood_A-\" onclick=\"bloodInfo(this.id)\" onmouseleave=\"bloodGroup(this.id)\"> <img src=\"Resources/A-.png\"></div>" +
        "            <div class=\"bloodGroup\"  id=\"blood_B+\" onclick=\"bloodInfo(this.id)\" onmouseleave=\"bloodGroup(this.id)\"> <img src=\"Resources/B+.png\"></div>" +
        "            <div class=\"bloodGroup\"  id=\"blood_B-\" onclick=\"bloodInfo(this.id)\" onmouseleave=\"bloodGroup(this.id)\"> <img src=\"Resources/B-.png\"></div>" +
        "        </div>" +
        "        <div id=\"bottomDiv\">" +
        "            <div class=\"bloodGroup\"  id=\"blood_O+\" onclick=\"bloodInfo(this.id)\" onmouseleave=\"bloodGroup(this.id)\"> <img src=\"Resources/0+.png\"></div>" +
        "            <div class=\"bloodGroup\"  id=\"blood_O-\" onclick=\"bloodInfo(this.id)\" onmouseleave=\"bloodGroup(this.id)\"> <img src=\"Resources/0-.png\"></div>" +
        "            <div class=\"bloodGroup\"  id=\"blood_AB+\" onclick=\"bloodInfo(this.id)\" onmouseleave=\"bloodGroup(this.id)\"> <img src=\"Resources/AB+.png\"></div>" +
        "            <div class=\"bloodGroup\"  id=\"blood_AB-\" onclick=\"bloodInfo(this.id)\" onmouseleave=\"bloodGroup(this.id)\"> <img src=\"Resources/AB-.png\"></div>" +
        "        </div>" +
        "        <div ><h3 style=\"color: #b5121b;margin-bottom: -10px\">Zanimljive činjenice o doniranju krvi:</h3></div>" +
        "        <div>" +
        "            <ul>" +
        "                <li class=\"bloodInfo\">" +
        "                   1. Jednoj od sedam osoba na bolničkom liječenju je potrebna krv." +
        "                </li>" +
        "                <li class=\"bloodInfo\">" +
        "                    2. U prosjeku svaka odrasla osoba ima između 4 i 6 litara krvi u organizmu." +
        "                </li>" +
        "                <li class=\"bloodInfo\">" +
        "                    3. Jedna jedinica krvi iznosi 450 ml." +
        "                </li >" +
        "                <li class=\"bloodInfo\">" +
        "                    4. Novorođena beba ima 250 do 300 ml krvi u organizmu." +
        "                </li>" +
        "                <li class=\"bloodInfo\">" +
        "                    5. A, B, O i AB su četri glavne krvne grupe kod čovjeka. AB krvna grupa je univerzalni primalac, a O krvna grupa je univerzalni davalac." +
        "                </li>" +
        "                <li class=\"bloodInfo\">" +
        "                    6. Prosječno vrijeme doniranja krvi iznosi 15 minuta." +
        "                </li>" +
        "                <li class=\"bloodInfo\">" +
        "                    7. Jedna jedinica krvi se može podijeliti na krvnu plazmu, eritrocite (crvena krvna zrnca), trombocite (krvne pločice) i leukocite (bijela krvna zrnca)." +
        "                </li>" +
        "                <li class=\"bloodInfo\">" +
        "                    8. Eritrociti prenose kiseonik od pluća do ostalih organa." +
        "                </li>" +
        "                <li class=\"bloodInfo\">" +
        "                    9. U dvije ili tri kapi krvi se nalazi milijarda crvenih krvnih zrnaca." +
        "                </li>" +
        "                <li class=\"bloodInfo\">" +
        "                    10. Trombociti pomažu zgrušavanju krvi." +
        "                </li>" +
        "                <li class=\"bloodInfo\">" +
        "                    11. Krv i crvena krvna zrnca mogu da se upotrebe i do 42 dana nakon doniranja." +
        "                </li>" +
        "                <li class=\"bloodInfo\">" +
        "                    12. Krvne pločice (trombociti) mogu da se upotrebe najkasnije 5 dana od dana doniranja." +
        "                </li>" +
        "                <li class=\"bloodInfo\">" +
        "                    13. Pacijentima sa rakom i pacijentima sa operacijama na otvorenom srcu često je potrebna transfuzija trombocita da bi preživjeli." +
        "                </li>" +
        "                <li class=\"bloodInfo\">" +
        "                    14. Svaka odrasla zdrava osoba može donirati krv svakih 56 dana ili 2 mjeseca, ali je preporuka za muškarce doniranje svaka 3 mjeseca, a za žene 4 mjeseca." +
        "                </li>" +
        "                <li class=\"bloodInfo\">" +
        "                    15. Banke krvi najčešće potražuju doniranje O i B krvne grupe." +
        "                </li>" +
        "            </ul>" +
        "        </div>" +
        "" +
        "    </div>";
}



function requestInfo()
{
    document.getElementById("content").innerHTML="<div id=\"requestDiv\">" +
        "        <label id='lblID' class=\"labelStyle\" for=\"txtInstitutionId\">Verifikacioni kod:</label>" +
        "        <input placeholder='Unesite verifikacioni kod' id=\"txtInstitutionId\" type=\"password\" maxlength=\"16\" >" + "<input id='btnVerification' type='button' value='Verifikacija' onclick='institutionCheck()' style='margin-top: 10px'> "+
        "        <div id=\"requestInfo\" style=\"display: none\">" +
        "            <label class=\"labelStyle\" id=\"institutionName\" style=\"align-self: center\"></label>" +
        "" +
        "            <div style=\"margin-top:20px;\"><label  class=\"labelStyle\" for=\"bloodTypes\">Krvna grupa:</label>" +
        "                <select name=\"bloodTypes\" id=\"bloodTypes\" style='width: 80px'>" +
        "                    <option value=\"A+\">A+</option>" +
        "                    <option value=\"A-\">A-</option>" +
        "                    <option value=\"B+\">B+</option>" +
        "                    <option value=\"B-\">B-</option>" +
        "                    <option value=\"O+\">O+</option>" +
        "                    <option value=\"O-\">O-</option>" +
        "                    <option value=\"AB+\">AB+</option>" +
        "                    <option value=\"AB-\">AB-</option>" +
        "                </select></div>" +
        "            <div style=\"margin-top:20px\"><label  class=\"labelStyle\" for=\"typeOfBloodDonation\">Tip derivata:</label>" +
        "                <select name=\"typeOfBloodDonation\" id=\"typeOfBloodDonation\">" +
        "                    <option value=\"Krv\">Krv</option>" +
        "                    <option value=\"Plazma\">Plazma</option>" +
        "                    <option value=\"Eritrociti\">Eritrociti</option>" +
        "                    <option value=\"Trombociti\">Trombociti</option>" +
        "                </select></div>" +
        "           <div style=\"margin-top: 20px\" > <label class=\"labelStyle\" for=\"txtInstitutionId\">Broj doza:</label>" +
        "               <input id=\"txtDoseNumber\" type=\"text\" maxlength=\"6\" style=\"width:189.7px\"></div>" +
        "" +
        "            <input id='btnSendRequest' style=\"margin-top: 20px; width: 150px;align-self: center\" type=\"button\" value=\"Pošalji zahtjev\" onclick='sendRequest()'>" +
        "" +
        "" +
        "        </div>" +
        "    </div>";
}



function institutionCheck()
{
    code = document.getElementById("txtInstitutionId").value;
    fetch("https://localhost:44373/api/institutioncheck/" +code +"")
        .then(response => response.json())
        .then(data => retrieveInstitution(data));
}


function retrieveInstitution(data)
{
    if(data.length>0) {

        document.cookie = "institutionName="+data[0]['naziv']+"";
        document.cookie = "institutionId="+data[0]['zdravstvenaUstanovaId']+"";
console.log(getCookie("institutionId"));
        document.getElementById("btnVerification").style.display="none";
        document.getElementById("lblID").style.display="none";
        document.getElementById("txtInstitutionId").style.display="none";
        document.getElementById("requestInfo").style.display="flex";

        document.getElementById("institutionName").innerText=getCookie("institutionName");

    }
    else {
        alert("Pogrešan kod!");

    }


}


function sendRequest() {
    let today = new Date().toISOString().slice(0, 10)

    const item = {
        krvnaGrupaZahtjev: document.getElementById('bloodTypes').value,
        tipKrvnogDerivata: document.getElementById('typeOfBloodDonation').value,
        zahtjevanaKolicina: document.getElementById("txtDoseNumber").value,
        datumPodnosenjaZahtjeva: today,
        zdravstvenaUstanovaId: getCookie("institutionId")
    };


    fetch("https://localhost:44373/api/zahtjev", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .catch(error => console.error('Greska.', error));


    document.cookie = "institutionName=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie="institutionId=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    document.getElementById("lblID").style.display="block";
    document.getElementById("txtInstitutionId").style.display="block";
    document.getElementById("btnVerification").style.display="block";
    document.getElementById("requestInfo").style.display="none";
    document.getElementById("txtInstitutionId").value="";
    alert("Uspješno ste poslali zahtjev!!!");

    aboutInfo();

}





function getDonorHistory(){
    var user = getCookie("userId");

    fetch("https://localhost:44373/api/joindonacijadonor/" +user +"")
        .then(response => response.json())
        .then(data => retrieveHistory(data));
}

function retrieveHistory(data)
{
    document.getElementById("donorHistoryUl").innerHTML="";
  //  var ul = document.createElement("ul");
    //ul.setAttribute('id', "donorHistoryUl");
console.log(data);
    if(data.length>0) {
        var i;
        for (i = 0; i < data.length; i++) {
            var li = document.createElement("li");
            li.setAttribute('class', "donorHistoryLi");
            txtNode = document.createTextNode(parseDate(data[0]["datumDoniranja"]));
            li.appendChild(txtNode);
            document.getElementById("donorHistoryUl").appendChild(li);

        }

    }

}
