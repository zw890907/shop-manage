<?php
    include("./config.php");
    //查询数据中所有数据
    $sql = "select * from shop";
    //执行$sql语句,得到一个资源类型
    $res = mysql_query($sql);
    //用shop来装查询到的数据
    $shop = array();
    while($row = mysql_fetch_assoc($res)){
        array_push($shop, $row);
    };
    //判断$shop长度为0的话，返回失败
    $json = array (
        "res_code" => 1,
        "res_message" => "查询成功",
        "res_body" => array(
            "data" => $shop
        )
    );
    echo json_encode($json);
    //关闭连接
    mysql_close();
?>