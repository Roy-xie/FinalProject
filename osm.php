<?php
require_once('db_connect.php');

if (isset($_POST['action']) && !empty($_POST['action'])) {
    $action = $_POST['action'];
    switch ($action) {
        case 'getdata':
            echo getdata();
            break;
    }
}

function getdata() {
    global $conn;
    global $select_info;
    $position = [];

    $sql = "SELECT * FROM `robber` UNION SELECT * FROM `police_station` UNION SELECT * FROM `monitor` UNION SELECT * FROM `snatch`";

    $stmt = $conn->query($sql);
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);;
    $count = 0;

    foreach ($rows as $key => $value) {
        $position['sign'][$count]['sign_name'] = $value['name'];
        $position['sign'][$count]['sign_address'] = $value['address'];
        $position['sign'][$count]['sign_date'] = $value['date'];
        $position['sign'][$count]['sign_time'] = $value['time'];
        $position['sign'][$count]['sign_department'] = $value['department'];
        $position['sign'][$count]['category'] = $value['category'];
        $position['markerPoint'][$count]['longitude'] = $value['longitude'];
        $position['markerPoint'][$count]['latitude'] = $value['latitude'];

        $count++;
    }

    return json_encode($position);
}

// require_once('db_connect.php');


// if (isset($_POST['action'])) //判別使用哪個function
// {
//     $action = $_POST['action'];
//     switch ($action) {
//         case 'getdata':
//             getdata();
//             break;

//     }


    
// }



// function getdata()
// {
//     global $conn;
//     global $select_info;
//     $position = [];

//     $sql = "SELECT * FROM robber UNION SELECT * FROM police_station UNION SELECT * FROM monitor UNION SELECT * FROM snatch";

//     $stmt = $conn->query($sql);
//     $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);;
//     $count = 0;

//     // 透過迴圈將資料庫資料都丟入到position陣列中，最後透過json_decode將結果傳回給 js
//     foreach ($rows as $key => $value) {
//         $position['sign'][$count]['sign_name'] = $value['name'];
//         $position['sign'][$count]['sign_address'] = $value['address'];
//         $position['sign'][$count]['sign_date'] = $value['date'];
//         $position['sign'][$count]['sign_time'] = $value['time'];
//         $position['sign'][$count]['sign_department'] = $value['department'];
//         $position['sign'][$count]['category'] = $value['category'];
//         $position['markerPoint'][$count]['longitude'] = $value['longitude'];
//         $position['markerPoint'][$count]['latitude'] = $value['latitude'];

//         $count++;
//     }

//     echo json_encode($position);
// }




// function Insert_Users_Pos()
// {
//     $id = isset($_POST['guest_id']) ? $_POST['guest_id']: '';
//     $lat = isset($_POST['lat']) ? $_POST['lat']: '';
//     $lng = isset($_POST['lng']) ? $_POST['lng']: '';
 
//     global $conn;
//     // $input = array(':id' => $id,':lat' => $lat,':lng' => $lng);
//     // $sql = "UPDATE  `user_position`  SET id=:id, lat=:lat, lng=:lng";
//     // $sth = $conn->prepare($sql);
//     // $sth->execute($input);
    
//     $input = array(':id' => $id,':lat' => $lat,':lng' => $lng);
//     $sql = "INSERT INTO `user_position` (id, lat, lng) VALUES(:id,:lat,:lng)";
//     $sth = $conn->prepare($sql);
//     $sth->execute($input);
// }
?>
