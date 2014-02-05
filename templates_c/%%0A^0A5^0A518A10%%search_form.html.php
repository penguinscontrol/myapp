<?php /* Smarty version 2.6.18, created on 2014-02-05 18:17:36
         compiled from xataface/RelatedList/forms/search_form.html */ ?>

<script language="javascript" src="<?php echo $this->_tpl_vars['ENV']['DATAFACE_URL']; ?>
/js/Dataface/RelatedList/search_form.js"></script>
<form action="#" method="get" onsubmit="return Dataface.RelatedList.processSearchForm(this);">
	<label for="related_find_query">Filter Results:</label> 
	<input type="text" name="related_find_query" value="<?php echo $this->_tpl_vars['ENV']['APPLICATION_OBJECT']->getQueryParam('related:search'); ?>
" />
	<input type="submit" name="filter" value="Filter" />
</form>