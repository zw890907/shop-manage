# 伟强店铺管理系统

### 系统功能

* 登录
* 注册
* 商品展示
* 商品修改
* 商品删除
* 商品录入

### 使用的技术	

* HTML5
* CSS3
* javascrript
* ajax
* bootstrap
* php
* mysql

### 接口文档

##### 查询所有数据

* url : api/v1/select.php

* method : get

* query : null

* data ： {

  ​	res_code : 1, // 1代表成功，0代表失败,

  ​	res_message : "添加成功" || "网络错误，添加失败，请重试",

  ​	res_body : {

  ​		date : [

  ​			{id,name,price,num},

  ​			{id,name,price,num}

  ​		]

  ​	}

  }

##### 添加商品接口

* url ： api/V1/insert.php

* method : get

* query : {name,price,num}

* data : {

  ​	res_code : 1, // 1代表成功，0代表失败,

  ​	res_message : "添加成功" || "网络错误，添加失败，请重试",

  ​	res_body : {

  ​		date : [

  ​			{id,name,price,num},

  ​		]

  ​	}

  }







