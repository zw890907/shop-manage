class AddShop {
    constructor () {
        //获取弹框中的input和btn
        this.inputName = document.querySelector("#inputName");
        this.inputPrice = document.querySelector("#inputPrice");
        this.inputNum = document.querySelector("#inputNum");
        this.btn = document.querySelector("#btn-addShop");
        this.bindEvents();
    }
    bindEvents () {
        this.btn.onclick = () => {
            let name = this.inputName.value,
                price = this.inputPrice.value,
                num = this.inputNum.value;
            //先验证表单是否为空
            if(name === "" || price === "" || num === ""){
                alert("输入不能为空!");
                return;//终止
            }
            tools.ajaxGetPromise("api/V1/insert.php",{name,price,num}).then(data => {
                //console.log(data);
                //判断是否添加成功
                if(data.res_code === 1){
                    //添加成功
                    alert(data.res_message);
                    //将上一次的添加记录删除
                    this.inputName.value = this.inputPrice.value = this.inputNum.value = "";
                    //让模态层隐藏
                    
                }
            })
        }
    }
}
new AddShop ();