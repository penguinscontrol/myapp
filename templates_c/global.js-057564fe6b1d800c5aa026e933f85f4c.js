if(typeof(window.console)=='undefined'){window.console={log:function(str){}};}if(typeof(window.__xatajax_included__)!='object'){window.__xatajax_included__={};};if(typeof(window.__xatajax_included__['xataface/modules/g2/global.js'])=='undefined'){window.__xatajax_included__['xataface/modules/g2/global.js']=true;if(typeof(window.__xatajax_included__['xatajax.actions.js'])=='undefined'){window.__xatajax_included__['xatajax.actions.js']=true;if(typeof(window.__xatajax_included__['xatajax.form.core.js'])=='undefined'){window.__xatajax_included__['xatajax.form.core.js']=true;(function(){var $=jQuery;XataJax.form={findField:findField,createForm:createForm,submitForm:submitForm};function findField(startNode,fieldName){var parentGroup=$(startNode).parents('.xf-form-group').get(0);if(!parentGroup)parentGroup=$(startNode).parents('form').get(0);if(!parentGroup)return null;var fld=$('[data-xf-field="'+fieldName+'"]',parentGroup).get(0);return fld;}
function createForm(method,params,target,action){if(typeof(action)=='undefined')action=DATAFACE_SITE_HREF;var form=$('<form></form>').attr('action',action).attr('method',method);if(target)form.attr('target',target);$.each(params,function(key,value){form.append($('<input/>').attr('type','hidden').attr('name',key).attr('value',value));});return form;}
function submitForm(method,params,target,action){var form=createForm(method,params,target,action);$('body').append(form);form.submit();}})();}
(function(){var $=jQuery;if(typeof(XataJax.actions)=='undefined'){XataJax.actions={};}
XataJax.actions.doSelectedAction=doSelectedAction;XataJax.actions.handleSelectedAction=handleSelectedAction;XataJax.actions.hasRecordSelectors=hasRecordSelectors;XataJax.actions.getSelectedIds=getSelectedIds;function getSelectedIds(container,asString){if(typeof(asString)=='undefined')asString=false;var ids=[];var checkboxes=$('input.rowSelectorCheckbox',container);checkboxes.each(function(){if($(this).is(':checked')&&$(this).attr('xf-record-id')){ids.push($(this).attr('xf-record-id'));}});if(asString)return ids.join("\n");return ids;}
function doSelectedAction(params,container,confirmCallback,emptyCallback){var ids=[];var checkboxes=$('input.rowSelectorCheckbox',container);checkboxes.each(function(){if($(this).is(':checked')&&$(this).attr('xf-record-id')){ids.push($(this).attr('xf-record-id'));}});if(ids.length==0){if(typeof(emptyCallback)=='function'){emptyCallback(params,container);}else{alert('No records are currently selected.  Please first select the records that you wish to act upon.');}
return;}
if(typeof(confirmCallback)=='function'){if(!confirmCallback(ids)){return;}}
params['--selected-ids']=ids.join("\n");XataJax.form.submitForm('post',params);}
function hasRecordSelectors(container){return($('input.rowSelectorCheckbox',container).size()>0);}
function handleSelectedAction(aTag,selector){var href=$(aTag).attr('href');var confirmMsg=$(aTag).attr('data-xf-confirm-message');var confirmCallback=null;if(confirmMsg){confirmCallback=function(){return confirm(confirmMsg);};}
var params=XataJax.util.getRequestParams(href);XataJax.actions.doSelectedAction(params,$(selector),confirmCallback);return false;}})();}
if(typeof(window.__xatajax_included__['xataface/modules/g2/advanced-find.js'])=='undefined'){window.__xatajax_included__['xataface/modules/g2/advanced-find.js']=true;(function(){var $=jQuery;$(document).ajaxError(function(e,xhr,settings,exception){if(!console)return;console.log(e);console.log(xhr);console.log(settings);console.log(exception);});var g2=XataJax.load('xataface.modules.g2');g2.AdvancedFind=AdvancedFind;function AdvancedFind(o){this.table=$('meta#xf-meta-tablename').attr('content');this.el=$('<div>').addClass('xf-advanced-find').css('display','none').get(0);$.extend(this,o);this.loaded=false;this.loading=false;this.installed=false;}
$.extend(AdvancedFind.prototype,{load:load,ready:ready,show:show,hide:hide,install:install});function load(callback){callback=callback||function(){};var self=this;$(this.el).load(DATAFACE_SITE_HREF+'?-table='+encodeURIComponent(this.table)+'&-action=g2_advanced_find_form',function(){var params=XataJax.util.getRequestParams();var widgets=[];var formEl=this;$('[name]',this).each(function(){if(params[$(this).attr('name')]){$(this).val(params[$(this).attr('name')]);}
var widget=null;if($(this).attr('data-xf-find-widget-type')){widget=$(this).attr('data-xf-find-widget-type');}else if($(this).get(0).tagName.toLowerCase()=='select'){widget='select';}
if(widget){widgets.push('xataface/findwidgets/'+widget+'.js');}});if(widgets.length>0){XataJax.util.loadScript(widgets.join(','),function(){self.loaded=true;callback.call(self);$('[name]',formEl).each(function(){if(params[$(this).attr('name')]){$(this).val(params[$(this).attr('name')]);}
var widget=null;if($(this).attr('data-xf-find-widget-type')){widget=$(this).attr('data-xf-find-widget-type');}else if($(this).get(0).tagName.toLowerCase()=='select'){widget='select';}
if(widget){var w=new xataface.findwidgets[widget]();w.install(this);}});$('button.xf-advanced-find-clear',formEl).click(function(){$('input[name],select[name]',formEl).val('');return false;});$('button.xf-advanced-find-search',formEl).click(function(){$(this).parents('form').submit();});$(self).trigger('onready');});}else{self.loaded=true;callback.call(self);$(self).trigger('onready');}});}
function ready(callback){if(this.loaded){callback.call(this);}else{$(this).bind('onready',callback);if(!this.loading){this.load();}}}
function install(){if(this.installed)return;$(this.el).insertAfter('a.xf-show-advanced-find');this.installed=true;}
function show(){this.ready(function(){if(!this.loaded)throw"Cannot show advanced find until it is ready.";if(!this.installed)this.install();if(!$(this.el).is(':visible')){$(this.el).slideDown(function(){var x=$(this).offset().left;$(this).width($(window).width()-x-5);});}});}
function hide(){this.ready(function(){if(!this.loaded||!this.installed)return;if($(this.el).is(':visible')){$(this.el).slideUp();}});}})();}
(function(){var $=jQuery;$(document).ready(function(){$('#dataface-sections-left-column').each(function(){var txt=$(this).text().replace(/^\W+/,'').replace(/\W+$/);if(!txt)$(this).hide();});$('#left_column').each(function(){var txt=$(this).text().replace(/^\W+/,'').replace(/\W+$/);if(!txt)$(this).hide();});var resultListTable=$('#result_list').get(0);if(resultListTable){var rowPermissions={};$('input.rowSelectorCheckbox[data-xf-permissions]',resultListTable).each(function(){var perms=$(this).attr('data-xf-permissions').split(',');$.each(perms,function(){rowPermissions[this]=1;});});$('.result-list-actions li.selected-action').each(function(){var perm=$(this).children('a').attr('data-xf-permission');if(perm&&!rowPermissions[perm]){$(this).hide();}});}
$('table.listing > tbody > tr > td span[data-fulltext]').each(function(){var span=this;$(span).addClass('short-text');var moreDiv=null;var td=$(this).parent();while($(td).prop('tagName').toLowerCase()!='td'){td=$(td).parent();}
td=$(td).get(0);$(td).css({});var moreButton=$('<a>').addClass('listing-show-more-button').attr('href','#').html('...').click(showMore).get(0);var lessButton=$('<a href="#" class="listing-show-less-button">...</a>').click(showLess).get(0);function showMore(){var width=$(td).width();if(moreDiv==null){var divContent=null;var parentA=$(span).parent('a');if(parentA.size()>0){divContent=parentA.clone();$('span',divContent).removeClass('short-text').removeAttr('data-fulltext').text($(span).attr('data-fulltext'));}else{divContent=$(span).clone();divContent.removeClass('short-text').text($(span).attr('data-fulltext'));}
var divWidth=width-$(moreButton).width()-10;moreDiv=$('<div style="white-space:normal;"></div>').css('width',divWidth).append(divContent).addClass('full-text').get(0);$(td).prepend(moreDiv);}
$(td).addClass('expanded');return false;}
function showLess(){$(td).removeClass('expanded');return false;}
$(td).append(moreButton);$(td).append(lessButton);});$('table.listing td.row-actions-cell').each(function(){var reqWidth=0;$('.row-actions a',this).each(function(){reqWidth+=$(this).outerWidth(true);});$(this).width(reqWidth);$(this).css({padding:0,margin:0,'padding-right':'5px','padding-top':'3px'});});$(".xf-dropdown a.trigger").each(function(){var atag=this;$(this).parent().find('ul li.selected > a').each(function(){$(atag).append(': '+$(this).text());$(atag).parent().addClass('selected');});}).append('<span class="arrow"></span>').click(function(){var atag=this;if($(this).hasClass('menu-visible')){$(this).removeClass('menu-visible');$(this).parent().find(">ul").slideUp('slow');$('body').unbind('click.xf-dropdown');}else{$(this).addClass('menu-visible');$(this).parent().find(">ul").each(function(){if($(atag).hasClass('horizontal-trigger')){var pos=$(atag).position();$(this).css('top',0).css('left',20);}
$(this).css('z-index',10000);}).slideDown('fast',function(){$('body').bind('click.xf-dropdown',function(){$(atag).trigger('click');});}).show();}
return false;}).hover(function(){$(this).addClass("subhover");},function(){$(this).removeClass("subhover");});var hasResultListCheckboxes=XataJax.actions.hasRecordSelectors($('.resultList'));var hasRelatedListCheckboxes=XataJax.actions.hasRecordSelectors($('.relatedList'));$('.selected-action a').each(function(){if(!hasResultListCheckboxes){$(this).parent().hide();}}).click(function(){XataJax.actions.handleSelectedAction(this,'.resultList');return false;});$('.related-selected-action a').each(function(){if(!hasRelatedListCheckboxes){$(this).parent().hide();}}).click(function(){XataJax.actions.handleSelectedAction(this,'.relatedList');return false;});$('.xf-button-bar').each(function(){var bar=this;var container=$(bar).parent();var containerOffset=$(container).offset();if(containerOffset==null)containerOffset={left:0,top:0};var parentWidth=$(container).width();var rightBound=containerOffset.left+parentWidth;var windowWidth=$(window).width();var pos=$(this).offset();var left=pos.left;var screenWidth=$(window).width();var outerWidth=$(this).outerWidth();var excess=outerWidth+pos.left-screenWidth;if(excess>0){var oldWidth=$(this).width();$(this).width(oldWidth-excess);var newWidth=oldWidth-excess;}
$(window).scroll(function(){var container=$(bar).parent();var containerOffset=$(container).offset();if(containerOffset==null)containerOffset={left:0,top:0};var leftMost=containerOffset.left;var rightMost=leftMost+$(container).innerWidth();var currMarginLeft=$(bar).css('margin-left');var scrollLeft=$(window).scrollLeft();if(scrollLeft<left){$(bar).css('margin-left',-30);$(bar).width(Math.min(newWidth+scrollLeft,$(container).innerWidth()-10));}else if(scrollLeft<excess+60){$(bar).css('margin-left',scrollLeft-left-30);}});});$('.list-view-menu').each(function(){var self=this;if($('.action-sub-menu',this).children().size()<2){$(self).hide();}});$('form h3.Dataface_collapsible_sidebar').each(function(){var siblings=$(this).parent().find('>h3.Dataface_collapsible_sidebar:visible');if(siblings.size()<=1)$(this).hide();});$('.xf-save-new-related-record a').click(function(){$('form input[name="-Save"]').click();return false;});$('.xf-save-new-record a').click(function(){$('form input[name="--session:save"]').click();return false;});$('.result-stats').each(function(){if($(this).hasClass('details-stats'))return;var resultStats=this;var isRelated=$(resultStats).hasClass('related-result-stats');var start=$('span.start',this).text().replace(/^\W+/,'').replace(/\W+$/);var end=$('span.end',this).text().replace(/^\W+/,'').replace(/\W+$/);var found=$('span.found',this).text().replace(/^\W+/,'').replace(/\W+$/);var limit=$('.limit-field input').val();start=parseInt(start)-1;end=parseInt(end);found=parseInt(found);limit=parseInt(limit);$(this).css('cursor','pointer');$(this).click(function(){var div=$('<div>').addClass('xf-change-limit-dialog');var label=$('<p>Show <input class="limitter" type="text" value="'+(limit)+'" size="2"/> per page starting at <input type="text" value="'+start+'" class="starter" size="2"/> </p>');$('input.limitter',label).change(function(){var query=XataJax.util.getRequestParams();var limitParam='-limit';if(isRelated){limitParam='-related:limit';}
query[limitParam]=$(this).val();window.location.href=XataJax.util.url(query);}).css({'font-size':'12px'});$('input.starter',label).change(function(){var query=XataJax.util.getRequestParams();var skipParam='-skip';if(isRelated){skipParam='-related:skip';}
query[skipParam]=$(this).val();window.location.href=XataJax.util.url(query);}).css({'font-size':'12px'});div.append(label);var offset=$(resultStats).offset();$('body').append(div);$(div).css({position:'absolute',top:offset.top+$(resultStats).height(),left:Math.min(offset.left,$(window).width()-275),'background-color':'#bbccff','z-index':1000,'padding':'2px 5px 2px 10px','border-radius':'5px'});$(div).show();$(div).click(function(e){e.preventDefault();e.stopPropagation();});function onBodyClick(){$(div).remove();$('body').unbind('click',onBodyClick);}
setTimeout(function(){$('body').bind('click',onBodyClick);},1000);});});$('.details-stats').each(function(){var resultStats=this;var cursor=$('span.cursor',this).text();var found=$('span.found',this).text();cursor=parseInt(cursor);found=parseInt(found);$(this).click(function(){var div=$('<div>').addClass('xf-change-limit-dialog');var label=$('<p>Show <input class="limitter" type="text" value="'+(cursor)+'" size="2"/> of '+found+' </p>');$('input.limitter',label).change(function(){var query=XataJax.util.getRequestParams();query['-cursor']=parseInt($(this).val())-1;window.location.href=XataJax.util.url(query);}).css({'font-size':'12px'});div.append(label);var offset=$(resultStats).offset();$('body').append(div);$(div).css({position:'absolute !important',top:offset.top+$(resultStats).height(),left:Math.min(offset.left,$(window).width()-150),'background-color':'#bbccff','z-index':1000,'padding':'2px 5px 2px 10px','border-radius':'5px'});$(div).show();$(div).click(function(e){e.preventDefault();e.stopPropagation();});function onBodyClick(){$(div).remove();$('body').unbind('click',onBodyClick);}
setTimeout(function(){$('body').bind('click',onBodyClick);},1000);}).css('cursor','pointer');});(function(){var searchField=$('.xf-search-field').parents('form').submit(function(){$(this).find(':input[value=""]').attr('disabled',true);});})();(function(){if(typeof(sessionStorage)=='undefined'){sessionStorage={};}
function parseString(str){var parts=str.split('&');var out=[];$.each(parts,function(){var kv=this.split('=');out[decodeURIComponent(kv[0])]=decodeURIComponent(kv[1]);});return out;}
var currTable=$('meta#xf-meta-tablename').attr('content');if(currTable){var currSearch=$('meta#xf-meta-search-query').attr('content');var currSearchUrl=window.location.href;var searchSelected=false;if(!currSearch){currSearch=sessionStorage['xf-currSearch-'+currTable+'-params'];currSearchUrl=sessionStorage['xf-currSearch-'+currTable+'-url'];}else{searchSelected=true;sessionStorage['xf-currSearch-'+currTable+'-params']=currSearch;sessionStorage['xf-currSearch-'+currTable+'-url']=currSearchUrl;}
if(currSearch){var item=$('<li>');if(searchSelected)item.addClass('selected');var a=$('<a>').attr('href',currSearchUrl).attr('title','View Search results').text('Search Results');item.append(a);$('.tableQuicklinks').append(item);}
var currRecord=$('meta#xf-meta-record-title').attr('content');var currRecordUrl=window.location.href;var recordSelected=false;if(!currRecord){currRecord=sessionStorage['xf-currRecord-'+currTable+'-title'];currRecordUrl=sessionStorage['xf-currRecord-'+currTable+'-url'];}else{recordSelected=true;sessionStorage['xf-currRecord-'+currTable+'-title']=currRecord;sessionStorage['xf-currRecord-'+currTable+'-url']=currRecordUrl;}
var currRecordId=$('meta#xf-meta-record-id').attr('content');if(currRecordId){(function(){$('a.xf-related-record-link[data-xf-related-record-id]').click(function(){var idKey='xf-parent-of-'+$(this).attr('data-xf-related-record-id');var idUrl='xf-parent-of-url-'+$(this).attr('data-xf-related-record-id');var idTitle='xf-parent-of-title-'+$(this).attr('data-xf-related-record-id');sessionStorage[idKey]=currRecordId;sessionStorage[idUrl]=currRecordUrl;sessionStorage[idTitle]=currRecord;return true;});})();}
if(currRecord){var isChildRecord=false;if(currRecordId){(function(){var idKey='xf-parent-of-'+currRecordId;var idUrl='xf-parent-of-url-'+currRecordId;var idTitle='xf-parent-of-title-'+currRecordId;if(sessionStorage[idUrl]){var item=$('<li>');var a=$('<a>').attr('href',sessionStorage[idUrl]).attr('title',sessionStorage[idTitle]).text(sessionStorage[idTitle]);item.append(a);$('.tableQuicklinks').append(item);isChildRecord=true;}})();}
var item=$('<li>');if(recordSelected)item.addClass('selected');var a=$('<a>').attr('href',currRecordUrl).attr('title',currRecord).text(currRecord);if(isChildRecord){$(a).addClass('xf-child-record');}
item.append(a);$('.tableQuicklinks').append(item);}
var g2=XataJax.load('xataface.modules.g2');var advancedFindForm=new g2.AdvancedFind({});function handleShowAdvancedFind(){advancedFindForm.show();$(this).text('Hide Advanced Search');$(this).unbind('click',handleShowAdvancedFind);$(this).bind('click',handleHideAdvancedFind);};function handleHideAdvancedFind(){advancedFindForm.hide();$(this).text('Advanced Search');$(this).unbind('click',handleHideAdvancedFind);$(this).bind('click',handleShowAdvancedFind);}
$('a.xf-show-advanced-find').bind('click',handleShowAdvancedFind);}})();});})();}
if(typeof(window.__xatajax_included__['Dataface/ResultList.js'])=='undefined'){window.__xatajax_included__['Dataface/ResultList.js']=true;require(DATAFACE_URL+'/js/ajax.js');require(DATAFACE_URL+'/js/Dataface/Record.js');function Dataface_ResultList(){}
Dataface_ResultList.prototype.showRecordDetails=function(img,id){var cell=document.getElementById(id+'-cell');var row=document.getElementById(id+'-row');row.style.display='';img.src=DATAFACE_URL+'/images/treeExpanded.gif';img.onclick=function(){resultList.hideRecordDetails(img,id);};if(!cell.detailsLoaded){cell.detailsLoaded=true;this.http=getHTTPObject();var record=new Dataface_Record(getRecord(id));var url=record.getURL('-action=ajax_view_record_details');this.http.open('GET',url);this.img=img;this.row=row;this.cell=cell;this.id=id;this.http.onreadystatechange=this.handleShowRecordDetails;this.http.send(null);}}
Dataface_ResultList.prototype.handleShowRecordDetails=function(){if(resultList.http.readyState==4){resultList.cell.innerHTML=resultList.http.responseText;if(typeof(df_add_editable_awareness)=='function'){df_add_editable_awareness(resultList.cell);}}}
Dataface_ResultList.prototype.hideRecordDetails=function(img,id){var row=document.getElementById(id+'-row');row.style.display='none';img.src=DATAFACE_URL+'/images/treeCollapsed.gif';img.onclick=function(){resultList.showRecordDetails(img,id);};}
var resultList=new Dataface_ResultList();}
if(typeof(window.__xatajax_included__['list.js'])=='undefined'){window.__xatajax_included__['list.js']=true;(function(){jQuery(document).ready(function($){var resultList=$('#result_list');var thead=$('thead',resultList);var tbody=$('tbody',resultList);var headingRow=$('tr',thead);if(typeof(window.xataface)=='undefined')window.xataface={};window.xataface.query={};var queryJson=resultList.attr('data-xataface-query');if(queryJson)eval('window.xataface.query = '+queryJson+';');var searchRow=$('tr',thead).clone();headingRow.addClass('table-headings');searchRow.hide();$('th',searchRow).html('');$('th.searchable-column',searchRow).each(function(){$(this).html('<div><input class="column-search-field" name="'+$(this).attr('data-column')+'" type="text"/></div>');var fld=$('input',this);var q=xataface.query;if(typeof(q[$(this).attr('data-column')])!='undefined'){fld.val(q[$(this).attr('data-column')]);}});$('th',headingRow).each(function(){$('th[data-column="'+$(this).attr('data-column')+'"]',searchRow).each(function(){$(this).css('padding',0).css('margin',0);$('div',this).css({position:'relative',margin:0,padding:0,width:'auto',height:'1.5em'});var width=$('div',this).width();var height=$('div',this).height();$('input',this).css({position:'absolute',padding:0,margin:0,top:0,left:0,right:0,bottom:0});});});$('th.searchable-column',headingRow).each(function(){var th=this;var width=$(th).width();$(th).click(function(){if(searchRow.is(':visible')){searchRow.hide();searchRow.css('display','none');}else{searchRow.show();searchRow.css('display','');$(searchRow).each(function(){$('div',this).each(function(){var width=$(this).width();$('input',this).animate({width:width-2},500);});});$('th input',searchRow).each(function(){if($(this).attr('name')==$(th).attr('data-column')){$(this).focus();$(this).select();}});}});$('a',th).click(function(e){e.stopPropagation();});});$('th.searchable-column input',searchRow).keypress(function(e){var code=(e.keyCode?e.keyCode:e.which);if(code==13){submitSearch();e.preventDefault();}});thead.append(searchRow);function submitSearch(){var query=xataface.query;$('th.searchable-column input',searchRow).each(function(){query[$(this).attr('name')]=$(this).val();});var search=window.location.search;if(!search)search='?';var terms=search.substring(1).split('&');var out=[];var query2=query;$.each(terms,function(){var parts=this.split('=');if(parts.length<=1)out.push(this);if(typeof(query[decodeURIComponent(parts[0])])!='undefined'){parts[1]=encodeURIComponent(query[decodeURIComponent(parts[0])]);delete query2[decodeURIComponent(parts[0])];}
if(parts[1]){out.push(parts[0]+'='+parts[1]);}});$.each(query2,function(k,v){out.push(encodeURIComponent(k)+'='+encodeURIComponent(v));});search='?'+out.join('&');window.location.search=search;}});})();}
if(typeof(XataJax)!="undefined")XataJax.ready();