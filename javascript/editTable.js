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
        //???考虑后台数据的修改
        //找到所有的span(集合），并将修改的值赋给span
        let aSpan = Array.from(tr.querySelectorAll("span"));
        aSpan.forEach(span => {
            span.innerHTML = span.nextElementSibling.value;
        })
        //给tr增加class名
        tr.classList.remove("edit");
    }
    btnDelClick (tr) {
        //???考虑后台数据的删除
        //移除当前tr
        if(confirm("确定删除吗？")){
            tr.remove();
        }
    }
    btnCancelClick (tr) {
        tr.classList.remove("edit");
    }
}
new EditTable ("#tbody");