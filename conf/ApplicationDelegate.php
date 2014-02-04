<?php
class conf_ApplicationDelegate {
	function block__custom_javascripts(){
		echo '<script src="js/javascripts.js" type="text/javascript" language="javascript"></script>';
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
}
?>