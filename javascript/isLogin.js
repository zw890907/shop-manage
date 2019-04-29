let username = tools.cookie("username");
let unlogin = document.querySelector("#unlogin-ul"),
    login = document.querySelector("#login-ul"),
    span = document.querySelector("#name-span"),
    logOut = document.querySelector("#log-out");
    console.log(logOut);
if(username){
    unlogin.classList.add("hidden");
    login.classList.remove("hidden");
    span.innerHTML = username;
}
logOut.onclick = function () {
    window.location.href = "html/login.html";
    //window.open = "../html/login.html";
}