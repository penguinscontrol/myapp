<?php
class tables_psth {
function image_url__htmlValue(&$record){
	$image_url = 'figures/' . $record->val('image_url');
     return '<img src="' . $image_url . '" width="800" alt="psth"/>';
	}

function image_url__renderCell( &$record ){
	$image_url = 'figures/' . $record->val('image_url');
     return '<img src="' . $image_url . '" width="800" alt="psth"/>';
	 }
}
?>