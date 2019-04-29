class Login {
    constructor () {
        this.inputUsername = document.querySelector("#inputUsername");
        this.inputPassword = document.querySelector("#inputPassword");
        this.btn = document.querySelector("#btn");
        this.check = document.querySelector("#check");
        this.init();
        this.bindEvent();
    }
    init () {
        this.inputUsername.value = this.inputPassword.value = "";
        //取出cookie中的数据,转为json格式，用一个变量接收
        let userinfo = JSON.parse(tools.cookie("name"));
        this.inputUsername.value = userinfo.username;
        this.inputPassword.value = userinfo.password;
    }
    bindEvent () {
        this.btn.onclick = () => {
            let username = this.inputUsername.value,
                password = this.inputPassword.value;
            //???可以简单验证（密码强度等）
            //带着数据发送请求
            tools.ajax("post","../api/V1/login.php",{username,password},data => {
                //console.log(data);
                if(data.res_code === 1){
                    //将用户名存cookie,并判断会话期
                    if(this.check.checked){
                        tools.cookie("username",username,{expires : 7,path : "/"});
                    }else{
                        tools.cookie("username",username,{path : "/"});
                    }
                    alert(data.res_message);
                    window.location.href = "../index.html";
                }else{
                    alert(data.res_message);
                }
            })
            return false;//阻止默认事件
        }
    }
}
new Login();