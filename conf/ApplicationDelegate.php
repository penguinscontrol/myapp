<?php
class conf_ApplicationDelegate {
	function block__custom_javascripts(){
		echo '<script src="js/javascripts.js" type="text/javascript" language="javascript"></script>';
	}
	
	function beforeHandleRequest() {
        $auth =& Dataface_AuthenticationTool::getInstance();
		$user =& $auth->getLoggedInUser();
		if ($user and $user->val('Role') == 'end_user' ){
			$app =& Dataface_Application::getInstance();

			// Makes sure that a non-admin user cannot access the tables 
			// from the browser. 
			$app->_conf['_disallowed_tables']['hide_admin1'] = 'users';
			$app->_conf['_disallowed_tables']['hide_admin2'] = 'grid';
			$app->_conf['_disallowed_tables']['hide_admin3'] = 'psth';
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
        switch ($key){
            // non-admin users can see these
            case 'recordings':
                throw new Exception("Use default rendering");
            case 'clusters':
                throw new Exception("Use default rendering");
			case 'sorts':
                throw new Exception("Use default rendering");
        }
        // Non-admin users can't see any other table.
        return null;
 
    } else {// admins can just see anything
        throw new Exception("Use default rendering");
		return null;
    }
}
}
?>