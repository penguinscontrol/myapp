<?php
class tables_users {
	function getPermissions(&$record){
        $auth =& Dataface_AuthenticationTool::getInstance();
        $user =& $auth->getLoggedInUser();
        if ( $user and $user->val('Role') == 'admin' ){
			return Dataface_PermissionsTool::getRolePermissions('ADMIN');
		}
        else return Dataface_PermissionsTool::NO_ACCESS();
	}
}
?>