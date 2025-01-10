const login = document.getElementById("login");
const register = document.getElementById("register");

const r_username = document.getElementById("r-username");
const r_mail = document.getElementById("r-mail");
const r_phone = document.getElementById("r-phone");
const r_pass = document.getElementById("r-password");
const r_c_pass = document.getElementById("r-c-password");
const l_mail = document.getElementById("l-mail");
const l_pass = document.getElementById("l-password");

function cambiar(objetivo){
    switch (objetivo) {
        case "register":
            login.style.display = "none";
            register.style.display = "flex";
            register.style.flexDirection = "column";
            break;
        case "login":
            login.style.display = "flex";
            login.style.flexDirection = "column";
            register.style.display = "none";
            resetForm();
            break;
    }
}

function valRegister(){
    let name = r_username.value;
    let mail = r_mail.value;
    let phone = r_phone.value;
    let pass = r_pass.value;
    let cpass = r_c_pass.value;

    if(name === ""){
        displayError("empty", "Nombre")
        event.preventDefault();
        return;
    }

    if(mail === ""){
        displayError("empty", "Correo electrónico")
        event.preventDefault();
        return;
    }

    if(phone === ""){
        displayError("empty", "Número de teléfono")
        event.preventDefault();
        return;
    }

    if(pass === ""){
        displayError("empty", "Contraseña")
        event.preventDefault();
        return;
    }
    
    if(haveSpaces(name)){
        displayError("space", "Nombre");
        event.preventDefault();
        return;
    }

    if(haveSpaces(mail)){
        displayError("space", "Correo electrónico");
        event.preventDefault();
        return;
    }

    if(haveSpaces(phone)){
        displayError("space", "Número de teléfono");
        event.preventDefault();
        return;
    }

    if(haveSpaces(pass)){
        displayError("space", "Contraseña");
        event.preventDefault();
        return;
    }
    
    const pattern = new RegExp('^[A-Z]+$', 'i');
    
    if (!pattern.test(name)) {
        displayError("numName", "Nombre")
        event.preventDefault();
        return;
    }

    if(name.length > 30){
        displayError("maxCharsName", "Nombre");
        event.preventDefault();
        return;
    }

    if(pass.length < 8 || pass.length > 16){
        displayError("passNum", "Contraseña");
        event.preventDefault();
        return;
    }

    if(pass !== cpass){
        displayError("diffPass", "Contraseñas");
        event.preventDefault();
        return;
    }

    const patternNums = new RegExp("^\\d+$"); 

    if (!patternNums.test(phone)) {
        displayError("phoneNoNum", "Número de teléfono");
        event.preventDefault();
        return;
    }

    if(phone.length < 9 || phone.length > 15){
        displayError("phoneNum", "Número de teléfono");
        event.preventDefault();
        return;
    }

    const emailCheck = [
        "gmail.com",
        "hotmail.com",
        "hotmail.es",
        "yahoo.com",
        "yahoo.es",
        "outlook.com",
        "outlook.es",
        "icloud.com",
        "live.com",
        "protonmail.com",
        "aol.com",
        "zoho.com",
        "mail.com",
        "gmx.com"
    ];

    let checkMail = false;

    emailCheck.forEach(domain => {
        if(mail.includes("@" + domain, (mail.length - domain.length - 1))){
            checkMail = true;
        }
    });

    if(!checkMail){
        displayError("mailFormat", "Correo electrónico");
        event.preventDefault();
        return;
    }

    const checkPass = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$");

    if(!checkPass.test(pass)){
        displayError("passRestrict", "Contraseña");
        event.preventDefault();
        return;
    }

    let user = {
        name: name,
        mail: mail,
        phone: phone,
        pass: pass
    }

    console.log(user);

    fetch('userRegister.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Respuesta del servidor:', result);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function haveSpaces(data){
    if(data.indexOf(" ") != -1){
        return true;
    } else {
        return false;
    }
}

function displayError(type, name=""){
    switch (type) {
        case "space":
            console.log(`Error en el campo \"${name}\": No se admiten espacios en este campo.`);
            break;
        case "empty":
            console.log(`Error en el campo \"${name}\": No puede estar vacío.`)
            break;
        case "diffPass":
            console.log(`Error de ${name}: Los campos no coinciden.`)
            break;
        case "passNum":
            console.log(`Error de ${name}: Debe tener entre 8 y 16 caracteres.`)
            break;
        case "phoneNoNum":
            console.log(`Error de ${name}: Solo se admiten caracteres numéricos.`)
            break;
        case "phoneNum":
            console.log(`Error de ${name}: Solo se admiten números de 9 a 15 dígitos.`)
            break;
        case "maxChars":
            console.log(`Error en ${name}: Solo se admiten hasta 30 caracteres.`);
            break;
        case "numName":
            console.log(`Error en ${name}: Solo se admiten caracteres alfabéticos.`);
            break;
        case "mailFormat":
            console.log(`Error en ${name}: El formato no es correcto.`);
            break;
        case "maxCharsName":
            console.log(`Error en ${name}: Solo se admiten hasta 30 caracteres.`)
            break;
        case "passRestrict":
            console.log(`Error en ${name}: Debe tener al menos una letra mayúscula, una letra minúscula y un número.`)
            break;
    }
}

function iniciarSesion(){

//actualizar
    let mail = l_mail.value;
    let pass = l_pass.value;

    if(usuarios.has(mail) && usuarios.get(mail)[0] === pass){
        console.log('Inicio de sesion correcto');
    }
}

function resetForm(){
    r_username.value = "";
    r_mail.value = "";
    r_phone.value = "";
    r_pass.value = "";
    r_c_pass.value = "";
    l_mail.value = "";
    l_pass.value = "";
}