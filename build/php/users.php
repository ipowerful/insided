<?php

/* In actuall project data should sorted by DB.
 * I imitated DB by creating array_orderby() function.
 * Basing on this sorting by date fields in current implementation is incorrect. 
 */ 

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

function filter_by_value ($array, $index, $value){
   if(is_array($array) && count($array)>0) {
      foreach(array_keys($array) as $key) {
         $temp[$key] = $array[$key][$index];

         if (strpos($temp[$key], $value) !== false) {
            $newarray[$key] = $array[$key];
         }
      }
   }
   return $newarray;
 } 

$json = file_get_contents('../data/users.json');
$data = json_decode($json, true);

/*
 * Search
 */ 

$search = filter_var($_GET['search'], FILTER_SANITIZE_STRING);
if ($search != '') {
   $data = filter_by_value($data, 'username', $search);
}


/*
 * Sorting
 */ 

$column = filter_var($_GET['column'], FILTER_SANITIZE_STRING);
$dir = filter_var($_GET['dir'], FILTER_SANITIZE_STRING);

if( ($column != '') && ($dir != '') ) {

   // here is column var checks ...

   $sortDir = ($dir == 'asc') ? SORT_ASC : SORT_DESC;

   $sortedData = array_orderby($data, $column, $sortDir);
} else {
   $sortedData = $data;
}


echo json_encode($sortedData);


?>