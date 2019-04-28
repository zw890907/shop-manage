class SelectList {
    constructor (tbody) {
        this.tbody = document.querySelector(tbody);
        this.init();
    }
    init () {
        tools.ajaxGetPromise("api/V1/select.php").then(data => {
            //console.log(data.res_body.data);
            //判断如果查询成功，则使用render方法进行数据库的渲染
            if(data.res_code === 1){
                //表示成功，调用render方法
                this.render(data.res_body.data);
            }
        })
    }
    render (list) {
        //进行渲染
        let html = "";
        list.forEach(shop => {
            html += `
                <tr>
                    <td>${shop.id}</td>
                    <td>${shop.name}</td>
                    <td>
                        <span>${shop.price}</span>
                        <input type="text">
                    </td>
                    <td>
                        <span>${shop.num}</span>
                        <input type="text">
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
new SelectList ("#tbody");