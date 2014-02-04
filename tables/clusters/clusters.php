<?php
class tables_clusters {
function __sql__(){
return "SELECT c.* , r.recording_id
	FROM clusters c
	INNER JOIN sorts s ON c.sort_fid = s.sort_id
	INNER JOIN recordings r ON s.recording_fid = r.recording_id";
}
function average_wvfrm__htmlValue(&$record){
	$image_url = 'figures/' . $record->val('average_wvfrm');
     return '<img src="' . $image_url . '" width="800" alt="waveform"/>';
	}
function isi__htmlValue(&$record){
	$image_url = 'figures/' . $record->val('isi');
     return '<img src="' . $image_url . '" width="800" alt="isi"/>';
	}
}
?>