<?php
class conf_ApplicationDelegate {
	function block__custom_javascripts(){
		echo '<script src="js/javascripts.js" type="text/javascript" language="javascript"></script>';
	}
	
	function beforeHandleRequest() {
        $auth =& Dataface_AuthenticationTool::getInstance();
		$user =& $auth->getLoggedInUser();
		$app =& Dataface_Application::getInstance();
		$app->addHeadContent(sprintf('<link rel="stylesheet" type="text/css" href="%s"/>',
		htmlspecialchars(DATAFACE_SITE_URL . '/css/style.css')));
		if ($user and $user->val('Role') == 'end_user' ){

			// Makes sure that a non-admin user cannot access the tables 
			// from the browser. 
			$app->_conf['_disallowed_tables']['hide_admin1'] = 'users';
			$app->_conf['_disallowed_tables']['hide_admin2'] = 'grid';
		}
	}
    function getPermissions(&$record){
        $auth =& Dataface_AuthenticationTool::getInstance();
        $user =& $auth->getLoggedInUser();
        if ( $user and $user->val('Role') == 'admin' ){
			return Dataface_PermissionsTool::getRolePermissions('ADMIN');
		}else if ( $user and $user->val('Role') == 'end_user' ){
			return Dataface_PermissionsTool::getRolePermissions('READ ONLY');
		}
        else return Dataface_PermissionsTool::NO_ACCESS();
    }
	
	function getNavItem($key, $label){
    $auth =& Dataface_AuthenticationTool::getInstance();
    $user =& $auth->getLoggedInUser();
    if ( $user and $user->val('Role') == 'end_user' ){
        if ($key == 'recordings' or $key == 'clusters' or $key == 'sorts' or $key == 'psth'){
            throw new Exception("Use default rendering");
        }
        // Non-admin users can't see any other table.
        return null;
 
    } else {
        throw new Exception("Use default rendering");
		return null;
    }
	}
	
	function getPreferences(){
    return array('hide_update'=>1, //Whether to hide the updated text in the glance lists (e.g. in the view tab, the related records are shown in the left column. This hides the updated text next to each related record.
	'hide_posted_by'=>1, //Whether to hide the posted by text in glance lists (e.g. in the view tab, the related records are shown in the left column. This hides the posted by text next to each related record.
	'show_result_stats'=>1, // Show the result statistics (e.g. found x of y records in table z)
	'show_jump_menu'=>0, //Show he drop-down menu that allows you to "jump" to any record in the found set.
	'show_actions_menu'=>1, //Show New record, Show all, delete, etc..
	'show_resultlist_controller_only_when_needed'=>1, //Sets the resultlist controller (e.g. back/next/results per page/etc...) to only show up if paging is required (i.e. if there are more records than can be shown on one page (according to the '-limit' parameter).
	'result_list_use_geturl'=>1, //Use the getURL() method to link to records in the list view rather than the default (which uses the -cursor parameter).
	'hide_related_sections'=>1, // Hides the sections of the view tab that show the related records. These are the sortable section boxes. Not the related tabs.
	'SummaryList_hideSort'=>1, // The width of the logo to be used as the preview image in summary lists.
	'show_record_tree'=>1, //Show tree to navigate the relationships of this record.
	'show_search'=>1, // Show search field in upper right.
	'disable_ajax_record_details'=>1, //Whether to disable the ajax record details (the '+' sign beside each record in list view that expands to show the record details.
	'hide_record_search'=>1, //Hides the record search form that appears in the view tab. Not to be confused with the find tab.
	'disable_select_rows'=>0, //A value of 1 causes the checkboxes in each row of the list view to be hidden.
	);
	}
}
?>