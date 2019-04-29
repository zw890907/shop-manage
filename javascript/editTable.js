class EditTable {
    constructor (tbody) {
        this.tbody = document.querySelector(tbody);
        this.bindEvents();
    }
    //给四个修改按钮绑定事件，（不确定因素）事件委托
    bindEvents () {
        this.tbody.onclick = e => {
             e = e || window.event;
            let target = e.target || e.srcElement;
            //后面都需要用到tr，直接在这里找一次就行
            let tr = target.parentNode.parentNode;
            //找到当前事件源的所有class名(是个集合，转成数组)
            let classList = Array.from(target.classList);
            if(classList.includes("btn-edit")){
                //调用编辑方法,并将tr进行传参使用
                this.btnEditClick (tr);
                //console.log(classList);
            }else if(classList.includes("btn-ok")){
                //调用确定方法,并将tr进行传参使用
                this.btnOkClick (tr);
                //console.log(classList);
            }else if(classList.includes("btn-del")){
                //调用删除方法,并将tr进行传参使用
                this.btnDelClick (tr);
            }else if(classList.includes("btn-cancel")){
                //调用取消方法,并将tr进行传参使用
                this.btnCancelClick (tr);
            }
        }
    }
    btnEditClick (tr) {
        //找到所有的span(集合），并将值赋给其兄弟元素input
        let aSpan = Array.from(tr.querySelectorAll("span"));
        aSpan.forEach(span => {
            span.nextElementSibling.value = span.innerHTML;
        })
        //给tr增加class名
        tr.classList.add("edit");
        //console.log(tr);
    }
    btnOkClick (tr) {
        //点击确定后，先将数据传给后台进行修改(与后台商量接口)
        let inputPrice = tr.querySelector(".inputPrice"),
            inputNum = tr.querySelector(".inputNum"),
            id = tr.getAttribute("data-id");
        let price = inputPrice.value,
            num = inputNum.value;
        tools.ajaxGetPromise("api/V1/update.php",{id,price,num}).then(data => {
            //console.log(data);
            if(data.res_code === 1){
                alert(data.res_message);
                inputPrice.previousElementSibling.innerHTML = inputPrice.value;
                inputNum.previousElementSibling.innerHTML = inputNum.value;
                //给tr增加class名
                tr.classList.remove("edit");
            }else{
                alert(data.res_message);
            }
        })
        
        //找到所有的span(集合），并将修改的值赋给span
        // let aSpan = Array.from(tr.querySelectorAll("span"));
        // aSpan.forEach(span => {
        //     span.innerHTML = span.nextElementSibling.value;
        // })
        
    }
    btnDelClick (tr) {
        //后台数据应该先删除，然后在渲染到页面
        if(confirm("确定删除吗？")){
            //先找到当前tr的id
            let id = tr.getAttribute("data-id");
            tools.ajaxGetPromise("api/V1/delete.php",{id}).then(data => {
                //console.log(data);
                if(data.res_code === 1){
                    alert(data.res_message);
                    //移除当前tr
                    //tr.remove();
                    //后台数据操作完成，前端重新获取
                    getShop.init();
                }else{
                    alert(data.res_message); 
                }
            })
        }
    }
    btnCancelClick (tr) {
        tr.classList.remove("edit");
    }
}
new EditTable ("#tbody");