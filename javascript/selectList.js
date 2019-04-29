class SelectList {
    constructor (tbody) {
        this.tbody = document.querySelector(tbody);
        //默认当前页码为1
        this.pageIndex = 1;
        //count指一页的数量（value=4），并且不能被修改
        Object.defineProperty(this,"count",{
            writable : false,
            value : 5
        });
        //默认总页码也为1（临时赋值）
        this.allPage = 1;
        this.init();
    }
    init () {
        //将需要传递的参数进行结构赋值
        let {pageIndex,count} = this;
        tools.ajaxGetPromise("api/V1/select.php",{pageIndex,count}).then(data => {
            //console.log(data);
            //判断如果查询成功，则使用render方法进行数据库的渲染
            if(data.res_code === 1){
                //表示成功，调用render方法
                this.render(data.res_body.data);
                this.allPage = data.res_body.allPage;
                //根据总页数来渲染分页和当前处于第几页
                //pagination.render(this.allPage,this.pageIndex);
                //可以直接将new SelectList()传过去(引用传递)
                pagination.render(this);
            }
        })
    }
    render (list) {
        //进行渲染
        let html = "";
        list.forEach((shop,index) => {
            html += `
                <tr data-id="${shop.id}">
                    <td>${(this.pageIndex - 1)*this.count + index + 1}</td>
                    <td>${shop.name}</td>
                    <td>
                        <span>${shop.price}</span>
                        <input type="text" class="inputPrice">
                    </td>
                    <td>
                        <span>${shop.num}</span>
                        <input type="text" class="inputNum">
                    </td>
                    <td>
                        <button type="button" class="btn btn-xs btn-edit btn-success">编辑</button>
                        <button type="button" class="btn btn-xs btn-del btn-danger">删除</button>
                        <button type="button" class="btn btn-xs btn-ok btn-info">确定</button>
                        <button type="button" class="btn btn-xs btn-cancel btn-warning">取消</button>
                    </td>
                </tr>
            `;
        });
        this.tbody.innerHTML = html;
    }
}
let getShop = new SelectList ("#tbody");