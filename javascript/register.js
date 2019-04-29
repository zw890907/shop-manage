class Register {
    constructor () {
        this.inputUsername = document.querySelector("#inputUsername");
        this.inputPassword = document.querySelector("#inputPassword");
        this.btn = document.querySelector("#btn");
        this.bindEvent();
    }
    bindEvent () {
        this.btn.onclick = () => {
            let username = this.inputUsername.value,
                password = this.inputPassword.value;
            //???可以简单验证（密码强度等）
            //带着数据发送请求
            tools.ajax("post","../api/V1/register.php",{username,password},function(data){
                //console.log(data);
                if(data.res_code === 1){
                    alert(data.res_message);
                    //对数据进行cookie存储
                    tools.cookie("name",JSON.stringify({
                        //解构赋值
                        username,
                        password
                    }),{path : "/"});
                    location.href = "login.html";
                }else{
                    alert(data.res_message);
                }
            })
            return false;//阻止默认事件
        }
    }
}
new Register();