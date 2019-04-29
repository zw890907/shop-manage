class Pagination {
    constructor () {
        this.ul = document.querySelector("#page-ul");
        this.next = document.querySelector("#page-next");
        this.bindEvents();
    }
    render (selectList) {
        //将selectList.js中传过来的this占为己有
        this.selectList = selectList;
        //把上一次生成的分页删除
        Array.from(this.ul.querySelectorAll(".page-li")).forEach(li => {
            li.remove();
        })
        //根据总页数来生成页码的li,渲染到页面中
        for(let i = 1;i <= this.selectList.allPage;i++){
            let li = document.createElement("li");
            li.className = i === this.selectList.pageIndex ? "active page-li" : "page-li";
            li.innerHTML = `
                <a href="javascript:;" class="page">${i}</a>
            `;
            //把li添加到next之前
            this.ul.insertBefore(li,this.next);
        }
    }
    bindEvents () {
        this.ul.onclick = e => {
            let target = e.target || e.srcElement;
            //let targetClass = Array.from(target.classList);
            let targetClass = [...target.classList];
            if(targetClass.includes("page")){
                //点击了页码数的分页
                //selectList中的init方法就是根据分页码进行渲染
                //target.innerHTML是一个字符串
                this.selectList.pageIndex = Number(target.innerHTML);
                this.selectList.init();
            }else if(targetClass.includes("prev")){
                if(--this.selectList.pageIndex < 1){
                    this.selectList.pageIndex = 1;
                    return;//后面的不执行了
                }
                this.selectList.init();
            }else if(targetClass.includes("next")){
                if(++this.selectList.pageIndex > this.selectList.allPage){
                    this.selectList.pageIndex = allPage;
                    return;//后面的不执行了
                }
                this.selectList.init();
            }
        }
    }
}
let pagination = new Pagination();