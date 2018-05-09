<?php

ini_set('display_errors', 0);

function array_orderby()
{
    $args = func_get_args();
    $data = array_shift($args);
    foreach ($args as $n => $field) {
        if (is_string($field)) {
            $tmp = array();
            foreach ($data as $key => $row)
                $tmp[$key] = $row[$field];
            $args[$n] = $tmp;
            }
    }
    $args[] = &$data;
    call_user_func_array('array_multisort', $args);
    return array_pop($args);
}

$json = file_get_contents('../data/users.json');
$data = json_decode($json, true);


$sorted = array_orderby($data, 'solved', SORT_ASC);
//print_r($sorted);


echo json_encode($sorted);


?>