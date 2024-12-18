const login = document.getElementById("login");
const register = document.getElementById("register");

const r_username = document.getElementById("r-username");
const r_mail = document.getElementById("r-mail");
const r_phone = document.getElementById("r-phone");
const r_pass = document.getElementById("r-password");
const r_c_pass = document.getElementById("r-c-password");
const l_mail = document.getElementById("l-mail");
const l_pass = document.getElementById("l-password");

let usuarios = new Map();

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
        console.log("Solo puedes poner caracteres alfabéticos (a-z / A-Z).")
        event.preventDefault();
        return;
    }

    if(pass.length < 8 || pass.length > 16){
        displayError("passNum");
        event.preventDefault();
        return;
    }

    if(pass !== cpass){
        displayError("diffPass");
        event.preventDefault();
        return;
    }

    const patternNums = new RegExp("^\\d+$"); 

    if (!patternNums.test(phone)) {
        displayError("phoneNoNum");
        event.preventDefault();
        return;
    }

    if(phone.length != 9){
        displayError("phoneNum");
        event.preventDefault();
        return;
    }

    console.log("Registrado correctamente");
    usuarios.set(mail, [pass, name, phone]);
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
            console.log(`Error de contraseñas: Los campos no coinciden.`)
            break;
        case "passNum":
            console.log(`Error de contraseña: Debe tener entre 8 y 16 caracteres.`)
            break;
        case "phoneNoNum":
            console.log(`Error de Número de teléfono: Solo se admiten caracteres numéricos.`)
            break;
        case "phoneNum":
            console.log(`Error de Número de teléfono: Solo se admiten números +34 de 9 dígitos.`)
            break;
    }
}

function iniciarSesion(){
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