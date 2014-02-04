<?php
class tables_recordings {
	function getTitle(&$record){
		return $record->val('a_file');
	}
}
?>