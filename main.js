const login = document.getElementById("login");
const register = document.getElementById("register");

const r_username = document.getElementById("r-username");
const r_mail = document.getElementById("r-mail");
const r_phone = document.getElementById("r-phone");
const r_pass = document.getElementById("r-password");
const r_c_pass = document.getElementById("r-c-password");

let usuarios = [];

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
        alert("Este campo no puede estar vacio");
        event.preventDefault();
        return;
    }

    if(name.indexOf(" ") != -1){
        alert("Solo puedes poner un nombre sin espacios.");
        event.preventDefault();
        return;
    }
    const pattern = new RegExp('^[A-Z]+$', 'i');
    
    if (!pattern.test(name)) {
        alert("Solo puedes poner caracteres alfabéticos (a-z / A-Z).")
        return;
    }
}