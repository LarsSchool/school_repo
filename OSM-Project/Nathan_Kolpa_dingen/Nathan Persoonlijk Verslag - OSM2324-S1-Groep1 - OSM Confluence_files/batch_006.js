WRMCB=function(e){var c=console;if(c&&c.log&&c.error){c.log('Error running batched script.');c.error(e);}}
;
try {
/* module-key = 'confluence.web.resources:legacy-editor-global-AVOID-IF-POSSIBLE', location = '/includes/js/amd/shim/confluence-editor-amd.js' */
define("confluence-editor/legacy",["confluence/legacy"],function(a){"undefined"===typeof a&&(a={});"undefined"===typeof a.Editor&&(a.Editor={});return a.Editor});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.web.resources:draft-changes-js', location = '/includes/js/draft-changes.js' */
define("confluence/draft-changes","jquery ajs window confluence/legacy confluence/api/ajax confluence/api/event confluence/api/logger confluence/analytics-support confluence/dark-features confluence/meta confluence/aui-overrides wrm/context-path".split(" "),function(b,d,q,c,v,r,n,k,s,j,t,l){return{init:function(){var a,p=function(a){var c="Are you sure you want to discard these unpublished changes?",f=b("#draft-"+a),h;if(confirm(c)){c=l()+"/rest/api/content/"+a+"?status=draft";h=b.ajax;h({url:c,type:"DELETE",data:{draftId:a},
contentType:"application/json",dataType:"json",success:function(a){if(a&&a.actionErrors){for(var b=["<ul>"],a=a.actionErrors,c=0;c<a.length;c++){n.log("error: "+a[c]);b.push("<li>"+a[c]+"</li>")}b.push("</ul>");d.messages.error("#errors",{title:"Error",body:"There were errors discarding your draft."+" "+b.join("\n")})}else{b=f.closest("table");a=b.closest(".drafts-container");f.remove();b.find("tbody tr").length===0&&a.append('<span id="no-drafts-message">'+
"No drafts found."+"</span>")}},error:function(a){d.messages.error("#errors",{title:"There were errors discarding your draft.",body:a.errors||"An unknown error has occurred. Please check your logs."})}});return true}return false};b("body").on("click",".view-diff-link",function(u){var o=this.id,f=b(this);if(!a){var h=o==="view-diff-link-notification";a=new d.Dialog(860,530,"view-diff-draft-dialog");var e="Unpublished Changes for \u0027{0}\u0027";a.addHeader(e.replace(/\{0\}/,""));e=b(c.Templates.DraftChanges.dialogContent());
a.addPanel("Diff",e);if(h){a.addButton("Edit",function(){a.hide();c.Editor&&c.Editor.Drafts?c.Editor.Drafts.useDraft():q.location=b(this).attr("data-href")},"resume-diff-link");a.addButton("Discard",function(){if(s.isEnabled("editor.ajax.save")&&j.get("remote-user")!==""){c.Editor.SafeSave.Draft.discardDraft(d.params.pageId,j.get("existing-draft-id")).done(c.Editor.SafeSave.Draft.onSuccessDiscardDraft).fail(c.Editor.SafeSave.Draft.onErrorDiscardDraft);a.hide()}else if(c.Editor&&
c.Editor.Drafts){a.hide();c.Editor.Drafts.discardDraft(j.get("existing-draft-id"));k.publish("rte.notification.draft.discard")}else{var g=b(this).data("draftid");p(g)&&a.hide()}},"discard-diff-link")}a.addCancel("Close",function(){a.hide();return false});e.removeClass("hidden")}a.addHeader("Loading");b("#diff-view").html("<tr><td id='draft-changes-waiting-icon'>Loading...</td></tr>");var m,e=f.attr("class"),i=/draftPageId:([^ ]*)/.exec(e),f=i?i[1]:j.get("page-id"),
h=(i=/username:([^ ]*)/.exec(e))?i[1]:j.get("remote-user");m=(i=/draftId:([^ ]*)/.exec(e))?i[1]:null;b.ajax({url:l()+"/draftchanges/viewdraftchanges.action",type:"GET",dataType:"json",data:{pageId:f,username:h},success:function(g){if(g.actionErrors){for(var e="",g=g.actionErrors,f=0;f<g.length;f++){n.log("error: "+g[f]);e=e+"<div>"+g[f]+"</div>"}b("#diff-view").html(e)}else{b("#diff-view").html(g.htmlDiff);e=d.format("Unpublished Changes for \u0027\u0027{0}\u0027\u0027",d.escapeHtml(g.title));a.addHeader(e);a.popup.element.find(".dialog-title").prepend(c.Templates.DraftChanges.helpLink());
b(".resume-diff-link").attr("data-href",l()+"/pages/resumedraft.action?draftId="+m);b(".discard-diff-link").data("draftid",m);t.setVisible("#merge-warning",g.isMergeRequired)}},error:function(a){a=a.errors||"An unknown error has occurred. Please check your logs";b("#diff-view").html(a)}});a.show();r.trigger("analytics",{name:"confluence.editor.view-diff-dialog.open",data:{elementTriggerId:o}});u.stopPropagation();return false});b(".drafts-by-space li.draft-actions-list-item").on("click",".discard-draft-link",
function(a){a.preventDefault();k.publish("confluence.draft-list.discard");a=b(this).data("draftid");p(a)}).on("click",".resume-draft-link",function(){k.publish("confluence.drafts.referrer",{referrerPage:"drafts",lozengeType:"Draft"})})}}});require("confluence/module-exporter").safeRequire("confluence/draft-changes",function(b){require("ajs").toInit(b.init)});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.web.resources:draft-changes-js', location = '/includes/soy/draft-changes-dialog.soy' */
// This file was automatically generated from draft-changes-dialog.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Confluence.Templates.DraftChanges.
 */

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Templates == 'undefined') { Confluence.Templates = {}; }
if (typeof Confluence.Templates.DraftChanges == 'undefined') { Confluence.Templates.DraftChanges = {}; }


Confluence.Templates.DraftChanges.dialogContent = function(opt_data, opt_ignored) {
  return '<div id="draft-changes-dialog" class="hidden"><div id="diff-view" class="wiki-content"></div></div>';
};
if (goog.DEBUG) {
  Confluence.Templates.DraftChanges.dialogContent.soyTemplateName = 'Confluence.Templates.DraftChanges.dialogContent';
}


Confluence.Templates.DraftChanges.helpLink = function(opt_data, opt_ignored) {
  return '' + Confluence.Templates.Dialog.helpLink({href: "https://docs.atlassian.com/confluence/docs-85/Drafts#viewchange"});
};
if (goog.DEBUG) {
  Confluence.Templates.DraftChanges.helpLink.soyTemplateName = 'Confluence.Templates.DraftChanges.helpLink';
}

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.editor:analytics', location = 'analytics/editor-ready-collab-mode-analytics.js' */
define("confluence-editor/analytics/editor-ready-collab-mode-analytics",["ajs","confluence/dark-features","confluence/meta"],function(a,d,b){return{trigger:function(){if(a.Rte&&a.Rte.getEditor()&&(a.$("#editpageform").length||a.$("#createpageform").length)){var c;c="confluence.editor.ready.collab.mode."+(d.isEnabled("site-wide.shared-drafts")?"on":"off");var e=b.get("synchrony-connection-order")?b.get("synchrony-connection-order"):"",f=b.get("synchrony-connection-type")?b.get("synchrony-connection-type"):
"";a.trigger("analyticsEvent",{name:c,data:{connectionOrder:e,connectionType:f}})}}}});require("confluence/module-exporter").safeRequire("confluence-editor/analytics/editor-ready-collab-mode-analytics",function(a){require("ajs").bind("rte-ready",function(){a.trigger()})});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.editor:unpublished-changes', location = 'unpublished-changes/unpublished-changes.soy' */
// This file was automatically generated from unpublished-changes.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Confluence.Templates.UnpublishedChanges.
 */

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Templates == 'undefined') { Confluence.Templates = {}; }
if (typeof Confluence.Templates.UnpublishedChanges == 'undefined') { Confluence.Templates.UnpublishedChanges = {}; }


Confluence.Templates.UnpublishedChanges.lozenge = function(opt_data, opt_ignored) {
  return '<a id="unpublished-changes-lozenge" href="#" class="view-diff-link" title="' + soy.$$escapeHtml(opt_data.tooltip) + '"><span class="aui-lozenge aui-lozenge-complete aui-lozenge-subtle unpublished-changes-lozenge">' + soy.$$escapeHtml(opt_data.label) + '</span></a>';
};
if (goog.DEBUG) {
  Confluence.Templates.UnpublishedChanges.lozenge.soyTemplateName = 'Confluence.Templates.UnpublishedChanges.lozenge';
}

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.editor:unpublished-changes', location = 'unpublished-changes/unpublished-changes.js' */
define("confluence-editor/unpublished-changes/unpublished-changes",["jquery","confluence/legacy","ajs","underscore"],function(d,g,f,h){var k={init:function(a){var e=d(g.Templates.UnpublishedChanges.lozenge({tooltip:f.I18n.getText("editor.unpublished.changes.lozenge.tooltip"),label:f.I18n.getText("editor.unpublished.changes.lozenge.label")})),i=function(b){b=h.isBoolean(b)?b:!0;g.Editor.UI.setButtonState(b,d("#rte-button-publish"))},j=function(b,c){var a=c||function(){};(h.isBoolean(b)?b:1)?e.addClass("visible").fadeIn("fast",
a):e.fadeOut("fast",function(){d(this).hide().removeClass("visible");a()})},c={show:function(){e.hasClass("visible")||j(!0,i)},hide:function(){j(!1);i(!1)}};f.bind("rte-ready",function(){var b=d("#content-title-div");c.hide();e.insertBefore(b);e.tooltip();d("#content-title").on("keydown change",c.show);a.onChange.add(c.show);a.onKeyDown.add(c.show);a.onLoad.add(function(){d(a.startContent).text().trim()&&0<f.Meta.get("draft-id")&&c.show()});e.on("mouseenter.tipsy",function(){f.trigger("analytics",
{name:"confluence.editor.unpublished-changes.lozenge.hover"})});a.addCommand("mceConf.UnpublishedChangesLozenge.show",c.show);a.addCommand("mceConf.UnpublishedChangesLozenge.hide",c.hide)})},getInfo:function(){return{longname:"Unpublished Changes",author:"Atlassian",authorurl:"http://www.atlassian.com"}}};return function(){return k}});
require("confluence/module-exporter").safeRequire("confluence-editor/unpublished-changes/unpublished-changes",function(d){require("tinymce").PluginManager.add("unpublishedchanges",d)});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.editor:editor-shared-resources', location = 'tinymce3/plugins/confluencelist/editor_plugin_src.js' */
define("confluence-editor/tinymce3/plugins/confluencelist/editor_plugin_src",["jquery","ajs","tinymce"],function(b,k,i){var g={init:function(g){g.onKeyDown.add(function(d,g){function j(a){a&&a.lastChild&&!d.dom.isBlock(a.lastChild)&&!b(a.lastChild).is("br")&&b(a).append("<br/>")}if(8===g.keyCode){var a=d.selection.getRng(!0),c=b(a.startContainer).closest("li",d.getBody());if(0!==c.length&&k.EditorUtils.isCursorAtStartOf(c[0],a)){var a=c.prev("li"),e,h=c[0],f;if(0<a.length)return e=a[0],f=b(h.firstChild),
f.is("p")&&(f=f.contents().first()),d.undoManager.beforeChange(),d.undoManager.add(),b(e.lastChild).is("p")&&!d.dom.isBlock(h.firstChild)?(j(e.lastChild),c.contents().each(function(a,c){if(d.dom.isBlock(c))return!1;b(e.lastChild).append(b(c).detach())})):b(h.firstChild).is("p")&&!d.dom.isBlock(e.lastChild)?(j(e),b.each(b.makeArray(a.contents()).reverse(),function(a,c){if(d.dom.isBlock(c))return!1;b(h.firstChild).prepend(b(c).detach())})):j(e),a.append(c.detach().contents()),f[0]&&k.EditorUtils.setCursorAtStartOfContents(f[0]),
d.undoManager.add(),i.dom.Event.cancel(g)}}})},getInfo:function(){return{longname:"Confluence List Plugin",author:"Atlassian",authorurl:"http://www.atlassian.com",version:i.majorVersion+"."+i.minorVersion}}};return function(){return g}});require("confluence/module-exporter").safeRequire("confluence-editor/tinymce3/plugins/confluencelist/editor_plugin_src",function(b){require("tinymce").PluginManager.add("confluencelist",b)});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.editor:editor-shared-resources', location = 'tinymce3/plugins/confluencepastetable/editor_plugin_src.js' */
define("confluence-editor/tinymce3/plugins/confluencepastetable/editor_plugin_src",["jquery","document"],function(f,j){var i={init:function(k){function i(a){var c={id:!0,"class":!0,style:!0,rowspan:!0,colspan:!0,"data-mce-style":!0,"data-mce-bogus":!0,"data-macro-name":!0,"data-macro-parameters":!0,"data-macro-body-type":!0,"data-highlight-colour":!0,"data-highlight-class":!0},d=["highlight","nohighlight","relative-table","fixed-table"],b,e=0,g=[],h=f(a);if(!a||l(a))return a;a&&a.getAttribute&&(b=
a.getAttribute("class"));if(b&&0<=b.indexOf("table-wrap"))if(a=f("table",a),a.length)f(a).unwrap(),a=a[0];else return null;b=a.tagName?"TABLE TR TH TD TBODY THEAD TFOOT COL COLGROUP CAPTION".split(" ").includes(a.tagName):!1;if(b&&a.attributes){for(;e<=a.attributes.length;)(b=a.attributes[e])&&!0===b.specified&&!c[b.name]?a.removeAttribute(b.name):e++;m(a)&&g.push(m(a));c=0;for(e=d.length;c<e;c++)d[c].exec||h.hasClass(d[c])&&g.push(d[c]);(d=h.attr("data-highlight-class"))&&g.push(d);(d=h.attr("data-highlight-colour"))&&
g.push("highlight-"+d);h.attr("class",g.join(" "))}return a}function m(a){if(!a.tagName)return"";switch(a.tagName){case "TABLE":return"confluenceTable";case "TH":return"confluenceTh";case "TD":return"confluenceTd";default:return""}}function l(a){var c="";a&&a.getAttribute&&(c=a.getAttribute("class"));return!a.tagName||"TABLE"!==a.tagName||!c?!1:-1!==c.indexOf("wysiwyg-macro")}function n(a,c,d){for(var a=d.node,c=i,b=a,e="";b;)if("function"===typeof c&&(b=c(b)),b)b.firstChild&&e.parentNode!==b&&!l(b)?
(e=b,b=b.firstChild):b.nextSibling?(e=b,b=b.nextSibling):(e=b,b=b.parentNode);else break;d.node=a}k.on("init",function(){f(j).bind("postPaste",n)});k.on("remove",function(){f(j).unbind("postPaste",n)})},getInfo:function(){return{longname:"ConfluencePasteTablePlugin",author:"Atlassian",authorurl:"http://www.atlassian.com",infourl:"http://www.atlassian.com",version:"1.0"}}};return function(){return i}});
require("confluence/module-exporter").safeRequire("confluence-editor/tinymce3/plugins/confluencepastetable/editor_plugin_src",function(f){require("tinymce").PluginManager.add("confluencepastetableplugin",f)});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.editor:editor-shared-resources', location = 'tinymce3/plugins/confcleanup/editor_plugin_src.js' */
define("confluence-editor/tinymce3/plugins/confcleanup/editor_plugin_src",["tinymce","jquery"],function(f,g){var l={init:function(h){var d=f.Env.browser;if(d.isSafari()||("isChromium"in d?d.isChromium():d.isChrome())){var i={},j=function(a,c){var b=a[c];b||(b={},a[c]=b);return b};g("#format-dropdown").find("ul.aui-dropdown li").each(function(){var a=g("a",this),c=a.css("font-size"),b=a.css("font-weight"),a=a.css("color"),a=j(i,a),b=j(a,b);b[c]||(b[c]=g(this).attr("data-format"))});h.onNodeChange.add(function(a){for(var c=
a.dom.select("span.Apple-style-span",a.dom.doc.body),b=a.dom.select("font.Apple-style-span",a.dom.doc.body),c=c.concat(b),b=0,k=c.length;b<k&&!a.dom.is(c[b],'[face="mceinline"]');b++){var e;a:{e=g(c[b]);var d=i[e.css("color")],f=void 0;if(d&&(f=d[e.css("font-weight")])){e=f[e.css("font-size")];break a}e=null}e&&(d=a.selection.getBookmark(),e&&a.dom.remove(c[b],1),a.selection.moveToBookmark(d),a.execCommand("FormatBlock",!1,e))}})}h.onNodeChange.add(function(a){for(var c=a.dom.select("img",a.dom.doc.body),
b=c.length,d=0;d<b;d++)"file:///"===c[d].src.substr(0,8)&&a.dom.remove(c[d])})},getInfo:function(){return{longname:"ConfluenceCleanupPlugin",author:"Atlassian",authorurl:"http://www.atlassian.com",infourl:"http://www.atlassian.com",version:"1.0"}}};return function(){return l}});require("confluence/module-exporter").safeRequire("confluence-editor/tinymce3/plugins/confcleanup/editor_plugin_src",function(f){require("tinymce").PluginManager.add("confluencecleanupplugin",f)});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-editor-plugin:split_page-editor-quit-dialog', location = 'page-editor-quit-dialog.js' */
(window.atlassianWebpackJsonp1126d6c3ec4535e33734b1025bd581ff=window.atlassianWebpackJsonp1126d6c3ec4535e33734b1025bd581ff||[]).push([["page-editor-quit-dialog"],{96:function(e,i,o){"use strict";o.r(i);var a=o(19),t=o(9);Object(t.a)("confluence-editor/editor/page-editor-quit-dialog",(()=>a.a))}},[[96,"runtime","vendors~core~page-editor-quit-dialog","core~editor-notifications~page-editor-message~page-editor-quit-dialog","core~page-editor-message~page-editor-quit-dialog","core~page-editor-quit-dialog"]]]);
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.reliablesave:reliable-save-conf-frontend', location = 'templates/reliable-save.soy' */
// This file was automatically generated from reliable-save.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Confluence.Templates.Editor.Reliable.
 */

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Templates == 'undefined') { Confluence.Templates = {}; }
if (typeof Confluence.Templates.Editor == 'undefined') { Confluence.Templates.Editor = {}; }
if (typeof Confluence.Templates.Editor.Reliable == 'undefined') { Confluence.Templates.Editor.Reliable = {}; }


Confluence.Templates.Editor.Reliable.draftMessage = function(opt_data, opt_ignored) {
  var output = '<div id="draft-messages">';
  if (opt_data.isNewPage) {
    if (opt_data.existingDraft.title) {
      var escapedTitle__soy8 = '' + soy.$$escapeHtml(opt_data.existingDraft.title);
      output += soy.$$filterNoAutoescape(AJS.format('A new page you were adding on {0} called \x26#8216;{1}\x26#8217; was saved as a draft.',opt_data.existingDraft.date,escapedTitle__soy8));
    } else {
      output += soy.$$filterNoAutoescape(AJS.format('A new page you were adding on {0} was saved as a draft.',opt_data.existingDraft.date));
    }
    output += ' ' + soy.$$filterNoAutoescape(AJS.format('Do you want to {0}resume editing{1} or {2}discard{3} it?','<a href="#" class="use-draft"> ','</a>','<a href="#" class="discard-draft"> ','</a>'));
  } else {
    output += soy.$$filterNoAutoescape(AJS.format('A version of this page you were editing at {0} was saved as a draft.',opt_data.existingDraft.date)) + ((opt_data.mergeRequired) ? ' ' + soy.$$escapeHtml('The page has since been updated. Your changes will be merged with the latest version.') : '') + ((opt_data.conflictFound) ? ' ' + soy.$$filterNoAutoescape(AJS.format('The page has since been updated. The changes made conflict with your changes and cannot be merged. Do you want to {0}view the conflict{1} or {2}discard{3} your changes?','<a href="?pageId=' + opt_data.pageId + '&viewConflict=true&spaceKey=' + opt_data.spaceKey + '" >','</a>','<a href="#" class="discard-draft">','</a>','<a href="' + "" + '/users/viewmydrafts.action">','</a>')) : (opt_data.mergeRequired) ? ' ' + soy.$$filterNoAutoescape(AJS.format('Do you want to {0}view{1}, {2}merge and resume editing{3} or {4}discard{5} it?','<a id="view-diff-link-notification" href="#" class="view-diff-link">','</a>','<a href="#" class="use-draft"> ','</a>','<a href="#" class="discard-draft">','</a>')) : ' ' + soy.$$filterNoAutoescape(AJS.format('Do you want to {0}view the change{1}, {2}resume editing{3} or {4}discard{5} it?','<a id="view-diff-link-notification" href="#" class="view-diff-link">','</a>','<a href="#" class="use-draft"> ','</a>','<a href="#" class="discard-draft">','</a>')));
  }
  output += '</div>';
  return output;
};
if (goog.DEBUG) {
  Confluence.Templates.Editor.Reliable.draftMessage.soyTemplateName = 'Confluence.Templates.Editor.Reliable.draftMessage';
}

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.reliablesave:reliable-save-conf-frontend', location = 'js/reliable-save.js' */
define("confluence-editor-reliable-save/reliable-save","ajs confluence/legacy underscore jquery window document confluence/api/constants confluence-editor/editor/page-editor-message confluence-editor/editor/page-editor-quit-dialog".split(" "),function(a,f,z,h,u,X,x,e,M){function A(){return c.get("shared-drafts")}function B(){return c.getBoolean("new-page")}function C(){f.Editor.UI.toggleSavebarBusy(!1)}function F(g){var l="There was an error processing the request.";e.closeMessages(["generic-error"]);
e.handleMessage("generic-error",{type:"error",message:l},m);a.logError("Generic error: "+JSON.stringify(g))}function m(){var g=h("#draft-messages");0<g.length&&(g.is(":visible")&&a.Confluence.Analytics.publish("rte.notification.draft"),g.find("a.use-draft").click(function(l){l.stopPropagation();l.preventDefault();f.Editor.Drafts.useDraft();a.Confluence.Analytics.publish("rte.notification.draft.resume")}),g.find("a.discard-draft").click(function(l){l.stopPropagation();l.preventDefault();r.Draft.discardDraft(c.get("page-id"),
c.get("existing-draft-id")).done(r.Draft.onSuccessDiscardDraft).fail(r.Draft.onErrorDiscardDraft)}))}function S(){h("#editor-restore-title-link").click(function(g){g.stopPropagation();g.preventDefault();h("#content-title").val(c.get("latest-published-page-title"));e.closeMessages(["rename-during-limited-mode"])})}function G(){c.set("access-mode","READ_ONLY");e.closeMessages(["read-only-mode"]);e.handleMessage("read-only-mode",{title:"This site is read-only",type:"error",
message:"Starting now, any changes you make won\u0027t be saved. We\u0027ll let you know when you can start editing again."});f.Editor.UI.setButtonsState(!0);f.Editor.UI.toggleSavebarBusy(!1);f.Editor.UI.setButtonState(!1,f.Editor.UI.saveButton);f.Editor.UI.setButtonState(!1,f.Editor.UI.cancelButton)}function H(g){var l="Looks like your session expired. Log in again to keep working.\n \u003cdiv\u003e\u003ca href=\u0022dashboard.action\u0022 target=\u0022_blank\u0022\u003eLogin\u003c/a\u003e\u003c/div\u003e";e.closeMessages(["noauthorized"]);e.handleMessage("noauthorized",{title:"Can\u0027t connect to the server",type:"error",message:l},m);g&&a.trigger("rte.safe-save.invalid-xsrf-token")}
function N(){var g="Unable to communicate with server. Saving is not possible at the moment.";e.closeMessages(["server-offline"]);e.handleMessage("server-offline",{type:"error",message:g},m)}var O=[],D=!1,c=require("confluence/meta"),r={Draft:{discardDraft:function(g,l){g={draftId:l,pageId:g,type:c.get("draft-type"),spaceKey:c.get("space-key")};return h.ajax({type:"DELETE",url:x.CONTEXT_PATH+"/rest/tinymce/1/drafts/discard",data:h.toJSON(g),contentType:"application/json",dataType:"json"})},onSuccessDiscardDraft:function(){B()||
c.set("draft-id","0");e.closeMessages(["draft-message"]);e.handleMessage("discarding-successfull",{type:"info",message:"Your draft has been discarded.",close:"auto"},m);a.Confluence.Analytics.publish("rte.notification.draft.discard")},onErrorDiscardDraft:function(g){switch(g.status){case 403:H(!0);break;case 404:e.handleMessage("draft-deleted",{type:"info",message:"This draft has been discarded."},m);break;case 405:G();break;case 422:e.handleMessage("discarding-invalid",
{type:"error",message:"This draft is invalid. It can be deleted by someone or looks like your session expired."},m);break;default:e.handleMessage("discarding-error",{type:"error",message:"An unknown error has occurred. Please check your logs."},m)}}}};r._internal=f.SafeSafe&&f.SafeSave._internal?f.SafeSave._internal:{};r._internal.onSuccessfulResponse=function(g){h("#rte-button-overwrite").unbind("click.overwrite");var l={dataType:"json",contentId:c.get("content-id"),draftType:c.get("draft-type")};a.safe.post(x.CONTEXT_PATH+"/json/stopheartbeatactivity.action",
l,function(){a.log("Stop heartbeat activity on",l.draftType,"id",l.contentId)},"json").fail(function(n,I,J){a.logError("Server error on stop heartbeat activity request:");a.log(J)}).always(function(){var n=g._links.webui;n?0!==n.indexOf("/")?u.location=n:u.location=x.CONTEXT_PATH+n:(f.Editor.isPublishing(!1),C())})};r.resetUnrecoverableEditorError=function(){D=!1};r.initialize=function(){function g(b){C();switch(b.status){case 400:e.closeMessages(["empty-title","duplicate-title","title-too-long",
"legacy-draft-deprecated","utf8-validation-failed"]);0<=b.responseText.indexOf(n.duplicatedTitle)?e.handleMessage("duplicate-title",{type:"error",message:a.format("A page with the title \u0027\u0027{0}\u0027\u0027 already exists in this space. Enter a different title for your page.",a.escapeHtml(h("#content-title").val()))}):0<=b.responseText.indexOf(n.titleTooLong)?e.handleMessage("title-too-long",{type:"error",message:"Title cannot be longer than 255 characters."},m):0<=b.responseText.indexOf(n.publishNewDraftDeprecated)||0<=b.responseText.indexOf(n.existingDraftNotFound)?
c.get("new-page")&&A()&&!f.Editor.hasContentChanged()?(a.trigger("rte.legacy-draft-can-be-migrated"),e.handleMessage("legacy-draft-deprecated",{type:"error",message:a.format("Collaborative editing is here! So that you can keep working on this page, we need to migrate the content to a new draft for you.\u003cbr\u003e \u003ca href={0}\u003eMigrate now\u003c/a\u003e",x.CONTEXT_PATH+"/pages/resumedraft.action?draftId\x3d"+c.get("draft-id"))},m)):(a.trigger("rte.legacy-draft-cannot-be-migrated"),e.handleMessage("legacy-draft-deprecated",{type:"error",message:"Collaborative editing is here! That means we need a little help from you to restart your editing session. All you need to do is copy the content, edit this page again, then paste it in and save."},m)):0<=b.responseText.indexOf(n.utf8ValidationFailed)?
(b=b.responseJSON.message.split(n.utf8ValidationFailed)[1],e.handleMessage("utf8-validation-failed",{title:"Unsupported character",type:"error",message:a.format("We can\u0027\u0027t save because the {0} character isn\u0027\u0027t supported by your database.\u003cbr\u003e\u003cbr\u003eRemove this character or use a Confluence symbol or emoticon instead. \u003ca href = \u0022https://confluence.atlassian.com/x/BYfsNg\u0022 target=\u0022_blank\u0022\u003eLearn more\u003c/a\u003e",b)},m)):F(b);break;case 403:H(!0);break;case 404:e.closeMessages(["page-not-accessible","noauthorized"]);e.handleMessage("page-not-accessible",{title:"This content cannot be accessed.",type:"error",message:a.format("Your session may have expired, you can attempt to \u003ca href=\u0022dashboard.action\u0022 target=\u0022_blank\u0022\u003elog in\u003c/a\u003e.",
c.get("space-key"))},m);break;case 405:G();break;case 410:e.closeMessages(["page-deleted"]);e.handleMessage("page-deleted",{title:"This content has been deleted",type:"error",message:a.format("Copy your content, then add it to a new page or \u003cdiv\u003e\u003ca href=\u0022viewtrash.action?key={0}\u0022 target=\u0022_blank\u0022\u003erestore this page from the trash\u003c/a\u003e and try again.\u003c/div\u003e",c.get("space-key"))},m);break;case 413:e.closeMessages(["page-too-big"]);e.handleMessage("page-too-big",{type:"error",message:"This page is too big to save. You could split it into multiple pages, then use the \u003ca href=\u0022https://confluence.atlassian.com/conf51/include-page-macro-336169384.html\u0022 target=\u0022_blank\u0022\u003einclude page macro\u003c/a\u003e to display the content."},m);break;case 0:case 500:case 503:N();break;case 501:0<=b.responseText.indexOf(n.renameDuringLimitedMode)?
e.handleMessage("rename-during-limited-mode",{type:"error",message:"Changing page titles isn\u0027t possible right now, as collaborative editing is offline. \u003cdiv\u003e\u003ca id=\u0022editor-restore-title-link\u0022 href=\u0022#\u0022\u003eRestore the page title\u003c/a\u003e if you\u0027d like to publish the page.\u003c/div\u003e"},S):F(b);break;default:F(b)}}function l(b){function v(d){K<T?(K++,L.push(setTimeout(function(){l()},U))):(a.trigger("analyticsEvent",{name:"editor.save.error.conflict"}),K=0,e.handleMessage("page-conflict",{title:"Can\u0027t sync with the server.",type:"error",message:a.format("Refresh the page to try to re-establish the connection.",k.space.key)},m),y(d))}function y(d){a.trigger("rte.safe-save.error",
{status:d.status})}function E(d){return(10>d?"0":"")+d}function V(d){d=parseInt(d,10);if(Number.isNaN(d))return"";const q=0>d?"-":"+";d=Math.abs(d);d=Math.floor(d/1E3/60);const P=d%60;return q+E((d-P)/60)+":"+E(P)}function Q(){f.Editor.isPublishing(!0);h.ajax({type:R,url:t,contentType:"application/json; charset\x3dutf-8",dataType:"json",data:JSON.stringify(k),success:function(d){"page"!==k.type&&"blogpost"!==k.type||a.trigger("analytics",{name:"confluence.editor.close",data:{source:"publishButton"}});
a.trigger("rte.safe-save.success",d);r._internal.onSuccessfulResponse(d)},error:function(d){f.Editor.isPublishing(!1);C();var q=!1;switch(d.status){case 409:A()?(q=!0,v(d)):(f.Editor.restoreDefaultSave(),f.Editor.UI.saveButton.click());break;case 0:case 500:case 503:for(;L.length;)clearTimeout(L.shift());g(d);break;default:g(d)}q||y(d);a.trigger("synchrony.start",{id:"confluence.editor.publish"})}})}a.trigger("synchrony.stop",{id:"confluence.editor.publish"});b&&b.preventDefault();var w=h("#content-title");
if(w.hasClass("placeholded")||""===w.val().trim())a.trigger("rte.safe-save.error"),a.trigger("synchrony.start",{id:"confluence.editor.publish"}),e.closeMessages(["title-too-long","duplicate-title"]),e.handleMessage("empty-title",{title:"This page needs a name",type:"error",message:"Add a page title before hitting publish."},m),C();else{f.Editor.Drafts.unBindUnloadMessage();var k={};b=c.get("draft-id");var W=c.get("content-id"),t=x.CONTEXT_PATH+"/rest/api/content",p=h("#sourceTemplateId").val();
k.status="current";k.title=w.val();k.space={key:c.get("space-key")};k.body={editor:{value:function(d){O.forEach(function(q){d=q(d)});return d}(a.Rte.getEditor().getContent()),representation:"editor"}};p&&(k.extensions={sourceTemplateId:p});w=(w=h("#PostingDate")[0])&&w.value;"blogpost"===I.type&&w&&(p=(p=h("#PostingTime")[0])&&p.value,p||(p=new Date,p=E(p.getHours())+":"+E(p.getMinutes())),p+=":00",w+="T"+p+V(c.get("user-timezone-offset")),k.history={createdDate:(new Date(w)).toISOString()});if(B()&&
!c.get("shared-drafts")){var R="POST";c.get("is-blueprint-page")&&(t=t+"/blueprint/instance/"+b);t+="?status\x3ddraft";k.id=b;k.type=c.get("content-type");k.body.editor.content={id:b}}else R="PUT",B()&&c.get("is-blueprint-page")&&(t+="/blueprint/instance"),t=t+"/"+W,B()&&A()?(k.id=b,k.body.editor.content={id:b}):(k.id=c.get("page-id"),k.body.editor.content={id:c.get("page-id")}),t="0"===b?t+"?status\x3dcurrent":t+"?status\x3ddraft",b=c.getNumber("page-version")||0,k.type=c.get("content-type"),k.version=
{number:b+1,message:h("#versionComment").val(),minorEdit:!h("#notifyWatchers").is(":checked"),syncRev:h("#syncRev").val()};b=function(){var d={};d.id=c.get("parent-page-id")||"0";d.type=c.get("content-type");var q=c.get("parent-page-id");q&&k.space.key===c.get("space-key")||(d.id="0");q&&d.id!==q&&(d.id=h("#parentPageString").val()===c.get("from-page-title")?d.id:q);return d}();"0"!==b.id&&(k.ancestors=[b]);(b=f.Editor.Drafts.getDraftSavingPromise())?b.always(Q):Q()}}if(0!==h("#editpageform").length||
0!==h("#createpageform").length){var n={duplicatedTitle:"A page with this title already exists",titleTooLong:"Title cannot be longer than 255 characters.",publishNewDraftDeprecated:"Unsupported call to publishNewDraft",existingDraftNotFound:"Could not find existing draft, perhaps you're trying to publish a personal draft?",renameDuringLimitedMode:"Unable to perform a page rename when limited mode is enabled",utf8ValidationFailed:"Unsupported character found in content: "},I={existingDraftId:c.get("existing-draft-id")?
c.get("existing-draft-id"):0,pageId:c.get("page-id"),type:c.get("draft-type"),spaceKey:c.get("space-key")};if(!0===c.get("show-draft-message")){if(0<h("#conflict-diffs").length)return;h.ajax({type:"GET",url:x.CONTEXT_PATH+"/rest/tinymce/1/drafts/message",data:I,contentType:"application/json",dataType:"text json",success:function(b){b&&b.draftData&&(b=f.Templates.Editor.Reliable.draftMessage({existingDraft:b.draftData,conflictFound:b.conflictFound,mergeRequired:b.mergeRequired,isNewPage:b.newPage,
pageId:c.get("page-id"),spaceKey:c.get("space-key")}),e.handleMessage("draft-message",{type:"info",message:b},m))}})}var J=0<h("#editor-notifications-container #all-messages .aui-message-error").length;A()?(M.init({saveHandler:l,cancelErrorHandler:g}),f.Editor.overrideSave(M.process)):J?f.Editor.restoreDefaultSave():f.Editor.overrideSave(l);h("#rte-button-overwrite").bind("click.overwrite",l);var K=0,T=3,U=1E3,L=[];a.bind("rte.heartbeat-error",function(b,v){switch(v.status){case 401:case 403:e.isDisplayed(["page-not-accessible"])||
H(!1);break;case 405:if(v.responseText){b=JSON.parse(v.responseText);e.isDisplayed(["read-only-mode"])||"READ_ONLY"!==b.reason||G();break}case 0:case 404:case 500:case 503:f.Editor.metadataSyncRequired()||N();break;default:a.logError("Heartbeat action error: "+JSON.stringify(v))}});a.bind("rte.heartbeat",function(b){var v=!1;z.each(e.displayedErrors(),function(y){z.contains(["noauthorized","server-offline","page-not-accessible","read-only-mode"],y)&&(v=!0,e.closeMessages([y]))});(b="READ_ONLY"===
c.get("access-mode"))&&c.set("access-mode","READ_WRITE");(v||b)&&e.handleMessage("reconnect",{type:"info",title:"Successfully reconnected",message:"We\u0027re back in business. You\u0027re free to save your page again.",close:"auto"},m);f.Editor.UI.isButtonEnabled(f.Editor.UI.saveButton)||D||f.Editor.UI.setButtonState(!0,f.Editor.UI.saveButton);f.Editor.UI.isButtonEnabled(f.Editor.UI.cancelButton)||D||f.Editor.UI.setButtonState(!0,f.Editor.UI.cancelButton)});a.bind("synchrony.history.evicted",function(){D=
!0})}};r.registerCleanupFunction=function(g){O.push(g)};return r});
require("confluence/module-exporter").safeRequire("confluence-editor-reliable-save/reliable-save",function(a){var f=require("ajs"),z=require("confluence/meta"),h=0<window.document.referrer.indexOf("createDialog\x3dtrue\x26flashId");if(f.DarkFeatures.isEnabled("editor.ajax.save")&&""!==z.get("remote-user")&&!h){var u=require("confluence/legacy");f.bind("rte.init.ui",function(){a.initialize();u.Editor=u.Editor||{};u.Editor.SafeSave=u.Editor.SafeSave||{};u.Editor.SafeSave.Draft=a.Draft;u.Editor.SafeSave._internal=
a._internal||{}})}});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.reliablesave:reliable-save-conf-frontend', location = 'js/ajax-login.js' */
define("confluence-editor-reliable-save/ajax-login",["confluence/dark-features","confluence/meta","ajs","jquery","document"],function(v,t,g,h,D){return function(){function E(m,k,a){function r(b){b=b.getResponseHeader("X-AUSERNAME");return y===b}function F(b){for(var c=0,d=b.length;c<d;c++){var e=b[c];g.debug("Rerunning ajax query to: "+e.url,e);z.call(h,e.url,e.settings).done(function(){g.debug("Rerunning done");e.deferred.resolve(arguments)}).fail(function(){g.debug("Rerunning failed");e.deferred.reject(arguments)})}}
function G(b){u.push({deferred:n,url:m,settings:k,defaultCallback:b});w||(x=!1,p||(p=new g.Dialog(840,700),p.addPanel("ajax-login","ajax-login-content","ajax-login-panel",1),b=h(".ajax-login-panel"),q=h("\x3ciframe\x3e\x3c/iframe\x3e"),q.bind("load",function(c){(c=q[0].contentDocument.location.pathname)&&0<=c.indexOf("/ajaxlogincomplete.action")&&(w=!1,x=!0,p.hide(),q.attr("src","about:blank"))}),b.append(q),h(D).bind("hideLayer",function(c,d,e){if("popup"===d&&e===p.popup){g.debug("hiding login dialog");
if(x)F(u);else for(c=u,d=0,e=c.length;d<e;d++){var l=c[d];g.debug("Executing with original response for: "+l.url,l);l.defaultCallback&&l.defaultCallback()}u=[]}})),q.attr("src",H),p.show(),w=!0)}function A(b,c,d,e){function l(){f.readyState=b.readyState;f.status=b.status;f.statusText=b.statusText;b.responseXML?f.responseXML=b.responseXML:f.responseText=b.responseText;c.apply(d,e)}r(b)?l():G(l)}g.debug("Using authenticatingPromise");var f={abort:function(){a.abort.apply(a,arguments)},getAllResponseHeaders:function(){a.getAllResponseHeaders.apply(a,
arguments)},getResponseHeader:function(){a.getResponseHeader.apply(a,arguments)},overrideMimeType:function(){a.overrideMimeType.apply(a,arguments)},readyState:a.readyState,setRequestHeader:function(b,c){a.setRequestHeader.apply(a,arguments)},state:function(){a.state.apply(a,arguments)},status:a.status,statusCode:function(){a.statusCode.apply(a,arguments)},statusText:a.statusText},n=h.Deferred();n.promise(f);f.success=f.done;f.error=f.fail;a.done(function(b,c,d){A(d,n.resolve,n,arguments)});a.fail(function(b,
c,d){A(b,n.reject,n,arguments)});return f}if(v.isEnabled("ajax.login")){g.debug("AJAX login support enabled");var w=!1,p,q,x,u=[],z=h.ajax,y=t.get("remote-user"),B=t.get("base-url"),C=t.get("context-path"),H=t.get("context-path")+"/login.action?os_destination\x3d%2Fajaxlogincomplete.action";h.ajax=function(m,k){var a=z.call(h,m,k),r=m&&m.url;return y&&(!k||k&&!k.preventAjaxLogin)&&r&&(B&&0===r.indexOf(B)||C&&0===r.indexOf(C))?E(m,k,a):a}}}});
require("confluence/module-exporter").safeRequire("confluence-editor-reliable-save/ajax-login",function(v){require("ajs").toInit(v)});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.editor:editor-resources', location = 'tinymce3/plugins/confluencepaste/linkify.js' */
define("confluence-editor/tinymce3/plugins/confluencepaste/linkify",function(){return{RE_EMAIL_PATTERN:"(?:\\s|\\A|^)[\\w.-]+\\+*[\\w.-]+@(?:(?:[\\w-]+\\.)+[A-Za-z]{2,6}|(?:\\d{1,3}\\.){3}\\d{1,3})",RE_URL_SCHEME:"(?:[\\w-]{2,}):/{1,3}",RE_TLD:"(?:aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|travel|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|eh|er|es|et|fi|fj|fk|fm|fo|fr|ga|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|qa|re|ro|ru|rw|sa|sb|sc|sd|se|sg|si|sj|sk|sl|sm|sn|so|sr|st|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)",
RE_URL_MIDCHAR:"(?:[^\\s()]+|\\((\\S+)\\))",RE_URL_ENDCHAR:"(?:\\((\\S+)\\)|[^\\s`!()\\[\\]{};:'\".,<>?«»“”‘’])",init:function(){this.RE_URL_ENDING||(this.RE_URL_ENDING="(?:"+this.RE_URL_MIDCHAR+"*"+this.RE_URL_ENDCHAR+")?",this.RE_FULL_URL=this.RE_URL_SCHEME+"\\w+(?:.\\w+)"+this.RE_URL_ENDING,this.RE_OTHER_URL="\\w[\\w_-]*(?:\\.\\w[\\w_-]*)*\\."+this.RE_TLD+"(?:[\\/\\?#]"+this.RE_URL_ENDING+"|\\b)")},linkify:function(f,b,i){this.init();f=this.match_and_replace(this.RE_EMAIL_PATTERN,f,!0,!1,b,i);
f=this.match_and_replace(this.RE_FULL_URL,f,!1,!1,b,i);return f=this.match_and_replace(this.RE_OTHER_URL,f,!1,!0,b,i)},match_and_replace:function(f,b,i,o,k,h){for(var c=0,a=0,d=0,c=0,l=/<\/[aA]>/,f=RegExp(f,"g"),p=h.hasOwnProperty("add_wbrs")?h.add_wbrs:null,j=h.hasOwnProperty("truncate_length")?h.truncate_length:100,m=h.hasOwnProperty("link_target")?h.link_target:"_blank",h=h.hasOwnProperty("link_titles")?h.link_titles:null,d={},n=0;d=f.exec(b);){n++;if(20<n)break;c=d.index;d=d[0].length;if(0<=b.substring(a,
c).search(/<[aA]/)){l.lastIndex=a;c=b.substring(a,b.length).search(l);if(0>c)break;c+=a;f.lastIndex=c+4;a=c+4}else{var a=b.substr(c,d),g=a.search(/&(amp|gt|lt)$/);if(0<g&&b.length>c+d&&";"==b[c+d]){d-=a.length-g;for(a=b.substr(c,d);!a.match(this.RE_URL_ENDCHAR+"$")&&0<d;)d--,a=b.substr(c,d)}g=a;o&&(g="http://"+g);var e="<a";m&&(e+=' target="'+m+'"');e+=' href="';i&&(e+="mailto:");g=g.replace(/"/g,"%22");e+=g+'"';h&&(e+=' title="'+(i?"Email "+g:g)+'"');j&&a.length>j&&(a=a.substr(0,j)+"...");p&&(a=
a.replace(/([/=])/g,"<wbr>$1"));e+=">"+a+"</a>";k&&k.push(g);b=b.slice(0,c)+e+b.slice(c+d,b.length);f.lastIndex=c+e.length;a=c+e.length}}return b}}});require("confluence/module-exporter").exportModuleAsGlobal("confluence-editor/tinymce3/plugins/confluencepaste/linkify","linkify");
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.editor:editor-resources', location = 'tinymce3/plugins/confluencepaste/post-paste-node-filter.js' */
define("confluence-editor/tinymce3/plugins/confluencepaste/post-paste-node-filter","jquery confluence/legacy confluence-editor/tinymce3/plugins/confluencepaste/linkify ajs document tinymce".split(" "),function(e,B,q,r,y,z){function u(a,b){for(var f=e(a).find("["+b+"]"),c="",d="",g="",h=0,k=f.length;h<k;h++){d=(c=e(f[h]))&&["/",c.attr(b)].join("");g=c&&["/",c.attr("data-mce-"+b)].join("");r.contextPath()&&d.indexOf(r.contextPath())===0&&(f[h]=c.attr(b,d));r.contextPath()&&g.indexOf(r.contextPath())===
0&&(f[h]=c.attr("data-mce-"+b,g))}return f}function m(a,b,f){var a=e(a).find("["+b+"]"),c="",d,g;if(a)for(var h=0,k=a.length;h<k;h++){d=e(a[h]);g=f.standard;for(var n in f)if(f.hasOwnProperty(n)&&d.is(n)){g=f[n];break}if(b.indexOf("style")>-1){var c=d,i=g;g=[];for(var o="",o=void 0,p=c.attr("style"),l=c.attr("data-mce-style"),j=0,m=i.length;j<m;j++)if(p&&p.toLowerCase().indexOf(i[j])>-1)g.push(i[j]+": "+c.css(i[j])+";");else if(l&&l.toLowerCase().indexOf(i[j])>-1){o=RegExp(i[j]+":.+?(?:;|$)");o=l.match(o);
g.push(o[0].indexOf(";")>-1?o:o+";")}c=g.join(" ")}else{c=d;i=b;p=[];if(g){l=0;for(j=g.length;l<j;l++)c.is("["+i+"~="+g[l]+"]")&&p.push(g[l])}c=p.join(" ")}d.removeAttr(b);c.length&&d.attr(b,c)}}function A(a,b){function f(f){var d;if(c.index){d=a.splitText(c.index);a&&b.push(a);a=d}(d=a.splitText(c[0].length))&&b.push(d);e(a).wrap("<a href='"+f+a.data+"'></a>")}var c,d,g;d=s.exec(a.data);g=t.exec(a.data);if(d){c=d;f("mailto:")}else if(g){d=(c=g)&&c[0].indexOf("://")===-1?"http://":"";f(d)}}var t;
q.init();var v=RegExp(q.RE_FULL_URL),w=RegExp(q.RE_OTHER_URL);t={exec:function(a){return v.exec(a)||w.exec(a)},test:function(a){return v.test(a)||w.test(a)}};var s,x=RegExp(q.RE_EMAIL_PATTERN);s={exec:function(a){if((a=x.exec(a))&&/\s/.test(a[0][0])){a[0]=a[0].replace(/\s/,"");a.index++}return a},test:function(a){return x.test(a)}};e(y).bind("postPaste",function(a,b,f){a=f.node;b={standard:["text-decoration","text-align","margin-left"],".wysiwyg-macro":["background-image"],p:["margin-left","text-align"],
span:["color","text-decoration"],pre:["margin-left"]};b.td=b.th=["text-align","vertical-align"];b.li=["list-style-type","background-image"];b.col=["width"];b["table.confluenceTable.relative-table"]=["width"];m(a,"style",b);m(a,"data-mce-style",b);if(e.browser.mozilla){u(a,"src");u(a,"href")}m(a,"face",{standard:[]});m(a,"id",{standard:[]});m(a,"data-mce-href",{standard:[]});a=f.node;b=[];b.push({elements:["div"],attribute:"class",blackValue:"aui-buttons"});for(var c=0;c<b.length;c++)for(var d=b[c],
g=0;g<d.elements.length;g++)for(var h=e(a).find(d.elements[g]+"["+d.attribute+"]"),k=0;k<h.length;k++){var n=h.eq(k).attr(d.attribute),n=n.replace(d.blackValue,"");h.eq(k).attr(d.attribute,n)}var i=f.node;e.each([".contentLayout",".contentLayout2",".columnLayout",".header",".footer",".cell",".innerCell",".panelContent",".panel",".panelHeader",".Apple-converted-space","font",".jira-status",".jira-issue",".diff-html-removed",".diff-html-added",".diff-html-changed"],function(a,b){e(b,i).contents().unwrap()});
e("img",i).map(function(){e(this).attr("data-attachment-copy","");!e(this).attr("src")&&e(this).remove()});e("dl",i).map(function(){e(this).replaceWith(e("<p></p>").text(e(this).text()))});e("a",i).map(function(){e(this).removeClass("confluence-userlink userLogoLink")});for(a=e.makeArray(f.node.childNodes);a.length;){b=a.pop();e(b).is("a")||(b.nodeType===3?A(b,a):b.nodeType===1&&(b.childNodes&&b.nodeName.toLowerCase()!=="pre")&&(a=a.concat(e.makeArray(b.childNodes))))}if(a=e.browser.mozilla){a=e(f.node);
a=a.children("br").length&&!a.find(":not(br)").length&&!e(z.activeEditor.selection.getStart()).closest("[data-macro-body-type='PLAIN_TEXT']").length}if(a){f=e(f.node);a="<p>"+f.html().replace(/<br>/gi,"</p><p>")+"</p>";f.html(a)}});return{URL:t,EMAIL:s}});require("confluence/module-exporter").exportModuleAsGlobal("confluence-editor/tinymce3/plugins/confluencepaste/post-paste-node-filter","Confluence.Editor.regex");
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.editor:editor-resources', location = 'com/atlassian/confluence/tinymceplugin/tinymce-adapter-deprecated.js' */
define("confluence-editor/tinymceplugin/tinymce-adapter-deprecated",["tinymce","ajs","confluence/legacy","jquery"],function(e,a,g,h){return{putCursorAtPostionInElement:function(b,a,c){var d=e.activeEditor,i=d.getDoc(),b=h(b,c||i),b=b.contents().filter(function(){return 3===this.nodeType})[0],c=d.selection.getRng(!0);c.setStart(b,a);c.setEnd(b,a);d.selection.setRng(c)},storeCurrentSelectionState:a.Rte.BookmarkManager.storeBookmark,restoreSelectionState:a.Rte.BookmarkManager.restoreBookmark,insertLink:function(b,
f){f&&a.Rte.getEditor().selection.select(f);g.Editor.LinkAdapter.setLink(b)},getCurrentBaseUrl:a.Rte.getCurrentBaseUrl,addOnInitCallback:function(b){a.debug("Adding callback to AJS.Rte.BootstrapManager. AJS.Rte.BootstrapManager = "+a.Rte.BootstrapManager);a.Rte.BootstrapManager.addOnInitCallback(b)},bindScroll:function(b,f){a.Rte.bindScroll(b,f)},unbindScroll:function(b){a.Rte.unbindScroll(b)},getTinyMceHasInit:function(){return a.Rte.BootstrapManager.isInitComplete()},getEditor:a.Rte.getEditor,addTinyMcePluginInit:function(b){a.Rte.BootstrapManager.addTinyMcePluginInit(b)},
isExternalLink:function(b){return g.Link.isExternalLink(b)},isInMacroPlaceholder:function(b){return e.confluence.MacroUtils.isInMacro(b)},initialiseTinyMce:function(){var b=a.Editor.Adapter;e.EditorManager.preInit.apply(e.EditorManager);e.EditorManager.init(b.settings)},offset:function(b){a.Rte.Content.offset(b)},getSelectedText:function(){return a.Rte.Content.getSelectedText()},setEditorValue:function(b){a.Rte.Content.setHtml(b)},editorHasContentChanged:function(){return a.Rte.getEditor().isDirty()},
editorResetContentChanged:function(){a.Rte.getEditor().setDirty(!1)},getChildIndex:function(b,a){for(var c=b.childNodes,d=0,e=c.length;d<e;d++)if(c[d]==a)return d;return-1},getEditorContainer:function(){return a.Rte.getEditorContainer()},getEditorFrame:function(){return a.Rte.getEditorFrame()},webResourcePath:a.Rte.webResourcePath,getResourceUrlPrefix:function(){return a.Rte.getResourceUrlPrefix()},getTinyMceBaseUrl:function(){return a.Rte.getTinyMceBaseUrl()},getMinEditorHeight:function(){return a.Rte.getMinEditorHeight()},
getTinyMceEditorMinHeight:function(b){return a.Rte.getTinyMceEditorMinHeight(b)}}});require("confluence/module-exporter").exportModuleAsGlobal("confluence-editor/tinymceplugin/tinymce-adapter-deprecated","AJS.Editor.Adapter");
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.tensixtwo.conf.numcapt:editorWebResource', location = 'com/tensixtwo/conf/numcapt/js/editor-caption-ref-editor.js' */
/*
 * Copyright (c) 2022 Appfire Technologies, LLC.
 * All rights reserved.
 *
 * This software is licensed under the provisions of the "Appfire EULA"
 * (https://appfire.com/eula/) as well as under the provisions of
 * the "Standard EULA" from the "Atlassian Marketplace Terms of Use" as a "Marketplace Product"
 * (http://www.atlassian.com/licensing/marketplace/termsofuse).
 *
 * See the LICENSE file for more details.
 */
require(['jquery', 'ajs', 'confluence/legacy', 'bolo/numcapt/helpers'], function($, AJS, Confluence, helpers) {
    function htmlEncode( input ) {
        return String(input)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    function htmlDecode( input ) {
        return String(input)
            .replace(/&amp;/g, '&')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, '\'')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>');
    }


    $(document).ready(function(){

        var macroName = '';

        var fancyNames = {
            'caption-ref': "Caption Reference"
        };

        var dialog = new AJS.Dialog({width: 800, height: 650});

        dialog.addPanel("Panel",
            '  <form action="#" class="aui">'+
            '    <div class="macro-desc" id="caption-macro-desc">'+"Reference to caption with automatic numbering."+'</div>'+
            '    <div class="macro-param-div field-group" id="caption-page-div">'+
            '      <label for="caption-page-helper">'+"Confluence page"+'</label>'+
            '      <input type="text" class="text autocomplete-page macro-param-input" id="caption-page-helper" placeholder="This page" autocomplete="off" data-none-message="'+"Not found"+'">'+
            '      <input type="text" class="hidden" id="caption-page">'+
            '    </div>'+
            '    <div class="macro-param-div field-group required" id="caption-anchor-div">'+
            '      <label for="caption-anchor">'+"Anchor name"+'<span class="aui-icon icon-required">required</span></label>'+
            '      <input type="text" class="text macro-param-input" id="caption-anchor" list="caption-anchor-list" autocomplete="off"><datalist id="caption-anchor-list"></datalist>'+
            '    </div>'+
            '    <div class="macro-param-div field-group required" id="caption-showtext-div">'+
            '      <label for="caption-showtext">'+"Show caption text"+'</label>'+
            '      <input type="checkbox" class="check-box macro-param-input" id="caption-showtext" autocomplete="off">'+
            '    </div>'+
            '    <div class="macro-param-div field-group" id="caption-displaytext-div">'+
            '      <label for="caption-displaytext">'+"Override link text"+'</label>'+
            '      <input type="text" class="text macro-param-input" id="caption-displaytext" autocomplete="off">'+
            '    </div>'+
            '  </form>'+
            '<h4 id="caption-preview-heading">'+"Preview"+':</h4>'+
            '<div class="caption-preview" id="caption-preview">'+
            '</div>'
            , "panel-body");

        AJS.toInit(function () {
            Confluence.Binder.autocompletePage(AJS.$("#caption-page-div"));
        });

        function updateDatalist(page) {
            var datalist = $("#caption-anchor-list");
            datalist.html('');
            function doUpdate(anchors) {
                $(anchors).each(function() {
                    datalist.append($('<option value="'+htmlEncode(this)+'"></option>'));
                })
            }

            var anchors;
            if (!page || page == '') {
                doUpdate(helpers.getAnchors());
            } else {
                var pageRef = getPageRef(page);

                $.ajax({
                    url: AJS.params.baseUrl+"/rest/api/content",
                    data: {spaceKey: pageRef.space, title: pageRef.title},
                    dataType: "json"
                }).done(function(response) {
                    if (response.results.length == 1) {
                        $.ajax({
                            url: AJS.params.baseUrl + "/rest/api/content/" + response.results[0].id,
                            data: {expand: 'body.view'},
                            dataType: "json"
                        }).done(function (response) {
                            if (response.body) {
                                var re = new RegExp(".*-CAPTION-(.*)");
                                anchors = [];

                                $(response.body.view.value).filter(".numcapt-figure").each(function () {
                                    var res = re.exec($(this).attr("data-numcapt-anchor"));
                                    if (res) { anchors.push(res[1]); }
                                });
                                doUpdate(anchors);
                            }
                        });
                    }
                });
            }
        }

        function getPageElement() {
            return $('input#caption-page');
        }

        function getShowTextElement() {
            return $('input#caption-showtext');
        }

        function getPageHelperElement() {
            return $('input#caption-page-helper');
        }

        function getAnchorElement() {
            return $('input#caption-anchor');
        }

        function getDisplayTextElement() {
            return $('input#caption-displaytext');
        }

        function getParams() {
            var params = {};

            function setParam(key, val) {
                if (val != "") params[key] = val;
            }

            setParam("page", getPageElement().val());
            setParam("showtext", getShowTextElement().prop("checked"));
            setParam("anchor", htmlDecode(getAnchorElement().val()));
            setParam("displaytext", getDisplayTextElement().val());

            return params;
        }

        var getPageRef = (function(){
            var re = new RegExp("(?:(\\w+):)?(.*)");
            return function(page){
                var match = re.exec(page || '');
                return {
                    space: match[1] || '',
                    title: match[2]
                };
            };
        })();

        var makeDelay = function() {
            return (function(){
                var timer = 0;
                return function(callback, ms){
                    clearTimeout (timer);
                    timer = setTimeout(callback, ms);
                };
            })();
        };

        function onSave() {
            var macro = {name: macroName, bodyHtml: null, params: getParams(), defaultParameterValue: null};
            dialog.hide();
            tinymce.confluence.macrobrowser.macroBrowserComplete(macro);
        }

        dialog.addSubmit("Save", onSave);

        dialog.addLink("Cancel", function() {
            dialog.hide();
            tinymce.confluence.macrobrowser.macroBrowserCancel();
        });

        function openDialog(macro) {
            oldAnchor = null;
            oldShowText = null;
            oldPage = null;
            oldDisplayText = null;

            macroName = macro.name;
            var params = macro.params || {};

            if (macro.params) {
                dialog.addHeader(AJS.format("Edit \u2018{0}\u2019 Macro", [fancyNames[macroName]]));
                dialog.page[0].button[0].html("Save");
            } else {
                dialog.addHeader(AJS.format("Insert \u2018{0}\u2019 Macro", [fancyNames[macroName]]));
                dialog.page[0].button[0].html("Insert");
            }

            dialog.id = "macro-"+macroName;

            getPageElement().val(params["page"]);
            getPageHelperElement().val(getPageRef(params["page"]).title);
            getAnchorElement().val(params["anchor"]);
            getShowTextElement().prop("checked", !!params["showtext"]);
            getDisplayTextElement().val(params["displaytext"]);
            updateDatalist(params["page"]);

            dialog.show();
            previewMacro();
        }

        for (var key in fancyNames) {
            if (fancyNames.hasOwnProperty(key)) {
                AJS.MacroBrowser.setMacroJsOverride(key, {opener: openDialog});
            }
        }

        var oldAnchor = null;
        getAnchorElement().on("change keyup paste input blur", function() {
            var currentVal = $(this).val();
            if(currentVal == oldAnchor) {
                return; //check to prevent multiple simultaneous triggers
            }

            oldAnchor = currentVal;

            previewMacro();
        });

        var oldPage = null;
        var updateDatalistDelay = makeDelay();
        getPageHelperElement().on("change keyup paste input selected.autocomplete-content", function(event, data) {
            var el = $(this);
            var pageEl = getPageElement();

            if (data && data.content) {
                pageEl.val(AJS.template('{space.key}:{title}').fillHtml(data.content));
            } else if (el.val()) {
                pageEl.val(AJS.params.spaceKey+':'+el.val());
            } else {
                pageEl.val('');
            }

            var currentVal = pageEl.val();
            if(currentVal == oldPage) {
                return; //check to prevent multiple simultaneous triggers
            }

            oldPage = currentVal;

            getAnchorElement().val('');
            updateDatalistDelay(function() {
                updateDatalist(pageEl.val())
            }, 50);
            previewMacro();
        });

        var oldShowText = null;
        getShowTextElement().on("change", function() {
            var currentVal = $(this).prop("checked");
            if(currentVal == oldShowText) {
                return; //check to prevent multiple simultaneous triggers
            }

            oldShowText = currentVal;

            previewMacro();
        });

        var oldDisplayText = null;
        getDisplayTextElement().on("change keyup paste", function() {
            var currentVal = $(this).val();
            if(currentVal == oldDisplayText) {
                return; //check to prevent multiple simultaneous triggers
            }

            oldDisplayText = currentVal;

            previewMacro();
        });

        function getPreviewContainerDiv() {
            return $("div#caption-preview");
        }

        function createPreviewContainer() {
            // Set the iframe source to an empty JS statement to avoid
            // secure/nonsecure warnings on https, without needing a back-end call.
            var src = AJS.params.staticResourceUrlPrefix + "/blank.html";
            getPreviewContainerDiv().html('<iframe src="' + src + '" frameborder="0" name="macro-browser-preview-frame caption-preview" id="macro-preview-iframe" style="width: 100%;"></iframe>');
        }

        function removePreviewContainer() {
            // removes the iFrame.
            getPreviewContainerDiv().html("");
        }

        function renderPreview(html) {
            var iframe = getPreviewContainerDiv().find("iframe")[0];
            var doc = iframe.contentDocument || iframe.contentWindow.document;
            doc.write(html);
            doc.close(); // for firefox

            var resizeContainer = function() {
                iframe.style.height = Math.max(($(iframe).contents().find("html")[0].scrollHeight+2), getPreviewContainerDiv().height()) + 'px';
                iframe.style.width = $(iframe).contents().find("html")[0].scrollWidth + 'px';
            };

            $(iframe).load(function() {
                loadingInProgress(false);
                resizeContainer();
            });

            var errorSpan = $("div.error span.error", doc);
            if (errorSpan.length) {
                AJS.logError("Error rendering macro definition : ");
            }
        }

        var _loadingInProgress = false;

        function loadingInProgress(loading) {
            if (arguments.length==0) return _loadingInProgress;

            _loadingInProgress = loading;

            if (_loadingInProgress) {
                getPreviewContainerDiv().spin('large');
            } else {
                getPreviewContainerDiv().spinStop();
            }
        }

        var previewDelay = makeDelay();

        function previewMacro () {
            removePreviewContainer();
            loadingInProgress(true);

            previewDelay(function(){
                if (!getAnchorElement().val() || (getAnchorElement().val().trim().length==0)) {
                    loadingInProgress(false);
                    return;
                }

                var options = {
                    contentId: Confluence.getContentId(),
                    macroName: macroName,
                    params: getParams(),
                    body: null,
                    defaultParameterValue: null,

                    successCallback : function(html) {
                        renderPreview(html);
                    },

                    errorCallback : function(e) {
                        // todo: better err handling?
                        AJS.logError(e);
                        loadingInProgress(false);
                    }
                };

                createPreviewContainer();
                loadingInProgress(true);


                AJS.MacroBrowser.Rest.fetchMacroPreviewData(options);
            }, 1000 );
        }

        getPreviewContainerDiv().on('hide.dialog',function() {
            removePreviewContainer();
        })
    });
});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.tensixtwo.conf.numcapt:editorWebResource', location = 'com/tensixtwo/conf/numcapt/js/editor-anchor-dedup.js' */
/*
 * Copyright (c) 2022 Appfire Technologies, LLC.
 * All rights reserved.
 *
 * This software is licensed under the provisions of the "Appfire EULA"
 * (https://appfire.com/eula/) as well as under the provisions of
 * the "Standard EULA" from the "Atlassian Marketplace Terms of Use" as a "Marketplace Product"
 * (http://www.atlassian.com/licensing/marketplace/termsofuse).
 *
 * See the LICENSE file for more details.
 */
/*********************************************************
 * Generate new anchors when pasting captioned items
 */
require(['jquery', 'ajs', 'confluence/legacy', 'bolo/numcapt/helpers'], function($, AJS, Confluence, helpers) {
    var macroName = "captioneditem";
    var anchorField = "anchor";
    var needsUpdate = "data-numcapt-needs-update";

    var updateAnchor = function(macroNode, existingAnchors) {
        var $macroNode = $(macroNode);

        var macroParameters = Confluence.MacroParameterSerializer.deserialize($macroNode.attr("data-macro-parameters"));
        macroParameters[anchorField] = macroParameters[anchorField] || helpers.makeDefaultAnchor();

        if (existingAnchors.indexOf(macroParameters[anchorField]) >= 0) {
            AJS.Rte.getEditor().selection.select($macroNode[0]);
            AJS.Rte.BookmarkManager.storeBookmark();

            // Replace unclosed tags that cause an error in Confluence
            var body = helpers.getMacroBody($macroNode);
            macroParameters[anchorField] = helpers.makeDefaultAnchor();

            var macroRenderRequest = {
                contentId : Confluence.Editor.getContentId(),
                macro : {
                    name : macroName,
                    params : macroParameters,
                    defaultParameterValue : null,
                    body : body
                }
            };

            tinymce.confluence.MacroUtils.insertMacro(macroRenderRequest, macroNode);
        }
    };

    var updateAnchors = function() {
        var existingAnchors = helpers.getAnchors();
        $("#wysiwygTextarea_ifr").contents().find("#tinymce").children("["+needsUpdate+"]").each(function() {
            updateAnchor(this, existingAnchors);
            $(this).attr(needsUpdate, null);
        });
    };

    AJS.bind("init.rte", function() {
        // Set random anchor when creating new macro
        var jsOverrides = {
            "fields" : {
                "string" : {}
            }
        };
        jsOverrides.fields.string[anchorField] = function(params,options){
            var field = AJS.MacroBrowser.ParameterFields["string"](params, options);
            field.setValue(helpers.makeDefaultAnchor());
            return field;
        };
        AJS.MacroBrowser.setMacroJsOverride(macroName, jsOverrides);
        
        // Set random anchor when copy-pasting macro (to avoid duplicates)
        $(document).bind('postPaste', function (e, pl, o) {
            // Find out what is being pasted
            var $pasted = $(o.node);
            //noinspection JSValidateTypes
            $pasted.children("[data-macro-name="+macroName+"]").each(function() {
                $(this).attr(needsUpdate, "");
            });
            setTimeout(function () {
                updateAnchors();
            }, 0);
        });
    });
});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.tensixtwo.conf.numcapt:editorWebResource', location = 'com/tensixtwo/conf/numcapt/js/editor-helpers.js' */
/*
 * Copyright (c) 2022 Appfire Technologies, LLC.
 * All rights reserved.
 *
 * This software is licensed under the provisions of the "Appfire EULA"
 * (https://appfire.com/eula/) as well as under the provisions of
 * the "Standard EULA" from the "Atlassian Marketplace Terms of Use" as a "Marketplace Product"
 * (http://www.atlassian.com/licensing/marketplace/termsofuse).
 *
 * See the LICENSE file for more details.
 */
define('bolo/numcapt/helpers', ['confluence/legacy'], function(Confluence) {
    var macroName = "captioneditem";
    var anchorField = "anchor";
    var needsUpdate = "data-numcapt-needs-update";

    return {

        makeDefaultAnchor: function()
        {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

            for( var i=0; i < 5; i++ )
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        },

        getAnchors: function()
        {
            var anchors = [];
            $("#wysiwygTextarea_ifr").contents().find("#tinymce").children("[data-macro-name=" + macroName + "]").each(function () {
                if (typeof $(this).attr(needsUpdate) !== 'string') {
                    anchors.push(Confluence.MacroParameterSerializer.deserialize($(this).attr("data-macro-parameters"))[anchorField])
                }
            });
            return anchors;
        },

        getMacroBody: function(macroDiv) {
            var macroBodyNode = AJS.$("td.wysiwyg-macro-body", macroDiv).clone()[0];
            return AJS.Rte.getEditor().serializer.serialize(macroBodyNode, {
                forced_root_block: false // Prevent serialize from wrapping in a <p></p>
            });
        }
    };
});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.tensixtwo.conf.numcapt:editorWebResource', location = 'com/tensixtwo/conf/numcapt/js/editor-macro-panel.js' */
/*
 * Copyright (c) 2022 Appfire Technologies, LLC.
 * All rights reserved.
 *
 * This software is licensed under the provisions of the "Appfire EULA"
 * (https://appfire.com/eula/) as well as under the provisions of
 * the "Standard EULA" from the "Atlassian Marketplace Terms of Use" as a "Marketplace Product"
 * (http://www.atlassian.com/licensing/marketplace/termsofuse).
 *
 * See the LICENSE file for more details.
 */
/*********************************************************
 * Caption editing from macro property panel
 */

define('bolo/numcapt/property-panel', ['jquery', 'ajs', 'confluence/legacy', 'tinymce', 'bolo/numcapt/helpers'], function($, AJS, Confluence, tinymce, helpers) {

    // property-panel button ids from the plugin descriptor, assumes that the parameter names equal the button ids
    var titleParameterName = "caption";
    var macroName = 'captioneditem';
    var placeholder = 'Click to add caption text';

    var updateMacro = function(macroNode, macroParameterCallback) {
        var ed = AJS.Rte.getEditor();
        var $macroNode = $(macroNode);

        ed.selection.select($macroNode[0]);
        AJS.Rte.BookmarkManager.storeBookmark();

        var macroParameters = Confluence.MacroParameterSerializer.deserialize($macroNode.attr("data-macro-parameters"));
        macroParameterCallback(macroParameters);

        var macroRenderRequest = {
            contentId : Confluence.Editor.getContentId(),
            macro : {
                name : macroName,
                params : macroParameters,
                defaultParameterValue : null,
                body : helpers.getMacroBody($macroNode)
            }
        };

        tinymce.confluence.MacroUtils.insertMacro(macroRenderRequest, macroNode);
    };

    var getCurrentTitle = function(macroNode) {
        var $macroNode = $(macroNode);
        var macroParameters = Confluence.MacroParameterSerializer.deserialize($macroNode.attr("data-macro-parameters"));
        return macroParameters[titleParameterName] || "";
    };

    var createTitleElement = function(macroNode, currentTitle) {
        var cssClassNames = macroName+"-macro-caption first last editable";
        var $linkTitleElement;
        var $inputTitleElement = $("<input/>");
        $inputTitleElement.attr("class", cssClassNames);

        var swapTitleElement = function($currentTitleElement) {
            var currentTagName = $currentTitleElement.prop("tagName").toLowerCase();
            if(currentTagName === "a") {
                if(!$linkTitleElement) {
                    $linkTitleElement = $currentTitleElement;
                }
                var existingValue = $linkTitleElement.find("span.panel-button-text").text();
                $inputTitleElement.val(existingValue !== placeholder ? existingValue : '');
                $currentTitleElement.replaceWith($inputTitleElement);
                $inputTitleElement.focus(function() {
                    this.select();
                });
                $inputTitleElement.focus();
                var changeTitle = function() {
                    $inputTitleElement = $(this);
                    updateMacro(macroNode, function(macroParameters) {
                        var newValue = $inputTitleElement.val();
                        // if (newValue.trim()) {
                            macroParameters[titleParameterName] = $inputTitleElement.val();
                        // }
                    });
                    AJS.Confluence.PropertyPanel.destroy();
                    swapTitleElement($inputTitleElement);
                };
                $inputTitleElement.change(function() {
                    changeTitle.call(this);
                });
                // register one for the IEs ...
                $inputTitleElement.keyup(function(e) {
                    // enter key
                    if(e.keyCode == 13) {
                        changeTitle.call(this);
                    }
                });
            }
        };

        return {
            className: cssClassNames,
            text: AJS.escapeHtml(currentTitle || placeholder),
            click: swapTitleElement
        }
    };

    return {
        register: function(PropertyPanel) {
            PropertyPanel.Macro.registerInitHandler(function (macroNode, buttons) {
                var title = getCurrentTitle(macroNode);
                buttons.splice(1, 0, createTitleElement(macroNode, title)); // insert after the first element = 'Edit'
            }, macroName);
        }
    };
});


require('confluence/module-exporter')
    .safeRequire('bolo/numcapt/property-panel', function(panel) {
        AJS.bind("init.rte", function() {
            panel.register(require('confluence/property-panel'));
        });
    });
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.tensixtwo.conf.numcapt:tinymce-numcapt-button-resources', location = 'com/tensixtwo/conf/numcapt/js/editor-button.js' */
/*
 * Copyright (c) 2022 Appfire Technologies, LLC.
 * All rights reserved.
 *
 * This software is licensed under the provisions of the "Appfire EULA"
 * (https://appfire.com/eula/) as well as under the provisions of
 * the "Standard EULA" from the "Atlassian Marketplace Terms of Use" as a "Marketplace Product"
 * (http://www.atlassian.com/licensing/marketplace/termsofuse).
 *
 * See the LICENSE file for more details.
 */
define('bolo/numcapt/editor-button', ['jquery', 'tinymce', 'ajs', 'confluence/legacy', 'bolo/numcapt/helpers'], function($, tinymce, AJS, Confluence, helpers) {
    "use strict";

    var macroName = 'captioneditem';

    function button () {
        return {

            init : function(ed) {
                //Button functionality
                ed.addCommand('numcaptAddCaption', function() {
                    var $selectedNode = $(ed.selection.getNode());
                    var existingCaptionForNode = $selectedNode.closest('[data-macro-name="'+macroName+'"]');
                    var parentTable = $selectedNode.closest('table.confluenceTable')[0];
                    var captionName = 'Figure';
    
                    if (existingCaptionForNode.length) {
                        return tinymce.confluence.macrobrowser.editMacro(existingCaptionForNode.first());
                    }
    
                    if (ed.selection.getRng().collapsed) {
                        function checkForItem(node) {
                            if (node.tagName && node.tagName.toLowerCase() === 'img') {
                                ed.selection.select(node);
                                parentTable = null;
                                return true;
                            }
    
                            if (node.tagName && node.tagName.toLowerCase() === 'table' && $(node).hasClass('confluenceTable')) {
                                parentTable = node;
                                return true;
                            }
                        }
    
                        checkForItem(ed.selection.getStart()) || checkForItem(ed.selection.getEnd());
                    }
    
                    if (parentTable) {
                        captionName = 'Table';
                        ed.selection.select(parentTable);
                    }
    
                    var selCollapsed = ed.selection.getRng().collapsed;
    
                    var macroRenderRequest = {
                        contentId: Confluence.Editor.getContentId(),
                        macro: {
                            name: macroName,
                            params: {name: captionName, anchor: helpers.makeDefaultAnchor()},
                            defaultParameterValue: null,
                            body: selCollapsed ? '' : ed.selection.getContent()
                        }
                    };
                    tinymce.confluence.MacroUtils.insertMacro(macroRenderRequest, !selCollapsed && ed.selection.getNode());
                    setTimeout(function() {
                        var $selectedNode = $(ed.selection.getNode());
                        var existingCaptionForNode = $selectedNode.closest('[data-macro-name="'+macroName+'"]');
    
                        tinymce.confluence.macrobrowser.editMacro(existingCaptionForNode.first());
                    }, 50)
                });
    
                $('<ul class="aui-buttons rte-toolbar-group-numcapt no-separator"></ul>')
                    .insertAfter('#rte-toolbar .rte-toolbar-group-link');
    
                // Register button in the header group
                ed.addButton('numcapt-captioneditem-button', {
                    tooltip: "Add caption",
                    cmd: 'numcaptAddCaption',
                    className: '',
                    locationGroup: 'rte-toolbar-group-numcapt',
                    icon: 'aui-icon aui-icon-small',
                    weight: 0
                });
            },
    
            getInfo : function() {
                return {
                    longname : 'Numbered Captions',
                    author : 'Appfire',
                    authorurl : 'https://appfire.com/',
                    version : tinymce.majorVersion + "." + tinymce.minorVersion
                };
            }
        }
    }
    return button;
});

require('confluence/module-exporter')
    .safeRequire('bolo/numcapt/editor-button', function(button) {
        var tinymce = require('tinymce');

        // Register plugin
        tinymce.PluginManager.add('numcapt_tinymce', button);

        require('confluence-editor/loader/tinymce-bootstrap').addTinyMcePluginInit(function(settings) {
            settings.plugins += ',numcapt_tinymce';
        });
    });
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.extra.jira:macro-browser-resources', location = 'templates/extra/jira/view-in-jira.js' */
AJS.bind("add-handler.property-panel",function(k,g){AJS.log("add-handler.property-panel: panel name \x3d "+g.name);"macro"==g.name&&g.registerButtonHandler("view-in-jira",function(a,c){if(AJS.Editor.JiraConnector.servers){a=AJS.Editor.JiraConnector.servers;c=AJS.$(c);var b=c.attr("data-macro-default-parameter");c=c.attr("data-macro-parameters")||"";var e=Confluence.MacroParameterSerializer.deserialize(c);(b=b||e.jqlQuery||e.key)||(b=c.indexOf("|"),b=0<=b?c.substring(0,b):c);c=b;b=e.server;var h=e.serverId;
e=c.match(/=|!=|~|>|<|!~| is | in /i);for(var f=null,d=0;d<a.length;d++){if(h&&a[d].id==h){f=a[d];break}if(b&&a[d].name==b||!b&&a[d].selected){f=a[d];break}}null!=f&&(a="undefined"!==typeof f.displayUrl?f.displayUrl:f.url,"/"==a.charAt(a.length-1)&&(a=a.substr(0,a.length-1)),b="confluence-goto-jiralink-"+AJS.params.pageId,(e?window.open(a+"/secure/IssueNavigator.jspa?reset\x3dtrue\x26jqlQuery\x3d"+encodeURIComponent(c),b):window.open(a+"/browse/"+encodeURIComponent(c),b)).opener=null)}})});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.extra.jira:macro-browser-resources', location = 'templates/extra/jira/show-summary.js' */
AJS.bind("init.rte",function(){function a(b,d,e){if(e=AJS.$.grep(d,function(f){return"show-summary"==f.parameterName})[0])c(b)?"false"==AJS.SummaryHelper.getParam(b,"showSummary")?e.text="Show summary":e.text="Hide summary":e.className+=" hidden";else{AJS.logError("Jira Issues Macro - Show-summary : The system cannot find SummaryButton, all buttons are: ");for(var g in d)AJS.logError(d[g].text)}}function c(b){var d=
AJS.$(b).attr("src");if(!d)return!0;b=AJS.SummaryHelper.getParam(b,"count");return-1==d.indexOf("confluence.extra.jira/jira-table")&&"true"!=b?!0:!1}AJS.Confluence||AJS.Confluence.PropertyPanel||AJS.Confluence.PropertyPanel.Macro?(AJS.Confluence.PropertyPanel.Macro.registerInitHandler(a,"jira"),AJS.Confluence.PropertyPanel.Macro.registerInitHandler(a,"jiraissues")):AJS.logError("Jira Issues Macro : can't register property panel init handler since AJS.Confluence.PropertyPanel.Macro is undefined")});
AJS.bind("add-handler.property-panel",function(a,c){"macro"==c.name&&c.registerButtonHandler("show-summary",function(b,d){b=AJS.SummaryHelper.getParam(d,"showSummary");AJS.SummaryHelper.updateMacro("jira",d,"showSummary","false"==b?"true":"false")})});
AJS.SummaryHelper=function(){return{getCurrentParams:function(a){return Confluence.MacroParameterSerializer.deserialize(a.attr("data-macro-parameters"))},getParam:function(a,c){a=AJS.$(a);return AJS.SummaryHelper.getCurrentParams(a)[c]},updateMacro:function(a,c,b,d){c=AJS.$(c);AJS.Rte.getEditor().selection.select(c[0]);AJS.Rte.BookmarkManager.storeBookmark();var e=AJS.SummaryHelper.getCurrentParams(c);e[b]=d;a={contentId:Confluence.Editor.getContentId(),macro:{name:a,params:e,defaultParameterValue:c.attr("data-macro-default-parameter")}};
tinymce.confluence.MacroUtils.insertMacro(a)}}}();
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.integration.jira.jira-integration-plugin:lodash', location = '/custom-lodash/custom-lodash.js' */
/*

 Lodash (Custom Build) <https://lodash.com/>
 Build: `lodash include="bind,map,groupBy,compact,uniq,has,each,extend,filter,reject,bindAll,without,debounce,difference,forEach,take,find,chain,some,values,reduce" moduleId="jira-integration-plugin/custom-lodash"`
 Copyright JS Foundation and other contributors <https://js.foundation/>
 Released under MIT license <https://lodash.com/license>
 Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
*/
(function(){function va(a,b,c){switch(c.length){case 0:return a.call(b);case 1:return a.call(b,c[0]);case 2:return a.call(b,c[0],c[1]);case 3:return a.call(b,c[0],c[1],c[2])}return a.apply(b,c)}function Ic(a,b,c,d){for(var e=-1,g=null==a?0:a.length;++e<g;){var m=a[e];b(d,m,c(m),a)}return d}function C(a,b){for(var c=-1,d=null==a?0:a.length;++c<d&&!1!==b(a[c],c,a););return a}function wa(a,b){for(var c=-1,d=null==a?0:a.length,e=0,g=[];++c<d;){var m=a[c];b(m,c,a)&&(g[e++]=m)}return g}function Xa(a,b){var c;
if(c=!(null==a||!a.length)){if(b===b)a:{c=-1;for(var d=a.length;++c<d;)if(a[c]===b){a=c;break a}a=-1}else a=wb(a,Jc,0);c=-1<a}return c}function Kc(a,b,c){for(var d=-1,e=null==a?0:a.length;++d<e;)if(c(b,a[d]))return!0;return!1}function xa(a,b){for(var c=-1,d=null==a?0:a.length,e=Array(d);++c<d;)e[c]=b(a[c],c,a);return e}function W(a,b){for(var c=-1,d=b.length,e=a.length;++c<d;)a[e+c]=b[c];return a}function xb(a,b,c,d){var e=-1,g=null==a?0:a.length;for(d&&g&&(c=a[++e]);++e<g;)c=b(c,a[e],e,a);return c}
function yb(a,b){for(var c=-1,d=null==a?0:a.length;++c<d;)if(b(a[c],c,a))return!0;return!1}function wb(a,b,c,d){var e=a.length;for(c+=d?1:-1;d?c--:++c<e;)if(b(a[c],c,a))return c;return-1}function Jc(a){return a!==a}function Lc(a){return function(b){return null==b?k:b[a]}}function Mc(a,b,c,d,e){e(a,function(a,e,h){c=d?(d=!1,a):b(c,a,e,h)});return c}function ya(a){return function(b){return a(b)}}function Nc(a,b){return xa(b,function(b){return a[b]})}function zb(a,b){return a.has(b)}function Ab(a){var b=
-1,c=Array(a.size);a.forEach(function(a,e){c[++b]=[e,a]});return c}function Bb(a,b){return function(c){return a(b(c))}}function da(a,b){for(var c=-1,d=a.length,e=0,g=[];++c<d;){var m=a[c];if(m===b||"__lodash_placeholder__"===m)a[c]="__lodash_placeholder__",g[e++]=c}return g}function za(a){var b=-1,c=Array(a.size);a.forEach(function(a){c[++b]=a});return c}function f(a){if(x(a)&&!v(a)&&!(a instanceof q)){if(a instanceof E)return a;if(w.call(a,"__wrapped__"))return Cb(a)}return new E(a)}function Aa(){}
function E(a,b){this.__wrapped__=a;this.__actions__=[];this.__chain__=!!b;this.__index__=0;this.__values__=k}function q(a){this.__wrapped__=a;this.__actions__=[];this.__dir__=1;this.__filtered__=!1;this.__iteratees__=[];this.__takeCount__=4294967295;this.__views__=[]}function P(a){var b=-1,c=null==a?0:a.length;for(this.clear();++b<c;){var d=a[b];this.set(d[0],d[1])}}function J(a){var b=-1,c=null==a?0:a.length;for(this.clear();++b<c;){var d=a[b];this.set(d[0],d[1])}}function K(a){var b=-1,c=null==
a?0:a.length;for(this.clear();++b<c;){var d=a[b];this.set(d[0],d[1])}}function X(a){var b=-1,c=null==a?0:a.length;for(this.__data__=new K;++b<c;)this.add(a[b])}function F(a){this.size=(this.__data__=new J(a)).size}function Db(a,b){var c=v(a),d=!c&&Ba(a),e=!c&&!d&&ea(a),g=!c&&!d&&!e&&Ya(a);if(c=c||d||e||g){d=a.length;for(var m=String,h=-1,n=Array(d);++h<d;)n[h]=m(h);d=n}else d=[];m=d.length;for(var f in a)!b&&!w.call(a,f)||c&&("length"==f||e&&("offset"==f||"parent"==f)||g&&("buffer"==f||"byteLength"==
f||"byteOffset"==f)||fa(f,m))||d.push(f);return d}function Eb(a,b,c){var d=a[b];w.call(a,b)&&ha(d,c)&&(c!==k||b in a)||Ca(a,b,c)}function Da(a,b){for(var c=a.length;c--;)if(ha(a[c][0],b))return c;return-1}function Oc(a,b,c,d){Y(a,function(a,g,m){b(d,a,c(a),m)});return d}function Pc(a,b){return a&&ia(b,G(b),a)}function Qc(a,b){return a&&ia(b,ja(b),a)}function Ca(a,b,c){"__proto__"==b&&Ea?Ea(a,b,{configurable:!0,enumerable:!0,value:c,writable:!0}):a[b]=c}function Fa(a,b,c,d,e,g){var m,h=b&1,n=b&2,f=
b&4;c&&(m=e?c(a,d,e,g):c(a));if(m!==k)return m;if(!y(a))return a;if(d=v(a)){if(m=Rc(a),!h)return M(a,m)}else{var l=A(a),p="[object Function]"==l||"[object GeneratorFunction]"==l;if(ea(a))return Sc(a,h);if("[object Object]"==l||"[object Arguments]"==l||p&&!e){if(m=n||p?{}:Tc(a),!h)return n?Uc(a,Qc(m,a)):Vc(a,Pc(m,a))}else{if(!t[l])return e?a:{};m=Wc(a,l,h)}}g||(g=new F);if(e=g.get(a))return e;g.set(a,m);if(Fb(a))return a.forEach(function(d){m.add(Fa(d,b,c,d,a,g))}),m;if(Gb(a))return a.forEach(function(d,
e){m.set(e,Fa(d,b,c,e,a,g))}),m;n=f?n?Xc:Za:n?ja:G;var r=d?k:n(a);C(r||a,function(d,e){r&&(e=d,d=a[e]);Eb(m,e,Fa(d,b,c,e,a,g))});return m}function Hb(a,b,c,d){var e=-1,g=Xa,m=!0,h=a.length,n=[],f=b.length;if(!h)return n;c&&(b=xa(b,ya(c)));d?(g=Kc,m=!1):200<=b.length&&(g=zb,m=!1,b=new X(b));a:for(;++e<h;){var l=a[e],k=null==c?l:c(l);l=d||0!==l?l:0;if(m&&k===k){for(var r=f;r--;)if(b[r]===k)continue a;n.push(l)}else g(b,k,d)||n.push(l)}return n}function Ib(a,b){var c=[];Y(a,function(a,e,g){b(a,e,g)&&
c.push(a)});return c}function $a(a,b,c,d,e){var g=-1,m=a.length;c||(c=Yc);for(e||(e=[]);++g<m;){var h=a[g];0<b&&c(h)?1<b?$a(h,b-1,c,d,e):W(e,h):d||(e[e.length]=h)}return e}function Ga(a,b){return a&&Zc(a,b,G)}function Jb(a,b){return wa(b,function(b){return ka(a[b])})}function ab(a,b){b=bb(b,a);for(var c=0,d=b.length;null!=a&&c<d;)a=a[Z(b[c++])];return c&&c==d?a:k}function Kb(a,b,c){b=b(a);return v(a)?b:W(b,c(a))}function Q(a){if(null==a)return a===k?"[object Undefined]":"[object Null]";if(R&&R in
Object(a)){var b=w.call(a,R),c=a[R];try{a[R]=k;var d=!0}catch(g){}var e=Lb.call(a);d&&(b?a[R]=c:delete a[R]);a=e}else a=Lb.call(a);return a}function $c(a,b){return null!=a&&w.call(a,b)}function ad(a,b){return null!=a&&b in Object(a)}function Mb(a){return x(a)&&"[object Arguments]"==Q(a)}function aa(a,b,c,d,e){if(a===b)return!0;if(null==a||null==b||!x(a)&&!x(b))return a!==a&&b!==b;a:{var g=v(a),m=v(b),h=g?"[object Array]":A(a),n=m?"[object Array]":A(b);h="[object Arguments]"==h?"[object Object]":h;
n="[object Arguments]"==n?"[object Object]":n;var f="[object Object]"==h;m="[object Object]"==n;if((n=h==n)&&ea(a)){if(!ea(b)){b=!1;break a}g=!0;f=!1}if(n&&!f)e||(e=new F),b=g||Ya(a)?Nb(a,b,c,d,aa,e):bd(a,b,h,c,d,aa,e);else{if(!(c&1)&&(g=f&&w.call(a,"__wrapped__"),h=m&&w.call(b,"__wrapped__"),g||h)){a=g?a.value():a;b=h?b.value():b;e||(e=new F);b=aa(a,b,c,d,e);break a}if(n)b:if(e||(e=new F),g=c&1,h=Za(a),m=h.length,n=Za(b).length,m==n||g){for(f=m;f--;){var l=h[f];if(!(g?l in b:w.call(b,l))){b=!1;break b}}if((n=
e.get(a))&&e.get(b))b=n==b;else{n=!0;e.set(a,b);e.set(b,a);for(var p=g;++f<m;){l=h[f];var r=a[l],q=b[l];if(d)var t=g?d(q,r,l,b,a,e):d(r,q,l,a,b,e);if(t===k?r!==q&&!aa(r,q,c,d,e):!t){n=!1;break}p||(p="constructor"==l)}n&&!p&&(c=a.constructor,d=b.constructor,c!=d&&"constructor"in a&&"constructor"in b&&!("function"==typeof c&&c instanceof c&&"function"==typeof d&&d instanceof d)&&(n=!1));e["delete"](a);e["delete"](b);b=n}}else b=!1;else b=!1}}return b}function cd(a){return x(a)&&"[object Map]"==A(a)}
function dd(a,b,c,d){var e=c.length,g=e,m=!d;if(null==a)return!g;for(a=Object(a);e--;){var h=c[e];if(m&&h[2]?h[1]!==a[h[0]]:!(h[0]in a))return!1}for(;++e<g;){h=c[e];var f=h[0],z=a[f],l=h[1];if(m&&h[2]){if(z===k&&!(f in a))return!1}else{h=new F;if(d)var p=d(z,l,f,a,b,h);if(p===k?!aa(l,z,3,d,h):!p)return!1}}return!0}function ed(a){return x(a)&&"[object Set]"==A(a)}function fd(a){return x(a)&&Ha(a.length)&&!!u[Q(a)]}function Ob(a){return"function"==typeof a?a:null==a?ba:"object"==typeof a?v(a)?gd(a[0],
a[1]):hd(a):Pb(a)}function id(a,b){var c=-1,d=L(a)?Array(a.length):[];Y(a,function(a,g,m){d[++c]=b(a,g,m)});return d}function hd(a){var b=jd(a);return 1==b.length&&b[0][2]?Qb(b[0][0],b[0][1]):function(c){return c===a||dd(c,a,b)}}function gd(a,b){return cb(a)&&b===b&&!y(b)?Qb(Z(a),b):function(c){var d=db(c,a);return d===k&&d===b?Rb(c,a):aa(b,d,3)}}function kd(a){return function(b){return ab(b,a)}}function la(a,b){return eb(Sb(a,b,ba),a+"")}function Tb(a,b,c){var d=-1,e=a.length;0>b&&(b=-b>e?0:e+b);
c=c>e?e:c;0>c&&(c+=e);e=b>c?0:c-b>>>0;b>>>=0;for(c=Array(e);++d<e;)c[d]=a[d+b];return c}function ld(a,b){var c;Y(a,function(a,e,g){c=b(a,e,g);return!c});return!!c}function Ub(a){if("string"==typeof a)return a;if(v(a))return xa(a,Ub)+"";if(ma(a))return Vb?Vb.call(a):"";var b=a+"";return"0"==b&&1/a==-na?"-0":b}function Wb(a,b){a instanceof q&&(a=a.value());return xb(b,function(a,b){return b.func.apply(b.thisArg,W([a],b.args))},a)}function bb(a,b){return v(a)?a:cb(a,b)?[a]:md(Xb(a))}function Sc(a,b){if(b)return a.slice();
b=a.length;b=Yb?Yb(b):new a.constructor(b);a.copy(b);return b}function fb(a){var b=new a.constructor(a.byteLength);(new Ia(b)).set(new Ia(a));return b}function Zb(a,b,c,d){var e=-1,g=a.length,m=c.length,h=-1,f=b.length,k=H(g-m,0),l=Array(f+k);for(d=!d;++h<f;)l[h]=b[h];for(;++e<m;)if(d||e<g)l[c[e]]=a[e];for(;k--;)l[h++]=a[e++];return l}function $b(a,b,c,d){var e=-1,g=a.length,m=-1,h=c.length,f=-1,k=b.length,l=H(g-h,0),p=Array(l+k);for(d=!d;++e<l;)p[e]=a[e];for(l=e;++f<k;)p[l+f]=b[f];for(;++m<h;)if(d||
e<g)p[l+c[m]]=a[e++];return p}function M(a,b){var c=-1,d=a.length;for(b||(b=Array(d));++c<d;)b[c]=a[c];return b}function ia(a,b,c,d){var e=!c;c||(c={});for(var g=-1,m=b.length;++g<m;){var h=b[g],f=d?d(c[h],a[h],h,c,a):k;f===k&&(f=a[h]);e?Ca(c,h,f):Eb(c,h,f)}return c}function Vc(a,b){return ia(a,gb(a),b)}function Uc(a,b){return ia(a,ac(a),b)}function nd(a,b,c){function d(){return(this&&this!==B&&this instanceof d?g:a).apply(e?c:this,arguments)}var e=b&1,g=oa(a);return d}function oa(a){return function(){var b=
arguments;switch(b.length){case 0:return new a;case 1:return new a(b[0]);case 2:return new a(b[0],b[1]);case 3:return new a(b[0],b[1],b[2]);case 4:return new a(b[0],b[1],b[2],b[3]);case 5:return new a(b[0],b[1],b[2],b[3],b[4]);case 6:return new a(b[0],b[1],b[2],b[3],b[4],b[5]);case 7:return new a(b[0],b[1],b[2],b[3],b[4],b[5],b[6])}var c=Ja(a.prototype);b=a.apply(c,b);return y(b)?b:c}}function od(a,b,c){function d(){for(var g=arguments.length,m=Array(g),h=g,f=hb(d);h--;)m[h]=arguments[h];h=3>g&&m[0]!==
f&&m[g-1]!==f?[]:da(m,f);g-=h.length;return g<c?bc(a,b,Ka,d.placeholder,k,m,h,k,k,c-g):va(this&&this!==B&&this instanceof d?e:a,this,m)}var e=oa(a);return d}function Ka(a,b,c,d,e,g,m,f,n,z){function h(){for(var l=arguments.length,r=Array(l),I=l;I--;)r[I]=arguments[I];if(v){var y=hb(h),x;I=r.length;for(x=0;I--;)r[I]===y&&++x}d&&(r=Zb(r,d,e,v));g&&(r=$b(r,g,m,v));l-=x;if(v&&l<z)return y=da(r,y),bc(a,b,Ka,h.placeholder,c,r,y,f,n,z-l);y=q?c:this;I=t?y[a]:a;l=r.length;if(f){x=r.length;for(var A=S(f.length,
x),D=M(r);A--;){var C=f[A];r[A]=fa(C,x)?D[C]:k}}else u&&1<l&&r.reverse();p&&n<l&&(r.length=n);this&&this!==B&&this instanceof h&&(I=w||oa(I));return I.apply(y,r)}var p=b&128,q=b&1,t=b&2,v=b&24,u=b&512,w=t?k:oa(a);return h}function pd(a,b,c,d){function e(){for(var b=-1,f=arguments.length,k=-1,l=d.length,p=Array(l+f),r=this&&this!==B&&this instanceof e?m:a;++k<l;)p[k]=d[k];for(;f--;)p[k++]=arguments[++b];return va(r,g?c:this,p)}var g=b&1,m=oa(a);return e}function bc(a,b,c,d,e,g,m,h,n,z){var l=b&8,p=
l?m:k;m=l?k:m;var r=l?g:k;g=l?k:g;b=(b|(l?32:64))&~(l?64:32);b&4||(b&=-4);e=[a,b,e,r,p,g,m,h,n,z];c=c.apply(k,e);b:for(h=a.name+"",n=pa[h],z=w.call(pa,h)?n.length:0;z--;)if(l=n[z],p=l.func,null==p||p==a){h=l.name;break b}n=f[h];"function"==typeof n&&h in q.prototype?a===n?h=!0:(h=cc(n),h=!!h&&a===h[0]):h=!1;h&&dc(c,e);c.placeholder=d;return ec(c,a,b)}function Nb(a,b,c,d,e,g){var m=c&1,f=a.length,n=b.length;if(f!=n&&!(m&&n>f))return!1;if((n=g.get(a))&&g.get(b))return n==b;n=-1;var z=!0,l=c&2?new X:
k;g.set(a,b);for(g.set(b,a);++n<f;){var p=a[n],r=b[n];if(d)var q=m?d(r,p,n,b,a,g):d(p,r,n,a,b,g);if(q!==k){if(q)continue;z=!1;break}if(l){if(!yb(b,function(a,b){if(!l.has(b)&&(p===a||e(p,a,c,d,g)))return l.push(b)})){z=!1;break}}else if(p!==r&&!e(p,r,c,d,g)){z=!1;break}}g["delete"](a);g["delete"](b);return z}function bd(a,b,c,d,e,g,f){switch(c){case "[object DataView]":if(a.byteLength!=b.byteLength||a.byteOffset!=b.byteOffset)break;a=a.buffer;b=b.buffer;case "[object ArrayBuffer]":if(a.byteLength!=
b.byteLength||!g(new Ia(a),new Ia(b)))break;return!0;case "[object Boolean]":case "[object Date]":case "[object Number]":return ha(+a,+b);case "[object Error]":return a.name==b.name&&a.message==b.message;case "[object RegExp]":case "[object String]":return a==b+"";case "[object Map]":var m=Ab;case "[object Set]":m||(m=za);if(a.size!=b.size&&!(d&1))break;if(c=f.get(a))return c==b;d|=2;f.set(a,b);b=Nb(m(a),m(b),d,e,g,f);f["delete"](a);return b;case "[object Symbol]":if(qa)return qa.call(a)==qa.call(b)}return!1}
function fc(a){return eb(Sb(a,k,gc),a+"")}function Za(a){return Kb(a,G,gb)}function Xc(a){return Kb(a,ja,ac)}function hb(a){return(w.call(f,"placeholder")?f:a).placeholder}function D(){var a=f.iteratee||ib;a=a===ib?Ob:a;return arguments.length?a(arguments[0],arguments[1]):a}function La(a,b){a=a.__data__;var c=typeof b;return("string"==c||"number"==c||"symbol"==c||"boolean"==c?"__proto__"!==b:null===b)?a["string"==typeof b?"string":"hash"]:a.map}function jd(a){for(var b=G(a),c=b.length;c--;){var d=
b[c],e=a[d];b[c]=[d,e,e===e&&!y(e)]}return b}function T(a,b){a=null==a?k:a[b];b=!y(a)||hc&&hc in a?!1:(ka(a)?qd:rd).test(U(a));return b?a:k}function ic(a,b,c){b=bb(b,a);for(var d=-1,e=b.length,g=!1;++d<e;){var f=Z(b[d]);if(!(g=null!=a&&c(a,f)))break;a=a[f]}if(g||++d!=e)return g;e=null==a?0:a.length;return!!e&&Ha(e)&&fa(f,e)&&(v(a)||Ba(a))}function Rc(a){var b=a.length,c=new a.constructor(b);b&&"string"==typeof a[0]&&w.call(a,"index")&&(c.index=a.index,c.input=a.input);return c}function Tc(a){return"function"!=
typeof a.constructor||jb(a)?{}:Ja(jc(a))}function Wc(a,b,c){var d=a.constructor;switch(b){case "[object ArrayBuffer]":return fb(a);case "[object Boolean]":case "[object Date]":return new d(+a);case "[object DataView]":return b=c?fb(a.buffer):a.buffer,new a.constructor(b,a.byteOffset,a.byteLength);case "[object Float32Array]":case "[object Float64Array]":case "[object Int8Array]":case "[object Int16Array]":case "[object Int32Array]":case "[object Uint8Array]":case "[object Uint8ClampedArray]":case "[object Uint16Array]":case "[object Uint32Array]":return b=
c?fb(a.buffer):a.buffer,new a.constructor(b,a.byteOffset,a.length);case "[object Map]":return new d;case "[object Number]":case "[object String]":return new d(a);case "[object RegExp]":return b=new a.constructor(a.source,sd.exec(a)),b.lastIndex=a.lastIndex,b;case "[object Set]":return new d;case "[object Symbol]":return qa?Object(qa.call(a)):{}}}function Yc(a){return v(a)||Ba(a)||!!(kc&&a&&a[kc])}function fa(a,b){var c=typeof a;b=null==b?9007199254740991:b;return!!b&&("number"==c||"symbol"!=c&&td.test(a))&&
-1<a&&0==a%1&&a<b}function lc(a,b,c){if(!y(c))return!1;var d=typeof b;return("number"==d?L(c)&&fa(b,c.length):"string"==d&&b in c)?ha(c[b],a):!1}function cb(a,b){if(v(a))return!1;var c=typeof a;return"number"==c||"symbol"==c||"boolean"==c||null==a||ma(a)?!0:ud.test(a)||!vd.test(a)||null!=b&&a in Object(b)}function jb(a){var b=a&&a.constructor;return a===("function"==typeof b&&b.prototype||Ma)}function Qb(a,b){return function(c){return null==c?!1:c[a]===b&&(b!==k||a in Object(c))}}function Sb(a,b,
c){b=H(b===k?a.length-1:b,0);return function(){for(var d=arguments,e=-1,g=H(d.length-b,0),f=Array(g);++e<g;)f[e]=d[b+e];e=-1;for(g=Array(b+1);++e<b;)g[e]=d[e];g[b]=c(f);return va(a,this,g)}}function ec(a,b,c){var d=b+"";b=eb;var e=(e=d.match(wd))?e[1].split(xd):[];c=yd(e,c);if(e=c.length){var g=e-1;c[g]=(1<e?"\x26 ":"")+c[g];c=c.join(2<e?", ":" ");d=d.replace(zd,"{\n/* [wrapped with "+c+"] */\n")}return b(a,d)}function mc(a){var b=0,c=0;return function(){var d=Ad(),e=16-(d-c);c=d;if(0<e){if(800<=
++b)return arguments[0]}else b=0;return a.apply(k,arguments)}}function Z(a){if("string"==typeof a||ma(a))return a;var b=a+"";return"0"==b&&1/a==-na?"-0":b}function U(a){if(null!=a){try{return nc.call(a)}catch(b){}return a+""}return""}function yd(a,b){C(Bd,function(c){var d="_."+c[0];b&c[1]&&!Xa(a,d)&&a.push(d)});return a.sort()}function Cb(a){if(a instanceof q)return a.clone();var b=new E(a.__wrapped__,a.__chain__);b.__actions__=M(a.__actions__);b.__index__=a.__index__;b.__values__=a.__values__;return b}
function oc(a,b,c){var d=null==a?0:a.length;if(!d)return-1;c=null==c?0:N(c);0>c&&(c=H(d+c,0));return wb(a,D(b,3),c)}function gc(a){return(null==a?0:a.length)?$a(a,1):[]}function pc(a){var b=null==a?0:a.length;return b?a[b-1]:k}function kb(a){return null==a?a:Cd.call(a)}function qc(a){a=f(a);a.__chain__=!0;return a}function Na(a,b){return b(a)}function Dd(){return this}function rc(a,b){return(v(a)?C:Y)(a,D(b,3))}function Oa(a,b){if("function"!=typeof a||null!=b&&"function"!=typeof b)throw new TypeError("Expected a function");
var c=function(){var d=arguments,e=b?b.apply(this,d):d[0],g=c.cache;if(g.has(e))return g.get(e);d=a.apply(this,d);c.cache=g.set(e,d)||g;return d};c.cache=new (Oa.Cache||K);return c}function lb(a){if("function"!=typeof a)throw new TypeError("Expected a function");return function(){var b=arguments;switch(b.length){case 0:return!a.call(this);case 1:return!a.call(this,b[0]);case 2:return!a.call(this,b[0],b[1]);case 3:return!a.call(this,b[0],b[1],b[2])}return!a.apply(this,b)}}function ha(a,b){return a===
b||a!==a&&b!==b}function L(a){return null!=a&&Ha(a.length)&&!ka(a)}function Pa(a){return x(a)&&L(a)}function ka(a){if(!y(a))return!1;a=Q(a);return"[object Function]"==a||"[object GeneratorFunction]"==a||"[object AsyncFunction]"==a||"[object Proxy]"==a}function Ha(a){return"number"==typeof a&&-1<a&&0==a%1&&9007199254740991>=a}function y(a){var b=typeof a;return null!=a&&("object"==b||"function"==b)}function x(a){return null!=a&&"object"==typeof a}function sc(a){return"string"==typeof a||!v(a)&&x(a)&&
"[object String]"==Q(a)}function ma(a){return"symbol"==typeof a||x(a)&&"[object Symbol]"==Q(a)}function tc(a){if(!a)return[];if(L(a))return sc(a)?Ed.test(a)?a.match(Fd)||[]:a.split(""):M(a);if(ra&&a[ra]){a=a[ra]();for(var b,c=[];!(b=a.next()).done;)c.push(b.value);return c}b=A(a);return("[object Map]"==b?Ab:"[object Set]"==b?za:uc)(a)}function vc(a){if(!a)return 0===a?a:0;a=Qa(a);return a===na||a===-na?1.7976931348623157E308*(0>a?-1:1):a===a?a:0}function N(a){a=vc(a);var b=a%1;return a===a?b?a-b:
a:0}function Qa(a){if("number"==typeof a)return a;if(ma(a))return wc;y(a)&&(a="function"==typeof a.valueOf?a.valueOf():a,a=y(a)?a+"":a);if("string"!=typeof a)return 0===a?a:+a;a=a.replace(Gd,"");var b=Hd.test(a);return b||Id.test(a)?Jd(a.slice(2),b?2:8):Kd.test(a)?wc:+a}function Xb(a){return null==a?"":Ub(a)}function db(a,b,c){a=null==a?k:ab(a,b);return a===k?c:a}function Rb(a,b){return null!=a&&ic(a,b,ad)}function G(a){if(L(a))a=Db(a);else if(jb(a)){var b=[],c;for(c in Object(a))w.call(a,c)&&"constructor"!=
c&&b.push(c);a=b}else a=Ld(a);return a}function ja(a){if(L(a))a=Db(a,!0);else if(y(a)){var b=jb(a),c=[];for(d in a)("constructor"!=d||!b&&w.call(a,d))&&c.push(d);a=c}else{var d=[];if(null!=a)for(b in Object(a))d.push(b);a=d}return a}function uc(a){return null==a?[]:Nc(a,G(a))}function xc(a){return function(){return a}}function ba(a){return a}function ib(a){return Ob("function"==typeof a?a:Fa(a,1))}function mb(a,b,c){var d=G(b),e=Jb(b,d);null!=c||y(b)&&(e.length||!d.length)||(c=b,b=a,a=this,e=Jb(b,
G(b)));var g=!(y(c)&&"chain"in c)||!!c.chain,f=ka(a);C(e,function(c){var d=b[c];a[c]=d;f&&(a.prototype[c]=function(){var b=this.__chain__;if(g||b){var c=a(this.__wrapped__);(c.__actions__=M(this.__actions__)).push({func:d,args:arguments,thisArg:a});c.__chain__=b;return c}return d.apply(a,W([this.value()],arguments))})});return a}function nb(){}function Pb(a){return cb(a)?Lc(Z(a)):kd(a)}function ob(){return[]}function yc(){return!1}var k,na=1/0,wc=0/0,Bd=[["ary",128],["bind",1],["bindKey",2],["curry",
8],["curryRight",16],["flip",512],["partial",32],["partialRight",64],["rearg",256]],vd=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,ud=/^\w*$/,Md=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,Gd=/^\s+|\s+$/g,zd=/\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,wd=/\{\n\/\* \[wrapped with (.+)\] \*/,xd=/,? & /,Nd=/\\(\\)?/g,sd=/\w*$/,Kd=/^[-+]0x[0-9a-f]+$/i,Hd=/^0b[01]+$/i,rd=/^\[object .+?Constructor\]$/,Id=/^0o[0-7]+$/i,td=/^(?:0|[1-9]\d*)$/,Fd=
/\ud83c[\udffb-\udfff](?=\ud83c[\udffb-\udfff])|(?:[^\ud800-\udfff][\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]?|[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]|\ud83c[\udffb-\udfff])?)*/g,Ed=/[\u200d\ud800-\udfff\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff\ufe0e\ufe0f]/,
u={};u["[object Float32Array]"]=u["[object Float64Array]"]=u["[object Int8Array]"]=u["[object Int16Array]"]=u["[object Int32Array]"]=u["[object Uint8Array]"]=u["[object Uint8ClampedArray]"]=u["[object Uint16Array]"]=u["[object Uint32Array]"]=!0;u["[object Arguments]"]=u["[object Array]"]=u["[object ArrayBuffer]"]=u["[object Boolean]"]=u["[object DataView]"]=u["[object Date]"]=u["[object Error]"]=u["[object Function]"]=u["[object Map]"]=u["[object Number]"]=u["[object Object]"]=u["[object RegExp]"]=
u["[object Set]"]=u["[object String]"]=u["[object WeakMap]"]=!1;var t={};t["[object Arguments]"]=t["[object Array]"]=t["[object ArrayBuffer]"]=t["[object DataView]"]=t["[object Boolean]"]=t["[object Date]"]=t["[object Float32Array]"]=t["[object Float64Array]"]=t["[object Int8Array]"]=t["[object Int16Array]"]=t["[object Int32Array]"]=t["[object Map]"]=t["[object Number]"]=t["[object Object]"]=t["[object RegExp]"]=t["[object Set]"]=t["[object String]"]=t["[object Symbol]"]=t["[object Uint8Array]"]=
t["[object Uint8ClampedArray]"]=t["[object Uint16Array]"]=t["[object Uint32Array]"]=!0;t["[object Error]"]=t["[object Function]"]=t["[object WeakMap]"]=!1;var Jd=parseInt,zc="object"==typeof global&&global&&global.Object===Object&&global,Od="object"==typeof self&&self&&self.Object===Object&&self,B=zc||Od||Function("return this")(),pb="object"==typeof exports&&exports&&!exports.nodeType&&exports,Ra=pb&&"object"==typeof module&&module&&!module.nodeType&&module,Ac=Ra&&Ra.exports===pb,qb=Ac&&zc.process;
a:{try{var V=qb&&qb.binding&&qb.binding("util");break a}catch(a){}V=void 0}var Bc=V&&V.isMap,Cc=V&&V.isSet,Dc=V&&V.isTypedArray,rb=Array.prototype,Ma=Object.prototype,sb=B["__core-js_shared__"],nc=Function.prototype.toString,w=Ma.hasOwnProperty,hc=function(){var a=/[^.]+$/.exec(sb&&sb.keys&&sb.keys.IE_PROTO||"");return a?"Symbol(src)_1."+a:""}(),Lb=Ma.toString,qd=RegExp("^"+nc.call(w).replace(/[\\^$.*+?()[\]{}|]/g,"\\$\x26").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+
"$"),Sa=Ac?B.Buffer:k,O=B.Symbol,Ia=B.Uint8Array,Yb=Sa?Sa.allocUnsafe:k,jc=Bb(Object.getPrototypeOf,Object),Ec=Object.create,Fc=Ma.propertyIsEnumerable,Pd=rb.splice,kc=O?O.isConcatSpreadable:k,ra=O?O.iterator:k,R=O?O.toStringTag:k,Ea=function(){try{var a=T(Object,"defineProperty");a({},"",{});return a}catch(b){}}(),tb=Object.getOwnPropertySymbols,Qd=Sa?Sa.isBuffer:k,Ld=Bb(Object.keys,Object),H=Math.max,S=Math.min,Ad=Date.now,Cd=rb.reverse,ub=T(B,"DataView"),sa=T(B,"Map"),vb=T(B,"Promise"),ca=T(B,
"Set"),ta=T(B,"WeakMap"),ua=T(Object,"create"),Ta=ta&&new ta,pa={},Rd=U(ub),Sd=U(sa),Td=U(vb),Ud=U(ca),Vd=U(ta),Ua=O?O.prototype:k,qa=Ua?Ua.valueOf:k,Vb=Ua?Ua.toString:k,Ja=function(){function a(){}return function(b){if(!y(b))return{};if(Ec)return Ec(b);a.prototype=b;b=new a;a.prototype=k;return b}}();f.prototype=Aa.prototype;f.prototype.constructor=f;E.prototype=Ja(Aa.prototype);E.prototype.constructor=E;q.prototype=Ja(Aa.prototype);q.prototype.constructor=q;P.prototype.clear=function(){this.__data__=
ua?ua(null):{};this.size=0};P.prototype["delete"]=function(a){a=this.has(a)&&delete this.__data__[a];this.size-=a?1:0;return a};P.prototype.get=function(a){var b=this.__data__;return ua?(a=b[a],"__lodash_hash_undefined__"===a?k:a):w.call(b,a)?b[a]:k};P.prototype.has=function(a){var b=this.__data__;return ua?b[a]!==k:w.call(b,a)};P.prototype.set=function(a,b){var c=this.__data__;this.size+=this.has(a)?0:1;c[a]=ua&&b===k?"__lodash_hash_undefined__":b;return this};J.prototype.clear=function(){this.__data__=
[];this.size=0};J.prototype["delete"]=function(a){var b=this.__data__;a=Da(b,a);if(0>a)return!1;a==b.length-1?b.pop():Pd.call(b,a,1);--this.size;return!0};J.prototype.get=function(a){var b=this.__data__;a=Da(b,a);return 0>a?k:b[a][1]};J.prototype.has=function(a){return-1<Da(this.__data__,a)};J.prototype.set=function(a,b){var c=this.__data__,d=Da(c,a);0>d?(++this.size,c.push([a,b])):c[d][1]=b;return this};K.prototype.clear=function(){this.size=0;this.__data__={hash:new P,map:new (sa||J),string:new P}};
K.prototype["delete"]=function(a){a=La(this,a)["delete"](a);this.size-=a?1:0;return a};K.prototype.get=function(a){return La(this,a).get(a)};K.prototype.has=function(a){return La(this,a).has(a)};K.prototype.set=function(a,b){var c=La(this,a),d=c.size;c.set(a,b);this.size+=c.size==d?0:1;return this};X.prototype.add=X.prototype.push=function(a){this.__data__.set(a,"__lodash_hash_undefined__");return this};X.prototype.has=function(a){return this.__data__.has(a)};F.prototype.clear=function(){this.__data__=
new J;this.size=0};F.prototype["delete"]=function(a){var b=this.__data__;a=b["delete"](a);this.size=b.size;return a};F.prototype.get=function(a){return this.__data__.get(a)};F.prototype.has=function(a){return this.__data__.has(a)};F.prototype.set=function(a,b){var c=this.__data__;if(c instanceof J){var d=c.__data__;if(!sa||199>d.length)return d.push([a,b]),this.size=++c.size,this;c=this.__data__=new K(d)}c.set(a,b);this.size=c.size;return this};var Y=function(a,b){return function(c,d){if(null==c)return c;
if(!L(c))return a(c,d);for(var e=c.length,g=b?e:-1,f=Object(c);(b?g--:++g<e)&&!1!==d(f[g],g,f););return c}}(Ga),Zc=function(a){return function(b,c,d){var e=-1,g=Object(b);d=d(b);for(var f=d.length;f--;){var h=d[a?f:++e];if(!1===c(g[h],h,g))break}return b}}(),Gc=Ta?function(a,b){Ta.set(a,b);return a}:ba,Wd=Ea?function(a,b){return Ea(a,"toString",{configurable:!0,enumerable:!1,value:xc(b),writable:!0})}:ba,Xd=ca&&1/za(new ca([,-0]))[1]==na?function(a){return new ca(a)}:nb,cc=Ta?function(a){return Ta.get(a)}:
nb,gb=tb?function(a){if(null==a)return[];a=Object(a);return wa(tb(a),function(b){return Fc.call(a,b)})}:ob,ac=tb?function(a){for(var b=[];a;)W(b,gb(a)),a=jc(a);return b}:ob,A=Q;if(ub&&"[object DataView]"!=A(new ub(new ArrayBuffer(1)))||sa&&"[object Map]"!=A(new sa)||vb&&"[object Promise]"!=A(vb.resolve())||ca&&"[object Set]"!=A(new ca)||ta&&"[object WeakMap]"!=A(new ta))A=function(a){var b=Q(a);if(a=(a="[object Object]"==b?a.constructor:k)?U(a):"")switch(a){case Rd:return"[object DataView]";case Sd:return"[object Map]";
case Td:return"[object Promise]";case Ud:return"[object Set]";case Vd:return"[object WeakMap]"}return b};var dc=mc(Gc),eb=mc(Wd),md=function(a){a=Oa(a,function(a){500===b.size&&b.clear();return a});var b=a.cache;return a}(function(a){var b=[];46===a.charCodeAt(0)&&b.push("");a.replace(Md,function(a,d,e,g){b.push(e?g.replace(Nd,"$1"):d||a)});return b}),Yd=la(function(a,b){return Pa(a)?Hb(a,$a(b,1,Pa,!0)):[]}),Zd=la(function(a,b){return Pa(a)?Hb(a,b):[]});fc(function(a){var b=a.length,c=b?a[0]:0,d=
this.__wrapped__,e=function(b){for(var c=-1,d=a.length,e=Array(d),g=null==b;++c<d;)e[c]=g?k:db(b,a[c]);return e};if(1<b||this.__actions__.length||!(d instanceof q)||!fa(c))return this.thru(e);d=d.slice(c,+c+(b?1:0));d.__actions__.push({func:Na,args:[e],thisArg:k});return(new E(d,this.__chain__)).thru(function(a){b&&!a.length&&a.push(k);return a})});var $d=function(a){return function(b,c,d){var e=Object(b);if(!L(b)){var g=D(c,3);b=G(b);c=function(a){return g(e[a],a,e)}}c=a(b,c,d);return-1<c?e[g?b[c]:
c]:k}}(oc),ae=function(a,b){return function(c,d){var e=v(c)?Ic:Oc,g=b?b():{};return e(c,a,D(d,2),g)}}(function(a,b,c){w.call(a,c)?a[c].push(b):Ca(a,c,[b])}),Va=function(){return B.Date.now()},Wa=la(function(a,b,c){var d=1;if(c.length){var e=da(c,hb(Wa));d|=32}var g=b,f=c,h=e,n=void 0,q=void 0;c=d&2;if(!c&&"function"!=typeof a)throw new TypeError("Expected a function");b=f?f.length:0;b||(d&=-97,f=h=k);n=n===k?n:H(N(n),0);q=q===k?q:N(q);b-=h?h.length:0;if(d&64){var l=f,p=h;f=h=k}e=c?k:cc(a);l=[a,d,
g,f,h,l,p,void 0,n,q];if(e&&(p=l[1],a=e[1],d=p|a,g=128==a&&8==p||128==a&&256==p&&l[7].length<=e[8]||384==a&&e[7].length<=e[8]&&8==p,131>d||g)){a&1&&(l[2]=e[2],d|=p&1?0:4);if(p=e[3])g=l[3],l[3]=g?Zb(g,p,e[4]):p,l[4]=g?da(l[3],"__lodash_placeholder__"):e[4];if(p=e[5])g=l[5],l[5]=g?$b(g,p,e[6]):p,l[6]=g?da(l[5],"__lodash_placeholder__"):e[6];(p=e[7])&&(l[7]=p);a&128&&(l[8]=null==l[8]?e[8]:S(l[8],e[8]));null==l[9]&&(l[9]=e[9]);l[0]=e[0];l[1]=d}a=l[0];d=l[1];g=l[2];f=l[3];h=l[4];q=l[9]=l[9]===k?c?0:a.length:
H(l[9]-b,0);!q&&d&24&&(d&=-25);c=d&&1!=d?8==d||16==d?od(a,d,q):32!=d&&33!=d||h.length?Ka.apply(k,l):pd(a,d,g,f):nd(a,d,g);return ec((e?Gc:dc)(c,l),a,d)});Oa.Cache=K;var Ba=Mb(function(){return arguments}())?Mb:function(a){return x(a)&&w.call(a,"callee")&&!Fc.call(a,"callee")},v=Array.isArray,ea=Qd||yc,Gb=Bc?ya(Bc):cd,Fb=Cc?ya(Cc):ed,Ya=Dc?ya(Dc):fd,Hc=function(a){return la(function(b,c){var d=-1,e=c.length,g=1<e?c[e-1]:k,f=2<e?c[2]:k;g=3<a.length&&"function"==typeof g?(e--,g):k;f&&lc(c[0],c[1],f)&&
(g=3>e?k:g,e=1);for(b=Object(b);++d<e;)(f=c[d])&&a(b,f,d,g);return b})}(function(a,b){ia(b,ja(b),a)}),be=fc(function(a,b){C(b,function(b){b=Z(b);Ca(a,b,Wa(a[b],a))});return a});f.assignIn=Hc;f.bind=Wa;f.bindAll=be;f.chain=qc;f.compact=function(a){for(var b=-1,c=null==a?0:a.length,d=0,e=[];++b<c;){var g=a[b];g&&(e[d++]=g)}return e};f.constant=xc;f.debounce=function(a,b,c){function d(b){var c=n,d=q;n=q=k;t=b;return l=a.apply(d,c)}function e(a){var c=a-r;a-=t;return r===k||c>=b||0>c||u&&a>=x}function g(){var a=
Va();if(e(a))return f(a);var c=setTimeout;var d=a-t;a=b-(a-r);d=u?S(a,x-d):a;p=c(g,d)}function f(a){p=k;if(w&&n)return d(a);n=q=k;return l}function h(){var a=Va(),c=e(a);n=arguments;q=this;r=a;if(c){if(p===k)return t=a=r,p=setTimeout(g,b),v?d(a):l;if(u)return p=setTimeout(g,b),d(r)}p===k&&(p=setTimeout(g,b));return l}var n,q,l,p,r,t=0,v=!1,u=!1,w=!0;if("function"!=typeof a)throw new TypeError("Expected a function");b=Qa(b)||0;if(y(c)){v=!!c.leading;var x=(u="maxWait"in c)?H(Qa(c.maxWait)||0,b):x;
w="trailing"in c?!!c.trailing:w}h.cancel=function(){p!==k&&clearTimeout(p);t=0;n=r=q=p=k};h.flush=function(){return p===k?l:f(Va())};return h};f.difference=Yd;f.filter=function(a,b){return(v(a)?wa:Ib)(a,D(b,3))};f.flatten=gc;f.groupBy=ae;f.iteratee=ib;f.keys=G;f.keysIn=ja;f.map=function(a,b){return(v(a)?xa:id)(a,D(b,3))};f.memoize=Oa;f.mixin=mb;f.negate=lb;f.property=Pb;f.reject=function(a,b){return(v(a)?wa:Ib)(a,lb(D(b,3)))};f.reverse=kb;f.take=function(a,b,c){if(!a||!a.length)return[];b=c||b===
k?1:N(b);return Tb(a,0,0>b?0:b)};f.tap=function(a,b){b(a);return a};f.thru=Na;f.toArray=tc;f.uniq=function(a){if(a&&a.length)a:{var b=-1,c=Xa,d=a.length,e=!0,f=[];if(200<=d){if(c=Xd(a)){a=za(c);break a}e=!1;c=zb;var m=new X}else m=f;b:for(;++b<d;){var h=a[b],k=h;h=0!==h?h:0;if(e&&k===k){for(var q=m.length;q--;)if(m[q]===k)continue b;f.push(h)}else c(m,k,void 0)||(m!==f&&m.push(k),f.push(h))}a=f}else a=[];return a};f.values=uc;f.without=Zd;f.extend=Hc;mb(f,f);f.eq=ha;f.find=$d;f.findIndex=oc;f.forEach=
rc;f.get=db;f.has=function(a,b){return null!=a&&ic(a,b,$c)};f.hasIn=Rb;f.identity=ba;f.isArguments=Ba;f.isArray=v;f.isArrayLike=L;f.isArrayLikeObject=Pa;f.isBuffer=ea;f.isFunction=ka;f.isLength=Ha;f.isMap=Gb;f.isObject=y;f.isObjectLike=x;f.isSet=Fb;f.isString=sc;f.isSymbol=ma;f.isTypedArray=Ya;f.last=pc;f.stubArray=ob;f.stubFalse=yc;f.noop=nb;f.now=Va;f.reduce=function(a,b,c){var d=v(a)?xb:Mc,e=3>arguments.length;return d(a,D(b,4),c,e,Y)};f.some=function(a,b,c){var d=v(a)?yb:ld;c&&lc(a,b,c)&&(b=k);
return d(a,D(b,3))};f.toFinite=vc;f.toInteger=N;f.toNumber=Qa;f.toString=Xb;f.each=rc;mb(f,function(){var a={};Ga(f,function(b,c){w.call(f.prototype,c)||(a[c]=b)});return a}(),{chain:!1});f.VERSION="4.17.5";Wa.placeholder=f;C(["drop","take"],function(a,b){q.prototype[a]=function(c){c=c===k?1:H(N(c),0);var d=this.__filtered__&&!b?new q(this):this.clone();d.__filtered__?d.__takeCount__=S(c,d.__takeCount__):d.__views__.push({size:S(c,4294967295),type:a+(0>d.__dir__?"Right":"")});return d};q.prototype[a+
"Right"]=function(b){return this.reverse()[a](b).reverse()}});C(["filter","map","takeWhile"],function(a,b){var c=b+1,d=1==c||3==c;q.prototype[a]=function(a){var b=this.clone();b.__iteratees__.push({iteratee:D(a,3),type:c});b.__filtered__=b.__filtered__||d;return b}});C(["head","last"],function(a,b){var c="take"+(b?"Right":"");q.prototype[a]=function(){return this[c](1).value()[0]}});C(["initial","tail"],function(a,b){var c="drop"+(b?"":"Right");q.prototype[a]=function(){return this.__filtered__?new q(this):
this[c](1)}});q.prototype.compact=function(){return this.filter(ba)};q.prototype.find=function(a){return this.filter(a).head()};q.prototype.findLast=function(a){return this.reverse().find(a)};q.prototype.invokeMap=la(function(a,b){return"function"==typeof a?new q(this):this.map(function(c){var d=a;d=bb(d,c);c=2>d.length?c:ab(c,Tb(d,0,-1));d=null==c?c:c[Z(pc(d))];return null==d?k:va(d,c,b)})});q.prototype.reject=function(a){return this.filter(lb(D(a)))};q.prototype.slice=function(a,b){a=N(a);var c=
this;if(c.__filtered__&&(0<a||0>b))return new q(c);0>a?c=c.takeRight(-a):a&&(c=c.drop(a));b!==k&&(b=N(b),c=0>b?c.dropRight(-b):c.take(b-a));return c};q.prototype.takeRightWhile=function(a){return this.reverse().takeWhile(a).reverse()};q.prototype.toArray=function(){return this.take(4294967295)};Ga(q.prototype,function(a,b){var c=/^(?:filter|find|map|reject)|While$/.test(b),d=/^(?:head|last)$/.test(b),e=f[d?"take"+("last"==b?"Right":""):b],g=d||/^find/.test(b);e&&(f.prototype[b]=function(){var b=this.__wrapped__,
h=d?[1]:arguments,n=b instanceof q,t=h[0],l=n||v(b),p=function(a){a=e.apply(f,W([a],h));return d&&r?a[0]:a};l&&c&&"function"==typeof t&&1!=t.length&&(n=l=!1);var r=this.__chain__,u=!!this.__actions__.length;t=g&&!r;n=n&&!u;if(!g&&l)return b=n?b:new q(this),b=a.apply(b,h),b.__actions__.push({func:Na,args:[p],thisArg:k}),new E(b,r);if(t&&n)return a.apply(this,h);b=this.thru(p);return t?d?b.value()[0]:b.value():b})});C("pop push shift sort splice unshift".split(" "),function(a){var b=rb[a],c=/^(?:push|sort|unshift)$/.test(a)?
"tap":"thru",d=/^(?:pop|shift)$/.test(a);f.prototype[a]=function(){var a=arguments;if(d&&!this.__chain__){var f=this.value();return b.apply(v(f)?f:[],a)}return this[c](function(c){return b.apply(v(c)?c:[],a)})}});Ga(q.prototype,function(a,b){if(a=f[b]){var c=a.name+"";(pa[c]||(pa[c]=[])).push({name:b,func:a})}});pa[Ka(k,2).name]=[{name:"wrapper",func:k}];q.prototype.clone=function(){var a=new q(this.__wrapped__);a.__actions__=M(this.__actions__);a.__dir__=this.__dir__;a.__filtered__=this.__filtered__;
a.__iteratees__=M(this.__iteratees__);a.__takeCount__=this.__takeCount__;a.__views__=M(this.__views__);return a};q.prototype.reverse=function(){if(this.__filtered__){var a=new q(this);a.__dir__=-1;a.__filtered__=!0}else a=this.clone(),a.__dir__*=-1;return a};q.prototype.value=function(){var a=this.__wrapped__.value(),b=this.__dir__,c=v(a),d=0>b,e=c?a.length:0;var f=0;for(var k=e,h=this.__views__,n=-1,q=h.length;++n<q;){var l=h[n],p=l.size;switch(l.type){case "drop":f+=p;break;case "dropRight":k-=
p;break;case "take":k=S(k,f+p);break;case "takeRight":f=H(f,k-p)}}h=k;k=h-f;f=d?h:f-1;h=this.__iteratees__;n=h.length;q=0;l=S(k,this.__takeCount__);if(!c||!d&&e==k&&l==k)return Wb(a,this.__actions__);c=[];a:for(;k--&&q<l;){f+=b;d=-1;for(e=a[f];++d<n;){var r=h[d];p=r.iteratee;r=r.type;p=p(e);if(2==r)e=p;else if(!p)if(1==r)continue a;else break a}c[q++]=e}return c};f.prototype.chain=function(){return qc(this)};f.prototype.commit=function(){return new E(this.value(),this.__chain__)};f.prototype.next=
function(){this.__values__===k&&(this.__values__=tc(this.value()));var a=this.__index__>=this.__values__.length,b=a?k:this.__values__[this.__index__++];return{done:a,value:b}};f.prototype.plant=function(a){for(var b,c=this;c instanceof Aa;){var d=Cb(c);d.__index__=0;d.__values__=k;b?e.__wrapped__=d:b=d;var e=d;c=c.__wrapped__}e.__wrapped__=a;return b};f.prototype.reverse=function(){var a=this.__wrapped__;return a instanceof q?(this.__actions__.length&&(a=new q(this)),a=a.reverse(),a.__actions__.push({func:Na,
args:[kb],thisArg:k}),new E(a,this.__chain__)):this.thru(kb)};f.prototype.toJSON=f.prototype.valueOf=f.prototype.value=function(){return Wb(this.__wrapped__,this.__actions__)};f.prototype.first=f.prototype.head;ra&&(f.prototype[ra]=Dd);"function"==typeof define?(B.__jira_integration_plugin_lodash__=f,define("jira-integration-plugin/custom-lodash",function(){return f})):Ra?((Ra.exports=f)._=f,pb._=f):B.__jira_integration_plugin_lodash__=f}).call(this);
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.integration.jira.jira-integration-plugin:fields', location = '/fields/fields.soy' */
// This file was automatically generated from fields.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace jiraIntegration.templates.fields.
 */

if (typeof jiraIntegration == 'undefined') { var jiraIntegration = {}; }
if (typeof jiraIntegration.templates == 'undefined') { jiraIntegration.templates = {}; }
if (typeof jiraIntegration.templates.fields == 'undefined') { jiraIntegration.templates.fields = {}; }


jiraIntegration.templates.fields.stringField = function(opt_data, opt_ignored) {
  return '' + jiraIntegration.templates.fields.fieldWithExtraAttributes(soy.$$augmentMap(opt_data, {extraFieldClasses: 'long-field'}));
};
if (goog.DEBUG) {
  jiraIntegration.templates.fields.stringField.soyTemplateName = 'jiraIntegration.templates.fields.stringField';
}


jiraIntegration.templates.fields.textareaField = function(opt_data, opt_ignored) {
  return '<div class="field-group jira-field' + ((opt_data.extraClasses) ? ' ' + soy.$$escapeHtml(opt_data.extraClasses) : '') + '" data-jira-type="' + soy.$$escapeHtml(opt_data.jiraType) + '"><label for="' + soy.$$escapeHtml(opt_data.name) + '">' + soy.$$escapeHtml(opt_data.labelText) + ((opt_data.isRequired) ? '<span class="aui-icon icon-required"></span>' : '') + '</label><textarea rows="3" id="' + soy.$$escapeHtml(opt_data.name) + '" class="textarea long-field" data-name="' + soy.$$escapeHtml(opt_data.name) + '" name="' + soy.$$escapeHtml(opt_data.name) + '"' + ((opt_data.extraAttributes) ? ' ' + aui.renderExtraAttributes(opt_data) : '') + '>' + soy.$$escapeHtml(opt_data.value) + '</textarea>' + jiraIntegration.templates.fields.errors(opt_data) + '</div>';
};
if (goog.DEBUG) {
  jiraIntegration.templates.fields.textareaField.soyTemplateName = 'jiraIntegration.templates.fields.textareaField';
}


jiraIntegration.templates.fields.arrayField = function(opt_data, opt_ignored) {
  return '' + jiraIntegration.templates.fields.fieldWithExtraAttributes(soy.$$augmentMap(opt_data, {extraFieldClasses: 'long-field'}));
};
if (goog.DEBUG) {
  jiraIntegration.templates.fields.arrayField.soyTemplateName = 'jiraIntegration.templates.fields.arrayField';
}


jiraIntegration.templates.fields.numberField = function(opt_data, opt_ignored) {
  return '' + jiraIntegration.templates.fields.fieldWithExtraAttributes(soy.$$augmentMap(opt_data, {extraFieldClasses: 'medium-field'}));
};
if (goog.DEBUG) {
  jiraIntegration.templates.fields.numberField.soyTemplateName = 'jiraIntegration.templates.fields.numberField';
}


jiraIntegration.templates.fields.allowedValuesField = function(opt_data, opt_ignored) {
  return '' + ((opt_data.options.length) ? jiraIntegration.templates.fields.fieldWithExtraAttributes(soy.$$augmentMap(opt_data, {type: 'select'})) : jiraIntegration.templates.fields.fieldWithExtraAttributes(soy.$$augmentMap(opt_data, {type: 'value', value: 'None'})));
};
if (goog.DEBUG) {
  jiraIntegration.templates.fields.allowedValuesField.soyTemplateName = 'jiraIntegration.templates.fields.allowedValuesField';
}


jiraIntegration.templates.fields.timeTrackingField = function(opt_data, opt_ignored) {
  return '' + jiraIntegration.templates.fields.fieldWithExtraAttributes(soy.$$augmentMap(opt_data, {extraFieldClasses: 'medium-field'}));
};
if (goog.DEBUG) {
  jiraIntegration.templates.fields.timeTrackingField.soyTemplateName = 'jiraIntegration.templates.fields.timeTrackingField';
}


jiraIntegration.templates.fields.radioField = function(opt_data, opt_ignored) {
  return '' + aui.form.radioField(soy.$$augmentMap(opt_data, {legendContent: opt_data.labelText, extraAttributes: {'data-name': opt_data.name, name: opt_data.name, 'data-jira-type': opt_data.jiraType}, extraClasses: 'jira-field'}));
};
if (goog.DEBUG) {
  jiraIntegration.templates.fields.radioField.soyTemplateName = 'jiraIntegration.templates.fields.radioField';
}


jiraIntegration.templates.fields.unrenderableTypeField = function(opt_data, opt_ignored) {
  return '<div class="field-group jira-field jira-field-unrenderable' + ((opt_data.extraClasses) ? ' ' + soy.$$escapeHtml(opt_data.extraClasses) : '') + '"><label>' + soy.$$escapeHtml(opt_data.labelText) + ((opt_data.isRequired) ? '<span class="aui-icon icon-required"></span>' : '') + '</label>' + aui.form.value({content: opt_data.reasonContent}) + jiraIntegration.templates.fields.errors(opt_data) + '</div>';
};
if (goog.DEBUG) {
  jiraIntegration.templates.fields.unrenderableTypeField.soyTemplateName = 'jiraIntegration.templates.fields.unrenderableTypeField';
}


jiraIntegration.templates.fields.dateField = function(opt_data, opt_ignored) {
  return '' + jiraIntegration.templates.fields.fieldWithExtraAttributes(soy.$$augmentMap(opt_data, {extraFieldClasses: 'medium-field'}));
};
if (goog.DEBUG) {
  jiraIntegration.templates.fields.dateField.soyTemplateName = 'jiraIntegration.templates.fields.dateField';
}


jiraIntegration.templates.fields.checkboxField = function(opt_data, opt_ignored) {
  return '' + aui.form.checkboxField(soy.$$augmentMap(opt_data, {legendContent: opt_data.labelText, extraAttributes: {'data-name': opt_data.name, name: opt_data.name, 'data-jira-type': opt_data.jiraType}, extraClasses: 'jira-field'}));
};
if (goog.DEBUG) {
  jiraIntegration.templates.fields.checkboxField.soyTemplateName = 'jiraIntegration.templates.fields.checkboxField';
}


jiraIntegration.templates.fields.select2WithIconField = function(opt_data, opt_ignored) {
  var output = '<div class="field-group jira-field' + ((opt_data.extraClasses) ? ' ' + soy.$$escapeHtml(opt_data.extraClasses) : '') + '" data-jira-type="' + soy.$$escapeHtml(opt_data.jiraType) + '"><label for="' + soy.$$escapeHtml(opt_data.name) + '">' + soy.$$escapeHtml(opt_data.labelText) + ((opt_data.isRequired) ? '<span class="aui-icon icon-required"></span>' : '') + '</label><select id="' + soy.$$escapeHtml(opt_data.name) + '" class="medium-field" name="' + soy.$$escapeHtml(opt_data.name) + '" data-name="' + soy.$$escapeHtml(opt_data.name) + '"' + ((opt_data.extraAttributes) ? ' ' + aui.renderExtraAttributes(opt_data) : '') + '>';
  var optionList112 = opt_data.options;
  var optionListLen112 = optionList112.length;
  for (var optionIndex112 = 0; optionIndex112 < optionListLen112; optionIndex112++) {
    var optionData112 = optionList112[optionIndex112];
    output += '<option value="' + soy.$$escapeHtml(optionData112.value) + '" ' + ((optionData112.selected) ? 'selected' : '') + ' data-icon-url="' + soy.$$escapeHtml(optionData112.iconUrl) + '">' + soy.$$escapeHtml(optionData112.text) + '</option>';
  }
  output += '</select>' + jiraIntegration.templates.fields.errors(opt_data) + '</div>';
  return output;
};
if (goog.DEBUG) {
  jiraIntegration.templates.fields.select2WithIconField.soyTemplateName = 'jiraIntegration.templates.fields.select2WithIconField';
}


jiraIntegration.templates.fields.select2WithIconOption = function(opt_data, opt_ignored) {
  return ((opt_data.iconUrl) ? aui.avatar.avatar({avatarImageUrl: opt_data.iconUrl, size: 'xsmall', isProject: opt_data.isProject, extraClasses: 'select-option-image', tagName: 'span'}) : '') + '<span class="select-option" title="' + soy.$$escapeHtml(opt_data.optionValue) + '">' + soy.$$escapeHtml(opt_data.optionValue) + '</span>';
};
if (goog.DEBUG) {
  jiraIntegration.templates.fields.select2WithIconOption.soyTemplateName = 'jiraIntegration.templates.fields.select2WithIconOption';
}


jiraIntegration.templates.fields.labelFieldResult = function(opt_data, opt_ignored) {
  return '' + ((opt_data.label.isNew) ? soy.$$escapeHtml(AJS.format('\x22{0}\x22 - (New label)',opt_data.label.labelName)) : soy.$$escapeHtml(opt_data.label.labelName));
};
if (goog.DEBUG) {
  jiraIntegration.templates.fields.labelFieldResult.soyTemplateName = 'jiraIntegration.templates.fields.labelFieldResult';
}


jiraIntegration.templates.fields.userOptionSelect = function(opt_data, opt_ignored) {
  var output = '';
  var userOption__soy150 = '' + soy.$$escapeHtml(opt_data.displayName) + ((! opt_data.isSystemOption) ? ' - (' + soy.$$escapeHtml(opt_data.name) + ')' : '');
  output += '<span data-value="' + soy.$$escapeHtml(opt_data.name) + '" title="' + soy.$$filterNoAutoescape(userOption__soy150) + '">' + soy.$$filterNoAutoescape(userOption__soy150) + '</span>';
  return output;
};
if (goog.DEBUG) {
  jiraIntegration.templates.fields.userOptionSelect.soyTemplateName = 'jiraIntegration.templates.fields.userOptionSelect';
}


jiraIntegration.templates.fields.sprintSelect = function(opt_data, opt_ignored) {
  return '<span title="' + soy.$$escapeHtml(opt_data.name) + '">' + soy.$$escapeHtml(opt_data.name) + '<span class="sprint-detail">' + ((opt_data.state == 'FUTURE') ? soy.$$escapeHtml(AJS.format('(Future sprint in {0})',opt_data.board)) : '') + ((opt_data.state == 'ACTIVE') ? soy.$$escapeHtml(AJS.format('(Active sprint in {0})',opt_data.board)) : '') + '</span></span>';
};
if (goog.DEBUG) {
  jiraIntegration.templates.fields.sprintSelect.soyTemplateName = 'jiraIntegration.templates.fields.sprintSelect';
}


jiraIntegration.templates.fields.epicSelect = function(opt_data, opt_ignored) {
  return '<span title="' + soy.$$escapeHtml(opt_data.name) + ' (' + soy.$$escapeHtml(opt_data.key) + ')">' + soy.$$escapeHtml(opt_data.name) + ((opt_data.key) ? '<span class="epic-detail">' + soy.$$escapeHtml(opt_data.key) + '</span>' : '') + '</span>';
};
if (goog.DEBUG) {
  jiraIntegration.templates.fields.epicSelect.soyTemplateName = 'jiraIntegration.templates.fields.epicSelect';
}


jiraIntegration.templates.fields.errors = function(opt_data, opt_ignored) {
  opt_data = opt_data || {};
  var output = '';
  if (opt_data.errorTexts) {
    var errorList195 = opt_data.errorTexts;
    var errorListLen195 = errorList195.length;
    for (var errorIndex195 = 0; errorIndex195 < errorListLen195; errorIndex195++) {
      var errorData195 = errorList195[errorIndex195];
      output += '<div class="error">' + soy.$$escapeHtml(errorData195) + '</div>';
    }
  }
  return output;
};
if (goog.DEBUG) {
  jiraIntegration.templates.fields.errors.soyTemplateName = 'jiraIntegration.templates.fields.errors';
}


jiraIntegration.templates.fields.fieldWithExtraAttributes = function(opt_data, opt_ignored) {
  var output = '<div class="field-group jira-field' + ((opt_data.extraClasses) ? ' ' + soy.$$escapeHtml(opt_data.extraClasses) : '') + '" data-jira-type=' + soy.$$escapeHtml(opt_data.jiraType) + '>' + aui.form.label({forField: opt_data.name, isRequired: opt_data.isRequired, content: '' + soy.$$escapeHtml(opt_data.labelText)});
  switch (opt_data.type) {
    case 'select':
      output += aui.form.select({id: opt_data.name, name: opt_data.name, labelContent: '' + soy.$$escapeHtml(opt_data.labelText), options: opt_data.options, isRequired: opt_data.isRequired, isMultiple: opt_data.isMultiple, extraAttributes: soy.$$augmentMap({'data-name': opt_data.name}, opt_data.extraAttributes), extraClasses: opt_data.extraFieldClasses});
      break;
    case 'value':
      output += aui.form.value({id: opt_data.name, content: '' + soy.$$escapeHtml(opt_data.value)});
      break;
    default:
      output += aui.form.input({id: opt_data.name, name: opt_data.name, type: 'text', value: opt_data.value, extraAttributes: soy.$$augmentMap({'data-name': opt_data.name}, opt_data.extraAttributes), extraClasses: opt_data.extraFieldClasses});
  }
  output += jiraIntegration.templates.fields.errors(opt_data) + '</div>';
  return output;
};
if (goog.DEBUG) {
  jiraIntegration.templates.fields.fieldWithExtraAttributes.soyTemplateName = 'jiraIntegration.templates.fields.fieldWithExtraAttributes';
}

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.integration.jira.jira-integration-plugin:fields', location = '/fields/fields.js' */
define("jira-integration-plugin/fields",["jquery","jira-integration-plugin/custom-lodash","jira-integration-plugin/label-picker"],function(h,g,W){function D(a,b,c,d){var e=b.schema.system||"customfield_"+b.schema.customId,k=b.schema.system||b.schema.custom||b.schema.customId,l=p[k],E=!(!l||l.canRender&&!l.canRender(b)),F=!(!b.operations||!b.operations.length);l=E&&F?l:X;return l.getContext({labelText:b.name,name:e,isRequired:b.required,value:c[e],errorTexts:d[e],jiraType:k,isRenderable:E,hasOperations:F,
handler:l,extraAttributes:b.required&&{"data-aui-validation-field":"",required:!0}},b,a,c)}function n(a,b,c){var d=a.name;a.value=(h.isPlainObject(a.value)?a.value.name:a.value)||c&&c.fields[d]||b&&b.defaultValue||"";return a}function t(a){return a.val()}function G(a){a=a.val();return/\d/.test(a)&&/^-?\d*\.?\d*$/.test(a)?Number(a):a||null}function H(a,b,c){var d=a.name;a.value=a.value&&a.value.join(",")||c&&c.fields[d]&&c.fields[d].join(",")||b&&b.defaultValue&&b.defaultValue.join(" ");return a}function I(a){return g.map(a.val().split(","),
h.trim)}function J(a,b,c){function d(a){return Array.isArray(a)?a.map(function(a){return a.name||a.id}):[a.name||a.id]}var e=a.name,k=a.value;c=c&&c.fields[e];e=b&&b.defaultValue;var l=k?d(k):c?d(c):e?d(e):[];a.options=g.map(b.allowedValues,function(a){return{value:a.id,text:a.name||a.value,selected:l.includes(a.name||a.id)}});b.required||"option"!==b.schema.type||a.options.unshift({value:-1,text:"None"});a.isMultiple=b.operations.includes("add");delete a.value;
return a}function x(a,b){var c=b.val(),d=function(b){var c={};c[a]=b;return c};return b.attr("multiple")?Array.isArray(c)?g.map(c,d):[d(c)]:d(c)}function K(a,b,c){var d=a.name;a.value=a.value&&a.value.name||c&&c.fields[d]&&c.fields[d].name||("assignee"===q(b)?-1:"")||b&&b.defaultValue&&b.defaultValue.name;a.extraClasses="array"===b.schema.type?"multi-user-picker":"single-user-picker";return a}function L(a,b,c){var d=a.value||c&&c.fields[a.name]||b&&b.defaultValue;a.fields=g.map(b.allowedValues,function(a){return{id:a.id,
value:a.id,labelText:a.name||a.value,isChecked:Array.isArray(d)?d.some(function(b){return b.id===a.id}):d&&d.id===a.id}});delete a.value;return a}function M(a){return a.find("input:checked").toArray().map(function(a){a=h(a);return{id:a.attr("value"),value:a.parent().find("label").text()}})}function y(a,b,c,d,e){var k=a.find("input"),l=a.attr("name");k.removeClass("text").removeClass("long-field").addClass("medium-long-field");k.auiSelect2(h.extend({minimumInputLength:1,id:l,name:l,query:function(a){r(b,
c,a.term,d).done(function(b){a.callback({results:b})})}},e));(e=k.auiSelect2("data"))&&-1!==e.id&&k.auiSelect2("val",e.id);a.find("div.aui-select2-container").addClass("jira-select2-drop-box")}function N(a,b,c,d,e){e=h.extend({},e,{multiple:"com.atlassian.jira.plugin.system.customfieldtypes:multiuserpicker"===c,formatResult:function(a){return f.fields.userOptionSelect({name:a.id,displayName:a.text,isSystemOption:!!a.isSystemOption})}});y(a,b,c,d,e)}function r(a,b,c,d){a=h.extend({restType:b,issueKey:d&&
d.key||"",term:c},a);return h.ajax({type:"POST",timeout:0,contentType:"application/json",dataType:"json",url:AJS.contextPath()+"/rest/jira-integration/latest/fields/autocomplete",data:JSON.stringify(a)})}function O(a){var b;a.id&&(b=h(a.element).attr("data-icon-url"));return f.fields.select2WithIconOption({optionValue:a.text,iconUrl:b})}function z(a){return(a=a.auiSelect2("data"))&&-1===a.id?void 0:a}function q(a){return a.schema?a.schema.system||a.schema.custom||a.schema.customId:a}function A(a){return p[q(a)]}
function P(a){return(a=Q(a))&&A(a)}function Q(a){return a.closest(".jira-field").attr("data-jira-type")}function Y(a,b){return h.ajax({type:"GET",timeout:0,url:AJS.contextPath()+"/rest/jira-integration/1.0/servers/"+a.serverId+"/projects/"+a.projectKey+"/issue-types/"+a.issueType+"/fields-meta"}).pipe(function(a){var c=[];g.each(a.fields,function(a){var d=q(a);a.required&&!b.excludedFields.includes(d)&&c.push(a)});return c})}function R(a,b,c){var d=Q(a),e=d&&A(d);(e=e&&e.behavior)&&e(a,b,d,c)}function S(a){var b=
P(a);return b&&b.getValue&&b.getValue(a)}function u(a,b){return function(c,d){c=a[c.attr("id")];d(c||b)}}var f=window.jiraIntegration.templates,v={template:f.fields.stringField,getContext:n,getValue:t},Z={template:f.fields.stringField,getContext:function(a,b,c){var d={"data-aui-validation-field":"",pattern:"([a-zA-Z][a-zA-Z0-9-+.]*://.+)|^$","data-aui-validation-pattern-msg":"Enter a valid URL scheme"};return h.extend(!0,{},n(a,b,c),{extraAttributes:d})},getValue:t},aa=
{template:f.fields.stringField,getContext:K,getInternalValue:z,getValue:function(a){a=a.val();if("-1"!==a)return{name:a}},behavior:function(a,b,c,d){var e={minimumInputLength:0,initSelection:u(b,{id:-1,text:"Automatic",isSystemOption:!0}),query:function(a){function e(b){1===a.page&&(a.element.prop("required")||b.unshift({id:"",text:"Unassigned",isSystemOption:!0}),b.unshift({id:-1,text:"Automatic",isSystemOption:!0}));
a.callback({results:b})}0<a.term.length?r(b,c,a.term,d).done(e):e([])}};N(a,b,c,d,e)}},B={template:f.fields.stringField,getContext:K,getValue:function(a){var b=function(a){return{name:a}},c=a.val();a=a.closest(".jira-field").is(".multi-user-picker");return c?a?g.map(c.split(","),b):b(c):a?[]:null},behavior:function(a,b,c,d){var e=a.find(".long-field").attr("value")||"";e={formatInputTooShort:function(){return "Find users..."},initSelection:u(b,{id:-1,text:e,isSystemOption:!1})};
N(a,b,c,d,e)}},ba={template:f.fields.arrayField,getContext:H,getValue:I,behavior:function(a,b,c,d){a=a.find("input");W.build(a,function(a){return r(b,c,a,d)})}},C={template:f.fields.textareaField,getContext:n,getValue:t},ca={template:f.fields.numberField,getContext:function(a,b,c){var d={"data-aui-validation-field":"",pattern:"(([0-9]*[.])?[0-9]+)|^$","data-aui-validation-pattern-msg":"Enter a valid number"};return h.extend(!0,{},n(a,b,c),{extraAttributes:d})},getValue:G},
T={template:f.fields.arrayField,getContext:H,getValue:I},m={template:f.fields.allowedValuesField,getContext:J,getValue:g.bind(x,null,"id"),behavior:function(a){a.find("select[multiple]").auiSelect2()}},U={template:f.fields.allowedValuesField,getContext:J,getValue:g.bind(x,null,"id")},da={template:f.fields.timeTrackingField,getContext:function(a,b,c){b={"data-aui-validation-field":"",pattern:"(([0-9]+w|[0-9]+d|[0-9]+m|[0-9]+h|[0-9]+)\\s*)*","data-aui-validation-pattern-msg":"Enter a valid time estimate (eg. 3w 4d 12h)"};
a.value=a.value&&a.value.remainingEstimate||c&&c.fields[name]&&c.fields[name].remainingEstimate||"";return h.extend(!0,{},a,{extraAttributes:b})},getValue:function(a){return{remainingEstimate:a.val()}}},V={template:f.fields.dateField,getContext:function(a,b,c){var d={"data-aui-validation-field":"",pattern:"^([0-9]{2,4}-(0?[1-9]|10|11|12)-([0-2]?[1-9]|10|20|30|31))$|^$","data-aui-validation-pattern-msg":"Enter a valid date"};return h.extend(!0,{},n(a,b,c),{extraAttributes:d})},
getValue:function(a){a=a.val();return""===a?null:a},behavior:function(a){var b=a.find("input");navigator.userAgent.match(/Trident/)&&"5.3.5">AJS.version?(a="placeholder"in document.createElement("input"),b.attr("placeholder","YYYY-MM-DD"),a||b.on("focus",function(){b.val()===b.attr("placeholder")&&b.val("")}).on("blur",function(){""===b.val()&&b.val(b.attr("placeholder"))}).blur()):WRM.require("wr!com.atlassian.auiplugin:aui-date-picker").done(function(){b.datePicker({overrideBrowserDefault:!0})})}},
ea={template:f.fields.select2WithIconField,getContext:function(a,b,c){var d=a.name,e=a.value&&a.value.id||b&&b.defaultValue&&b.defaultValue.id||"",k=a.value&&a.value.name||c&&c.fields&&c.fields[d]&&c.fields[d].name||b&&b.defaultValue&&b.defaultValue.id||"";delete a.value;a.options=g.map(b.allowedValues,function(a){return{value:a.id,text:a.name,selected:k===a.name||e===a.id,iconUrl:a.iconUrl}});return a},getValue:g.bind(x,null,"id"),behavior:function(a,b,c,d){h.fn.auiSelect2?(a=a.find("select"),a.addClass("jira-select2-drop-box"),
a.auiSelect2({hasAvatar:!0,minimumResultsForSearch:-1,formatSelection:O,formatResult:O})):AJS.log("AUI version 5.2 or greater is required as this plugin needs the .auiSelect2() jQuery plugin.")}},X={template:f.fields.unrenderableTypeField,getContext:function(a,b,c){a.reasonContent=a.isRenderable?a.hasOperations?null:c?AJS.format("{0}Edit{1} this field in Jira.",'\x3ca href\x3d"'+c.url+'"\x3e',"\x3c/a\x3e"):AJS.escapeHtml("Edit this field in Jira after creation."):c?AJS.format("{0}Edit{1} this field in Jira.",
'\x3ca href\x3d"'+c.url+'"\x3e',"\x3c/a\x3e"):AJS.escapeHtml("Edit this field in Jira after creation.");return a}},p={"com.pyxis.greenhopper.jira:gh-epic-label":v,string:v,summary:v,"com.atlassian.jira.plugin.system.customfieldtypes:textfield":v,"com.atlassian.jira.plugin.system.customfieldtypes:url":Z,environment:C,"com.atlassian.jira.plugin.system.customfieldtypes:textarea":C,description:C,"com.atlassian.jira.plugin.system.customfieldtypes:float":ca,array:T,"com.atlassian.jira.plugin.system.customfieldtypes:labels":T,
labels:ba,priority:ea,resolution:m,fixVersions:m,versions:m,components:m,security:m,"com.atlassian.jira.plugin.system.customfieldtypes:version":m,"com.atlassian.jira.plugin.system.customfieldtypes:multiversion":m,"com.atlassian.jira.plugin.system.customfieldtypes:project":m,assignee:aa,reporter:B,"com.atlassian.jira.plugin.system.customfieldtypes:userpicker":B,"com.atlassian.jira.plugin.system.customfieldtypes:multiuserpicker":B,timetracking:da,duedate:V,"com.atlassian.jira.plugin.system.customfieldtypes:datepicker":V,
"com.atlassian.jira.plugin.system.customfieldtypes:multiselect":U,"com.atlassian.jira.plugin.system.customfieldtypes:select":U,"com.pyxis.greenhopper.jira:gh-sprint":{template:f.fields.stringField,getContext:n,getInternalValue:z,getValue:G,behavior:function(a,b,c,d){var e={minimumInputLength:0,formatResult:function(a){return f.fields.sprintSelect({name:a.text,state:a.state,board:a.board})},query:function(a){r(b,c,a.term,d).done(function(b){var c=g.groupBy(b,function(a){return a.suggestion?"suggestions":
"all"});b=["suggestions","all"].filter(function(a){return c[a]&&0<c[a].length}).map(function(a){return{text:"suggestions"===a?"Suggestions":"All sprints",children:c[a]}});a.callback({results:g.compact(b)})})},initSelection:u(b,{id:-1,text:"Select a sprint"})};return y(a,b,c,d,e)}},"com.pyxis.greenhopper.jira:gh-epic-link":{template:f.fields.stringField,getContext:n,getInternalValue:z,getValue:function(a){return(a=
t(a))&&""!==a?a:void 0},behavior:function(a,b,c,d){var e={minimumInputLength:0,formatResult:function(a){return f.fields.epicSelect({name:a.text,key:a.id})},query:function(a){r(b,c,a.term,d).done(function(b){var c=g.uniq(b.map(function(a){return a.list})).map(function(a){return{text:a,children:b.filter(function(b){return b.list===a})}});a.callback({results:c})})},initSelection:u(b,{id:-1,text:"Select an epic"})};return y(a,b,c,d,e)}},"com.atlassian.jira.plugin.system.customfieldtypes:multicheckboxes":{template:f.fields.checkboxField,
getContext:L,getValue:M},"com.atlassian.jira.plugin.system.customfieldtypes:radiobuttons":{template:f.fields.radioField,getContext:L,getValue:function(a){a=M(a);return 1===a.length?a[0]:null}}},fa={ignoreFieldsWithDefaultValue:!1},w={addFieldHandler:function(a,b){g.has(p,a)&&console&&console.warn&&console.warn("Redefining handler for type "+a+".");p[a]=b},getFieldHandler:A,getFieldType:q,isKnownRestType:function(a){return p.hasOwnProperty(a)},canRender:function(a){var b=q(a);return(b=p[b])?a.operations&&
a.operations.length&&(!b.canRender||b.canRender(a)):!1},getContext:function(a,b,c,d){return D(a,b,c||{},d||{})},renderField:function(a,b,c,d){a=D(a,b,c||{},d||{});return a.handler.template(a)},getInternalJSON:function(a){var b=P(a);return b&&b.getInternalValue&&b.getInternalValue(a)||S(a)},getJSON:S,attachFieldBehavior:R,attachFieldBehaviors:function(a,b,c){a.find(".jira-field").each(function(a,e){a=h(e);R(a,b,c)})},setFieldError:function(a,b){a.find(".error").remove();b&&(b=f.fields.errors({errorTexts:b}),
a.append(b))},renderCreateRequiredFields:function(a,b,c,d,e){function f(b){d.ignoreFieldsWithDefaultValue&&(b=g.filter(b,function(a){return!a.hasDefaultValue}));var f=g.filter(b,function(a){return!w.canRender(a)});f.length?e&&e(f):(a.html(g.map(b,function(a){return w.renderField(null,a,null,null)}).join("")),w.attachFieldBehaviors(a,{serverId:c.serverId,projectKey:c.projectKey},null))}d=g.extend({},fa,d);d.requiredFields?f(d.requiredFields):Y(c,d).done(f)}};return w});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.integration.jira.jira-integration-plugin:fields', location = '/fields/label-picker.js' */
define("jira-integration-plugin/label-picker",[],function(){var d=window.jiraIntegration.templates;return{build:function(c,e){c.auiSelect2({tags:!0,multiple:!0,tokenSeparators:[","," "],createSearchChoice:function(a){return a?{id:a,text:a,isNew:!0}:null},query:function(a){e(a.term).done(function(b){a.callback({results:b})})},formatResult:function(a){return d.fields.labelFieldResult({label:{labelName:a.text,isNew:a.isNew}})},initSelection:function(a,b){a=c.auiSelect2("val").map(function(a){return{id:a,
text:a}});b(a)}})}}});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.auiplugin:split_aui.splitchunk.e8173e0382', location = 'aui.chunk.af03fab94a059f2e0c08--6cb64e7c89c7d8ec28b1.js' */
(window.__auiJsonp=window.__auiJsonp||[]).push([["aui.splitchunk.e8173e0382"],{"3vMk":function(n,t,i){"use strict";i.r(t);i("rSV2"),i("YQ7q"),i("6fSn"),i("Nu/Z"),i("U8Ze")},U8Ze:function(n,t,i){"use strict";i.r(t),i.d(t,"getMessageContainer",(function(){return j})),i.d(t,"appendErrorMessages",(function(){return b})),i.d(t,"appendDescription",(function(){return m})),i.d(t,"errorMessageTemplate",(function(){return T})),i.d(t,"setFieldSpinner",(function(){return y}));var e=i("+x/D"),a=i("TmQU"),r=i("4dFR"),o=(i("tYoR"),i("bPPT"));const c="_aui-form-notification-initialised",u="data-aui-notification-wait",s="data-aui-notification-info",f="data-aui-notification-error",d=[f,"data-aui-notification-success",u,s];function l(n){p(n)||(!function(n){n.addClass(c),m(n)}(n),h(n))}function p(n){return n.hasClass(c)}function m(n,t){t=t||v(n),g(n)===s&&n.after(function(n){if(n.length>1){let t=n.map((n=>"<li>".concat(n,"</li>"))).join("");return'<div class="description"><ul>'.concat(t,"</ul></div>")}return'<div class="description">'.concat(n,"</div>")}(t))}function v(n){var t=g(n),i=t?n.attr(t):"";return""===i?i:function(n){var t;try{t=JSON.parse(n)}catch(i){t=[n]}return t}(i)}function g(n){var t;return d.some((function(i){if(n.is("["+i+"]"))return t=i,!0})),t}function h(n){const t=Object(e.default)(n);if(!p(t))return;const i=g(t);y(t,i===u);const a=v(t);a&&i===f?b(t,a):n.constructor.prototype.hasOwnProperty("jquery")||n.hasAttribute(f)||t.parent().find(".error").remove()}function T(n){let t=n.map((n=>'<li><span class="aui-icon aui-icon-small aui-iconfont-error aui-icon-notification">'.concat(n,"</span>").concat(n,"</li>"))).join("");return'<div class="error"><ul>'.concat(t,"</ul></div>")}function b(n,t){let i=j(n,"error");i.length>0&&i.remove(),n.after(T(t))}function j(n,t){return n.parent().find(".".concat(t))}function y(n,t){t&&!function(n){return n.next("aui-spinner").length>0}(n)?n.after('<aui-spinner class="form-notification-spinner" size="small"></aui-spinner>'):n.parent().find("aui-spinner").remove()}const O=Object(o.getMessageLogger)("data-aui-notification-field attribute",{deprecationType:"ATTRIBUTE",alternativeName:"HTML markup"});Object(r.default)("data-aui-notification-field",{attached:function(n){O(),l(Object(e.default)(n))},attributes:function(){const n={};return d.forEach((function(t){n[t]=h})),n}(),type:r.default.type.ATTRIBUTE}),Object(a.default)("aui/form-notification")}}]);
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.auiplugin:split_aui.component.form-validation', location = 'aui.chunk.0e30fd5e4ee85f841402--48adb1d052b77f1d9571.js' */
(window.__auiJsonp=window.__auiJsonp||[]).push([["aui.component.form-validation"],{defA:function(a,e,t){"use strict";t.r(e);t("3vMk");var i=t("+x/D"),n=t("U8Ze"),r=t("TmQU"),u=(t("uDDF"),t("HH5i")),c=t("JFi+"),l=["displayfield","watchfield","when","novalidate","state"],s=[];var d={register:function(a,e){var t;if("string"==typeof a)t=a;else{var n=function(a){var e=!1;return a.some((function(a){var t=-1!==i.default.inArray(a,l);return t&&(e=a),t})),e}(a);if(n)return c.warn('Validators cannot be registered with the argument "'+n+'", as it is a reserved argument.'),!1;t="[data-aui-validation-"+a.join("],[data-aui-validation-")+"]"}var r={validatorFunction:e,validatorTrigger:t};return s.push(r),r},validators:function(){return s}};Object(r.default)("aui/form-validation/validator-register",d);var o=d;function f(a){var e=a.el.value.length;let t=0===e;var i=parseInt(a.args("minlength"),10),n=parseInt(a.args("maxlength"),10);if(i&&n&&i===n&&!t&&e!==i){const e=b("exactlength",a.args,[i]);a.invalidate(e)}else if(i&&e<i&&!t){const e=b("minlength",a.args);a.invalidate(e)}else if(n&&e>n){const e=b("maxlength",a.args);a.invalidate(e)}else a.validate()}function v(a){return"password"===a.getAttribute("type")}function g(a,e){var t=a.match(e);return!!t&&a===t[0]}function m(a){var e=b("pattern",a.args);g(a.el.value,new RegExp(a.args("pattern")))?a.validate():a.invalidate(e)}function h(a){var e=b("required",a.args);a.el.value?a.validate():a.invalidate(e)}function p(a){var e=b("validnumber",a.args),t=parseInt(a.el.value,10);if(isNaN(t))a.invalidate(e);else{var i=a.args("min"),n=a.args("max");i&&t<parseInt(i,10)?a.invalidate(b("min",a.args)):n&&t>parseInt(n,10)?a.invalidate(b("max",a.args)):a.validate()}}function b(a,e,t){var i;i=void 0!==u.I18n.keys?u.I18n.keys["aui.validation.message."+a]:k[a];var n=t;t||(n=[e(a)]);var r,c=e(a+"-msg");return r=c?[c].concat(n):[i].concat(n),AJS.format.apply(null,r)}o.register(["maxlength","minlength"],f),o.register("[maxlength],[minlength]",f),o.register(["matchingfield"],(function(a){var e=a.el.value,t=document.getElementById(a.args("matchingfield")),i=t.value,n=b("matchingfield",a.args,[e,i]);(v(a.el)||v(t))&&(n=b("matchingfield-novalue",a.args)),e&&i&&i!==e?a.invalidate(n):a.validate()})),o.register(["doesnotcontain"],(function(a){var e=b("doesnotcontain",a.args);-1===a.el.value.indexOf(a.args("doesnotcontain"))?a.validate():a.invalidate(e)})),o.register(["pattern"],m),o.register("[pattern]",m),o.register(["required"],h),o.register("[required]",h),o.register(["min","max"],p),o.register("[min],[max]",p),o.register(["dateformat"],(function(a){var e=a.args("dateformat"),t=b("dateformat",a.args),i={Y:"[0-9]{4}",y:"[0-9]{2}",m:"(0?[1-9]|10|11|12)",M:"[Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec]",D:"[Mon|Tue|Wed|Thu|Fri|Sat|Sun]",d:"([0-2]?[1-9]|10|20|30|31)"},n=e.split(""),r="";n.forEach((function(a){var e=i.hasOwnProperty(a);r+=e?i[a]:a}));var u=new RegExp(r+"$","i");g(a.el.value,u)?a.validate():a.invalidate(t)})),o.register(["minchecked","maxchecked"],(function(a){var e=Object(i.default)(a.el).find(":checked").length,t=!a.args("minchecked")||e>=a.args("minchecked"),n=!a.args("maxchecked")||e<=a.args("maxchecked"),r=b("minchecked",a.args),u=b("maxchecked",a.args);t&&n?a.validate():t?n||a.invalidate(u):a.invalidate(r)}));var k={minlength:"Must be greater than or equal to {0} characters",maxlength:"Must be fewer than or equal to {0} characters",exactlength:"Must be exactly {0} characters",matchingfield:"{0} and {1} do not match.","matchingfield-novalue":"These fields do not match.",doesnotcontain:"Do not include the phrase {0} in this field",pattern:"This field does not match the required format",required:"This is a required field",validnumber:"Please enter a valid number",min:"Enter a value greater than or equal to  {0}",max:"Enter a value less than or equal to {0}",dateformat:"Enter a valid date",minchecked:"aui.validation.message.minchecked",maxchecked:"aui.validation.message.maxchecked"};Object(r.default)("aui/form-validation/basic-validators");var x=t("bPPT"),I=t("KloK"),O=t("4dFR");const T="data-aui-notification-",w="invalid",j="valid",y="validating",A="unvalidated",D="_aui-form-validation-initialised",E="_aui-internal-field-state-changed";function F(a){(function(a){return a.hasClass(D)})(a)||(!function(a){a.addClass(D),Object(n.appendDescription)(a)}(a),function(a){(function(a){var e,t=function(){a.trigger("aui-stop-typing")};a.on("keyup",(function(){clearTimeout(e),e=setTimeout(t,1500)}))})(a),function(a){var e=S(a,"when"),t=S(a,"watchfield");(t?a.add("#"+t):a).on(e,(function(){J(a)}))}(a)}(a),_(a,A))}function J(a){if(!S(a,"novalidate"))return function(a){!function(a){q(R(a),"none")}(a);var e=function(a){var e=[];return M().forEach((function(t,i){var n=t.validatorTrigger;a.is(n)&&e.push(i)})),e}(a);_(a,y);var t=function(a,e){var t=[];return e.forEach((function(e){var n=M()[e].validatorFunction,r=new i.default.Deferred;n(function(a,e){var t={validate:function(){e.resolve()},invalidate:function(t){_(a,w,t),e.reject()},args:N(a),el:a[0],$el:a};return x.prop(t,"$el",{sinceVersion:"5.9.0",removeInVersion:"10.0.0",alternativeName:"el",extraInfo:"See https://ecosystem.atlassian.net/browse/AUI-3263."}),t}(a,r)),t.push(r)})),t}(a,e),n=i.default.when.apply(i.default,t);return n.done((function(){_(a,j)})),n}(a);_(a,j)}function S(a,e){var t=a.attr("data-aui-validation-"+e);return t||(t={when:"change"}[e]),t}function M(){return o.validators()}function N(a){return function(e){return a.attr("data-aui-validation-"+e)||a.attr(e)}}function _(a,e,t){if(a.attr("data-aui-validation-state",e),e!==A){a.trigger(i.default.Event(E));var r=R(a),u={validating:"wait",invalid:"error",valid:"success"},c=u[e];e===y?function(a){setTimeout((function(){U(a)===y&&(q(a,"wait"),Object(n.setFieldSpinner)(a,!0))}),500)}(a):q(r,c,t)}}function q(a,e,t){const i=function(a){return a.is("[data-aui-notification-wait]")}(a);!function(a){P(a,"wait"),Object(n.setFieldSpinner)(a,!1),P(a,"success")}(a);var r,u;if(!("success"===e&&!i))if("none"===e)P(a,"error");else{const i=a.attr(T+e)||"[]",c=t?(r=t,u=i,JSON.parse(u).concat([r])):[];a.attr(T+e,JSON.stringify(c)),"error"===e&&Object(n.appendErrorMessages)(a,c)}}function P(a,e){a.removeAttr(T+e),"error"===e&&Object(n.getMessageContainer)(a,e).remove()}function R(a){var e=S(a,"displayfield");return void 0===e?a:Object(i.default)("#"+e)}function U(a){return a.attr("data-aui-validation-state")}function V(a,e){e.preventDefault(),a.one(E,(function(){a.trigger("submit")}))}function C(a,e){var t="[data-aui-validation-state="+e+"]";return a.find(t)}Object(i.default)(document).on("submit",(function(a){var e=a.target,t=Object(i.default)(e),n=function(a){return u=a.find("."+D),e=i.default.map(u,(function(a){return U(Object(i.default)(a))})),t=-1!==e.indexOf(w),n=-1!==e.indexOf(A),r=-1!==e.indexOf(y),t?w:n?A:r?y:j;var e,t,n,r;var u}(t);if(n===A)V(t,a),function(a){C(a,A).each((function(a,e){$.validate(Object(i.default)(e))}))}(t);else if(n===y)V(t,a);else if(n===w)a.preventDefault(),function(a){C(a,w).first().focus()}(t);else if(n===j){var r=i.default.Event("aui-valid-submit");t.trigger(r),r.isDefaultPrevented()&&a.preventDefault()}}));const $={register:o.register,validate:function(a){J(a=Object(i.default)(a))}};Object(O.default)("data-aui-validation-field",{attached:function(a){a.form&&a.form.setAttribute("novalidate","novalidate"),F(Object(i.default)(a)),O.default.init(a)},type:O.default.type.ATTRIBUTE}),Object(r.default)("aui/form-validation",$),Object(I.default)("formValidation",$)}},[["defA","runtime","aui.splitchunk.vendors--894c8113d9","aui.splitchunk.vendors--95c789edf5","aui.splitchunk.vendors--9c48cc20a9","aui.splitchunk.vendors--be1eb78c1a","aui.splitchunk.vendors--23f50a6f00","aui.splitchunk.0d131bcbf1","aui.splitchunk.fbbef27525","aui.splitchunk.444efc83be","aui.splitchunk.739b9ec8cc","aui.splitchunk.056561461c","aui.splitchunk.949297951c","aui.splitchunk.dd803a46b4","aui.splitchunk.994e478d48","aui.splitchunk.d7c46c2734","aui.splitchunk.e54c7c7304","aui.splitchunk.fb15cffa72","aui.splitchunk.56dfb54d0c","aui.splitchunk.479fe6ee76","aui.splitchunk.f673ef53ac","aui.splitchunk.9c48cc20a9","aui.splitchunk.908fe798b4","aui.splitchunk.5f851f97df","aui.splitchunk.462ee5f9ef","aui.splitchunk.26116b3cbd","aui.splitchunk.ed86a19e01","aui.splitchunk.50dca3e042","aui.splitchunk.be1eb78c1a","aui.splitchunk.23f50a6f00","aui.splitchunk.e8173e0382"]]]);
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.integration.jira.jira-integration-plugin:jira-create-issue-form', location = '/jira-create-issue-form/jira-create-issue-form.js' */
define("jira-integration-plugin/jira-create-issue-form",["jquery","jira-integration-plugin/custom-lodash","jira-integration-plugin/jira-create-issue-form-data","jira-integration-plugin/jira-create-issue-form-field-helper","jira-integration-plugin/fields"],function(d,f,h,g,k){function b(a){this.configuration=f.extend({},b.defaults,a);this.configuration.renderSummaryAndDescription&&this.configuration.excludedField.push("summary","description");this._init()}function p(a,c){var e={};a.find(".create-issue-required-fields").find("input, select, textarea, fieldset").not(".select2-input, .select2-focusser").each(function(a){var m=
d(this),b=m.attr("data-name");b&&(e[b]=c(m,b,a))});return e}function n(a){d(".aui-message",a).remove()}var l=window.jiraIntegration.templates;b.defaults={allowUnsupportedFields:!1,ignoreFieldsWithDefaultValue:!0,excludedField:["project","issuetype","reporter"],formClass:"jira-interation-create-issue-form",requiredFieldsOnly:!0,renderSummaryAndDescription:!1,get$unsupportedFieldMessage:function(a,c){return d(l.jiraCreateIssueForm.unsupportedFieldsMessage({unsupportedFields:a,createIssueUrl:c}))},get$unexpectedError:function(a){return d(aui.message.error({content:AJS.escapeHtml(a)}))},
get$communicationError:function(a){return d(l.jiraCreateIssueForm.communicationErrorMessage({message:a}))},get$unauthorizeMessage:function(a){return d(l.jiraCreateIssueForm.authorize({extraClasses:"jira-oauth-dialog",applicationName:a}))},get$unsupportedServerMessage:function(a){return d(l.jiraCreateIssueForm.unsupportedServerMessage({serverUrl:a}))},get$unrenderableRequiredFieldsMessage:function(a,c){var e=a.map(function(a){return AJS.escapeHtml(a.name)}).join(", ");return d(l.jiraCreateIssueForm.unrenderableRequiredFieldsMessage({names:e,
count:a.length,serverUrl:c}))},ajax:function(a){alert("JiraCreateIssueForm requires the option 'ajax(options)' to be specified and respond like jQuery.ajax.\nThis method should handle response status codes other than 200 and 500 (those are handled by us).")}};b.prototype._trigger=function(a,c){var e=this.configuration[a];e&&e.apply(this,Array.prototype.slice.call(arguments,1))};b.prototype._selectServer=function(a,c){var e=this;if(this.currentServerId!==a||c)this.currentServerId=a,this.formIsLoading(this.defaultFields.server),
h.isIssueCreationSupported(a,this.configuration.ajax).done(function(c){c?(e._loadProjectData(a),e.formLoadingCompleted(e.defaultFields.server)):(c=h.getServerById(a).displayUrl,e._handleUnsupportedServer(c))}).fail(function(a){a[0]&&a[0].authenticationUri?e._handleAuthorizeError(a[0]):e._handleAjaxError(a)})};b.prototype._bindEventListener=function(){var a=this;this.defaultFields.server.on("change",function(c){a.fieldValues=f.extend({},a.fieldValues,a._getFieldValues());a.resetForm(!0);(c=this.value)?
a._selectServer(c):(g.resetSelectField(a.defaultFields.project),a.defaultFields.project.trigger("change"));a._trigger("onServerChanged",this.value)});this.defaultFields.project.on("change",function(){var c=this.value||d(this).select2("data").value,e=d(a.defaultFields.issueType).select2("data");a.fieldValues=f.extend({},a.fieldValues,a._getFieldValues());c?(d('option[value\x3d""]',a.defaultFields.project).remove(),a._loadIssueType(a.currentServerId,c,e)):g.resetSelectField(a.defaultFields.issueType);
a._trigger("onProjectChanged",this.value)});this.defaultFields.issueType.on("change",function(){a.fieldValues=f.extend({},a.fieldValues,a._getFieldValues());a.resetForm(!0);this.value?a._loadFields(a.fieldValues):(a.$containerRequireField&&a.$containerRequireField.html(""),n(this.$form));a._trigger("onTypeChanged",this.value)})};b.prototype._getFieldValues=function(){return this._getJSON({getFieldJSON:k.getInternalJSON,$form:this.$form})};b.prototype._init=function(){this.container=d(this.configuration.container);
this.fieldValues={};if(this.container.length)this._renderForm(),this._bindEventListener(),this._loadServerData();else throw Error("container property should be defined.");};b.prototype._renderForm=function(){var a=this;this.$form=d(l.jiraCreateIssueForm.form({formClass:this.configuration.formClass})).on("aui-valid-submit",function(c){a.configuration.onSubmit&&(c.preventDefault(),a.configuration.onSubmit())}).on("focus",".fake-tabbable",function(){const a=d("div#select2-drop.select2-drop-active").children()[0];
a&&a.children.length&&a.getElementsByTagName("input")[0].focus()});this.configuration.renderSummaryAndDescription&&this._renderSummaryAndDescription();this.container.append(this.$form);this.defaultFields=this._getDefaultFields();f.each(this.defaultFields,f.bind(function(a){this.createSelect2WithIcon(d(a))},this));this.$containerRequireField=d(".create-issue-required-fields",this.container);this._trigger("onFormRendered")};b.prototype._renderSummaryAndDescription=function(){var a=d(".create-issue-default-fields",
this.$form);a.append(aui.form.textField({labelContent:"Summary",isRequired:!0,name:"summary",value:this._getSummaryFromConfiguration()}));a.append(aui.form.textareaField({labelContent:"Description",name:"description"}))};b.prototype._getDefaultFields=function(){return{server:d(".server-select",this.$form),project:d(".project-select",this.$form),issueType:d(".issuetype-select",this.$form)}};b.prototype._loadServerData=
function(){var a=this;this.formIsLoading(this.defaultFields.server);h.loadServers(a.configuration.ajax).then(function(c){a.formLoadingCompleted(a.defaultFields.server);a._loadServerDataComplete(c)})};b.prototype._loadFields=function(a){const c=this,e=f.extend({},this.getContextJSON(),a);this.formIsLoading(this.defaultFields.issueType);h.getFieldMetadata(e,c.configuration.ajax).done(function(a){const b=c._filterFields(a);c.configuration.renderSummaryAndDescription&&(a=a.find(a=>"description"===a.fieldId),
c._setDescriptionAsRequiredField(!(!a||!a.required)));a=c._unrenderableRequiredFields(b);0===a.length?(c._renderFields(b,e),c._trigger("onFieldsRendered")):c._handleUnrenderableRequiredFields(a);c._fieldTypeAnalytics(b);c.formLoadingCompleted(c.defaultFields.issueType)}).fail(f.bind(c._handleAjaxError,this))};b.prototype._loadServerDataComplete=function(a){a.length?(1===a.length&&g.hideField(this.defaultFields.server),this._hasMultiServer=1<a.length,g.fillSelectData(this.defaultFields.server,a,this.configuration.serverId||
a[0].id),this._selectServer(this.configuration.serverId||a[0].id)):this._handlerUnexpectedError("Don\u0027t have any Jira server, please check the application link configuration.")};b.prototype._loadProjectData=function(a){var c=this;this.formIsLoading(this.defaultFields.project);h.loadProjects(a,c.configuration.ajax).then(function(a){a.errors&&a.errors.length?(a=a.errors[0],a.authenticationUri?c._handleAuthorizeError(a):c._handlerUnexpectedError(a.message)):a.length?g.fillSelectData(c.defaultFields.project,a,c.configuration.projectId):
c._handlerUnexpectedError("You do not have permission to create issues on this Jira server.");c.formLoadingCompleted(c.defaultFields.project)},f.bind(c._handleAjaxError,this))};b.prototype._loadIssueType=function(a,c,e){const b=this;this.formIsLoading(this.defaultFields.issueType);h.loadIssueTypes(a,c,b.configuration.ajax).then(function(a){g.fillSelectData(b.defaultFields.issueType,a,e&&e.id);b.formLoadingCompleted(b.defaultFields.issueType)}).fail(function(a){404===a.status&&b._handleCommunicationError(AJS.format("Could not communicate with Jira (HTTP error {0})",
404));b.formHasError()})};b.prototype._fieldTypeAnalytics=function(a){var c=a.map(function(a){var c=k.getFieldType(a);return{required:a.required,restType:c,knownRestType:k.isKnownRestType(c)}}).reduce(function(a,c){c.knownRestType?a[c.required?"requiredFields":"otherFields"].push(c.restType):a[c.required?"unknownRequiredFieldsCount":"unknownOtherFieldsCount"]++;return a},{requiredFields:[],otherFields:[],unknownRequiredFieldsCount:0,unknownOtherFieldsCount:0});c=Object.keys(c).reduce(function(a,b){var e=
c[b];if(!Array.isArray(e))return a[b]=e,a;var d=e.length;a[b+".size"]=d;for(var m=0;m<d;m++)a[b+"["+m+"]"]=e[m];return a},{});AJS.trigger("analytics",{name:"jira.integration.issue.create.form.displayed",data:c})};b.prototype._renderFields=function(a,c){this.$containerRequireField.html("");var b=f.reject(a,k.canRender);!this.configuration.allowUnsupportedFields&&b.length?this._handleUnsupportedFields(b):(this.$containerRequireField.html(f.map(a,function(a){return k.renderField(null,a,c,null)}).join("")),
k.attachFieldBehaviors(this.$containerRequireField,c,null),this._trigger("onRequiredFieldsRendered",a,b))};b.prototype._setError=function(a){n(this.$form);this.$form.prepend(a);this.formLoadingCompleted();this.formHasError()};b.prototype._handleCommunicationError=function(a){a=this.configuration.get$communicationError(a);this._setError(a)};b.prototype._handlerUnexpectedError=function(a){a=this.configuration.get$unexpectedError(a);this._setError(a)};b.prototype._handleUnsupportedFields=function(a){a=
f.map(a,function(a){return AJS.escapeHtml(a.name)});a=this.configuration.get$unsupportedFieldMessage(a,this._getCreateJiraIssueUrl());n(this.$form);this.$form.prepend(a);this._trigger("onError");this.formLoadingCompleted()};b.prototype._handleUnsupportedServer=function(a){a=this.configuration.get$unsupportedServerMessage(a);this._setError(a)};b.prototype._handleAjaxError=function(a){if(500<=a.status&&600>a.status){var c=a.responseJSON.errors&&a.responseJSON.errors[0],b=c&&c.exceptionName;b&&"com.atlassian.integration.jira.JiraCommunicationException"===
b?this._handleCommunicationError(c.message):this._handlerUnexpectedError(AJS.format("Could not communicate with Jira (HTTP error {0})",a.status))}else this._handlerUnexpectedError("An unexpected response was received from Jira.");this.formHasError()};b.prototype._handleAuthorizeError=function(a){var c=this;this.formHasError();var b=this.configuration.get$unauthorizeMessage(a.applicationName);this.$form.append(b);d(".applink-authenticate",b).on("click",function(b){AppLinks.authenticateRemoteCredentials(a.authenticationUri,
function(){c.resetForm();c._selectServer(c.currentServerId,!0)},function(){c._handlerUnexpectedError(AJS.format("You have refused to permit access to {0}.",a.applicationName))});b.preventDefault()})};b.prototype._handleUnrenderableRequiredFields=function(a){a=this.configuration.get$unrenderableRequiredFieldsMessage(a,this._getCreateJiraIssueUrl());n(this.$form);this.$form.append(a);this.formLoadingCompleted()};b.prototype._getCreateJiraIssueUrl=function(){var a=this.defaultFields.project.find("option:selected").val(),
c=this.defaultFields.issueType.find("option:selected").val(),b=h.getServerById(this.currentServerId).displayUrl;b=b+"/secure/CreateIssueDetails!Init.jspa?pid\x3d"+a+"\x26issuetype\x3d"+c;a=this._getFieldValue("summary");a.length&&(b=b+"\x26summary\x3d"+encodeURIComponent(a));a=this._getFieldValue("description");a.length&&(b=b+"\x26description\x3d"+encodeURIComponent(a));return b};b.prototype._filterFields=function(a){var c=this;return f.filter(a,function(a){var b=a.schema?a.schema.system||a.schema.custom||
a.schema.customId:a;return!(c.configuration.excludedField&&c.configuration.excludedField.includes(b)||c.configuration.ignoreFieldsWithDefaultValue&&a.hasDefaultValue||c.configuration.requiredFieldsOnly&&!a.required)})};b.prototype._unrenderableRequiredFields=function(a){return a.filter(function(a){return a.required&&!k.canRender(a)})};b.prototype._getFieldValue=function(a){return(a=d("[name\x3d'"+a+"']",this.$form))?d.trim(a.val()):""};b.prototype._setDescriptionAsRequiredField=function(a){var c=
d('.field-group [name\x3d"description"]',this.$form).prev("label");c.find(".aui-icon.aui-icon-required").remove();a&&c.append(aui.icons.icon({icon:"required"}))};b.prototype._getSummaryFromConfiguration=function(){var a=this.configuration.initialSummary;delete this.configuration.initialSummary;return a};b.prototype._getJSON=function(a){if(!a.verbose)return p(a.$form,function(c,b,e){return a.getFieldJSON(c)});var c=h.getCachedFieldMetadataEntry(this.getContextJSON()).value,b=Object.keys(c.fields).reduce(function(a,
b){a[b]=k.getContext(null,c.fields[b],null,null);return a},{});return p(this.$form,function(c,e,d){var f=b[e];return{name:e,jiraType:f.jiraType,required:f.isRequired,label:f.labelText,value:a.getFieldJSON(c),index:d}})};b.prototype.resetForm=function(a){n(this.$form);d(".field-group",this.$form).show();this.configuration.renderSummaryAndDescription&&this._setDescriptionAsRequiredField(!1);this._hasMultiServer||g.hideField(this.defaultFields.server);this.$containerRequireField.html("");this.fieldValues=
a?this.fieldValues:{}};b.prototype.formHasError=function(){d(".field-group",this.$form).hide();this.$containerRequireField.html("");this._hasMultiServer&&g.showField(this.defaultFields.server);g.setFieldDisabled(d(".insert-issue-button"),!0);this._trigger("onError");this.formLoadingCompleted()};b.prototype.getCurrentServer=function(){return h.getServerById(this.currentServerId)};b.prototype.formIsLoading=function(a){a&&g.setIsLoading(a,!0);a=d(":input",d(this.$form));g.setFieldDisabled(a,!0)};b.prototype.formLoadingCompleted=
function(a){a?g.setIsLoading(a,!1):d(".aui-icon.aui-icon-wait",this.$form).remove();a=d(":input",d(this.$form));g.setFieldDisabled(a,!1)};b.prototype.createSelect2WithIcon=function(a){if(a.is(".server-select"))a.auiSelect2({minimumResultsForSearch:-1});else{var c=a.is(".project-select")?{formatSelection:this.projectSelectFormat,formatResult:this.projectSelectFormat,extraAttributes:this.defaultFields}:{formatSelection:this.issueTypeSelectFormat,formatResult:this.issueTypeSelectFormat,minimumResultsForSearch:-1,
extraAttributes:this.defaultFields};a.auiSelect2(c)}a.auiSelect2("val","")};b.prototype.projectSelectFormat=function(a){var c=this.extraAttributes.server.select2("data").id;c=h.getProjectIconUrl(c,a.id);return l.fields.select2WithIconOption({optionValue:a.text,iconUrl:c,isProject:!0})};b.prototype.issueTypeSelectFormat=function(a){var c=this.extraAttributes.server.select2("data").id,b=this.extraAttributes.project.select2("data").id;c=h.getIssueTypeIconUrl(c,b,a.id);return l.fields.select2WithIconOption({optionValue:a.text,
iconUrl:c,isProject:!1})};b.prototype.getContextJSON=function(){var a=this.defaultFields.project.val()||d(this.defaultFields.project).select2("data").value;return{serverId:this.currentServerId,projectId:a,projectKey:h.getProjectById(this.currentServerId,a).key,issueTypeId:this.defaultFields.issueType.val(),summary:this._getSummaryFromConfiguration()}};b.prototype.getJSON=function(a){return b.prototype._getJSON({getFieldJSON:k.getJSON,verbose:a,$form:this.$form})};b.prototype.renderUnexpectedError=
function(a){a=this.configuration.get$unexpectedError(a);n(this.$form);this.$form.prepend(a);this.formLoadingCompleted()};b.prototype.renderErrors=function(a){p(this.$form,function(c,b){c=c.closest(".jira-field");var d=function(a){return 0===a.indexOf(b)};if(a.hasOwnProperty(b)||Object.keys(a).some(d)){a.hasOwnProperty(b)||(b=Object.keys(a).filter(d)[0]);var e=Array.isArray(a[b])?a[b]:[a[b]]}k.setFieldError(c,e)})};b.prototype.submit=function(){this.$form.submit()};return b});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.integration.jira.jira-integration-plugin:jira-create-issue-form', location = '/jira-create-issue-form/jira-create-issue-form-data.js' */
define("jira-integration-plugin/jira-create-issue-form-data",["jquery"],function(e){function q(a){var c=new URL(a.avatarUrls["16x16"]);const b=c.searchParams;b.get("pid")||b.append("pid",a.id);b.get("avatarId")||(a=c.pathname.split("/"),c=a.lastIndexOf("avatar"),b.append("avatarId",a[c+1]));return b.toString()}function l(a){a=g(a.serverId,a.projectKey,a.issueTypeId);return{key:a,value:m[a]}}function k(a){if(!d[a])throw Error("Can only be called after server is loaded.");return d[a].projects}function g(a,
c,b){return a+(c?"-"+c:"")+(b?"-"+b:"")}var d={},m={},r=AJS.contextPath()+"/plugins/servlet/jira-integration/icons?serverId\x3d{0}\x26iconType\x3d{1}\x26{2}",h=[],f=function(a,c,b){return a({dataType:"json",timeout:0,url:AJS.contextPath()+"/rest/jira-integration/1.0/servers"+(c||""),statusCode:b})};const p=(a,c,b=[])=>{b=b.filter(a=>!a.subtask);const n={};b.forEach(a=>{n[a.id]=a.iconUrl});const d=q(a);h[g(c,a.id)]={iconUrl:AJS.format(r,c,"project",d),issueTypes:n};return b},t=(a,c)=>k(a).filter(function(a){return a.id===
c})[0];return{loadServers:function(a){return f(a,"").done(function(a){a.forEach(function(a){d[a.id]=a})})},loadProjects:function(a,c){var b=d[a]&&d[a].projects;return b?e.Deferred().resolve(b):f(c,"/"+a+"/projects").done(function(b){b.length&&(b.forEach(function(b){p(b,a)}),d[a].projects=b)})},loadIssueTypes:(a,c,b)=>f(b,`/${a}/projects/${c}/issue-types`,{404:!1}).then(b=>{const d=t(a,c);return b?p(d,a,b):[]}),getFieldMetadata:function(a,c){var b=l(a);return b.value?e.Deferred().resolve(b.value):
f(c,"/"+a.serverId+"/projects/"+a.projectKey+"/issue-types/"+a.issueTypeId+"/fields-meta").done(function(a){m[b.key]=a})},getCachedFieldMetadataEntry:l,getServerById:function(a){return d[a]},getProjectIconUrl:function(a,c){a=g(a,c);return h[a]?h[a].iconUrl:""},getIssueTypeIconUrl:function(a,c,b){a=g(a,c);return(a=h[a])&&a.issueTypes[b]?a.issueTypes[b]:""},getProjects:k,getProjectById:function(a,c){a=k(a);if(!a)return null;for(var b=0,d=a.length;b<d;b++){var e=a[b];if(e.id===c)return e}return null},
isIssueCreationSupported:function(a,c){if(!d[a])throw Error("Can only be called after server is loaded.");return"issueCreationSupported"in d[a]?e.Deferred().resolve(d[a].issueCreationSupported):f(c,"/"+a+"/features").then(function(b){if(b.errors)return e.Deferred().reject(b.errors);if(!Array.isArray(b))return e.Deferred().reject("Unexpected response from Jira");d[a].issueCreationSupported=-1!==b.indexOf("CREATE_ISSUE");return d[a].issueCreationSupported})}}});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.integration.jira.jira-integration-plugin:jira-create-issue-form', location = '/jira-create-issue-form/jira-create-issue-form-field-helper.js' */
define("jira-integration-plugin/jira-create-issue-form-field-helper",["jquery","jira-integration-plugin/custom-lodash"],function(d,g){function f(a){a=a.attr("data-placeholder");return aui.form.optionOrOptgroup({value:"",text:a,iconUrl:""})}return{fillSelectData:function(a,b,d){var e=[],c;b.forEach(function(a){var b={value:AJS.escapeHtml(a.id),text:a.name,iconUrl:a.iconUrl?a.iconUrl:a.avatarUrls?a.avatarUrls["16x16"]:""};d===a.id&&(b.selected=!0,c=a);e.push(aui.form.optionOrOptgroup(b))});c?(c.text=
c.name,a.html(e.join("")),a.auiSelect2("data",c).trigger("change")):(e.unshift(f(a)),a.html(e.join("")),a.auiSelect2("val","").trigger("change"))},resetSelectField:function(a){a.html(f(a));a.auiSelect2("val","").trigger("change")},hideField:function(a){a.parent().hide()},showField:function(a){a.parent().show()},setFieldDisabled:function(a,b){b?d.fn.disable?a.disable():a.prop("disabled",!0):d.fn.enable?a.enable():a.prop("disabled",!1)},setIsLoading:function(a,b){return b?a.after(aui.icons.icon({icon:"wait"})):
a.next(".aui-icon.aui-icon-wait").remove()}}});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.integration.jira.jira-integration-plugin:jira-create-issue-form', location = '/jira-create-issue-form/jira-create-issue-form.soy' */
// This file was automatically generated from jira-create-issue-form.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace jiraIntegration.templates.jiraCreateIssueForm.
 */

if (typeof jiraIntegration == 'undefined') { var jiraIntegration = {}; }
if (typeof jiraIntegration.templates == 'undefined') { jiraIntegration.templates = {}; }
if (typeof jiraIntegration.templates.jiraCreateIssueForm == 'undefined') { jiraIntegration.templates.jiraCreateIssueForm = {}; }


jiraIntegration.templates.jiraCreateIssueForm.form = function(opt_data, opt_ignored) {
  return '' + aui.form.form({extraClasses: (opt_data.formClass ? opt_data.formClass + ' ' : '') + 'jira-create-form', method: 'post', action: '#', content: '<fieldset class="create-issue-default-fields"><div class="fake-tabbable" tabindex="0" /><div class="field-group" data-jira-type="server"><label>' + soy.$$escapeHtml('Server') + '<span class="aui-icon icon-required"> required</span></label><select class="jira-select2-drop-box server-select medium-long-field" name="server" data-placeholder="' + soy.$$escapeHtml('Select a server') + '"><option disabled selected value="">' + soy.$$escapeHtml('Select a server') + '</option></select></div><div class="field-group" data-jira-type="project"><label>' + soy.$$escapeHtml('Project') + '<span class="aui-icon icon-required"> required</span></label><select class="jira-select2-drop-box project-select medium-long-field" name="project" data-placeholder="' + soy.$$escapeHtml('Select a project') + '"><option disabled selected value="">' + soy.$$escapeHtml('Select a project') + '</option></select></div><div class="field-group" data-jira-type="issuetype"><label>' + soy.$$escapeHtml('Issue Type') + '<span class="aui-icon icon-required"> required</span></label><select class="jira-select2-drop-box issuetype-select" name="issue-type" data-placeholder="' + soy.$$escapeHtml('Select an issue type') + '"><option disabled selected value="">' + soy.$$escapeHtml('Select an issue type') + '</option></select></div></fieldset><fieldset class="create-issue-required-fields"></fieldset>'});
};
if (goog.DEBUG) {
  jiraIntegration.templates.jiraCreateIssueForm.form.soyTemplateName = 'jiraIntegration.templates.jiraCreateIssueForm.form';
}


jiraIntegration.templates.jiraCreateIssueForm.unsupportedFieldsMessage = function(opt_data, opt_ignored) {
  var param28 = '';
  if (opt_data.unsupportedFields.length == 1) {
    var field__soy31 = '<strong>' + soy.$$escapeHtml(opt_data.unsupportedFields) + '</strong>';
    param28 += soy.$$filterNoAutoescape(AJS.format('The required field {0} is not available in this form. You will need to',field__soy31));
  } else {
    var fieldList__soy38 = '' + jiraIntegration.templates.jiraCreateIssueForm.buildFieldList({fields: opt_data.unsupportedFields});
    param28 += soy.$$filterNoAutoescape(AJS.format('The required fields {0} are not available in this form. You will need to',fieldList__soy38));
  }
  param28 += ' <a href="' + soy.$$escapeHtml(opt_data.createIssueUrl) + '" target="_blank">' + soy.$$escapeHtml('create your issue directly in Jira') + '</a>.';
  var output = '' + aui.message.warning({content: param28});
  return output;
};
if (goog.DEBUG) {
  jiraIntegration.templates.jiraCreateIssueForm.unsupportedFieldsMessage.soyTemplateName = 'jiraIntegration.templates.jiraCreateIssueForm.unsupportedFieldsMessage';
}


jiraIntegration.templates.jiraCreateIssueForm.buildFieldList = function(opt_data, opt_ignored) {
  var output = '';
  var joinText__soy50 = '' + ((opt_data.fields.length == 2) ? ' ' + soy.$$escapeHtml('and') + ' ' : ', ');
  var fieldList58 = opt_data.fields;
  var fieldListLen58 = fieldList58.length;
  for (var fieldIndex58 = 0; fieldIndex58 < fieldListLen58; fieldIndex58++) {
    var fieldData58 = fieldList58[fieldIndex58];
    output += ((! (fieldIndex58 == 0)) ? soy.$$escapeHtml(joinText__soy50) : '') + '<strong>' + soy.$$escapeHtml(fieldData58) + '</strong>';
  }
  return output;
};
if (goog.DEBUG) {
  jiraIntegration.templates.jiraCreateIssueForm.buildFieldList.soyTemplateName = 'jiraIntegration.templates.jiraCreateIssueForm.buildFieldList';
}


jiraIntegration.templates.jiraCreateIssueForm.authorize = function(opt_data, opt_ignored) {
  opt_data = opt_data || {};
  var output = '';
  var applicationNameEscaped__soy67 = '' + soy.$$escapeHtml(opt_data.applicationName);
  output += aui.message.info({content: '' + soy.$$filterNoAutoescape(AJS.format('{0}Log in and approve{1} to retrieve data from {2}','<a class="oauth-init applink-authenticate" href="#">','</a>',applicationNameEscaped__soy67))});
  return output;
};
if (goog.DEBUG) {
  jiraIntegration.templates.jiraCreateIssueForm.authorize.soyTemplateName = 'jiraIntegration.templates.jiraCreateIssueForm.authorize';
}


jiraIntegration.templates.jiraCreateIssueForm.unsupportedServerMessage = function(opt_data, opt_ignored) {
  return '' + aui.message.warning({content: '' + soy.$$filterNoAutoescape(AJS.format('The version of selected Jira server is not supported. You may want to upgrade to at least version 5.x or {0}create issue in Jira{1}.','<a href="' + opt_data.serverUrl + '" target="_blank">','</a>'))});
};
if (goog.DEBUG) {
  jiraIntegration.templates.jiraCreateIssueForm.unsupportedServerMessage.soyTemplateName = 'jiraIntegration.templates.jiraCreateIssueForm.unsupportedServerMessage';
}


jiraIntegration.templates.jiraCreateIssueForm.unrenderableRequiredFieldsMessage = function(opt_data, opt_ignored) {
  return '' + aui.message.warning({content: '' + soy.$$filterNoAutoescape(AJS.format('The required {1,choice,1#field|1\x3cfields} \x3cstrong\x3e{0}\x3c/strong\x3e {1,choice,1#is|1\x3care} not available in this dialog. You will need to {2}create your issue directly in Jira{3}.',opt_data.names,opt_data.count,'<a href="' + opt_data.serverUrl + '" target="_blank">','</a>'))});
};
if (goog.DEBUG) {
  jiraIntegration.templates.jiraCreateIssueForm.unrenderableRequiredFieldsMessage.soyTemplateName = 'jiraIntegration.templates.jiraCreateIssueForm.unrenderableRequiredFieldsMessage';
}


jiraIntegration.templates.jiraCreateIssueForm.communicationErrorMessage = function(opt_data, opt_ignored) {
  return '' + aui.message.error({titleContent: '' + soy.$$escapeHtml('Unfortunately, we\x27ve encountered problems connecting to Jira'), content: '<p>' + soy.$$escapeHtml(opt_data.message) + '</p>'});
};
if (goog.DEBUG) {
  jiraIntegration.templates.jiraCreateIssueForm.communicationErrorMessage.soyTemplateName = 'jiraIntegration.templates.jiraCreateIssueForm.communicationErrorMessage';
}

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.extra.jira:proxy-js', location = '/jira/proxy.js' */
AppLinks=AJS.$.extend(window.AppLinks||{},{makeRequest:function(a){var b=contextPath||AJS.contextPath();if(a.processData)a.appId?a.data=AJS.$.extend(a.data||{},{appId:a.appId}):a.appType&&(a.data=AJS.$.extend(a.data||{},{appType:a.appType})),a.data=AJS.$.extend(a.data||{},{path:a.url});else{var d=a.url;a=AJS.$.extend(a,{beforeSend:function(c){a.appId?c.setRequestHeader("X-AppId",a.appId):a.appType&&c.setRequestHeader("X-AppType",a.appType);c.setRequestHeader("X-AppPath",d)}})}a=AJS.$.extend(a,{url:b+
"/plugins/servlet/applinks/proxy"});return AJS.$.ajax(a)},createProxyGetUrl:function(a){var b="";a.includeContext&&(b=contextPath||AJS.contextPath());b+="/plugins/servlet/applinks/proxy";if(a.appId)b+="?appId\x3d"+encodeURIComponent(a.appId);else if(a.appType)b+="?appType\x3d"+encodeURIComponent(a.appType);else return AJS.log("You need to specify an appType or appId"),"";a.path&&(b+="\x26path\x3d"+encodeURIComponent(a.path));return b}});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.extra.jira:jqlHelper', location = '/jira/jqlhelper.js' */
AJS.JQLHelper=function(){var m=/^\s*((key|issuekey)\s*=\s*)?"*([A-Z]+)([0-9]+)?([A-Z]+)?-([0-9]+)"*\s*$/i,h=/\s*([A-Z][A-Z]+)-[0-9]+\s*/,n=/(issue|searchrequest)-xml/i,k=/\/(i#)?browse\/([\x00-\x19\x21-\x22\x24\x27-\x3E\x40-\x7F]+-[0-9]+$)/i,p=/\/jira\.issueviews:issue-xml\/([\x00-\x19\x21-\x22\x24\x27-\x3E\x40-\x7F]+-[0-9]+)\//,l=/(jqlQuery|jql)\s*=([^&]+)/i,e=/(\?|&)(requestId|filter)=([^&]+)/i,f=/(searchrequest-xml\/)([0-9]+)\/SearchRequest/i,q=/=|!=|~|>|<|!~| is | in | was | changed /i,g=function(a){var b=
"",c=k.exec(a);c?b="key\x3d"+c[2]:(c=l.exec(a))?b=c[2]:(a=h.exec(a))&&(b="key\x3d"+a[0]);return b=b.replace(/\+/g," ")},r=function(a,b){var c;a=decodeURIComponent(a);AJS.JQLHelper.getJqlQueryFromJiraFilter(a,b,function(d){d.jql&&(c=d.jql)});return c};return{isSingleKeyJQLExp:function(a){return m.exec(a)},isMultipleSingleKeyJQLExp:function(a){a=a.split(",");for(var b in a){var c=AJS.$.trim(a[b]);if(!AJS.JQLHelper.isSingleKeyJQLExp(c))return!1}return!0},isIssueUrlOrXmlUrl:function(a){return k.test(a)||
n.test(a)||l.test(a)||p.test(a)?!0:!1},isFilterUrl:function(a){return e.test(a)||f.test(a)},getFilterFromFilterUrl:function(a){if(e.test(a))return a=e.exec(a),a[2]+"\x3d"+a[3];if(f.test(a))return"filter\x3d"+f.exec(a)[2]},getJqlQueryFromJiraFilter:function(a,b,c,d){a=(e.exec(a)||f.exec(a))[2];b="/rest/jiraanywhere/1.0/jira/appLink/"+b+"/filter/"+a;AJS.$.ajax({async:!1,dataType:"json",url:Confluence.getContextPath()+b,success:c,error:d})},findServerIndexFromUrl:function(a,b){if("undefined"!==typeof b||
0<b.length)for(var c=a.toLowerCase(),d=0;d<b.length;d++)if(0==c.indexOf(b[d].url.toLowerCase())&&"/"==a.charAt(b[d].url.length))return d;return-1},getJqlQueryFromUrl:g,getJqlAndServerIndexFromUrl:function(a,b){var c={};c.serverIndex=this.findServerIndexFromUrl(a,b);c.jqlQuery=g(a);return c},checkQueryType:function(a){if(AJS.Editor.JiraAnalytics&&a&&0!=AJS.$.trim(a).length)return 0!=a.indexOf("http")?AJS.Editor.JiraAnalytics.linkTypes.jqlDirect:-1!=a.indexOf("jira.issueviews:searchrequest-xml")||-1!=
a.indexOf("jira.issueviews:issue-xml")?AJS.Editor.JiraAnalytics.linkTypes.xml:-1!=a.indexOf("jira.issueviews:searchrequest-rss")?AJS.Editor.JiraAnalytics.linkTypes.rss:-1!=a.indexOf("filter\x3d")||-1!=a.indexOf("filter\\\x3d")?AJS.Editor.JiraAnalytics.linkTypes.filter:AJS.Editor.JiraAnalytics.linkTypes.jql},convertToJQL:function(a,b){if(""!==AJS.$.trim(a))if(0===a.indexOf("http")&&this.isFilterUrl(a))var c=r(a,b);else 0===a.indexOf("http")&&this.isIssueUrlOrXmlUrl(a)?(a=g(decodeURIComponent(a)),0<
a.length&&(c=a)):c=0!==a.indexOf("http")&&a.match(q)?a:a.match(h)?"key\x3d"+a:'summary ~ "'+a+'" OR description ~ "'+a+'"';return c}}}();
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.extra.jira:jiraAnalytics', location = '/jira/jiraanalytics.js' */
AJS.Editor.JiraAnalytics={events:{paste:{key:"confluence.jira.plugin.paste"},search:{key:"confluence.jira.plugin.search"},trigger:{key:"confluence.jira.plugin.trigger"},customizeColumn:{key:"confluence.jira.plugin.column.customize"}},linkTypes:{jqlDirect:"direct_jql",jql:"jql_link",xml:"xml_link",rss:"rss_link",filter:"filter_link"},getDisplayType:function(b){var a="single";b.container.find("#opt-table").is(":checked")?a="table":b.container.find("#opt-total").is(":checked")&&(a="count");return a},
setupAnalyticPanelActionObject:function(b,a,d){return{name:b.analyticPanelActionName,properties:this.setupPanelActionProperties(b,a,d)}},setupPanelActionProperties:function(b,a,d){var c={};a===AJS.Editor.JiraConnector.source.instructionalText&&("confluence.jira.plugin.issuecreated"===b.analyticPanelActionName?c.issueType=b.container.find('select[name\x3d"issuetype"] :selected').text():"confluence.jira.plugin.searchadded"===b.analyticPanelActionName&&(c.display=this.getDisplayType(b)),c.label=d);return c},
triggerPasteEvent:function(b){AJS.EventQueue=AJS.EventQueue||[];AJS.EventQueue.push({name:AJS.Editor.JiraAnalytics.events.paste.key,properties:b})},triggerPannelActionEvent:function(b){AJS.EventQueue=AJS.EventQueue||[];AJS.EventQueue.push(b)},triggerSearchEvent:function(b){AJS.EventQueue=AJS.EventQueue||[];AJS.EventQueue.push({name:AJS.Editor.JiraAnalytics.events.search.key,properties:b})},triggerMarkupEvent:function(b){this.triggerSearchEvent(b)},triggerPannelTriggerEvent:function(b){AJS.EventQueue=
AJS.EventQueue||[];AJS.EventQueue.push({name:AJS.Editor.JiraAnalytics.events.trigger.key,properties:b})},triggerCustomizeColumnEvent:function(b){AJS.EventQueue=AJS.EventQueue||[];AJS.EventQueue.push({name:AJS.Editor.JiraAnalytics.events.customizeColumn.key,properties:b})}};
(function(b){b.aop.before({target:AJS.MacroBrowser,method:"loadMacroInBrowser"},function(a,d){a&&a[0]&&"confluence.extra.jira"==a[0].pluginKey&&AJS.Editor.JiraAnalytics.triggerPannelTriggerEvent({source:AJS.Editor.JiraConnector.source.macroBrowser})});b.aop.before({target:tinymce.confluence.macrobrowser,method:"macroBrowserToolbarButtonClicked"},function(a,d){a&&a[0]&&a[0].presetMacroMetadata&&"confluence.extra.jira"==a[0].presetMacroMetadata.pluginKey&&AJS.Editor.JiraAnalytics.triggerPannelTriggerEvent({source:AJS.Editor.JiraConnector.source.editorBraceKey})});
AJS.bind("init.rte",function(){b.aop.before({target:tinyMCE.activeEditor,method:"execCommand"},function(a,d){if(a&&"mceInsertContent"==a[0]&&a[2]&&(d=[Node.ELEMENT_NODE],a=b.parseHTML(a[2]),a.length)){var c=a[0];if(d.includes(c.nodeType)&&(d=c.getAttribute("data-macro-name"),["jira","jiraissues"].includes(d)&&(d=AJS.Editor.JiraAnalytics,a={source:"wiki_markup"},c.getAttribute("data-macro-parameters")))){c=c.getAttribute("data-macro-parameters").split("|");for(var f=0;f<c.length;f++){var e=b.trim(c[f]);
if(0==e.indexOf("jql")||0==e.indexOf("jqlQuery")){a.type=d.linkTypes.jqlDirect;break}else if(0==e.indexOf("url")){c=b.trim(e.substring(e.indexOf("\x3d")+1,e.length));a.type=AJS.JQLHelper.checkQueryType(c);break}else if(0==e.indexOf("http")){c=e;a.type=AJS.JQLHelper.checkQueryType(c);break}}"undefined"===typeof a.type&&(a.type=d.linkTypes.jqlDirect);d.triggerMarkupEvent(a)}}})})})(AJS.$);
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-frontend:split_jquery-selection-plugin', location = 'jquery-selection-plugin.js' */
(window.atlassianWebpackJsonpe19a4f58490c3d96a3072d1e47cd0e73=window.atlassianWebpackJsonpe19a4f58490c3d96a3072d1e47cd0e73||[]).push([[23],{572:function(t,e,n){"use strict";n.r(e);var s=n(166),o=n.n(s),c=n(13);!function(t,e){if(e.selection){const n=function(t){return t.replace(/\u000D/g,"")};t.fn.selection=function(t){const n=this[0];if(this.focus(),!n)return!1;if(null==t)return e.selection.createRange().text;const{scrollTop:s}=n,o=e.selection.createRange();o.text=t,o.select(),n.focus(),n.scrollTop=s},t.fn.selectionRange=function(t,s){const o=this[0];this.focus();const c=e.selection.createRange();if(null==t){const t=this.val(),e=t.length,s=c.duplicate();s.moveToElementText(o),s.setEndPoint("StartToEnd",c);let i=e-n(s.text).length;s.setEndPoint("StartToStart",c);const l=e-n(s.text).length;return i!==l&&"\n"===t.charAt(i+1)&&(i+=1),{end:i,start:l,text:t.substring(l,i),textBefore:t.substring(0,l),textAfter:t.substring(i)}}c.moveToElementText(o),c.collapse(!0),c.moveStart("character",t),c.moveEnd("character",s-t),c.select()}}else t.fn.selection=function(t){const e=this[0];if(!e)return!1;if(null==t)return!!e.setSelectionRange&&e.value.substring(e.selectionStart,e.selectionEnd);const{scrollTop:n}=e;if(e.setSelectionRange){const{selectionStart:n}=e;e.value=e.value.substring(0,n)+t+e.value.substring(e.selectionEnd),e.selectionStart=n,e.selectionEnd=n+t.length}e.focus(),e.scrollTop=n},t.fn.selectionRange=function(t,e){if(null==t){const t={start:this[0].selectionStart,end:this[0].selectionEnd},e=this.val();return t.text=e.substring(t.start,t.end),t.textBefore=e.substring(0,t.start),t.textAfter=e.substring(t.end),t}this[0].selectionStart=t,this[0].selectionEnd=e};t.fn.wrapSelection=function(t,e){this.selection(t+this.selection()+(e||""))}}(o.a,c.document)}},[[572,0,2,5,10]]]);
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.extra.jira:dialogsJs', location = '/jira/datatable.js' */
(function(d){AJS.DataTable=function(a,b,c){c=null;a&&a.jquery?c=a:"string"==typeof a&&(c=d(a));c.addClass("data-table");if(b&&b.length){this.columns=b;a=d("\x3ctr\x3e\x3c/tr\x3e").appendTo(c);a.addClass("data-table-header");for(var e=0;e<b.length;e++){var f=b[e];a.append('\x3cth class\x3d"'+f.className+'"\x3e'+f.title+"\x3c/th\x3e")}}this.tbl=c;this.rowIdx=0};AJS.DataTable.prototype.addRow=function(a){for(var b=d("\x3ctr\x3e\x3c/tr\x3e").appendTo(this.tbl),c=this.columns,e=0;e<this.columns.length;e++){var f=
c[e],h=d("\x3ctd\x3e\x3c/td\x3e").appendTo(b);h.addClass(f.className);f.renderCell(h,a)}b.data("row-data",a);this._bindRowJs(b,this.rowIdx,"selected","hover");this.rowIdx+=1;b.attr("tabindex","-1")};AJS.DataTable.prototype.selectRow=function(a){a=d("tbody tr",this.tbl)[a+1];d(a).focus()};AJS.DataTable.prototype._bindRowJs=function(a,b,c,e){var f=this;a.click(function(g){c&&(d(f.tbl).find("."+c).removeClass(c),d(this).addClass(c));g=a.data("row-data");f.tbl.trigger("row-select",[g])});var h=function(g){switch(g.keyCode){case 13:var k,
l=a.data("row-data");a.keyup(k=function(m){f.tbl.trigger("row-action",[l]);a.unbind("keyup",k);m.stopPropagation();return!1});g.stopPropagation();return!1;case 38:return 0<b&&a.prev().focus(),g.stopPropagation(),!1;case 40:var n=d("tbody tr",f.tbl).length;b<n-1&&a.next().focus();g.stopPropagation();return!1}};d.browser.mozilla?a.keypress(h):a.keydown(h);a.focus(function(g){a.click()});e&&a.hover(function(){d(this).addClass(e)},function(){d(this).removeClass(e)})}})(AJS.$);
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.extra.jira:dialogsJs', location = '/jira/dialogs.js' */
(function(){tinymce.PluginManager.add("jiraconnector",function(){return{init:function(e){e.addCommand("mceJiralink",AJS.Editor.JiraConnector.hotKey);e.on("PostRender",function(){AJS.$.ajax({url:Confluence.getContextPath()+"/rest/jiraanywhere/1.0/servers",async:!1,success:function(k){AJS.Editor.JiraConnector.servers=k}});AJS.$("#jiralink").click(function(k){AJS.Editor.JiraConnector.open(AJS.Editor.JiraConnector.source.editorDropdownLink,!0);k.stopPropagation();return!1});AJS.$("#insert-menu .macro-jiralink").show();
e.addShortcut("ctrl+shift+j","","mceJiralink")})},getInfo:function(){return{longname:"Confluence Jira Connector",author:"Atlassian",authorurl:"http://www.atlassian.com",version:tinymce.majorVersion+"."+tinymce.minorVersion}}}})})();AJS.Editor.Adapter.addTinyMcePluginInit(function(e){e.plugins+=",jiraconnector";var k=e.theme_advanced_buttons1,p=k.indexOf("confimage");e.theme_advanced_buttons1=k.substring(0,p)+"jiralinkButton,"+k.substring(p)});
AJS.Editor.JiraConnector=function(e){var k=require("confluence/form-state-control"),p="Insert Jira Issue/Filter",v="Insert",w="Cancel",q=AJS.format("Hint: type \u0022{0}+Shift+J\u0022 in the editor to quickly access this dialog.",-1!=navigator.platform.toLowerCase().indexOf("mac")?"Cmd":"Ctrl"),l,m,f,x=function(){var a=e("#createPageLabelsString");0<a.length?(m=a.val().split(" ").join(),AJS.Editor.JiraAnalytics.triggerPannelTriggerEvent({source:l,
label:m})):e.getJSON(AJS.Meta.get("base-url")+"/rest/ui/1.0/content/"+AJS.Meta.get("page-id")+"/labels",function(c){var b=[];e.each(c.labels,function(h,n){b.push(n.name)});m=b.join();AJS.Editor.JiraAnalytics.triggerPannelTriggerEvent({source:l,label:m})})},t=function(a){if(!f){f=new AJS.ConfluenceDialog({width:840,height:590,id:"jira-connector"});f.addHeader(p);for(var c=AJS.Editor.JiraConnector.Panels,b=0;b<c.length;b++){f.addPanel(c[b].title());var h=f.getCurrentPanel();c[b].init(h)}f.addLink("Select Macro",
function(){f.hide();AJS.MacroBrowser.open(!1)},"dialog-back-link");f.addHelpText(q);e("#jira-connector .dialog-tip").attr("title",q);f.addButton(v,function(){var g=f.getCurrentPanel().id;g=c[g];var r=c[0];AJS.Editor.JiraAnalytics&&(AJS.Editor.JiraConnector.analyticPanelActionObject=AJS.Editor.JiraAnalytics.setupAnalyticPanelActionObject(g,l,m),r.customizedColumn&&AJS.Editor.JiraAnalytics.triggerCustomizeColumnEvent({columns:r.customizedColumn}));g.insertLink()},"insert-issue-button");k.disableElement(AJS.$(".insert-issue-button"));
f.addCancel(w,function(){AJS.Editor.JiraConnector.closePopup()});f.gotoPanel(0);if(AJS.Editor.JiraConnector.servers)for(b=0;b<AJS.Editor.JiraConnector.servers.length;b++){var n=AJS.Editor.JiraConnector.servers[b];AppLinks.makeRequest({appId:n.id,type:"GET",url:"/rest/api/2/field",dataType:"json",serverIndex:b,success:function(g){g&&g.length&&(AJS.Editor.JiraConnector.servers[this.serverIndex].columns=g)},error:function(){AJS.log("Jira Issues Macro: unable to retrieve fields from AppLink: "+n.id)}})}e("#jira-connector ul.dialog-page-menu").append(Confluence.Templates.ConfluenceJiraPlugin.addCrossMacroLink({id:"open-jira-chart-dialog",
label:"Jira Charts"}));e("#jira-connector .dialog-page-menu button").click(function(){var g=AJS.Editor.JiraConnector.Panels[f.getCurrentPanel().id];g.setInsertButtonState&&g.setInsertButtonState();g.focusForm&&g.focusForm()});e("#open-jira-chart-dialog").click(function(){AJS.Editor.JiraConnector.closePopup();AJS.Editor.JiraChart&&AJS.Editor.JiraChart.open()})}AJS.Editor.JiraConnector.Panels[0].refreshSearchForm();if(a){f.gotoPanel(1);var d=AJS.Editor.JiraConnector.Panels[1];
d.setSummary(a);setTimeout(function(){d.focusForm&&d.focusForm()},0)}else f.gotoPanel(0);f.overrideLastTab();f.show()},u=function(){AJS.Editor.JiraConnector.clickConfigApplink&&AJS.$.ajax({url:Confluence.getContextPath()+"/rest/jiraanywhere/1.0/servers",async:!1,success:function(a){AJS.Editor.JiraConnector.servers=a}});if("undefined"===typeof AJS.Editor.JiraConnector.servers||0===AJS.Editor.JiraConnector.servers.length)return AJS.Editor.JiraConnector.warningPopup(AJS.Meta.get("is-admin")),!1;AJS.Editor.JiraConnector.clickConfigApplink=
!1;AJS.Editor.JiraConnector.refreshAppLink&&(AJS.Editor.JiraConnector.refreshAppLink.call(),AJS.Editor.JiraConnector.refreshAppLink=!1);return!0};return{warningPopup:function(a){var c=new AJS.ConfluenceDialog({width:600,height:400,id:"warning-applink-dialog"}),b="Connect Confluence To Jira";c.addHeader(b);b=Confluence.Templates.ConfluenceJiraPlugin.warningDialog({isAdministrator:a});c.addPanel("Panel 1",b);c.get("panel:0").setPadding(0);a?(c.addButton("Set connection",
function(h){AJS.Editor.JiraConnector.clickConfigApplink=!0;h.hide();tinymce.confluence.macrobrowser.macroBrowserCancel();window.open(Confluence.getContextPath()+"/admin/listapplicationlinks.action").opener=null},"create-dialog-create-button app_link"),c.popup.element.find(".create-dialog-create-button").removeClass("button-panel-button").addClass("aui-button aui-button-primary")):c.addButton("Contact admin",function(h){h.hide();tinymce.confluence.macrobrowser.macroBrowserCancel();
window.open(Confluence.getContextPath()+"/wiki/contactadministrators.action").opener=null});c.addLink("Cancel",function(h){h.hide();tinymce.confluence.macrobrowser.macroBrowserCancel()});c.show();c.gotoPanel(0)},closePopup:function(){f.hide();tinymce.confluence.macrobrowser.macroBrowserCancel()},open:function(a,c){if(u()){AJS.Editor.Adapter.storeCurrentSelectionState();l=a;AJS.Editor.JiraAnalytics&&l&&(l===AJS.Editor.JiraConnector.source.instructionalText?
x():(m=null,AJS.Editor.JiraAnalytics.triggerPannelTriggerEvent({source:l})));a=tinymce.confluence.macrobrowser;var b=a.getCurrentNode();a.isMacroTag(b)&&"jira"==e(b).attr("data-macro-name")?a.editMacro(b):AJS.Editor.JiraConnector.openCleanDialog(c)}},openCleanDialog:function(a){a=a&&tinyMCE.activeEditor.selection&&tinyMCE.activeEditor.selection.getContent({format:"text"});t(a);AJS.Editor.JiraConnector.Panels[0].setMacroParams(null)},edit:function(a){if(u())if("undefined"==typeof a.params)AJS.Editor.JiraConnector.openCleanDialog(!1);
else{m=l="";var c={};if(a.params.url)c.searchStr=a.params.url;else{c.maximumIssues=a.params.maximumIssues;var b;if(!(b=a.defaultParameterValue))b:if(b=a.params,b.hasOwnProperty("jqlQuery"))b=b.jqlQuery;else{var h=/^([0-9]\d*)$/,n="count columns columnIds title renderMode cache width height server serverId anonymous baseurl showSummary".split(" ");for(d in b)if(-1==e.inArray(d,n)&&b.hasOwnProperty(d)){b=h.test(d)?b[d]:d+(" \x3d "+b[d]);break b}b=""}var d=b;c.searchStr="undefined"==typeof d?"":d;if("undefined"!=
typeof a.params.server)c.serverName=a.params.server;else for(d=0;d<AJS.Editor.JiraConnector.servers.length;d++)if(AJS.Editor.JiraConnector.servers[d].selected){c.serverName=AJS.Editor.JiraConnector.servers[d].name;break}c.columnIds=a.params.columnIds}d=a.params.count;"undefined"===typeof d&&(d="false");c.count=d;d=a.params.columns;"undefined"!=typeof d&&d.length&&(c.columns=d);a&&!AJS.Editor.inRichTextMode()&&e("#markupTextarea").selectionRange(a.startIndex,a.startIndex+a.markup.length);t();c.searchStr&&
(f.gotoPanel(0),d=AJS.Editor.JiraConnector.Panels[0],d.setMacroParams(c),a={searchValue:c.searchStr,serverName:c.serverName,isJqlQuery:a.params.hasOwnProperty("jqlQuery"),isAutoSearch:!0},d.doSearch(a))}},source:{macroBrowser:"macro_browser",editorBraceKey:"editor_brace_key",editorHotKey:"editor_hot_key",editorDropdownLink:"editor_dropdown_link",instructionalText:"instructional text"}}}(AJS.$);AJS.MacroBrowser.setMacroJsOverride("jira",{opener:AJS.Editor.JiraConnector.edit});
AJS.MacroBrowser.setMacroJsOverride("jiraissues",{opener:AJS.Editor.JiraConnector.edit});AJS.Editor.JiraConnector.Panels=[];AJS.Editor.JiraConnector.clickConfigApplink=!1;AJS.Editor.JiraConnector.hotKey=function(){AJS.Editor.JiraConnector.open(AJS.Editor.JiraConnector.source.editorHotKey,!0)};
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.extra.jira:dialogsJs', location = '/jira/panelhelper.js' */
(function(AJS){var FormStateControl=require("confluence/form-state-control");AJS.Editor.JiraConnector.Panel=function(){};AJS.Editor.JiraConnector.Panel.prototype={SHOW_MESSAGE_ON_TOP:false,insertIssueLink:function(key){this.insertIssueLinkWithParams({"key":key})},insertJqlLink:function(jql){this.insertIssueLinkWithParams({"jqlQuery":jql})},insertIssueLinkWithParams:function(params){var insertMacroAtSelectionFromMarkup=function(macro){tinymce.confluence.macrobrowser.macroBrowserComplete(macro)};params["server"]=
this.selectedServer.name;params["serverId"]=this.selectedServer.id;if(AJS.Editor.inRichTextMode())insertMacroAtSelectionFromMarkup({name:"jira","params":params});else{var markup="{jira:";for(var key in params)markup=markup+key+"\x3d"+params[key]+"|";if(markup.charAt(markup.length-1)=="|")markup=markup.substr(0,markup.length-1);var textArea=AJS.$("#markupTextarea");var selection=textArea.selectionRange();textArea.selectionRange(selection.start,selection.end);textArea.selection(markup);selection=textArea.selectionRange();
textArea.selectionRange(selection.end,selection.end)}if(AJS.Editor.JiraAnalytics&&AJS.Editor.JiraConnector.analyticPanelActionObject){AJS.Editor.JiraAnalytics.triggerPannelActionEvent(AJS.Editor.JiraConnector.analyticPanelActionObject);AJS.Editor.JiraConnector.analyticPanelActionObject=null}AJS.Editor.JiraConnector.closePopup()},disableInsert:function(){FormStateControl.disableElement(AJS.$(".insert-issue-button"))},isInsertDisabled:function(){return AJS.$(".insert-issue-button").is(":disabled")},
getOAuthRealm:function(xhr){var authHeader=xhr.getResponseHeader("WWW-Authenticate")||"";var realmRegEx=/OAuth realm="([^"]+)"/;var matches=realmRegEx.exec(authHeader);if(matches)return matches[1];else return null},enableInsert:function(){FormStateControl.enableElement(AJS.$(".insert-issue-button"))},handleInsertWaiting:function(isWaiting){var $insertButton=AJS.$(".insert-issue-button");return isWaiting?$insertButton.before(aui.icons.icon({icon:"wait"})):$insertButton.prev(".aui-icon.aui-icon-wait").remove()},
msg:function(container,messageObject,messageType){if(aui&&aui.message)try{var auiMessageContainer=AJS.$('\x3cdiv class\x3d"aui-message-container"/\x3e');var message=messageObject;if(messageObject.html)message=messageObject.html();var templateParameters={"content":message};var formattedMessage;switch(messageType){case "error":formattedMessage=aui.message.error(templateParameters);break;case "success":formattedMessage=aui.message.success(templateParameters);break;case "warning":formattedMessage=aui.message.warning(templateParameters);
break;default:formattedMessage=aui.message.info(templateParameters)}auiMessageContainer.append(formattedMessage);messageObject=auiMessageContainer}catch(e){if(AJS&&AJS.logError)AJS.logError("jira-connector",e)}container.append(messageObject)},errorMsg:function(container,messageObject){this.removeError(container);var errorBlock=this.SHOW_MESSAGE_ON_TOP?AJS.$('\x3cdiv class\x3d"jira-error"\x3e\x3c/div\x3e').prependTo(container):AJS.$('\x3cdiv class\x3d"jira-error"\x3e\x3c/div\x3e').appendTo(container);
this.msg(errorBlock,messageObject,"error")},warningMsg:function(container,messageObject){this.removeError(container);var warningBlock=this.SHOW_MESSAGE_ON_TOP?AJS.$('\x3cdiv class\x3d"jira-error"\x3e\x3c/div\x3e').prependTo(container):AJS.$('\x3cdiv class\x3d"jira-error"\x3e\x3c/div\x3e').appendTo(container);this.msg(warningBlock,messageObject,"warning")},noServerMsg:function(container,messageObject){var dataContainer=AJS.$('\x3cdiv class\x3d"data-table jiraSearchResults" \x3e\x3c/div\x3e').appendTo(container);
var messagePanel=this.SHOW_MESSAGE_ON_TOP?AJS.$('\x3cdiv class\x3d"message-panel"/\x3e').prependTo(dataContainer):AJS.$('\x3cdiv class\x3d"message-panel"/\x3e').appendTo(dataContainer);this.msg(messagePanel,messageObject,"info")},ajaxError:function(xhr,onOauthFail){if(xhr.status==401){var authUrl=this.getOAuthRealm(xhr);this.selectedServer.authUrl=authUrl;onOauthFail.call(this)}else this.errorMsg(this.container,"Received the following HTTP error code from the server"+": "+xhr.status)},removeError:function(container){AJS.$("div.jira-error",
container).remove()},setActionOnEnter:function(input,f,source){input.unbind("keydown").keydown(function(e){if(e.which==13){var keyup=function(e){input.unbind("keyup",keyup);f(source);e.stopPropagation();return false};input.keyup(keyup);e.stopPropagation();return false}})},createOauthForm:function(success){var server=this.selectedServer;var oauthCallbacks={onSuccess:function(){server.authUrl=null;success(server)},onFailure:function(){}};var oauthMessage='\x3ca class\x3d"oauth-init" href\x3d"javascript:void(0)"\x3e'+
"Login & Approve"+"\x3c/a\x3e "+"to retrieve data from"+" "+AJS.escapeHtml(this.selectedServer.name);var oauthForm=AJS.$('\x3cdiv class\x3d"jira-oauth-message-marker"/\x3e');if(!(aui&&aui.message))oauthForm.addClass("oauth-message");this.msg(oauthForm,oauthMessage,"info");AJS.$(".oauth-init",oauthForm).click(function(e){AppLinks.authenticateRemoteCredentials(server.authUrl,oauthCallbacks.onSuccess,oauthCallbacks.onFailure);e.preventDefault()});
return oauthForm},applinkServerSelect:function(container,onchange){var servers=AJS.Editor.JiraConnector.servers;AJS.$(servers).each(function(){var option="\x3coption ";if(this.selected){selectedServer=this;option+='selected\x3d"selected"'}option+='value\x3d"'+this.id+'"\x3e\x3c/option\x3e';option=AJS.$(option);option.text(this.name);AJS.$(container).append(option);option.data("jiraapplink",this)});AJS.$(container).change(function(e){var option=AJS.$("option:selected",container);var server=option.data("jiraapplink");
onchange(server)})},showSpinner:function(element,radius,centerWidth,centerHeight){AJS.$.data(element,"spinner",Raphael.spinner(element,radius,"#666"));if(centerWidth)AJS.$(element).css("marginLeft",-radius*1.2);if(centerHeight)AJS.$(element).css("marginTop",-radius*1.2)},hideSpinner:function(element){AJS.$(element).css("marginTop","");AJS.$(element).css("marginLeft","");var spinner=AJS.$.data(element,"spinner");if(spinner){spinner();delete spinner;AJS.$.data(element,"spinner",null)}},setSelectedIssue:function(issue){this.selectedIssue=
issue;this.enableInsert()},insertSelected:function(){if(this.selectedIssue)this.insertIssueLink(this.selectedIssue.key)},createIssueTableFromUrl:function(container,appId,url,selectHandler,enterHandler,noRowsHandler,onSuccess,onError,isShowCheckBox){AJS.$("div.data-table",container).remove();var dataContainer=AJS.$('\x3cdiv class\x3d"data-table jiraSearchResults" \x3e\x3c/div\x3e').appendTo(container);var spinnyContainer=AJS.$('\x3cdiv class\x3d"loading-data"\x3e\x3c/div\x3e').appendTo(dataContainer);
this.removeError(container);this.showSpinner(spinnyContainer[0],50,true,true);var thiz=this;this.currentXhr=AppLinks.makeRequest({appId:appId,type:"GET",url:url,dataType:"xml",success:function(data){spinnyContainer.remove();var issues=AJS.$("item",data);FormStateControl.enableElement(AJS.$(":disabled",container));if(issues.length){var table=AJS.$('\x3ctable class\x3d"my-result aui"\x3e\x3c/table\x3e');AJS.$(".jiraSearchResults",container).append(table);var columns=[];if(isShowCheckBox){var checkBoxColumn=
{className:"issue-checkbox-column",title:'\x3cinput type\x3d"checkbox" name\x3d"jira-issue-all" checked/\x3e',renderCell:function(td,issue){var issueCheckbox=Confluence.Templates.ConfluenceJiraPlugin.issueCheckbox({"issueKey":issue.key});AJS.$(issueCheckbox).appendTo(td)}};columns.push(checkBoxColumn)}var defaultColumns=[{className:"issue-key-column",title:"Key",renderCell:function(td,issue){var {rpcUrl,displayUrl}=thiz.selectedServer;var rebasedUrl=issue.iconUrl.replace(rpcUrl,
displayUrl);var issueKey=Confluence.Templates.ConfluenceJiraPlugin.issueKey({"issueIconUrl":rebasedUrl,"issueKey":issue.key});AJS.$(issueKey).appendTo(td)}},{className:"issue-summary-column",title:"Summary",renderCell:function(td,issue){td.text(issue.summary)}}];columns=columns.concat(defaultColumns);var dataTable=new AJS.DataTable(table,columns);AJS.$(issues).each(function(){var issue={iconUrl:AJS.$("type",this).attr("iconUrl"),key:AJS.$("key",this).text(),summary:AJS.$("summary",
this).text(),url:AJS.$("link",this).text()};dataTable.addRow(issue)});table.bind("row-action",function(e,data){enterHandler.call(thiz,data)});table.bind("row-select",function(e,data){selectHandler.call(thiz,data)});dataTable.selectRow(0);if(onSuccess){var totalIssues=AJS.$("issue",data).attr("total");onSuccess.call(thiz,totalIssues)}}else{if(noRowsHandler)noRowsHandler();var message="No search results found.";var messagePanel=AJS.$('\x3cdiv class\x3d"message-panel"/\x3e');
thiz.msg(messagePanel,message,"info");AJS.$(".jiraSearchResults",container).append(messagePanel)}},error:function(xhr){FormStateControl.enableElement(AJS.$(":disabled",container));spinnyContainer.remove();onError.call(thiz,xhr)}})},retrieveJson:function(appId,url,onSuccess,onError){AppLinks.makeRequest({appId:appId,type:"GET",url:url,dataType:"json",success:onSuccess,error:onError})}}})(AJS);
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.extra.jira:dialogsJs', location = '/jira/searchpanel.js' */
AJS.Editor.JiraConnector.Panel.Search=function(){this.jql_operators=/=|!=|~|>|<|!~| is | in /i};AJS.Editor.JiraConnector.Select2=AJS.Editor.JiraConnector.Select2||{};AJS.Editor.JiraConnector.Panel.Search.prototype=AJS.$.extend(AJS.Editor.JiraConnector.Panel.Search.prototype,AJS.Editor.JiraConnector.Panel.prototype);
AJS.Editor.JiraConnector.Panel.Search.prototype=AJS.$.extend(AJS.Editor.JiraConnector.Panel.Search.prototype,{defaultColumns:"key,summary,type,created,updated,due,assignee,reporter,priority,status,resolution",defaultColumnIds:"issuekey,summary,issuetype,created,updated,duedate,assignee,reporter,priority,status,resolution",aliases:[{id:"issuekey",clauseName:"key"},{id:"issuetype",clauseName:"type"},{id:"duedate",clauseName:"due"}],DEFAULT_MAX_ISSUES_VAL:20,MAXIMUM_MAX_ISSUES_VAL:1E3,MINIMUM_MAX_ISSUES_VAL:1,
title:function(){return "Search"},init:function(a){var c=require("confluence/form-state-control");a.html('\x3cdiv id\x3d"my-jira-search"\x3e\x3c/div\x3e');var b=this,d=AJS.$("#my-jira-search");this.container=d;var f=function(){d.children(":not(div.jira-search-form)").remove()},p=function(){c.enableElement(AJS.$("input.text,button",d))},n=function(){c.disableElement(AJS.$("input.text,button",d))},l=function(e){f();b.disableInsert();e&&(b.selectedServer=e);b.selectedServer.authUrl?
(n(),e=b.createOauthForm(function(){f();p()}),d.append(e)):(p(),AJS.$(".search-help").show())};this.authCheck=l;this.doSearch=function(e){var m=e&&e.searchValue,g=e&&e.serverName;m&&AJS.$("input:text",d).val(m);if(g&&g!=this.selectedServer.name){for(var q=AJS.Editor.JiraConnector.servers,t=!1,r=0;r<q.length;r++)if(q[r].name==g){AJS.$('option[value\x3d"'+q[r].id+'"]',d).attr("selected","selected");AJS.$("select",d).change();t=!0;break}if(!t){k(AJS.Meta.get("is-admin"));return}}this.currentXhr&&4!=
this.currentXhr.readyState||(g=m||AJS.$("input",d).val(),AJS.Editor.JiraAnalytics&&(m=AJS.JQLHelper.checkQueryType(g))&&AJS.Editor.JiraAnalytics.triggerSearchEvent({type:m,source:"dialog"}),m=function(w,v,x){v=d.find("#jiraIssueColumnSelector");var y=v.val()&&v.val();c.disableElement(AJS.$("select",d));n();b.lastSearch=w;b.createIssueTableFromUrl(d,b.selectedServer.id,"/sr/jira.issueviews:searchrequest-xml/temp/SearchRequest.xml?jqlQuery\x3d"+encodeURIComponent(w)+"\x26returnMax\x3dtrue\x26tempMax\x3d20\x26field\x3dsummary\x26field\x3dtype\x26field\x3dlink",
b.selectHandler,b.insertLinkFromForm,function(){b.addDisplayOptionPanel();b.loadMacroParams(y);b.bindEventToDisplayOptionPanel(!0,e);b.enableInsert()},function(u){b.addDisplayOptionPanel();b.loadMacroParams(y);b.bindEventToDisplayOptionPanel(!1,e);b.updateTotalIssuesDisplay(u);b.checkAutoSelectColumns();e&&e.isAutoSearch&&b.focusForm()},function(u){b.disableInsert();400==u.status?x?x():(AJS.$("div.data-table",d).remove(),b.warningMsg(d,AJS.format("The Jira server didn\u0027\u0027t understand your search query. If you entered JQL, please ensure that it\u0027\u0027s correctly formed. If you entered an issue key, ensure that it exists and you have permission to view it. {0}",Confluence.Templates.ConfluenceJiraPlugin.learnMore()))):
(AJS.$("div.data-table",d).remove(),b.ajaxError(u,l));e&&e.isAutoSearch&&b.focusForm()},!0)},AJS.JQLHelper.isFilterUrl(g)?(g=decodeURIComponent(g),q=AJS.JQLHelper.findServerIndexFromUrl(g,AJS.Editor.JiraConnector.servers),-1!=q?(AJS.$('option[value\x3d"'+AJS.Editor.JiraConnector.servers[q].id+'"]',d).attr("selected","selected"),AJS.$("select",d).change(),(g=AJS.JQLHelper.getFilterFromFilterUrl(g))?(AJS.$("input",d).val(g),m(g)):(f(),b.warningMsg(d,AJS.format("The Jira server didn\u0027\u0027t understand your search query. If you entered JQL, please ensure that it\u0027\u0027s correctly formed. If you entered an issue key, ensure that it exists and you have permission to view it. {0}",
Confluence.Templates.ConfluenceJiraPlugin.learnMore())))):(f(),b.disableInsert(),k(AJS.Meta.get("is-admin")))):AJS.JQLHelper.isIssueUrlOrXmlUrl(g)?(g=decodeURIComponent(g),g=AJS.JQLHelper.getJqlAndServerIndexFromUrl(g,AJS.Editor.JiraConnector.servers),h(g)&&(AJS.$("input",d).val(g.jqlQuery),m(g.jqlQuery,!1,null))):g.match(b.jql_operators)?m(g,!1,null):AJS.JQLHelper.isSingleKeyJQLExp(g)?m("key \x3d "+g,!0):AJS.JQLHelper.isMultipleSingleKeyJQLExp(g)?m("key in ("+g+")",!0):m('summary ~ "'+g+'" OR description ~ "'+
g+'"',!1,null))};b.addSearchForm();var h=function(e){if(-1!=e.serverIndex)if(AJS.$('option[value\x3d"'+AJS.Editor.JiraConnector.servers[e.serverIndex].id+'"]',d).attr("selected","selected"),AJS.$("select",d).change(),0==e.jqlQuery.length)f(),b.errorMsg(d,"The Jira server didn\u0027t understand your search query. If you entered JQL, please ensure that it\u0027s correctly formed. If you entered an issue key, ensure that it exists and you have permission to view it. {0}");else var m=e.jqlQuery;else f(),b.disableInsert(),k(AJS.Meta.get("is-admin"));return m};b.processJiraParams=h;var k=function(e){e=Confluence.Templates.ConfluenceJiraPlugin.showMessageNoServer({isAdministrator:e,
contextPath:Confluence.getContextPath()});b.noServerMsg(d,e);AJS.$("#open_applinks").bind("click",function(){AJS.Editor.JiraConnector.clickConfigApplink=!0;AJS.Editor.JiraConnector.refreshAppLink=function(){b.refreshSearchForm()}})};b.bindPasteEvent();AJS.$(a).select(function(){b.validate()});$(document).tooltip({live:".jql-display-opts-open.disabled",title:function(){return AJS.$(".jql-display-opts-open.disabled").data("title")},gravity:"s",delayIn:300,delayOut:0})},focusForm:function(){AJS.$('input[name\x3d"jiraSearch"]',
this.container).focus()},addSearchForm:function(){var a=this;a.container.empty();var c=AJS.Editor.JiraConnector.servers;a.selectedServer=c[0];var b=!1;1<c.length&&(b=!0);b=Confluence.Templates.ConfluenceJiraPlugin.searchForm({isMultiServer:b});b=AJS.$(b).appendTo(a.container);1<c.length&&(c=AJS.$('\x3cselect class\x3d"select" tabindex\x3d"0"\x3e\x3c/select\x3e').insertAfter("div.search-input",b),a.applinkServerSelect(c,a.authCheck));a.authCheck(a.selectedServer);AJS.$("button",a.container).click(function(){a.doSearch()});
a.setActionOnEnter(AJS.$("input.text",a.container),a.doSearch)},bindPasteEvent:function(){var a=this;AJS.$("#my-jira-search input:text").bind("paste",function(){var c=this;setTimeout(function(){var b=AJS.$(c).val();AJS.JQLHelper.isFilterUrl(b)?a.doSearch():AJS.JQLHelper.isIssueUrlOrXmlUrl(b)&&(b=decodeURIComponent(b),b=AJS.JQLHelper.getJqlAndServerIndexFromUrl(b,AJS.Editor.JiraConnector.servers),a.processJiraParams(b)&&(AJS.$(c).val(b.jqlQuery),a.doSearch()))},100)})},refreshSearchForm:function(){this.container.empty();
this.addSearchForm();this.bindPasteEvent()},validate:function(a,c){var b=this.container,d=AJS.$("input:checkbox[name\x3djira-issue]",b),f=AJS.Editor.JiraConnector.Panel.Search.prototype;d.length||a?(b=AJS.$("input:checkbox[name\x3djira-issue]:checked",b).length,0<b||a?f.enableInsert():f.disableInsert(),f.changeInsertOptionStatus(b,a,c)):(AJS.$(".jira-oauth-message-marker",b).length&&f.authCheck(this.selectedServer),AJS.$("input",b).focus(),f.disableInsert());f.isInsertDisabled()||f.validateMaxIssues()},
isValidMaxIssues:function(a){return AJS.$.isNumeric(a)&&this.MINIMUM_MAX_ISSUES_VAL<=a&&a<=this.MAXIMUM_MAX_ISSUES_VAL},validateMaxIssues:function(a){function c(){b.next("#jira-max-number-error").remove()}var b=AJS.$("#jira-maximum-issues");switch(AJS.$("input:radio[name\x3dinsert-advanced]:checked").val()){case "insert-single":case "insert-count":c();b.attr("disabled","disabled");break;case "insert-table":var d=AJS.Editor.JiraConnector.Panel.Search.prototype;b.removeAttr("disabled");var f=b.val();
if(""===AJS.$.trim(f)){if(a&&"keyup"===a.type){c();break}if(a&&"blur"===a.type){f=d.MAXIMUM_MAX_ISSUES_VAL;b.val(f);break}}d.isValidMaxIssues(f)?(c(),d.enableInsert()):(c(),b.after(Confluence.Templates.ConfluenceJiraPlugin.warningValMaxiumIssues()),d.disableInsert())}},customizedColumn:null,checkAndSetDefaultValueMaximumIssues:function(a){if(a){var c=a.element||AJS.$("#jira-maximum-issues");a=a.defaultVal||this.MAXIMUM_MAX_ISSUES_VAL;""===AJS.$.trim(c.val())&&c.val(a)}else AJS.log("Cannot set default value for Maximum Issues")},
setMacroParams:function(a){this.macroParams=a},getMacroParamsFromUserInput:function(){var a=this,c="insert-count"==AJS.$("input:radio[name\x3dinsert-advanced]:checked").val(),b=[],d=[],f=[],p=[],n=[],l={};AJS.$("#my-jira-search .my-result.aui input:checkbox[name\x3djira-issue]").each(function(h){h=AJS.$(this);h.is(":checked")?d[d.length]=h.val():f[f.length]=h.val()});if(c)l.count="true";else{if(!AJS.Editor.JiraConnector.Panel.Search.jiraColumnSelectBox){l.columns=this.defaultColumns;l.columnIds=this.defaultColumnIds;
return}b=AJS.Editor.JiraConnector.Panel.Search.jiraColumnSelectBox.select2("data");b.length?(l.columns=b.map(function(h){return a.selectedServer.columns.find(function(k){return k.id===h.id}).custom?h.text.replace(/%/g,encodeURIComponent("%")).replace(/,/g,encodeURIComponent(",")).replace(/;/g,encodeURIComponent(";")):h.id}).map(function(h){var k=a.aliases.find(function(e){return e.id===h});return k?k.clauseName:h}).join(","),l.columnIds=b.map(function(h){return h.id}).join(","),(p=a.selectedServer.columns.find(function(h){return h.clauseNames.find(function(k){k=
k.toLowerCase();return"epic link"===k||"gh.epic.link.name"===k})}))&&!b.some(function(h){return h.id===p.id})&&(n=a.selectedServer.columns.filter(function(h){return h.clauseNames.find(function(k){k=k.toLowerCase();return"epic name"===k||"gh.epic.label.name"===k||"epic colour"===k||"gh.epic.color.name"===k||"epic status"===k||"gh.epic.status.name"===k})}),b.some(function(h){return n.some(function(k){return k.id===h.id})})&&(l.epicLinkId=p.id))):(l.columns=this.defaultColumns,l.columnIds=this.defaultColumnIds)}c=
AJS.$("input:radio[name\x3dinsert-advanced]:checked").val();"insert-single"===c?l.key=d.toString():l.jqlQuery=0==f.length?this.lastSearch+" ":1==d.length?"key \x3d "+d.toString():"key in ("+d.toString()+")";"insert-table"===c&&(l.maximumIssues=AJS.$("#jira-maximum-issues").val());return l},insertLinkFromForm:function(){var a=this.container;AJS.$("input:checkbox[name\x3djira-issue]",a).length&&0<AJS.$("input:checkbox[name\x3djira-issue]:checked",a).length&&this.insertLink()},insertLink:function(a){a=
a&&"function"===typeof a.insertIssueLinkWithParams?a:this;var c=a.getMacroParamsFromUserInput();a.insertIssueLinkWithParams(c);return!0},loadMacroParams:function(a){var c=this.macroParams;c?(c.maximumIssues||AJS.$("#jira-maximum-issues").attr("disabled","disabled"),"true"==c.count?AJS.$("#opt-total").prop("checked",!0):(AJS.$("#opt-table").prop("checked",!0),AJS.$("#jira-maximum-issues").removeAttr("disabled"),this.checkAndSetDefaultValueMaximumIssues({defaultVal:c.maximumIssues||this.DEFAULT_MAX_ISSUES_VAL}))):
this.checkAndSetDefaultValueMaximumIssues({defaultVal:20});this.prepareColumnSelect(a)},selectHandler:function(){var a=this.container.find("tr.selected");a.length&&a.unbind("keydown.space").bind("keydown.space",function(c){32!=c.which&&32!=c.keyCode||a.find("[type\x3dcheckbox]").trigger("click")})},addDisplayOptionPanel:function(){var a=Confluence.Templates.ConfluenceJiraPlugin.displayOptsOverlayHtml;AJS.$(".jiraSearchResults").after(a());AJS.$("#jiraMacroDlg").unbind("submit").on("submit",function(c){return!1})},
updateTotalIssuesDisplay:function(a){var c=this.selectedServer.url+"/issues/?jql\x3d"+this.lastSearch;20<a&&AJS.$(".my-result.aui").after(Confluence.Templates.ConfluenceJiraPlugin.viewAll({jiraIssuesLink:c}));a=AJS.format("{0} issues",a);AJS.$(".total-issues-text").html(a);AJS.$(".total-issues-link").attr("href",c)},prepareColumnSelect:function(a){var c=this,b=!(this.macroParams&&!this.macroParams.columnIds),d=a||this.macroParams&&this.macroParams.columnIds&&this.macroParams.columnIds.split(",")||
this.macroParams&&this.macroParams.columns&&this.macroParams.columns.toLowerCase().split(",")||this.defaultColumnIds.split(","),f=this.selectedServer,p=function(n){var l=AJS.$("#jiraIssueColumnSelector"),h="",k="";n.filter(function(e){return e.navigable}).sort(function(e,m){var g=d.map(function(q){var t=c.aliases.find(function(r){return r.clauseName===q});return t?t.id:q});return g.indexOf(b||!e.custom?e.id:e.name.toLowerCase())-g.indexOf(b||!m.custom?m.id:m.name.toLowerCase())}).forEach(function(e){d.find(function(m){return b?
m===e.id:e.clauseNames.includes(m)||m===e.name.toLowerCase()})?k+=AJS.template('\x3coption selected\x3d"true" value\x3d"{fieldId}"\x3e{fieldName}\x3c/option\x3e').fill({fieldId:e.id,fieldName:e.name}):h+=AJS.template('\x3coption value\x3d"{fieldId}"\x3e{fieldName}\x3c/option\x3e').fill({fieldId:e.id,fieldName:e.name})});l.hide();l.html(k+h);l.show();l.auiSelect2({width:"415px",containerCssClass:"select2-container-jira-issue-columns"});AJS.Editor.JiraConnector.Panel.Search.jiraColumnSelectBox=l};f.columns&&
0<f.columns.length?p(f.columns):this.retrieveJson(f.id,"/rest/api/2/field",function(n){n&&n.length&&(f.columns=n,p(f.columns))})},expandDisplayOptPanel:function(){var a=AJS.$(".jql-display-opts-overlay"),c=a.height();a.css("top","");a.css("bottom",-(c-40)+"px");a.animate({bottom:0},500)},minimizeDisplayOptPanel:function(){var a=AJS.$(".jql-display-opts-overlay");a.css("top",a.position().top+"px");a.css("bottom","");a.animate({top:414},500)},disableAutoSelectColumns:function(){AJS.Editor.JiraConnector.Panel.Search.jiraColumnSelectBox.auiSelect2("enable",
!1)},enableAutoSelectColumns:function(){AJS.Editor.JiraConnector.Panel.Search.jiraColumnSelectBox.auiSelect2("enable",!0)},checkAutoSelectColumns:function(){AJS.$("#opt-table").prop("checked")?this.enableAutoSelectColumns():(this.disableAutoSelectColumns(),this.enableInsert())},bindEventToDisplayOptionPanel:function(a,c){var b=this,d=AJS.$(".jql-display-opts-close, .jql-display-opts-open"),f=AJS.$(".jql-display-opts-overlay"),p=AJS.$(".jql-display-opts-inner .radio"),n=AJS.$("#my-jira-search input:checkbox[name\x3djira-issue-all]"),
l=AJS.$("#my-jira-search input:checkbox[name\x3djira-issue]");AJS.$("#jira-maximum-issues").on("blur keyup",AJS.Editor.JiraConnector.Panel.Search.prototype.validateMaxIssues);f.css("top","414px");d.click(function(h){h.preventDefault();AJS.$(this).hasClass("disabled")||(AJS.$(this).hasClass("jql-display-opts-open")?(b.expandDisplayOptPanel(),jQuery(this).addClass("jql-display-opts-close"),jQuery(this).removeClass("jql-display-opts-open")):(b.minimizeDisplayOptPanel(),jQuery(this).removeClass("jql-display-opts-close"),
jQuery(this).addClass("jql-display-opts-open")))});p.change(function(){b.checkAutoSelectColumns();b.validateMaxIssues()});n.bind("click",function(){AJS.$(this).prop("checked")?l.prop("checked","checked"):l.removeAttr("checked");b.validate()});l.change(function(){0<AJS.$("#my-jira-search input:checkbox[name\x3djira-issue]:not(:checked)").length?n.removeAttr("checked"):n.prop("checked","checked");b.validate()});b.validate(a,c)},changeInsertOptionStatus:function(a,c,b){var d=AJS.$("#opt-single"),f=AJS.$("#opt-total"),
p=AJS.$("#opt-table"),n=AJS.$("#my-jira-search input:checkbox[name\x3djira-issue]:checked");a="checked"===AJS.$("#my-jira-search input:checkbox[name\x3djira-issue-all]").attr("checked");var l=1===n.length,h=1<n.length;n=0===n.length;var k=AJS.JQLHelper.isSingleKeyJQLExp(AJS.$("#my-jira-search input[name\x3djiraSearch]").val()),e=function(){b&&b.isJqlQuery?p.click():d.click()},m=function(){f.attr("disabled","disabled");p.removeAttr("disabled");d.removeAttr("disabled");e();setTimeout(function(){e()},
100)},g=function(){d.attr("disabled","disabled");f.removeAttr("disabled");"insert-single"===AJS.$("input[name\x3dinsert-advanced]:checked").val()&&setTimeout(function(){p.removeAttr("disabled").click()},100)},q=function(){p.removeAttr("disabled","disabled");f.removeAttr("disabled","disabled");d.removeAttr("disabled","disabled");"insert-single"===AJS.$("input:radio[name\x3dinsert-advanced]:checked").val()&&setTimeout(function(){p.click()},100)};AJS.$(".jql-display-opts-open").removeClass("disabled");
d.removeAttr("disabled");f.removeAttr("disabled");p.removeAttr("disabled");a&&l&&k?m():a&&l&&!k?q():h?g():l&&!a?m():c?g():n&&(d.attr("disabled","disabled"),f.attr("disabled","disabled"),p.attr("disabled","disabled"),AJS.$(".jql-display-opts-close").click(),AJS.$(".jql-display-opts-open").addClass("disabled"))},isInsertTableType:function(){return"insert-table"===AJS.$("input:radio[name\x3dinsert-advanced]:checked").val()},setInsertButtonState:function(){var a=AJS.$(".jql-display-opts-close, .jql-display-opts-open"),
c=AJS.$("#jira-maximum-issues");!a.length||a.length&&this.isInsertTableType()&&!this.isValidMaxIssues(c.val())?this.disableInsert():this.enableInsert()},analyticPanelActionName:"confluence.jira.plugin.searchadded"});AJS.Editor.JiraConnector.Panels.push(new AJS.Editor.JiraConnector.Panel.Search);
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.extra.jira:dialogsJs', location = '/jira/jip_createissuepanel.js' */
AJS.Editor.JiraConnector.Panel.Create=function(){};AJS.Editor.JiraConnector.Panel.Create.prototype=AJS.$.extend(AJS.Editor.JiraConnector.Panel.Create.prototype,AJS.Editor.JiraConnector.Panel.prototype);
AJS.Editor.JiraConnector.Panel.Create.prototype=AJS.$.extend(AJS.Editor.JiraConnector.Panel.Create.prototype,{DEFAULT_PROJECT_VALUE:"-1",SHOW_MESSAGE_ON_TOP:!0,EXCLUDED_FIELDS:["project","issuetype","summary","description"],PROJECTS_META:{},setSummary:function(a){var b=AJS.$('.field-group [name\x3d"summary"]',this.jipForm.formEl);b.length&&b.val(a)},resetIssue:function(){AJS.$(".issue-summary",this.container).empty();AJS.$(".issue-description",this.container).empty()},focusForm:function(){var a=AJS.$("select.server-select",
this.container);a.length?a.focus():(a=AJS.$(".project-select",this.container),a.length&&a.focus())},authCheck:function(){this.selectedServer=this.jipForm.getCurrentServer();this.selectedServer.authUrl?this.showOauthChallenge():this.serverSelect()},ajaxAuthCheck:function(a){var b=this;this.endLoading();this.ajaxError(a,function(){b.authCheck(b.jipForm.getCurrentServer())})},showOauthChallenge:function(){AJS.$("div.field-group",this.container).not(".servers").hide();AJS.$(".jira-oauth-message-marker",
this.container).remove();var a=this,b=this.createOauthForm(function(){a.serverSelect()});this.container.append(b)},projectOk:function(){var a=AJS.$(".project-select option:selected",this.container).val();return a&&a.length&&a!=this.DEFAULT_PROJECT_VALUE},setInsertButtonState:function(){if(!1===this.formHasError&&this.projectOk())return this.enableInsert(),!0;this.disableInsert();return!1},startLoading:function(){var a=require("confluence/form-state-control");this.removeError(this.container);AJS.$(".loading-blanket",
this.container).removeClass("hidden");a.disableElement(AJS.$("input,select,textarea",this.container));this.disableInsert();this.handleInsertWaiting(!0)},endLoading:function(){var a=require("confluence/form-state-control");AJS.$(".loading-blanket",this.container).addClass("hidden");a.enableElement(AJS.$("input,select,textarea",this.container));AJS.$(".project-select",this.container).val()===this.DEFAULT_PROJECT_VALUE&&a.disableElement(AJS.$(".issuetype-select",this.container));this.setInsertButtonState();
this.handleInsertWaiting(!1)},bindEvent:function(){var a=this;AJS.$('.field-group [name\x3d"summary"]',this.jipForm.formEl).keyup(function(){a.setInsertButtonState()});this.container.on("focus","input[data-aui-dp-uuid]",function(){var b=AJS.$(this).attr("data-aui-dp-uuid");setTimeout(function(){AJS.$("[data-aui-dp-popup-uuid\x3d"+b+"]").parents(".aui-inline-dialog").addClass("datepicker-patch")},0)})},title:function(){return "Create New Issue"},init:function(a){var b=this;
a.html('\x3cdiv class\x3d"create-issue-container"\x3e\x3c/div\x3e');this.container=AJS.$("div.create-issue-container");this.selectedServer=AJS.Editor.JiraConnector.servers[0];this.jipForm=new (require("jira-integration-plugin/jira-create-issue-form"))({container:".create-issue-container",renderSummaryAndDescription:!0,onError:function(){AJS.$(".field-group .error",this.container).remove();b.formHasError=!0;b.disableInsert()},onServerChanged:function(){AJS.$(".field-group .error",this.container).remove();
b.setInsertButtonState();b.selectedServer=this.getCurrentServer()},onRequiredFieldsRendered:function(f,d){AJS.$(".field-group .error",this.container).remove();b.formHasError=!!d.length;b.setInsertButtonState()},ajax:AJS.$.ajax});a.onselect=function(){b.onselect()};this.bindEvent()},convertFormToJSON:function(a){const b=require("jira-integration-plugin/fields");if(!b)return AJS.logError("Jira integration plugin is missing!"),"";var f={issues:[]},d={};d.fields={project:{id:AJS.$(".project-select option:selected",
a).val()},issuetype:{id:AJS.$(".issuetype-select option:selected",a).val()},summary:AJS.$('.field-group [name\x3d"summary"]',a).val(),description:AJS.$('.field-group [name\x3d"description"]',a).val()};a.children(".create-issue-required-fields").children(".jira-field").children("input,select,textarea").not(".select2-input").each(function(c,e){c=AJS.$(e);d.fields[c.attr("name")]=b.getJSON(c)});a.children(".create-issue-required-fields").children("fieldset.jira-field").each(function(c,e){c=AJS.$(e);
d.fields[c.attr("name")]=b.getJSON(c)});f.issues.push(d);return JSON.stringify(f)},validateRequiredFieldInForm:function(a){var b=!0,f="placeholder"in document.createElement("input");a.find(".field-group .icon-required, .field-group .aui-icon-required").each(function(d,c){c=AJS.$(c).parent();d=c.text();var e=c.nextAll("input,select,textarea"),g=AJS.$.trim(e.val());if(!g||!f&&g==e.attr("placeholder"))b=!1,c=c.parent(),d=AJS.format("{0} is required",d),c.append(aui.form.fieldError({message:d}))});
return b},clearFieldErrors:function(){AJS.$("form div.error",this.container).remove()},insertLink:function(){var a=this,b=Confluence.getContextPath()+"/rest/jira-integration/1.0/issues",f=AJS.$("div.create-issue-container form"),d=this.jipForm.getCurrentServer();a.clearFieldErrors();a.validateRequiredFieldInForm(f)&&(this.startLoading(),AJS.$.ajax({type:"POST",contentType:"application/json",url:b+"?applicationId\x3d"+this.selectedServer.id,data:this.convertFormToJSON(f),success:function(c){var e=
c&&c.issues&&c.issues[0]&&c.issues[0].issue&&c.issues[0].issue.key;e?(a.insertIssueLink(e,d.displayUrl+"/browse/"+e),a.resetIssue()):(_.isEmpty(c.errors[0].elementErrors.errorMessages)||(e=Confluence.Templates.ConfluenceJiraPlugin.renderCreateErrorPanel({errors:c.errors[0].elementErrors.errorMessages,serverUrl:d.displayUrl}),a.errorMsg(AJS.$("div.create-issue-container"),e)),_.each(c.errors[0].elementErrors.errors,function(g,h){g=aui.form.fieldError({message:g});AJS.$(AJS.format(".field-group [name\x3d{0}]",
h),f).after(g)}));a.endLoading()},error:function(c,e){a.ajaxAuthCheck(c)}}))},onselect:function(){var a=!!AJS.$(".aui-message \x3e .oauth-init",this.container).length;this.selectedServer&&!this.selectedServer.authUrl&&a?this.jipForm.defaultFields.server.trigger("change"):this.setInsertButtonState()},analyticPanelActionName:"confluence.jira.plugin.issuecreated"});AJS.Editor.JiraConnector.Panels.push(new AJS.Editor.JiraConnector.Panel.Create);
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.extra.jira:dialogsJs', location = '/jira/recentlyviewedpanel.js' */
AJS.Editor.JiraConnector.Panel.Recent=function(){};AJS.Editor.JiraConnector.Panel.Recent.prototype=AJS.$.extend(AJS.Editor.JiraConnector.Panel.Recent.prototype,AJS.Editor.JiraConnector.Panel.prototype);
AJS.Editor.JiraConnector.Panel.Recent.prototype=AJS.$.extend(AJS.Editor.JiraConnector.Panel.Recent.prototype,{title:function(){return "Recently Viewed"},init:function(d){var a=AJS.Editor.JiraConnector.servers;d.html('\x3cdiv id\x3d"my-recent-issues" '+(1<a.length?'class\x3d"multi-server" ':"")+"\x3e\x3c/div\x3e");var b=this;this.selectedServer=a[0];1<a.length&&(a=AJS.$('\x3cdiv class\x3d"jira-server-select"\x3e\x3cform action\x3d"#" method\x3d"post" class\x3d"aui"\x3e\x3cdiv class\x3d"field-group"\x3e\x3clabel\x3eServer\x3c/label\x3e\x3cselect class\x3d"select" \x3e\x3c/select\x3e\x3c/div\x3e\x3c/form\x3e\x3c/div\x3e').appendTo("div#my-recent-issues"),
this.applinkServerSelect(AJS.$(".select",a),function(e){b.selectedServer=e;b.onselect()}));d.onselect=function(){b.onselect()}},insertLink:function(){this.insertSelected()},onselect:function(){var d=require("confluence/form-state-control"),a=this,b=AJS.$("div#my-recent-issues");this.container=b;var e=function(){b.children().not(".jira-server-select").remove()},g=function(){if(a.selectedServer.authUrl){e();var c=a.createOauthForm(function(){f()});b.append(c)}else f()};var f=function(){if(!a.currentXhr||
4==a.currentXhr.readyState){var c=AJS.$(".select",b);d.disableElement(c);e();a.createIssueTableFromUrl(b,a.selectedServer.id,"/sr/jira.issueviews:searchrequest-xml/temp/SearchRequest.xml?jqlQuery\x3dkey+in+issueHistory()+ORDER+BY+lastViewed+DESC\x26field\x3dsummary\x26field\x3dtype\x26field\x3dlink\x26tempMax\x3d50\x26returnMax\x3dtrue",a.setSelectedIssue,a.insertLink,a.disableInsert,function(){c.length&&c.focus()},function(h){AJS.$("div.data-table",b).remove();a.ajaxError(h,g)},!1)}};g()},analyticPanelActionName:"confluence.jira.plugin.recentlyviewadded"});
AJS.Editor.JiraConnector.Panels.push(new AJS.Editor.JiraConnector.Panel.Recent);
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.extra.jira:dialogsJs', location = 'templates/soy/dialog.soy' */
// This file was automatically generated from dialog.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Confluence.Templates.ConfluenceJiraPlugin.
 */

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Templates == 'undefined') { Confluence.Templates = {}; }
if (typeof Confluence.Templates.ConfluenceJiraPlugin == 'undefined') { Confluence.Templates.ConfluenceJiraPlugin = {}; }


Confluence.Templates.ConfluenceJiraPlugin.displayOptsHtml = function(opt_data, opt_ignored) {
  return '<div class=\'jql-display-opts-bar data-table\'><a href="javascript:void(0)" class=\'jql-display-opts-open\' data-title="' + soy.$$escapeHtml('Display options panel is not available without a selection.') + '"><span></span><strong>' + soy.$$escapeHtml('Display options') + '</strong></a></div>';
};
if (goog.DEBUG) {
  Confluence.Templates.ConfluenceJiraPlugin.displayOptsHtml.soyTemplateName = 'Confluence.Templates.ConfluenceJiraPlugin.displayOptsHtml';
}


Confluence.Templates.ConfluenceJiraPlugin.displayOptsOverlayHtml = function(opt_data, opt_ignored) {
  return '<div class=\'jql-display-opts-overlay data-table\' data-js="display-option-wrapper"><form id="jiraMacroDlg" class="aui" action="#"><div class=\'jql-display-opts-inner\'><a href="javascript:void(0)" class=\'jql-display-opts-open\' data-js="display-option-trigger" data-title="' + soy.$$escapeHtml('Display options panel is not available without a selection.') + '"><span></span><strong>' + soy.$$escapeHtml('Display options') + '</strong></a><fieldset class="group"><legend><span>' + soy.$$escapeHtml('Display as') + '</span></legend><div class="radio"><input type=\'radio\' class=\'radio\' name=\'insert-advanced\' id=\'opt-single\' value=\'insert-single\'><label for=\'opt-single\'>' + soy.$$escapeHtml('Single issue') + '</label><div class=\'description\'>' + soy.$$escapeHtml('Display the macro as a single issue.') + '</div></div><div class="radio"><input type=\'radio\' class=\'radio\' name=\'insert-advanced\' id=\'opt-total\' value=\'insert-count\'><label for=\'opt-total\'>' + soy.$$escapeHtml('Total issue count') + '</label><div class=\'description\'>' + soy.$$escapeHtml('Display total number of issues as a link. E.g.') + '<a class=\'total-issues-link\' target=\'_blank\' href=\'#\'><span class=\'total-issues-text\'>' + soy.$$escapeHtml(AJS.format('{0} issues',12)) + '</span></a></div></div><div class="radio"><input type=\'radio\' class=\'radio\' checked=\'checked\' name=\'insert-advanced\' id=\'opt-table\' value=\'insert-table\'><label for=\'opt-table\'>' + soy.$$escapeHtml('Table') + '</label><div class=\'description\'>' + soy.$$escapeHtml('Customize your columns below.') + '</div></div></fieldset><fieldset><div class="field-group"><label>' + soy.$$escapeHtml('Maximum issues') + '</label><input type="text" name="jira-maximum-issues" id="jira-maximum-issues" class="text short-field" /><div class="description">' + soy.$$escapeHtml('Leave empty to get all issues.') + '</div></div></fieldset><fieldset><div class="field-group"><label>' + soy.$$escapeHtml('Columns to display') + '</label><select id="jiraIssueColumnSelector" data-placeholder="' + soy.$$escapeHtml('Start typing to see possible columns') + '" multiple="true" class="select long-field"></select></div></fieldset></div></form></div>';
};
if (goog.DEBUG) {
  Confluence.Templates.ConfluenceJiraPlugin.displayOptsOverlayHtml.soyTemplateName = 'Confluence.Templates.ConfluenceJiraPlugin.displayOptsOverlayHtml';
}


Confluence.Templates.ConfluenceJiraPlugin.searchForm = function(opt_data, opt_ignored) {
  return '<div class=\'jira-search-form\'><form class=\'aui\'><fieldset class=\'inline\'>' + ((opt_data.isMultiServer == true) ? '<div class=\'search-input\'><input type=\'text\' class=\'text search-text\' name=\'jiraSearch\' placeholder="' + soy.$$escapeHtml('e.g. filter \x3d \x22My Jira filter\x22') + '"/></div>' : '<div class=\'search-input one-server\'><input type=\'text\' class=\'text one-server long-field\' name=\'jiraSearch\' placeholder="' + soy.$$escapeHtml('e.g. filter \x3d \x22My Jira filter\x22') + '"/></div>') + '<button type=\'button\' title="' + soy.$$escapeHtml('Search') + '" class=\'button\'><span class="aui-icon aui-icon-small aui-iconfont-search"></span></button></fieldset><div class=\'search-help\'>' + soy.$$escapeHtml('Search using any issue key, search URL, Jira link, JQL, plain text or filter') + '</div></form></div>';
};
if (goog.DEBUG) {
  Confluence.Templates.ConfluenceJiraPlugin.searchForm.soyTemplateName = 'Confluence.Templates.ConfluenceJiraPlugin.searchForm';
}


Confluence.Templates.ConfluenceJiraPlugin.warningDialog = function(opt_data, opt_ignored) {
  return '<div class=\'warning-body\'><p>' + soy.$$escapeHtml('If you connect Confluence to Jira you can easily link issues...') + '</p>' + ((opt_data.isAdministrator == false) ? '<p>' + soy.$$escapeHtml('Your administrator can set this up.') + '</p>' : '') + '</div>';
};
if (goog.DEBUG) {
  Confluence.Templates.ConfluenceJiraPlugin.warningDialog.soyTemplateName = 'Confluence.Templates.ConfluenceJiraPlugin.warningDialog';
}


Confluence.Templates.ConfluenceJiraPlugin.issueCheckbox = function(opt_data, opt_ignored) {
  return '<input type=\'checkbox\' name=\'jira-issue\' value=\'' + soy.$$escapeHtml(opt_data.issueKey) + '\' checked/>';
};
if (goog.DEBUG) {
  Confluence.Templates.ConfluenceJiraPlugin.issueCheckbox.soyTemplateName = 'Confluence.Templates.ConfluenceJiraPlugin.issueCheckbox';
}


Confluence.Templates.ConfluenceJiraPlugin.issueKey = function(opt_data, opt_ignored) {
  return '<span><img class="icon" src="' + soy.$$escapeHtml(opt_data.issueIconUrl) + '"/> ' + soy.$$escapeHtml(opt_data.issueKey) + '</span>';
};
if (goog.DEBUG) {
  Confluence.Templates.ConfluenceJiraPlugin.issueKey.soyTemplateName = 'Confluence.Templates.ConfluenceJiraPlugin.issueKey';
}


Confluence.Templates.ConfluenceJiraPlugin.showMessageNoServer = function(opt_data, opt_ignored) {
  return '' + ((opt_data.isAdministrator == true) ? soy.$$escapeHtml('No server found match with your URL.') + '<a id="open_applinks" target="_blank" href="' + soy.$$escapeHtml(opt_data.contextPath) + '/admin/listapplicationlinks.action">' + soy.$$escapeHtml('Click here to set this up') + '</a>' : soy.$$escapeHtml('No server found match with your URL. Your administrator can set this up.') + '<a id="open_applinks" target="_blank" href="' + soy.$$escapeHtml(opt_data.contextPath) + '/wiki/contactadministrators.action">' + soy.$$escapeHtml('Click here to contact your admin') + '</a>');
};
if (goog.DEBUG) {
  Confluence.Templates.ConfluenceJiraPlugin.showMessageNoServer.soyTemplateName = 'Confluence.Templates.ConfluenceJiraPlugin.showMessageNoServer';
}


Confluence.Templates.ConfluenceJiraPlugin.viewAll = function(opt_data, opt_ignored) {
  return '<div class=\'view-all\'>' + soy.$$escapeHtml('Displaying first 20 results.') + '<a href=\'' + soy.$$escapeHtml(opt_data.jiraIssuesLink) + '\' target=\'_blank\'>' + soy.$$escapeHtml('View all.') + '</a></div>';
};
if (goog.DEBUG) {
  Confluence.Templates.ConfluenceJiraPlugin.viewAll.soyTemplateName = 'Confluence.Templates.ConfluenceJiraPlugin.viewAll';
}


Confluence.Templates.ConfluenceJiraPlugin.learnMore = function(opt_data, opt_ignored) {
  return '<a href="' + soy.$$escapeHtml('https://confluence.atlassian.com/display/DOC/Jira+Issues+Macro') + '" target=\'_blank\'>' + soy.$$escapeHtml('Learn More') + '</a>';
};
if (goog.DEBUG) {
  Confluence.Templates.ConfluenceJiraPlugin.learnMore.soyTemplateName = 'Confluence.Templates.ConfluenceJiraPlugin.learnMore';
}


Confluence.Templates.ConfluenceJiraPlugin.contentJiraChart = function(opt_data, opt_ignored) {
  return '<div id="jira-chart-content-' + soy.$$escapeHtml(opt_data.chartType) + '"><div class=\'jira-chart-search\'><form class=\'aui\'><fieldset class=\'inline\'>' + ((opt_data.isMultiServer == true) ? '<div class=\'jira-chart-search-input\'><input type=\'text\' id="jira-chart-search-input" class=\'text search-text\' name=\'jiraSearch\' placeholder="' + soy.$$escapeHtml('e.g. filter \x3d \x22My Jira filter\x22') + '"/></div><select id="jira-chart-servers" class="select" name="server" tabindex="0"></select>' : '<div class=\'jira-chart-search-input one-server\'><input type=\'text\' id="jira-chart-search-input" class=\'text one-server long-field\' name=\'jiraSearch\' placeholder="' + soy.$$escapeHtml('e.g. filter \x3d \x22My Jira filter\x22') + '"/></div>') + '<button id="jira-chart-search-button" type=\'button\' class=\'button\'>' + soy.$$escapeHtml('Preview') + '</button></fieldset><div class=\'search-help\'>' + soy.$$escapeHtml('Search using any issue key, search URL, Jira link, JQL, plain text or filter') + '</div></form></div><div class="jira-chart-img"></div><div class="jira-chart-option" data-js="display-option-wrapper" ><form action="#" class="aui" id="jiraChartMacroOption"><div class="jiraChartOption"><a class="jirachart-display-opts-open" data-js="display-option-trigger" href="javascript:void(0)"><span class="display-option-icon"></span><strong>' + soy.$$escapeHtml('Display options') + '</strong></a>' + ((opt_data.chartType == 'pie') ? Confluence.Templates.ConfluenceJiraPlugin.piechartForm(null) : (opt_data.chartType == 'createdvsresolved') ? Confluence.Templates.ConfluenceJiraPlugin.createdVsResolved(null) : (opt_data.chartType == 'twodimensional') ? Confluence.Templates.ConfluenceJiraPlugin.twoDimensional(null) : '') + '</div></form></div></div>';
};
if (goog.DEBUG) {
  Confluence.Templates.ConfluenceJiraPlugin.contentJiraChart.soyTemplateName = 'Confluence.Templates.ConfluenceJiraPlugin.contentJiraChart';
}


Confluence.Templates.ConfluenceJiraPlugin.piechartForm = function(opt_data, opt_ignored) {
  return '<fieldset><div class="field-group"><label for="jira-chart-statType">' + soy.$$escapeHtml('Chart by') + '</label><select name="type" id="jira-chart-statType" class="select"></select></div></fieldset><fieldset class="group"><div class="field-group"><label for="jira-chart-width">' + soy.$$escapeHtml('Width') + '</label><input type="text" name="jira-chart-width" id="jira-chart-width" class="text short-field"><span class="aui-icon aui-icon-small aui-iconfont-help help-aligment widthInfo" title="' + soy.$$escapeHtml('Enter pixels, percent or leave blank to auto-resize.') + '"></span><div class="checkbox"><input type="checkbox" id="jira-pie-chart-show-border" class="checkbox jira-chart-show-border"><label for="jira-pie-chart-show-border">' + soy.$$escapeHtml('Show border') + '</label></div><div class="checkbox"><input type="checkbox" id="jira-pie-chart-show-infor" class="checkbox jira-chart-show-infor"><label for="jira-pie-chart-show-infor">' + soy.$$escapeHtml('Show chart information') + '</label></div></div></fieldset>';
};
if (goog.DEBUG) {
  Confluence.Templates.ConfluenceJiraPlugin.piechartForm.soyTemplateName = 'Confluence.Templates.ConfluenceJiraPlugin.piechartForm';
}


Confluence.Templates.ConfluenceJiraPlugin.createdVsResolved = function(opt_data, opt_ignored) {
  return '<fieldset><div class="field-group"><label for="created-vs-resolved-chart-periodName">' + soy.$$escapeHtml('Period') + '</label><select class="select" id="created-vs-resolved-chart-periodName" name="created-vs-resolved-chart-periodName"><option value="hourly">' + soy.$$escapeHtml('Hourly') + '</option><option value="daily">' + soy.$$escapeHtml('Daily') + '</option><option value="weekly">' + soy.$$escapeHtml('Weekly') + '</option><option value="monthly">' + soy.$$escapeHtml('Monthly') + '</option><option value="quarterly">' + soy.$$escapeHtml('Quarterly') + '</option><option value="yearly">' + soy.$$escapeHtml('Yearly') + '</option></select><div class="error"></div></div><div class="field-group"><label for="created-vs-resolved-chart-daysprevious">' + soy.$$escapeHtml('Days previously') + '<span class="aui-icon icon-required"></span></label><input type="text" class="text" id="created-vs-resolved-chart-daysprevious" value="30"><span class="aui-icon aui-icon-small aui-iconfont-help help-aligment daysPreviousInfo" title="' + soy.$$escapeHtml('Number of days to include (counting back from today).') + '"></span><div class="error days-previous-error"></div></div><fieldset class="group"><div class="checkbox"><input type="checkbox" id="created-vs-resolved-chart-cumulative" name="created-vs-resolved-chart-cumulative" class="checkbox"><label for="created-vs-resolved-chart-cumulative">' + soy.$$escapeHtml('Cumulative totals') + '</label><span class="aui-icon aui-icon-small aui-iconfont-help help-aligment cumulativeInfo" title="' + soy.$$escapeHtml('Progressively add totals (1, 2, 3) or show individual values (1,1,1).') + '"></span></div><div class="checkbox"><input type="checkbox" id="created-vs-resolved-chart-showunresolvedtrend" name="created-vs-resolved-chart-showunresolvedtrend" class="checkbox"><label for="created-vs-resolved-chart-showunresolvedtrend">' + soy.$$escapeHtml('Show unresolved trend') + '</label><span class="aui-icon aui-icon-small aui-iconfont-help help-aligment showunresolvedtrendInfo" title="' + soy.$$escapeHtml('Include a subplot showing unresolved issues.') + '"></span></div></fieldset><div class="field-group"><label for="created-vs-resolved-chart-versionLabel">' + soy.$$escapeHtml('Show versions') + '</label><select class="select" id="created-vs-resolved-chart-versionLabel" name="created-vs-resolved-chart-versionLabel"><option value="all">' + soy.$$escapeHtml('All versions') + '</option><option value="major">' + soy.$$escapeHtml('Only major versions') + '</option><option value="none">' + soy.$$escapeHtml('None') + '</option></select><span class="aui-icon aui-icon-small aui-iconfont-help help-aligment versionLabelInfo" title="' + soy.$$escapeHtml('Mark version release dates in the chart.') + '"></span><div class="error"></div></div></fieldset><fieldset class="group"><div class="field-group"><label for="jira-chart-width">' + soy.$$escapeHtml('Width') + '</label><input type="text" name="jira-chart-width" id="jira-chart-width" class="text short-field"><span class="aui-icon aui-icon-small aui-iconfont-help help-aligment widthInfo" title="' + soy.$$escapeHtml('Enter pixels, percent or leave blank to auto-resize.') + '"></span><div class="checkbox"><input type="checkbox" id="jira-createdvsresolved-chart-show-border" class="checkbox jira-chart-show-border"><label for="jira-createdvsresolved-chart-show-border">' + soy.$$escapeHtml('Show border') + '</label></div><div class="checkbox"><input type="checkbox" id="jira-createdvsresolved-chart-show-infor" class="checkbox jira-chart-show-infor"><label for="jira-createdvsresolved-chart-show-infor">' + soy.$$escapeHtml('Show chart information') + '</label></div></div></fieldset>';
};
if (goog.DEBUG) {
  Confluence.Templates.ConfluenceJiraPlugin.createdVsResolved.soyTemplateName = 'Confluence.Templates.ConfluenceJiraPlugin.createdVsResolved';
}


Confluence.Templates.ConfluenceJiraPlugin.twoDimensional = function(opt_data, opt_ignored) {
  return '<fieldset><div id="jira-chart-support-all-version" class="hidden"></div><div class="field-group"><label for="twodimensional-xaxis">' + soy.$$escapeHtml('XAxis') + '</label><select class="select" id="twodimensional-xaxis"><option value="statuses">' + soy.$$escapeHtml('Status') + '</option><option value="priorities">' + soy.$$escapeHtml('Priority') + '</option><option value="assignees">' + soy.$$escapeHtml('Assignee') + '</option><option value="allFixfor">' + soy.$$escapeHtml('Fix For Versions (all)') + '</option><option value="components">' + soy.$$escapeHtml('Component') + '</option><option value="issuetype">' + soy.$$escapeHtml('Issue Type') + '</option></select></div><div class="field-group"><label for="twodimensional-yaxis">' + soy.$$escapeHtml('YAxis') + '</label><select class="select" id="twodimensional-yaxis"><option value="statuses">' + soy.$$escapeHtml('Status') + '</option><option value="priorities">' + soy.$$escapeHtml('Priority') + '</option><option value="assignees">' + soy.$$escapeHtml('Assignee') + '</option><option value="allFixfor">' + soy.$$escapeHtml('Fix For Versions (all)') + '</option><option value="components">' + soy.$$escapeHtml('Component') + '</option><option value="issuetype">' + soy.$$escapeHtml('Issue Type') + '</option></select></div><div class="field-group"><label for="twodimensional-number-of-result">' + soy.$$escapeHtml('Rows to display') + '</label><input type="text" name="twodimensional-number-of-result" id="twodimensional-number-of-result" class="text short-field"><div class="error twodimensional-number-of-result-error"></div></div></fieldset>';
};
if (goog.DEBUG) {
  Confluence.Templates.ConfluenceJiraPlugin.twoDimensional.soyTemplateName = 'Confluence.Templates.ConfluenceJiraPlugin.twoDimensional';
}


Confluence.Templates.ConfluenceJiraPlugin.jiraChartErrorMessage = function(opt_data, opt_ignored) {
  return '<div class="aui-message-container"><div class="aui-message error closeable shadowed"><span class=\'message\'>' + soy.$$escapeHtml(opt_data.message) + '</span><span class="aui-icon icon-close" role="button" tabindex="0"></span></div></div>';
};
if (goog.DEBUG) {
  Confluence.Templates.ConfluenceJiraPlugin.jiraChartErrorMessage.soyTemplateName = 'Confluence.Templates.ConfluenceJiraPlugin.jiraChartErrorMessage';
}


Confluence.Templates.ConfluenceJiraPlugin.noServerWarning = function(opt_data, opt_ignored) {
  return '<div class="aui-message-container"><div class="aui-message warning">' + ((opt_data.isAdministrator == true) ? soy.$$escapeHtml('No server found match with your URL.') + '<a id="open_applinks" target="_blank" href="' + soy.$$escapeHtml(opt_data.contextPath) + '/admin/listapplicationlinks.action">' + soy.$$escapeHtml('Click here to set this up') + '</a>' : soy.$$escapeHtml('No server found match with your URL. Your administrator can set this up.') + '<a id="open_applinks" target="_blank" href="' + soy.$$escapeHtml(opt_data.contextPath) + '/wiki/contactadministrators.action">' + soy.$$escapeHtml('Click here to contact your admin') + '</a>') + '</div></div>';
};
if (goog.DEBUG) {
  Confluence.Templates.ConfluenceJiraPlugin.noServerWarning.soyTemplateName = 'Confluence.Templates.ConfluenceJiraPlugin.noServerWarning';
}


Confluence.Templates.ConfluenceJiraPlugin.addMoreToComeLink = function(opt_data, opt_ignored) {
  return '<li class="page-menu-item"><button class="item-button moreToCome"><a target="_blank" href="http://go.atlassian.com/confluencejiracharts">' + soy.$$escapeHtml('More to come...') + '</a></button></li>';
};
if (goog.DEBUG) {
  Confluence.Templates.ConfluenceJiraPlugin.addMoreToComeLink.soyTemplateName = 'Confluence.Templates.ConfluenceJiraPlugin.addMoreToComeLink';
}


Confluence.Templates.ConfluenceJiraPlugin.addCrossMacroLink = function(opt_data, opt_ignored) {
  return '<li class="page-menu-item"><hr><span class="aui-nav-heading jira-padding-left-10px"><strong>' + soy.$$escapeHtml('OTHER Jira CONTENT') + '</strong></span><nav class="aui-navgroup aui-navgroup-vertical"><div class="aui-navgroup-inner"><ul class="aui-nav"><li><button class="item-button jira-left-panel-link" id="' + soy.$$escapeHtml(opt_data.id) + '">' + soy.$$escapeHtml(opt_data.label) + '</button></li></ul></div></nav></li>';
};
if (goog.DEBUG) {
  Confluence.Templates.ConfluenceJiraPlugin.addCrossMacroLink.soyTemplateName = 'Confluence.Templates.ConfluenceJiraPlugin.addCrossMacroLink';
}


Confluence.Templates.ConfluenceJiraPlugin.jqlInvalid = function(opt_data, opt_ignored) {
  return '<div class="aui-message-container"><div class="aui-message warning">' + soy.$$escapeHtml('The Jira server didn\x27t understand your search query. If you entered JQL, please ensure that it\x27s correctly formed. If you entered an issue key, ensure that it exists and you have permission to view it.') + '</div></div>';
};
if (goog.DEBUG) {
  Confluence.Templates.ConfluenceJiraPlugin.jqlInvalid.soyTemplateName = 'Confluence.Templates.ConfluenceJiraPlugin.jqlInvalid';
}


Confluence.Templates.ConfluenceJiraPlugin.warningValWidthColumn = function(opt_data, opt_ignored) {
  return '<div class="error width-error">' + ((opt_data.error == 'wrongFormat') ? soy.$$escapeHtml('The width must be in correct format') : (opt_data.error == 'wrongNumber') ? soy.$$escapeHtml('The width must be a number between 100 and 9000') : '') + '</div>';
};
if (goog.DEBUG) {
  Confluence.Templates.ConfluenceJiraPlugin.warningValWidthColumn.soyTemplateName = 'Confluence.Templates.ConfluenceJiraPlugin.warningValWidthColumn';
}


Confluence.Templates.ConfluenceJiraPlugin.warningValMaxiumIssues = function(opt_data, opt_ignored) {
  return '<div id="jira-max-number-error" class="error">' + soy.$$escapeHtml('Must be a number between 1 and 1000.') + '</div>';
};
if (goog.DEBUG) {
  Confluence.Templates.ConfluenceJiraPlugin.warningValMaxiumIssues.soyTemplateName = 'Confluence.Templates.ConfluenceJiraPlugin.warningValMaxiumIssues';
}


Confluence.Templates.ConfluenceJiraPlugin.showJiraUnsupportedVersion = function(opt_data, opt_ignored) {
  return '<div class="jira-unsupported-version aui-message-container"><div class="aui-message warning">' + soy.$$escapeHtml('Jira Charts are not available for your version of Jira. Upgrade to Jira 6.1.1 or later to use this macro.') + '</div></div>';
};
if (goog.DEBUG) {
  Confluence.Templates.ConfluenceJiraPlugin.showJiraUnsupportedVersion.soyTemplateName = 'Confluence.Templates.ConfluenceJiraPlugin.showJiraUnsupportedVersion';
}

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.extra.jira:dialogsJs', location = 'templates/soy/create_issues.soy' */
// This file was automatically generated from create_issues.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Confluence.Templates.ConfluenceJiraPlugin.
 */

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Templates == 'undefined') { Confluence.Templates = {}; }
if (typeof Confluence.Templates.ConfluenceJiraPlugin == 'undefined') { Confluence.Templates.ConfluenceJiraPlugin = {}; }


Confluence.Templates.ConfluenceJiraPlugin.createIssuesForm = function(opt_data, opt_ignored) {
  return '<form action="#" method="post" class="aui" id="create-issues-form"><div class="loading-blanket hidden"><div class="loading-data"></div></div><div class="field-group servers"><label>' + soy.$$escapeHtml('Server') + '</label><select class="select server-select"></select></div><div class="field-group project-select-parent" ><label>' + soy.$$escapeHtml('Project') + '</label><select class="select project-select" name="pid"></select></div><div class="field-group type-select-parent issues-type-group" ><label>' + soy.$$escapeHtml('Issue Type') + '</label><select class="select type-select" name="issuetype"></select></div><div class="field-group"><label>' + soy.$$escapeHtml('Summary') + '<span class="aui-icon icon-required"></span></label><input class="text issue-summary" type="text" name="summary"/></div><div id="jira-required-fields-panel"></div><div class="field-group"><label>' + soy.$$escapeHtml('Description') + '</label><textarea class="issue-description textarea" rows="5" name="description"></textarea></div></form>';
};
if (goog.DEBUG) {
  Confluence.Templates.ConfluenceJiraPlugin.createIssuesForm.soyTemplateName = 'Confluence.Templates.ConfluenceJiraPlugin.createIssuesForm';
}


Confluence.Templates.ConfluenceJiraPlugin.renderOptions = function(opt_data, opt_ignored) {
  var output = '';
  var optionList15 = opt_data.options;
  var optionListLen15 = optionList15.length;
  for (var optionIndex15 = 0; optionIndex15 < optionListLen15; optionIndex15++) {
    var optionData15 = optionList15[optionIndex15];
    output += '<option value="' + soy.$$escapeHtml(optionData15.id) + '">' + soy.$$escapeHtml(optionData15.name) + '</option>';
  }
  return output;
};
if (goog.DEBUG) {
  Confluence.Templates.ConfluenceJiraPlugin.renderOptions.soyTemplateName = 'Confluence.Templates.ConfluenceJiraPlugin.renderOptions';
}


Confluence.Templates.ConfluenceJiraPlugin.renderOption = function(opt_data, opt_ignored) {
  return '<option value="' + soy.$$escapeHtml(opt_data.option.id) + '" data-jira-option-key="' + soy.$$escapeHtml(opt_data.option.key) + '">' + soy.$$escapeHtml(opt_data.option.name) + '</option>';
};
if (goog.DEBUG) {
  Confluence.Templates.ConfluenceJiraPlugin.renderOption.soyTemplateName = 'Confluence.Templates.ConfluenceJiraPlugin.renderOption';
}


Confluence.Templates.ConfluenceJiraPlugin.renderCreateErrorPanel = function(opt_data, opt_ignored) {
  var output = '<div>' + soy.$$escapeHtml('There were errors creating an issue in') + '<a target="_blank" href=' + soy.$$escapeHtml(opt_data.serverUrl) + '>Jira</a></div><ul>';
  var errorList36 = opt_data.errors;
  var errorListLen36 = errorList36.length;
  for (var errorIndex36 = 0; errorIndex36 < errorListLen36; errorIndex36++) {
    var errorData36 = errorList36[errorIndex36];
    output += '<li>' + soy.$$escapeHtml(errorData36) + '</li>';
  }
  output += '</ul>';
  return output;
};
if (goog.DEBUG) {
  Confluence.Templates.ConfluenceJiraPlugin.renderCreateErrorPanel.soyTemplateName = 'Confluence.Templates.ConfluenceJiraPlugin.renderCreateErrorPanel';
}

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.extra.jira:text-placeholders-jira', location = '/jira/placeholder.js' */
(function(){AJS.bind("init.rte",function(){AJS.bind("editor.text-placeholder.activated",function(b,a){a&&"jira"===a.placeholderType&&AJS.Editor.JiraConnector.open(AJS.Editor.JiraConnector.source.instructionalText)});AJS.Rte.Placeholder&&AJS.Rte.Placeholder.addPlaceholderType&&AJS.Rte.Placeholder.addPlaceholderType({type:"jira",label:"Jira Macro",tooltip:"Instructional text is replaced with a Jira Macro on click.",activation:{click:!0,keypress:!1}})})})(AJS.$);
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.extra.jira:jirachart-macro', location = '/jirachart/jirachart-dialog.js' */
AJS.Editor.JiraChart=function(h){var l=require("confluence/form-state-control"),x="Insert",y="Cancel",z="Insert Jira Chart",c,d,u=function(a){if(!c){c=new AJS.ConfluenceDialog({width:840,height:590,id:"jira-chart"});c.addHeader(z);d=AJS.Editor.JiraChart.Panels;for(var b=0;b<d.length;b++){"function"===typeof d[b].title?c.addPanel(d[b].title()):void 0!==d[b].title&&c.addPanel(d[b].title);
var f=c.getCurrentPanel();d[b].init(f)}h("#jira-chart ul.dialog-page-menu").show().append(Confluence.Templates.ConfluenceJiraPlugin.addCrossMacroLink({id:"open-jira-issue-dialog",label:"Jira Issue/Filter"}));c.addButton(x,function(){var e=d[c.getCurrentPanel().id],g=e.chartType;0<c.getCurrentPanel().body.find("#jira-chart-content-"+g).length&&e.isImageChartExisted()?(e=e.getMacroParamsFromDialog(),t(e),AJS.Editor.JiraChart.close()):m(h("#jira-chart-content-"+e.chartType))},"insert-jira-chart-macro-button");
c.addLink("Select Macro",function(){c.hide();AJS.MacroBrowser.open(!1)},"dialog-back-link");c.addCancel(y,function(){AJS.Editor.JiraChart.close()})}AJS.$("#jira-chart .dialog-page-menu button").click(function(){var e=d[c.getCurrentPanel().id],g=c.getCurrentPanel().body,n=AJS.Editor.JiraChart.Helper.getSelectedServer(g);p(g,n);k(g);e.handleInsertButton();e.focusForm();e.resetDisplayOption()});b=c.getCurrentPanel().body;k(b);var q=q||function(e){var g={};_.each(e,
function(n,A){g[n.chartType]=A});return g}(d);B(q,a);r();b=c;f=b.gotoPanel;a=a&&a.params?q[a.params.chartType]:0;f.call(b,a);c.overrideLastTab();c.show();C()},D=function(){_.each(AJS.Editor.JiraChart.Panels,function(a){a.preBinding&&"function"===typeof a.preBinding&&a.preBinding()})},C=function(){h("#open-jira-issue-dialog").click(function(){AJS.Editor.JiraChart.close();AJS.Editor.JiraConnector&&AJS.Editor.JiraConnector.openCleanDialog(!1)})},m=function(a){void 0!==AJS.Editor.JiraChart.Helper.convertSearchTextToJQL(a)&&
d[c.getCurrentPanel().id].renderChart()},k=function(a){if(a.find("#jira-chart-support-all-version").length)return!0;var b=AJS.Editor.JiraChart.Helper.getSelectedServer(a).buildNumber;return-1==b||6109<=b&&6155>b?(a.find(".jira-chart-img").html(Confluence.Templates.ConfluenceJiraPlugin.showJiraUnsupportedVersion()),a.find("#jira-chart-search-input").attr("disabled","disabled"),a.find("#jira-chart-search-button").attr("disabled","disabled"),a=a.find(".jirachart-display-opts-close, .jirachart-display-opts-open"),
a.hasClass("jirachart-display-opts-close")&&a.click(),a.addClass("disabled"),r(),!1):!0},t=function(a){AJS.Editor.inRichTextMode()&&tinymce.confluence.macrobrowser.macroBrowserComplete({name:"jirachart",params:a})},B=function(a,b){for(var f=0;f<d.length;f++)d[f].resetDialogValue();D();b&&b.params&&d[a[b.params.chartType]].bindingDataFromMacroToForm(b.params)},v=function(a){a.find(".jira-oauth-message-marker").remove();a.find(".jira-chart-img").empty();a.find("#jira-chart-search-input").empty()},r=
function(){l.disableElement(h("#jira-chart").find(".insert-jira-chart-macro-button"))},p=function(a,b){h(".jira-oauth-message-marker",a).remove();var f={selectedServer:b,msg:AJS.Editor.JiraConnector.Panel.prototype.msg};b&&b.authUrl&&(b=AJS.Editor.JiraConnector.Panel.prototype.createOauthForm.call(f,function(){h(".jira-oauth-message-marker",a).remove();AJS.Editor.JiraChart.search(a)}),a.find("div.jira-chart-search").append(b))},w=function(a){a.find("#jira-chart-search-input").removeAttr("disabled");
a.find("#jira-chart-search-button").removeAttr("disabled");a.find(".jirachart-display-opts-open").removeClass("disabled")};return{close:function(){c.hide();tinymce.confluence.macrobrowser.macroBrowserCancel()},edit:function(a){if(void 0===AJS.Editor.JiraConnector.servers||0===AJS.Editor.JiraConnector.servers.length){AJS.Editor.JiraConnector.warningPopup(AJS.Meta.get("is-admin"));var b=!1}else b=!0;b&&(u(a),b=c.getCurrentPanel().body,k(b)&&(w(b),void 0!==a.params&&void 0!==a.params.serverId&&m(b),
a=AJS.Editor.JiraChart.Helper.getSelectedServer(b),p(b,a)))},search:m,disableInsert:r,enableInsert:function(){var a=AJS.$("#jira-chart").find(".insert-jira-chart-macro-button");a.is(":disabled")&&l.enableElement(a)},disableSearch:function(a){l.disableElement(a.find("#jira-chart-search-button"))},enableSearch:function(a){a.find("#jira-chart-search-button").is(":disabled")&&l.enableElement(a.find("#jira-chart-search-button"))},insertJiraChartMacroWithParams:t,open:u,clearChartContent:v,loadServers:function(a){0<
AJS.Editor.JiraConnector.servers.length&&AJS.Editor.JiraConnector.Panel.prototype.applinkServerSelect(a.find("#jira-chart-servers"),function(b){v(a);k(a)&&(p(a,b),w(a))})},validateServerSupportedChart:k}}(AJS.$);AJS.Editor.JiraChart.Panels=[];AJS.MacroBrowser.setMacroJsOverride("jirachart",{opener:AJS.Editor.JiraChart.edit});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.extra.jira:jirachart-macro', location = '/jirachart/jirachart-helper.js' */
AJS.Editor.JiraChart.Helper=function(p){var m=/^\d+$/,f={},g=function(a){a=a&&"string"===typeof a?a.replace("px",""):"";"auto"===a&&(a="");0<a.indexOf("%")&&(a=4*a.replace("%",""));return a},k=function(a){return m.test(a)},h=function(a){var b=AJS.Editor.JiraConnector.servers;return 1<b.length?a.find("#jira-chart-servers option:selected").data("jiraapplink"):b[0]};return{getSelectedServer:h,bindingCommonChartElements:function(a){return{jql:a.find("#jira-chart-search-input"),width:a.find("#jira-chart-width"),
border:a.find(".jira-chart-show-border"),showinfor:a.find(".jira-chart-show-infor"),displayOption:a.find(".jirachart-display-opts-close, .jirachart-display-opts-open"),server:a.find("#jira-chart-servers")}},bindingCommonDataFromMacroToForm:function(a,b){a.jql.val(decodeURIComponent(b.jql));a.width.val(b.width);a.border.attr("checked","true"===b.border);a.showinfor.attr("checked","true"===b.showinfor);1<AJS.Editor.JiraConnector.servers.length&&a.server.val(b.serverId)},getCommonMacroParamsFromDialog:function(a,
b){b=h(b);return{jql:encodeURIComponent(a.jql.val()),width:g(a.width.val()),border:a.border.prop("checked"),showinfor:a.showinfor.prop("checked"),serverId:b.id,server:b.name,isAuthenticated:!b.authUrl}},getCommonChartParamsRequest:function(a,b){return{contentId:AJS.Meta.get("page-id"),macro:{name:"jirachart",params:{jql:a.jql,serverId:a.serverId,width:a.width,border:a.border,showinfor:a.showinfor,chartType:b}}}},convertSearchTextToJQL:function(a){var b=AJS.Editor.JiraConnector.servers,c=a.find("#jira-chart-search-input").val();
if(0===c.indexOf("http")){var e=AJS.JQLHelper.findServerIndexFromUrl(c,b);if(-1!==e)e=b[e].id,a.find("#jira-chart-servers").val(e);else{b=Confluence.Templates.ConfluenceJiraPlugin.noServerWarning({isAdministrator:AJS.Meta.get("is-admin"),contextPath:Confluence.getContextPath()});a.find(".jira-chart-img").html(b);AJS.Editor.JiraChart.disableInsert();return}}(b=AJS.JQLHelper.convertToJQL(c,e))?a.find("#jira-chart-search-input").val(b):(a.find(".jira-chart-img").html(Confluence.Templates.ConfluenceJiraPlugin.jqlInvalid()),
AJS.Editor.JiraChart.disableInsert());return b},convertFormatWidth:g,isChartWidthValid:function(a){a.next().next(".width-error").remove();var b=g(a.val());if(b)if(k(b)){if(100>b||9E3<b)var c="wrongNumber"}else c="wrongFormat";return c?(a.next().after(Confluence.Templates.ConfluenceJiraPlugin.warningValWidthColumn({error:c})),AJS.Editor.JiraChart.disableInsert(),!1):!0},isNumber:k,isJqlNotEmpty:function(a){return a?""!==AJS.$.trim(a.val())&&a.val()!==a.attr("placeholder"):!1},populateStatType:function(a,
b){var c=h(a);if(b){var e=f[c.id];e||AppLinks.makeRequest({appId:c.id,type:"GET",url:"/rest/gadget/1.0/statTypes",dataType:"json",async:!1,success:function(d){d&&(e=f[c.id]=d)},error:function(d){if(d)try{f[c.id]=JSON.parse(d.responseText),e=JSON.parse(d.responseText)}catch(n){AJS.error("Error contacting the server "+c.id+" with response "+d.response)}AJS.log("Jira Chart Macro: unable to retrieve statTypes from AppLink: "+c.id)}}).fail(function(d){if(d)try{f[c.id]=JSON.parse(d.responseText),e=JSON.parse(d.responseText)}catch(n){AJS.error("Error contacting the server "+
c.id+" with response "+d.response)}});var l="";e&&"undefined"!==typeof e.stats&&_.each(e.stats,function(d){l+="\x3coption value \x3d '"+d.value+"'\x3e"+AJS.escapeHtml(d.label)+" \x3c/option\x3e"});b.html(l)}}}}(AJS.$);
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.extra.jira:jirachart-macro', location = '/jirachart/jirachart-panel.js' */
AJS.Editor.JiraChart.Panel=function(){};
AJS.Editor.JiraChart.Panel.prototype={init:function(a){var d=Confluence.Templates.ConfluenceJiraPlugin.contentJiraChart({isMultiServer:1<AJS.Editor.JiraConnector.servers.length,chartType:this.chartType});a.html(d);this.container=AJS.$(this.containerId);AJS.Editor.JiraChart.clearChartContent(this.container);AJS.Editor.JiraChart.loadServers(this.container);this.bindingChartElements();this.bindingActions()},bindingActions:function(){var a=this,d=function(){a.isFormValid()?AJS.Editor.JiraChart.search(a.container):
AJS.Editor.JiraChart.disableInsert()};a.container.find(a.clickableElements).click(d);a.container.find(a.onChangeElements).change(d);a.chartElements.jql.change(function(){this.value!==a.jqlWhenEnterKeyPress&&(a.container.find(".jira-chart-img").empty(),AJS.Editor.JiraChart.disableInsert());a.jqlWhenEnterKeyPress=""}).bind("paste",function(){setTimeout(function(){a.isFormValid()&&(a.jqlWhenEnterKeyPress=a.chartElements.jql.val(),AJS.Editor.JiraChart.search(a.container))},100)});var c=a.container.find("input[type\x3d'text']");
c.unbind("keydown").keydown(function(b){if(13==b.which){var f=function(e){c.unbind("keyup",f);a.isFormValid()&&AJS.Editor.JiraChart.search(a.container);"jira-chart-search-input"===c.attr("id")&&(a.jqlWhenEnterKeyPress=c.val());e.stopPropagation();return!1};c.keyup(f);b.stopPropagation();return!1}});a.bindSelectOption();a.bindingServerChange()},bindingServerChange:function(){var a=this;a.chartElements.server.change(function(){a.isFormValid()&&AJS.Editor.JiraChart.validateServerSupportedChart(a.container)?
AJS.Editor.JiraChart.search(a.container):AJS.Editor.JiraChart.disableInsert()})},renderChart:function(){var a=this,d=this.getChartParamsRequest(),c=Confluence.getContextPath()+"/rest/tinymce/1/macro/preview",b=this.container.find(".jira-chart-img");b.html('\x3cdiv class\x3d"loading-data"\x3e\x3c/div\x3e');var f=b.find(".loading-data")[0];AJS.$.data(f,"spinner",Raphael.spinner(f,50,"#666"));a.request&&a.request.abort();a.request=AJS.$.ajax({url:c,type:"POST",contentType:"application/json",data:JSON.stringify(d)}).done(function(e){b.html("").hide();
var g=AJS.$('\x3ciframe frameborder\x3d"0" id\x3d"chart-preview-iframe"\x3e\x3c/iframe\x3e');g.appendTo(b);var k=g[0].contentWindow,h=k.document;g.on("load",function(){k.AJS.$("#main").addClass("chart-preview-main");b.show();a.handleInsertButton()});e=e.replace("window.onload","var chartTest");h.open();h.write(e);h.close()}).error(function(e){"abort"!=e.statusText&&(AJS.log("Jira Chart Macro - Fail to get data from macro preview"),b.html(Confluence.Templates.ConfluenceJiraPlugin.jiraChartErrorMessage({message:"Unable to render Jira chart macro due to an execution error."})));
AJS.Editor.JiraChart.disableInsert()})},resetDialogValue:function(){var a=AJS.$("input",this.container);a.filter(":text").val("");a.filter(":checked").removeAttr("checked");this.container.find("#jira-chart-search-input").val();this.container.find(".jira-chart-img").empty();this.resetDisplayOption()},resetDisplayOption:function(){var a=this,d=this.chartElements.displayOption;d.addClass("jirachart-display-opts-open");d.removeClass("jirachart-display-opts-close");setTimeout(function(){var c=a.container.find(".jira-chart-option");
c.scrollTop(0);c.css({overflow:"hidden",top:"430px"})},0)},bindSelectOption:function(){var a=this.container.find(".jira-chart-option"),d=function(c){var b=a.position().top+"px",f="",e={top:430};c?(b="",f=40-a.find("#jiraChartMacroOption").height()+"px",e={bottom:0},a.css("overflow","auto")):a.css("overflow","hidden");a.css("top",b);a.css("bottom",f);a.animate(e,500)};a.css("top","430px");this.chartElements.displayOption.click(function(c){var b=AJS.$(this);c.preventDefault();b.hasClass("disabled")||
(b.hasClass("jirachart-display-opts-open")?(d(!0),b.addClass("jirachart-display-opts-close"),b.removeClass("jirachart-display-opts-open")):(d(),b.removeClass("jirachart-display-opts-close"),b.addClass("jirachart-display-opts-open")))})},isImageChartExisted:function(){return 0<this.container.find("#chart-preview-iframe").contents().find(".jira-chart-macro-img").length},focusForm:function(){this.container.find("#jira-chart-search-input").focus()},handleInsertButton:function(){this.isFormValid()&&this.isResultValid()?
AJS.Editor.JiraChart.enableInsert():AJS.Editor.JiraChart.disableInsert()}};
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.extra.jira:jirachart-macro', location = '/jirachart/piechart-panel.js' */
AJS.Editor.JiraChart.Panel.PieChart=function(d){AJS.Editor.JiraChart.Panel.call(this);var b=this;this.title="Pie Chart";this.chartType="pie";this.containerId="#jira-chart-content-pie";this.clickableElements=".jira-chart-search button, .jira-chart-show-border, .jira-chart-show-infor";this.onChangeElements="#jira-chart-statType, #jira-chart-width";this.isFormValid=function(){return AJS.Editor.JiraChart.Helper.isChartWidthValid(b.chartElements.width)&&AJS.Editor.JiraChart.Helper.isJqlNotEmpty(b.chartElements.jql)};
this.isResultValid=function(){return this.container.find("#chart-preview-iframe").contents().find(".jira-chart-macro-wrapper").length};this.bindingActions=function(){AJS.Editor.JiraChart.Panel.prototype.bindingActions.call(this);this.container.find(".widthInfo").tooltip({gravity:"w"})};this.bindingServerChange=function(){b.chartElements.server.change(function(){AJS.Editor.JiraChart.Helper.populateStatType(b.container,b.chartElements.statType);b.isFormValid()?AJS.Editor.JiraChart.search(b.container):
AJS.Editor.JiraChart.disableInsert()})};this.bindingChartElements=function(){this.chartElements=AJS.Editor.JiraChart.Helper.bindingCommonChartElements(this.container);this.chartElements.statType=this.container.find("#jira-chart-statType")};this.getChartParamsRequest=function(){var a=this.getMacroParamsFromDialog(),c=AJS.Editor.JiraChart.Helper.getCommonChartParamsRequest(a,this.chartType);c.macro.params.statType=a.statType;return c};this.getMacroParamsFromDialog=function(){var a=AJS.Editor.JiraChart.Helper.getCommonMacroParamsFromDialog(this.chartElements,
this.container);a.chartType="pie";a.statType=this.chartElements.statType.val();return a};this.bindingDataFromMacroToForm=function(a){a&&(AJS.Editor.JiraChart.Helper.bindingCommonDataFromMacroToForm(this.chartElements,a),this.chartElements.statType.val(a.statType))};this.preBinding=function(){AJS.Editor.JiraChart.Helper.populateStatType(this.container,this.container.find("#jira-chart-statType"))}};AJS.Editor.JiraChart.Panel.PieChart.prototype=AJS.Editor.JiraChart.Panel.prototype;
AJS.Editor.JiraChart.Panel.PieChart.prototype.constructor=AJS.Editor.JiraChart.Panel.PieChart;AJS.Editor.JiraChart.Panels.push(new AJS.Editor.JiraChart.Panel.PieChart(AJS.$));
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.extra.jira:jirachart-macro', location = '/jirachart/createdvsresolvedchart-panel.js' */
AJS.Editor.JiraChart.Panel.CreatedVsResolvedChart=function(e){AJS.Editor.JiraChart.Panel.call(this);var c=this,f=function(){c.container.find("#created-vs-resolved-chart-periodName").val("daily");c.container.find("#created-vs-resolved-chart-daysprevious").val("30")},g=function(){var a=c.chartElements.periodName.val(),b=e.trim(c.chartElements.daysprevious.val()),d=c.container.find(".days-previous-error");if(""===b)return c.container.find(".days-previous-error").html("Days Previously is required field."),
!1;if(!AJS.Editor.JiraChart.Helper.isNumber(b)||0>b)return d.html("Days Previously must be a number and positive."),!1;switch(a){case "hourly":(isValid=10>=b)||d.html(AJS.format("Days must not exceed {0} for {1} period",10,a));break;case "daily":(isValid=300>=b)||d.html(AJS.format("Days must not exceed {0} for {1} period",300,a));break;case "weekly":(isValid=1750>=b)||d.html(AJS.format("Days must not exceed {0} for {1} period",
1750,a));break;case "monthly":(isValid=7500>=b)||d.html(AJS.format("Days must not exceed {0} for {1} period",7500,a));break;case "quarterly":(isValid=22500>=b)||d.html(AJS.format("Days must not exceed {0} for {1} period",22500,a));break;case "yearly":(isValid=36500>=b)||d.html(AJS.format("Days must not exceed {0} for {1} period",36500,a));break;default:isValid=!1}isValid&&d.empty();return isValid};this.title="Created vs Resolved";
this.chartType="createdvsresolved";this.containerId="#jira-chart-content-createdvsresolved";this.clickableElements=".jira-chart-search button, .jira-chart-show-border, .jira-chart-show-infor, #created-vs-resolved-chart-cumulative, #created-vs-resolved-chart-showunresolvedtrend";this.onChangeElements="#created-vs-resolved-chart-periodName, #created-vs-resolved-chart-daysprevious, #created-vs-resolved-chart-versionLabel, #jira-chart-width";this.isFormValid=function(){var a=AJS.Editor.JiraChart.Helper.isChartWidthValid(c.chartElements.width);
return g()&&a&&AJS.Editor.JiraChart.Helper.isJqlNotEmpty(c.chartElements.jql)};this.isResultValid=function(){return this.container.find("#chart-preview-iframe").contents().find(".jira-chart-macro-wrapper").length};this.init=function(a){AJS.Editor.JiraChart.Panel.prototype.init.call(this,a);f()};this.bindingChartElements=function(){this.chartElements=AJS.Editor.JiraChart.Helper.bindingCommonChartElements(this.container);this.chartElements.periodName=this.container.find("#created-vs-resolved-chart-periodName");
this.chartElements.daysprevious=this.container.find("#created-vs-resolved-chart-daysprevious");this.chartElements.isCumulative=this.container.find("#created-vs-resolved-chart-cumulative");this.chartElements.showUnresolvedTrend=this.container.find("#created-vs-resolved-chart-showunresolvedtrend");this.chartElements.versionLabel=this.container.find("#created-vs-resolved-chart-versionLabel")};this.bindingActions=function(){AJS.Editor.JiraChart.Panel.prototype.bindingActions.call(this);this.container.find(".widthInfo").tooltip({gravity:"w"});
this.container.find(".showunresolvedtrendInfo").tooltip({gravity:"w"});this.container.find(".cumulativeInfo").tooltip({gravity:"w"});this.container.find(".versionLabelInfo").tooltip({gravity:"w"});this.container.find(".daysPreviousInfo").tooltip({gravity:"w"})};this.getChartParamsRequest=function(){var a=this.getMacroParamsFromDialog(),b=AJS.Editor.JiraChart.Helper.getCommonChartParamsRequest(a,this.chartType);b.macro.params.periodName=a.periodName;b.macro.params.daysprevious=a.daysprevious;b.macro.params.isCumulative=
a.isCumulative;b.macro.params.showUnresolvedTrend=a.showUnresolvedTrend;b.macro.params.versionLabel=a.versionLabel;return b};this.getMacroParamsFromDialog=function(){var a=AJS.Editor.JiraChart.Helper.getCommonMacroParamsFromDialog(this.chartElements,this.container);a.chartType="createdvsresolved";a.periodName=this.chartElements.periodName.val();a.daysprevious=e.trim(this.chartElements.daysprevious.val());a.isCumulative=this.chartElements.isCumulative.prop("checked");a.showUnresolvedTrend=this.chartElements.showUnresolvedTrend.prop("checked");
a.versionLabel=this.chartElements.versionLabel.val();return a};this.resetDialogValue=function(){AJS.Editor.JiraChart.Panel.prototype.resetDialogValue.call(this);f()};this.bindingDataFromMacroToForm=function(a){a&&(AJS.Editor.JiraChart.Helper.bindingCommonDataFromMacroToForm(c.chartElements,a),c.chartElements.isCumulative.attr("checked","false"!==a.isCumulative),c.chartElements.showUnresolvedTrend.attr("checked","true"===a.showUnresolvedTrend),c.chartElements.periodName.val(""===a.periodName?"daily":
a.periodName),c.chartElements.versionLabel.val(a.versionLabel),c.chartElements.daysprevious.val(""===a.daysprevious?"30":a.daysprevious))}};AJS.Editor.JiraChart.Panel.CreatedVsResolvedChart.prototype=AJS.Editor.JiraChart.Panel.prototype;AJS.Editor.JiraChart.Panel.CreatedVsResolvedChart.prototype.constructor=AJS.Editor.JiraChart.Panels.CreatedVsResolvedChart;AJS.Editor.JiraChart.Panels.push(new AJS.Editor.JiraChart.Panel.CreatedVsResolvedChart(AJS.$));
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.extra.jira:jirachart-macro', location = '/jirachart/twodimensionalchart-panel.js' */
AJS.Editor.JiraChart.Panel.TwoDimensionalChart=function(d){AJS.Editor.JiraChart.Panel.call(this);var b=this,e=function(){b.chartElements.numberToShow.val(5);b.chartElements.xstattype.val("statuses");b.chartElements.ystattype.val("assignees")};this.title="Two Dimensional";this.chartType="twodimensional";this.containerId="#jira-chart-content-twodimensional";this.clickableElements=".jira-chart-search button, .jira-chart-show-border, .jira-chart-show-infor, #twodimensional-show-total";
this.onChangeElements="#twodimensional-xaxis, #twodimensional-yaxis, #twodimensional-number-of-result";this.isFormValid=function(){var a=d(".twodimensional-number-of-result-error");var c=b.chartElements.numberToShow.val();AJS.Editor.JiraChart.Helper.isNumber(c)&&0<c?(a.empty(),a=!0):(a.html("The number of rows should be a positive integer"),a=!1);return a&&AJS.Editor.JiraChart.Helper.isJqlNotEmpty(b.chartElements.jql)};this.isResultValid=function(){return this.container.find("#chart-preview-iframe").contents().find(".two-dimensional-chart-table").length};
this.init=function(a){AJS.Editor.JiraChart.Panel.prototype.init.call(this,a);e()};this.bindingChartElements=function(){this.chartElements=AJS.Editor.JiraChart.Helper.bindingCommonChartElements(this.container);this.chartElements.xstattype=this.container.find("#twodimensional-xaxis");this.chartElements.ystattype=this.container.find("#twodimensional-yaxis");this.chartElements.sortBy=this.container.find("#twodimensional-sortby");this.chartElements.sortDirection=this.container.find("#twodimensional-sort-direction");
this.chartElements.showTotals=this.container.find("#twodimensional-show-total");this.chartElements.numberToShow=this.container.find("#twodimensional-number-of-result")};this.getChartParamsRequest=function(){var a=this.getMacroParamsFromDialog(),c=AJS.Editor.JiraChart.Helper.getCommonChartParamsRequest(a,this.chartType);c.macro.params.xstattype=a.xstattype;c.macro.params.ystattype=a.ystattype;c.macro.params.sortBy=a.sortBy;c.macro.params.sortDirection=a.sortDirection;c.macro.params.showTotals=a.showTotals;
c.macro.params.numberToShow=a.numberToShow;return c};this.getMacroParamsFromDialog=function(){var a=AJS.Editor.JiraChart.Helper.getCommonMacroParamsFromDialog(this.chartElements,this.container);a.chartType="twodimensional";a.xstattype=this.chartElements.xstattype.val();a.ystattype=d.trim(this.chartElements.ystattype.val());a.sortBy=d.trim(this.chartElements.sortBy.val());a.sortDirection=d.trim(this.chartElements.sortDirection.val());a.showTotals=this.chartElements.showTotals.prop("checked");a.numberToShow=
this.chartElements.numberToShow.val();return a};this.bindingDataFromMacroToForm=function(a){a&&(AJS.Editor.JiraChart.Helper.bindingCommonDataFromMacroToForm(b.chartElements,a),b.chartElements.xstattype.val(a.xstattype),b.chartElements.ystattype.val(a.ystattype),b.chartElements.sortBy.val(a.sortBy),b.chartElements.sortDirection.val(a.sortDirection),b.chartElements.showTotals.attr("checked","true"===a.showTotals),b.chartElements.numberToShow.val(a.numberToShow))};this.resetDialogValue=function(){AJS.Editor.JiraChart.Panel.prototype.resetDialogValue.call(this);
e()};this.isImageChartExisted=function(){return 0<this.container.find("#chart-preview-iframe").contents().find(".two-dimensional-chart-table").length};this.preBinding=function(){AJS.Editor.JiraChart.Helper.populateStatType(this.container,this.container.find("#twodimensional-xaxis"));AJS.Editor.JiraChart.Helper.populateStatType(this.container,this.container.find("#twodimensional-yaxis"));b.chartElements.xstattype.val("statuses");b.chartElements.ystattype.val("assignees")};this.bindingServerChange=
function(){b.chartElements.server.change(function(){AJS.Editor.JiraChart.Helper.populateStatType(b.container,b.chartElements.xstattype);AJS.Editor.JiraChart.Helper.populateStatType(b.container,b.chartElements.ystattype);b.chartElements.xstattype.val("statuses");b.chartElements.ystattype.val("assignees");b.isFormValid()?AJS.Editor.JiraChart.search(b.container):AJS.Editor.JiraChart.disableInsert()})}};AJS.Editor.JiraChart.Panel.TwoDimensionalChart.prototype=AJS.Editor.JiraChart.Panel.prototype;
AJS.Editor.JiraChart.Panel.TwoDimensionalChart.prototype.constructor=AJS.Editor.JiraChart.Panel.TwoDimensionalChart;AJS.Editor.JiraChart.Panels.push(new AJS.Editor.JiraChart.Panel.TwoDimensionalChart(AJS.$));
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.editor:editor-support-util', location = 'support/atlassian-editor-support.js' */
define("confluence-editor/support/atlassian-editor-support",["ajs","confluence/meta"],function(c,b){return{inlineTasks:function(){var a=b.get("use-inline-tasks");return"true"===a||!0===a},isCollaborativeContentType:function(){var a=b.get("content-type");return b.get("collaborative-content")&&("page"===a||"blogpost"===a)}}});require("confluence/module-exporter").exportModuleAsGlobal("confluence-editor/support/atlassian-editor-support","AJS.Rte.Support");
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-collaborative-editor-plugin:confluence-collaborative-editor-plugin-resources', location = '/js/util/is-valid-uri.js' */
define("confluence-collaborative-editor-plugin/util/is-valid-uri",[],function(){function d(a,c){var b=a.lastIndexOf(c);return-1!==b&&b===a.length-c.length}var e=/^(((?![':"<>])[\s   -   　\$\+<->\^`\|~¢-¦¨©¬®-±´¸×÷˂-˅˒-˟˥-˫˭˯-˿͵΄΅϶҂֍-֏؆-؈؋؎؏۞۩۽۾߶৲৳৺৻૱୰௳-௺౿൏൹฿༁-༃༓༕-༗༚-༟༴༶༸྾-࿅࿇-࿌࿎࿏࿕-࿘႞႟᎐-᎙៛᥀᧞-᧿᭡-᭪᭴-᭼᾽᾿-῁῍-῏῝-῟῭-`´῾⁄⁒⁺-⁼₊-₌₠-₾℀℁℃-℆℈℉℔№-℘℞-℣℥℧℩℮℺℻⅀-⅄⅊-⅍⅏↊↋←-⌇⌌-⌨⌫-⏾␀-␦⑀-⑊⒜-ⓩ─-❧➔-⟄⟇-⟥⟰-⦂⦙-⧗⧜-⧻⧾-⭳⭶-⮕⮘-⮹⮽-⯈⯊-⯑⯬-⯯⳥-⳪⺀-⺙⺛-⻳⼀-⿕⿰-⿻〄〒〓〠〶〷〾〿゛゜㆐㆑㆖-㆟㇀-㇣㈀-㈞㈪-㉇㉐㉠-㉿㊊-㊰㋀-㋾㌀-㏿䷀-䷿꒐-꓆꜀-꜖꜠꜡꞉꞊꠨-꠫꠶-꠹꩷-꩹꭛﬩﮲-﯁﷼﷽﹢﹤-﹦﹩＄＋＜-＞＾｀｜～￠-￦￨-￮￼�!-#%-\*,-/:;\?@\[-\]_\{\}¡§«¶·»¿;·՚-՟։֊־׀׃׆׳״؉؊،؍؛؞؟٪-٭۔܀-܍߷-߹࠰-࠾࡞।॥॰૰෴๏๚๛༄-༒༔༺-༽྅࿐-࿔࿙࿚၊-၏჻፠-፨᐀᙭᙮᚛᚜᛫-᛭᜵᜶។-៖៘-៚᠀-᠊᥄᥅᨞᨟᪠-᪦᪨-᪭᭚-᭠᯼-᯿᰻-᰿᱾᱿᳀-᳇᳓‐-‧‰-⁃⁅-⁑⁓-⁞⁽⁾₍₎⌈-⌋〈〉❨-❵⟅⟆⟦-⟯⦃-⦘⧘-⧛⧼⧽⳹-⳼⳾⳿⵰⸀-⸮⸰-⹄、-〃〈-】〔-〟〰〽゠・꓾꓿꘍-꘏꙳꙾꛲-꛷꡴-꡷꣎꣏꣸-꣺꣼꤮꤯꥟꧁-꧍꧞꧟꩜-꩟꫞꫟꫰꫱꯫﴾﴿︐-︙︰-﹒﹔-﹡﹣﹨﹪﹫！-＃％-＊，-／：；？＠［-］＿｛｝｟-･A-Za-zªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠ-ࢴࢶ-ࢽऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛱ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢄᢇ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎↃↄⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々〆〱-〵〻〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿕ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛥꜗ-ꜟꜢ-ꞈꞋ-ꞮꞰ-ꞷꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭥꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ0-9²³¹¼-¾٠-٩۰-۹߀-߉०-९০-৯৴-৹੦-੯૦-૯୦-୯୲-୷௦-௲౦-౯౸-౾೦-೯൘-൞൦-൸෦-෯๐-๙໐-໙༠-༳၀-၉႐-႙፩-፼ᛮ-ᛰ០-៩៰-៹᠐-᠙᥆-᥏᧐-᧚᪀-᪉᪐-᪙᭐-᭙᮰-᮹᱀-᱉᱐-᱙⁰⁴-⁹₀-₉⅐-ↂↅ-↉①-⒛⓪-⓿❶-➓⳽〇〡-〩〸-〺㆒-㆕㈠-㈩㉈-㉏㉑-㉟㊀-㊉㊱-㊿꘠-꘩ꛦ-ꛯ꠰-꠵꣐-꣙꤀-꤉꧐-꧙꧰-꧹꩐-꩙꯰-꯹０-９])+|\#(\w)+)$/,
f=/^(?:\s*(?:([a-zA-Z]*):\/\/|mailto:|skype:|callto:|facetime:|git:|irc:|irc6:|news:|nntp:|feed:|cvs:|svn:|mvn:|ssh:|itms:|notes:|smb:|sourcetree:|urn:|tel:|xmpp:|telnet:|vnc:|rdp:|whatsapp:|slack:|sip:|sips:|magnet:)[A-Za-zªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠ-ࢴࢶ-ࢽऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛱ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢄᢇ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎↃↄⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々〆〱-〵〻〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿕ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛥꜗ-ꜟꜢ-ꞈꞋ-ꞮꞰ-ꞷꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭥꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ0-9²³¹¼-¾٠-٩۰-۹߀-߉०-९০-৯৴-৹੦-੯૦-૯୦-୯୲-୷௦-௲౦-౯౸-౾೦-೯൘-൞൦-൸෦-෯๐-๙໐-໙༠-༳၀-၉႐-႙፩-፼ᛮ-ᛰ០-៩៰-៹᠐-᠙᥆-᥏᧐-᧚᪀-᪉᪐-᪙᭐-᭙᮰-᮹᱀-᱉᱐-᱙⁰⁴-⁹₀-₉⅐-ↂↅ-↉①-⒛⓪-⓿❶-➓⳽〇〡-〩〸-〺㆒-㆕㈠-㈩㉈-㉏㉑-㉟㊀-㊉㊱-㊿꘠-꘩ꛦ-ꛯ꠰-꠵꣐-꣙꤀-꤉꧐-꧙꧰-꧹꩐-꩙꯰-꯹０-９\/]+(?:(?!['"<>])[\s   -   　\$\+<->\^`\|~¢-¦¨©¬®-±´¸×÷˂-˅˒-˟˥-˫˭˯-˿͵΄΅϶҂֍-֏؆-؈؋؎؏۞۩۽۾߶৲৳৺৻૱୰௳-௺౿൏൹฿༁-༃༓༕-༗༚-༟༴༶༸྾-࿅࿇-࿌࿎࿏࿕-࿘႞႟᎐-᎙៛᥀᧞-᧿᭡-᭪᭴-᭼᾽᾿-῁῍-῏῝-῟῭-`´῾⁄⁒⁺-⁼₊-₌₠-₾℀℁℃-℆℈℉℔№-℘℞-℣℥℧℩℮℺℻⅀-⅄⅊-⅍⅏↊↋←-⌇⌌-⌨⌫-⏾␀-␦⑀-⑊⒜-ⓩ─-❧➔-⟄⟇-⟥⟰-⦂⦙-⧗⧜-⧻⧾-⭳⭶-⮕⮘-⮹⮽-⯈⯊-⯑⯬-⯯⳥-⳪⺀-⺙⺛-⻳⼀-⿕⿰-⿻〄〒〓〠〶〷〾〿゛゜㆐㆑㆖-㆟㇀-㇣㈀-㈞㈪-㉇㉐㉠-㉿㊊-㊰㋀-㋾㌀-㏿䷀-䷿꒐-꓆꜀-꜖꜠꜡꞉꞊꠨-꠫꠶-꠹꩷-꩹꭛﬩﮲-﯁﷼﷽﹢﹤-﹦﹩＄＋＜-＞＾｀｜～￠-￦￨-￮￼�!-#%-\*,-/:;\?@\[-\]_\{\}¡§«¶·»¿;·՚-՟։֊־׀׃׆׳״؉؊،؍؛؞؟٪-٭۔܀-܍߷-߹࠰-࠾࡞।॥॰૰෴๏๚๛༄-༒༔༺-༽྅࿐-࿔࿙࿚၊-၏჻፠-፨᐀᙭᙮᚛᚜᛫-᛭᜵᜶។-៖៘-៚᠀-᠊᥄᥅᨞᨟᪠-᪦᪨-᪭᭚-᭠᯼-᯿᰻-᰿᱾᱿᳀-᳇᳓‐-‧‰-⁃⁅-⁑⁓-⁞⁽⁾₍₎⌈-⌋〈〉❨-❵⟅⟆⟦-⟯⦃-⦘⧘-⧛⧼⧽⳹-⳼⳾⳿⵰⸀-⸮⸰-⹄、-〃〈-】〔-〟〰〽゠・꓾꓿꘍-꘏꙳꙾꛲-꛷꡴-꡷꣎꣏꣸-꣺꣼꤮꤯꥟꧁-꧍꧞꧟꩜-꩟꫞꫟꫰꫱꯫﴾﴿︐-︙︰-﹒﹔-﹡﹣﹨﹪﹫！-＃％-＊，-／：；？＠［-］＿｛｝｟-･A-Za-zªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠ-ࢴࢶ-ࢽऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛱ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢄᢇ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎↃↄⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々〆〱-〵〻〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿕ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛥꜗ-ꜟꜢ-ꞈꞋ-ꞮꞰ-ꞷꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭥꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ0-9²³¹¼-¾٠-٩۰-۹߀-߉०-९০-৯৴-৹੦-੯૦-૯୦-୯୲-୷௦-௲౦-౯౸-౾೦-೯൘-൞൦-൸෦-෯๐-๙໐-໙༠-༳၀-၉႐-႙፩-፼ᛮ-ᛰ០-៩៰-៹᠐-᠙᥆-᥏᧐-᧚᪀-᪉᪐-᪙᭐-᭙᮰-᮹᱀-᱉᱐-᱙⁰⁴-⁹₀-₉⅐-ↂↅ-↉①-⒛⓪-⓿❶-➓⳽〇〡-〩〸-〺㆒-㆕㈠-㈩㉈-㉏㉑-㉟㊀-㊉㊱-㊿꘠-꘩ꛦ-ꛯ꠰-꠵꣐-꣙꤀-꤉꧐-꧙꧰-꧹꩐-꩙꯰-꯹０-９])*(?:\s)*)$/;
return function(a){if(null===a)return!1;var c=e.test(a),b=(a=a.match(f))&&a.length&&a[1];a=a&&a.length&&(!b||!d(b,"script")&&!d(b,"data"));return c||a}});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-collaborative-editor-plugin:confluence-collaborative-editor-plugin-resources', location = '/template/synchrony-presence.soy' */
// This file was automatically generated from synchrony-presence.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Confluence.Templates.SynchronyPresence.
 */

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Templates == 'undefined') { Confluence.Templates = {}; }
if (typeof Confluence.Templates.SynchronyPresence == 'undefined') { Confluence.Templates.SynchronyPresence = {}; }


Confluence.Templates.SynchronyPresence.container = function(opt_data, opt_ignored) {
  return '<ul id="avatar-list" class="synchrony-doc-' + soy.$$escapeHtml(opt_data.docId) + ' collaborative-avatars-list"></ul><aui-inline-dialog id="more-avatars" alignment="bottom right" responds-to="toggle" aria-hidden="true"><h3>' + soy.$$escapeHtml('Also edited') + '</h3><ul id="more-avatars-list" class="collaborative-avatars-list"></ul></aui-inline-dialog>';
};
if (goog.DEBUG) {
  Confluence.Templates.SynchronyPresence.container.soyTemplateName = 'Confluence.Templates.SynchronyPresence.container';
}


Confluence.Templates.SynchronyPresence.avatar = function(opt_data, opt_ignored) {
  return '<li class="avatar-item' + ((opt_data.active) ? ' p' + soy.$$escapeHtml(opt_data.telepointer) + ' active' : '') + ((opt_data.currentUser) ? ' no-animate-entry' : '') + '"><span title="' + soy.$$escapeHtml(opt_data.title) + '" avatar="' + soy.$$escapeHtml(opt_data.initial) + '"' + ((opt_data.active) ? ' data-origin="' + soy.$$escapeHtml(opt_data.origin) + '"' : '') + ' class="avatar' + ((opt_data.active) ? ' active' : '') + '"' + ((opt_data.username) ? ' data-username="' + soy.$$escapeHtml(opt_data.username) + '"' : '') + '><img src="' + soy.$$escapeHtml(opt_data.avatarUrl) + '" alt="' + soy.$$escapeHtml(AJS.format('Profile picture for {0}',opt_data.username)) + '"/></span></li>';
};
if (goog.DEBUG) {
  Confluence.Templates.SynchronyPresence.avatar.soyTemplateName = 'Confluence.Templates.SynchronyPresence.avatar';
}


Confluence.Templates.SynchronyPresence.overlay = function(opt_data, opt_ignored) {
  return '<span id="synchrony-presence-overlay" class="overlay avatar"><a href="#" aria-controls="more-avatars" class="aui-button" data-aui-trigger></a></span>';
};
if (goog.DEBUG) {
  Confluence.Templates.SynchronyPresence.overlay.soyTemplateName = 'Confluence.Templates.SynchronyPresence.overlay';
}

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-collaborative-editor-plugin:confluence-collaborative-editor-plugin-resources', location = '/js/synchrony-presence.js' */
define("confluence-collaborative-editor-plugin/synchrony-presence","backbone confluence-collaborative-editor-plugin/avatar-list-view confluence-collaborative-editor-plugin/overlay-view ajs confluence/legacy confluence/meta confluence/templates jquery underscore".split(" "),function(A,B,u,e,C,f,D,l,h){function v(){q=l(D.SynchronyPresence.container({docId:C.getContentId()}));l("#rte-toolbar").append(q);new B({el:"#avatar-list",collection:c});m=new u({collection:c});l("#rte-toolbar").append(m.render())}
function w(b){var a=l.extend({},b);a.id=b.origin;a.fullname=b.fullname||"Anonymous";a.name=b.name||"anonymous";a.username=b.name;a.avatarURL=b.currentUser?b.avatarURL:e.contextPath()+b.avatarURL;a.active=b.active||!0;a.currentUser=b.currentUser||r===b.origin;return a}function E(){return c.filter(function(b){return b.get("active")}).length}function t(){var b=[];c.each(function(a){a.get("active")||h.some(n,function(g){return a.get("id")===g.name})||b.push(a)});h.each(b,function(a){c.remove(a)});
h.each(n,function(a){a.name===f.get("remote-user")||c.any(function(g){return g.get("id")===a.name||g.get("name")===a.name})||(a.active=!1,a.id=a.name,c.add(a))})}var c=new A.Collection;c.add(w({origin:"current-user",fullname:f.get("current-user-fullname"),name:f.get("remote-user"),avatarURL:f.get("current-user-avatar-uri-reference"),active:!0,currentUser:!0}));var x=!1,r="",p,n=[],q=null,m,y=!1;e.Rte.getEditor()&&e.Rte.getEditor().initialized?v():e.bind("rte-collab-ready",v);return{appendTo:function(b,
a,g){r=b;x||(p=p||require("tinymce"),x=!0,n=g,a.on("presence",function(z){m.hideInlineDialog();z.joined.filter(function(d){return d.origin!==r}).forEach(function(d){d=w(d);var k=c.findWhere({active:!1,id:d.name});k&&c.remove(k);c.add(d,{at:E()})});z.left.forEach(function(d){d.id=d.origin;c.remove(d);t()});t();y||(e.bind("editor-heartbeat",function(d,k){h.isArray(k.contributors)&&(n=k.contributors,t())}),y=!0);e.trigger("analyticsEvent",{name:"confluence.synchrony.user.in.session",data:{numOtherUsers:c.length,
draftId:f.get("draft-id"),contentId:f.get("content-id")}})}),p.EditorManager.activeEditor.on("click",h.bind(u.prototype.hideInlineDialog,m)));return q},setTinyMce:function(b){p=b}}});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-collaborative-editor-plugin:confluence-collaborative-editor-plugin-resources', location = '/js/avatar-list-view.js' */
define("confluence-collaborative-editor-plugin/avatar-list-view",["backbone","confluence-collaborative-editor-plugin/avatar-view","ajs","jquery","underscore"],function(e,f,d,h,g){return e.View.extend({initialize:function(){this.collection.on("add",this.addAvatar,this);this.collection.on("remove",this.removeAvatar,this);this.collection.each(this.addAvatar,this)},addAvatar:function(a){var b=new f({model:a});a.get("active")?(d.log(a.get("fullname")+" joined. ("+a.get("origin")+")"),a=this.$el.find("li.active").last(),
b=a.length?b.render().insertAfter(a):b.render().prependTo(this.$el)):b=b.render().appendTo(this.$el);a=function(c){c.addClass("show");c.children(".avatar").tooltip({fade:!0,gravity:"ne"})};6===this.collection.length?a(b):g.defer(a,b);this._manageOverlayClass()},removeAvatar:function(a){a.get("active")&&d.log(a.get("fullname")+" left. ("+a.get("origin")+")");this._manageOverlayClass()},_manageOverlayClass:function(){var a=this.collection.length;this.collection.each(function(b,c){b.set("hidden",5<a&&
4<=c)});5<a?this.$el.addClass("has-overlay"):this.$el.removeClass("has-overlay")}})});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-collaborative-editor-plugin:confluence-collaborative-editor-plugin-resources', location = '/js/avatar-view.js' */
define("confluence-collaborative-editor-plugin/avatar-view",["backbone","ajs","confluence/templates","jquery"],function(f,d,g,e){return f.View.extend({initialize:function(){this.model.on("remove",this.remove,this)},render:function(){return this.$el=e(g.SynchronyPresence.avatar({title:this._determineTitle(),initial:this.model.get("fullname").charAt(0).toUpperCase(),fullname:this.model.get("fullname"),username:this.model.get("username"),avatarUrl:this.model.get("avatarURL"),origin:this.model.get("origin"),
active:this.model.get("active"),currentUser:this.model.get("currentUser"),telepointer:this._synchronyTelepointerId()}))},remove:function(){this.$el.removeClass().addClass("avatar-item animate");this.model.get("hidden")||this.$el.addClass("removing");this.$el.one(this._getSupportedTransition(),function(){e(this).removeClass("animate removing");e(this).remove()})},_determineTitle:function(){if(this.model.get("currentUser")){var a=["It\u0027s you, but smaller!","Look at you, getting stuff done!"];
return a[Math.floor(Math.random()*a.length)]}return this.model.get("fullname")+" "+(this.model.get("active")?"is editing this page.":"has made changes that haven\u0027t been published.")},_getSupportedTransition:function(){var a={transition:"transitionend",MozTransition:"transitionend",OTransition:"oTransitionEnd",MsTransition:"msTransitionEnd",WebkitTransition:"webkitTransitionEnd"},b=document.createElement("_"),c;for(c in a)if(void 0!==b.style[c])return a[c]},_synchronyTelepointerId:function(){for(var a=
""+(this.model.get("sub")||this.model.get("origin")||""),b=0,c=0;c<a.length;c++)b=(b<<5)-b+a.charCodeAt(c),b&=b;return Math.abs(b)%10}})});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-collaborative-editor-plugin:confluence-collaborative-editor-plugin-resources', location = '/js/overlay-view.js' */
define("confluence-collaborative-editor-plugin/overlay-view","backbone aui/inline-dialog2 confluence-collaborative-editor-plugin/avatar-view confluence/templates ajs jquery underscore".split(" "),function(d,h,e,f,g,a,k){return d.View.extend({initialize:function(){this.collection.on("add remove",this.reconcile,this);this.inlineDialog2=document.querySelector("#more-avatars")},render:function(){this.$el=a(f.SynchronyPresence.overlay());this.$el.children("a").tooltip({fade:!0,gravity:"ne"});this.$el.on("click",
function(){a(".tipsy").remove()});return this.$el},reconcile:function(){var b=this.collection.where({hidden:!0});0<b.length?(this.$el.addClass("show"),this.$el.children(".aui-button").html("+"+b.length).attr("title",b.length+" "+"other users are editing."),a("#more-avatars-list").children().remove(),b.forEach(function(c){c=new e({model:c});a("#more-avatars-list").append(c.render())})):(this.$el.removeClass("show"),this.hideInlineDialog())},hideInlineDialog:function(){this.inlineDialog2&&
this.inlineDialog2.isVisible&&this.inlineDialog2.isVisible()&&(this.inlineDialog2.open=!1)}})});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-collaborative-editor-plugin:confluence-collaborative-editor-plugin-resources', location = '/template/status-indicator.soy' */
// This file was automatically generated from status-indicator.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Confluence.Templates.CollaborativeEditor.StatusIndicator.
 */

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Templates == 'undefined') { Confluence.Templates = {}; }
if (typeof Confluence.Templates.CollaborativeEditor == 'undefined') { Confluence.Templates.CollaborativeEditor = {}; }
if (typeof Confluence.Templates.CollaborativeEditor.StatusIndicator == 'undefined') { Confluence.Templates.CollaborativeEditor.StatusIndicator = {}; }


Confluence.Templates.CollaborativeEditor.StatusIndicator.container = function(opt_data, opt_ignored) {
  return '<div class="synchrony-status-indicator"><div class="status-indicator-icon aui-icon aui-icon-small' + ((opt_data.error) ? ' aui-iconfont-warning' : (opt_data.saving) ? ' aui-iconfont-devtools-task-in-progress' : ' aui-iconfont-approve') + '" data-tooltip="' + soy.$$escapeHtml(opt_data.tooltipMessage) + '"></div><div class="status-indicator-message" data-tooltip="' + soy.$$escapeHtml(opt_data.tooltipMessage) + '">' + soy.$$escapeHtml(opt_data.statusMessage) + '</div></div>';
};
if (goog.DEBUG) {
  Confluence.Templates.CollaborativeEditor.StatusIndicator.container.soyTemplateName = 'Confluence.Templates.CollaborativeEditor.StatusIndicator.container';
}

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-collaborative-editor-plugin:confluence-collaborative-editor-plugin-resources', location = '/js/status-indicator-view.js' */
define("confluence-collaborative-editor-plugin/status-indicator-view",["confluence/templates","backbone","ajs","jquery","underscore"],function(f,g,c,h,d){return g.View.extend({initialize:function(){this.$el.addClass("synchrony");this.listenTo(this.model,"change:saving change:error",this.render);this.model.set("confluenceUnreachable",!1);this.model.set("synchronyUnreachable",!1);this.model.set("tokenExpired",!1);c.bind("rte.heartbeat",d.bind(this.onConfluenceConnectedState,this));c.bind("rte.safe-save.error",
d.bind(this._errorPublishing,this));c.bind("rte.preview.error",d.bind(this._errorPublishing,this));this.model.set("connecting",!0);this._setProgressState()},render:function(){h(".tipsy").remove();this.$el.html(f.CollaborativeEditor.StatusIndicator.container(this.model.attributes))},onConnectedState:function(a){this.model.set("synchronyUnreachable",!1);if(!this.model.has("synchronyEntity")){this.model.set("synchronyEntity",a);var b=this;this.model.get("synchronyEntity").on("update",function(e){b._handleSynchronyUpdateEvent(e,
b)});this.model.get("synchronyEntity").on("ack",function(e){b._handleSynchronyAckEvent(e,b)})}this._setSavedState()},onDisconnectedState:function(){this.model.set("synchronyUnreachable",!0);this.model.set("connecting",!0);this._setErrorState()},onConfluenceConnectedState:function(){this.model.get("confluenceUnreachable")&&(this.model.set("confluenceUnreachable",!1),this._setSavedState())},onConfluenceDisconnectedState:function(){this.model.set("confluenceUnreachable",!0);this.model.set("connecting",
!0);this._setErrorState()},onTokenRenewedState:function(){this.model.get("tokenExpired")&&(this.model.set("tokenExpired",!1),this._setSavedState())},onTokenExpiredState:function(){this.model.set("tokenExpired",!0);this.model.set("connecting",!0);this._setErrorState()},_handleSynchronyUpdateEvent:function(a,b){"local"===a.updateType&&(b.model.set("pendingChanges",!0),b._saving())},_handleSynchronyAckEvent:function(a,b){a=0<a.pending.length;b.model.set("pendingChanges",a);a||b.model.set("lastSavedTime",
(new Date).getTime())},_saving:function(){var a=this,b=function(){setTimeout(function(){a.model.get("pendingChanges")||(new Date).getTime()-a.model.get("lastSavedTime")<a.model.get("minActiveTime")?b():a._setSavedState()},a.model.get("minActiveTime"))};this.model.get("saving")||(this.model.set("connecting",!1),this._setProgressState(),b())},_reachable:function(){return!this.model.get("confluenceUnreachable")&&!this.model.get("synchronyUnreachable")&&!this.model.get("tokenExpired")},_errorPublishing:function(a,
b){switch(b.status){case 0:this.onConfluenceDisconnectedState();break;case 500:case 503:this.onConfluenceDisconnectedState()}},_setSavedState:function(){this._reachable()&&"READ_ONLY"!==c.Meta.get("access-mode")?(this.model.set("statusMessage",this.model.get("connecting")?"Ready to go":"Changes saved"),this.model.set("isReadyToGo",!!this.model.get("connecting")),this.model.set("tooltipMessage","We\u0027re automatically saving all of your changes in a draft."),this.model.set("connecting",
!1),this.model.set("saving",!1),this.model.set("error",!1)):this._setErrorState()},_setErrorState:function(){var a="READ_ONLY"!==c.Meta.get("access-mode");this.model.set("statusMessage","Can\u0027t save changes");this.model.set("tooltipMessage",a?"Can\u0027t reach the server. Check your internet connection, and we\u0027ll keep trying to reconnect you.":"This site is read-only. You can\u0027t make changes right now.");this.model.set("saving",!1);this.model.set("error",!0)},_setProgressState:function(){this._reachable()?(this.model.set("statusMessage",
this.model.get("connecting")?"Connecting...":"Saving changes"),this.model.set("tooltipMessage","We\u0027re automatically saving all of your changes in a draft."),this.model.set("saving",!0),this.model.set("error",!1)):this._setErrorState()}})});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-collaborative-editor-plugin:confluence-collaborative-editor-plugin-resources', location = '/js/initialise-metrics.js' */
define("collaborative-editing-initialise-metrics-collection",["confluence/legacy"],function(a){return function(){var b={"confluence.editor":!0,"confluence.editor.preload":!0,"confluence.editor.quick.fetchContent":!0,"confluence.editor.tinymce":!0,"confluence.editor.synchrony":!0,"confluence.editor.synchrony.CR":!0,"confluence.editor.synchrony.connect":!0,"confluence.editor.synchrony.deps":!0,"confluence.editor.synchrony.init":!0,"confluence.editor.synchrony.jsLoad":!0,"confluence.editor.synchrony.snapshot":!0,
"confluence.editor.synchrony.unmarshal":!0},c={"confluence.editor.synchrony.connect":!0};a.registerPerformanceSession&&a.registerPerformanceSession("confluence.editor.quickedit.loading.times",b,c)}});require("confluence/module-exporter").safeRequire("collaborative-editing-initialise-metrics-collection",function(a){a()});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-collaborative-editor-plugin:confluence-collaborative-editor-plugin-resources', location = '/js/lib/SyncManager.js' */
define("confluence-collaborative-editor-plugin/lib/SyncManager",["ajs","jquery"],function(e,f){var h=["id"],k={START_SYNCHRONIZING_EVENT_NAME:"start",STOP_SYNCHRONIZING_EVENT_NAME:"stop",MAX_CONSECUTIVE_AUTO_RECOVERY_TRIGGERED:10,MAX_WAIT_TIME_TO_RESTART:3E4,DEBUG_MODE:!1},l=function(a){return h.every(function(b){return"undefined"!==typeof a[b]})},c=function(a,b){this.entity=a;this.settings=f.extend({},k,b||{});this.controlSyncState={};this.recoveryTimeoutTasks={};a=function(d,m,g){l(g)?d(g):this.displayLogMessage("Invalid payload, missing required params",
m,g)};e.bind("synchrony."+this.settings.START_SYNCHRONIZING_EVENT_NAME,a.bind(this,this.enableSynchronization.bind(this)));e.bind("synchrony."+this.settings.STOP_SYNCHRONIZING_EVENT_NAME,a.bind(this,this.disableSynchronization.bind(this)))};c.prototype.getOrCreateControlSyncState=function(a){return this.controlSyncState[a]=this.controlSyncState[a]||{DISABLED_SYNC_STATUS:!1,RECOVERY_TIMER_RUNNING:!1,CONSECUTIVE_AUTO_RECOVERY_TRIGGERED:0}};c.prototype.enableDebug=function(a){this.settings.DEBUG_MODE=
"undefined"!==typeof a?a:!0};c.prototype.displayLogMessage=function(){if(this.settings.DEBUG_MODE){var a=Array.prototype.slice.call(arguments);a.splice(0,0,"DEBUG: "+(new Date).toLocaleTimeString());console.log.apply(console,a)}};c.prototype.disableSynchronization=function(a){var b=a.id;this.getOrCreateControlSyncState(b).DISABLED_SYNC_STATUS=!0;this.clearAutoRecoveryTimer(b);this.setAutoRecoveryTimer(a);this.entity.stop(b);this.displayLogMessage("Stoping entity synchronization",b,f.extend(!0,{},
this.controlSyncState))};c.prototype.enableSynchronization=function(a){a=a.id;this.getOrCreateControlSyncState(a).DISABLED_SYNC_STATUS=!1;this.clearAutoRecoveryTimer(a);this.entity.start(a);this.displayLogMessage("Starting entity synchronization",a,f.extend(!0,{},this.controlSyncState))};c.prototype.clearAutoRecoveryTimer=function(a){var b=this.getOrCreateControlSyncState(a);clearTimeout(this.recoveryTimeoutTasks[a]);delete this.recoveryTimeoutTasks[a];b.RECOVERY_TIMER_RUNNING=!1};c.prototype.setAutoRecoveryTimer=
function(a){var b=a.id,d=this.getOrCreateControlSyncState(b);d.RECOVERY_TIMER_RUNNING=!0;this.recoveryTimeoutTasks[b]=setTimeout(function(){this.displayLogMessage("Auto recovery has been triggered",b);this.clearAutoRecoveryTimer(b);d.DISABLED_SYNC_STATUS=!1;d.RECOVERY_TIMER_RUNNING=!1;d.CONSECUTIVE_AUTO_RECOVERY_TRIGGERED++;e.trigger("analyticsEvent",{name:"confluence.synchrony.syncmanager.failed-to-restart",data:{id:b}});d.CONSECUTIVE_AUTO_RECOVERY_TRIGGERED>=this.settings.MAX_CONSECUTIVE_AUTO_RECOVERY_TRIGGERED&&
(this.displayLogMessage("Auto recovery has been triggered too many times for the same action",b,this.controlSyncState[b].CONSECUTIVE_AUTO_RECOVERY_TRIGGERED),e.trigger("analyticsEvent",{name:"confluence.synchrony.syncmanager.consecutive-failed-to-restart",data:{id:b}}));this.entity.start(b)}.bind(this),a.maxWaitTimeToRestart||this.settings.MAX_WAIT_TIME_TO_RESTART)};return c});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-collaborative-editor-plugin:confluence-collaborative-editor-plugin-resources', location = '/js/telepointer-cleaner.js' */
define("confluence-collaborative-editor-plugin/telepointer-cleaner",["confluence-editor-reliable-save/reliable-save","jquery"],function(b,c){b.registerCleanupFunction(function(d){var a=c("\x3cdiv\x3e");a.append(d);a.find(".synchrony-container, .synchrony-tp").remove();return a.html()})});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-collaborative-editor-plugin:confluence-collaborative-editor-plugin-resources', location = '/js/editor-blanket.js' */
define("confluence-collaborative-editor-plugin/editor-blanket",["ajs","jquery","confluence/meta","confluence-editor/support/atlassian-editor-support"],function(l,a,m,h){var c,d;function f(b){switch(b){case "block":c="editor-block";d="aria-disabled";e="";break;default:c="editor-loading editor-loading-spinner",d="aria-busy",e="editor-loading"}b=a("#editpageform, #createpageform");b.addClass(c);b.attr(d,!0);a("#content-title").attr("tabindex",-1);a("#wysiwygTextarea_ifr").attr("tabindex",-1);a(".aui-toolbar2-primary").addClass(e)}
function k(){var b=a("#editpageform, #createpageform");b.removeClass(c);b.attr(d,!1);a("#rte").css("opacity",1).addClass("editor-blanket-ease-in");a("#content-title").attr("tabindex",0);a("#wysiwygTextarea_ifr").attr("tabindex",0);a("#content-title-div").css("opacity",1).addClass("editor-blanket-ease-in");a(".aui-toolbar2-primary").removeClass(e);e=d=c=void 0}function g(){a("#rte").css("opacity",1);a("#content-title-div").css("opacity",1)}var e=d=c=void 0;return{applyBlanket:function(b){h.isCollaborativeContentType()&&
"pending"===b.state()?(f(),b.done(k)):g()},showEditor:g,showBlanket:f}});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-collaborative-editor-plugin:confluence-collaborative-editor-plugin-resources', location = '/js/synchrony-auth.js' */
define("confluence-collaborative-editor-plugin/synchrony-auth",["jquery","ajs","confluence/meta","confluence/legacy","confluence-collaborative-editor-plugin/synchrony-util"],function(l,d,m,n,f){function p(c,a){f.time("confluence.editor.synchrony.token");var b=a&&a.errorType?"?errorType\x3d"+a.errorType:"";l.ajax({dataType:"json",method:"GET",url:encodeURI(d.contextPath()+"/rest/synchrony/1.0/token/"+n.getContentId()+"/generate"+b)}).done(function(g){m.set("synchrony-token",g.synchronyToken);m.set("synchrony-expiry",
g.synchronyExpiry);h=0;c.resolve(g.synchronyToken);e&&(e.onConfluenceConnectedState(),e.onTokenRenewedState());d.trigger("dismiss.editor.error.message",{messageKey:"synchrony-token-expired",enablePublish:!0});d.debug("Synchrony JWT token updated.");f.timeEnd("confluence.editor.synchrony.token")}).fail(function(){h++;10<=h&&d.trigger("editor.error.message",{messageKey:"synchrony-token-expired",message:"We couldn\u0027t process your request, as it was missing a required security token. Copy your work, then re-submit the form or reload the page.",disablePublish:!0});e&&(e.onConfluenceDisconnectedState(),
e.onTokenExpiredState());d.log(a?a.message:"Confluence failed to renew JWT token.");c.reject("token")})}function k(c){var a=l.Deferred(),b;if(b=!c)b=parseInt(f.retrieveMetadata("synchrony-expiry")),b=isNaN(b)?!1:b>Date.now()/1E3;b?a.resolve(f.retrieveMetadata("synchrony-token")):(d.log("["+new Date+"] Synchrony JWT expired or invalid, retrieving new token."),p(a,c));return a.promise()}var e,h=0;return{init:function(c){e=c},performRequest:function(c){return k().pipe(c).pipe(function(a){var b="error"===
a[1]&&a[0].responseText?JSON.parse(a[0].responseText):a[0];return"error"===a[1]&&b.type&&b.type.match(/^jwt\//)?k({errorType:b.type,message:b.message}).pipe(c):a})},getTokenPromise:k}});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-collaborative-editor-plugin:confluence-collaborative-editor-plugin-resources', location = '/js/unsupported-extension.js' */
define("confluence-collaborative-editor-plugin/unsupported-extension","ajs jquery confluence/legacy confluence-editor/editor/page-editor-message window confluence-collaborative-editor-plugin/editor-blanket".split(" "),function(a,c,d,e,f,g){function h(){var b=a.Rte.getEditor().getBody();b.hasAttribute("data-gramm")&&b.hasAttribute("data-gramm_id")&&(a.trigger("synchrony.stop",{id:"confluence.editor.block.by.grammarly",maxWaitTimeToRestart:31536E6}),a.trigger("analyticsEvent",{name:"confluence.synchrony.editor.grammarly.block"}),
b.setAttribute("contentEditable",!1),c(b).find(".contentLayout2 .innerCell").each(function(){this.setAttribute("contentEditable",!1)}),g.showBlanket("block"),d.Editor.UI.setButtonsState(!1,d.Editor.UI.buttons),e.handleMessage("collaborative-editor-unsupported-extension",{type:"error",title:"Grammarly isn\u0027t supported",message:a.format("The Grammarly extension doesn\u0027\u0027t play well with collaborative editing. Disable it and \u003ca {0}\u003ereload the page\u003c/a\u003e to keep working.",'href\x3d"#" id\x3d"collabGrammarlyReload"')}),c("#collabGrammarlyReload").click(function(){a.trigger("analyticsEvent",
{name:"confluence.synchrony.editor.grammarly.reload.click"});f.location.reload();return!1}),a.trigger("synchrony-unsupported-extension"))}return{check:function(){h()}}});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-collaborative-editor-plugin:confluence-collaborative-editor-plugin-resources', location = '/js/synchrony-entity.js' */
define("confluence-collaborative-editor-plugin/synchrony-entity","jquery ajs confluence-collaborative-editor-plugin/synchrony-auth confluence-collaborative-editor-plugin/synchrony-util confluence-collaborative-editor-plugin/unsupported-extension confluence-collaborative-editor-plugin/util/is-valid-uri".split(" "),function(f,h,q,k,r,t){function l(c){return function(d){return null===d||c.test(d)}}function p(c){var d=l(/^[\w\.\-\+%]+$/i),e=l(/^[\w-]+$/),g=l(/^data:image\/png;base64,([\w+\/%\-]+)=*$/),
a=c.whitelists.tinymce.attributes.src;return f.extend({},c.whitelists.tinymce,{styles:f.extend({},c.whitelists.tinymce.styles,{"padding-top":!1,"padding-right":!1,"padding-bottom":!1,"padding-left":!1,padding:!1,display:d,"list-style-type":d}),attributes:f.extend({},c.whitelists.tinymce.attributes,{"confluence-query-params":!0,"data-element-title":!0,"data-ref":!0,accesskey:!0,datetime:!0,"data-anchor":!0,"data-encoded-xml":!0,"data-highlight-class":!0,"data-highlight-colour":!0,"data-space-key":!0,
"data-username":!0,"data-emoticon-name":e,"data-emoji-id":!0,"data-hipchat-emoticon":!0,"data-entity-id":!0,"data-entity-type":!0,"data-favourites-bound":!0,"data-macro-id":!0,"data-macro-name":!0,"data-macro-schema-version":!0,"data-macro-body-type":!0,"data-macro-parameters":!0,"data-macro-default-parameter":!0,"data-atlassian-layout":!0,"data-placeholder-type":!0,"data-layout":!0,"data-title":!0,"data-type":!0,"data-inline-task-id":!0,"data-inline-tasks-content-id":!0,"data-base-url":!0,"data-linked-resource-id":!0,
"data-linked-resource-type":!0,"data-linked-resource-version":!0,"data-linked-resource-default-alias":!0,"data-linked-resource-container-version":!0,"data-linked-resource-content-type":!0,"data-unresolved-comment-count":!0,"data-location":!0,"data-image-height":!0,"data-image-width":!0,"data-attachment-copy":!0,"data-content-title":!0,"data-snooker-locked-cols":!0,"data-snooker-col-series":!0,"data-mce-resize":!0,"data-filename":!0,username:!0,src:function(b){return g(b)||a(b)},href:t,role:!0,tabindex:!0,
"aria-haspopup":!0,"aria-label":!0}),classes:function(b){switch(b){case "mceSelected":case "active-resizable":case "valid":case "active":return!1;default:return!0}},elements:f.extend({},c.whitelists.tinymce.elements,{time:!0,mark:!0,label:!0,form:!0}),elementsByClass:f.extend({},c.whitelists.tinymce.elementsByClass,{"mce-pastebin":!1})})}function u(c,d,e){var g=p(c);return{profile:"tinymce",selectionCorrections:!1,telepointer:{refreshOnResize:!0,label:{hover:!0,movement:1E3,text:function(a){try{return(a.fullname||
"Anonymous").charAt(0).toUpperCase()}catch(b){h.log(b)}return"\x26#9786;"}}},tinymce:{monkeyPatchUndoManager:!0,instance:d},whitelist:function(a){var b=a.domNode,m="node"===a.type,n="attribute"===a.type&&"data-title"===a.name;if(b===e)return m||n;m=b&&b.classList.contains("numberingColumn")&&("TD"===b.nodeName||"TH"===b.nodeName);n=!!b&&b.hasAttribute("data-hipchat-emoticon");if("attribute"===a.type&&"contenteditable"===a.name&&(m||n))return!0;if(a.name&&a.name.includes("mce-visual-caret")&&
"class"===a.type&&b){const {classList:v,attributes:w,nodeName:x}=b||{};if(v.contains("mce-visual-caret")&&"all"===w["data-mce-bogus"].value&&"DIV"===x)return!1}return c.isWhitelisted(g,a)},domReadHook:function(){h.trigger("cursor-target-refresh");r.check()}}}return{bind:function(c,d,e,g,a){return c.entity({url:k.getServiceUrl(),entityId:k.getEntityId(),jwt:q.getTokenPromise,initRev:a.confRev,history:g,presence:!0,useFallback:k.getXhrFallbackFlag()}).bind(e,u(c,d,e))},makeWhitelist:p}});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-collaborative-editor-plugin:confluence-collaborative-editor-plugin-resources', location = '/js/util/url-parser.js' */
define("confluence-collaborative-editor-plugin/util/url-parser",["window"],function(b){return{parseUrl:function(c){var a=b.document.createElement("a");a.href=c;return{protocol:a.protocol.replace(":",""),hostname:a.hostname,port:a.port,pathname:"/"===a.pathname?"":a.pathname,search:a.search,hash:a.hash.substr(a.hash.indexOf("#")+1,a.hash.length),host:a.host}}}});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-collaborative-editor-plugin:confluence-collaborative-editor-plugin-resources', location = '/js/util/location-provider.js' */
define("confluence-collaborative-editor-plugin/util/location-provider",["window"],function(a){return{getLocation:function(){return a.location}}});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-collaborative-editor-plugin:confluence-collaborative-editor-plugin-resources', location = '/js/util/editor-format-fixer.js' */
define("confluence-collaborative-editor-plugin/util/editor-format-fixer",["underscore","confluence/meta","confluence-collaborative-editor-plugin/util/url-parser"],function(q,p,k){var r=function(a){a=a.querySelectorAll("a[data-linked-resource-id][data-linked-resource-type\x3d'userinfo'][userkey]");Array.prototype.forEach.call(a,function(n){n.removeAttribute("data-linked-resource-id")});return a.length};return{fixStaleBaseUrl:function(a){var n=0;for(var l=p.get("base-url"),f=k.parseUrl(l),g=a.querySelectorAll("img[data-base-url]"),
h=0;h<g.length;h++){var b=g[h],c=k.parseUrl(b.attributes["data-base-url"].value);if(!q.isEqual(c,f)){var d=b.attributes.src.value,e=b.attributes["data-image-src"].value.replace(c.pathname,f.pathname);c=d.replace(c.pathname,f.pathname);b.setAttribute("data-base-url",l);b.setAttribute("data-image-src",e);b.setAttribute("src",c);n++}}l=0;f=k.parseUrl(p.get("base-url"));g=a.querySelectorAll("img[data-macro-name\x3d'view-file']");for(h=0;h<g.length;h++)for(b=g[h],e=b.attributes.src.value,c=["/rest/documentConversion/latest/",
"/plugins/servlet/confluence/placeholder/unknown-attachment?"],d=0;d<c.length;d++){var m=e.indexOf(c[d]);-1!=m&&e.substr(0,m)!==f.pathname&&(m=f.pathname+e.substr(m),b.setAttribute("src",m),l++)}f=0;g=p.get("base-url");h=k.parseUrl(g);a=a.querySelectorAll("a[data-base-url][href][data-linked-resource-type\x3d'page'],a[data-base-url][href][data-linked-resource-type\x3d'blogpost'],a[data-base-url][href][data-linked-resource-type\x3d'comment'],a[data-base-url][href][data-linked-resource-type\x3d'space'],a[data-base-url][href][data-linked-resource-type\x3d'attachment'],a[data-base-url][href][data-linked-resource-type\x3d'custom']");
for(b=0;b<a.length;b++)e=a[b],c=k.parseUrl(e.attributes["data-base-url"].value),q.isEqual(c,h)||(d=k.parseUrl(e.attributes.href.value),c=g+d.pathname.replace(c.pathname,"")+d.search+(d.hash?"#"+d.hash:""),e.setAttribute("data-base-url",g),e.setAttribute("href",c),f++);return n+l+f},fixMentions:function(a){return r(a)}}});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-collaborative-editor-plugin:confluence-collaborative-editor-plugin-resources', location = '/js/synchrony-handlers.js' */
define("confluence-collaborative-editor-plugin/synchrony-handlers","underscore jquery ajs confluence/meta confluence/analytics-support confluence/legacy confluence-editor/editor/page-editor-message confluence-collaborative-editor-plugin/lib/SyncManager confluence-collaborative-editor-plugin/synchrony-util confluence-collaborative-editor-plugin/synchrony-content confluence-collaborative-editor-plugin/synchrony-presence confluence-collaborative-editor-plugin/util/location-provider confluence-collaborative-editor-plugin/util/url-parser confluence-collaborative-editor-plugin/util/editor-format-fixer confluence-collaborative-editor-plugin/editor-blanket confluence/api/event window".split(" "),
function(I,k,f,g,J,p,z,K,l,m,L,M,y,A,N,c,q){function B(a,b){b.contributors&&(C=b.contributors,c.unbind(a,B))}function O(a){w=!0;u.val(a.rev.toString())}function P(a){u.val(a.rev.toString());c.trigger("synchrony.entity.ack",{pendingChanges:0<a.pending.length})}function Q(){v.onDisconnectedState();f.log("Synchrony disconnected!")}function R(a){if("null/no-such-sequence"===a.errorType||"null/entity-evicted"===a.errorType||"hub.error/locked"===a.errorType){c.trigger("analyticsEvent",{name:"confluence.editor.data.evicted.error",
data:{errorType:a.errorType,onLoad:!w,afterReload:null!==q.sessionStorage.getItem(x())}});e.destroy();c.trigger("synchrony.history.evicted");a=null===q.sessionStorage.getItem(x());var b=w?"\u003cb\u003eWe couldnt sync your changes\u003c/b\u003e\u003cbr/\u003eCopy the changes you want to keep, then refresh the page to continue editing.":a?"Reloading this page to get it back in sync.":"\u003cb\u003eIts taking a while to sync this page\u003c/b\u003e\u003cbr/\u003eGive it a minute, then refresh the page to start editing. Contact your Confluence admin if this keeps happening.";c.trigger("editor.error.message",{disablePublish:!0,close:"never",message:b});if(w)v.onDisconnectedState();
else N.showBlanket("block"),a&&(q.sessionStorage.setItem(x(),"false"),q.location.reload());S()}else"fatal"===a.level&&c.trigger("editor.error.message",{disablePublish:!0})}function S(){q.onerror=function(a,b,d,r,t){if(!(b||d||r||t)){if(D)return!0;D=!0}else if(t&&t.message&&"entity destroyed"===t.message)return!0;return!1}}function x(){return"_reload_for_"+g.get("draft-id")}function T(a){l.timeEnd("confluence.editor.synchrony.connect");f.log("Synchrony connected.");L.appendTo(a.sid,e,C);v.onConnectedState(e);
c.trigger("synchrony.connected");m.fixTinymceCaretContainer(n,h);q.sessionStorage.removeItem(x())}function E(a,b,d){return{origin:"synchrony",cause:a,messageKey:b,disablePublish:d}}function U(a){function b(r){r.pending.length||(e.off("ack",b),u.val(r.rev.toString()),d.resolve(a))}var d=k.Deferred();e.ackState().pending.length?(e.on("ack",b),setTimeout(function(){e.off("ack",b);d.reject(E("timeout"))},5E3)):d.resolve(a);return k.when(d,F).promise()}function G(a){return(a=l.getLatestRevisionWithAttr(a.revisions,
"user"))?a.meta.user:"Anonymous"}function V(a){z.handleMessage("editor.synchrony.page-published",{type:"info",message:f.format("{0} published this page.",f.escapeHtml(a)),close:"auto"});c.trigger("analyticsEvent",{name:"confluence.synchrony.external-changes.publish"});c.trigger("editor-shared-drafts-published")}function W(a){if("remote"===a.updateType){u.val(a.revisions[a.revisions.length-1].rev.toString());l.hasRevisionTrigger(a.revisions,"reset")&&(z.handleMessage("editor.synchrony.revert-page",
{type:"info",message:f.format("{0} reverted to a previous version of this page.",f.escapeHtml(G(a)))}),g.set("has-collaborated",!1),H(),c.trigger("analyticsEvent",{name:"confluence.synchrony.external-changes.revert"}),c.trigger("editor-shared-drafts-discarded"),p.Editor.heartbeat());l.hasRevisionTrigger(a.revisions,"publish")&&(m.isUnpublished()&&(g.set("new-page",!1),g.set("page-id",p.getContentId()),g.set("draft-id","0"),p.Editor.isLimitedModeEnabled()||p.Editor.UI.setButtonState(!0,k("#rte-button-discard"))),
g.set("has-collaborated",!1),H(),V(G(a)),p.Editor.heartbeat());l.hasRevisionType(a.revisions,"external")&&c.trigger("editor.external.change");var b=l.getLatestRevisionWithAttr(a.revisions,"confVersion");b&&b.meta.confVersion&&(k('meta[name\x3d"page-version"]').attr("content",b.meta.confVersion),k('meta[name\x3d"ajs-page-version"]').attr("content",b.meta.confVersion),g.set("page-version",b.meta.confVersion))}setTimeout(function(){if("init"===a.updateType||"remote"===a.updateType)c.trigger("editor.remote.change"),
m.readTitleFromRootElement(n);"init"==a.updateType&&(X(M.getLocation())?h.undoManager.ignore(function(){var d=A.fixStaleBaseUrl(n);0<d&&J.publish("collab.edit.format.stale.fix.count",{staleformatfixed:d})}):f.log("Request url does not match the configured base url. Not performing fixStaleBaseUrl()."),h.undoManager.ignore(function(){A.fixMentions(n)}));m.fixTinymceCaretContainer(n,h);"local"===a.updateType&&(h.undoManager.hasUndo()||h.setDirty(!1),c.trigger("editor.local.change"))},0)}function H(){0===
e.ackState().pending.length&&h.setDirty(!1)}function X(a){var b=g.get("context-path"),d=y.parseUrl(g.get("base-url"));a=y.parseUrl(a);b=y.parseUrl(a.protocol+"://"+a.host+b);return I.isEqual(d,b)}var u,v,h,n,e,F,C=[],w=!1,D=!1;c.bind("editor-heartbeat",B);return{handle:function(a,b,d,r){l.time("confluence.editor.synchrony.connect");e=a;h=b;v=d;F=r.pipe(null,function(t){e.destroy();v.onDisconnectedState();return E(t,"collaborative-editor-load-failure",!0)});u=k("#syncRev");n=h.getBody();e.on("init",
O).on("update",W).on("ack",P).on("connected",T).on("disconnected",Q).on("error",R);new K(e,{DEBUG_MODE:!0});m.bindPostPasteFix();m.readTitleFromRootElement(n);p.Editor.overrideBeforeSave(U);k("#content-title").keyup(m.writeTitleToRootElement)}}});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-collaborative-editor-plugin:confluence-collaborative-editor-plugin-resources', location = '/js/synchrony-editor.js' */
define("confluence-collaborative-editor-plugin/synchrony-editor","window jquery ajs confluence/legacy confluence-collaborative-editor-plugin/editor-blanket confluence-collaborative-editor-plugin/synchrony-util confluence-collaborative-editor-plugin/synchrony-content confluence-collaborative-editor-plugin/synchrony-auth confluence-collaborative-editor-plugin/synchrony-entity confluence-collaborative-editor-plugin/synchrony-handlers confluence-editor/support/atlassian-editor-support confluence-editor/loader/collaborative-helper".split(" "),
function(t,g,d,p,I,f,y,H,J,T,U,V){function z(a){g('meta[name\x3d"ajs-collaborative-editor-status"]').attr("content",a)}function W(){return!d.Rte.isQuickEdit}function X(){var a=g.Deferred();d.$(function(){d.$("body").addClass("synchrony-active");A=new (require("confluence-collaborative-editor-plugin/status-indicator-view"))({el:"#pluggable-status",model:new Backbone.Model({minActiveTime:500})});H.init(A);a.resolve()});return a}function B(a){if(!0!==K){switch(a){case "timeout":a="The editor didn\u0027t load this time";
var b="The connection timed out. If it happens again, speak to your Confluence admin. You may be using a proxy server that prevents WebSocket connections.\u003c/br\u003e\u003ca href=\u0022#\u0022 id=\u0022websocketRetry\u0022\u003eTry again\u003c/a\u003e&nbsp;.&nbsp;\u003ca href=\u0022https://confluence.atlassian.com/display/CONFKB/Confluence+throws+The+editor+didn%27t+load+this+time+error+when+trying+to+edit+a+page\u0022 target=\u0022_blank\u0022 id=\u0022websocketFindmore\u0022\u003eFind out more\u003c/a\u003e";break;case "synchrony-requests":C=!0;a="";b="Something went wrong after loading the editor. Copy your unsaved changes and refresh the page to keep editing.";break;case "limited-mode":C=!0;a="";b="Something went wrong while loading the editor, please try again.";break;default:C=!0,a="",b="This page is taking longer to load than usual. Give it a few moments, then try refreshing. Still having issues? Contact your Confluence admin."}d.trigger("editor.error.message",{title:a,messageKey:"collaborative-editor-load-failure",message:b,disablePublish:!0,close:"manual"})}}
function L(){d.trigger("dismiss.editor.error.message",{messageKey:"collaborative-editor-load-failure",enablePublish:!0})}function M(a,b){var c=g.Deferred();a.done(function(){f.timeEnd(b)},c.resolve);a.fail(c.resolve);return c.promise()}function N(a,b){var c="error"===b[1]&&b[0].responseText?JSON.parse(b[0].responseText):"",e=!1;"invalid-ancestor"===c.type?e="synchrony":"out-of-order-revision"===c.type&&(e="confluence");return e?(d.log("Performing synchrony recovery"),g.ajax({url:d.contextPath()+"/rest/synchrony/1.0/content/"+
p.getContentId()+"/recovery?behind\x3d"+e+"\x26conflictingRev\x3d"+c["conflicting-rev"],type:"PUT"}),"synchrony-requests"):"success"!==b[1]&&"success"!==a[1]||"success"!==b[1]&&"duplicate-mismatch"!==c.type?(d.trigger("analyticsEvent",{name:"confluence.synchrony.client.content.reconciliation.failure",data:{type:c.type,contentId:p.getContentId()}}),"synchrony-requests"):!1}function O(a){return H.performRequest(function(b){f.time("confluence.editor.synchrony.snapshot");return M(g.ajax({type:"POST",
url:encodeURI(f.getServiceUrl()+"/data"+f.getEntityId()+"?state-at\x3d@head\x26state-format\x3dtype-tagged\x26rewrite-request\x3dtrue\x26cached\x3d"+a),contentType:"text/plain",dataType:"json",data:JSON.stringify({headers:{"content-type":"application/json","x-token":b},method:"GET"})}).pipe(f.asArray,f.asArray),"confluence.editor.synchrony.snapshot")})}function Y(a){return a.syncRev||!y.isUnpublished()||0!==a.raw.length&&!/^\s+$/.test(a.raw)?y.isContentEmpty(a.raw)?(d.trigger("analyticsEvent",{name:"confluence.synchrony.client.content.reconciliation.blank-content",
data:{contentId:p.getContentId()}}),g.Deferred().resolve([{},"success"])):H.performRequest(function(b){f.time("confluence.editor.synchrony.CR");return M(g.ajax({type:"POST",url:encodeURI(f.getServiceUrl()+"/data"+f.getEntityId()+"?optimistic\x3dtrue\x26rewrite-request\x3dtrue"),dataType:"json",contentType:"text/plain",data:JSON.stringify({body:{ancestor:a.syncRev,rev:a.confRev,state:{format:"html",value:a.html},merges:{master:{meta:{type:"client-reconciliation"}}}},headers:{"content-type":"application/json",
"x-token":b},method:"PUT"})}).pipe(f.asArray,f.asArray),"confluence.editor.synchrony.CR")}):g.Deferred().resolve([{},"success"])}function Z(a){f.time("confluence.editor.synchrony");g.when(Date.now(),a).pipe(function(b){z("on");var c=Date.now();d.trigger("analyticsEvent",{name:"confluence.synchrony.editor.loaded",data:{durationMillis:c-b,contentId:p.getContentId()}});d.trigger("rte-collab-ready");f.timeEnd("confluence.editor.synchrony");f.timeEnd("confluence.editor")})}function aa(){var a=D("synchrony.connected synchrony.connected.fake");
D("synchrony.connected synchrony.connected.fake synchrony-unsupported-extension",3E4).fail(function(b){B(b);d.trigger("analyticsEvent",{name:"confluence.synchrony.editor.load.timeout",data:{contentId:p.getContentId()}});ba();P=!0;a.done(function(){C||(Q=!0,L())})})}function ca(a,b,c){var e=m._initialiseSynchrony(),l=D("synchrony.connected.fake"),h=D(null);b.pipe(function(){setTimeout(h.reject,3E4,"synchrony-requests")});var q=m._initialiseCollabEditingComponents(h),r=Date.now(),u=null,E=null;d.DarkFeatures.isEnabled("synchrony-pessimistic-snapshot")||
(u=e.pipe(function(){return O(!0)}),u.done(function(k){E=k[1]}));var v=g.when(a,e).pipe(function(){return!u||"rejected"===u.state()||"error"===E||6E5<Date.now()-r?O(!1):u});c.pipe(function(){aa();Z(l);I.applyBlanket(l)});b.pipe(function(k){var F=e.pipe(function(){return Y(k)});v=g.when(v,e).pipe(function(n,w){f.time("confluence.editor.synchrony.unmarshal");var R=n;"success"===n[1]&&(R=[{stateAt:n[0].stateAt,state:w.unmarshal(n[0].state.value)},n[1]]);f.timeEnd("confluence.editor.synchrony.unmarshal");
return R});g.when(v,F).pipe(function(n,w){(n=N(n,w))?h.reject(n):h.resolve()});return d.DarkFeatures.isEnabled("synchrony-pessimistic-CR")||"synchrony-ack"!==k.syncRevSource&&!y.isUnpublished()?g.when(k,c,v,F,q):(d.debug("confluence.editor.synchrony: content up to date, not waiting for CR"),h.fail(B),g.when(k,c,v,[{},"success"],q))}).pipe(function(k,F,n,w){if(!m._bindEditor(k,F,n,w,h))return d.trigger("analyticsEvent",{name:"confluence.synchrony.bind.failure",data:{contentId:p.getContentId()}}),g.Deferred().reject("editor-binding-failed");
l.resolve()}).fail(function(k){c.always(function(){"synchrony-not-enabled"!==k&&(d.log("Failed to load the collaborative editor",k),B(k),d.$(function(){A.onDisconnectedState()}),z("failed"),d.trigger("analyticsEvent",{name:"confluence.synchrony.error",data:{error:k,contentId:p.getContentId()}}))})})}function D(a,b,c){var e=g.Deferred();a&&d.bind(a,function r(h,q){d.debug("confluence.editor.synchrony.event: "+h.type+"."+h.namespace);d.unbind(a,r);e.resolve(q)});b&&setTimeout(e.reject,b,c||"timeout");
return e}function x(a,b,c,e,l){var h=l||g.Deferred();if(f.isEditorInitialised()||b&&f.synchronyReady())return S(h,c);d.bind(a,function E(r,u){d.debug("confluence.editor.event "+r.type+"."+r.namespace);h.always(function(){d.unbind(a,E)});S(h,c,u,e)});return h}function S(a,b,c,e){return f.synchronyReady()?!e||e()?(b=b?b(c):c)&&b.error?a.reject(b.error):a.resolve(b):a:a.reject("synchrony-not-enabled")}function ba(){g("#websocketRetry").on("click",function(){d.trigger("analyticsEvent",{name:"confluence.synchrony.editor.websocket.retry.click"});
t.location.reload();return!1});g("#websocketFindmore").on("click",function(){d.trigger("analyticsEvent",{name:"confluence.synchrony.editor.websocket.findmore.click"})})}var m={};f.time("confluence.editor.synchrony.jsLoad");var A,C=!1,K=!1,Q=!1,P=!1,G;g(t).bind("beforeunload",function(){Q||d.trigger("analyticsEvent",{name:"confluence.synchrony.exit.before.connecting",data:{afterTimeout:P,contentId:p.getContentId()}})});d.bind("synchrony.history.evicted",function(a){K=!0});m._bindEditor=function(a,
b,c,e,l){f.time("confluence.editor.synchrony.init");if(N(c,e))return null;e=g("#syncRev");var h=null;"success"===c[1]&&(c=c[0],h={base:{rev:Synchrony.rev(c.stateAt),state:c.state}},e.val(h.base.rev.toString()));d.log("Synchrony will load with contentId: ",p.getContentId());try{var q=b.getBody();q.setAttribute("data-title",a.title);G=J.bind(Synchrony,b,q,h,a);T.handle(G,b,A,l);d.trigger("editor.remote.change");b.setDirty(!1);f.timeEnd("confluence.editor.synchrony.init");return G}catch(r){return d.logError(r),
null}};m._initialiseCollabEditingComponents=function(a){var b=X();g(t).one("synchrony.connected.fake",function(c){"connected.fake"===c.namespace&&(b.resolve(),a.resolve(),L(),z("fake"))});return b};m._initialiseSynchrony=function(){f.time("confluence.editor.synchrony.deps");(function(b){var c=b.Synchrony=b.Synchrony||{};if(!c.ready){var e=c._cbs=c._cbs||[];c.ready=function(q){e.push(q)}}var l=function(){1===c.state&&(c.SockJS=b.SockJS,c.init())};if(b.SockJS)c.init&&l();else{var h=b._sockjs_onload;
b._sockjs_onload=function(){l();h&&h.apply(this,arguments)}}})(t);var a=g.Deferred();Synchrony.ready(a.resolve);return g.when(a.promise(),f.loadScript(["/js/vendor/sockjs.min.js","/js/synchrony.min.js"])).pipe(function(b){f.timeEnd("confluence.editor.synchrony.deps");d.log("Synchrony successfully initialised.");return b})};m.init=function(){if(U.isCollaborativeContentType()){var a=x("rte-quick-edit-init rte-collaborative-content-ready rte-initial-raw-content-ready",!0),b=x("rte-quick-edit-init rte-collaborative-content-ready rte-initial-raw-content-ready rte-collab-editor-loaded",
!1),c=x("rte-collaborative-content-ready rte-initial-raw-content-ready",!1,y.getContent),e=x("rte-collab-editor-loaded",!1,d.Rte.getEditor);e=x("rte-ready rte-begin-collab-editing",!1,d.Rte.getEditor,W,e);a.pipe(function(){ca(b.promise(),c.promise(),e.promise())});c.fail(B);d.trigger("synchrony-events-bound");e.fail(function(l){"synchrony-not-enabled"===l&&(I.showEditor(),z("off"),d.log("Synchrony is not available in this context."))})}};m.register=function(){V.registerPlugin(m)};m.getSynchronisedEditorContent=
function(){var a=G.ackState();if(a.rev){var b=Synchrony.makeDom(a.state,{document,whitelist:J.makeWhitelist(Synchrony)});return{content:require("tinymce").activeEditor.serializer.serialize(b),syncRev:a.rev.toString()}}d.logError("Synchrony hasn't acked any data, can't fetch draft data");return null};f.timeEnd("confluence.editor.synchrony.jsLoad");return m});require("confluence/module-exporter").safeRequire("confluence-collaborative-editor-plugin/synchrony-editor",function(t){t.register();t.init()});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.web.resources:trigger', location = '/includes/js/trigger.js' */
define("confluence/trigger",["jquery","window"],function(b,c){return function(a,d){a=new b.Event(a);b(d||c.top.document).trigger(a);return!a.isDefaultPrevented()}});require("confluence/module-exporter").exportModuleAsGlobal("confluence/trigger","AJS.jiraTrigger");
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.web.resources:keyboard', location = '/includes/js/api/keyboard.js' */
define("confluence/api/keyboard",["jquery"],function(f){function b(a,b,c){h[b]=a;i[a]=b;c&&(j[b]=!0);return a}function g(a){a=a.originalEvent||a;return null==a.which?a.keyCode:0!==a.which&&0!==a.charCode?a.which:null}function k(a){var a=a.originalEvent||a,b=e.specialKeyEntered(a);if(b)return b;if(f.browser.mozilla){if("keypress"===a.type&&(a=g(a),null!==a))return String.fromCharCode(a).toLowerCase()}else if("keypress"!==a.type)return String.fromCharCode(a.keyCode).toLowerCase()}var e={},h={},i={},
j={},c=e.SpecialKey={BACKSPACE:b("backspace",8,!0),TAB:b("tab",9,!0),RETURN:b("return",13,!0),SHIFT:b("shift",16),CTRL:b("ctrl",17),ALT:b("alt",18),PAUSE:b("pause",19),CAPS_LOCK:b("capslock",20),ESC:b("esc",27,!0),SPACE:b("space",32,!0),PAGE_UP:b("pageup",33),PAGE_DOWN:b("pagedown",34),END:b("end",35),HOME:b("home",36),LEFT:b("left",37),UP:b("up",38),RIGHT:b("right",39),DOWN:b("down",40),INSERT:b("insert",45),DELETE:b("del",46),F1:b("f1",112),F2:b("f2",113),F3:b("f3",114),F4:b("f4",115),F5:b("f5",
116),F6:b("f6",117),F7:b("f7",118),F8:b("f8",119),F9:b("f9",120),F10:b("f10",121),F11:b("f11",122),F12:b("f12",123),NUMLOCK:b("numlock",144),SCROLL:b("scroll",145),META:b("meta",224)};c.eventType=function(){return f.browser.mozilla?"keypress":"keydown"};c.fromKeyCode=function(a){return h[a]};c.toKeyCode=function(a){return i[a]};c.isAscii=function(a){return!!j[a]};c.isSpecialKey=function(a){return!!c.toKeyCode(a)};e.characterEntered=function(a){a=a.originalEvent||a;if("keypress"===a.type&&(a=g(a),
null!==a&&(!c.isAscii(a)||c.fromKeyCode(a)===c.SPACE)))return String.fromCharCode(a)};e.specialKeyEntered=function(a){a=a.originalEvent||a;if(f.browser.mozilla){if("keypress"===a.type){var b=g(a);if(null===b)return c.fromKeyCode(a.keyCode);if(c.isAscii(b))return c.fromKeyCode(b)}}else if("keypress"!==a.type)return c.fromKeyCode(a.keyCode)};e.shortcutEntered=function(a){a=a.originalEvent||a;if(a.type===e.SpecialKey.eventType()){var b=e.specialKeyEntered(a),d="";a.altKey&&b!==c.ALT&&(d+=c.ALT+"+");
a.ctrlKey&&b!==c.CTRL&&(d+=c.CTRL+"+");a.metaKey&&(!a.ctrlKey&&b!==c.META)&&(d+=c.META+"+");a.shiftKey&&b!==c.SHIFT&&(d+=c.SHIFT+"+");if(b)return d+b;if(0<d.length&&"shift+"!==d&&(a=k(a)))return d+a}};return e});require("confluence/module-exporter").exportModuleAsGlobal("confluence/api/keyboard","AJS.Keyboard");
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.web.resources:jira-controls', location = '/includes/js/class.js' */
define("confluence/class",["jquery"],function(f){var j=function(d){var a=function(){};a.prototype=d;return new a},i=!1,l=/xyz/.test(function(){xyz})?/\b_super\b/:/.*/,k=function(){};k.extend=function(){function d(){!i&&this.init&&this.init.apply(this,arguments)}var a,g=this.prototype;if(1<arguments.length){var c=f.makeArray(arguments);a=c.pop();var h;f.each(c,function(b,a){h=h?h.extend(a):a});return h.extend(this.prototype).extend(a)}a=arguments[0];i=!0;c=new this;i=!1;for(var b in a)if(c[b]="function"===
typeof a[b]&&"function"===typeof g[b]&&l.test(a[b]))c[b]=function(a,b){return function(){var c=this._super;this._super=g[a];var d=b.apply(this,arguments);this._super=c;return d}}(b,a[b]);else if("object"===typeof g[b]){var e=j(a[b]);f.each(g[b],function(a,b){if(e[a]){if("object"===typeof e[a]){var c=j(e[a]);f.each(b,function(a,b){c[a]||(c[a]=b)});e[a]=c}}else e[a]=b});c[b]=e}else c[b]=a[b];d.prototype=c;d.constructor=d;d.extend=arguments.callee;return d};return k});
require("confluence/module-exporter").exportModuleAsGlobal("confluence/class","Class");
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.web.resources:jira-controls', location = '/includes/js/control.js' */
define("confluence/control","confluence/class confluence/trigger confluence/api/logger confluence/api/keyboard jquery document".split(" "),function(k,l,i,g,d,e){return k.extend({INVALID:"INVALID",_throwReadOnlyError:function(a){Error(this.CLASS_SIGNATURE+": Sorry ["+a+"] is a read-only property")},_assignEvents:function(a,b){this._unassignEvents(a,b);if(typeof b==="string")for(var c in this._events[a])d(e).delegate(b,c,this._getDispatcher(a,c));else{b=d(b);for(c in this._events[a]){b.bind(c,this._getDispatcher(a,
c));i.debug("Control bound eventType '"+c+"' for group '"+a+"' on target '"+(b[0].type||b[0])+"'")}}},_unassignEvents:function(a,b){if(typeof b==="string")for(var c in this._events[a])d(e).undelegate(b,c,this._getDispatcher(a,c));else{b=d(b);try{for(c in this._events[a])b.unbind(c,this._getDispatcher(a,c))}catch(g){var f=d._data(b[0],"events");if(f)for(c in f)if(c in this._events[a]){for(var m=this._getDispatcher(a,c),j=f[c],h=0;h<j.length;h++)if(j[h]===m){j.splice(h,1);break}i.debug("Control unbound eventType '"+
c+"' for group '"+a+"' on target '"+(b[0].type||b[0])+"'")}}}},_getDispatcher:function(a,b){var c=a+"/"+b;if(!this._dispatchers)this._dispatchers={};if(!this._dispatchers[c]){var e=this._events[a][b],f=this;this._dispatchers[c]=function(c){i.debug("Control dispatching eventType '"+b+"' for group '"+a+"' on instance '"+f.type+"'");return e.call(f,c,d(this))}}return this._dispatchers[c]},_isValidInput:function(){return true},_handleKeyEvent:function(a){if(this._isValidInput(a)){var b=g.SpecialKey,c=
g.shortcutEntered(a);if(c){if(this.keys[c]){this.keys[c].call(this,a);return}if((c===b.BACKSPACE||c===b.DELETE)&&this.keys.onEdit){this.keys.onEdit.call(this,a);return}}(b=g.characterEntered(a))&&this.keys.onEdit&&this.keys.onEdit.call(this,a,b)}},getCustomEventName:function(a){return(this.CLASS_SIGNATURE||"")+"_"+a},_getCustomEventArgs:function(){return[this]},trigger:function(a){return l(a,this)},_supportsBoxShadow:function(){var a=e.body.style;return a.WebkitBoxShadow!==void 0||a.MozBoxShadow!==
void 0||a.boxShadow!==void 0},_setOptions:function(a){var b,c,a=a||{};if(a instanceof d||typeof a==="string"||typeof a==="object"&&a.nodeName)a={element:a};b=d(a.element);c=b.getOptionsFromAttributes();this.options=d.extend(true,this._getDefaultOptions(a),c,a);if(b.length===0)return this.INVALID},getCaret:function(a){var b=a.selectionStart;if(b>=0)return a.selectionEnd>b?-1:b;if(e.selection){b=e.selection.createRange();if(b.text.length===0){var c=b.duplicate();c.moveToElementText(a);c.setEndPoint("EndToStart",
b);return c.text.length}}return-1},_render:function(){var a,b=arguments[0],c=[];for(a=1;a<arguments.length;a++)c.push(arguments[a]);return this._renders[b].apply(this,c)}})});require("confluence/module-exporter").exportModuleAsGlobal("confluence/control","AJS.Control");
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.web.resources:jira-controls', location = '/includes/js/api/mouse.js' */
define("confluence/api/mouse",["jquery","window"],function(d,e){var b={MotionDetector:function(){this.reset()}};b.MotionDetector.prototype.reset=function(){this._y=this._x=this._handler=null;this.moved=!1};b.MotionDetector.prototype.wait=function(b){var a=this;a._handler||(this.reset(),d(e.top.document).bind("mousemove",a._handler=function(c){!a._x&&!a._y?(a._x=c.pageX,a._y=c.pageY):c.pageX===a._x&&c.pageY===a._y||(a.unbind(),a.moved=!0,b&&b.call(this,c))}))};b.MotionDetector.prototype.unbind=function(){this._handler&&
(d(e.top.document).unbind("mousemove",this._handler),this.reset())};return b});require("confluence/module-exporter").exportModuleAsGlobal("confluence/api/mouse","AJS.Mouse");
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.web.resources:jira-controls', location = '/includes/js/group.js' */
define("confluence/group",["confluence/control","confluence/api/logger","jquery"],function(d,e,c){return d.extend({init:function(){this.type=this.type||"Group";this.items=[];this.index=-1;this._assignEvents("instance",this)},addItem:function(a){this.items.push(a);this._assignEvents("item",a)},removeItem:function(a){var b=c.inArray(a,this.items);if(0>b)throw Error("Group: item ["+a+"] is not a member of this group");a.trigger("blur");b<this.index&&this.index--;this.items.splice(b,1);this._unassignEvents("item",
a)},removeAllItems:function(){for(var a=0;a<this.items.length;a++)this._unassignEvents("item",this.items[a]),this.items[a].trigger("blur");this.index=-1;this.items.length=0;this._unassignEvents("keys",document)},shiftFocus:function(a){e.debug("Group.shiftFocus called with offset: "+a);-1===this.index&&1===a&&(a=0);0<this.items.length&&(a=(Math.max(0,this.index)+this.items.length+a)%this.items.length,this.items[a].trigger("focus"))},prepareForInput:function(){this._assignEvents("keys",document)},_events:{instance:{focus:function(){0!==
this.items.length&&(0>this.index?this.items[0].trigger("focus"):this._assignEvents("keys",document))},blur:function(){0<=this.index?this.items[this.index].trigger("blur"):this._unassignEvents("keys",document)}},keys:{"keydown keypress":function(a){this._handleKeyEvent(a)}},item:{focus:function(a){var b=this.index;this.index=c.inArray(a.target,this.items);0>b?this.trigger("focus"):b!==this.index&&this.items[b].trigger("blur")},blur:function(a){this.index===c.inArray(a.target,this.items)&&(this.index=
-1,this.trigger("blur"))},remove:function(a){this.removeItem(a.target)}}},keys:{}})});require("confluence/module-exporter").exportModuleAsGlobal("confluence/group","AJS.Group");
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.web.resources:jira-controls', location = '/includes/js/select-grid.js' */
define("confluence/select-grid",["ajs","jquery","confluence/templates","confluence/group","confluence/control"],function(g,d,j,e,m){var e=e.extend({init:function(a){this.type=this.type||"SelectGrid";this._super();var b=d(j.SelectGrid.gridOutline()),c=b.find("thead tr");d(a.columns).each(function(a,b){var f=d("<th></th>").addClass(b.getClassName()).text(b.heading);c.append(f)});this.gridContainer=d(a.gridContainer).append(b);this.getRowId=a.getRowId;this.table=b;this.columns=a.columns;this.selectionCallback=
a.selectionCallback;this.body=b.find("tbody");this.body.delegate("a","click",function(a){a.preventDefault()});this.dontShiftFocus=a.dontShiftFocus||function(){}},keys:{up:function(a){this.table.is(":visible")&&!this.dontShiftFocus()&&(this.shiftFocus(-1),a.preventDefault())},down:function(a){this.table.is(":visible")&&!this.dontShiftFocus()&&(this.shiftFocus(1),a.preventDefault())}},_addRow:function(a,b,c,h){d.isFunction(c)&&(h=c,c=!1);c?this.body.prepend(a):this.body.append(a);a=new n({row:a,data:b,
callback:h,getRowId:this.getRowId,selectionCallback:h});this.addItem(a);return a},clear:function(){this.removeAllItems();this.body.children().remove()},_addRows:function(a,b){var c=this,h=[];d(a).each(function(a,f){var g=c.columns,e,i,k,l;e=d("<tr></tr>");d(g).each(function(a,b){i={outerClass:b.getClassName(f)||"",href:b.getHref&&b.getHref(f)||"",innerClass:b.getInnerClass&&b.getInnerClass(f)||"",title:b.getTitle&&b.getTitle(f)||"",text:b.getText(f)||""};k=i.href?"cellWithLink":"cellWithoutLink";
l=j.SelectGrid[k](i);e.append(l)});e.attr("data-id",c.getRowId(f));h.push(c._addRow(e,f,b,c.selectionCallback))});return h},update:function(a){this.clear();!a||!a.length?g.debug("SelectGrid.update called with no data, returning."):(this._addRows(a),this.prepareForInput())},prependAndSelect:function(a,b){!a||!a.length?g.debug("SelectGrid.prependAndSelect called with no data, returning."):this._addRows(a,!0)[b||0].selectRow()},findItem:function(a){for(var b=0;b<this.items.length;b++)if(this.items[b].getRowId()==
a)return this.items[b];g.debug("SelectGrid.findItem didn't find item, returning null.");return null},select:function(a){(a=this.findItem(a))&&a.selectRow()},selectIndex:function(a){a=a||0;this.items[a]?this.items[a].selectRow():g.debug("SelectGrid.selectIndex couldn't select row with index "+a+", not found")},show:function(){this.gridContainer.removeClass("hidden")},hide:function(){this.gridContainer.addClass("hidden")},isVisible:function(){return!this.gridContainer.hasClass("hidden")}}),n=m.extend({init:function(a){this.type=
"SelectableRow";this.$row=d(a.row);this.$row.data("properties",a.data);this.getRowId=function(){return a.getRowId(a.data)};this.selectionCallback=a.selectionCallback;this._assignEvents("element",this.$row);this._assignEvents("instance",this);g.debug("SelectableRow initialized")},_events:{instance:{focus:function(){var a=this.$row;a.addClass("selected");this.selectionCallback(a,a.data("properties"))},blur:function(){this.$row.removeClass("selected")}},element:{click:function(){this.trigger("focus")}}},
selectRow:function(){this.trigger("focus")}});e.Column=function(a){var b=function(b){return b[a.key]};return{key:a.key,heading:a.heading,getClassName:a.getClassName||function(){return a.className||a.key+"-field"},getHref:a.getHref,getInnerClass:a.getInnerClass,getTitle:a.getTitle,getText:a.getText||b}};return e});require("confluence/module-exporter").exportModuleAsGlobal("confluence/select-grid","AJS.SelectGrid");
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.web.resources:jira-controls', location = '/includes/js/select-grid.soy' */
// This file was automatically generated from select-grid.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Confluence.Templates.SelectGrid.
 */

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Templates == 'undefined') { Confluence.Templates = {}; }
if (typeof Confluence.Templates.SelectGrid == 'undefined') { Confluence.Templates.SelectGrid = {}; }


Confluence.Templates.SelectGrid.gridOutline = function(opt_data, opt_ignored) {
  return '<table class="select-grid aui"><thead><tr class="data-table-header"></tr></thead><tbody></tbody></table>';
};
if (goog.DEBUG) {
  Confluence.Templates.SelectGrid.gridOutline.soyTemplateName = 'Confluence.Templates.SelectGrid.gridOutline';
}


Confluence.Templates.SelectGrid.cellWithLink = function(opt_data, opt_ignored) {
  return '<td class="' + soy.$$escapeHtml(opt_data.outerClass) + '"><a class="' + soy.$$escapeHtml(opt_data.innerClass) + '" href="' + soy.$$escapeHtml(opt_data.href) + '" title="' + soy.$$escapeHtml(opt_data.title) + '"><span>' + soy.$$escapeHtml(opt_data.text) + '</span></a></td>';
};
if (goog.DEBUG) {
  Confluence.Templates.SelectGrid.cellWithLink.soyTemplateName = 'Confluence.Templates.SelectGrid.cellWithLink';
}


Confluence.Templates.SelectGrid.cellWithoutLink = function(opt_data, opt_ignored) {
  return '<td class="' + soy.$$escapeHtml(opt_data.outerClass) + '"><span class="' + soy.$$escapeHtml(opt_data.innerClass) + '" title="' + soy.$$escapeHtml(opt_data.title) + '">' + soy.$$escapeHtml(opt_data.text) + '</span></td>';
};
if (goog.DEBUG) {
  Confluence.Templates.SelectGrid.cellWithoutLink.soyTemplateName = 'Confluence.Templates.SelectGrid.cellWithoutLink';
}

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.web.resources:jira-controls', location = '/includes/js/result-grid.js' */
define("confluence/result-grid",["ajs","jquery","confluence/control"],function(d,g,l){return l.extend({init:function(a){this.type=this.type||"ResultGrid";var c,f,k,h,j,e,i;f=a.gridContainer||g(a.baseElement).find(".data-table");f.length||d.debug("gridContainer for AJS.ResultGrid not found!");k=function(b){return b.id};c=new d.SelectGrid({gridContainer:f,columns:a.columns,selectionCallback:a.selectionCallback,getRowId:a.getRowId||k,dontShiftFocus:a.dontShiftFocus});e=a.messageHandler||d.MessageHandler({baseElement:g(a.baseElement).find(".message-panel")});
i=a.noResultMessage||"There are no results.";g.extend(this,{update:function(b,a){e.clearMessages();h&&(h(),j.remove(),h=null);c.clear();if(!b||!b.length){c.hide();var m=g.isFunction(i)?i(a):i;e.displayMessages(m);return!1}c.update(b);c.show();return!0},updateAndSelect:function(b,c,a){this.update(b,c)&&this.selectIndex(a)},prependAndSelect:function(b,a){!b||!b.length?d.debug("ResultGrid.prependAndSelect called with no data, returning."):(e.clearMessages(),c.prependAndSelect(b,
a),c.show())},select:function(b){c.select(b)},selectIndex:function(b){c.selectIndex(b)},clear:function(){e.clearMessages();c.hide()},loading:function(){c.show();var b=f.width(),a=f.height();this.clear();if(!h){var d,e;d=b/2-73;e=a/2-73;j=g("<div></div>").addClass("spinner-container").width(b-d).height(a-e).css({"padding-left":d,"padding-top":e}).insertAfter(f);h=Raphael.spinner(j[0],60,"#666")}},isVisible:function(){return c.isVisible()}})}})});
require("confluence/module-exporter").exportModuleAsGlobal("confluence/result-grid","AJS.ResultGrid");
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.web.resources:breadcrumbs-jquery', location = '/includes/js/breadcrumbs-jquery.js' */
define("confluence/breadcrumbs-jquery",["jquery","confluence/templates"],function(e,h){return function(a){var i=this,f=[],b=0,c=a.length-1,d=a[b],j=i.closest(".breadcrumbs-container").width(),g=function(){return i.width()<j};for(f.push(h.Dialog.breadcrumbItem({text:d.title,title:d.title,className:b===c?"last":""}));b++<c;)d=a[b],f.push(h.Dialog.breadcrumbItem({text:d.title,title:d.title,className:b===c?"last":""}));this.html(f.join(""));a=e("li a span",this);a.each(function(a){0!==a&&a!==c&&e(this).shortenUntil(g)});
e(a.get(0)).shortenUntil(g);e(a.get(c)).shortenUntil(g);return this}});require("confluence/module-exporter").exportModuleAsGlobal("confluence/breadcrumbs-jquery","jQuery.fn.renderBreadcrumbs");
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.web.resources:dialog-breadcrumbs', location = '/includes/js/dialog-breadcrumbs.js' */
define("confluence/dialog-breadcrumbs",["ajs","jquery","confluence/meta","confluence/templates"],function(b,d,e,k){var h={},l=function(a,e,f){var g=a.userName?a.userName:a.pageId?a.pageId+":"+a.fileName:a.spaceKey+":"+a.title+":"+a.postingDay+":"+a.fileName;g in h?e(h[g],"success"):d.ajax({type:"GET",dataType:"json",data:a,url:b.contextPath()+"/pages/breadcrumb.action",error:f||function(){},success:function(a,b){if(!a||!a.breadcrumbs)f(a,b);else{for(var c=d.makeArray(a.breadcrumbs);c[0]&&"userinfo"!==
a.type&&/peopledirectory\.action$/.test(c[0].url);)c.shift();"page"===a.type&&(c[1]&&/pages\.action/.test(c[1].url))&&c.splice(1,1);c.type=a.type;h[g]=c;e(c,b)}}})};return{getBreadcrumbsDefault:l,Breadcrumbs:function(a,h){var f=0;return{update:function(g,j){a.html(k.Dialog.breadcrumbLoading());var m=f+=1,c=function(){return m!==f?(b.debug("Breadcrumb response for ",g," is stale, ignoring."),!0):!1};(h||l)(g,function(f,h){if(!c())if("success"!==h||!f)a.html(k.Dialog.breadcrumbError());else{var i=g.spaceKey;
a.renderBreadcrumbs(f);if(!(i=i!==e.get("space-key")))a:{for(i=1;i<f.length;i++)if(f[i].title===e.get("page-title")){i=!1;break a}i=!0}i?(j.clearErrors(),d(j.moveButton).prop("disabled",!1)):(j.error("You cannot move a page to be underneath itself or its children."),d("li:last-child",a).addClass("warning"))}},function(d){c()||(a.html(k.Dialog.breadcrumbError()),404===d.status&&j.error("The specified page was not found."))})}}},getBreadcrumbsLegacy:function(a,e,f){if(!a.id)throw Error("id is a required parameter in 'options'");
if(!a.type)throw Error("type is a required parameter in 'options'");var g=a.id+":"+a.type;g in h?e(h[g],"success"):d.ajax({type:"GET",dataType:"json",data:a,url:b.contextPath()+b.REST.getBaseUrl()+"breadcrumb",error:f||function(){},success:function(a,b){if(!a||!a.breadcrumbs)f(a,b);else{for(var c=d.makeArray(a.breadcrumbs);c[0]&&"userinfo"!==a.type&&/peopledirectory.action$/.test(c[0].url);)c.shift();c.type=a.type;h[g]=c;e(c,b)}}})}}});
require("confluence/module-exporter").safeRequire("confluence/dialog-breadcrumbs",function(b){var d=require("ajs"),e=require("confluence/legacy");d.toInit(function(){d.MoveDialog||(d.MoveDialog={});d.MoveDialog.Breadcrumbs=b.Breadcrumbs;d.MoveDialog.getBreadcrumbs=b.getBreadcrumbsDefault;d.Breadcrumbs={};d.Breadcrumbs.getBreadcrumbs=b.getBreadcrumbsLegacy;e.Dialogs||(e.Dialogs={});e.Dialogs.Breadcrumbs=d.Breadcrumbs;e.Dialogs.Breadcrumbs.getBreadcrumbs=b.getBreadcrumbsLegacy;e.Dialogs.Breadcrumbs.Controller=
b.Breadcrumbs;e.Dialogs.Breadcrumbs.defaultGetBreadcrumbs=b.getBreadcrumbsDefault})});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.web.resources:dialog-breadcrumbs', location = '/includes/soy/dialog-breadcrumbs.soy' */
// This file was automatically generated from dialog-breadcrumbs.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Confluence.Templates.Dialog.
 */

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Templates == 'undefined') { Confluence.Templates = {}; }
if (typeof Confluence.Templates.Dialog == 'undefined') { Confluence.Templates.Dialog = {}; }


Confluence.Templates.Dialog.breadcrumbItem = function(opt_data, opt_ignored) {
  return '<li><a class="' + soy.$$escapeHtml(opt_data.className) + '" title="' + soy.$$escapeHtml(opt_data.title) + '" tabindex="-1"><span>' + soy.$$escapeHtml(opt_data.text) + '</span></a></li>';
};
if (goog.DEBUG) {
  Confluence.Templates.Dialog.breadcrumbItem.soyTemplateName = 'Confluence.Templates.Dialog.breadcrumbItem';
}


Confluence.Templates.Dialog.breadcrumbLoading = function(opt_data, opt_ignored) {
  return '<li class="loading"><span>' + soy.$$filterNoAutoescape('Loading breadcrumbs...') + '</span></li>';
};
if (goog.DEBUG) {
  Confluence.Templates.Dialog.breadcrumbLoading.soyTemplateName = 'Confluence.Templates.Dialog.breadcrumbLoading';
}


Confluence.Templates.Dialog.breadcrumbError = function(opt_data, opt_ignored) {
  return '<li class="warning last"><span>' + soy.$$escapeHtml('Error retrieving breadcrumbs.') + '</span></li>';
};
if (goog.DEBUG) {
  Confluence.Templates.Dialog.breadcrumbError.soyTemplateName = 'Confluence.Templates.Dialog.breadcrumbError';
}

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'confluence.web.resources:page-location', location = '/includes/js/page-location.js' */
define("confluence/page-location",["ajs","confluence/meta"],function(c,a){var b=null;return{get:function(){return b?b:{spaceName:a.get("space-name"),spaceKey:a.get("space-key"),parentPageTitle:a.get("parent-page-title")}},set:function(a){b=a}}});require("confluence/module-exporter").exportModuleAsGlobal("confluence/page-location","Confluence.PageLocation");
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.auiplugin:split_aui.splitchunk.vendors--8cfcf1af69', location = 'aui.chunk.a74d9dded03a92620c41--1fa67204f5c8e3af90cc.js' */
(window.__auiJsonp=window.__auiJsonp||[]).push([["aui.splitchunk.vendors--8cfcf1af69"],{iwe4:function(t,e,i){"use strict";i.r(e)},rNKm:function(t,e,i){var s,a,l;
/*! jQuery Fancy File Input plugin - v2.0.4 - 2018-11-23
* Copyright (c) 2018 Atlassian Pty Ltd; Licensed Apache-2.0 */void 0===(l=this)&&void 0!==window&&(l=window),s=[i("oDIA")],void 0===(a=function(t){return l.FancyFileInput=function(t){"use strict";var e=/^.*[\\\/]/,i=/\{0\}/gi,s=function(){var t=3,e=document.createElement("div"),i=e.getElementsByTagName("i");do{e.innerHTML="\x3c!--[if gt IE "+ ++t+"]><i></i><![endif]--\x3e"}while(i[0]);return t>4?t:document.documentMode}();function a(e,i){var s=t(e).data("FancyFileInput");if(s)return s;i=t.extend({},a.defaults,i),this.el=e,this.$el=t(e),this.$label=this.createLabel(i.buttonText),this._addLabelText(),this.$clearButton=t("<button>",{text:this.$label.attr("data-ffi-clearButtonText")||i.clearButtonText,class:"ffi-clear",type:"button",tabindex:"-1"}),this.multipleFileTextPattern=this.$label.attr("data-ffi-multipleFileTextPattern")||i.multipleFileTextPattern,this._eventNamespace=".ffi",this.CLASSES={disabled:"is-disabled",focused:"is-focused",active:"is-active",valid:"is-valid",invalid:"is-invalid"},this[this.isDisabled()?"disable":"enable"](),this.isFocused=!1}return a.defaults={buttonText:"Browse…",clearButtonText:"Clear",multipleFileTextPattern:"{0} files"},a.prototype._addLabelText=function(){var e=t('label[for="'+this.el.id+'"]');e.length&&this.$el.attr("aria-label",e.text())},a.prototype.createLabel=function(e){var i=this.$el.parent(".ffi[data-ffi-button-text]");return i.length||(i=this.$el.wrap(t("<label>",{class:"ffi","data-ffi-button-text":e})).parent()),i},a.prototype.isDisabled=function(){return this.$el.is(":disabled")},a.prototype.formatMultipleFileText=function(t){return this.multipleFileTextPattern.replace(i,t)},a.prototype.bindEvents=function(){this.$el.on("invalid"+this._eventNamespace,t.proxy(this.checkValidity,this)).on("change"+this._eventNamespace,t.proxy(this.change,this)).on("keydown"+this._eventNamespace,t.proxy(this.keydown,this)).on("mousedown"+this._eventNamespace,t.proxy(this.mousedown,this)).on("mouseup"+this._eventNamespace,t.proxy(this.mouseup,this)).on("focus"+this._eventNamespace,t.proxy(this.focus,this)).on("blur"+this._eventNamespace,t.proxy(this.blur,this)),this.$clearButton.on("click"+this._eventNamespace,t.proxy(this.clear,this))},a.prototype.unbindEvents=function(){this.$el.off(this._eventNamespace),this.$clearButton.off(this._eventNamespace)},a.prototype.fireEvent=function(t){this.$el.trigger(t+this._eventNamespace)},a.prototype.enable=function(){this.bindEvents(),this.$el.prop("disabled",!1),this.$label.removeClass(this.CLASSES.disabled)},a.prototype.disable=function(){this.unbindEvents(),this.$el.prop("disabled",!0),this.$label.addClass(this.CLASSES.disabled)},a.prototype.clear=function(){return this.$el.wrap("<form>").closest("form").get(0).reset(),this.$el.unwrap(),this.el.value="",this.change(),!1},a.prototype.focus=function(){var t=this;this.$label.addClass(this.CLASSES.focused),s&&!this.isFocused&&(this.isFocused=!0,setTimeout((function(){t.$el.blur(),t.$el.focus()}),0))},a.prototype.blur=function(){s&&this.isFocused||(this.$label.removeClass(this.CLASSES.focused),this.isFocused=!1)},a.prototype.mousedown=function(){this.$label.addClass(this.CLASSES.active)},a.prototype.mouseup=function(){this.$label.removeClass(this.CLASSES.active)},a.prototype.keydown=function(t){var e=t.which,i=9;if(8!==e&&46!==e||(this.clear(),t.preventDefault()),s&&e===i){var a=this;this.isFocused=!1,this.$el.prop("disabled",!0),setTimeout((function(){a.$el.prop("disabled",!1).blur()}),0)}},a.prototype.checkValidity=function(){if(this.el.required){var t=this.$el.is(":invalid");this.$label.toggleClass(this.CLASSES.invalid,t).toggleClass(this.CLASSES.valid,!t)}},a.prototype.change=function(){var t,i="";this.checkValidity(),(t=this.el.multiple&&this.el.files.length>1?this.formatMultipleFileText(this.el.files.length):this.el.value).length?(i=t.replace(e,""),this.$clearButton.appendTo(this.$label)):this.$clearButton.detach(),this.$el.focus(),this.setFieldText(i),this.fireEvent("value-changed")},a.prototype.setFieldText=function(t){var e="data-ffi-value";t.length?(this.$label.attr(e,t),this.fireEvent("value-added")):(this.$label.removeAttr(e),this.fireEvent("value-cleared"))},t.fn.fancyFileInput=function(e){return this.each((function(){var i=new a(this,e);t(this).data("FancyFileInput",i)}))},a}(t)}.apply(e,s))||(t.exports=a)}}]);
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.auiplugin:split_aui.component.form.file-select', location = 'aui.chunk.647b6db9cb2996fa83a0--246ac123afad62eb1860.js' */
(window.__auiJsonp=window.__auiJsonp||[]).push([["aui.component.form.file-select"],{"7hWp":function(i,u,c){"use strict";c.r(u),c.d(u,"FancyFileInput",(function(){return a}));c("6fSn"),c("iwe4");var n=c("rNKm"),a=c.n(n).a}},[["7hWp","runtime","aui.splitchunk.vendors--894c8113d9","aui.splitchunk.vendors--8cfcf1af69","aui.splitchunk.0d131bcbf1","aui.splitchunk.fbbef27525","aui.splitchunk.444efc83be","aui.splitchunk.739b9ec8cc","aui.splitchunk.056561461c","aui.splitchunk.949297951c","aui.splitchunk.d7c46c2734","aui.splitchunk.fb15cffa72","aui.splitchunk.56dfb54d0c","aui.splitchunk.908fe798b4","aui.splitchunk.462ee5f9ef","aui.splitchunk.26116b3cbd","aui.splitchunk.50dca3e042"]]]);
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-link-browser:link-browser-resources', location = 'js/link-object.js' */
define("confluence-link-browser/link-object",["jquery","ajs","confluence/legacy"],function(c,g,m){function j(a){return c.nodeName(a,"img")?a:a.hasChildNodes()&&1===a.childNodes.length&&c.nodeName(a,"a")&&c.nodeName(a.firstChild,"img")?a.firstChild:null}function k(a){return!a?"":c(a).attr("data-linked-resource-default-alias")||c(a).attr("src")}function l(a){var b={};"A"===a.nodeName&&c(a.attributes).each(function(){b[this.name]=this.value});return b}function i(a,b){for(var c=a;c&&c!=b;){if(3!=c.nodeType)return!1;
c=c.nextSibling}return 3===b.nodeType}var e={isLink:function(a){return a&&!!a.fillNode}},f=function(a){if(e.isLink(a))return a;var b={insert:function(){return m.Editor.LinkAdapter.setLink(b)},fillNode:function(a){var b=this.attrs;b.href=b.href||"#";b.href.replace(/\s+/g,"").toLowerCase().includes("javascript:")&&(b.href="#");a.attr(b);this.classes&&this.classes.length&&a.addClass(this.classes.join(" "));a.html(this.body.html);return a},getData:function(){var a={},b;for(b in this)this.hasOwnProperty(b)&&
!c.isFunction(this[b])&&(a[b]=this[b]);return a},getLinkedImage:function(){return this.body&&this.body.jquery?1===this.body.length&&this.body.is("img")&&this.body:null},getResourceId:function(){return this.attrs["data-linked-resource-id"]||""},getResourceVersion:function(){return this.attrs["data-linked-resource-version"]||""},isToConfluenceEntity:function(){return this.attrs["data-linked-resource-id"]},isToAttachmentOnSamePage:function(a){return"attachment"==this.attrs["data-linked-resource-type"]&&
this.attrs["data-linked-resource-container-id"]==a},isCustomAtlassianContentLink:function(){return this.classes&&this.classes.length?-1!=c.inArray("confluence-link",this.classes):!1},hasAnchor:function(){return this.attrs["data-anchor"]},getResourceType:function(){return this.attrs["data-linked-resource-type"]},getDefaultAlias:function(){return this.attrs["data-linked-resource-default-alias"]},getHref:function(){return this.attrs.href},getAnchor:function(){return this.attrs["data-anchor"]},getHtml:function(){return this.body.html},
getShortcut:function(){return this.attrs["data-linked-resource-shortcut"]},isHrefValid:function(){return this.attrs.href&&"http://"!=this.attrs.href},isImage:function(){return this.body.isImage},isNewLink:function(){return c.isEmptyObject(this.attrs)},isShortcutLink:function(){return"shortcut"===this.getResourceType()},isExternalLink:function(){return!this.isCustomAtlassianContentLink()},showsBreadcrumbs:function(){return!0},getTarget:function(){return this.attrs.target},setTarget:function(a){a?this.attrs.target=
a:this.removeTarget()},removeTarget:function(){this.attrs&&this.attrs.target&&delete this.attrs.target}};if(a&&a.attrs){var f={},h=null;c.each(a.attrs,function(a,b){"class"==a?h=b:f[a]=b});a.attrs=f;if(h){var d=h.split(" ");a.classes=a.classes&&a.classes.length?a.classes.concat(d):d}}c.extend(b,a);return b};e.fromData=function(a){return f(a)};e.fromNode=function(a,b){f({attrs:{},body:{html:b,text:b}});return f({attrs:l(a),body:{html:b,text:b}})};e.fromSelectedAnchor=function(a,b){var e=c(a),h=j(a),
d=!h&&i(a.firstChild,a.lastChild);return f({attrs:l(a),body:{isEditable:d,isImage:!!h,html:e.html(),imgName:k(h),text:b}})};e.fromSelection=function(a,b,c,e){var b=j(b),d;if(d=!b)if(a.collapsed)d=!0;else if(d=a.startContainer,d==a.endContainer)d=3===d.nodeType?!0:i(d.childNodes[a.startOffset],d.childNodes[a.endOffset-1]);else{var g=require("tinymce").activeEditor.dom;d=g.isBlock(a.startContainer)?a.startContainer.childNodes[a.startOffset]:a.startContainer;a=g.isBlock(a.endContainer)?a.endContainer.childNodes[a.endOffset-
1]:a.endContainer;a=d&&a&&d.parentNode==a.parentNode?{start:d,end:a}:null;d=!!a&&i(a.start,a.end)}return f({attrs:{},body:{isEditable:d,isImage:!!b,html:c,imgName:k(b),text:e}})};e.fromREST=function(a){var b=f({attrs:{"data-base-url":g.Confluence.getBaseUrl(),"data-linked-resource-id":a.id,"data-linked-resource-type":a.type,"data-linked-resource-content-type":a.contentType,href:g.REST.findLink(a.link),"data-linked-resource-default-alias":a.title},body:{html:g.escapeHtml(a.title),text:g.escapeHtml(a.title)},
classes:["confluence-link"]});"user"===a.type&&(b.attrs["data-linked-resource-type"]="userinfo");return b};e.createLinkToNewPage=function(a,b){return f({attrs:{"data-space-key":b,"data-content-title":a,href:g.contextPath()+"/pages/createpage.action?spaceKey="+b+"&title="+a},body:{html:g.escapeEntities(a),text:a},classes:["createlink","confluence-link"]})};e.makeExternalLink=function(a){return f({attrs:{href:a},body:{html:a,text:a}})};e.isExternalLink=function(a){return a&&(a.match(/^(\/\/|mailto:|file:|http:|https:)/)||
0===a.indexOf("\\"))};return e});require("confluence/module-exporter").exportModuleAsGlobal("confluence-link-browser/link-object","Confluence.Link");
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-link-browser:link-browser-resources', location = 'js/link-adapter.js' */
define("confluence-link-browser/link-adapter",["ajs","jquery","confluence/legacy","tinymce"],function(d,e,f,h){return{setLink:function(a){var b=d.Rte.getEditor(),b=e(b.dom.create("a"),b.getDoc());a.fillNode(b);return h.confluence.NodeUtils.replaceSelection(b)},getLink:function(){var a,b,c;a=d.Rte.getEditor().selection;var g=a.getNode();if(c=e(g).parents().andSelf().filter("a[href]")[0])return a.select(c),b=a.getContent({format:"text"}),f.Link.fromSelectedAnchor(c,b);c=a.getRng(!0);b=a.getContent({format:"text"});
a=a.getContent();return f.Link.fromSelection(c,g,a,b)}}});require("confluence/module-exporter").exportModuleAsGlobal("confluence-link-browser/link-adapter","Confluence.Editor.LinkAdapter");
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-link-browser:link-browser-resources', location = 'js/link-browser.js' */
define("confluence-link-browser/link-browser",["ajs","confluence/legacy","jquery"],function(b,o,h){function r(){if(!f.prop("disabled")){f.prop("disabled",!0);b.debug("link-browser.js: submit");i.preSubmit&&i.preSubmit();var a=c.getLink();b.DarkFeatures.isEnabled(s)||a.removeTarget();n();a.insert();b.trigger("closed.link-browser")}}function n(){k.hide().remove();b.Rte.BookmarkManager.restoreBookmark()}function p(){n();b.trigger("closed.link-browser")}function t(a,f,l){var d=f.key,f=f.label,e=d+"-panel",
g=o.Templates.LinkBrowser[d+"Panel"]({atlToken:b.Meta.get("atl-token")});k.addPanel(f,g,e,e+"-id");var a=k.get("panel:"+a),j=l.tabs[d];j.panelObj=a;j.key=d;j.createPanel({baseElement:h(a[0].body)});a[0].onblur=j.onDeselect;a[0].onselect=function(){var a=!!j.hasBreadcrumbs;b.debug("Link Browser: on tab select, breadcrumbs enabled: "+a);j.onSelect();c.refresh(a);i=j};return j}var s="link.openInNewWindow",k,c,f,i;return{SEARCH_PANEL:"search",ATTACHMENTS_PANEL:"attachments",WEBLINK_PANEL:"weblink",ADVANCED_PANEL:"advanced",
open:function(a){h(function(){h('.ffi input[type="file"]#file_0').fancyFileInput()});if(h(".aui-dialog:visible").length)return null;a=a||{};b.Rte.BookmarkManager.storeBookmark();a.linkInfo=a.linkInfo||o.Editor.LinkAdapter.getLink();if(a.opener)return a.opener(a.linkInfo.alias,a.linkInfo);var q=a,a={OPEN_IN_NEW_WINDOW_DARK_FEATURE:s,tabs:{},setLink:function(u,a){c.setLink(u,a)},getLink:function(){return c.getLink()},getSelectedDataTableItem:function(){return h(".data-table:visible tr.selected")},linkValid:function(a){f.prop("disabled",
!a)},focusLinkText:function(){c.focusLinkText()||(b.debug("LinkBrowser: focusing submit button"),f.focus())},getLinkText:function(){return c.getLinkText()},isLinkTextVisible:function(){return c.isLinkTextVisible()},isNewWindowCheckboxVisible:function(){return c.isNewWindowCheckboxVisible()},hasBreadcrumbs:function(a){return c.hasBreadcrumbs(a)},getLocationPresenter:function(){return c},doSearch:function(a){this.tabs.search.doSearch(a)},getSearchTextField:function(){return this.tabs.search.getSearchTextField()},
moveLocationPanel:function(a){c.moveLocationPanel(a)},restoreLocationPanel:function(){c.restoreLocationPanel()},gotoPanel:function(a){this.popup.gotoPanel(a)},getCurrentPanel:function(){return this.popup.getCurrentPanel()},setWebLinkURL:function(a){var c=this.tabs.weblink;i!=c?b.debug("Cannot set URL "+a+" on hidden Web Link panel"):c.setURL(a)},getWebLinkUrl:function(){var a=this.tabs.weblink;return i!=a?(b.debug("Cannot get URL on hidden Web Link panel"),null):a.getURL()},getTitle:function(){return this.popup.getTitle()},
getSubmitButtonText:function(){return f.text()},isSubmitButtonEnabled:function(){return f.is(":enabled")},isVisible:function(){return this.popup.isVisible()},showOpenInNewWindowCheckbox:function(a){return c.showOpenInNewWindowCheckbox(a)},getAdvancedTextField:function(){var a=this.tabs.advanced;return i!=a?(b.debug("Cannot get link text on hidden advanced panel"),null):a.getLink()},setAdvancedTextField:function(a){var c=this.tabs.advanced;i!=c?b.debug("Cannot set link text on hidden advanced panel"):
c.setLink(a)},submit:r,cancel:p},l=q.linkInfo,d=l.isNewLink(),e,g;e=new b.ConfluenceDialog({width:840,height:590,id:"insert-link-dialog",onCancel:p,onSubmit:r});g=d?"Insert link":"Edit link";d=d?"Insert":"Save";e.addHeader(g);e.addButton(d,r);e.addCancel("Cancel",p);e.addHelpText("Hint: type \u0022[\u0022 in the editor to see a list of suggested pages and insert a link.");g=h("#insert-link-dialog .dialog-tip");
g.attr("title",g.text());h("#insert-link-dialog .dialog-components .dialog-title").prepend(o.Templates.LinkBrowser.helpLink());f=e.get("button:0")[0].item;f.attr("id","link-browser-insert");f.prop("disabled",!0);k=e;a.popup=k;b.trigger("dialog-created.link-browser",[a]);c=o.Editor.LinkBrowser.LinkInfoPresenter(a);c.setLinkBody(l.body);q=q.panelKey;e=h("#link-browser-tab-items").find("div").map(function(){var a=h(this);return{key:a.text(),weight:a.attr("data-weight"),label:this.title}}).sort(function(a,
b){return a.weight-b.weight});var j="template"!==b.Meta.get("content-type");e=h.grep(e,function(a){return j||"attachments"!==a.key});var n;g=null;for(var d=0,v=e.length;d<v;d++){var m=t(d,e[d],a);0===d&&(n=m);!l.isNewLink()&&h.isFunction(m.handlesLink)&&m.handlesLink(l)?(g=m,m.openedLink=l):q==m.key&&(g=m)}g?a.popup.overrideLastTab():g=n;i=g;k.popup.element.find(".dialog-page-body:first").append(c.getContainer());i.panelObj.select();i.openedLink=null;k.show();b.trigger("dialog-shown.link-browser",
k);return a},cancel:p}});require("confluence/module-exporter").exportModuleAsGlobal("confluence-link-browser/link-browser","Confluence.Editor.LinkBrowser");
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-link-browser:link-browser-resources', location = 'js/link-browser-location.js' */
define("confluence-link-browser/link-browser-location",["jquery","confluence/legacy","ajs","confluence/dialog-breadcrumbs"],function(k,B,i,s){return function(t){function m(){return i.escapeHtml(u())}function u(){return b.val()}function v(a){j.closest(".row").toggleClass("hidden",!a);e.toggleClass("has-breadcrumbs",!!a)}function w(a){var c=a.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/),a=c[2],d=c[3],f=c[5],e=c[7],c=c[9],b="";a&&(b=a.toLowerCase()+":");d&&(b+=d);b+=n(f);e&&(b+=
"?"+n(e));c&&(b+="#"+n(c));return b}function n(a){var c={"'":"%27","\\[":"%5B","\\]":"%5D","`":"%60","\\\\":"%5C"},d;for(d in c)c.hasOwnProperty(d)&&(a=a.replace(RegExp(d,"g"),c[d]));return a}function x(){return b.is(":visible")}function y(a,c){i.trigger("analyticsEvent",{name:a,data:{resourceType:c.getResourceType(),isExternal:c.isExternalLink()}})}var e,j,o,f,g,b,p,z,A,q,l,r,h;e=k(B.Templates.LinkBrowser.locationPanel());j=e.find("#breadcrumbs-container");o=s.Breadcrumbs(j,s.getBreadcrumbsLegacy);
g=e.find("#link-open-in-new-window");z=e.find(".link-image");A=e.find(".link-mixed");l=e.find("#link-image-filename");q=e.find("#link-mixed-content");p=e.find(".link-text");b=p.find("input");b.change(function(a){a.keyCode=a.keyCode||a.which;a.keyCode&&13!==a.keyCode&&b.removeClass("default-alias")});g.change(function(){g.prop("checked")?("attachment"!==f.getResourceType()&&f.setTarget("_blank"),y("editor.linkBrowser.location.openInNewWindow.checked",f)):(f.removeTarget(),y("editor.linkBrowser.location.openInNewWindow.unchecked",
f))});return{setLink:function(a,c){i.debug("Link Browser: setting link : "+a);var d=a.attrs["data-linked-resource-default-alias"]||a.getHtml();if(""===m()||b.hasClass("default-alias"))b.addClass("default-alias"),b.val(d);if(c&&a.getResourceId()&&a.getResourceType()){var e={clearErrors:function(){},error:function(){},select:function(a){o.update(a,e)}},d={id:a.getResourceId(),type:a.getResourceType()};o.update(d,e)}v(c);i.DarkFeatures.isEnabled(t.OPEN_IN_NEW_WINDOW_DARK_FEATURE)?(g.prop("checked")&&
a.setTarget("_blank"),g.prop("checked","_blank"===a.getTarget())):a.removeTarget();f=a;t.linkValid(f&&f.isHrefValid())},getLink:function(){if(!f)return null;var a=r;a||((a=m())||(a=f.getDefaultAlias()||f.getHref()),a={html:a});f.body=a;f.attrs.href=w(f.attrs.href);return f},refresh:function(a){f&&v(a)},setLinkBody:function(a){r||(a.isEditable?b.val(a.text):a.isImage?l.text(a.imgName):q.text(a.text),r=a.isEditable?null:a,p.toggleClass("hidden",!a.isEditable),z.toggleClass("hidden",!a.isImage),A.toggleClass("hidden",
a.isEditable||a.isImage))},getContainer:function(){return e},isLinkTextVisible:x,isLinkImageVisible:function(){return l.is(":visible")},isNewWindowCheckboxVisible:function(){return g.is(":visible")},isNewWindowCheckboxChecked:function(){return g.prop("checked")},isLinkMixedContentVisible:function(){return q.is(":visible")},focusLinkText:function(){return x()?(i.debug("LinkInfoPresenter.focusLinkText focusing alias"),b.select(),!0):!1},getLinkText:m,getRawLinkText:u,getLinkImageName:function(){return l.text()},
moveLocationPanel:function(a){h||(h=e.find(".row:not(.hidden) .field-group"),h.each(function(a,d){k(d).data("original-parent",k(d).parent())}));h.appendTo(a);e.hide()},restoreLocationPanel:function(){h&&h.each(function(a,c){var d=k(c);d.data("original-parent")&&(d.appendTo(d.data("original-parent")),d.removeData("original-parent"))});e.show();h=null},hasBreadcrumbs:function(a){if(!j.is(":visible"))return!1;var c=a.length,d=j.find("li");if(d.length!==c)return!1;for(var b=0;b<c;b++)if(d.eq(b).text()!==
a[b])return!1;return!0},showOpenInNewWindowCheckbox:function(a){g.closest(".row").toggleClass("hidden",!a)},encodeURLSafely:w}}});require("confluence/module-exporter").exportModuleAsGlobal("confluence-link-browser/link-browser-location","Confluence.Editor.LinkBrowser.LinkInfoPresenter");
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-link-browser:link-browser-resources', location = 'js/link-browser-tab-search.js' */
define("confluence-link-browser/link-browser-tab-search",["jquery","ajs","document","confluence/legacy","confluence/page-location"],function(d,b,n,i,o){return{dialogCreatedLinkBrowserSearch:function(n,j){var c,e,f,m,p=b.REST.getBaseUrl()+"search.json",k=function(a,b){i.Link.isLink(a)||(a=i.Link.fromREST(a));b&&c.val(a.attrs["data-linked-resource-default-alias"]);j.setLink(a,!0);j.focusLinkText()},l=function(a){b.debug("link-browser-tab-search.js: doing search");c.trigger("hide.autocomplete");var g=
d.trim(c.val());g?(f.loading(),b.getJSONWrap({url:p,data:{search:"site",query:g,spaceKey:e.val()},successCallback:function(b){d.isFunction(a)?(f.update(b.result),a()):f.updateAndSelect(b.result);c.trigger("hide.autocomplete")},messageHandler:m})):d.isFunction(a)&&a()};j.tabs.search={hasBreadcrumbs:!0,createPanel:function(a){var g=a.baseElement;c=g.find("#link-search-text");e=g.find("#search-panel-space");var h=o.get();e.find("option:eq(1)").text(h.spaceName).val(h.spaceKey);e.change(function(){c.attr("data-spacekey",
e.val());c.trigger("clearCache.autocomplete")});i.Binder.autocompleteSearch(c.parent());c.bind("selected.autocomplete-content",function(a,b){b.searchFor?l():(f.clear(),k(b.content,!1))});h=[b.SelectGrid.Column({key:"title",heading:"Title",getHref:function(a){return b.REST.findLink(a.link)},getInnerClass:function(a){return a.iconClass||"content-type-"+a.type}}),b.SelectGrid.Column({key:"space",heading:"Space",getText:function(a){return a.space&&
a.space.title||""}}),b.SelectGrid.Column({key:"last-modified",heading:"Last Modified",getText:function(a){return a.lastModifiedDate&&a.lastModifiedDate.friendly||""},getTitle:function(a){return a.lastModifiedDate&&a.lastModifiedDate.date||""}})];m=b.MessageHandler({baseElement:a.baseElement.find(".message-panel")});f=new b.ResultGrid({baseElement:a.baseElement,columns:h,selectionCallback:function(a,b){k(b)},noResultMessage:"No search results found.",
dontShiftFocus:function(){return d(c).add(e).is(":focus")}});g.find(".search-form").submit(function(){l();return!1}).keydown(function(a){13===a.keyCode&&!d(".aui-dropdown:visible .active",this).length&&(d("#search-panel-button").focus(),a.stopPropagation())})},onSelect:function(){b.debug("Link Browser Search panel selected");var a=this.openedLink;a?(b.debug("Link Browser Search panel setting link info"),k(a,!0)):c.focus()},handlesLink:function(a){return a.isCustomAtlassianContentLink()&&!a.hasAnchor()&&
!a.isShortcutLink()&&!a.isToAttachmentOnSamePage(b.Meta.get("content-id"))},doSearch:function(a,b){c.val(a);l(b)},isResultGridVisible:function(){return f.isVisible()},getSearchTextField:function(){return c}}}}});require("confluence/module-exporter").safeRequire("confluence-link-browser/link-browser-tab-search",function(d){require("ajs").bind("dialog-created.link-browser",d.dialogCreatedLinkBrowserSearch)});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-link-browser:link-browser-resources', location = 'js/link-browser-tab-history.js' */
define("confluence-link-browser/link-browser-tab-history",["ajs","confluence/legacy"],function(a,h){return{dialogCreatedLinkBrowserHistory:function(i,d){var e=a.REST.makeUrl("session/history.json?max-results=20"),f,g;d.tabs.recentlyviewed={createPanel:function(c){var e=[a.SelectGrid.Column({key:"title",heading:"Title",getHref:function(b){return a.REST.findLink(b.link)},getInnerClass:function(b){return b.iconClass||"content-type-"+b.type}}),a.SelectGrid.Column({key:"space",
heading:"Space",getText:function(b){return b.space&&b.space.title||""}}),a.SelectGrid.Column({key:"last-modified",heading:"Last Modified",getText:function(b){return b.lastModifiedDate&&b.lastModifiedDate.friendly||""},getTitle:function(b){return b.lastModifiedDate&&b.lastModifiedDate.date||""}})];g=a.MessageHandler({baseElement:c.baseElement.find(".message-panel")});f=new a.ResultGrid({baseElement:c.baseElement,
columns:e,getRowId:function(b){return b.attachmentId},selectionCallback:function(b,a){var c=h.Link.fromREST(a);d.setLink(c);d.focusLinkText()},messageHandler:g,noResultMessage:"You have no recently viewed content."})},onSelect:function(){f.loading();a.getJSONWrap({url:e,messageHandler:g,successCallback:function(c){f.update(c.content);a.trigger("updated.link-browser-recently-viewed")}})}}}}});
require("confluence/module-exporter").safeRequire("confluence-link-browser/link-browser-tab-history",function(a){require("ajs").bind("dialog-created.link-browser",a.dialogCreatedLinkBrowserHistory)});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-link-browser:link-browser-resources', location = 'js/link-browser-tab-attachment.js' */
define("confluence-link-browser/link-browser-tab-attachment",["jquery","ajs","confluence/legacy"],function(h,a,j){return{dialogCreatedLinkBrowserAttachment:function(m,i){var f=a.REST.makeUrl("content/"+a.Meta.get("attachment-source-content-id")+"/attachments.json"),g,k,l,d;i.tabs.attachments={hasBreadcrumbs:!1,createPanel:function(b,c){var e=b.baseElement.find(".attach-file-form");g=h.extend({getUploaderController:function(){return j.AttachmentUploader({baseElement:e},function(){return{onUploadSuccess:function(a){for(var b=
0,c=a.length;b<c;b++)a[b].type="attachment";d.prependAndSelect(a)}}})}},c&&c(b));k=g.getUploaderController(b);l=k.getMessageHandler();var f=[a.SelectGrid.Column({key:"title",heading:"Name",getHref:function(b){return b.link?a.REST.findLink(b.link):b.url},getInnerClass:function(a){return a.iconClass}}),a.SelectGrid.Column({key:"size",heading:"Size",getText:function(a){return a.niceFileSize}}),a.SelectGrid.Column({key:"comment",
heading:"Comment"})];d=new a.ResultGrid({baseElement:b.baseElement,columns:f,selectionCallback:function(b,c){var d=j.Link.fromREST(c);d.attrs["data-linked-resource-container-id"]=a.Meta.get("content-id");if(h.isArray(c.link))for(var e=0,f=c.link.length;e<f;e++){var g=c.link[e];"download"===g.rel&&(d.attrs.href=g.href)}i.setLink(d);i.focusLinkText()},noResultMessage:"There are no files on this page."})},onSelect:function(){var b=this.openedLink,c=i.getLink();
d.loading();a.getJSONWrap({url:f,messageHandler:l,successCallback:function(e){d.update(e.attachment);c?"attachment"==c.getResourceType()&&d.select(c.getResourceId()):b?d.select(b.getResourceId()):e.attachment.length&&d.select(e.attachment[0].id);a.debug("Loaded attachments")}})},handlesLink:function(b){return b.isToAttachmentOnSamePage(a.Meta.get("content-id"))}}}}});
require("confluence/module-exporter").safeRequire("confluence-link-browser/link-browser-tab-attachment",function(h){var a=require("ajs");"template"!==a.Meta.get("content-type")&&a.bind("dialog-created.link-browser",h.dialogCreatedLinkBrowserAttachment)});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-link-browser:link-browser-resources', location = 'js/link-browser-tab-weblink.js' */
define("confluence-link-browser/link-browser-tab-weblink",["ajs","jquery","confluence/legacy"],function(d,k,h){return{dialogCreatedLinkBrowserWeblink:function(n,c){function e(){return k.trim(b.val())}function f(){var a=e();if(!(d.Validate.url(a)||0===a.indexOf("mailto:"))){if(d.Validate.email(a))a="mailto:"+a;else{if(l.test(a))return;a="http://"+a}d.debug("Updating Link Browser Web Link URL to: "+a);b.val(a);a=h.Link.makeExternalLink(a);c.setLink(a)}}function i(){var a=e();(a=a?h.Link.makeExternalLink(a):
null)&&c.setLink(a)}function m(){f();i()}var b,g,j,l=/[:/]/;j=c.tabs.weblink={createPanel:function(a){g=a.baseElement;b=g.find("input[name='destination']");b.keyup(function(){i()});b.change(f);b.bind("paste",function(){d.debug("Link Browser web link url pasted");setTimeout(m,0)})},onSelect:function(){d.DarkFeatures.isEnabled(c.OPEN_IN_NEW_WINDOW_DARK_FEATURE)&&c.showOpenInNewWindowCheckbox(!0);c.moveLocationPanel(g.find("form:first"));this.openedLink&&(j.setURL(this.openedLink.attrs.href),c.setLink(this.openedLink));
setTimeout(function(){b.focus()})},onDeselect:function(){c.restoreLocationPanel();c.showOpenInNewWindowCheckbox(!1)},preSubmit:f,handlesLink:function(a){return!a.isCustomAtlassianContentLink()},setURL:function(a){b.val(a);b.keyup();b.change()},getURL:e}}}});require("confluence/module-exporter").safeRequire("confluence-link-browser/link-browser-tab-weblink",function(d){require("ajs").bind("dialog-created.link-browser",d.dialogCreatedLinkBrowserWeblink)});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-link-browser:link-browser-resources', location = 'js/link-browser-tab-advanced.js' */
define("confluence-link-browser/link-browser-tab-advanced",["jquery","ajs","confluence/legacy","confluence/api/constants","confluence/meta"],function(g,e,l,m,i){return{dialogCreatedLinkBrowserAdvanced:function(p,d){var c,f,h,k,n=function(b){b=g(b);if(b.length){var a=b.find("a:first");a.length?a.hasClass("unresolved")?(b=a.attr("shortcut-key"),a=a.attr("data-space-key"),b?f.text(e.format("{0} is not a recognized shortcut",b)):a&&f.text(e.format("{0} is not a recognized space",
a))):(b=l.Link.fromNode(a[0],c.val()),d.setLink(b)):f.text("The markup provided is not valid link markup")}},o=function(b,a,c){e.debug("Error during conversion: textStatus = "+a+", errorThrown = "+c);f.text("An internal server error occurred")},j=d.tabs.advanced={createPanel:function(b){h=b.baseElement;c=h.find("input[name='advanced-link']");f=h.find("div[name='advanced-error']");h.find("form").keydown(function(a){13===a.keyCode&&!d.isSubmitButtonEnabled()&&a.preventDefault()});
c.keyup(function(){clearTimeout(k);f.text("");c.val()&&(k=setTimeout(function(){var a=c.val(),a=a.replace(/\[/g,"\\[").replace(/]/g,"\\]"),a={wiki:"["+a+"]",entityId:i.get("content-id"),spaceKey:i.get("space-key"),contextType:i.get("content-type")};g.ajax({type:"POST",contentType:"application/json; charset=utf-8",url:m.CONTEXT_PATH+"/rest/tinymce/1/wikixhtmlconverter",data:g.toJSON(a),dataType:"text",success:n,error:o,timeout:1E4})},200))})},setLink:function(b){c.val(b);c.keyup();c.change()},getLink:function(){return c.val()},
onSelect:function(){e.DarkFeatures.isEnabled(d.OPEN_IN_NEW_WINDOW_DARK_FEATURE)&&d.showOpenInNewWindowCheckbox(!0);d.moveLocationPanel(h.find("form:first"));this.openedLink&&(this.openedLink.isShortcutLink()?j.setLink(this.openedLink.getShortcut()):this.openedLink.getResourceId()?j.setLink(this.openedLink.getDefaultAlias()):j.setLink("#"+this.openedLink.getAnchor()),d.setLink(this.openedLink));setTimeout(function(){c.focus()})},onDeselect:function(){d.restoreLocationPanel();d.showOpenInNewWindowCheckbox(!1)},
handlesLink:function(b){return b.isShortcutLink()||b.hasAnchor()}}}}});require("confluence/module-exporter").safeRequire("confluence-link-browser/link-browser-tab-advanced",function(g){require("ajs").bind("dialog-created.link-browser",g.dialogCreatedLinkBrowserAdvanced)});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-link-browser:link-browser-resources', location = 'templates/link-browser.soy' */
// This file was automatically generated from link-browser.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Confluence.Templates.LinkBrowser.
 */

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Templates == 'undefined') { Confluence.Templates = {}; }
if (typeof Confluence.Templates.LinkBrowser == 'undefined') { Confluence.Templates.LinkBrowser = {}; }


Confluence.Templates.LinkBrowser.searchPanel = function(opt_data, opt_ignored) {
  return '<form class="aui search-form" onsubmit="return false;"><fieldset class="inline"><div class="search-input"><label for="link-search-text" id="linkSearch-label" class="assistive">' + soy.$$escapeHtml('Search') + '</label><input id="link-search-text" type="text" tabindex="0" class="text autocomplete-search" name="linkSearch" autocomplete="off" data-search-link-message="' + soy.$$escapeHtml('Search for \x26lsquo;{0}\x26rsquo;') + '"></div><select tabindex="0" class="search-space select" id="search-panel-space"><option value="">' + soy.$$escapeHtml('All content') + '</option><option value=""> </option></select><button type="submit" tabindex="0" class="aui-button" id="search-panel-button">' + soy.$$escapeHtml('Search') + '</button></fieldset></form><div class="message-panel hidden"></div><div id="search-results-table" class="data-table hidden"></div>';
};
if (goog.DEBUG) {
  Confluence.Templates.LinkBrowser.searchPanel.soyTemplateName = 'Confluence.Templates.LinkBrowser.searchPanel';
}


Confluence.Templates.LinkBrowser.recentlyviewedPanel = function(opt_data, opt_ignored) {
  return '<div class="recently-viewed-panel"><div class="message-panel hidden"></div><div class="data-table"></div></div>';
};
if (goog.DEBUG) {
  Confluence.Templates.LinkBrowser.recentlyviewedPanel.soyTemplateName = 'Confluence.Templates.LinkBrowser.recentlyviewedPanel';
}


Confluence.Templates.LinkBrowser.attachmentsPanel = function(opt_data, opt_ignored) {
  return '<div class="attach-file-form"><form method="post" enctype="multipart/form-data" id="attachments-attachfile-form" action="' + soy.$$escapeHtml("") + '/pages/attachfile.action" class="aui"><p>' + soy.$$escapeHtml('Link to a file that is attached to this page or attach a new one.') + '</p><div class="upload-field field-group"><label for="file_0">' + soy.$$escapeHtml('Upload file') + '</label><label id="fancy-file-upload" class="ffi" data-ffi-button-text="Browse"><input type="file" name="file_0" id="file_0"></label><input type="hidden" name="minorEdit_0" value="true"></div><input type="hidden" name="atl_token" value="' + soy.$$escapeHtml(opt_data.atlToken) + '" /></form><div class="upload-in-progress upload-field hidden">' + soy.$$escapeHtml('Upload in progress...') + '</div><div class="warning"><ul class="hidden message-panel"></ul></div></div><div class="message-panel hidden"></div><div id="attachments-table" class="attachment-list data-table"></div>';
};
if (goog.DEBUG) {
  Confluence.Templates.LinkBrowser.attachmentsPanel.soyTemplateName = 'Confluence.Templates.LinkBrowser.attachmentsPanel';
}


Confluence.Templates.LinkBrowser.weblinkPanel = function(opt_data, opt_ignored) {
  return '<form class="aui" onsubmit="return false;"><div class="field-group"><label id="destination-label" for="weblink-destination">' + soy.$$escapeHtml('Address') + '</label><input type="text" tabindex="0" class="text" id="weblink-destination" name="destination"><div class="web-link-desc description">' + soy.$$escapeHtml('Web, email or any other internet address') + '</div></div></form>';
};
if (goog.DEBUG) {
  Confluence.Templates.LinkBrowser.weblinkPanel.soyTemplateName = 'Confluence.Templates.LinkBrowser.weblinkPanel';
}


Confluence.Templates.LinkBrowser.advancedPanel = function(opt_data, opt_ignored) {
  return '<form class="aui" onsubmit="return false;"><div class="advanced-desc title">' + soy.$$filterNoAutoescape(AJS.format('Here you can insert a link into the page using \x3ca href\x3d\x22{0}\x22 target\x3d\x22_blank\x22\x3ewiki markup\x3c/a\x3e.',"https://docs.atlassian.com/confluence/docs-85/Links")) + '</div><div class="field-group"><label id="advanced-label" for="advanced-link">' + soy.$$escapeHtml('Link') + '</label><input type="text" tabindex="0" class="text" id="advanced-link" name="advanced-link"><div class="advanced-desc description">' + soy.$$escapeHtml('To insert a link to a new page, type in the desired page title.') + '<br/>' + soy.$$escapeHtml('To insert an anchor link, type #anchorname.') + '</div><div name="advanced-error" class="advanced-error error"></div></div></form>';
};
if (goog.DEBUG) {
  Confluence.Templates.LinkBrowser.advancedPanel.soyTemplateName = 'Confluence.Templates.LinkBrowser.advancedPanel';
}


Confluence.Templates.LinkBrowser.locationPanel = function(opt_data, opt_ignored) {
  return '<div id="link-browser-location" class="location-info"><form class="aui"><div class="row hidden field-group"><label class="link-location-label" for="breadcrumbs-link">' + soy.$$escapeHtml('Link location') + '</label><div class="breadcrumbs-container" id="breadcrumbs-link"><div class="breadcrumbs-line"><ol id="breadcrumbs-container" class="breadcrumbs"></ol></div></div></div></form><div class="row link-text"><form class="aui" onsubmit="return false;"><div class="field-group"><label for="alias" id="alias-label">' + soy.$$escapeHtml('Link text') + '</label><input type="text" tabindex="0" class="text" name="alias" id="alias"></div></form></div><div class="row link-open-in-new-window hidden"><div class="field-group"><div class="checkbox"><input type="checkbox" class="checkbox" name="open-in-new-window" tabindex="0" id="link-open-in-new-window"><label for="link-open-in-new-window" id="open-window-label">' + soy.$$escapeHtml('Open in new tab/window') + '</label></div></div></div><div class="row link-image hidden"><div class="readonly"><label for="link-image-filename">' + soy.$$escapeHtml('Link image') + '</label><span id="link-image-filename" class="content-type-attachment-image"></span></div></div><div class="row link-mixed hidden"><div class="readonly"><label for="link-mixed-content">' + soy.$$escapeHtml('Link text') + '</label><span id="link-mixed-content"></span></div></div></div>';
};
if (goog.DEBUG) {
  Confluence.Templates.LinkBrowser.locationPanel.soyTemplateName = 'Confluence.Templates.LinkBrowser.locationPanel';
}


Confluence.Templates.LinkBrowser.helpLink = function(opt_data, opt_ignored) {
  return '<div class="dialog-help-link"><a href="' + soy.$$escapeHtml("https://docs.atlassian.com/confluence/docs-85/Links") + '" target="_blank">' + soy.$$escapeHtml('Help') + '</a></div>';
};
if (goog.DEBUG) {
  Confluence.Templates.LinkBrowser.helpLink.soyTemplateName = 'Confluence.Templates.LinkBrowser.helpLink';
}

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-create-content-plugin:editor-resources', location = 'com/atlassian/confluence/plugins/createcontent/js/move-hidden-fields-hack.js' */
AJS.toInit(function(a){a("fieldset.create-content-template-fields \x3e input").appendTo("form.editor")});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-create-content-plugin:create-from-template-macro-browser-resources', location = 'com/atlassian/confluence/plugins/createcontent/js/create-from-template-macro-fields.js' */
AJS.toInit(function(g){function k(a,b){a=a||AJS.Meta.get("space-key");Confluence.Blueprint.Dialog.requestWebItems(a,!1,function(e){var f=Confluence.Blueprint.Dialog.loadedWebitems[a];_.isEmpty(f)?AJS.log("create-from-template-macro-fields: No Create dialog web items found for spaceKey \x3e"+a+"\x3c"):b(e,f)},function(){AJS.error("create-from-template-macro-fields: requestWebItems call for spaceKey \x3e"+a+"\x3c failed")})}function h(a,b){k(b,function(e,f){e=a.val();a.empty();_.each(f,function(c){var d=
c.itemModuleCompleteKey;"com.atlassian.confluence.plugins.confluence-create-content-plugin:create-blank-page"!==d&&"com.atlassian.confluence.plugins.confluence-create-content-plugin:create-blog-post"!==d&&(c.templateId||c.contentBlueprintId)&&(d=g("\x3coption\x3e\x3c/option\x3e").text(c.name),d.attr("data-template-id",c.templateId),d.attr("data-blueprint-module-complete-key",c.blueprintModuleCompleteKey),d.attr("data-content-blueprint-id",c.contentBlueprintId),d.attr("data-create-result",c.createResult),
d.val(c.templateId||c.contentBlueprintId),a.append(d))});a.val(e)})}AJS.MacroBrowser.setMacroJsOverride("create-from-template",{fields:{spacekey:{spaceKey:function(a){var b=AJS.MacroBrowser.ParameterFields.spacekey(a),e=b.input.val();a=function(){var f=b.input.val();f!=e&&h(AJS.MacroBrowser.fields.templateName.input,f);e=f};b.input.bind("selected.autocomplete-content",a);b.input.blur(a);return b}}},beforeParamsSet:function(a,b){a.buttonLabel=a.buttonLabel||a.createButtonLabel||"Create from template";
h(g("#macro-param-templateName"),a.spaceKey);return a},beforeParamsRetrieved:function(a,b,e){b=AJS.MacroBrowser.fields.templateName.input.find("option:selected");a.blueprintModuleCompleteKey=b.data("blueprint-module-complete-key");a.contentBlueprintId=b.data("content-blueprint-id");a.templateId=b.data("template-id");a.createResult=b.data("create-result");return a}})});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'ch.mibex.confluence.include:autoconvert-bitbucket-links', location = 'js/bitbucket-link-paste-support.js' */
define('mibexsoftware/paste-bitbucket-link', [
    'ajs',
    'tinymce'
], function(
    AJS,
    tinymce
) {
    'use strict';

    var BitbucketPasteLink = {
        pasteHandler: function(uri, node, done) {
            var urlDecoded = decodeURIComponent(uri.source);
            var fileDetails = parseBitbucketDataCenterFileUrl(urlDecoded);
            if(!fileDetails) {
                fileDetails = parseBitbucketCloudFileUrl(urlDecoded)
            }
            if (!fileDetails) {
                done();
                return; // no match
            }
            var appLinkId = BitbucketPasteLink.lookUpApplicationLinkId(urlDecoded);
            var macro = {
                name: 'stashincludebyfilepath',
                params: {
                    applicationLink: appLinkId,
                    projectKey: fileDetails.projectKey,
                    repoSlug: fileDetails.repoSlug,
                    branchId: fileDetails.branchId ? fileDetails.branchId :
                        BitbucketPasteLink.lookUpDefaultBranch(appLinkId, fileDetails.projectKey, fileDetails.repoSlug),
                    filepath: fileDetails.filepath,
                    lineStart: fileDetails.lineStart,
                    lineEnd: fileDetails.lineEnd
                }
            };
            tinymce.plugins.Autoconvert.convertMacroToDom(macro, done, done);
        },

        lookUpDefaultBranch: function(appLink, projectKey, repoSlug) {
            var branchesUrl = "getbranches.action?appLink=" + appLink + "&projectKey=" + projectKey +
                "&repoSlug=" + repoSlug + "&pageId=" + AJS.params.pageId;
            var defaultBranch = null;
            AJS.$.ajax({
                async: false,
                url: AJS.params.contextPath + '/plugins/includeforconfluence/' + branchesUrl,
                dataType: 'json',
                timeout: 10000,
                error: function(xhr, textStatus, errorThrown) {
                    console.error(errorThrown);
                    return null;
                },
                success: function(response) {
                    if (response.status === 'OK') {
                        for (var i = 0; i < response.body.length; i++) {
                            if (response.body[i].defaultBranch) {
                                defaultBranch = response.body[i].id;
                            }
                        }
                    }
                }
            });
            return defaultBranch;
        },

        lookUpApplicationLinkId: function(url) {
            var applicationLinkId = null;
            AJS.$.ajax({
                async: false,
                url: AJS.params.contextPath + '/plugins/includeforconfluence/getapplinkbyurl.action?url=' + encodeURIComponent(url),
                dataType: 'json',
                timeout: 10000,
                error: function(xhr, textStatus, errorThrown) {
                    console.error(errorThrown);
                    return null;
                },
                success: function(response) {
                    if (response.status === 'OK') {
                        applicationLinkId = response.body;
                    }
                }
            });
            return applicationLinkId;
        }
    };

    return BitbucketPasteLink;
});

require('confluence/module-exporter').safeRequire('mibexsoftware/paste-bitbucket-link', function(BitbucketPasteLink) {
    var tinymce = require('tinymce');
    var AJS = require('ajs');

    AJS.bind('init.rte', function() {
        tinymce.plugins.Autoconvert.autoConvert.addHandler(BitbucketPasteLink.pasteHandler);
    });
});

function parseBitbucketDataCenterFileUrl(url) {
    // BITBUCKET_HOST/projects/PROJECT_KEY/repos/REPO_SLUG/browse/FILEPATH?at=BRANCH#LINE_START-LINE_END
    var bitbucketUrlEx = /.*?\/projects\/([^/]+)\/repos\/([^/]+)\/(?:browse|raw)\/(.*?)(\?at=.*?)?#?(\d+)?-?(\d+)?$/;
    var parts = bitbucketUrlEx.exec(url);
    if (!parts) {
        return null;
    }
    return {
        projectKey: parts[1],
        repoSlug: parts[2],
        branchId: parts[4] ? parts[4].substring("?at=".length) : null,
        filepath: parts[3],
        lineStart: parts[5],
        lineEnd: parts[6] ? parts[6] : parts[5]
    };
}
function parseBitbucketCloudFileUrl(urlDecoded) {
    // BITBUCKET_HOST/projects/PROJECT_KEY/repos/REPO_SLUG/browse/FILEPATH?at=BRANCH#LINE_START-LINE_END
    var  bitbucketCloudUrlEx = /^https:\/\/bitbucket\.org\/([^/]+)\/([^/]+)\/src\/([^/]+)\/(.+)$/;
    var partsCloud = bitbucketCloudUrlEx.exec(urlDecoded);
    if (!partsCloud) {
        return null;
    }
    return {
        repoSlug: partsCloud[2],
        branchId: partsCloud[3],
        projectKey: partsCloud[1],
        filepath: partsCloud[4]
    };
}

// outside the browser, export functions for testing
const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
if(!isBrowser){
    module.exports.parseBitbucketDataCenterFileUrl = parseBitbucketDataCenterFileUrl;
    module.exports.parseBitbucketCloudFileUrl = parseBitbucketCloudFileUrl
}
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-image-attributes:soy-resources', location = 'soy/image-attributes-panel.soy' */
// This file was automatically generated from image-attributes-panel.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Confluence.Templates.Editor.ImageAttributes.
 */

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Templates == 'undefined') { Confluence.Templates = {}; }
if (typeof Confluence.Templates.Editor == 'undefined') { Confluence.Templates.Editor = {}; }
if (typeof Confluence.Templates.Editor.ImageAttributes == 'undefined') { Confluence.Templates.Editor.ImageAttributes = {}; }


Confluence.Templates.Editor.ImageAttributes.content = function(opt_data, opt_ignored) {
  return '<form class="aui" onsubmit="return false;"><div class="field-group"><label for="image-title-attribute">' + soy.$$escapeHtml('Image caption') + '</label><input class="text" type="text" id="image-title-attribute" name="image-title-attribute" value="' + ((opt_data.imgTitle) ? soy.$$escapeHtml(opt_data.imgTitle) : '') + '"><div class="description">' + soy.$$escapeHtml('') + '</div></div><div class="field-group"><label for="image-alt-attribute">' + soy.$$escapeHtml('Alt text') + '</label><input class="text" type="text" id="image-alt-attribute" name="image-alt-attribute" value="' + ((opt_data.imgAlt) ? soy.$$escapeHtml(opt_data.imgAlt) : '') + '"><div class="description">' + soy.$$escapeHtml('Describe image for screen readers and when image can\x27t be shown') + '</div></div></form>';
};
if (goog.DEBUG) {
  Confluence.Templates.Editor.ImageAttributes.content.soyTemplateName = 'Confluence.Templates.Editor.ImageAttributes.content';
}

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-image-attributes:image-attributes', location = 'js/image-attributes-panel.js' */
define("confluence-image-attributes/image-attributes-panel",["jquery","ajs","confluence/legacy"],function(f,k,h){return function(){function l(){var a=b.val(),g=d,m=g.attr,c=d.attr("data-location");m.call(g,{"data-element-title":a,title:c&&0<c.length&&a&&0<a.length?c+" ("+a+")":c&&0<c.length?c:a&&0<a.length?"("+a+")":"",alt:e.val()})}function n(){b.val()===e.val()&&(b.bind("input.chained",function(a){e.val(b.val())}),e.on("change",function(){b.unbind("input.chained")}))}k.bind("dialog-created.image-properties",
function(a,g){d=f(g.img);a=f(h.Templates.Editor.ImageAttributes.content({imgTitle:d.attr("data-element-title"),imgAlt:d.attr("alt")}));b=a.find("#image-title-attribute");e=a.find("#image-alt-attribute");n();h.Editor.ImageProps.registerPanel(p,a,q,l)});var p="image-attributes",q="image-attributes-panel",d,b,e}});require("confluence/module-exporter").safeRequire("confluence-image-attributes/image-attributes-panel",function(f){require("ajs").toInit(f)});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.editor:property-panel-image-link-macro-conf-frontend', location = 'utils/tinymce-image-utils.js' */
define("confluence-editor/utils/tinymce-image-utils","jquery confluence/api/logger confluence/meta ajs tinymce confluence/api/constants".split(" "),function(d,m,n,j,o,r){var p=["imagetext","src","align","border","width","height"],s=/\/download\/(thumbnails|attachments)\/([0-9]+)\//,q=function(a,b,f,c,e){if(c){a.width=b>=e?e:b;a.style.maxWidth=""}else{a.height=f>=e?e:f;a.style.maxHeight=""}},k;k={isScaledByWidth:function(){return false},updateImageElement:function(a,b){var f=d(a),c;c=b.destination;
c=k.isRemoteImg(c)?c:b.thumbnail?c.replace("/attachments/","/thumbnails/"):c.replace("/thumbnails/","/attachments/");b.src=c;f.toggleClass("confluence-content-image-border",!!b.border);f.toggleClass("confluence-thumbnail",!!b.thumbnail);c=0;for(var e=p.length;c<e;c++){var h=p[c],g=b[h];g!==false&&g!=null?f.attr(h,g):f.removeAttr(h)}o.activeEditor.undoManager.add()},insertFromProperties:function(a,b){d.ajax({type:"POST",contentType:"application/json; charset=utf-8",url:r.CONTEXT_PATH+"/rest/tinymce/1/embed/placeholder/image",
data:d.toJSON(a),dataType:"text",success:function(a){k.insertImagePlaceholder(a,b)}})},insertImagePlaceholder:function(a,b){var f,c=k.isScaledByWidth(),e=d(a);f=c?j.Confluence.PropertyPanel.Image.getPresetImageSize("large"):n.get("content-type")==="comment"?j.Confluence.PropertyPanel.Image.getPresetImageSize("small"):j.Confluence.PropertyPanel.Image.getPresetImageSize("medium");e.css(c?"max-width":"max-height",f+"px");var h=o.activeEditor,g="_"+ +new Date,i=d("<div></div>").append(e.attr("id",g));
h.selection.setContent(i.html());var l=h.dom.get(g);h.dom.setAttrib(l,"id","");if(!e.hasClass("confluence-external-resource")){g=e.attr("data-image-width");i=e.attr("data-image-height");if(g===void 0&&i===void 0){g=e.attr("width");i=e.attr("height")}q(l,g,i,c,f);this.updateThumbnailAttribute(l)}d(l).one("load",function(){e.hasClass("confluence-external-resource")&&q(this,this.width,this.height,c,f);j.Rte.showSelection(function(){b||j.trigger("trigger.property-panel",{elem:l});h.undoManager.add()});
h.dispatch("Change")})},updateThumbnailAttribute:function(a){var b=a.width,f=a.height;if(b||f){var c=d(a),e=c.attr("data-image-width"),h=c.attr("data-image-height"),g=n.get("max-thumb-width"),i=n.get("max-thumb-height"),a=!this.isRemoteImg(a.src)&&this.isThumbnailUsable(b,f,e,h,g,i);c.attr("thumbnail",a);c.toggleClass("confluence-thumbnail",a)}},isRemoteImg:function(a){var b=j.Rte.getCurrentBaseUrl();return a.match("(https?://)")&&a.indexOf(b)===-1},isThumbnailUsable:function(a,b,f,c,e,d){if(a){if(a>
e)return false;if(f===void 0&&c===void 0)return true;e=f/c;return e>=1?true:e*d>=a}a=b;if(a>d)return false;if(f===void 0&&c===void 0)return true;d=c/f;return d>=1?true:d*e>=a}};return{ImageProperties:function(a){if(a&&d.nodeName(a,"img")&&d(a).hasClass("confluence-embedded-image")){var b=d(a),a={destination:b.attr("src"),url:b.attr("src"),border:b.attr("class")&&b.attr("class").indexOf("confluence-content-image-border")!==-1?1:0,width:b.prop("width"),height:b.prop("height"),originalSelected:!b.attr("width")&&
!b.attr("height")};if(!k.isRemoteImg(a.destination)&&!d(b).hasClass("confluence-external-resource")){var f=a;var b=d(b).attr("src"),c=b.match(s);if(c&&c.length===3)b=c[2];else{m.log("ERROR: could not parse page id from image url "+b);b="0"}f.pageId=b}return d.extend({},a)}if(a.destination){a.imageFileName=a.imageFileName||a.destination;return d.extend({},a)}return null},ImageUtils:k}});
require("confluence/module-exporter").safeRequire("confluence-editor/utils/tinymce-image-utils",function(d){var m=require("tinymce");m.confluence.ImageProperties=d.ImageProperties;m.confluence.ImageUtils=d.ImageUtils});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.editor:property-panel-image-link-macro-conf-frontend', location = 'tinymce3/plugins/propertypanel/js/property-panel-links.js' */
define("confluence-editor/tinymce3/plugins/propertypanel/js/property-panel-links",["ajs","jquery","confluence/legacy","tinymce","window"],function(a,e,i,k,j){var h=0;return{name:"link",canHandleElement:function(a){return a.is("a")&&"#"!=a.attr("href")&&!a.hasClass("unresolved")},handle:function(f){var c=f.containerEl,g=f.ed,b=function(c){return a.Rte.getEditor().translate(c)},f={anchorIframe:a.Rte.getEditorFrame()},d=0===(c.getAttribute("href")||"").indexOf("#"),b=[{className:"link-property-panel-goto-button",
text:b("propertypanel.links_goto"),tooltip:d?b("propertypanel.links_goto_disabled_tooltip"):c.href,href:c.href,disabled:d,click:function(){a.Confluence.PropertyPanel.destroy();var b=j.open(c.href,"confluence-goto-link-"+a.params.pageId+"-"+h);b.focus();b.opener=null}},{className:"link-property-panel-edit-button",text:b("propertypanel.links_edit"),tooltip:b("propertypanel.links_edit_tooltip"),disabled:e(c).hasClass("createlink")||!c.href,click:function(){a.Confluence.PropertyPanel.destroy();g.selection.select(c);
i.Editor.LinkBrowser.open()}},{className:"link-property-panel-unlink-button",text:b("propertypanel.links_unlink"),tooltip:b("propertypanel.links_unlink_tooltip"),click:function(){a.Confluence.PropertyPanel.destroy();g.execCommand("mceConfUnlink",!1,c);g.focus()}}],d=[];a.trigger("link-property-panel-buttons.created",{buttons:d,link:c});b=b.concat(d);a.Confluence.PropertyPanel.createFromButtonModel(this.name,c,b,f);h++}}});
require("confluence/module-exporter").exportModuleAsGlobal("confluence-editor/tinymce3/plugins/propertypanel/js/property-panel-links","AJS.Confluence.PropertyPanel.Link",function(a){var e=require("ajs");e.bind("init.rte",function(){e.trigger("add-handler.property-panel",a)})});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.editor:property-panel-image-link-macro-conf-frontend', location = 'tinymce3/plugins/propertypanel/js/property-panel-macros.js' */
define("confluence-editor/tinymce3/plugins/propertypanel/js/property-panel-macros","ajs tinymce jquery confluence/legacy document confluence/macro-js-overrides underscore".split(" "),function(b,m,d,s,n,t,u){var o=[],p=[],l={},k="__PROPERTY_PANEL_SPACER",v=[{key:k}];return{name:"macro",registeredEvents:o,canHandleElement:function(a){return a.hasClass("editor-inline-macro")||a.hasClass("wysiwyg-macro")},handle:function(a){function i(){var c="macro-placeholder-property-panel-remove-button";e.length>
0&&e[e.length-1].key==k&&(c=c+" first");h.push({className:c,text:"Remove",click:function(){b.Confluence.PropertyPanel.destroy();b.Rte.getEditor().execCommand("mceConfRemoveMacro",j)},ariaLabel:"Remove"});if(g.attr("data-macro-parameters")){var a=s.MacroParameterSerializer.deserialize(g.attr("data-macro-parameters"));if("atlassian-macro-output-type"in a){c=function(c){return function(b){a["atlassian-macro-output-type"]=c;g.attr("data-macro-parameters",
s.MacroParameterSerializer.serialize(a));c=="INLINE"?d(".macro-placeholder-property-panel-display-newline-button").removeClass("active"):d(".macro-placeholder-property-panel-display-inline-button").removeClass("active");d(b).addClass("active")}};h.push(null);h.push({className:"macro-placeholder-property-panel-display-newline-button",tooltip:"Display on new line",selected:a["atlassian-macro-output-type"]=="BLOCK",click:c("BLOCK")});h.push({className:"macro-placeholder-property-panel-display-inline-button",
tooltip:"Display inline",selected:a["atlassian-macro-output-type"]=="INLINE",click:c("INLINE")})}}d.each(o,function(){(!this.macroName||this.macroName==f)&&d(n).bind(q(this.id,this.macroName),this.handler)});c=p;f&&l[f]&&(c=c.concat(l[f]));d.each(c,function(){try{this(j,h,w)}catch(c){b.debug("Property panel init handler failed for : "+f+".  Is global handler : "+(d.inArray(this,p)>-1),c)}});if(h.length>0){var c=b.Confluence.PropertyPanel.createFromButtonModel("macro",
j,h,w),x=t.getFunction(f,"propertyPanelIFrameInjector");x&&x(c)}}if(!(a.e.type!=="click"&&a.e.type!=="mouseup")){var j=a.containerEl,g=d(j),f,e=[],a=!g.hasClass("editor-inline-macro"),y=!g.hasClass("wysiwyg-unknown-macro"),h=[],w={originalHeight:a&&g.height(),anchorIframe:b.Rte.getEditorFrame()},q=function(c,a){return c+"-button-click"+(a?a+".macro":"")+".property-panel"};if(y){var r=d.Deferred();f=g.attr("data-macro-name");if(b.MacroBrowser.getMacroMetadata(f))e=b.MacroBrowser.getMacroMetadata(f).buttons;
(a=t.getFunction(f,"getControls"))?a(function(a){var b=e,a=u.filter(a,function(a){return a.type==="button"}),a=u.map(a,function(a){return{key:a.key,label:a.name.value}});e=b.concat(v).concat(a).concat(v);r.resolve()}):r.resolve();r.done(function(){var a="macro-placeholder-property-panel-edit-button";e.length>0&&e[0].key==k&&(a=a+" last");h.push({className:a,text:"Edit",click:function(){b.Confluence.PropertyPanel.destroy();m.confluence.macrobrowser.editMacro(g)},
ariaLabel:"Edit"});d.each(e,function(a,c){if(c.key!=k){var i="macro-property-panel-"+c.key;a>0&&e[a-1].key==k&&(i=i+" first");a<e.length-1&&e[a+1].key==k&&(i=i+" last");h.push({className:i,text:c.label,parameterName:c.key,click:function(){d(n).trigger(q(c.key),g);d(n).trigger(q(c.key,f),g);b.Confluence.PropertyPanel.destroy()}})}})}).then(i())}else i()}},registerButtonHandler:function(a,b,d){Array.isArray(a)||(a=[a]);a.forEach(function(a){o.push({id:a,handler:b,
macroName:d})})},registerInitHandler:function(a,b){if(b){l[b]=l[b]||[];l[b].push(a)}else p.push(a)},yieldButtonFor:function(a,b){var j;d.each(a,function(){this.parameterName&&this.parameterName==b&&(j=this)});return j}}});require("confluence/module-exporter").exportModuleAsGlobal("confluence-editor/tinymce3/plugins/propertypanel/js/property-panel-macros","AJS.Confluence.PropertyPanel.Macro",function(b){var m=require("ajs");m.bind("init.rte",function(){m.trigger("add-handler.property-panel",b)})});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.editor:property-panel-image-link-macro-conf-frontend', location = 'tinymce3/plugins/propertypanel/js/property-panel-images.js' */
define("confluence-editor/tinymce3/plugins/propertypanel/js/property-panel-images","jquery ajs tinymce confluence-editor/utils/tinymce-image-utils confluence/meta confluence/legacy confluence/api/browser confluence/property-panel".split(" "),function(f,i,E,F,u,v,G,g){function w(){var a=[];f.each(s,function(b,c){a.push(c)});g.current.panel.find(a.join(", ")).removeClass("active")}function p(a,b,c){var e=x(a,b),c=x(a,c),j=e||c;if(j){var d=g.getAnchor(),h=d.width(),d=d.height(),f=u.get("max-thumb-width"),
i=u.get("max-thumb-height");a.thumbnail=k.isRemoteImg(a.destination)?false:k.isThumbnailUsable(e,c,h,d,f,i);a.originalSelected=false;if(b){delete a.height;a.width=j}else{delete a.width;a.height=j}m(a);w();return true}return false}function y(a,b){if(t?p(a,n[b]):p(a,null,n[b])){z(b);m(a);return true}return false}function A(a){delete a.width;delete a.height;a.thumbnail=false;a.originalSelected=true;w();z("original");var b=g,c=b.getAnchor();b.current.updating=true;c.one("load",function(){l(b);q(a);a.width=
Math.floor(c.width());a.height=Math.floor(c.height())});k.updateImageElement(c,a);c.each(function(){this.complete&&f(this).trigger("load")});return true}function z(a){g.current.panel.find(s[a]).addClass("active")}function B(a){f(".image-border-toggle").toggleClass("active",!a.border);a.border=+!a.border||false;m(a)}function m(a){var b=g,c=b.getAnchor(),e=c.attr("src"),f=c.height();b.current.updating=true;k.updateImageElement(c,a);if(a.src!=e){var d=setInterval(function(){var a=c.height();if(a!=f){i.debug("updateImageElement : height changed after image src change - "+
f+" to "+a);clearTimeout(d);d=null;l(b)}},10);setTimeout(function(){if(d){clearTimeout(d);d=null;l(b)}},1E3)}else l(b);q(a)}function q(a){a=a.width?a.width:g.getAnchor().width();a=Math.floor(a);f("#image-size-input").val(a+"px")}function x(a,b){b=parseInt(b);if(!isNaN(b)){b<C?b=C:b>D&&(b=D);return b}return null}var k=F.ImageUtils,t=k.isScaledByWidth(),n;n=t?{small:100,medium:300,large:500}:{small:150,medium:250,large:400};var s={small:".image-size-small",medium:".image-size-medium",large:".image-size-large",
original:".image-size-original"},C=16,D=9E4,l=function(a){a.current.updating=false;a.current.snapToElement({animate:true,animateDuration:100})};return{_resizeImage:p,pluginButtons:[],name:"image",getPresetImageSize:function(a){return n[a]},canHandleElement:function(a){return a.is("img")&&!a.hasClass("editor-inline-macro")&&!a.hasClass("template-variable")},handle:function(a){function b(){p(e,f("#image-size-input").val())?true:q(e);i.trigger("analyticsEvent",{name:"confluence.editor.image.resize.custom"})}
var c;c=a.nodeName==="IMG"?a:a.containerEl;var a=f(c),e=E.confluence.ImageProperties(c);if(e&&!a.attr("data-resource-id")){var j=i.Rte.getEditor(),d=function(a){return j.translate(a)},h=function(a){return{className:["image-size-"+a,"editor-resize","resize-"+a].join(" "),text:d("propertypanel.images_"+a),tooltip:d("propertypanel.images_"+a+"_tooltip"),iconClass:"aui-icon aui-icon-small aui-iconfont-image-resize",click:function(){y(e,a);i.trigger("analyticsEvent",{name:"confluence.editor.image.resize."+
a})},selected:t?e.width==n[a]:e.height==n[a]}},h=[{className:"editable",tooltip:d("propertypanel.images_sizing_tooltip"),html:'<input id="image-size-input"/>'},null,h("small"),h("medium"),h("large"),{className:"image-size-original",text:d("propertypanel.images_original"),tooltip:d("propertypanel.images_original_tooltip"),click:function(){A(e);i.trigger("analyticsEvent",{name:"confluence.editor.image.resize.original"})},selected:e.originalSelected},null,{className:"image-border-toggle",text:d("propertypanel.images_border"),
tooltip:d("propertypanel.images_border_tooltip"),click:function(){B(e)},selected:e.border||e.border==1}];h.push(null);var k=a.parent();if(k.is("a[href]")){h.push({className:"image-link-edit",text:d("propertypanel.images_link_edit"),tooltip:d("propertypanel.images_link_edit_tooltip"),click:function(){g.destroy();j.selection.select(k[0]);v.Editor.LinkBrowser.open()}});h.push({className:"image-link-remove",text:d("propertypanel.images_link_remove"),tooltip:d("propertypanel.images_link_remove_tooltip"),
click:function(){g.destroy();j.execCommand("mceConfUnlink",false,c);j.focus()}})}else h.push({className:"image-make-link",text:d("propertypanel.images_link_create"),tooltip:d("propertypanel.images_link_create_tooltip"),iconClass:"aui-icon aui-icon-small aui-iconfont-link",click:function(){g.destroy();j.selection.select(c);v.Editor.LinkBrowser.open()}});for(var l=g.Image.pluginButtons,r=0;r<l.length;r++)if(l[r]===null)h.push(null);else{var m=l[r].create(a);m&&h.push(m)}g.createFromButtonModel(this.name,
c,h,{anchorIframe:i.Rte.getEditorFrame()});a=f("#image-size-input");a.bind("focus",function(){f(this).select()});a.bind("change",function(){b()});(new G(window.navigator.userAgent)).isIE()&&a.bind("keyup",function(a){a.keyCode===13&&b()});g.current.imageProps=e;q(e);var o=e;return{setPresetSize:function(a){y(o,a)},setPixelSize:function(a){p(o,a)},setToOriginalSize:function(){A(o)},toggleBorder:function(){B(o)},getWidth:function(){return o.width},getHeight:function(){return o.height},getDisplayWidth:function(){return f("#image-size-input").val()},
isButtonSelected:function(a){return g.current.panel.find(s[a]).hasClass("active")}}}}}});require("confluence/module-exporter").exportModuleAsGlobal("confluence-editor/tinymce3/plugins/propertypanel/js/property-panel-images","AJS.Confluence.PropertyPanel.Image",function(f){var i=require("ajs");i.bind("init.rte",function(){i.trigger("add-handler.property-panel",f)})});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.editor:property-panel-image-link-macro-conf-frontend', location = 'tinymce3/plugins/imageproperties/js/image-properties-dialog.js' */
define("confluence-editor/tinymce3/plugins/imageproperties/js/image-properties-dialog",["jquery","ajs"],function(d,a){function l(){h||(h=d("#image-properties-tab-items > div").map(function(){var a=d(this);return{key:a.text(),weight:a.attr("data-weight"),label:this.title}}).sort(function(a,b){return a.weight-b.weight}));return h}function m(){var a=c.popup.element,b=650/60,e=d('<div class="image-properties-loading-blanket"><div class="loading-data"></div></div>').appendTo(a.find(".dialog-page-body")),
f=e.find(".loading-data");e.css({width:e.parent().width(),height:a.height()});f.css({marginTop:-60,marginLeft:-60});f.spin({color:"#666",width:b,radius:25,length:25,top:0,left:0,zIndex:0,speed:1.042});var a=[],g;for(g in i)b=i[g],(b=b.saveFn&&b.saveFn())&&b.done&&a.push(b);d.when.apply(d,a).done(function(){var a=c.popup.element.find(".image-properties-loading-blanket .loading-data");a.css({marginTop:"",marginLeft:""});a.spinStop();a.closest(".image-properties-loading-blanket").remove();c.hide().remove()})}
function o(){c.hide().remove()}var c,h,i={},n;return{init:function(){n||(h=null,0<l().length&&(n=!0,a.Confluence.PropertyPanel.Image.pluginButtons.push(null,{create:function(){return{className:"image-properties",text:"Properties",tooltip:"Set additional image properties",click:function(h,b){a.trigger("analyticsEvent",{name:"confluence.editor.image-properties-trigger"});a.Confluence.PropertyPanel.destroy();d("#image-properties-dialog").remove();c=new a.ConfluenceDialog({id:"image-properties-dialog",
onSubmit:m});a.trigger("dialog-created.image-properties",{img:b});c.popup.element.attr("data-tab-default","0");c.addHeader("Image properties");c.addSubmit("Save",m);c.addCancel("Cancel",o);for(var e=c,f=l(),g=0;g<f.length;g++){var j=f[g],k=i[j.key];k&&e.addPanel(j.label,k.content,k.panelClass,j.key)}1===f.length&&e.popup.element.find(".dialog-page-menu").show();a.trigger("dialog-before-show.image-properties");
c.show()}}}})))},registerPanel:function(a,b,c,d){i[a]={content:b,panelClass:c,saveFn:d}}}});require("confluence/module-exporter").exportModuleAsGlobal("confluence-editor/tinymce3/plugins/imageproperties/js/image-properties-dialog","Confluence.Editor.ImageProps",function(d){var a=require("ajs");a.toInit(d.init);a.bind("quickedit.success",d.init)});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-templates:template-editor-variables-resources', location = 'js/variable-manager.js' */
define("confluence-templates/variable-manager",["confluence/api/event","jquery"],function(f,g){function i(c,a){var b=c.toLocaleLowerCase(),d=a.toLocaleLowerCase(),b=b.localeCompare(d);0==b&&(b=c.localCompare(a));return b}function h(c){return g.extend(!0,{},e.defaults[c]||e.defaults.string)}var e=function(){var c={};return{find:function(a){var a=a.toLocaleLowerCase(),b={},d;for(d in c)if(c.hasOwnProperty(d)&&(!a.length||0===d.toLocaleLowerCase().indexOf(a)))b[d]=c[d];return b},contains:function(a){return!!c[a]},
get:function(a){return c[a]},getAll:function(){return g.extend(!0,{},c)},getSortedNames:function(){var a=[],b;for(b in c)a.push(b);return a.sort(i)},add:function(a,b){c[a]=b||h();f.trigger("add.confluence-variable",{name:a,details:g.extend(!0,{},b)})},del:function(a){var b=c[a];delete c[a];f.trigger("delete.confluence-variable",{name:a,details:g.extend(!0,{},b)})},rename:function(a,b){var d=c[a];delete c[a];d&&(c[b]=d,f.trigger("rename.confluence-variable",{oldName:a,newName:b,details:g.extend(!0,
{},details)}))},createDefault:h}};e.defaultVariableManager=e();e.defaults={textarea:{type:"textarea",rows:5,columns:100},list:{type:"list",options:[]},string:{type:"string"}};return e});"template"===AJS.Meta.get("content-type")&&require("confluence/module-exporter").safeRequire("confluence-templates/variable-manager",function(f){require("confluence/legacy").VariableManager=f});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-templates:template-editor-variables-resources', location = 'js/variable-placeholder.js' */
define("confluence-templates/variable-placeholder",["ajs","jquery"],function(a,d){return{component:{insertPlaceholder:function(c,e){var b;b="$"+c;var f=a.Rte.getEditor();a.Rte.BookmarkManager.storeBookmark();b={title:b,src:a.Meta.get("context-path")+"/plugins/servlet/confluence/placeholder/template-variable?name="+encodeURIComponent(c),"data-variable-name":c,"class":"template-variable",alt:"$"+c};e&&d.extend(b,e);b=d("<img/>").attr(b);f.selection.setNode(b[0])}},init:function(){d(a.Rte.getEditor().getBody()).delegate("img.template-variable",
"dragstart",function(a){a.preventDefault()})}}});"template"===AJS.Meta.get("content-type")&&require("confluence/module-exporter").safeRequire("confluence-templates/variable-placeholder",function(a){require("confluence/legacy").VariablePlaceHolder=a.component;require("ajs").bind("init.rte",a.init)});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-templates:template-editor-variables-resources', location = 'js/variable-toolbar.js' */
define("confluence-templates/variable-toolbar",["ajs","document","confluence/api/event","jquery","confluence/legacy"],function(e,k,h,f,c){return{init:function(){h.bind("init.rte",function(){var g=c.VariableManager.defaultVariableManager,a=f("#template-menu"),i=a.find(".variables-list");h.bind("add.confluence-variable,delete.confluence-variable,rename.confluence-variable",function(){var b=g.getSortedNames(),j=b.length,d="";i.toggleClass("hidden",!j);for(var a=0;a<j;a++)d+=c.Templates.Variables.renderVariableItem({variableName:"$"+
b[a],tooltip:e.format("Insert the \u0027\u0027{0}\u0027\u0027 field into the page for the template user to fill out.",b[a])});i.html(d)});a.delegate(".variables-list a","click",function(){var b=f(this).attr("data-variable-name");!g.contains(b)&&g.add(b);c.VariablePlaceHolder.insertPlaceholder(b)});a.delegate(".variables-add","click",function(b){var a=c.Editor.Autocompleter.Manager.getInputDrivenDropdown();e.Rte.getEditor().focus();(!a||a.inactive)&&c.Editor.Autocompleter.Manager.shortcutFired("$",!0);b.stopPropagation()});f(k).bind("showLayer",
function(b,c,d){"dropdown"===c&&d.$.closest(a).length&&d.reset()})})}}});"template"===AJS.Meta.get("content-type")&&require("confluence/module-exporter").safeRequire("confluence-templates/variable-toolbar",function(e){e.init()});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-templates:template-editor-variables-resources', location = 'js/autocomplete-settings-variables.js' */
define("confluence-templates/autocomplete-settings-variables",["confluence/legacy","ajs"],function(d,c){return function(){function e(a,b){return{callback:function(c){c.replaceWithSelectedSearchText();!f.contains(a)&&f.add(a);d.VariablePlaceHolder.insertPlaceholder(a,b)},name:c.escapeHtml(a),href:"#"}}function i(a,b){return!a&&!b?0:!a?-1:!b?1:a.toLocaleLowerCase().localeCompare(b.toLocaleLowerCase())}var f=d.VariableManager.defaultVariableManager;return{ch:"$",cache:!1,endChars:[],dropDownDelay:0,
preventStartNodes:"",dropDownClassName:"autocomplete-variables",selectFirstItem:!0,getHeaderText:function(a,b){return b?"Variable suggestions":"Variable suggestions"},getAdditionalLinks:function(a,b){var e=d.unescapeEntities(b);return f.get(e)||0===b.length?[]:[{className:"dropdown-create-variable",href:"#",callback:function(a){var b=a.plainText();a.replaceWithSelectedSearchText();!f.contains(b)&&f.add(b);d.VariablePlaceHolder.insertPlaceholder(b,
void 0)},name:c.format("Create variable \u0027\u0027{0}\u0027\u0027",b)}]},getDataAndRunCallback:function(a,b,c){var g,k,a=d.unescapeEntities(b),j=f.find(a),h=[],l=[];for(g in j)j.hasOwnProperty(g)&&h.push(g);h.sort(i);a=0;for(k=h.length;a<k;a++)g=h[a],l.push(e(g,j[g]));c([l],b)},update:function(){}}}});
require("confluence/module-exporter").safeRequire("confluence-templates/autocomplete-settings-variables",function(d){var c=require("ajs"),e=require("confluence/legacy"),i=require("confluence/meta");c.bind("init.rte",function(){var c=require("tinymce");"template"===i.get("content-type")&&(e.Editor.Autocompleter||(e.Editor.Autocompleter=c.confluence.Autocompleter),e.Editor.Autocompleter.Settings.$=d())})});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-templates:template-editor-variables-resources', location = 'js/property-panel-variables.js' */
define("confluence-templates/property-panel-variables",["ajs","jquery","confluence/legacy"],function(b,a,h){return{name:"variable",canHandleElement:function(a){return a.hasClass("template-variable")},handle:function(f){function l(d){b.debug("clicked type: "+d);var c=a("#property-panel");c.find(".panel-buttons").toggleClass("no-inputs","string"===d);c.find(".textarea-section,.list-section,.string-section").addClass("hidden");c.find("."+d+"-section").removeClass("hidden");"textarea"===d?(a("#variable-property-panel-textarea-rows").val(e.rows),
a("#variable-property-panel-textarea-columns").val(e.columns)):"list"===d&&a("#variable-property-panel-list-values").val(e.options.join(","))}function i(d,b,c){return{className:"variable-property-panel-type-item variable-property-panel-type-"+d,text:b,tooltip:c,selected:m===d,click:function(){e.type=d;e=j.createDefault(d);j.add(k,e);a(".variable-property-panel-type-item").removeClass("selected");a(".variable-property-panel-type-"+d).addClass("selected");l(d)}}}function g(a){return m===a?"":" hidden"}
if(!("click"!==f.e.type&&"mouseup"!==f.e.type)){var f=f.containerEl,n=a(f),k,c=[],o={originalHeight:n.height(),anchorIframe:b.Rte.getEditorFrame()};k=n.attr("data-variable-name");var j=h.VariableManager.defaultVariableManager,e=j.get(k),m=e&&e.type||"string";c.push(i("string","Text","Single line text input field."));c.push(i("textarea","Multi-line Text","Multi-line text input field."));
c.push(i("list","List","Drop down list."));c.push(null);c.push({className:"editable textarea-section"+g("textarea"),tooltip:"Number of rows to display for the field.",html:'<input id="variable-property-panel-textarea-rows"/>'});c.push({className:"variable-property-panel-textarea-split textarea-section"+g("textarea"),tooltip:"",html:"<span>x</span>"});c.push({className:"editable textarea-section"+
g("textarea"),tooltip:"Number of columns to display for the field.",html:'<input id="variable-property-panel-textarea-columns"/>'});c.push(null);c.push({className:"editable list-section"+g("list"),tooltip:"Enter each item for the list, separating each with a comma.",html:"<input id=\"variable-property-panel-list-values\" size='50'/>"});b.Confluence.PropertyPanel.createFromButtonModel("variable",f,c,o);l(e.type);a("#variable-property-panel-textarea-rows").change(function(){e.rows=
+a(this).val()||h.VariableManager.defaults.textarea.rows});a("#variable-property-panel-textarea-columns").change(function(){e.columns=+a(this).val()||h.VariableManager.defaults.textarea.columns});a("#variable-property-panel-list-values").change(function(){var d,b,c,f=a(this).val().split(",");e.options=[];d=0;for(b=f.length;d<b;d++)(c=a.trim(f[d]))&&e.options.push(c)});a("#variable-property-panel-textarea-rows,#variable-property-panel-textarea-columns,#variable-property-panel-list-values").keypress(function(b){13===
b.which&&a(this).blur()})}}}});require("confluence/module-exporter").exportModuleAsGlobal("confluence-templates/property-panel-variables","AJS.Confluence.PropertyPanel.Variable",function(b){var a=require("ajs");a.bind("init.rte",function(){a.trigger("add-handler.property-panel",b)})});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-templates:template-editor-variables-resources', location = 'js/variable-marshaller.js' */
define("confluence-templates/variable-marshaller",["ajs","jquery","confluence/legacy"],function(d,b,p){function q(c){var a=c.attr("data-variable-type");return"textarea"===a?{type:a,rows:+c.attr("data-variable-rows")||i,columns:+c.attr("data-variable-columns")||r}:"list"===a?{type:a,options:c.find("li").map(function(){return b(this).attr("data-variable-option")}).toArray()}:{type:"string"}}function m(){var c=b(d.Rte.getEditor().getBody()).find("img[data-variable-name]"),a={};b.map(c,function(c){var f=
{};b(c).attr("data-variable-raw-xhtml")&&(f={"data-variable-raw-xhtml":!0});a[b(c).attr("data-variable-name")]=f});return a}var i=5,r=100;return function(){function c(a){for(var b in a)a.hasOwnProperty(b)&&!f.contains(b)&&(d.debug("adding: ",b),f.add(b,a[b]))}var a=d.Rte.getEditor(),i=b(a.getBody()),f=p.VariableManager.defaultVariableManager;a.on("GetContent",function(a){if(!a.selection){var d=b("<div></div>"),i=b("<ul></ul>").attr("data-variable-declarations","true"),e;d.append(i);var n=m();c(n);
var o=f.getAll(),l;for(l in o)if(n.hasOwnProperty(l)){var j=l;e=o[l];var g=void 0,k=void 0,g=e.type,h=b("<li></li>");h.attr("data-variable-name",j);h.attr("data-variable-type",g);h.text(j);if("textarea"===g)h.attr("data-variable-rows",e.rows),h.attr("data-variable-columns",e.columns);else if("list"===g){g=b("<ul></ul>");j=void 0;for(j in e.options)k=e.options[j],k=b("<li></li>").text(k).attr("data-variable-option",k),g.append(k);h.append(g)}e=h;i.append(e)}a.content=d.html()+a.content}});a=i.find("ul[data-variable-declarations]");
a.remove();a.find("li[data-variable-name]").each(function(){var a=b(this);f.add(a.attr("data-variable-name"),q(a))});c(m())}});"template"===AJS.Meta.get("content-type")&&require("confluence/module-exporter").safeRequire("confluence-templates/variable-marshaller",function(d){require("ajs").bind("init.rte",d)});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-templates:template-editor-variables-template-resources', location = 'js/variable-templates.soy' */
// This file was automatically generated from variable-templates.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Confluence.Templates.Variables.
 */

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Templates == 'undefined') { Confluence.Templates = {}; }
if (typeof Confluence.Templates.Variables == 'undefined') { Confluence.Templates.Variables = {}; }


Confluence.Templates.Variables.renderVariableItem = function(opt_data, opt_ignored) {
  return '<li class="dropdown-item" data-tooltip="' + soy.$$escapeHtml(opt_data.tooltip) + '"><a href="#" class="item-link variable-item" title="' + soy.$$escapeHtml(opt_data.variableName) + '" data-variable-name="' + soy.$$escapeHtml(opt_data.variableName) + '">' + soy.$$escapeHtml(opt_data.variableName) + '</a></li>';
};
if (goog.DEBUG) {
  Confluence.Templates.Variables.renderVariableItem.soyTemplateName = 'Confluence.Templates.Variables.renderVariableItem';
}

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.onresolve.confluence.groovy.groovyrunner:split_createPage', location = 'js/createPage.8c072a29a501af47423b.js' */
"use strict";(self.webpackJsonpScriptRunner=self.webpackJsonpScriptRunner||[]).push([["createPage"],{98725:function(){var e=this&&this.__values||function(e){var t="function"==typeof Symbol&&Symbol.iterator,a=t&&e[t],r=0;if(a)return a.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")};function t(e,t){var n=e(t),o=n.find("a.adaptavist-create-page-link"),i=o.attr("href"),c=o.attr("openInNewTab"),l=a("parentId",i),s=a("spaceKey",i),f=function(t){var a=r(o,n),l=AJS.escapeHtml(a);if(!1===t.success)AJS.messages.warning(e("#action-messages"),{title:t.errorMessage,body:"<p>Title: ".concat(l,"</p><p>Space: ").concat(AJS.escapeHtml(s),"</p>")}),o.attr("href",i);else{var f=i.concat("&title=".concat(encodeURIComponent(a)));"true"===c?(AJS.$("#text-input").val(""),window.open(f,"_blank")):window.location.href=f,o.attr("href",i)}},u=function(t){t.preventDefault(),o.removeAttr("href");var a=r(o,n);""!==a&&e.ajax({type:"POST",url:"".concat(AJS.contextPath(),"/rest/create-page/1.0/pageResources/pagesExist"),data:JSON.stringify({space:s,title:a,parentId:l}),error:function(t,a,r){console.error(t.statusText),console.error(a),console.error(r),AJS.messages.error(e("#action-messages"),{title:"JS ERROR",body:r})},dataType:"json",contentType:"application/json; charset=utf-8",success:f,async:!1})},d=n.find(".create-page-dialog");n.find(".dialog-close-button").off("click").on("click",(function(){AJS.dialog2(d).hide()})),n.find(".dialog-submit-button").off("click").on("click",(function(e){var t=d.find("input").val();o.attr("data-title-dialog",t),""===t?d.find(".submitHiddenButton").click():(AJS.dialog2(d).hide(),u(e))})),o.off("click").on("click",u)}function a(e,t){var a=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]"),r=new RegExp("[?&]".concat(a,"=([^&#]*)")).exec(t);return null===r?null:r[1]}function r(e,t){var a=e.attr("data-title-dialog");if(""===a){var r=t.find(".create-page-dialog");return AJS.dialog2(r).show(),""}return e.attr("data-prefix")&&(a=e.attr("data-prefix")+a),e.attr("data-postfix")&&(a+=e.attr("data-postfix")),a}jQuery((function(a){var r=document.querySelector("#main-content");if(a(".create-page-main-div").each((function(e,r){t(a,r)})),r){new MutationObserver((function(r){r.forEach((function(r){var n,o,i,c,l=r.addedNodes;if(l){var s=a(l);try{for(var f=e(s),u=f.next();!u.done;u=f.next()){var d=u.value.getElementsByClassName("create-page-main-div");if(d)try{for(var p=(i=void 0,e(d)),v=p.next();!v.done;v=p.next()){var g=v.value;t(a,g)}}catch(e){i={error:e}}finally{try{v&&!v.done&&(c=p.return)&&c.call(p)}finally{if(i)throw i.error}}}}catch(e){n={error:e}}finally{try{u&&!u.done&&(o=f.return)&&o.call(f)}finally{if(n)throw n.error}}}}))})).observe(r,{childList:!0,subtree:!0})}}))}},e=>{var t;t=98725,e(e.s=t)}]);
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.onresolve.confluence.groovy.groovyrunner:split_pageInfo', location = 'js/pageInfo.309040334d824f7c2399.js' */
"use strict";(self.webpackJsonpScriptRunner=self.webpackJsonpScriptRunner||[]).push([["pageInfo"],{47753:()=>{AJS.toInit((function(){AJS.MacroBrowser.setMacroJsOverride("page-info",{beforeParamsSet:function(e){var a=e[""];if(a)switch(a){case"created-user":e.infoType="Created by";break;case"created-date":e.infoType="Create date";break;case"modified-user":e.infoType="Modified by";break;case"modified-users":e.infoType="Modified users";break;case"modified-date":e.infoType="Modified date";break;case"participants":e.infoType="Participants";break;case"commenters":e.infoType="Commenters";break;case"current-version":e.infoType="Current version";break;case"versions":e.infoType="Versions";break;case"diffs":e.infoType="Diffs";break;case"labels":e.infoType="Labels";break;case"tinyurl":e.infoType="Tiny url";break;case"title":e.infoType="Title";break;case"pageId":e.infoType="Page id"}return e}})}))}},e=>{var a;a=47753,e(e.s=a)}]);
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-mentions-plugin:smart-mentions-editor-resources', location = 'templates/mentions.soy' */
// This file was automatically generated from mentions.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Confluence.Templates.Mentions.
 */

if (typeof Confluence == 'undefined') { var Confluence = {}; }
if (typeof Confluence.Templates == 'undefined') { Confluence.Templates = {}; }
if (typeof Confluence.Templates.Mentions == 'undefined') { Confluence.Templates.Mentions = {}; }


Confluence.Templates.Mentions.userNotFoundResult = function(opt_data, opt_ignored) {
  return '<div class="mention-error no-result">' + soy.$$escapeHtml('Sorry, we can\x27t find that person') + '</div>';
};
if (goog.DEBUG) {
  Confluence.Templates.Mentions.userNotFoundResult.soyTemplateName = 'Confluence.Templates.Mentions.userNotFoundResult';
}


Confluence.Templates.Mentions.searchFailureResult = function(opt_data, opt_ignored) {
  return '<div class="mention-error search-failure"><div class="search-failure-title">' + soy.$$escapeHtml('Something went wrong') + '</div><div class="search-failure-body">' + soy.$$escapeHtml('We can\x27t fetch people right now. Try again in a few minutes.') + '</div></div>';
};
if (goog.DEBUG) {
  Confluence.Templates.Mentions.searchFailureResult.soyTemplateName = 'Confluence.Templates.Mentions.searchFailureResult';
}


Confluence.Templates.Mentions.loadingPlaceholder = function(opt_data, opt_ignored) {
  return '<div class="mention-loading"><div class="avatar-placeholder"></div><div class="text-container"><div class="text-placeholder lg"></div><div class="text-placeholder sm"></div></div></div>';
};
if (goog.DEBUG) {
  Confluence.Templates.Mentions.loadingPlaceholder.soyTemplateName = 'Confluence.Templates.Mentions.loadingPlaceholder';
}

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-mentions-plugin:smart-mentions-editor-resources', location = '/js-target/bundle.js' */
define("confluence-mentions", ["ajs","confluence/meta","jquery","confluence/legacy","confluence/templates","confluence-editor/tinymce3/plugins/autocomplete/autocomplete-manager","tinymce","confluence/storage-manager","confluence/dark-features","confluence/analytics-support","confluence-link-browser/link-object","confluence-editor/tinymce3/plugins/autocomplete/autocomplete-settings"], function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_12__, __WEBPACK_EXTERNAL_MODULE_15__, __WEBPACK_EXTERNAL_MODULE_18__, __WEBPACK_EXTERNAL_MODULE_19__, __WEBPACK_EXTERNAL_MODULE_36__, __WEBPACK_EXTERNAL_MODULE_44__, __WEBPACK_EXTERNAL_MODULE_50__, __WEBPACK_EXTERNAL_MODULE_51__, __WEBPACK_EXTERNAL_MODULE_52__) { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 20);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (module, exports) {
    'use strict';

    exports.default = {
        CURRENT: 'current',
        RELATED: 'related',
        RECENT: 'recent',
        SERVER: 'server'
    };
    module.exports = exports['default'];
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(0), __webpack_require__(29), __webpack_require__(36), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (module, exports, _ajs, _lruCache, _storageManager, _userSupplierKeys) {
    'use strict';

    var AJS = _interopRequireDefault(_ajs).default;

    var LRU = _interopRequireDefault(_lruCache).default;

    var StorageManager = _interopRequireDefault(_storageManager).default;

    var UserSupplier = _interopRequireDefault(_userSupplierKeys).default;

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    /**
     * Returns users from a localstorage-backed LRU (least-recently-used) cache, and adds entries to that cache.
     */
    var inMemoryCache = void 0;
    var persistentCache = void 0;

    var CACHE_PREFIX = 'mentions';
    var CACHE_ID = 'recently-mentioned-users';
    var CACHE_ITEMS_KEY = 'items';

    /**
     * The maximum number of recently-mentioned users to keep in the cache.
     * @type {number}
     */
    var RECENT_USER_LIMIT = 20;
    /**
     * WaterTightValidation means that any users at or past this expiry _must_ be refreshed before being displayed in the UI.
     * @type {{expireTimeMillis: number}}
     */
    var WATERTIGHT_VALIDATION = { expireTimeMillis: 29 * 24 * 60 * 60 * 1000 }; //29 days in millis
    /**
     * EarlyValidation means that any users at or past this expiry _should_ be refreshed after the UI is completed (so as to not block users)
     * @type {{expireTimeMillis: number}}
     */
    var EARLY_VALIDATION = { expireTimeMillis: 7 * 24 * 60 * 60 * 1000 }; //7 days in millis
    /**
     * stores the enums used for calls to {getStaleUsers()}.
     * @type {{WATERTIGHT_VALIDATION: {expireTimeMillis: number}, EARLY_VALIDATION: {expireTimeMillis: number}}}
     */
    var ValidationType = { WATERTIGHT_VALIDATION: WATERTIGHT_VALIDATION, EARLY_VALIDATION: EARLY_VALIDATION };

    // Lazy-initialise to avoid interacting with localStorage when it isn't required.
    function loadCache() {
        inMemoryCache = LRU(RECENT_USER_LIMIT);
        persistentCache = new StorageManager(CACHE_PREFIX, CACHE_ID);

        var recentUsersDump = persistentCache.getItem(CACHE_ITEMS_KEY);
        if (recentUsersDump) {
            var recentUsersJson = JSON.parse(recentUsersDump);
            inMemoryCache.load(recentUsersJson);
        }
    }

    function getUsers() {
        return new Promise(function (resolve) {
            inMemoryCache || loadCache();

            // Add users with order of most-recently-mentioned first
            var users = [];
            var index = 0;
            inMemoryCache.forEach(function (user) {
                user.supplier = UserSupplier.RECENT;
                user.role = null;
                user.sortIndex = index++;
                users.push(user);
            });
            AJS.debug('Found ' + users.length + ' recently-mentioned users');
            resolve(users);
        });
    }

    /**
     * Store a recently-mentioned User in the cache.
     * @param user
     * @param refreshed {Boolean} true if the user is from the server. This will update the timestamp of the last refresh to now().
     *                            Defaults to false if not passed in.
     */
    function store(user, refreshed) {
        inMemoryCache || loadCache();
        var oldUser = inMemoryCache.peek(user.username);
        var oldRefreshDate = oldUser ? oldUser.refreshedAt || 0 : 0;
        var refreshedAt = refreshed || !oldUser ? new Date().getTime() : oldRefreshDate;
        inMemoryCache.set(user.username, Object.assign({}, user.model ? user.model : user, { timestamp: user.timestamp, refreshedAt: refreshedAt }));
        persistentCache.setItemQuietly(CACHE_ITEMS_KEY, JSON.stringify(inMemoryCache.dump()));
    }

    function remove(username) {
        inMemoryCache || loadCache();
        inMemoryCache.del(username);
        persistentCache.setItemQuietly(CACHE_ITEMS_KEY, JSON.stringify(inMemoryCache.dump()));
    }

    /**
     * A stale user is one which has not been refreshed from the server for X days or more, X being calculated from the validation type.
     * @param validationType {{expireTimeMillis: number}} an enum to flag what kind of stale users to return. Use a value from ValidationType
     * @return {Array} a list of stale usersnames (NOTE: not the user objects - just the usernames)
     */
    function getStaleUsers(validationType) {
        inMemoryCache || loadCache();
        var stale = [];
        var now = new Date().getTime();
        //use a hack to iterate the keys to prevent the LRU from changing the ordering
        var existingKeys = inMemoryCache.keys();
        existingKeys.map(function (k) {
            return [inMemoryCache.peek(k), k];
        }).forEach(function (entry) {
            var val = entry[0];
            var key = entry[1];
            if (!val.refreshedAt || now - val.refreshedAt > validationType.expireTimeMillis) {
                stale.push(key);
            }
        });
        return stale;
    }

    function refresh(users) {
        inMemoryCache || loadCache();
        users.forEach(function (user) {
            if (inMemoryCache.has(user.username)) {
                var entry = inMemoryCache.peek(user.username);
                var timestamp = entry.timestamp || 0;
                //treat no timestamp as though it is stale, and refresh it
                if (!user.timestamp || !timestamp || user.timestamp > timestamp) {
                    store(user, true);
                }
            }
        });
    }

    // Used in tests
    function _clear() {
        loadCache();
    }

    exports.default = {
        getUsers: getUsers,
        store: store,
        remove: remove,
        getStaleUsers: getStaleUsers,
        refresh: refresh,
        _clear: _clear,
        RECENT_USER_LIMIT: RECENT_USER_LIMIT,
        ValidationType: ValidationType
    };
    module.exports = exports['default'];
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(0), __webpack_require__(7), __webpack_require__(14), __webpack_require__(41), __webpack_require__(48), __webpack_require__(17)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (module, exports, _ajs, _userSupplierManager, _userCache, _pipelines, _executor, _scoreBooster) {
    'use strict';

    var AJS = _interopRequireDefault(_ajs).default;

    var userSupplierManager = _interopRequireDefault(_userSupplierManager).default;

    var UserCache = _interopRequireDefault(_userCache).default;

    var Pipelines = _interopRequireDefault(_pipelines).default;

    var PipelineExecutor = _interopRequireDefault(_executor).default;

    var ScoreBooster = _interopRequireDefault(_scoreBooster).default;

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    "use strict";

    /**
     * The maximum number of Users that will be displayed in the Mentions dropdown.
     */
    var DISPLAY_LIMIT = 5;
    var NON_BREAKING_SPACE = String.fromCharCode(160);

    // The last query to be triggered, used when server responses return out of order and we need to skip the render of
    // stale responses.
    var latestQuery = void 0;

    /**
     *
     * @param {string}   query              User's query
     * @param {function} renderCallback     Callback function to render the results
     * @param {function} selectedUser       (optional) the currently-selected user in the dropdown
     * @param {object} editor               the currently-active editor
     */
    function searchAndRender(query, renderCallback, selectedUser, editor) {
        // Trim the query but don't convert to lowercase just yet - the ranker should handle this. (i.e. upper case
        // letters could be weighted higher in matches).
        // Note that 160 is the non-breaking-space character and is not handled by trim().
        // It IS handled by $.trim(str) but noooooo, noooooo.
        query = query.replace(NON_BREAKING_SPACE, ' ').trim();
        latestQuery = query;

        var promises = userSupplierManager.search(query, editor);

        promises.client.then(function () {
            resolveClientUsers();
            // Guarantee that server results are handled after local ones - chain the promises!
            promises.server.then(resolveServerUsers, renderErrorOnReject);
        }, renderErrorOnReject);

        function resolveClientUsers() {
            renderPipeline(UserCache.getAll(), query, renderCallback, selectedUser, false);
        }

        function resolveServerUsers() {
            // We could in future wrap the renderCallback so that if the server render would have the same values as the
            // client render, we skip it and avoid a browser repaint.
            renderPipeline(UserCache.getAll(), query, renderCallback, selectedUser, true);
        }

        function renderErrorOnReject() {
            var iterator = new PipelineExecutor(Pipelines.error(renderCallback));
            iterator.execute([]);
        }
    }

    function renderPipeline(users, query, renderCallback, selectedUser, isServerCall) {
        var context = {
            query: query,
            latestQuery: latestQuery,
            selectedUser: selectedUser,
            isServerCall: isServerCall,
            DISPLAY_LIMIT: DISPLAY_LIMIT
        };

        var pipeline = void 0;
        if (!query) {
            pipeline = Pipelines.default(renderCallback);
        } else {
            pipeline = isServerCall ? Pipelines.server(renderCallback) : Pipelines.client(renderCallback);
        }

        var executor = new PipelineExecutor(pipeline, context);
        executor.execute(users);
    }

    // Called during testing to clear caches.
    function reset() {
        userSupplierManager.reset();
        UserCache._clear();
        ScoreBooster.reset();
    }

    exports.default = {
        searchAndRender: searchAndRender,
        prefetchSuppliers: userSupplierManager.prefetchSuppliers,
        reset: reset
    };
    module.exports = exports['default'];
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(8), __webpack_require__(4), __webpack_require__(11), __webpack_require__(40), __webpack_require__(14)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (module, exports, _relatedUsersSupplier, _recentUsersSupplier, _serverUsersSupplier, _currentUserSupplier, _userCache) {
    'use strict';

    var RelatedUsersSupplier = _interopRequireDefault(_relatedUsersSupplier).default;

    var RecentUsersSupplier = _interopRequireDefault(_recentUsersSupplier).default;

    var ServerUsersSupplier = _interopRequireDefault(_serverUsersSupplier).default;

    var CurrentUserSupplier = _interopRequireDefault(_currentUserSupplier).default;

    var UserCache = _interopRequireDefault(_userCache).default;

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _slicedToArray = function () {
        function sliceIterator(arr, i) {
            var _arr = [];
            var _n = true;
            var _d = false;
            var _e = undefined;

            try {
                for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                    _arr.push(_s.value);

                    if (i && _arr.length === i) break;
                }
            } catch (err) {
                _d = true;
                _e = err;
            } finally {
                try {
                    if (!_n && _i["return"]) _i["return"]();
                } finally {
                    if (_d) throw _e;
                }
            }

            return _arr;
        }

        return function (arr, i) {
            if (Array.isArray(arr)) {
                return arr;
            } else if (Symbol.iterator in Object(arr)) {
                return sliceIterator(arr, i);
            } else {
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            }
        };
    }();

    "use strict";

    /**
     *
     * @param {string}   query              User's query
     * @param {object}   editor             the currently-active editor
     */
    function search(query, editor) {

        var serverUsersPromise = ServerUsersSupplier.getUsers(query);
        var relatedUsersPromise = RelatedUsersSupplier.getUsers(editor);
        var recentUsersPromise = RecentUsersSupplier.getUsers();
        var currentUserPromise = CurrentUserSupplier.getCurrentUser();

        var fastPromises = [relatedUsersPromise, recentUsersPromise, currentUserPromise];

        return {
            client: Promise.all(fastPromises).then(function (_ref) {
                var _ref2 = _slicedToArray(_ref, 3),
                    relatedUsers = _ref2[0],
                    recentUsers = _ref2[1],
                    currentUser = _ref2[2];

                UserCache.addAll(relatedUsers);
                UserCache.addAll(recentUsers, true);
                if (currentUser) {
                    // May be undefined if anonymous.
                    UserCache.add(currentUser, true);
                }
            }),
            server: serverUsersPromise.then(function (serverUsers) {
                UserCache.addAll(serverUsers);
                RecentUsersSupplier.refresh(serverUsers);
            })
        };
    }

    function prefetchSuppliers(editor) {
        var waterTightValidationCheck = RecentUsersSupplier.getStaleUsers(RecentUsersSupplier.ValidationType.WATERTIGHT_VALIDATION);
        if (waterTightValidationCheck.length > 0) {
            //found some users whose stale for longer than 30 days. Must revalidate and delete if needed, before showing in UI.
            deleteStaleUsers(waterTightValidationCheck, RecentUsersSupplier.ValidationType.WATERTIGHT_VALIDATION);
        }
        // This will load related users into the cache in 'service/content-users/users-related-to-content'.
        RelatedUsersSupplier.getUsers(editor);
    }

    function deleteStaleUsers(usersToCheck, validationType) {
        ServerUsersSupplier._searchWithUsernames(usersToCheck).then(function (resultUsers) {
            RecentUsersSupplier.refresh(resultUsers);
            //if users are still stale after a refresh, it means they've not been returned by the server
            //time to delete 'em
            var usersToDelete = RecentUsersSupplier.getStaleUsers(validationType);
            usersToDelete.forEach(function (u) {
                return RecentUsersSupplier.remove(u);
            });
        });
    }

    // Reset any of the suppliers that hold state. Used in testing.
    function reset() {
        RelatedUsersSupplier.reset();
        ServerUsersSupplier.reset();
        RecentUsersSupplier._clear();
    }

    exports.default = {
        search: search,
        prefetchSuppliers: prefetchSuppliers,
        deleteStaleUsers: deleteStaleUsers,
        reset: reset
    };
    module.exports = exports['default'];
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(24), __webpack_require__(25)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (module, exports, _draftContentSupplier, _usersRelatedToContent) {
    'use strict';

    var getDraft = _interopRequireDefault(_draftContentSupplier).default;

    var UsersRelatedToContent = _interopRequireDefault(_usersRelatedToContent).default;

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    /**
     Returns users related to the Content currently in the Editor, optionally filtered by a search string.
    
     You can test this logic in your browser console against a running instance by running something like :
    
     `require('confluence-mentions').userSuppliers.contentRelated.getUsers().then((result) => { window.relatedUsers = result; });`
    
     and then viewing the `window.relatedUsers` value.
     */
    function getUsers(editor) {
        var content = getDraft(editor);
        return UsersRelatedToContent.getUsers(content);
    }

    /*
     We assume that all useful information is returned in the getUsersRelatedTo call.
     */
    function isExhausted() {
        return true;
    }

    // Clears the related user cache, used in testing.
    function reset() {
        UsersRelatedToContent.reset();
    }

    exports.default = {
        getUsers: getUsers,
        isExhausted: isExhausted,
        reset: reset
    };
    module.exports = exports['default'];
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(10)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (module, exports, _i18n) {
    'use strict';

    var I18n = _interopRequireDefault(_i18n).default;

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var newRole = function newRole(role) {
        return {
            role: role,
            i18n: I18n('user.role.' + role)
        };
    }; /**
        A simple User Role bean that can provide its i18n'd display name.
        */
    exports.default = {
        CREATOR: newRole('creator'),
        CONTRIBUTOR: newRole('contributor'),
        COMMENTER: newRole('commenter'),
        ANCESTOR_COMMENTER: newRole('ancestorCommenter') // never shown, but available
    };
    module.exports = exports['default'];
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (module, exports, _ajs) {
    'use strict';

    var AJS = _interopRequireDefault(_ajs).default;

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var i18nMap = {
        'user.role.creator': "Creator",
        'user.role.contributor': "Contributor",
        'user.role.commenter': "Commenter",
        'user.supplier.recent': "Recent"
    }; /**
        A way to get the i18nTransformer away from all-the-JS, this module allows clients to get I18n text using
        dynamic keys. Normally the i18nTransformer would fail to handle this and the developer would be forced to add
       
        AJS.format("foo100")
       
        entries for each case. By extracting those invocations of AJS.I18n.getText to a single place, we can plan for a future
        where the transformer is not necessary and we can serve one set of JS resources for all locales.
       
        A future improvement might be to generate an i18n.js file directly from a plugin's
        i18n.properties file at build time.
        */

    exports.default = function (key) {
        // TODO - could interpolate args, etc. dT
        return i18nMap[key];
    };

    module.exports = exports['default'];
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(0), __webpack_require__(12), __webpack_require__(2), __webpack_require__(3), __webpack_require__(13), __webpack_require__(38), __webpack_require__(1), __webpack_require__(39)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (module, exports, _ajs, _legacy, _meta, _jquery, _userRanker, _serverUserCache, _userSupplierKeys, _luceneQuery) {
    'use strict';

    var AJS = _interopRequireDefault(_ajs).default;

    var Confluence = _interopRequireDefault(_legacy).default;

    var Meta = _interopRequireDefault(_meta).default;

    var $ = _interopRequireDefault(_jquery).default;

    var UserRanker = _interopRequireDefault(_userRanker).default;

    var Cache = _interopRequireDefault(_serverUserCache).default;

    var UserSupplier = _interopRequireDefault(_userSupplierKeys).default;

    var LuceneQuery = _interopRequireDefault(_luceneQuery).default;

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    /**
     * Wait this long after REST call triggers before actually doing a search - results in fewer HTTP requests.
     */
    var DEBOUNCE_WAIT_MS = 250;

    // 1 char query is now supported by CQL.
    var MIN_CHARS_TO_SEARCH = 1;

    var limit = 100;
    var cache = Cache(limit);

    /**
     * The id of the last timeout to be created for a REST call. We cancel this timeout if
     * a scheduled call becomes stale.
     */
    var lastTimeout = void 0;

    /**
     Returns users from the backend via a CQL search.
     */
    function getUsers(query) {
        return new Promise(function (resolve, reject) {

            if (!query || query.length < MIN_CHARS_TO_SEARCH) {
                // No query - no server results.
                return resolve([]);
            }

            AJS.debug('server-users-supplier: Looking in cache for ' + query);
            var cacheEntry = cache.getClosest(query);
            if (cacheEntry) {
                AJS.debug('server-users-supplier: Found cache entry with query ' + cacheEntry.query);
                if (cacheEntry.query === query) {
                    // Exact match - just serve these results.
                    return resolve(cacheEntry.users);
                }

                // Not an exact match. Might need a REST call, but we can show results based on what we have cached.
                var rankedUsers = UserRanker(cacheEntry.users, query);
                cache.add(query, rankedUsers);

                // TODO Always resolve with what we have from the cache - this is information that can be put in front of
                // the user immediately. We then decide whether to follow up the local results with remote ones.
                // However, we need the ability to 'resolve' multiple times - to call the render once with the cached
                // results and again (if not debounced, stale, etc, etc) with the server results.
                if (cacheEntry.isExhausted) {
                    return resolve(rankedUsers);
                }

                // Else we might be searching for "John" but "Joh" already has >={limit} users.
                // We need to hit the server!
                // TODO - can we resolve multiple times?
            }

            var contextPath = Meta.get('context-path');
            var escapedQuery = LuceneQuery.escape(query);
            var queryParameters = {
                cql: 'user ~ "' + Confluence.unescapeEntities(escapedQuery) + '"',
                start: 0,
                limit: limit
            };
            var url = contextPath + '/rest/api/search';
            var success = function success(response) {
                var results = response.results;
                var users = results.map(function (result) {
                    var user = result.user;
                    user.supplier = UserSupplier.SERVER;
                    user.timestamp = result.timestamp;
                    AJS.debug('server-users-supplier: Adding user to cache: ' + user.username);
                    return user;
                });
                cache.add(query, users);
                resolve(users);
            };

            // Debounce
            clearTimeout(lastTimeout);
            lastTimeout = setTimeout(function () {
                $.getJSON(url, queryParameters, success).fail(reject);
            }, DEBOUNCE_WAIT_MS);
        });
    }

    /**
     * Forces a search for exact usernames. Use this to ensure the cached entries in
     * other suppliers are not stale.
     * @param usernames {Array} Array of username strings
     * @returns {Promise} a promise which will resolve with an array of user objects from the search that matched any of the input usernames.
     * @private
     */
    function _searchWithUsernames(usernames) {
        return new Promise(function (resolve, reject) {
            if (!usernames || usernames.length === 0) {
                return resolve([]);
            }
            var contextPath = Meta.get('context-path');
            var queryParameters = {
                cql: 'user in (' + usernames.map(function (u) {
                    return '"' + u + '"';
                }).join(",") + ')',
                start: 0,
                limit: usernames.length
            };
            AJS.debug('querying with \'' + queryParameters.cql + '\'');
            var url = contextPath + '/rest/api/search';
            var success = function success(response) {
                var results = response.results;
                var users = results.map(function (result) {
                    var user = result.user;
                    user.supplier = UserSupplier.SERVER;
                    user.timestamp = result.timestamp;
                    return user;
                });
                resolve(users);
            };

            // Debounce
            clearTimeout(lastTimeout);
            lastTimeout = setTimeout(function () {
                $.getJSON(url, queryParameters, success).fail(reject);
            }, DEBOUNCE_WAIT_MS);
        });
    }

    /**
     If a given search returns less that the specified limit, we say that that query is exhausted - adding more
     characters to the query will return a subset of users from the shorter query.
     */
    function isExhausted(query) {
        return true;
    }

    // Flushes the cache between tests.
    function reset() {
        cache.reset();
        AJS.debug('server-users-supplier: Cache reset');
    }

    exports.default = {
        getUsers: getUsers,
        _searchWithUsernames: _searchWithUsernames,
        isExhausted: isExhausted,
        reset: reset,
        DEBOUNCE_WAIT_MS: DEBOUNCE_WAIT_MS
    };
    module.exports = exports['default'];
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_12__;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(12), __webpack_require__(37)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (module, exports, _legacy, _fuse) {
    'use strict';

    var Confluence = _interopRequireDefault(_legacy).default;

    var Fuse = _interopRequireDefault(_fuse).default;

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    /**
     * Details for these options are available at http://fusejs.io/, but the basic gist is:
     *
     * - tokenize is required so that first and last names are searched from their first character
     * - matchAllTokens so that tokenize will match all words in the query
     * - threshold close to 0 to avoid unhelpful results, but this can be tweaked because...
     * - shouldSort will put the best matches at the top of the result array.
     * - location means that matching should start at the beginning of words, which is usually
     *     what name searches will want
     */
    /**
     * Ranks users, given a query.
     */
    var options = {
        includeMatches: true,
        includeScore: true,
        tokenize: true,
        matchAllTokens: true,
        threshold: 0.1,
        location: 0,
        distance: 0,
        maxPatternLength: 16,
        minMatchCharLength: 1,
        keys: [{
            name: 'displayName',
            weight: 0.7
        }, {
            name: 'username',
            weight: 0.3
        }]
    };

    exports.default = function (users, query) {
        if (!query) {
            return users;
        }

        // TODO Depending on what kind of setup is done in the Fuse constructor, we might want to
        // optimise by keeping an instance around that has all of the users currently-known to the
        // frontend: including cached Server search results.
        var fuse = new Fuse(users, options);
        var results = fuse.search(Confluence.unescapeEntities(query));
        return results.map(function (result) {
            var item = result.item;
            item.fuseMatches = result.matches;
            item.fuseScore = result.score;
            return item;
        });
    };

    module.exports = exports['default'];
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (module, exports) {
    /**
     * Where all the aggregation and caching happens
     */
    "use strict";

    function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                arr2[i] = arr[i];
            }

            return arr2;
        } else {
            return Array.from(arr);
        }
    }

    var userCache = new Map();

    /**
     * Updates the incoming User object to split "displayName" into "firstName" and "lastNames" to aid Fuse matching.
     * @param user
     * @private
     */
    function _splitNames(user) {
        if (!user || !user.displayName) {
            return;
        }

        // We store first and last names separately to enable search weightings in Fuse.
        // JS String.split doesn't quite do what we need so we just use a substring.
        var firstSpace = user.displayName.indexOf(' ');
        if (firstSpace > 0) {
            user.firstName = user.displayName.substring(0, firstSpace);
            user.lastNames = user.displayName.substring(firstSpace + 1);
        } else {
            // A user display name in a language without spaces. Setting the firstName should work in most cases.
            user.firstName = user.displayName;
            user.lastNames = '';
        }
    }

    function _isStaleEntry(user) {
        if (!userCache.has(user.username)) {
            return true;
        }
        var entry = userCache.get(user.username);
        var timestamp = entry.timestamp || 0;
        return user.timestamp > timestamp;
    }

    exports.default = {
        /**
         * Will add the user to the user cache, if it's not already present.
         * @param {user}    user     A single user in API format
         * @param {boolean} force    if true, any cached user with the same username will be replaced with this user
         */
        add: function add(user) {
            var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            // Existing cache entries may have a different Supplier for a given user - don't overwrite.
            if (user && user.hasOwnProperty("username") && (force === true || _isStaleEntry(user))) {
                _splitNames(user);
                userCache.set(user.username, user);
            }
        },

        /**
         * Will add all the supplied users by individually calling add
         * @param users an array of users
         */
        addAll: function addAll(users, force) {
            var _this = this;

            users.forEach(function (user) {
                _this.add(user, force);
            });
        },

        /**
         * @returns an array of all the users in the cache
         */
        getAll: function getAll() {
            return [].concat(_toConsumableArray(userCache.values()));
        },

        /**
         * Used for testing
         * @private
         */
        _get: function _get(username) {
            return userCache.get(username);
        },

        /**
         * Used for testing
         * @private
         */
        _clear: function _clear() {
            userCache.clear();
        }
    };
    module.exports = exports['default'];
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_15__;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (module, exports) {
    "use strict";

    exports.default = {
        resultWithHtml: function resultWithHtml(html) {
            return {
                html: html
            };
        }
    };
    module.exports = exports['default'];
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (module, exports, _userSupplierKeys) {
    'use strict';

    var UserSupplier = _interopRequireDefault(_userSupplierKeys).default;

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var suggestedUsers = [];

    /**
     * When searching for a user you're likely to want a user you've recently mentioned, even if other Fuse matches have
     * slightly better (lower) scores. For now we boost all recent matches, but we could adjust this to only the recent match
     * with the best score.
     *
     * Also, contributors should bubble to the top in the search results, at least until the search token is compelling enough
     * to switch.
     */
    function boostScores(users, next, context) {
        var query = context && context.query || '';
        if (query.indexOf(' ') > 0) {
            // Don't boost on supplier once multiple names are being added - the user seems to know who they're after so
            // let Fuse do its job.
            return next(users);
        }

        // The pipeline could be ensuring that users passed down the pipe are immutable, but for now just clone. fuseScore
        // should NOT be making its way into the user cache.
        var boostedUsers = users.map(function (userIn) {
            var user = Object.assign({}, userIn);
            if (suggestedUsers.includes(user.username)) {
                user.fuseScore /= 1000; // keep ordering for multiple matched suggestions
            } else if (typeof user.fuseScore === 'number') {
                switch (user.supplier) {
                    case UserSupplier.RECENT:
                        user.fuseScore /= 5;
                        break;
                    case UserSupplier.RELATED:
                        user.fuseScore /= 10;
                        break;
                }
            }
            return user;
        });
        return next(boostedUsers);
    }

    function setSuggestedUsers(users, next) {
        suggestedUsers = users.map(function (user) {
            return user.username;
        });
        return next(users);
    }

    function reset() {
        suggestedUsers = [];
    }

    exports.default = {
        boostScores: boostScores,
        setSuggestedUsers: setSuggestedUsers,
        reset: reset
    };
    module.exports = exports['default'];
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_18__;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_19__;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(21);


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(22), __webpack_require__(8), __webpack_require__(4), __webpack_require__(11), __webpack_require__(19)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (module, exports, _editorPluginInit, _relatedUsersSupplier, _recentUsersSupplier, _serverUsersSupplier, _tinymce) {
    'use strict';

    var editorPluginInit = _interopRequireDefault(_editorPluginInit).default;

    var RelatedUsersSupplier = _interopRequireDefault(_relatedUsersSupplier).default;

    var RecentUsersSupplier = _interopRequireDefault(_recentUsersSupplier).default;

    var ServerUsersSupplier = _interopRequireDefault(_serverUsersSupplier).default;

    var tinymce = _interopRequireDefault(_tinymce).default;

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function init(_jqueryEvent, context) {
        var editor = context && context.editor; // in case the initCallback internal code breaks API
        // This function is called from BootstrapManager.addOnInitCallback, tinymce.activeEditor already exists so it's too late to register a new plugin anyway.
        // We start up mentions right away.
        editorPluginInit(editor);
        // Do this just so it shows in plugin manager but it isn't used in tinymce.init settings.
        tinymce.PluginManager.add("insertmentions", function () {
            return {
                getMetadata: function getMetadata() {
                    return {
                        longname: "Insert Mentions",
                        author: "Atlassian",
                        authorurl: "http://www.atlassian.com"
                    };
                }
            };
        });
    }

    /**
     * This is the main export from the Mentions module set.
     */
    exports.default = {
        init: init,
        userSuppliers: {
            // Users from localstorage
            recent: RecentUsersSupplier,
            // Users from the server
            serverSearch: ServerUsersSupplier,
            // Users from the front-end cache of the Content in the editor
            contentRelated: RelatedUsersSupplier
        }
    };
    module.exports = exports['default'];
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(0), __webpack_require__(3), __webpack_require__(23), __webpack_require__(6), __webpack_require__(18), __webpack_require__(52)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (module, exports, _ajs, _jquery, _autocompleteAdapter, _Mentions, _autocompleteManager, _autocompleteSettings) {
    'use strict';

    var AJS = _interopRequireDefault(_ajs).default;

    var $ = _interopRequireDefault(_jquery).default;

    var Adapter = _interopRequireDefault(_autocompleteAdapter).default;

    var Mentions = _interopRequireDefault(_Mentions).default;

    var AutocompleteManager = _interopRequireDefault(_autocompleteManager).default;

    var AutocompleteSettings = _interopRequireDefault(_autocompleteSettings).default;

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    "use strict";

    function activateMentions() {
        AJS.EventQueue.push({ name: 'confluencementioninsert' });
        AutocompleteManager.shortcutFired("@");
    }

    function onClickEvent(event) {
        event.stopPropagation();
        event.preventDefault();
        AJS.Rte.getEditor().focus();
        activateMentions();
    }

    function editorPluginInit(editor) {
        AJS.EventQueue = AJS.EventQueue || [];
        Mentions.prefetchSuppliers(editor);

        AutocompleteSettings.Settings["@"] = {
            ch: "@",
            cache: true,
            endChars: [],
            dropDownClassName: "autocomplete-mentions fabric",
            autocompleteClassNames: "fabric",
            dropDownDelay: 0, // No delay needed because there is no AJAX request involved
            selectFirstItem: true,
            minLengthForGetData: 1,
            displayHandler: function displayHandler(user) {
                // Use Jquery to encode the user name
                return $('<div/>').text(user.name).html();
            },

            getHeaderText: function getHeaderText() {
                return null; // HACK this could be an option in core, the header is currently being hidden with CSS.
            },

            getAdditionalLinks: function getAdditionalLinks(autoCompleteControl, value, callback) {
                var additionalLinks = [];
                if (callback) callback(value, additionalLinks);
                return additionalLinks;
            },

            /**
             *
             * @param autoCompleteControl
             * @param value     The user's input
             * @param {function} renderResults  function to run with the resulting users (from input-driven-dropdown in
             *                                  Core)
             */
            getDataAndRunCallback: function getDataAndRunCallback(autoCompleteControl, value, renderResults) {
                Adapter.search(autoCompleteControl, value, renderResults, editor);
            },

            /**
             * Overrides the confluence/highlighter used to highlight query term matches in results
             */
            // For now, this override is ignored: we're getting better results from the default highlighter than with the
            // highlighting based on Fuse.js output.
            // Highlighter,

            update: Adapter.insert
        };

        $('#insertmention-button').on('click', onClickEvent);

        if (AJS.Rte.Placeholder && AJS.Rte.Placeholder.addPlaceholderType) {
            AJS.Rte.Placeholder.addPlaceholderType({
                type: 'mention',
                label: "User mention",
                tooltip: "Instructional text is replaced with suggested people when a person types."
            });
        }
    }

    exports.default = editorPluginInit;
    module.exports = exports['default'];
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(0), __webpack_require__(6), __webpack_require__(4), __webpack_require__(7), __webpack_require__(49), __webpack_require__(2), __webpack_require__(51), __webpack_require__(19)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (module, exports, _ajs, _Mentions, _recentUsersSupplier, _userSupplierManager, _mentionAnalytics, _meta, _linkObject, _tinymce) {
    'use strict';

    var AJS = _interopRequireDefault(_ajs).default;

    var Mentions = _interopRequireDefault(_Mentions).default;

    var RecentUsers = _interopRequireDefault(_recentUsersSupplier).default;

    var UserSupplierManager = _interopRequireDefault(_userSupplierManager).default;

    var MentionsAnalytics = _interopRequireDefault(_mentionAnalytics).default;

    var Meta = _interopRequireDefault(_meta).default;

    var Link = _interopRequireDefault(_linkObject).default;

    var tinymce = _interopRequireDefault(_tinymce).default;

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    "use strict";

    var BASE_URL = Meta.get('base-url');

    function search(autoCompleteControl, value, renderResults, editor) {
        MentionsAnalytics.updateSession(autoCompleteControl);

        // The && guard here can be removed once the core tinymce3/plugins/autocomplete/autocomplete-manager.js code is released.
        // Hacky try catch to work around CONFSRVDEV-3101 and CONFSRVDEV-3138
        var selectedUser = void 0;
        try {
            var selectedItem = autoCompleteControl.getCurrentItem && autoCompleteControl.getCurrentItem();
            selectedUser = selectedItem && selectedItem.model;
        } catch (ignored) {
            console.log('Error retrieving currently-selected autoComplete item');
            console.log(ignored);
        }

        // renderResults likes a 2D array, and the query tokens in an array for highlighting
        var tokens = value && value.split(' ') || [];
        var render = function render(results, next, context) {
            return renderResults([results], value, null, tokens, context);
        };
        Mentions.searchAndRender(value, render, selectedUser, editor);
    }

    function insert(autoCompleteControl, user) {
        MentionsAnalytics.publishEventForSelection(user, autoCompleteControl.analytics);

        // Add this user to the cache - it will be retrieved with the recent-users-supplier module.
        RecentUsers.store(user);

        var earlyValidationCheck = RecentUsers.getStaleUsers(RecentUsers.ValidationType.EARLY_VALIDATION);
        if (earlyValidationCheck.length > 0) {
            //asynchronously attempt to update the recently mentioned cache to remove any stale users, after the UI insert is completed
            setTimeout(function () {
                return UserSupplierManager.deleteStaleUsers(earlyValidationCheck, RecentUsers.ValidationType.EARLY_VALIDATION);
            }, 0);
        }

        var link = {
            attrs: {
                href: user.link,
                'userkey': user.model.userKey, // required to unmarshall ResourceIdentifier
                'data-base-url': BASE_URL,
                'data-linked-resource-type': 'userinfo',
                'data-linked-resource-default-alias': user.name
            },
            body: {
                html: AJS.escapeHtml(user.name)
            },
            classes: ['confluence-link']
        };
        Link.fromData(link).insert();
        tinymce.activeEditor.selection.setContent(" ");
    }

    // Called during testing
    function reset() {
        Mentions.reset();
    }

    exports.default = {
        search: search,
        insert: insert,
        reset: reset
    };
    module.exports = exports['default'];
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(2), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (module, exports, _meta, _jquery) {
    'use strict';

    var Meta = _interopRequireDefault(_meta).default;

    var $ = _interopRequireDefault(_jquery).default;

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    // Adapted from confluence-quick-edit/src/main/resources/jscripts/handlers/comment.js.
    /**
     Supplies the Content API model object associated with the current draft in the editor.
    
     This is basically a shim for something that the Editor JS API *should* provide but currently doesn't
     */
    function getParameter(url, paramName) {
        if (!url) {
            return '';
        }
        var regex = new RegExp("[?&]" + paramName + "=(\\d+)");
        var match = url.match(regex);
        return match && match.length > 1 ? match[1] : '';
    }

    function safeGetDraft(editor) {
        if (!editor) {
            return null;
        }

        try {
            return getDraft(editor);
        } catch (e) {
            // This might happen if the Editor is being initialised in a context we don't yet support.
            console.error(e.message);
            return null;
        }
    }

    function getDraft(editor) {
        var id = Meta.get('page-id');

        var form = editor.formElement;
        var action = form.action || '';

        if (action.indexOf('/doaddcomment.action') > -1 || action.indexOf('/doeditcomment.action') > -1 || $(form).closest('.ic-sidebar').length) {
            var commentId = getParameter(action, "commentId") || '0';

            var content = {
                id: commentId,
                type: 'comment',
                status: 'draft',
                container: {
                    id: id
                }
            };

            var parentCommentId = getParameter(action, "parentId");
            if (parentCommentId) {
                content.ancestors = [{
                    id: parentCommentId
                }];
            }

            return content;
        }

        var previewContainer = $(form).closest('.cp-container');
        if (previewContainer.length) {
            // This is a comment for a Preview. Until we have a proper API, scrape the DOM and shed a single tear.
            var previewTitle = previewContainer.find('.cp-file-title').text().replace(/"/g, "\\\"");
            // CONFSRVDEV-11704 because the previewer can be triggered from like million places, and because we suck
            // and don't set the alias for attachment titles consistently , which means we need to look for them with spaces
            // a well as with + for space
            var alternateTitle = escape(previewTitle.replace(/\s/g, "+"));
            var $element = $('body').find('*[data-linked-resource-default-alias="' + previewTitle + '"], *[data-linked-resource-default-alias="' + alternateTitle + '"]');
            if ($element.length) {
                var attachmentId = $element.attr('data-linked-resource-id');
                // Again, until Previews exposes an API, and the Editor consumes it in a way that THIS code can consume,
                // we're limited in how Smart the suggestions here can be. For now, editing an existing comment or replying
                // to a comment are treated the same as creating a new comment.
                return {
                    id: 0,
                    type: 'comment',
                    status: 'draft',
                    container: {
                        id: attachmentId
                    }
                };
            }
        }

        var newPage = Meta.get('new-page');

        var type = Meta.get('content-type');
        return {
            id: newPage ? '0' : id,
            type: type,
            status: 'draft'
        };
    }

    exports.default = safeGetDraft;
    module.exports = exports['default'];
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(2), __webpack_require__(3), __webpack_require__(26), __webpack_require__(27), __webpack_require__(28)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (module, exports, _meta, _jquery, _aggregateUsers, _restParameters, _relatedUserTransformer) {
    'use strict';

    var Meta = _interopRequireDefault(_meta).default;

    var $ = _interopRequireDefault(_jquery).default;

    var aggregateUsers = _interopRequireDefault(_aggregateUsers).default;

    var getRestParameters = _interopRequireDefault(_restParameters).default;

    var flattenUsers = _interopRequireDefault(_relatedUserTransformer).default;

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    "use strict"; /**
                   Supplies Users that are related to a piece of Content, calculated from server data via the Content API.
                   */


    var cache = {};

    var getUsers = function getUsers(contentStub) {
        var restParams = getRestParameters(contentStub);
        if (!restParams) {
            // Will be null for new pages and blogposts: don't make a REST call, don't cache
            return Promise.resolve([]);
        }

        if (restParams.contentId in cache) {
            return cache[restParams.contentId];
        }

        var promise = new Promise(function (resolve, reject) {
            var contextPath = Meta.get('context-path');
            var url = contextPath + '/rest/api/content/' + restParams.contentId;
            var queryParameters = {
                expand: restParams.expand
            };

            $.getJSON(url, queryParameters, function (content) {
                resolve(flattenUsers(aggregateUsers(content)));
            }).fail(reject);
        });

        cache[restParams.contentId] = promise;
        return promise;
    };

    // Used in testing.
    function reset() {
        cache = {};
    }

    exports.default = {
        getUsers: getUsers,
        reset: reset,
        _cache: cache //exposed for testing
    };
    module.exports = exports['default'];
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(9), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (module, exports, _userRole, _userSupplierKeys) {
    'use strict';

    var UserRole = _interopRequireDefault(_userRole).default;

    var UserSupplier = _interopRequireDefault(_userSupplierKeys).default;

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = function (content) {
        var relatedUsers = {};

        // Used to track users that have already been added to relatedUsers
        var usernames = new Set();

        // Skip anonymous users, disabled/deleted users, and users already in the result
        function shouldAddUser(user) {
            if (user.type === 'anonymous') {
                return false;
            }

            if (typeof user.status === 'undefined') {
                console.error("User status is undefined. Not adding to relatedUsers aggregate.");
                return false;
            }
            return user.status === 'current' && !usernames.has(user.username);
        }

        function addUser(user, role) {
            user.role = role;
            user.supplier = UserSupplier.RELATED;
            var roleKey = role.role;
            relatedUsers[roleKey] = relatedUsers[roleKey] || [];
            relatedUsers[roleKey].push(user);
            usernames.add(user.username);
        }

        function addUserWithRole(user, role) {
            if (shouldAddUser(user)) {
                addUser(user, role);
            }
        }

        var page = content.type === 'comment' ? content.container : content;

        // Only do this for content that has history
        if ('history' in page) {
            addUserWithRole(page.history.createdBy, UserRole.CREATOR);

            // Contributors are reversed to descending chronological order - users are more likely to mention contributors who
            // edited the content more recently.
            page.history.contributors.publishers.users.reverse().forEach(function (contributor) {
                addUserWithRole(contributor, UserRole.CONTRIBUTOR);
            });
        }

        if (content.type === 'comment' && content.ancestors) {
            // A new or existing comment that is a reply to another comment. We catch ancestor commenters before other
            // commenters because they are more likely to be mentioned.
            // Ancestor order is not reversed because they are already ordered youngest to oldest.
            content.ancestors.forEach(function (ancestorComment) {
                addUserWithRole(ancestorComment.version.by, UserRole.ANCESTOR_COMMENTER);
            });
        }

        if ('children' in page) {
            // Page commenters are also listed in reverse order
            page.children.comment.results.reverse().forEach(function (comment) {
                addUserWithRole(comment.version.by, UserRole.COMMENTER);
            });
        }

        return relatedUsers;
    };

    module.exports = exports['default'];
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (module, exports) {
    'use strict';

    /**
     Calculations the content id and expansions that should be used in the REST API call when building the
     list of users related to a piece of Content in the editor.
     */

    var PAGE_REST_EXPANSIONS = 'history.createdBy.status,history.contributors.publishers.users.status,children.comment.version.by.status';
    var COMMENT_REST_EXPANSIONS = 'ancestors.version.by.status,container.history.createdBy.status,container.history.contributors.publishers.users.status,container.children.comment.version.by.status';

    function restParams(id, expansions) {
        return {
            contentId: id,
            expand: expansions
        };
    }

    function isBlankId(val) {
        return !val || val === '0';
    }

    exports.default = function (contentStub) {
        if (!contentStub) {
            return null;
        }

        if (contentStub.type === 'page' || contentStub.type === 'blogpost') {
            var pageId = contentStub.id;
            if (isBlankId(pageId)) {
                // A new page/blogpost has no related users.
                return null;
            }
            // Editing an existing page or blogpost
            return restParams(pageId, PAGE_REST_EXPANSIONS);
        }

        if (contentStub.type === 'comment') {
            var commentId = contentStub.id;
            if (!isBlankId(commentId)) {
                // Editing an existing comment
                return restParams(commentId, COMMENT_REST_EXPANSIONS);
            }

            // A new comment: the stub will include the id of the comment it is replying to, unless this is a top-level
            // comment. NOTE: if we end up with access to a Draft comment, we should be able to use its id as the
            // content id, and not use the parent-comment or page ids here.
            var parentCommentId = contentStub.ancestors && contentStub.ancestors[0] && contentStub.ancestors[0].id;
            if (!isBlankId(parentCommentId)) {
                // A new reply
                return restParams(parentCommentId, COMMENT_REST_EXPANSIONS);
            }

            // A new top-level comment
            var _pageId = contentStub.container.id;
            return restParams(_pageId, PAGE_REST_EXPANSIONS);
        }
    };

    module.exports = exports['default'];
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (module, exports, _userRole) {
    "use strict";

    var UserRole = _interopRequireDefault(_userRole).default;

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    "use strict";

    /**
     * Converts the map of users by role into a list of users.
     */

    exports.default = function (usersMap) {
        var transformedList = [];

        function addUsersWithRoleToList(userRole) {
            var users = usersMap[userRole.role];
            if (users && users.length) {
                transformedList = transformedList.concat(users);
            }
        }

        addUsersWithRoleToList(UserRole.CREATOR);
        addUsersWithRoleToList(UserRole.CONTRIBUTOR);
        addUsersWithRoleToList(UserRole.COMMENTER);
        addUsersWithRoleToList(UserRole.ANCESTOR_COMMENTER);

        return transformedList;
    };

    module.exports = exports['default'];
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

module.exports = LRUCache

// This will be a proper iterable 'Map' in engines that support it,
// or a fakey-fake PseudoMap in older versions.
var Map = __webpack_require__(30)
var util = __webpack_require__(32)

// A linked list to keep track of recently-used-ness
var Yallist = __webpack_require__(35)

// use symbols if possible, otherwise just _props
var hasSymbol = typeof Symbol === 'function' && process.env._nodeLRUCacheForceNoSymbol !== '1'
var makeSymbol
if (hasSymbol) {
  makeSymbol = function (key) {
    return Symbol(key)
  }
} else {
  makeSymbol = function (key) {
    return '_' + key
  }
}

var MAX = makeSymbol('max')
var LENGTH = makeSymbol('length')
var LENGTH_CALCULATOR = makeSymbol('lengthCalculator')
var ALLOW_STALE = makeSymbol('allowStale')
var MAX_AGE = makeSymbol('maxAge')
var DISPOSE = makeSymbol('dispose')
var NO_DISPOSE_ON_SET = makeSymbol('noDisposeOnSet')
var LRU_LIST = makeSymbol('lruList')
var CACHE = makeSymbol('cache')

function naiveLength () { return 1 }

// lruList is a yallist where the head is the youngest
// item, and the tail is the oldest.  the list contains the Hit
// objects as the entries.
// Each Hit object has a reference to its Yallist.Node.  This
// never changes.
//
// cache is a Map (or PseudoMap) that matches the keys to
// the Yallist.Node object.
function LRUCache (options) {
  if (!(this instanceof LRUCache)) {
    return new LRUCache(options)
  }

  if (typeof options === 'number') {
    options = { max: options }
  }

  if (!options) {
    options = {}
  }

  var max = this[MAX] = options.max
  // Kind of weird to have a default max of Infinity, but oh well.
  if (!max ||
      !(typeof max === 'number') ||
      max <= 0) {
    this[MAX] = Infinity
  }

  var lc = options.length || naiveLength
  if (typeof lc !== 'function') {
    lc = naiveLength
  }
  this[LENGTH_CALCULATOR] = lc

  this[ALLOW_STALE] = options.stale || false
  this[MAX_AGE] = options.maxAge || 0
  this[DISPOSE] = options.dispose
  this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false
  this.reset()
}

// resize the cache when the max changes.
Object.defineProperty(LRUCache.prototype, 'max', {
  set: function (mL) {
    if (!mL || !(typeof mL === 'number') || mL <= 0) {
      mL = Infinity
    }
    this[MAX] = mL
    trim(this)
  },
  get: function () {
    return this[MAX]
  },
  enumerable: true
})

Object.defineProperty(LRUCache.prototype, 'allowStale', {
  set: function (allowStale) {
    this[ALLOW_STALE] = !!allowStale
  },
  get: function () {
    return this[ALLOW_STALE]
  },
  enumerable: true
})

Object.defineProperty(LRUCache.prototype, 'maxAge', {
  set: function (mA) {
    if (!mA || !(typeof mA === 'number') || mA < 0) {
      mA = 0
    }
    this[MAX_AGE] = mA
    trim(this)
  },
  get: function () {
    return this[MAX_AGE]
  },
  enumerable: true
})

// resize the cache when the lengthCalculator changes.
Object.defineProperty(LRUCache.prototype, 'lengthCalculator', {
  set: function (lC) {
    if (typeof lC !== 'function') {
      lC = naiveLength
    }
    if (lC !== this[LENGTH_CALCULATOR]) {
      this[LENGTH_CALCULATOR] = lC
      this[LENGTH] = 0
      this[LRU_LIST].forEach(function (hit) {
        hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key)
        this[LENGTH] += hit.length
      }, this)
    }
    trim(this)
  },
  get: function () { return this[LENGTH_CALCULATOR] },
  enumerable: true
})

Object.defineProperty(LRUCache.prototype, 'length', {
  get: function () { return this[LENGTH] },
  enumerable: true
})

Object.defineProperty(LRUCache.prototype, 'itemCount', {
  get: function () { return this[LRU_LIST].length },
  enumerable: true
})

LRUCache.prototype.rforEach = function (fn, thisp) {
  thisp = thisp || this
  for (var walker = this[LRU_LIST].tail; walker !== null;) {
    var prev = walker.prev
    forEachStep(this, fn, walker, thisp)
    walker = prev
  }
}

function forEachStep (self, fn, node, thisp) {
  var hit = node.value
  if (isStale(self, hit)) {
    del(self, node)
    if (!self[ALLOW_STALE]) {
      hit = undefined
    }
  }
  if (hit) {
    fn.call(thisp, hit.value, hit.key, self)
  }
}

LRUCache.prototype.forEach = function (fn, thisp) {
  thisp = thisp || this
  for (var walker = this[LRU_LIST].head; walker !== null;) {
    var next = walker.next
    forEachStep(this, fn, walker, thisp)
    walker = next
  }
}

LRUCache.prototype.keys = function () {
  return this[LRU_LIST].toArray().map(function (k) {
    return k.key
  }, this)
}

LRUCache.prototype.values = function () {
  return this[LRU_LIST].toArray().map(function (k) {
    return k.value
  }, this)
}

LRUCache.prototype.reset = function () {
  if (this[DISPOSE] &&
      this[LRU_LIST] &&
      this[LRU_LIST].length) {
    this[LRU_LIST].forEach(function (hit) {
      this[DISPOSE](hit.key, hit.value)
    }, this)
  }

  this[CACHE] = new Map() // hash of items by key
  this[LRU_LIST] = new Yallist() // list of items in order of use recency
  this[LENGTH] = 0 // length of items in the list
}

LRUCache.prototype.dump = function () {
  return this[LRU_LIST].map(function (hit) {
    if (!isStale(this, hit)) {
      return {
        k: hit.key,
        v: hit.value,
        e: hit.now + (hit.maxAge || 0)
      }
    }
  }, this).toArray().filter(function (h) {
    return h
  })
}

LRUCache.prototype.dumpLru = function () {
  return this[LRU_LIST]
}

/* istanbul ignore next */
LRUCache.prototype.inspect = function (n, opts) {
  var str = 'LRUCache {'
  var extras = false

  var as = this[ALLOW_STALE]
  if (as) {
    str += '\n  allowStale: true'
    extras = true
  }

  var max = this[MAX]
  if (max && max !== Infinity) {
    if (extras) {
      str += ','
    }
    str += '\n  max: ' + util.inspect(max, opts)
    extras = true
  }

  var maxAge = this[MAX_AGE]
  if (maxAge) {
    if (extras) {
      str += ','
    }
    str += '\n  maxAge: ' + util.inspect(maxAge, opts)
    extras = true
  }

  var lc = this[LENGTH_CALCULATOR]
  if (lc && lc !== naiveLength) {
    if (extras) {
      str += ','
    }
    str += '\n  length: ' + util.inspect(this[LENGTH], opts)
    extras = true
  }

  var didFirst = false
  this[LRU_LIST].forEach(function (item) {
    if (didFirst) {
      str += ',\n  '
    } else {
      if (extras) {
        str += ',\n'
      }
      didFirst = true
      str += '\n  '
    }
    var key = util.inspect(item.key).split('\n').join('\n  ')
    var val = { value: item.value }
    if (item.maxAge !== maxAge) {
      val.maxAge = item.maxAge
    }
    if (lc !== naiveLength) {
      val.length = item.length
    }
    if (isStale(this, item)) {
      val.stale = true
    }

    val = util.inspect(val, opts).split('\n').join('\n  ')
    str += key + ' => ' + val
  })

  if (didFirst || extras) {
    str += '\n'
  }
  str += '}'

  return str
}

LRUCache.prototype.set = function (key, value, maxAge) {
  maxAge = maxAge || this[MAX_AGE]

  var now = maxAge ? Date.now() : 0
  var len = this[LENGTH_CALCULATOR](value, key)

  if (this[CACHE].has(key)) {
    if (len > this[MAX]) {
      del(this, this[CACHE].get(key))
      return false
    }

    var node = this[CACHE].get(key)
    var item = node.value

    // dispose of the old one before overwriting
    // split out into 2 ifs for better coverage tracking
    if (this[DISPOSE]) {
      if (!this[NO_DISPOSE_ON_SET]) {
        this[DISPOSE](key, item.value)
      }
    }

    item.now = now
    item.maxAge = maxAge
    item.value = value
    this[LENGTH] += len - item.length
    item.length = len
    this.get(key)
    trim(this)
    return true
  }

  var hit = new Entry(key, value, len, now, maxAge)

  // oversized objects fall out of cache automatically.
  if (hit.length > this[MAX]) {
    if (this[DISPOSE]) {
      this[DISPOSE](key, value)
    }
    return false
  }

  this[LENGTH] += hit.length
  this[LRU_LIST].unshift(hit)
  this[CACHE].set(key, this[LRU_LIST].head)
  trim(this)
  return true
}

LRUCache.prototype.has = function (key) {
  if (!this[CACHE].has(key)) return false
  var hit = this[CACHE].get(key).value
  if (isStale(this, hit)) {
    return false
  }
  return true
}

LRUCache.prototype.get = function (key) {
  return get(this, key, true)
}

LRUCache.prototype.peek = function (key) {
  return get(this, key, false)
}

LRUCache.prototype.pop = function () {
  var node = this[LRU_LIST].tail
  if (!node) return null
  del(this, node)
  return node.value
}

LRUCache.prototype.del = function (key) {
  del(this, this[CACHE].get(key))
}

LRUCache.prototype.load = function (arr) {
  // reset the cache
  this.reset()

  var now = Date.now()
  // A previous serialized cache has the most recent items first
  for (var l = arr.length - 1; l >= 0; l--) {
    var hit = arr[l]
    var expiresAt = hit.e || 0
    if (expiresAt === 0) {
      // the item was created without expiration in a non aged cache
      this.set(hit.k, hit.v)
    } else {
      var maxAge = expiresAt - now
      // dont add already expired items
      if (maxAge > 0) {
        this.set(hit.k, hit.v, maxAge)
      }
    }
  }
}

LRUCache.prototype.prune = function () {
  var self = this
  this[CACHE].forEach(function (value, key) {
    get(self, key, false)
  })
}

function get (self, key, doUse) {
  var node = self[CACHE].get(key)
  if (node) {
    var hit = node.value
    if (isStale(self, hit)) {
      del(self, node)
      if (!self[ALLOW_STALE]) hit = undefined
    } else {
      if (doUse) {
        self[LRU_LIST].unshiftNode(node)
      }
    }
    if (hit) hit = hit.value
  }
  return hit
}

function isStale (self, hit) {
  if (!hit || (!hit.maxAge && !self[MAX_AGE])) {
    return false
  }
  var stale = false
  var diff = Date.now() - hit.now
  if (hit.maxAge) {
    stale = diff > hit.maxAge
  } else {
    stale = self[MAX_AGE] && (diff > self[MAX_AGE])
  }
  return stale
}

function trim (self) {
  if (self[LENGTH] > self[MAX]) {
    for (var walker = self[LRU_LIST].tail;
      self[LENGTH] > self[MAX] && walker !== null;) {
      // We know that we're about to delete this one, and also
      // what the next least recently used key will be, so just
      // go ahead and set it now.
      var prev = walker.prev
      del(self, walker)
      walker = prev
    }
  }
}

function del (self, node) {
  if (node) {
    var hit = node.value
    if (self[DISPOSE]) {
      self[DISPOSE](hit.key, hit.value)
    }
    self[LENGTH] -= hit.length
    self[CACHE].delete(hit.key)
    self[LRU_LIST].removeNode(node)
  }
}

// classy, since V8 prefers predictable objects.
function Entry (key, value, length, now, maxAge) {
  this.key = key
  this.value = value
  this.length = length
  this.now = now
  this.maxAge = maxAge || 0
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {if (process.env.npm_package_name === 'pseudomap' &&
    process.env.npm_lifecycle_script === 'test')
  process.env.TEST_PSEUDOMAP = 'true'

if (typeof Map === 'function' && !process.env.TEST_PSEUDOMAP) {
  module.exports = Map
} else {
  module.exports = __webpack_require__(31)
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 31 */
/***/ (function(module, exports) {

var hasOwnProperty = Object.prototype.hasOwnProperty

module.exports = PseudoMap

function PseudoMap (set) {
  if (!(this instanceof PseudoMap)) // whyyyyyyy
    throw new TypeError("Constructor PseudoMap requires 'new'")

  this.clear()

  if (set) {
    if ((set instanceof PseudoMap) ||
        (typeof Map === 'function' && set instanceof Map))
      set.forEach(function (value, key) {
        this.set(key, value)
      }, this)
    else if (Array.isArray(set))
      set.forEach(function (kv) {
        this.set(kv[0], kv[1])
      }, this)
    else
      throw new TypeError('invalid argument')
  }
}

PseudoMap.prototype.forEach = function (fn, thisp) {
  thisp = thisp || this
  Object.keys(this._data).forEach(function (k) {
    if (k !== 'size')
      fn.call(thisp, this._data[k].value, this._data[k].key)
  }, this)
}

PseudoMap.prototype.has = function (k) {
  return !!find(this._data, k)
}

PseudoMap.prototype.get = function (k) {
  var res = find(this._data, k)
  return res && res.value
}

PseudoMap.prototype.set = function (k, v) {
  set(this._data, k, v)
}

PseudoMap.prototype.delete = function (k) {
  var res = find(this._data, k)
  if (res) {
    delete this._data[res._index]
    this._data.size--
  }
}

PseudoMap.prototype.clear = function () {
  var data = Object.create(null)
  data.size = 0

  Object.defineProperty(this, '_data', {
    value: data,
    enumerable: false,
    configurable: true,
    writable: false
  })
}

Object.defineProperty(PseudoMap.prototype, 'size', {
  get: function () {
    return this._data.size
  },
  set: function (n) {},
  enumerable: true,
  configurable: true
})

PseudoMap.prototype.values =
PseudoMap.prototype.keys =
PseudoMap.prototype.entries = function () {
  throw new Error('iterators are not implemented in this version')
}

// Either identical, or both NaN
function same (a, b) {
  return a === b || a !== a && b !== b
}

function Entry (k, v, i) {
  this.key = k
  this.value = v
  this._index = i
}

function find (data, k) {
  for (var i = 0, s = '_' + k, key = s;
       hasOwnProperty.call(data, key);
       key = s + i++) {
    if (same(data[key].key, k))
      return data[key]
  }
}

function set (data, k, v) {
  for (var i = 0, s = '_' + k, key = s;
       hasOwnProperty.call(data, key);
       key = s + i++) {
    if (same(data[key].key, k)) {
      data[key].value = v
      return
    }
  }
  data.size++
  data[key] = new Entry(k, v, key)
}


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors ||
  function getOwnPropertyDescriptors(obj) {
    var keys = Object.keys(obj);
    var descriptors = {};
    for (var i = 0; i < keys.length; i++) {
      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return descriptors;
  };

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  if (typeof process !== 'undefined' && process.noDeprecation === true) {
    return fn;
  }

  // Allow for deprecating things in the process of starting up.
  if (typeof process === 'undefined') {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(33);

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(34);

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;

exports.promisify = function promisify(original) {
  if (typeof original !== 'function')
    throw new TypeError('The "original" argument must be of type Function');

  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
    var fn = original[kCustomPromisifiedSymbol];
    if (typeof fn !== 'function') {
      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
    }
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn, enumerable: false, writable: false, configurable: true
    });
    return fn;
  }

  function fn() {
    var promiseResolve, promiseReject;
    var promise = new Promise(function (resolve, reject) {
      promiseResolve = resolve;
      promiseReject = reject;
    });

    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    args.push(function (err, value) {
      if (err) {
        promiseReject(err);
      } else {
        promiseResolve(value);
      }
    });

    try {
      original.apply(this, args);
    } catch (err) {
      promiseReject(err);
    }

    return promise;
  }

  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));

  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn, enumerable: false, writable: false, configurable: true
  });
  return Object.defineProperties(
    fn,
    getOwnPropertyDescriptors(original)
  );
}

exports.promisify.custom = kCustomPromisifiedSymbol

function callbackifyOnRejected(reason, cb) {
  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
  // Because `null` is a special error value in callbacks which means "no error
  // occurred", we error-wrap so the callback consumer can distinguish between
  // "the promise rejected with null" or "the promise fulfilled with undefined".
  if (!reason) {
    var newReason = new Error('Promise was rejected with a falsy value');
    newReason.reason = reason;
    reason = newReason;
  }
  return cb(reason);
}

function callbackify(original) {
  if (typeof original !== 'function') {
    throw new TypeError('The "original" argument must be of type Function');
  }

  // We DO NOT return the promise as it gives the user a false sense that
  // the promise is actually somehow related to the callback's execution
  // and that the callback throwing will reject the promise.
  function callbackified() {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var maybeCb = args.pop();
    if (typeof maybeCb !== 'function') {
      throw new TypeError('The last argument must be of type Function');
    }
    var self = this;
    var cb = function() {
      return maybeCb.apply(self, arguments);
    };
    // In true node style we process the callback on `nextTick` with all the
    // implications (stack, `uncaughtException`, `async_hooks`)
    original.apply(this, args)
      .then(function(ret) { process.nextTick(cb, null, ret) },
            function(rej) { process.nextTick(callbackifyOnRejected, rej, cb) });
  }

  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
  Object.defineProperties(callbackified,
                          getOwnPropertyDescriptors(original));
  return callbackified;
}
exports.callbackify = callbackify;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),
/* 34 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = Yallist

Yallist.Node = Node
Yallist.create = Yallist

function Yallist (list) {
  var self = this
  if (!(self instanceof Yallist)) {
    self = new Yallist()
  }

  self.tail = null
  self.head = null
  self.length = 0

  if (list && typeof list.forEach === 'function') {
    list.forEach(function (item) {
      self.push(item)
    })
  } else if (arguments.length > 0) {
    for (var i = 0, l = arguments.length; i < l; i++) {
      self.push(arguments[i])
    }
  }

  return self
}

Yallist.prototype.removeNode = function (node) {
  if (node.list !== this) {
    throw new Error('removing node which does not belong to this list')
  }

  var next = node.next
  var prev = node.prev

  if (next) {
    next.prev = prev
  }

  if (prev) {
    prev.next = next
  }

  if (node === this.head) {
    this.head = next
  }
  if (node === this.tail) {
    this.tail = prev
  }

  node.list.length--
  node.next = null
  node.prev = null
  node.list = null
}

Yallist.prototype.unshiftNode = function (node) {
  if (node === this.head) {
    return
  }

  if (node.list) {
    node.list.removeNode(node)
  }

  var head = this.head
  node.list = this
  node.next = head
  if (head) {
    head.prev = node
  }

  this.head = node
  if (!this.tail) {
    this.tail = node
  }
  this.length++
}

Yallist.prototype.pushNode = function (node) {
  if (node === this.tail) {
    return
  }

  if (node.list) {
    node.list.removeNode(node)
  }

  var tail = this.tail
  node.list = this
  node.prev = tail
  if (tail) {
    tail.next = node
  }

  this.tail = node
  if (!this.head) {
    this.head = node
  }
  this.length++
}

Yallist.prototype.push = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    push(this, arguments[i])
  }
  return this.length
}

Yallist.prototype.unshift = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    unshift(this, arguments[i])
  }
  return this.length
}

Yallist.prototype.pop = function () {
  if (!this.tail) {
    return undefined
  }

  var res = this.tail.value
  this.tail = this.tail.prev
  if (this.tail) {
    this.tail.next = null
  } else {
    this.head = null
  }
  this.length--
  return res
}

Yallist.prototype.shift = function () {
  if (!this.head) {
    return undefined
  }

  var res = this.head.value
  this.head = this.head.next
  if (this.head) {
    this.head.prev = null
  } else {
    this.tail = null
  }
  this.length--
  return res
}

Yallist.prototype.forEach = function (fn, thisp) {
  thisp = thisp || this
  for (var walker = this.head, i = 0; walker !== null; i++) {
    fn.call(thisp, walker.value, i, this)
    walker = walker.next
  }
}

Yallist.prototype.forEachReverse = function (fn, thisp) {
  thisp = thisp || this
  for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
    fn.call(thisp, walker.value, i, this)
    walker = walker.prev
  }
}

Yallist.prototype.get = function (n) {
  for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.next
  }
  if (i === n && walker !== null) {
    return walker.value
  }
}

Yallist.prototype.getReverse = function (n) {
  for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.prev
  }
  if (i === n && walker !== null) {
    return walker.value
  }
}

Yallist.prototype.map = function (fn, thisp) {
  thisp = thisp || this
  var res = new Yallist()
  for (var walker = this.head; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this))
    walker = walker.next
  }
  return res
}

Yallist.prototype.mapReverse = function (fn, thisp) {
  thisp = thisp || this
  var res = new Yallist()
  for (var walker = this.tail; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this))
    walker = walker.prev
  }
  return res
}

Yallist.prototype.reduce = function (fn, initial) {
  var acc
  var walker = this.head
  if (arguments.length > 1) {
    acc = initial
  } else if (this.head) {
    walker = this.head.next
    acc = this.head.value
  } else {
    throw new TypeError('Reduce of empty list with no initial value')
  }

  for (var i = 0; walker !== null; i++) {
    acc = fn(acc, walker.value, i)
    walker = walker.next
  }

  return acc
}

Yallist.prototype.reduceReverse = function (fn, initial) {
  var acc
  var walker = this.tail
  if (arguments.length > 1) {
    acc = initial
  } else if (this.tail) {
    walker = this.tail.prev
    acc = this.tail.value
  } else {
    throw new TypeError('Reduce of empty list with no initial value')
  }

  for (var i = this.length - 1; walker !== null; i--) {
    acc = fn(acc, walker.value, i)
    walker = walker.prev
  }

  return acc
}

Yallist.prototype.toArray = function () {
  var arr = new Array(this.length)
  for (var i = 0, walker = this.head; walker !== null; i++) {
    arr[i] = walker.value
    walker = walker.next
  }
  return arr
}

Yallist.prototype.toArrayReverse = function () {
  var arr = new Array(this.length)
  for (var i = 0, walker = this.tail; walker !== null; i++) {
    arr[i] = walker.value
    walker = walker.prev
  }
  return arr
}

Yallist.prototype.slice = function (from, to) {
  to = to || this.length
  if (to < 0) {
    to += this.length
  }
  from = from || 0
  if (from < 0) {
    from += this.length
  }
  var ret = new Yallist()
  if (to < from || to < 0) {
    return ret
  }
  if (from < 0) {
    from = 0
  }
  if (to > this.length) {
    to = this.length
  }
  for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
    walker = walker.next
  }
  for (; walker !== null && i < to; i++, walker = walker.next) {
    ret.push(walker.value)
  }
  return ret
}

Yallist.prototype.sliceReverse = function (from, to) {
  to = to || this.length
  if (to < 0) {
    to += this.length
  }
  from = from || 0
  if (from < 0) {
    from += this.length
  }
  var ret = new Yallist()
  if (to < from || to < 0) {
    return ret
  }
  if (from < 0) {
    from = 0
  }
  if (to > this.length) {
    to = this.length
  }
  for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
    walker = walker.prev
  }
  for (; walker !== null && i > from; i--, walker = walker.prev) {
    ret.push(walker.value)
  }
  return ret
}

Yallist.prototype.reverse = function () {
  var head = this.head
  var tail = this.tail
  for (var walker = head; walker !== null; walker = walker.prev) {
    var p = walker.prev
    walker.prev = walker.next
    walker.next = p
  }
  this.head = tail
  this.tail = head
  return this
}

function push (self, item) {
  self.tail = new Node(item, self.tail, null, self)
  if (!self.head) {
    self.head = self.tail
  }
  self.length++
}

function unshift (self, item) {
  self.head = new Node(item, null, self.head, self)
  if (!self.tail) {
    self.tail = self.head
  }
  self.length++
}

function Node (value, prev, next, list) {
  if (!(this instanceof Node)) {
    return new Node(value, prev, next, list)
  }

  this.list = list
  this.value = value

  if (prev) {
    prev.next = this
    this.prev = prev
  } else {
    this.prev = null
  }

  if (next) {
    next.prev = this
    this.next = next
  } else {
    this.next = null
  }
}


/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_36__;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Fuse.js v3.6.1 - Lightweight fuzzy-search (http://fusejs.io)
 * 
 * Copyright (c) 2012-2017 Kirollos Risk (http://kiro.me)
 * All Rights Reserved. Apache Software License 2.0
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 */
!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define("Fuse",[],t):"object"==typeof exports?exports.Fuse=t():e.Fuse=t()}(this,function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var i=r(1),a=r(7),s=a.get,c=(a.deepValue,a.isArray),h=function(){function e(t,r){var n=r.location,o=void 0===n?0:n,i=r.distance,a=void 0===i?100:i,c=r.threshold,h=void 0===c?.6:c,l=r.maxPatternLength,u=void 0===l?32:l,f=r.caseSensitive,v=void 0!==f&&f,p=r.tokenSeparator,d=void 0===p?/ +/g:p,g=r.findAllMatches,y=void 0!==g&&g,m=r.minMatchCharLength,k=void 0===m?1:m,b=r.id,S=void 0===b?null:b,x=r.keys,M=void 0===x?[]:x,_=r.shouldSort,w=void 0===_||_,L=r.getFn,A=void 0===L?s:L,O=r.sortFn,C=void 0===O?function(e,t){return e.score-t.score}:O,j=r.tokenize,P=void 0!==j&&j,I=r.matchAllTokens,F=void 0!==I&&I,T=r.includeMatches,N=void 0!==T&&T,z=r.includeScore,E=void 0!==z&&z,W=r.verbose,K=void 0!==W&&W;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.options={location:o,distance:a,threshold:h,maxPatternLength:u,isCaseSensitive:v,tokenSeparator:d,findAllMatches:y,minMatchCharLength:k,id:S,keys:M,includeMatches:N,includeScore:E,shouldSort:w,getFn:A,sortFn:C,verbose:K,tokenize:P,matchAllTokens:F},this.setCollection(t),this._processKeys(M)}var t,r,a;return t=e,(r=[{key:"setCollection",value:function(e){return this.list=e,e}},{key:"_processKeys",value:function(e){if(this._keyWeights={},this._keyNames=[],e.length&&"string"==typeof e[0])for(var t=0,r=e.length;t<r;t+=1){var n=e[t];this._keyWeights[n]=1,this._keyNames.push(n)}else{for(var o=null,i=null,a=0,s=0,c=e.length;s<c;s+=1){var h=e[s];if(!h.hasOwnProperty("name"))throw new Error('Missing "name" property in key object');var l=h.name;if(this._keyNames.push(l),!h.hasOwnProperty("weight"))throw new Error('Missing "weight" property in key object');var u=h.weight;if(u<0||u>1)throw new Error('"weight" property in key must bein the range of [0, 1)');i=null==i?u:Math.max(i,u),o=null==o?u:Math.min(o,u),this._keyWeights[l]=u,a+=u}if(a>1)throw new Error("Total of weights cannot exceed 1")}}},{key:"search",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{limit:!1};this._log('---------\nSearch pattern: "'.concat(e,'"'));var r=this._prepareSearchers(e),n=r.tokenSearchers,o=r.fullSearcher,i=this._search(n,o);return this._computeScore(i),this.options.shouldSort&&this._sort(i),t.limit&&"number"==typeof t.limit&&(i=i.slice(0,t.limit)),this._format(i)}},{key:"_prepareSearchers",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=[];if(this.options.tokenize)for(var r=e.split(this.options.tokenSeparator),n=0,o=r.length;n<o;n+=1)t.push(new i(r[n],this.options));return{tokenSearchers:t,fullSearcher:new i(e,this.options)}}},{key:"_search",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,r=this.list,n={},o=[];if("string"==typeof r[0]){for(var i=0,a=r.length;i<a;i+=1)this._analyze({key:"",value:r[i],record:i,index:i},{resultMap:n,results:o,tokenSearchers:e,fullSearcher:t});return o}for(var s=0,c=r.length;s<c;s+=1)for(var h=r[s],l=0,u=this._keyNames.length;l<u;l+=1){var f=this._keyNames[l];this._analyze({key:f,value:this.options.getFn(h,f),record:h,index:s},{resultMap:n,results:o,tokenSearchers:e,fullSearcher:t})}return o}},{key:"_analyze",value:function(e,t){var r=this,n=e.key,o=e.arrayIndex,i=void 0===o?-1:o,a=e.value,s=e.record,h=e.index,l=t.tokenSearchers,u=void 0===l?[]:l,f=t.fullSearcher,v=t.resultMap,p=void 0===v?{}:v,d=t.results,g=void 0===d?[]:d;!function e(t,o,i,a){if(null!=o)if("string"==typeof o){var s=!1,h=-1,l=0;r._log("\nKey: ".concat(""===n?"--":n));var v=f.search(o);if(r._log('Full text: "'.concat(o,'", score: ').concat(v.score)),r.options.tokenize){for(var d=o.split(r.options.tokenSeparator),y=d.length,m=[],k=0,b=u.length;k<b;k+=1){var S=u[k];r._log('\nPattern: "'.concat(S.pattern,'"'));for(var x=!1,M=0;M<y;M+=1){var _=d[M],w=S.search(_),L={};w.isMatch?(L[_]=w.score,s=!0,x=!0,m.push(w.score)):(L[_]=1,r.options.matchAllTokens||m.push(1)),r._log('Token: "'.concat(_,'", score: ').concat(L[_]))}x&&(l+=1)}h=m[0];for(var A=m.length,O=1;O<A;O+=1)h+=m[O];h/=A,r._log("Token score average:",h)}var C=v.score;h>-1&&(C=(C+h)/2),r._log("Score average:",C);var j=!r.options.tokenize||!r.options.matchAllTokens||l>=u.length;if(r._log("\nCheck Matches: ".concat(j)),(s||v.isMatch)&&j){var P={key:n,arrayIndex:t,value:o,score:C};r.options.includeMatches&&(P.matchedIndices=v.matchedIndices);var I=p[a];I?I.output.push(P):(p[a]={item:i,output:[P]},g.push(p[a]))}}else if(c(o))for(var F=0,T=o.length;F<T;F+=1)e(F,o[F],i,a)}(i,a,s,h)}},{key:"_computeScore",value:function(e){this._log("\n\nComputing score:\n");for(var t=this._keyWeights,r=!!Object.keys(t).length,n=0,o=e.length;n<o;n+=1){for(var i=e[n],a=i.output,s=a.length,c=1,h=0;h<s;h+=1){var l=a[h],u=l.key,f=r?t[u]:1,v=0===l.score&&t&&t[u]>0?Number.EPSILON:l.score;c*=Math.pow(v,f)}i.score=c,this._log(i)}}},{key:"_sort",value:function(e){this._log("\n\nSorting...."),e.sort(this.options.sortFn)}},{key:"_format",value:function(e){var t=[];if(this.options.verbose){var r=[];this._log("\n\nOutput:\n\n",JSON.stringify(e,function(e,t){if("object"===n(t)&&null!==t){if(-1!==r.indexOf(t))return;r.push(t)}return t},2)),r=null}var o=[];this.options.includeMatches&&o.push(function(e,t){var r=e.output;t.matches=[];for(var n=0,o=r.length;n<o;n+=1){var i=r[n];if(0!==i.matchedIndices.length){var a={indices:i.matchedIndices,value:i.value};i.key&&(a.key=i.key),i.hasOwnProperty("arrayIndex")&&i.arrayIndex>-1&&(a.arrayIndex=i.arrayIndex),t.matches.push(a)}}}),this.options.includeScore&&o.push(function(e,t){t.score=e.score});for(var i=0,a=e.length;i<a;i+=1){var s=e[i];if(this.options.id&&(s.item=this.options.getFn(s.item,this.options.id)[0]),o.length){for(var c={item:s.item},h=0,l=o.length;h<l;h+=1)o[h](s,c);t.push(c)}else t.push(s.item)}return t}},{key:"_log",value:function(){var e;this.options.verbose&&(e=console).log.apply(e,arguments)}}])&&o(t.prototype,r),a&&o(t,a),e}();e.exports=h},function(e,t,r){function n(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var o=r(2),i=r(3),a=r(6),s=function(){function e(t,r){var n=r.location,o=void 0===n?0:n,i=r.distance,s=void 0===i?100:i,c=r.threshold,h=void 0===c?.6:c,l=r.maxPatternLength,u=void 0===l?32:l,f=r.isCaseSensitive,v=void 0!==f&&f,p=r.tokenSeparator,d=void 0===p?/ +/g:p,g=r.findAllMatches,y=void 0!==g&&g,m=r.minMatchCharLength,k=void 0===m?1:m,b=r.includeMatches,S=void 0!==b&&b;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.options={location:o,distance:s,threshold:h,maxPatternLength:u,isCaseSensitive:v,tokenSeparator:d,findAllMatches:y,includeMatches:S,minMatchCharLength:k},this.pattern=v?t:t.toLowerCase(),this.pattern.length<=u&&(this.patternAlphabet=a(this.pattern))}var t,r,s;return t=e,(r=[{key:"search",value:function(e){var t=this.options,r=t.isCaseSensitive,n=t.includeMatches;if(r||(e=e.toLowerCase()),this.pattern===e){var a={isMatch:!0,score:0};return n&&(a.matchedIndices=[[0,e.length-1]]),a}var s=this.options,c=s.maxPatternLength,h=s.tokenSeparator;if(this.pattern.length>c)return o(e,this.pattern,h);var l=this.options,u=l.location,f=l.distance,v=l.threshold,p=l.findAllMatches,d=l.minMatchCharLength;return i(e,this.pattern,this.patternAlphabet,{location:u,distance:f,threshold:v,findAllMatches:p,minMatchCharLength:d,includeMatches:n})}}])&&n(t.prototype,r),s&&n(t,s),e}();e.exports=s},function(e,t){var r=/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;e.exports=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:/ +/g,o=new RegExp(t.replace(r,"\\$&").replace(n,"|")),i=e.match(o),a=!!i,s=[];if(a)for(var c=0,h=i.length;c<h;c+=1){var l=i[c];s.push([e.indexOf(l),l.length-1])}return{score:a?.5:1,isMatch:a,matchedIndices:s}}},function(e,t,r){var n=r(4),o=r(5);e.exports=function(e,t,r,i){for(var a=i.location,s=void 0===a?0:a,c=i.distance,h=void 0===c?100:c,l=i.threshold,u=void 0===l?.6:l,f=i.findAllMatches,v=void 0!==f&&f,p=i.minMatchCharLength,d=void 0===p?1:p,g=i.includeMatches,y=void 0!==g&&g,m=s,k=e.length,b=u,S=e.indexOf(t,m),x=t.length,M=[],_=0;_<k;_+=1)M[_]=0;if(-1!==S){var w=n(t,{errors:0,currentLocation:S,expectedLocation:m,distance:h});if(b=Math.min(w,b),-1!==(S=e.lastIndexOf(t,m+x))){var L=n(t,{errors:0,currentLocation:S,expectedLocation:m,distance:h});b=Math.min(L,b)}}S=-1;for(var A=[],O=1,C=x+k,j=1<<(x<=31?x-1:30),P=0;P<x;P+=1){for(var I=0,F=C;I<F;){n(t,{errors:P,currentLocation:m+F,expectedLocation:m,distance:h})<=b?I=F:C=F,F=Math.floor((C-I)/2+I)}C=F;var T=Math.max(1,m-F+1),N=v?k:Math.min(m+F,k)+x,z=Array(N+2);z[N+1]=(1<<P)-1;for(var E=N;E>=T;E-=1){var W=E-1,K=r[e.charAt(W)];if(K&&(M[W]=1),z[E]=(z[E+1]<<1|1)&K,0!==P&&(z[E]|=(A[E+1]|A[E])<<1|1|A[E+1]),z[E]&j&&(O=n(t,{errors:P,currentLocation:W,expectedLocation:m,distance:h}))<=b){if(b=O,(S=W)<=m)break;T=Math.max(1,2*m-S)}}if(n(t,{errors:P+1,currentLocation:m,expectedLocation:m,distance:h})>b)break;A=z}var $={isMatch:S>=0,score:0===O?.001:O};return y&&($.matchedIndices=o(M,d)),$}},function(e,t){e.exports=function(e,t){var r=t.errors,n=void 0===r?0:r,o=t.currentLocation,i=void 0===o?0:o,a=t.expectedLocation,s=void 0===a?0:a,c=t.distance,h=void 0===c?100:c,l=n/e.length,u=Math.abs(s-i);return h?l+u/h:u?1:l}},function(e,t){e.exports=function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,r=[],n=-1,o=-1,i=0,a=e.length;i<a;i+=1){var s=e[i];s&&-1===n?n=i:s||-1===n||((o=i-1)-n+1>=t&&r.push([n,o]),n=-1)}return e[i-1]&&i-n>=t&&r.push([n,i-1]),r}},function(e,t){e.exports=function(e){for(var t={},r=e.length,n=0;n<r;n+=1)t[e.charAt(n)]=0;for(var o=0;o<r;o+=1)t[e.charAt(o)]|=1<<r-o-1;return t}},function(e,t){var r=function(e){return Array.isArray?Array.isArray(e):"[object Array]"===Object.prototype.toString.call(e)},n=function(e){return null==e?"":function(e){if("string"==typeof e)return e;var t=e+"";return"0"==t&&1/e==-1/0?"-0":t}(e)},o=function(e){return"string"==typeof e},i=function(e){return"number"==typeof e};e.exports={get:function(e,t){var a=[];return function e(t,s){if(s){var c=s.indexOf("."),h=s,l=null;-1!==c&&(h=s.slice(0,c),l=s.slice(c+1));var u=t[h];if(null!=u)if(l||!o(u)&&!i(u))if(r(u))for(var f=0,v=u.length;f<v;f+=1)e(u[f],l);else l&&e(u,l);else a.push(n(u))}else a.push(t)}(e,t),a},isArray:r,isString:o,isNum:i,toString:n}}])});

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (module, exports) {
    "use strict";

    /**
     * Stores user search results for the server-users-supplier
     */
    // TODO CONFSRVDEV-2015 - shouldn't store the same User object more than once. Should only store lists of keys in the query map,
    // and then have a separate cross-supplier Map of User objects by key. dT
    var cache = {};
    var queries = [];

    exports.default = function (limit) {
        return {
            add: function add(query, users) {
                cache[query] = {
                    query: query,
                    users: users,
                    isExhausted: users.length < limit
                };

                // Queries list is alph sorted descending so that longer queries are above the shorter queries that
                // they contain.
                queries.push(query);
                queries.sort();
                queries.reverse();
            },

            /**
             * Look in the cache for this query or a shorter one.
             */
            getClosest: function getClosest(query) {
                if (cache[query]) {
                    return cache[query];
                }

                // Else find the longest matching substring of the query.
                // The query list is sorted, so the first item found should be the longest one.
                var queryMatch = queries.find(function (subquery) {
                    return query.indexOf(subquery) === 0;
                });
                if (queryMatch) {
                    return cache[queryMatch];
                }

                return null; // just to make this obvious...
            },

            // Used in tests.
            reset: function reset() {
                cache = {};
                queries = [];
            }
        };
    };

    module.exports = exports['default'];
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (module, exports) {
    "use strict";

    function escape(query) {
        return [].map.call(query, function escapeSpecialCharacter(char) {
            if (char === '+' || char === '-' || char === '&' || char === '|' || char === '!' || char === '(' || char === ')' || char === '{' || char === '}' || char === '[' || char === ']' || char === '^' || char === '"' || char === '~' || char === '*' || char === '?' || char === ':' || char === '\\') return '\\' + char;
            return char;
        }).join('');
    }

    exports.default = {
        escape: escape
    };
    module.exports = exports['default'];
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(2), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (module, exports, _meta, _userSupplierKeys) {
    'use strict';

    var Meta = _interopRequireDefault(_meta).default;

    var UserSupplier = _interopRequireDefault(_userSupplierKeys).default;

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    "use strict";

    function getCurrentUser() {
        return new Promise(function (resolve) {

            var username = Meta.get('remote-user');
            if (!username) {
                // Anonymous user.
                return resolve();
            }

            var userKey = Meta.get('remote-user-key');
            var displayName = Meta.get('current-user-fullname');
            var path = Meta.get('current-user-avatar-uri-reference');

            resolve({
                type: "known",
                username: username,
                userKey: userKey,
                profilePicture: {
                    path: path,
                    width: 48,
                    height: 48
                },
                displayName: displayName,
                supplier: UserSupplier.CURRENT
            });
        });
    }

    exports.default = {
        getCurrentUser: getCurrentUser
    };
    module.exports = exports['default'];
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(15), __webpack_require__(42), __webpack_require__(13), __webpack_require__(43), __webpack_require__(16), __webpack_require__(45), __webpack_require__(46), __webpack_require__(47), __webpack_require__(17)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (module, exports, _templates, _resultPlaceholder, _userRanker, _userConverter, _utils, _defaultOrdering, _scoreLogger, _defaultFiltering, _scoreBooster) {
    'use strict';

    var Templates = _interopRequireDefault(_templates).default;

    var ResultPlaceholder = _interopRequireDefault(_resultPlaceholder).default;

    var SearchUsers = _interopRequireDefault(_userRanker).default;

    var ConvertUsers = _interopRequireDefault(_userConverter).default;

    var RenderUtils = _interopRequireDefault(_utils).default;

    var ensureDefaultOrder = _interopRequireDefault(_defaultOrdering).default;

    var scoreLogger = _interopRequireDefault(_scoreLogger).default;

    var filterServerResults = _interopRequireDefault(_defaultFiltering).default;

    var ScoreBooster = _interopRequireDefault(_scoreBooster).default;

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    "use strict"; /**
                   * The contents of the UserCache is passed through the user pipeline which filters, ranks and modifies
                   * the list until we arrive at the final 5 elements to display.
                   *
                   * Want To add another function to the user pipeline? Easy...
                   *
                   * Define a function like the following and add it to a pipeline. Ordering is very important.
                   *
                   * @param results   The results array as supplied by the previous function
                   * @param next      Call this function and pass some results to trigger the next stage of the pipeline
                   * @param context   Some context about the current rendering request. See Mentions.js
                   *
                   * function pipelineTransformation(results, next, context) {
                   *      //Do some things on results
                   *      results.forEach((results) => transform(result))
                   *
                   *      //Remember to call next
                   *      next(results);
                   * }
                   */

    function filterUsingQuery(results, next, context) {
        next(SearchUsers(results, context.query));
    }

    function moveSelectedUserToTop(oldUsers, next, context) {
        if (!context.selectedUser) {
            return next(oldUsers);
        }

        var index = oldUsers.findIndex(function (user) {
            return user.username === context.selectedUser.username;
        });
        // Note that > -1 means that the user IS in the array. If index is 0, the user is already in the correct position
        // at the start of the array and there is nothing to do.
        if (index <= 0) {
            return next(oldUsers);
        }

        // Put this user at the start of the array.
        var user = oldUsers[index];
        var newUsers = oldUsers.slice(0); // clone the array to avoid modifying the original
        newUsers.splice(index, 1);
        newUsers.unshift(user);

        return next(newUsers);
    }

    /**
     * fuseScore is available on all user results for a query-term search, so we can sort at any point in the pipeline.
     */
    function sortOnScore(users, next) {
        if (users.length && typeof users[0].fuseScore === 'number') {
            // If the first result has a fuseScore they all will.
            users.sort(function (user1, user2) {
                return user1.fuseScore - user2.fuseScore;
            });
        }
        next(users);
    }

    function limit(array, next, context) {
        next(array.slice(0, context.DISPLAY_LIMIT));
    }

    // Called in the Server pipeline when there are no results.
    function userNotFound(results, next) {
        if (!results.length) {
            var notFoundResult = RenderUtils.resultWithHtml(Templates.Mentions.userNotFoundResult());
            results = [notFoundResult];
        }

        next(results);
    }

    function empty(results, next) {
        if (!results.length) {
            next([RenderUtils.resultWithHtml(Templates.Mentions.loadingPlaceholder())]);
        } else {
            next(results);
        }
    }

    function addErrorResult(results, next) {
        var failureResult = RenderUtils.resultWithHtml(Templates.Mentions.searchFailureResult());
        next([failureResult]);
    }

    /**
     * This function convert Users from API format to something that the Dropdown can display.
     *
     * All elements in the results array should be Users in API format.
     * If you want to add other elements to the results array, do this *after* convertUsers in the pipeline
     *
     * @param results
     * @param next
     */
    function convertUsers(results, next) {
        next(ConvertUsers(results));
    }

    // Don't continue the render if the query is stale.
    function staleServerResponseFilter(results, next, context) {
        if (context.latestQuery === context.query) {
            next(results);
        }
    }

    exports.default = {

        default: function _default(renderCallback) {
            return [ResultPlaceholder.cancelTimeout, filterServerResults, ensureDefaultOrder, limit, ScoreBooster.setSuggestedUsers, convertUsers, renderCallback];
        },

        client: function client(renderCallback) {
            return [ResultPlaceholder.cancelTimeout, filterUsingQuery, ScoreBooster.boostScores, sortOnScore, limit, moveSelectedUserToTop, convertUsers, ResultPlaceholder.startTimeout, empty, renderCallback];
        },
        server: function server(renderCallback) {
            return [ResultPlaceholder.cancelTimeout, staleServerResponseFilter, filterUsingQuery, ScoreBooster.boostScores, sortOnScore, limit, moveSelectedUserToTop, scoreLogger, convertUsers, userNotFound, renderCallback];
        },

        error: function error(renderCallback) {
            return [ResultPlaceholder.cancelTimeout, addErrorResult, renderCallback];
        },

        _functions: {
            moveSelectedUserToTop: moveSelectedUserToTop,
            sortOnScore: sortOnScore
        }
    };
    module.exports = exports['default'];
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(16), __webpack_require__(15)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (module, exports, _utils, _templates) {
    'use strict';

    var RenderUtils = _interopRequireDefault(_utils).default;

    var Templates = _interopRequireDefault(_templates).default;

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var displayTimeout = void 0;

    function _padResults(results, context) {
        var additionalElements = context.DISPLAY_LIMIT - results.length;
        if (additionalElements > 0) {
            var placeholder = RenderUtils.resultWithHtml(Templates.Mentions.loadingPlaceholder());
            for (var index = 0; index < additionalElements; index++) {
                results.push(placeholder);
            }
        }
        return results;
    }

    function startTimeout(results, next, context) {
        displayTimeout = setTimeout(function () {
            results = _padResults(results, context);
            next(results);
        }, window.skeletonPlaceholder || 3000); // CONFSRVDEV-3833 Remove once an appropriate value has been found.
        next(results);
    }

    function cancelTimeout(results, next) {
        clearTimeout(displayTimeout);
        next(results);
    }

    exports.default = {
        startTimeout: startTimeout,
        cancelTimeout: cancelTimeout
    };
    module.exports = exports['default'];
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(2), __webpack_require__(10), __webpack_require__(1), __webpack_require__(44)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (module, exports, _meta, _i18n, _userSupplierKeys, _darkFeatures) {
    'use strict';

    var Meta = _interopRequireDefault(_meta).default;

    var I18n = _interopRequireDefault(_i18n).default;

    var UserSupplier = _interopRequireDefault(_userSupplierKeys).default;

    var DarkFeatures = _interopRequireDefault(_darkFeatures).default;

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    /**
     * Converts Users from API format to something that the Dropdown can display.
     */
    var contextPath = Meta.get('context-path');

    function getProfilePicture(user) {
        if (user && user.profilePicture && Meta.get('can-view-profile')) {
            // HACK - work around CONFSRVDEV-2936 by removing the dud context-path from the path.
            return user.profilePicture.path.replace('/_' + contextPath, '/_');
        }
        return contextPath + '/images/icons/profilepics/anonymous.svg';
    }

    var converter = function converter(users) {
        var addRecentLozenge = DarkFeatures.isEnabled('smart.mentions.recent.lozenge');
        var linkBase = Meta.get('base-url') + '/display/~';

        return users.map(function (user) {
            var link = linkBase + user.username;

            var lozenge = user.supplier === UserSupplier.RELATED && user.role && user.role.i18n;

            if (!lozenge && addRecentLozenge) {
                // Including a lozenge for Recent helps us see why an item is promoted, but make it opt-in.
                lozenge = user.supplier === UserSupplier.RECENT && I18n('user.supplier.recent');
            }
            // Uncomment this line to see why the results are in the order they are.
            // const lozenge = "" + user.fuseScore;

            return {
                className: 'insert-mentions-dropdown-option',
                name: user.displayName,
                username: user.username,
                href: link, // only used if the user tries to middle-click/open-in-new-tab the dropdown item
                icon: getProfilePicture(user),
                lozenge: lozenge,
                link: link,
                model: user,
                fuseMatches: user.fuseMatches
            };
        });
    };

    // Available for unit testing.
    converter._getProfilePicture = getProfilePicture;

    exports.default = converter;
    module.exports = exports['default'];
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_44__;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (module, exports, _recentUsersSupplier) {
    "use strict";

    var RecentUsers = _interopRequireDefault(_recentUsersSupplier).default;

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    var supplierToScoreMap = {
        "current": 1,
        "recent": 2,
        "related": {
            "creator": 3,
            "contributor": 4,
            "commenter": 5
        },
        "server": 6
    };

    var MAX_SCORE = 100;

    function scoreUser(user) {
        var potentialScore = supplierToScoreMap[user.supplier];

        if (typeof potentialScore === "number") {
            if (typeof user.sortIndex === "number") {
                // This allows us to sort recent users coming out of the cache. The highest calculated score will be just < 3.
                potentialScore += user.sortIndex / (RecentUsers.RECENT_USER_LIMIT + 1);
            }
            return potentialScore;
        }

        // Not a number, probably another object, index into it with role
        // Otherwise, it might have been undefined
        return (typeof potentialScore === "undefined" ? "undefined" : _typeof(potentialScore)) === "object" ? potentialScore[user.role.role] : MAX_SCORE;
    }

    function ensureDefaultOrder(results, next) {
        var sorted = results.sort(function (user1, user2) {
            return scoreUser(user1) - scoreUser(user2);
        });
        next(sorted);
    }

    exports.default = ensureDefaultOrder;
    module.exports = exports['default'];
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (module, exports, _ajs) {
    "use strict";

    exports.default = logScores;

    var AJS = _interopRequireDefault(_ajs).default;

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    "use strict";

    /**
     * Just used during development, logs result score information to help us figure out reasons for result order.
     */
    function logScores(results, next, context) {
        if (context.query) {
            AJS.debug("*** Mentions *** user-pipeline/logger: Logging search results for " + context.query);

            results.forEach(function (user) {
                AJS.debug("*** Mentions *** user-pipeline/logger: " + user.displayName + " has a score of " + user.fuseScore);
            });
        }

        next(results);
    };
    module.exports = exports['default'];
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (module, exports, _userSupplierKeys) {
    "use strict";

    var DEFAULT_SUPPLIERS = [_userSupplierKeys.RECENT, _userSupplierKeys.CURRENT, _userSupplierKeys.RELATED];

    function filterServerResults(results, next) {
        var filteredUsers = results.filter(function (user) {
            return DEFAULT_SUPPLIERS.indexOf(user.supplier) !== -1;
        });
        next(filteredUsers);
    }

    exports.default = filterServerResults;
    module.exports = exports['default'];
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (module, exports) {
    "use strict";

    function PipelineExecutor(pipeline, context) {
        this.pipeline = pipeline;
        this.context = context;
    }

    PipelineExecutor.prototype.execute = function (input) {
        this._next(0, input);
    };

    PipelineExecutor.prototype._next = function (index, results) {
        this.pipeline[index](results, this._next.bind(this, index + 1), this.context);
    };

    exports.default = PipelineExecutor;
    module.exports = exports['default'];
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(0), __webpack_require__(50), __webpack_require__(18)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (module, exports, _ajs, _analyticsSupport, _autocompleteManager) {
    'use strict';

    var AJS = _interopRequireDefault(_ajs).default;

    var Analytics = _interopRequireDefault(_analyticsSupport).default;

    var AutocompleteManager = _interopRequireDefault(_autocompleteManager).default;

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    "use strict";

    function publishEventForSelection(user) {
        var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var idd = typeof AutocompleteManager.getInputDrivenDropdown === 'function' && AutocompleteManager.getInputDrivenDropdown();
        if (!idd || !user) {
            AJS.debug("Cannot publish 'confluence.mention.selection' analytics with missing dropdown, user or context.");
            return;
        }

        var query = idd._value || '';
        var dd = idd.dd;
        var index = dd && typeof dd.getFocusIndex === 'function' && dd.getFocusIndex();

        var analyticsData = {
            source: user.model.supplier,
            queryLength: query.length,
            queryWords: query.split(' ').length,
            index: index,
            numberOfSearches: context.numGetDataAndRunCallbackCalls
        };

        // By publishing the supplier source of the selected User, we can determine whether users are finding
        // the users they need from the Smart mentions or whether they still have to wait for the Dumb (server)
        // ones.
        Analytics.publish('confluence.mention.selection', analyticsData);
        AJS.debug("Published 'confluence.mention.selection' event with supplier: " + user.model.supplier);
    }

    /**
     * Updates the state of the current Mention interaction.
     * @param autoCompleteControl
     */
    function updateSession(autoCompleteControl) {
        autoCompleteControl.analytics = Object.assign({
            numGetDataAndRunCallbackCalls: 0
        }, autoCompleteControl.analytics);

        autoCompleteControl.analytics.numGetDataAndRunCallbackCalls += 1;
    }

    exports.default = {
        updateSession: updateSession,
        publishEventForSelection: publishEventForSelection
    };
    module.exports = exports['default'];
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_50__;

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_51__;

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_52__;

/***/ })
/******/ ])});;
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-mentions-plugin:smart-mentions-editor-resources', location = '/js/smart-mentions-init.js' */
require([
    'confluence-editor/loader/tinymce-bootstrap',
    'confluence-mentions'
], function (BootstrapManager,
             Mentions) {
    // Main entry point to Smart Mentions logic. To lower page weight, we could potentially pull in the Mentions
    // bundle.js via a WRM.require on the bootstrap init.
    BootstrapManager.addOnInitCallback(Mentions.init);
});

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-fixed-headers:confluence-fixed-headers-editor-resources', location = '/js/slow-edit-handler.js' */
require(["confluence/fh/utils/dom","ajs"],function(c,a){a.toInit(function(){var b=a.Meta.get("browse-page-tree-mode");if("create"===b||"edit"===b)c.addClassToPage(),$("#content").css({paddingRight:0})})});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.share-page:edit-resources', location = 'js/edit-init.js' */
require(["ajs","confluence/meta","confluence/share-page/service/share-page","confluence/share-page/service/share-dialog-loader","confluence/dark-features"],function(b,d,n,p,q){function m(){if("page"===d.get("content-type")||"blogpost"===d.get("content-type")){var c=b.$;if(q.isEnabled("react.share.dialog")){var h=c("\x3cdiv\x3e").addClass("invite-to-edit-container").tooltip({title:function(){return "Invite people to edit with you"},gravity:"ne"});h.append(c("\x3cspan\x3e").attr("id",
"share-react-link"));c("#rte-toolbar").prepend(h);p.init("share-react-link","edit")}else{c("#rte-toolbar").prepend(c(document.createElement("button")).prop("id","#inviteToEditLink".replace("#","")).attr("aria-label","Invite people to edit with you").attr("aria-haspopup",!0).attr("aria-expanded",!1).addClass("aui-button").addClass("invite-to-edit-button").html('\x3cspan class\x3d"invite-plus-icon"\x3e\x3c/span\x3e').tooltip({title:function(){return "Invite people to edit with you"},
gravity:"ne"}));var f=c("#inviteToEditLink");h="page"===d.get("content-type")?"Let\u0027s work together on this page":"Let\u0027s work together on this blog post";var r=function(){var a=c("#inline-dialog-inviteToEditPopup .share-content-popup"),e=c().add(a.find("button, input, select, textarea")).add(a.find("[href]")).add(a.find("[tabindex]:not([tabindex\x3d'-1'])"));a.focus().keydown(function(g){if("tab"===g.key.toLowerCase()){var k=c(g.target);if(g.shiftKey){if(k.is(a)||
k.is(e.first()))g.preventDefault(),e.last().focus()}else k.is(e.last())&&(g.preventDefault(),e.first().focus())}})},l=!1;n.initDialog("#inviteToEditLink","inviteToEditPopup",{},{heading:"Invite people to edit",notePlaceholder:h,link:function(){return require("confluence/share-page/fetch/content-info")(d.get("content-id"),"draft").pipe(function(a){return d.get("base-url")+a._links.edit})},entityId:function(){return d.get("draft-id")},restriction:function(){return require("confluence/share-page/fetch/content-restrictions")(d.get("content-id")).pipe(function(a){var e=
{};if(a.read.restrictions.user.size||a.read.restrictions.group.size||a.update.restrictions.user.size||a.update.restrictions.group.size)e.type="restrict",e.message="Restrictions on this page may prevent people viewing or editing.";return e})},copyOption:"invite",shareType:"edit",contentType:d.get("content-type"),errorText:"An unexpected error occurred. Please try again.",beforeLoad:function(){f.find(".invite-plus-icon").css("visibility","hidden");f.spin()},afterLoad:function(){f.find(".invite-plus-icon").css("visibility","visible");
f.spinStop()},onShow:function(){f.attr("aria-expanded",!0);var a=c("#inline-dialog-inviteToEditPopup").find('a[href]:visible, input:visible, button:not([disabled]):visible, textarea:visible, select:visible, details:visible,[tabindex]:not([tabindex\x3d"-1"]):visible').first();a&&a.focus();r();l=!0},onHide:function(){l&&(f.attr("aria-expanded",!1),c(document).off("keyup").on("keyup",function(a){27===a.keyCode&&f.focus()}));l=!1}})}}}"collaborative"===d.get("edit-mode")&&d.get("remote-user")&&(b.Rte.getEditor()&&
b.Rte.getEditor().initialized?m():b.bind("rte-collab-ready",m))});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.auiplugin:split_aui.deprecated.pattern.toolbar1', location = 'aui.chunk.2e5a57e4e871239c85ed--04322bc020cb0bd3caaf.js' */
(window.__auiJsonp=window.__auiJsonp||[]).push([["aui.deprecated.pattern.toolbar1"],{DHJP:function(i,n,t){"use strict";t.r(n)}},[["DHJP","runtime"]]]);
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.keyboardshortcuts:confluence-tinymce-keyboard-shortcuts', location = 'js/tinymce-plugin.js' */
define("confluence-keyboard-shortcuts/tinymce-plugin",["confluence-keyboard-shortcuts/confluence-keyboard-shortcuts"],function(d){var e={init:function(a){for(var b=function(b){return function(){a.execCommand("FormatBlock",!1,b)}},c=1;7>c;c++)a.addCommand("FormatBlock-h"+c,b("h"+c));a.addCommand("FormatBlock-p",b("p"));a.addCommand("FormatBlock-pre",b("pre"));a.addCommand("FormatBlock-blockquote",b("blockquote"));a.addCommand("mceConfShortcutDialog",d.keyboardShortcuts.openDialog);a.ui.registry.addButton("help",
{text:"confluence.conf_shortcuts_help_desc",onAction:function(){a.execCommand("mceConfShortcutDialog")}})},getInfo:function(){return{longname:"Atlassian Editor Keyboard Shortcuts Plugin",author:"Atlassian",authorurl:"http://www.atlassian.com"}}};return function(){return e}});require("confluence/module-exporter").safeRequire("confluence-keyboard-shortcuts/tinymce-plugin",function(d){require("tinymce").PluginManager.add("keyboardshortcuts",d)});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.sticky-table-headers:stickytableheaders-resources', location = '/js/vendor/jquery.stickytableheaders.js' */
/*
 Modified by Atlassian | Copyright (c) 2011 by Jonas Mosbech - https://github.com/jmosbech/StickyTableHeaders
 MIT license info: https://github.com/jmosbech/StickyTableHeaders/blob/master/license.txt */
(function(d,l,t){function p(g,k){var a=this;a.$el=d(g);a.el=g;a.id=q++;a.$el.bind("destroyed",d.proxy(a.teardown,a));a.$clonedHeader=null;a.$originalHeader=null;a.cachedHeaderHeight=null;a.isSticky=!1;a.hasBeenSticky=!1;a.leftOffset=null;a.topOffset=null;a.init=function(){a.setOptions(k);a.$el.each(function(){var c=d(this);c.css("padding",0);a.$originalHeader=d("thead:first",this);a.$clonedHeader=a.$originalHeader.clone();c.trigger("clonedHeader.stickyTableHeaders",[a.$clonedHeader]);a.$clonedHeader.addClass("tableFloatingHeader");
a.$clonedHeader.css("display","none");a.$originalHeader.addClass("tableFloatingHeaderOriginal");a.$originalHeader.after(a.$clonedHeader);a.$printStyle=d('\x3cstyle type\x3d"text/css" media\x3d"print"\x3e.tableFloatingHeader{display:none !important;}.tableFloatingHeaderOriginal{position:static !important;}\x3c/style\x3e');a.$head.append(a.$printStyle)});a.updateWidth();a.toggleHeaders();a.bind()};a.destroy=function(){a.$el.unbind("destroyed",a.teardown);a.teardown()};a.teardown=function(){a.isSticky&&
a.$originalHeader.css("position","static");d.removeData(a.el,"plugin_stickyTableHeaders");a.unbind();a.$clonedHeader.remove();a.$originalHeader.removeClass("tableFloatingHeaderOriginal");a.$originalHeader.css("visibility","visible");a.$printStyle.remove();a.el=null;a.$el=null};a.bind=function(){a.$scrollableArea.on("scroll.stickyTableHeaders",a.toggleHeaders);a.isWindowScrolling||(a.$window.on("scroll.stickyTableHeaders"+a.id,a.setPositionValues),a.$window.on("resize.stickyTableHeaders"+a.id,a.toggleHeaders));
a.$scrollableArea.on("resize.stickyTableHeaders",a.toggleHeaders);a.$scrollableArea.on("resize.stickyTableHeaders",a.updateWidth)};a.unbind=function(){a.$scrollableArea.off(".stickyTableHeaders",a.toggleHeaders);a.isWindowScrolling||(a.$window.off(".stickyTableHeaders"+a.id,a.setPositionValues),a.$window.off(".stickyTableHeaders"+a.id,a.toggleHeaders));a.$scrollableArea.off(".stickyTableHeaders",a.updateWidth)};a.debounce=function(c,e){var f=null;return function(){var b=this,h=arguments;clearTimeout(f);
f=setTimeout(function(){c.apply(b,h)},e)}};a.toggleHeaders=a.debounce(function(){a.$el&&a.$el.each(function(){var c=d(this),e=a.isWindowScrolling?isNaN(a.options.fixedOffset)?a.options.fixedOffset.outerHeight():a.options.fixedOffset:a.$scrollableArea.offset().top+(isNaN(a.options.fixedOffset)?0:a.options.fixedOffset);var f=c.offset();var b=a.$scrollableArea.scrollTop()+e,h=a.$scrollableArea.scrollLeft(),m=a.options.cacheHeaderHeight?a.cachedHeaderHeight:a.$clonedHeader.height(),n=a.isWindowScrolling?
b>f.top:e>f.top;b=(a.isWindowScrolling?b:0)<f.top+c.height()-m-(a.isWindowScrolling?0:e);n&&b?(f=f.left-h+a.options.leftOffset,a.$originalHeader.css({position:"fixed","margin-top":a.options.marginTop,left:f,"z-index":3}),a.leftOffset=f,a.topOffset=e,a.$clonedHeader.css("display",""),a.isSticky||(a.isSticky=!0,a.updateWidth(),c.trigger("enabledStickiness.stickyTableHeaders")),a.setPositionValues()):a.isSticky&&(a.$originalHeader.css("position","static"),a.$clonedHeader.css("display","none"),a.isSticky=
!1,a.resetWidth(d("td,th",a.$clonedHeader),d("td,th",a.$originalHeader)),c.trigger("disabledStickiness.stickyTableHeaders"))})},0);a.setPositionValues=a.debounce(function(){var c=a.$window.scrollTop(),e=a.$window.scrollLeft();!a.isSticky||0>c||c+a.$window.height()>a.$document.height()||0>e||e+a.$window.width()>a.$document.width()||a.$originalHeader.css({top:a.topOffset-(a.isWindowScrolling?0:c),left:a.leftOffset-(a.isWindowScrolling?0:e)})},0);a.updateWidth=a.debounce(function(){if(a.isSticky){a.$originalHeaderCells||
(a.$originalHeaderCells=d("th,td",a.$originalHeader));a.$clonedHeaderCells||(a.$clonedHeaderCells=d("th,td",a.$clonedHeader));var c=a.getWidth(a.$clonedHeaderCells);a.setWidth(c,a.$clonedHeaderCells,a.$originalHeaderCells);a.$originalHeader.css("width",a.$clonedHeader.width());a.options.cacheHeaderHeight&&(a.cachedHeaderHeight=a.$clonedHeader.height())}},0);a.getWidth=function(c){var e=[];c.each(function(f){var b=d(this);if("border-box"===b.css("box-sizing"))b=b[0].getBoundingClientRect(),b=b.width?
b.width:b.right-b.left;else if("collapse"===d("th",a.$originalHeader).css("border-collapse"))if(l.getComputedStyle)b=parseFloat(l.getComputedStyle(this,null).width);else{var h=parseFloat(b.css("padding-left")),m=parseFloat(b.css("padding-right")),n=parseFloat(b.css("border-width"));b=b.outerWidth()-h-m-n}else b=b.width();e[f]=b});return e};a.setWidth=function(c,e,f){e.each(function(b){var h=c[b];f.eq(b).css({"min-width":h,"max-width":h})})};a.resetWidth=function(c,e){c.each(function(f){var b=d(this);
e.eq(f).css({"min-width":b.css("min-width"),"max-width":b.css("max-width")})})};a.setOptions=function(c){a.options=d.extend({},r,c);a.$window=d(a.options.objWindow);a.$head=d(a.options.objHead);a.$document=d(a.options.objDocument);a.$scrollableArea=d(a.options.scrollableArea);a.isWindowScrolling=a.$scrollableArea[0]===a.$window[0]};a.updateOptions=function(c){a.setOptions(c);a.unbind();a.bind();a.updateWidth();a.toggleHeaders()};a.init()}var q=0,r={fixedOffset:0,leftOffset:0,marginTop:0,objDocument:document,
objHead:"head",objWindow:l,scrollableArea:l,cacheHeaderHeight:!1};d.fn.stickyTableHeaders=function(g){return this.each(function(){var k=d.data(this,"plugin_stickyTableHeaders");k?"string"===typeof g?k[g].apply(k):k.updateOptions(g):"destroy"!==g&&d.data(this,"plugin_stickyTableHeaders",new p(this,g))})}})(jQuery,window);
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.sticky-table-headers:stickytableheaders-resources', location = '/js/lib/utils.js' */
define("sticky-table-headers/utils",["jquery"],function(d){var e=function(){return!d("body").hasClass("theme-documentation")};return{isAValidTable:function(a){a=d(a);var b;if(b=e()&&!a.hasClass("stickyTableHeaders")&&0< !a.closest(".columnLayout").length&&0< !a.parents("table").length&&a.find("\x3e thead:first").is(":visible")&&1===a.find("thead").children().length&&1===a.find(".confluenceTh").parent().length)b=0===a.find(".confluenceTh").siblings().length||0===a.find(".confluenceTh").siblings().not(".confluenceTh").length;
return b},bindHorizontalScrolling:function(a,b){var c=b||d(window);a.closest(".table-wrap").scroll(function(){c.trigger("scroll.stickyTableHeaders")})},moveHeaderRowsToTHead:function(a){d(a).each(function(){var b=d(this);if(!(0<b.find("\x3e thead").length)){var c=b.find("\x3e tbody \x3e :first-child \x3e :first-child.confluenceTh");!(0>=c.length||0<c.parent().find("\x3e .confluenceTh[rowspan]").length)&&0< !b.parents("table").length&&0< !b.closest(".columnLayout").length&&(c=d("\x3cthead /\x3e").append(c.parent()),
b.prepend(c))}})},isNotDocumentationTheme:e}});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.sticky-table-headers:stickytableheaders-resources', location = '/js/lib/viewpage.js' */
define("sticky-table-headers/viewpage",["jquery","ajs","sticky-table-headers/utils"],function(c,l,d){var e,h,f,n=function(a,b){a=c(a).filter(function(){return d.isAValidTable(this)});a.stickyTableHeaders(b).addClass("stickyTableHeaders");f?f.add(a):f=a;b=function(m,g){f.stickyTableHeaders(g)};h&&l.unbind("sticky-table-headers.change.options",h);l.bind("sticky-table-headers.change.options",b);h=b;d.bindHorizontalScrolling(a)};return{initialize:function(){var a=c(".confluenceTable:not(.stickyTableHeaders)"),
b=c(window);if(d.isNotDocumentationTheme()){d.moveHeaderRowsToTHead(a);if(window.MutationObserver){a=document.querySelector("#page")||document.querySelector("#confluence-ui");var m=/sticky|tableFloating|confluenceTh/,g=new MutationObserver(c.debounce(function(p){for(var q=!1,r,k=0,t=p.length;k<t;k++)if(r=p[k].target.className,!m.test(r)){q=!0;break}q&&b.trigger("resize.stickyTableHeaders")},0));e&&e.unobserve&&e.unobserve();g.observe(a,{subtree:!0,attributes:!0,childList:!0});e=g}n(c(".confluenceTable"),
{cacheHeaderHeight:!0})}},setupTable:n}});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.sticky-table-headers:stickytableheaders-resources', location = '/js/lib/editor.js' */
define("sticky-table-headers/editor",["ajs","jquery","sticky-table-headers/utils"],function(f,c,e){var h=function(a){var b={};b.objWindow=c(a.getWin());b.scrollableArea=b.objWindow;b.objDocument=c(a.getDoc());b.objHead=b.objDocument.find("head");return b},g=function(a,b){var d=f.Rte.getEditor();d&&(d=h(d),b=c.extend({},d,b),a=c(a).filter(function(){return e.isAValidTable(this)}),a.stickyTableHeaders(b).addClass("stickyTableHeaders"),e.bindHorizontalScrolling(a,b.objWindow))};return{initialize:function(){var a=
f.Rte.getEditor();a&&(a=c(a.getBody()).find(".confluenceTable"),e.moveHeaderRowsToTHead(a),g(a))},setupTable:g}});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.sticky-table-headers:stickytableheaders-resources', location = '/js/stickytableheaders.js' */
define("sticky-table-headers",["ajs","sticky-table-headers/viewpage","sticky-table-headers/editor","jquery"],function(a,c,b,d){var e=a.debounce(c.initialize,0);return{initialize:function(){a.DarkFeatures.isEnabled("confluence-table-enhancements.sticky-headers.disabled")||d(function(){e()});a.DarkFeatures.isEnabled("confluence-table-enhancements.sticky-headers-editor")&&(a.bind("rte-ready",b.initialize),a.bind("rte-quick-edit-push-state",b.initialize),a.bind("rte-quick-edit-push-hash",b.initialize))}}});
require("sticky-table-headers").initialize();
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.image.effects.ImageEffectsPlugin:propertiespanel', location = 'com/atlassian/confluence/image/effects/property-panel.js' */
AJS.toInit(function(e){function u(){AJS.bind("dialog-created.image-properties",function(a,c){d=c.img;n()?d.naturalHeight&&d.naturalWidth&&16E6<d.naturalHeight*d.naturalWidth?Confluence.Editor.ImageProps.registerPanel("image-effects",k("This image is too large to rotate or apply image effects. You\u0027ll need to upload a smaller version of the file."),"image-effects-panel",null):Confluence.Editor.ImageProps.registerPanel("image-effects",k(),"image-effects-panel",v):Confluence.Editor.ImageProps.registerPanel("image-effects",k("Image effects can\u0027t be applied to web images"),
"image-effects-panel",null)});AJS.bind("dialog-before-show.image-properties",function(){p();q(l(e(d)))})}function w(){var a=new AJS.Dialog({width:600,height:500,id:"image-effects-dialog"});a.addHeader("Add Image Effect");a.addPanel("",k(),"");p();a.addSubmit("Save",function(){r(x,y).done(function(){a.hide()})});a.addCancel("Close",function(){a.hide()});AJS.Confluence.PropertyPanel.Image.pluginButtons.push(null,
{create:function(c){d=c[0];c=l(c);var b=!n();return{className:"image-effects",text:"Effects...",tooltip:b?"Image effects can\u0027t be applied to web images":"Add an image effect like drop shadow or picture frame",click:function(){if(d.naturalHeight&&d.naturalWidth&&16E6<d.naturalHeight*d.naturalWidth)return alert("This image is too large to rotate or apply image effects. You\u0027ll need to upload a smaller version of the file."),!1;q(l(e(d)));AJS.Confluence.PropertyPanel.destroy();a.show()},disabled:b,selected:!!c}}})}function z(a,
c){var b=a.attr("src"),f=A.exec(b),h=c?"effects\x3d"+c:"";f?b=b.replace(f[2],h):c&&(b=b+(-1!=b.indexOf("?")?"\x26":"?")+h);a.attr("src",b);a.attr("data-mce-src",b);c=(c=a.attr("confluence-query-params"))?(f=t.exec(c))?c.replace(f[2],h):c+"\x26"+h:h;a.attr("confluence-query-params",c)}function l(a){a=a.attr("confluence-query-params");if(a=t.exec(a))return a[3]}function q(a){e(".image-effect-preview.selected").removeClass("selected");a?e(g).each(function(c,b){if(b.effects==a)return e(e(".image-effect-preview")[c]).addClass("selected"),
!1}):e(".image-effect-preview.image-effect-none").addClass("selected");m=a}function k(a){return a?'\x3cdiv class\x3d"aui-message aui-message-warning warning"\x3e\x3cspan class\x3d"aui-icon icon-warning"\x3e\x3c/span\x3e'+a+"\x3c/div\x3e":'\x3cdiv class\x3d"image-effects"\x3e\x3cul class\x3d"image-list"\x3e\x3c/ul\x3e\x3c/div\x3e'}function p(){for(var a=e("div.image-effects ul.image-list"),c=Math.floor(22*Math.random())+1,b=0;b<g.length;b++){var f=e('\x3cli class\x3d"attached-image image-effect-preview'+
(g[b].effects?"":" image-effect-none")+'"\x3e\x3cdiv class\x3d"image-container"\x3e\x3cimg class\x3d"thumbnail" src\x3d"'+AJS.contextPath()+"/plugins/servlet/imgFilter.png?preview\x3dtrue\x26id\x3d"+c+"\x26effects\x3d"+g[b].effects+'" title\x3d"'+g[b].name+'" style\x3d"margin-top: 5px"\x3e\x3c/div\x3e\x3cspan class\x3d"caption filename" title\x3d"'+g[b].name+'"\x3e'+g[b].name+"\x3c/span\x3e\x3c/li\x3e");f.hover(function(){e(this).addClass("hover")},function(){e(this).removeClass("hover")});a.append(f);
f.click(g[b],function(h){e(".image-effect-preview.selected").removeClass("selected");e(this).addClass("selected");m=h.data.effects})}}function n(){return!e(d).hasClass("confluence-external-resource")}function v(){return r()}function r(a,c){function b(){c&&c();f.resolve();d.onload=null;tinyMCE.activeEditor.undoManager.add()}var f=e.Deferred();a&&a();d.onload=b;a=d.src;z(e(d),m);d.src==a&&b();return f}function x(){var a=dialog.popup.element,c=650/60,b=e('\x3cdiv class\x3d"image-properties-loading-blanket"\x3e\x3cdiv class\x3d"loading-data"\x3e\x3c/div\x3e\x3c/div\x3e').appendTo(a.find(".dialog-page-body")),
f=b.find(".loading-data");b.css({width:b.parent().width(),height:a.height()});f.css({marginTop:-60,marginLeft:-60});f.spin({color:"#666",width:c,radius:25,length:25,top:0,left:0,zIndex:0,speed:1.042})}function y(){var a=dialog.popup.element.find(".image-properties-loading-blanket .loading-data");a.css({marginTop:"",marginLeft:""});a.spinStop();a.closest(".image-properties-loading-blanket").remove()}var d,A=/(\?|&)(effects=[^&]+)($|&)/,t=/(^|&)(effects=([^&]+))($|&)/,m=null,g=[];g.push({name:"None",
effects:null});g.push({name:"Taped",effects:"border-simple,blur-border,tape"});g.push({name:"Instant Camera",effects:"border-polaroid,blur-border"});g.push({name:"Curl Shadow",effects:"border-simple,shadow-kn"});g.push({name:"Snapshot",effects:"border-simple,blur-border"});g.push({name:"Drop Shadow",effects:"drop-shadow"});Confluence.Editor.ImageProps?
u():w()});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.atlassian.confluence.plugins.confluence-browser-metrics:editor', location = '/js/editor.js' */
require(["internal/browser-metrics","jquery"],function(a,e){e(function(){var c=AJS.Meta.get("content-type"),d=AJS.Meta.getBoolean("new-page")?"create":"edit",f=e("body");if((f.hasClass("edit")||f.hasClass("create"))&&c&&d)if(AJS.Meta.getBoolean("collaborative-content")){var b="confluence."+c+"."+d+".collaborative.view";a.start({key:b,isInitial:!0});AJS.bind("rte-collab-ready",function(){a.end({key:b});a.start({key:b+".connected"})});AJS.bind("synchrony.connected",function(){a.end({key:b+".connected"})})}else AJS.Meta.getBoolean("collaborative-content")||
a.start({key:"confluence."+c+"."+d+".view",ready:".active-richtext",isInitial:!0})})});
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'nl.avisi.confluence.plugins.numberedheadings:nh-editor-events', location = 'js/nh-editor-events.js' */
/*
 * Copyright (c) 2022 Appfire Technologies, LLC.
 * All rights reserved.
 *
 * This software is licensed under the provisions of the "Appfire EULA"
 * (https://appfire.com/eula/) as well as under the provisions of
 * the "Standard EULA" from the "Atlassian Marketplace Terms of Use" as a "Marketplace Product"
 * (http://www.atlassian.com/licensing/marketplace/termsofuse).
 *
 * See the LICENSE file for more details.
 */

(function () {
  const AJS = require('ajs')
  const tinymce = require('tinymce')

  AJS.toInit(function ($) {
    function onEdit () {
      sendEvent('edit')
    }

    function onSave () {
      sendEvent('save')
    }

    function onCancel () {
      sendEvent('cancel')
    }

    AJS.bind('show.dialog', function (e, d) {
      if (d.dialog.id === 'macro-browser-dialog') {
        onEdit()
        $('#macro-details-page button.ok').on('click', onSave)
        $('#macro-details-page a.button-panel-cancel-link').on('click', onCancel)
      }
    })

    AJS.bind('hide.dialog', function (e, d) {
      if (d.dialog.id === 'macro-browser-dialog') {
        $('#macro-details-page button.ok').off('click', onSave)
        $('#macro-details-page a.button-panel-cancel-link').off('click', onCancel)
      }
    })
  })

  function sendEvent (action) {
    const macro = AJS.MacroBrowser.selectedMacroDefinition
    if (macro && macro.name === 'numberedheadings') {
      const macroId = AJS.$(tinymce.confluence.macrobrowser.getCurrentNode()).attr('data-macro-id')

      let url = AJS.contextPath() + '/rest/numberedheadings/1.0/event/macro-edit/' + AJS.params.pageId + '/' + macro.name + '/' + action + '?'
      url += 'isNew=' + !macroId
      if (macroId) { url += '&macroId=' + macroId }
      AJS.$.ajax({
        url: url,
        type: 'POST',
        data: JSON.stringify(macro.params),
        contentType: 'application/json; charset=utf-8',
        traditional: true,
        error: function (jqXHR) {
          AJS.log(jqXHR.responseText)
        }
      })
    }
  }
})()

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'nl.avisi.confluence.plugins.numberedheadings:split_vendors~nh-tinymce-plugin', location = 'vendors~nh-tinymce-plugin.a6927bcd8867e0faefe0.js' */
(window.atlassianWebpackJsonp981e0f4effab173567f2d6cf31d7b23b=window.atlassianWebpackJsonp981e0f4effab173567f2d6cf31d7b23b||[]).push([[13],[,,,function(e,t,o){var r=o(33),n="object"==typeof self&&self&&self.Object===Object&&self,a=r||n||Function("return this")();e.exports=a},,function(e,t,o){var r=o(73),n=o(79);e.exports=function(e,t){var o=n(e,t);return r(o)?o:void 0}},,function(e){e.exports=function(e){return null!=e&&"object"==typeof e}},,function(e){e.exports=function(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}},function(e,t,o){function r(e){var t=-1,o=null==e?0:e.length;for(this.clear();++t<o;){var r=e[t];this.set(r[0],r[1])}}var n=o(63),a=o(64),p=o(65),s=o(66),c=o(67);r.prototype.clear=n,r.prototype["delete"]=a,r.prototype.get=p,r.prototype.has=s,r.prototype.set=c,e.exports=r},function(e,t,o){var r=o(19);e.exports=function(e,t){for(var o=e.length;o--;)if(r(e[o][0],t))return o;return-1}},function(e,t,o){function r(e){return null==e?void 0===e?c:s:l&&l in Object(e)?a(e):p(e)}var n=o(13),a=o(75),p=o(76),s="[object Null]",c="[object Undefined]",l=n?n.toStringTag:void 0;e.exports=r},function(e,t,o){var r=o(3),n=r.Symbol;e.exports=n},function(e,t,o){var r=o(5),n=r(Object,"create");e.exports=n},function(e,t,o){var r=o(88);e.exports=function(e,t){var o=e.__data__;return r(t)?o["string"==typeof t?"string":"hash"]:o.map}},function(e){var t=Array.isArray;e.exports=t},function(e,t,o){var r=o(110),n=o(20),a=o(111),p=o(112),s=o(113),c=o(12),l=o(34),i="[object Map]",y="[object Promise]",d="[object Set]",x="[object WeakMap]",b="[object DataView]",h=l(r),u=l(n),g=l(a),_=l(p),f=l(s),j=c;(r&&j(new r(new ArrayBuffer(1)))!=b||n&&j(new n)!=i||a&&j(a.resolve())!=y||p&&j(new p)!=d||s&&j(new s)!=x)&&(j=function(e){var t=c(e),o=t=="[object Object]"?e.constructor:void 0,r=o?l(o):"";if(r)switch(r){case h:return b;case u:return i;case g:return y;case _:return d;case f:return x;}return t}),e.exports=j},function(e,t,o){var r=o(47),n=o(48);e.exports=function(e,t,o,a){var p=!o;o||(o={});for(var s=-1,c=t.length;++s<c;){var l=t[s],i=a?a(o[l],e[l],l,o,e):void 0;i===void 0&&(i=e[l]),p?n(o,l,i):r(o,l,i)}return o}},function(e){e.exports=function(e,t){return e===t||e!==e&&t!==t}},function(e,t,o){var r=o(5),n=o(3),a=r(n,"Map");e.exports=a},function(e,t,o){var r=o(101),n=o(41),a=Object.prototype,p=a.propertyIsEnumerable,s=Object.getOwnPropertySymbols,c=s?function(e){return null==e?[]:(e=Object(e),r(s(e),function(t){return p.call(e,t)}))}:n;e.exports=c},function(e,t,o){var r=o(42),n=o(108),a=o(46);e.exports=function(e){return a(e)?r(e):n(e)}},function(e,t,o){(function(e){var r=o(3),n=o(105),a=t&&!t.nodeType&&t,p=a&&"object"==typeof e&&e&&!e.nodeType&&e,s=p&&p.exports===a,c=s?r.Buffer:void 0,l=c?c.isBuffer:void 0;e.exports=l||n}).call(this,o(24)(e))},function(e){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],!e.children&&(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e}},function(e){e.exports=function(e){return function(t){return e(t)}}},function(e,t,o){(function(e){var r=o(33),n=t&&!t.nodeType&&t,a=n&&"object"==typeof e&&e&&!e.nodeType&&e,p=a&&a.exports===n,s=p&&r.process,c=function(){try{var e=a&&a.require&&a.require("util").types;return e?e:s&&s.binding&&s.binding("util")}catch(t){}}();e.exports=c}).call(this,o(24)(e))},function(e){var t=Object.prototype;e.exports=function(e){var o=e&&e.constructor,r="function"==typeof o&&o.prototype||t;return e===r}},function(e,t,o){var r=o(42),n=o(119),a=o(46);e.exports=function(e){return a(e)?r(e,!0):n(e)}},function(e,t,o){var r=o(37);e.exports=function(e){var t=new e.constructor(e.byteLength);return new r(t).set(new r(e)),t}},function(e,t,o){e.exports=o(60)},function(e,t,o){function r(e){var t=this.__data__=new n(e);this.size=t.size}var n=o(10),a=o(68),p=o(69),s=o(70),c=o(71),l=o(72);r.prototype.clear=a,r.prototype["delete"]=p,r.prototype.get=s,r.prototype.has=c,r.prototype.set=l,e.exports=r},function(e,t,o){var r=o(12),n=o(9);e.exports=function(e){if(!n(e))return!1;var t=r(e);return t=="[object Function]"||t=="[object GeneratorFunction]"||t=="[object AsyncFunction]"||t=="[object Proxy]"}},function(e,t,o){(function(t){var o="object"==typeof t&&t&&t.Object===Object&&t;e.exports=o}).call(this,o(74))},function(e){var t=Function.prototype,o=t.toString;e.exports=function(e){if(null!=e){try{return o.call(e)}catch(t){}try{return e+""}catch(t){}}return""}},function(e,t,o){function r(e){var t=-1,o=null==e?0:e.length;for(this.clear();++t<o;){var r=e[t];this.set(r[0],r[1])}}var n=o(80),a=o(87),p=o(89),s=o(90),c=o(91);r.prototype.clear=n,r.prototype["delete"]=a,r.prototype.get=p,r.prototype.has=s,r.prototype.set=c,e.exports=r},function(e,t,o){var r=o(92),n=o(95),a=o(96);e.exports=function(e,t,o,p,s,c){var l=o&1,i=e.length,y=t.length;if(i!=y&&!(l&&y>i))return!1;var d=c.get(e),x=c.get(t);if(d&&x)return d==t&&x==e;var b=-1,h=!0,u=o&2?new r:void 0;for(c.set(e,t),c.set(t,e);++b<i;){var g=e[b],_=t[b];if(p)var f=l?p(_,g,b,t,e,c):p(g,_,b,e,t,c);if(void 0!==f){if(f)continue;h=!1;break}if(u){if(!n(t,function(e,t){if(!a(u,t)&&(g===e||s(g,e,o,p,c)))return u.push(t)})){h=!1;break}}else if(!(g===_||s(g,_,o,p,c))){h=!1;break}}return c["delete"](e),c["delete"](t),h}},function(e,t,o){var r=o(3),n=r.Uint8Array;e.exports=n},function(e,t,o){var r=o(39),n=o(21),a=o(22);e.exports=function(e){return r(e,a,n)}},function(e,t,o){var r=o(40),n=o(16);e.exports=function(e,t,o){var a=t(e);return n(e)?a:r(a,o(e))}},function(e){e.exports=function(e,t){for(var o=-1,r=t.length,n=e.length;++o<r;)e[n+o]=t[o];return e}},function(e){e.exports=function(){return[]}},function(e,t,o){var r=o(102),n=o(103),a=o(16),p=o(23),s=o(106),c=o(43),l=Object.prototype,i=l.hasOwnProperty;e.exports=function(e,t){var o=a(e),l=!o&&n(e),y=!o&&!l&&p(e),d=!o&&!l&&!y&&c(e),x=o||l||y||d,b=x?r(e.length,String):[],h=b.length;for(var u in e)(t||i.call(e,u))&&!(x&&("length"==u||y&&("offset"==u||"parent"==u)||d&&("buffer"==u||"byteLength"==u||"byteOffset"==u)||s(u,h)))&&b.push(u);return b}},function(e,t,o){var r=o(107),n=o(25),a=o(26),p=a&&a.isTypedArray,s=p?n(p):r;e.exports=s},function(e){e.exports=function(e){return"number"==typeof e&&-1<e&&0==e%1&&e<=9007199254740991}},function(e){e.exports=function(e,t){return function(o){return e(t(o))}}},function(e,t,o){var r=o(32),n=o(44);e.exports=function(e){return null!=e&&n(e.length)&&!r(e)}},function(e,t,o){function r(e,t,o){var r=e[t];s.call(e,t)&&a(r,o)&&(o!==void 0||t in e)||n(e,t,o)}var n=o(48),a=o(19),p=Object.prototype,s=p.hasOwnProperty;e.exports=r},function(e,t,o){var r=o(116);e.exports=function(e,t,o){"__proto__"==t&&r?r(e,t,{configurable:!0,enumerable:!0,value:o,writable:!0}):e[t]=o}},function(e,t,o){var r=o(40),n=o(50),a=o(21),p=o(41),s=Object.getOwnPropertySymbols,c=s?function(e){for(var t=[];e;)r(t,a(e)),e=n(e);return t}:p;e.exports=c},function(e,t,o){var r=o(45),n=r(Object.getPrototypeOf,Object);e.exports=n},,function(e){function t(e,t,o,r,n,a,p){try{var s=e[a](p),c=s.value}catch(e){return void o(e)}s.done?t(c):Promise.resolve(c).then(r,n)}e.exports=function(e){return function(){var o=this,r=arguments;return new Promise(function(n,a){function p(e){t(c,n,a,p,s,"next",e)}function s(e){t(c,n,a,p,s,"throw",e)}var c=e.apply(o,r);p(void 0)})}}},function(e,t,o){var r=o(61);e.exports=function(e,t){return r(e,t)}},function(e,t,o){var r=o(114);e.exports=function(e){return r(e,1|4)}},function(e){"use strict";function t(e){return"function"==typeof e?e():e}function o(){var e={};return e.promise=new Promise(function(t,o){e.resolve=t,e.reject=o}),e}e.exports=function(e){function r(){var t=s;clearTimeout(c),Promise.resolve(a.accumulate?e.call(this,l):e.apply(this,l[l.length-1])).then(t.resolve,t.reject),l=[],s=null}var n=1<arguments.length&&arguments[1]!==void 0?arguments[1]:0,a=2<arguments.length&&arguments[2]!==void 0?arguments[2]:{},p=void 0,s=void 0,c=void 0,l=[];return function(){var i=t(n),y=new Date().getTime(),d=!p||y-p>i;p=y;for(var x=arguments.length,b=Array(x),h=0;h<x;h++)b[h]=arguments[h];if(d&&a.leading)return a.accumulate?Promise.resolve(e.call(this,[b])).then(function(e){return e[0]}):Promise.resolve(e.call.apply(e,[this].concat(b)));if(s?clearTimeout(c):s=o(),l.push(b),c=setTimeout(r.bind(this),i),a.accumulate){var u=l.length-1;return s.promise.then(function(e){return e[u]})}return s.promise}}},,,,,function(e){var t=function(e){"use strict";function t(e,t,o,n){var a=t&&t.prototype instanceof r?t:r,p=Object.create(a.prototype),s=new d(n||[]);return p._invoke=c(e,o,s),p}function o(e,t,o){try{return{type:"normal",arg:e.call(t,o)}}catch(e){return{type:"throw",arg:e}}}function r(){}function n(){}function a(){}function p(e){["next","throw","return"].forEach(function(t){e[t]=function(e){return this._invoke(t,e)}})}function s(e){function t(r,n,a,p){var s=o(e[r],e,n);if("throw"===s.type)p(s.arg);else{var c=s.arg,l=c.value;return l&&"object"==typeof l&&u.call(l,"__await")?Promise.resolve(l.__await).then(function(e){t("next",e,a,p)},function(e){t("throw",e,a,p)}):Promise.resolve(l).then(function(e){c.value=e,a(c)},function(e){return t("throw",e,a,p)})}}function r(e,o){function r(){return new Promise(function(r,n){t(e,o,r,n)})}return n=n?n.then(r,r):r()}var n;this._invoke=r}function c(e,t,r){var n=m;return function(a,p){if(n===A)throw new Error("Generator is already running");if(n===S){if("throw"===a)throw p;return b()}for(r.method=a,r.arg=p;;){var s=r.delegate;if(s){var c=l(s,r);if(c){if(c===v)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===m)throw n=S,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=A;var i=o(e,t,r);if("normal"===i.type){if(n=r.done?S:w,i.arg===v)continue;return{value:i.arg,done:r.done}}"throw"===i.type&&(n=S,r.method="throw",r.arg=i.arg)}}}function l(e,t){var r=e.iterator[t.method];if(void 0===r){if(t.delegate=null,"throw"===t.method){if(e.iterator["return"]&&(t.method="return",t.arg=void 0,l(e,t),"throw"===t.method))return v;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var n=o(r,e.iterator,t.arg);if("throw"===n.type)return t.method="throw",t.arg=n.arg,t.delegate=null,v;var a=n.arg;if(!a)return t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,v;if(a.done)t[e.resultName]=a.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0);else return a;return t.delegate=null,v}function i(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function y(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function d(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(i,this),this.reset(!0)}function x(e){if(e){var t=e[_];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,r=function t(){for(;++o<e.length;)if(u.call(e,o))return t.value=e[o],t.done=!1,t;return t.value=void 0,t.done=!0,t};return r.next=r}}return{next:b}}function b(){return{value:void 0,done:!0}}var h=Object.prototype,u=h.hasOwnProperty,g="function"==typeof Symbol?Symbol:{},_=g.iterator||"@@iterator",f=g.asyncIterator||"@@asyncIterator",j=g.toStringTag||"@@toStringTag";e.wrap=t;var m="suspendedStart",w="suspendedYield",A="executing",S="completed",v={},k={};k[_]=function(){return this};var L=Object.getPrototypeOf,O=L&&L(L(x([])));O&&O!==h&&u.call(O,_)&&(k=O);var E=a.prototype=r.prototype=Object.create(k);return n.prototype=E.constructor=a,a.constructor=n,a[j]=n.displayName="GeneratorFunction",e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===n||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,a):(e.__proto__=a,!(j in e)&&(e[j]="GeneratorFunction")),e.prototype=Object.create(E),e},e.awrap=function(e){return{__await:e}},p(s.prototype),s.prototype[f]=function(){return this},e.AsyncIterator=s,e.async=function(o,r,n,a){var p=new s(t(o,r,n,a));return e.isGeneratorFunction(r)?p:p.next().then(function(e){return e.done?e.value:p.next()})},p(E),E[j]="Generator",E[_]=function(){return this},E.toString=function(){return"[object Generator]"},e.keys=function(e){var t=[];for(var o in e)t.push(o);return t.reverse(),function o(){for(;t.length;){var r=t.pop();if(r in e)return o.value=r,o.done=!1,o}return o.done=!0,o}},e.values=x,d.prototype={constructor:d,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(y),!e)for(var t in this)"t"===t.charAt(0)&&u.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0],t=e.completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){function t(t,r){return a.type="throw",a.arg=e,o.next=t,r&&(o.method="next",o.arg=void 0),!!r}if(this.done)throw e;for(var o=this,r=this.tryEntries.length-1;0<=r;--r){var n=this.tryEntries[r],a=n.completion;if("root"===n.tryLoc)return t("end");if(n.tryLoc<=this.prev){var p=u.call(n,"catchLoc"),s=u.call(n,"finallyLoc");if(p&&s){if(this.prev<n.catchLoc)return t(n.catchLoc,!0);if(this.prev<n.finallyLoc)return t(n.finallyLoc)}else if(p){if(this.prev<n.catchLoc)return t(n.catchLoc,!0);}else if(!s)throw new Error("try statement without catch or finally");else if(this.prev<n.finallyLoc)return t(n.finallyLoc)}}},abrupt:function(e,t){for(var o,r=this.tryEntries.length-1;0<=r;--r)if(o=this.tryEntries[r],o.tryLoc<=this.prev&&u.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var n=o;break}n&&("break"===e||"continue"===e)&&n.tryLoc<=t&&t<=n.finallyLoc&&(n=null);var a=n?n.completion:{};return a.type=e,a.arg=t,n?(this.method="next",this.next=n.finallyLoc,v):this.complete(a)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),v},finish:function(e){for(var t,o=this.tryEntries.length-1;0<=o;--o)if(t=this.tryEntries[o],t.finallyLoc===e)return this.complete(t.completion,t.afterLoc),y(t),v},catch:function(e){for(var t,o=this.tryEntries.length-1;0<=o;--o)if(t=this.tryEntries[o],t.tryLoc===e){var r=t.completion;if("throw"===r.type){var n=r.arg;y(t)}return n}throw new Error("illegal catch attempt")},delegateYield:function(e,t,o){return this.delegate={iterator:x(e),resultName:t,nextLoc:o},"next"===this.method&&(this.arg=void 0),v}},e}(e.exports);try{regeneratorRuntime=t}catch(e){Function("r","regeneratorRuntime = r")(t)}},function(e,t,o){function r(e,t,o,p,s){return!(e!==t)||(null!=e&&null!=t&&(a(e)||a(t))?n(e,t,o,p,r,s):e!==e&&t!==t)}var n=o(62),a=o(7);e.exports=r},function(e,t,o){var r=o(31),n=o(36),a=o(97),p=o(100),s=o(17),c=o(16),l=o(23),i=o(43),y="[object Arguments]",d="[object Array]",x="[object Object]",b=Object.prototype,h=b.hasOwnProperty;e.exports=function(e,t,o,b,u,g){var _=c(e),f=c(t),j=_?d:s(e),m=f?d:s(t);j=j==y?x:j,m=m==y?x:m;var w=j==x,A=m==x,S=j==m;if(S&&l(e)){if(!l(t))return!1;_=!0,w=!1}if(S&&!w)return g||(g=new r),_||i(e)?n(e,t,o,b,u,g):a(e,t,j,o,b,u,g);if(!(o&1)){var v=w&&h.call(e,"__wrapped__"),k=A&&h.call(t,"__wrapped__");if(v||k){var L=v?e.value():e,O=k?t.value():t;return g||(g=new r),u(L,O,o,b,g)}}return!!S&&(g||(g=new r),p(e,t,o,b,u,g))}},function(e){e.exports=function(){this.__data__=[],this.size=0}},function(e,t,o){var r=o(11),n=Array.prototype,a=n.splice;e.exports=function(e){var t=this.__data__,o=r(t,e);if(0>o)return!1;var n=t.length-1;return o==n?t.pop():a.call(t,o,1),--this.size,!0}},function(e,t,o){var r=o(11);e.exports=function(e){var t=this.__data__,o=r(t,e);return 0>o?void 0:t[o][1]}},function(e,t,o){var r=o(11);e.exports=function(e){return-1<r(this.__data__,e)}},function(e,t,o){var r=o(11);e.exports=function(e,t){var o=this.__data__,n=r(o,e);return 0>n?(++this.size,o.push([e,t])):o[n][1]=t,this}},function(e,t,o){var r=o(10);e.exports=function(){this.__data__=new r,this.size=0}},function(e){e.exports=function(e){var t=this.__data__,o=t["delete"](e);return this.size=t.size,o}},function(e){e.exports=function(e){return this.__data__.get(e)}},function(e){e.exports=function(e){return this.__data__.has(e)}},function(e,t,o){var r=o(10),n=o(20),a=o(35);e.exports=function(e,t){var o=this.__data__;if(o instanceof r){var p=o.__data__;if(!n||p.length<200-1)return p.push([e,t]),this.size=++o.size,this;o=this.__data__=new a(p)}return o.set(e,t),this.size=o.size,this}},function(e,t,o){var r=o(32),n=o(77),a=o(9),p=o(34),s=/[\\^$.*+?()[\]{}|]/g,c=/^\[object .+?Constructor\]$/,l=Function.prototype,i=Object.prototype,y=l.toString,d=i.hasOwnProperty,x=RegExp("^"+y.call(d).replace(s,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");e.exports=function(e){if(!a(e)||n(e))return!1;var t=r(e)?x:c;return t.test(p(e))}},function(e){var t=function(){return this}();try{t=t||new Function("return this")()}catch(o){"object"==typeof window&&(t=window)}e.exports=t},function(e,t,o){var r=o(13),n=Object.prototype,a=n.hasOwnProperty,p=n.toString,s=r?r.toStringTag:void 0;e.exports=function(e){var t=a.call(e,s),o=e[s];try{e[s]=void 0}catch(t){}var r=p.call(e);return t?e[s]=o:delete e[s],r}},function(e){var t=Object.prototype,o=t.toString;e.exports=function(e){return o.call(e)}},function(e,t,o){function r(e){return!!a&&a in e}var n=o(78),a=function(){var e=/[^.]+$/.exec(n&&n.keys&&n.keys.IE_PROTO||"");return e?"Symbol(src)_1."+e:""}();e.exports=r},function(e,t,o){var r=o(3),n=r["__core-js_shared__"];e.exports=n},function(e){e.exports=function(e,t){return null==e?void 0:e[t]}},function(e,t,o){var r=o(81),n=o(10),a=o(20);e.exports=function(){this.size=0,this.__data__={hash:new r,map:new(a||n),string:new r}}},function(e,t,o){function r(e){var t=-1,o=null==e?0:e.length;for(this.clear();++t<o;){var r=e[t];this.set(r[0],r[1])}}var n=o(82),a=o(83),p=o(84),s=o(85),c=o(86);r.prototype.clear=n,r.prototype["delete"]=a,r.prototype.get=p,r.prototype.has=s,r.prototype.set=c,e.exports=r},function(e,t,o){var r=o(14);e.exports=function(){this.__data__=r?r(null):{},this.size=0}},function(e){e.exports=function(e){var t=this.has(e)&&delete this.__data__[e];return this.size-=t?1:0,t}},function(e,t,o){var r=o(14),n=Object.prototype,a=n.hasOwnProperty;e.exports=function(e){var t=this.__data__;if(r){var o=t[e];return o==="__lodash_hash_undefined__"?void 0:o}return a.call(t,e)?t[e]:void 0}},function(e,t,o){var r=o(14),n=Object.prototype,a=n.hasOwnProperty;e.exports=function(e){var t=this.__data__;return r?t[e]!==void 0:a.call(t,e)}},function(e,t,o){var r=o(14);e.exports=function(e,t){var o=this.__data__;return this.size+=this.has(e)?0:1,o[e]=r&&void 0===t?"__lodash_hash_undefined__":t,this}},function(e,t,o){var r=o(15);e.exports=function(e){var t=r(this,e)["delete"](e);return this.size-=t?1:0,t}},function(e){e.exports=function(e){var t=typeof e;return"string"==t||"number"==t||"symbol"==t||"boolean"==t?"__proto__"!==e:null===e}},function(e,t,o){var r=o(15);e.exports=function(e){return r(this,e).get(e)}},function(e,t,o){var r=o(15);e.exports=function(e){return r(this,e).has(e)}},function(e,t,o){var r=o(15);e.exports=function(e,t){var o=r(this,e),n=o.size;return o.set(e,t),this.size+=o.size==n?0:1,this}},function(e,t,o){function r(e){var t=-1,o=null==e?0:e.length;for(this.__data__=new n;++t<o;)this.add(e[t])}var n=o(35),a=o(93),p=o(94);r.prototype.add=r.prototype.push=a,r.prototype.has=p,e.exports=r},function(e){e.exports=function(e){return this.__data__.set(e,"__lodash_hash_undefined__"),this}},function(e){e.exports=function(e){return this.__data__.has(e)}},function(e){e.exports=function(e,t){for(var o=-1,r=null==e?0:e.length;++o<r;)if(t(e[o],o,e))return!0;return!1}},function(e){e.exports=function(e,t){return e.has(t)}},function(e,t,o){var r=o(13),n=o(37),a=o(19),p=o(36),s=o(98),c=o(99),l=r?r.prototype:void 0,i=l?l.valueOf:void 0;e.exports=function(e,t,o,r,l,y,d){switch(o){case"[object DataView]":if(e.byteLength!=t.byteLength||e.byteOffset!=t.byteOffset)return!1;e=e.buffer,t=t.buffer;case"[object ArrayBuffer]":return!!(e.byteLength==t.byteLength&&y(new n(e),new n(t)));case"[object Boolean]":case"[object Date]":case"[object Number]":return a(+e,+t);case"[object Error]":return e.name==t.name&&e.message==t.message;case"[object RegExp]":case"[object String]":return e==t+"";case"[object Map]":var x=s;case"[object Set]":var b=r&1;if(x||(x=c),e.size!=t.size&&!b)return!1;var h=d.get(e);if(h)return h==t;r|=2,d.set(e,t);var u=p(x(e),x(t),r,l,y,d);return d["delete"](e),u;case"[object Symbol]":if(i)return i.call(e)==i.call(t);}return!1}},function(e){e.exports=function(e){var t=-1,o=Array(e.size);return e.forEach(function(e,r){o[++t]=[r,e]}),o}},function(e){e.exports=function(e){var t=-1,o=Array(e.size);return e.forEach(function(e){o[++t]=e}),o}},function(e,t,o){function r(e,t,o,r,p,c){var l=o&a,i=n(e),y=i.length,d=n(t),x=d.length;if(y!=x&&!l)return!1;for(var b,h=y;h--;)if(b=i[h],l?!(b in t):!s.call(t,b))return!1;var u=c.get(e),g=c.get(t);if(u&&g)return u==t&&g==e;var _=!0;c.set(e,t),c.set(t,e);for(var f=l;++h<y;){b=i[h];var j=e[b],m=t[b];if(r)var w=l?r(m,j,b,t,e,c):r(j,m,b,e,t,c);if(void 0===w?!(j===m||p(j,m,o,r,c)):!w){_=!1;break}f||(f="constructor"==b)}if(_&&!f){var A=e.constructor,S=t.constructor;A!=S&&"constructor"in e&&"constructor"in t&&!("function"==typeof A&&A instanceof A&&"function"==typeof S&&S instanceof S)&&(_=!1)}return c["delete"](e),c["delete"](t),_}var n=o(38),a=1,p=Object.prototype,s=p.hasOwnProperty;e.exports=r},function(e){e.exports=function(e,t){for(var o=-1,r=null==e?0:e.length,n=0,a=[];++o<r;){var p=e[o];t(p,o,e)&&(a[n++]=p)}return a}},function(e){e.exports=function(e,t){for(var o=-1,r=Array(e);++o<e;)r[o]=t(o);return r}},function(e,t,o){var r=o(104),n=o(7),a=Object.prototype,p=a.hasOwnProperty,s=a.propertyIsEnumerable,c=r(function(){return arguments}())?r:function(e){return n(e)&&p.call(e,"callee")&&!s.call(e,"callee")};e.exports=c},function(e,t,o){var r=o(12),n=o(7);e.exports=function(e){return n(e)&&r(e)=="[object Arguments]"}},function(e){e.exports=function(){return!1}},function(e){var t=/^(?:0|[1-9]\d*)$/;e.exports=function(e,o){var r=typeof e;return o=null==o?9007199254740991:o,!!o&&("number"==r||"symbol"!=r&&t.test(e))&&-1<e&&0==e%1&&e<o}},function(e,t,o){var r=o(12),n=o(44),a=o(7),p={};p["[object Float32Array]"]=p["[object Float64Array]"]=p["[object Int8Array]"]=p["[object Int16Array]"]=p["[object Int32Array]"]=p["[object Uint8Array]"]=p["[object Uint8ClampedArray]"]=p["[object Uint16Array]"]=p["[object Uint32Array]"]=!0,p["[object Arguments]"]=p["[object Array]"]=p["[object ArrayBuffer]"]=p["[object Boolean]"]=p["[object DataView]"]=p["[object Date]"]=p["[object Error]"]=p["[object Function]"]=p["[object Map]"]=p["[object Number]"]=p["[object Object]"]=p["[object RegExp]"]=p["[object Set]"]=p["[object String]"]=p["[object WeakMap]"]=!1,e.exports=function(e){return a(e)&&n(e.length)&&!!p[r(e)]}},function(e,t,o){var r=o(27),n=o(109),a=Object.prototype,p=a.hasOwnProperty;e.exports=function(e){if(!r(e))return n(e);var t=[];for(var o in Object(e))p.call(e,o)&&"constructor"!=o&&t.push(o);return t}},function(e,t,o){var r=o(45),n=r(Object.keys,Object);e.exports=n},function(e,t,o){var r=o(5),n=o(3),a=r(n,"DataView");e.exports=a},function(e,t,o){var r=o(5),n=o(3),a=r(n,"Promise");e.exports=a},function(e,t,o){var r=o(5),n=o(3),a=r(n,"Set");e.exports=a},function(e,t,o){var r=o(5),n=o(3),a=r(n,"WeakMap");e.exports=a},function(e,t,o){function r(e,t,o,F,U,M){var B,D=t&k,G=t&L;if(o&&(B=U?o(e,F,U,M):o(e)),void 0!==B)return B;if(!w(e))return e;var N=f(e);if(!N){var R=h(e),V=R==P||R==T;if(j(e))return l(e,D);if(R!=z&&R!=E&&(!V||U)){if(!I[R])return U?e:{};B=g(e,R,D)}else if(B=G||V?{}:_(e),!D)return G?d(e,c(B,e)):y(e,s(B,e))}else if(B=u(e),!D)return i(e,B);M||(M=new n);var W=M.get(e);if(W)return W;M.set(e,B),A(e)?e.forEach(function(n){B.add(r(n,t,o,n,e,M))}):m(e)&&e.forEach(function(n,a){B.set(a,r(n,t,o,a,e,M))});var C=t&O?G?b:x:G?v:S,$=N?void 0:C(e);return a($||e,function(n,a){$&&(a=n,n=e[a]),p(B,a,r(n,t,o,a,e,M))}),B}var n=o(31),a=o(115),p=o(47),s=o(117),c=o(118),l=o(121),i=o(122),y=o(123),d=o(124),x=o(38),b=o(125),h=o(17),u=o(126),g=o(127),_=o(132),f=o(16),j=o(23),m=o(134),w=o(9),A=o(136),S=o(22),v=o(28),k=1,L=2,O=4,E="[object Arguments]",P="[object Function]",T="[object GeneratorFunction]",z="[object Object]",I={};I[E]=I["[object Array]"]=I["[object ArrayBuffer]"]=I["[object DataView]"]=I["[object Boolean]"]=I["[object Date]"]=I["[object Float32Array]"]=I["[object Float64Array]"]=I["[object Int8Array]"]=I["[object Int16Array]"]=I["[object Int32Array]"]=I["[object Map]"]=I["[object Number]"]=I[z]=I["[object RegExp]"]=I["[object Set]"]=I["[object String]"]=I["[object Symbol]"]=I["[object Uint8Array]"]=I["[object Uint8ClampedArray]"]=I["[object Uint16Array]"]=I["[object Uint32Array]"]=!0,I["[object Error]"]=I[P]=I["[object WeakMap]"]=!1,e.exports=r},function(e){e.exports=function(e,t){for(var o=-1,r=null==e?0:e.length;++o<r&&!(!1===t(e[o],o,e)););return e}},function(e,t,o){var r=o(5),n=function(){try{var e=r(Object,"defineProperty");return e({},"",{}),e}catch(t){}}();e.exports=n},function(e,t,o){var r=o(18),n=o(22);e.exports=function(e,t){return e&&r(t,n(t),e)}},function(e,t,o){var r=o(18),n=o(28);e.exports=function(e,t){return e&&r(t,n(t),e)}},function(e,t,o){var r=o(9),n=o(27),a=o(120),p=Object.prototype,s=p.hasOwnProperty;e.exports=function(e){if(!r(e))return a(e);var t=n(e),o=[];for(var p in e)("constructor"!=p||!t&&s.call(e,p))&&o.push(p);return o}},function(e){e.exports=function(e){var t=[];if(null!=e)for(var o in Object(e))t.push(o);return t}},function(e,t,o){(function(e){var r=o(3),n=t&&!t.nodeType&&t,a=n&&"object"==typeof e&&e&&!e.nodeType&&e,p=a&&a.exports===n,s=p?r.Buffer:void 0,c=s?s.allocUnsafe:void 0;e.exports=function(e,t){if(t)return e.slice();var o=e.length,r=c?c(o):new e.constructor(o);return e.copy(r),r}}).call(this,o(24)(e))},function(e){e.exports=function(e,t){var o=-1,r=e.length;for(t||(t=Array(r));++o<r;)t[o]=e[o];return t}},function(e,t,o){var r=o(18),n=o(21);e.exports=function(e,t){return r(e,n(e),t)}},function(e,t,o){var r=o(18),n=o(49);e.exports=function(e,t){return r(e,n(e),t)}},function(e,t,o){var r=o(39),n=o(49),a=o(28);e.exports=function(e){return r(e,a,n)}},function(e){var t=Object.prototype,o=t.hasOwnProperty;e.exports=function(e){var t=e.length,r=new e.constructor(t);return t&&"string"==typeof e[0]&&o.call(e,"index")&&(r.index=e.index,r.input=e.input),r}},function(e,t,o){var r=o(29),n=o(128),a=o(129),p=o(130),s=o(131);e.exports=function(e,t,o){var c=e.constructor;return t==="[object ArrayBuffer]"?r(e):t==="[object Boolean]"||t==="[object Date]"?new c(+e):t==="[object DataView]"?n(e,o):t==="[object Float32Array]"||t==="[object Float64Array]"||t==="[object Int8Array]"||t==="[object Int16Array]"||t==="[object Int32Array]"||t==="[object Uint8Array]"||t==="[object Uint8ClampedArray]"||t==="[object Uint16Array]"||t==="[object Uint32Array]"?s(e,o):t==="[object Map]"?new c:t==="[object Number]"||t==="[object String]"?new c(e):t==="[object RegExp]"?a(e):t==="[object Set]"?new c:t==="[object Symbol]"?p(e):void 0}},function(e,t,o){var r=o(29);e.exports=function(e,t){var o=t?r(e.buffer):e.buffer;return new e.constructor(o,e.byteOffset,e.byteLength)}},function(e){var t=/\w*$/;e.exports=function(e){var o=new e.constructor(e.source,t.exec(e));return o.lastIndex=e.lastIndex,o}},function(e,t,o){var r=o(13),n=r?r.prototype:void 0,a=n?n.valueOf:void 0;e.exports=function(e){return a?Object(a.call(e)):{}}},function(e,t,o){var r=o(29);e.exports=function(e,t){var o=t?r(e.buffer):e.buffer;return new e.constructor(o,e.byteOffset,e.length)}},function(e,t,o){var r=o(133),n=o(50),a=o(27);e.exports=function(e){return"function"!=typeof e.constructor||a(e)?{}:r(n(e))}},function(e,t,o){var r=o(9),n=Object.create,a=function(){function e(){}return function(t){if(!r(t))return{};if(n)return n(t);e.prototype=t;var o=new e;return e.prototype=void 0,o}}();e.exports=a},function(e,t,o){var r=o(135),n=o(25),a=o(26),p=a&&a.isMap,s=p?n(p):r;e.exports=s},function(e,t,o){var r=o(17),n=o(7);e.exports=function(e){return n(e)&&r(e)=="[object Map]"}},function(e,t,o){var r=o(137),n=o(25),a=o(26),p=a&&a.isSet,s=p?n(p):r;e.exports=s},function(e,t,o){var r=o(17),n=o(7);e.exports=function(e){return n(e)&&r(e)=="[object Set]"}}]]);
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'nl.avisi.confluence.plugins.numberedheadings:split_nh-config~nh-editor-events~nh-macro-browser-plugin~nh-space-tools~nh-tinymce-plugin', location = 'nh-config~nh-editor-events~nh-macro-browser-plugin~nh-space-tools~nh-tinymce-plugin.b4484b36a96394141796.js' */
(window.atlassianWebpackJsonp981e0f4effab173567f2d6cf31d7b23b=window.atlassianWebpackJsonp981e0f4effab173567f2d6cf31d7b23b||[]).push([[0],{2:function(a){a.exports=require("ajs")}}]);
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'nl.avisi.confluence.plugins.numberedheadings:split_nh-space-tools~nh-tinymce-plugin', location = 'nh-space-tools~nh-tinymce-plugin.af05d5ea9d8c520253d2.js' */
(window.atlassianWebpackJsonp981e0f4effab173567f2d6cf31d7b23b=window.atlassianWebpackJsonp981e0f4effab173567f2d6cf31d7b23b||[]).push([[2],[function(a){a.exports=require("jquery")},function(a){a.exports=WRM.format},,,function(a){a.exports=require("aui/flag")},,,,function(a){a.exports=WRM.contextPath}]]);
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'nl.avisi.confluence.plugins.numberedheadings:split_nh-editor-events~nh-tinymce-plugin', location = 'nh-editor-events~nh-tinymce-plugin.30b7e778482c400a3022.js' */
(window.atlassianWebpackJsonp981e0f4effab173567f2d6cf31d7b23b=window.atlassianWebpackJsonp981e0f4effab173567f2d6cf31d7b23b||[]).push([[1],{6:function(a){a.exports=require("tinymce")}}]);
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'nl.avisi.confluence.plugins.numberedheadings:split_nh-tinymce-plugin', location = 'nh-tinymce-plugin.6747ddc2c7336c199a3c.js' */
(window.atlassianWebpackJsonp981e0f4effab173567f2d6cf31d7b23b=window.atlassianWebpackJsonp981e0f4effab173567f2d6cf31d7b23b||[]).push([[7],{144:function(a,b,c){"use strict";function d(a){return a.toString().replace(/\//g,"")}function e(a,b){return"value=\"".concat(b,"\" ").concat(a===b?"selected":"")}function f(a){var b=a.numberFormatField,c=a.startingHeadingField,f=a.startingNumberField,g=a.skipHeadingField;return"<form class=\"aui\" id=\"nh-format-options-form\">\n    <div class=\"field-group\">\n        <label for=\"nh-numberFormatField\">".concat("Number format","</label>\n        <select class=\"select\" id=\"nh-numberFormatField\" name=\"numberFormatField\">\n            <option ").concat(e(b,"decimal"),">").concat("decimal","</option>\n            <option ").concat(e(b,"iso-2145"),">").concat("iso-2145","</option>\n            <option ").concat(e(b,"full-decimal"),">").concat("full-decimal","</option>\n            <option ").concat(e(b,"lower-latin"),">").concat("lower-latin","</option>\n            <option ").concat(e(b,"lower-roman"),">").concat("lower-roman","</option>\n            <option ").concat(e(b,"lower-greek"),">").concat("lower-greek","</option>\n            <option ").concat(e(b,"upper-latin"),">").concat("upper-latin","</option>\n            <option ").concat(e(b,"upper-roman"),">").concat("upper-roman","</option>\n            <option ").concat(e(b,"upper-greek"),">").concat("upper-greek","</option>\n            <option ").concat(e(b,"custom"),">").concat("custom","</option>\n        </select>\n    </div>\n    <div class=\"field-group\">\n        <label for=\"nh-startingNumberField\">").concat("Starting number","</label>\n        <input class=\"text full-width-field\" type=\"text\"\n               id=\"nh-startingNumberField\" name=\"startingNumberField\" value=\"").concat(f,"\"\n               data-aui-validation-when=\"aui-stop-typing\" pattern=\"").concat(d(P),"\"\n               data-aui-validation-pattern-msg=\"").concat("Starting number","\">\n    </div>\n    <div class=\"field-group\">\n        <label for=\"nh-startingHeadingField\">").concat("Starting heading","</label>\n        <select class=\"select\" id=\"nh-startingHeadingField\" name=\"startingHeadingField\">\n            <option ").concat(e(c,"H1"),">H1</option>\n            <option ").concat(e(c,"H2"),">H2</option>\n            <option ").concat(e(c,"H3"),">H3</option>\n            <option ").concat(e(c,"H4"),">H4</option>\n            <option ").concat(e(c,"H5"),">H5</option>\n            <option ").concat(e(c,"H6"),">H6</option>\n        </select>\n    </div>\n    <div class=\"field-group\">\n        <label for=\"nh-skipHeadingField\">").concat("Skip headings","</label>\n        <input class=\"text full-width-field\" type=\"text\"\n               id=\"nh-skipHeadingField\" name=\"skipHeadingField\" value=\"").concat(g,"\"\n               data-aui-validation-when=\"aui-stop-typing\" pattern=\"").concat(d(Q),"\"\n               data-aui-validation-pattern-msg=\"").concat("Should be comma separated: H3, H5","\">\n        <div class=\"description\">").concat("Comma separated: H3, H5","</div>\n    </div>\n    <div class=\"toolbar-trigger-dialog-hidden\" style=\"display:none;\">\n        <br>\n        <h4>").concat("Custom number format","</h4>\n        <p>").concat("Define custom formatting per heading. Note: empty options will not render anything.","&nbsp;\n            <a data-aui-trigger aria-controls=\"nh-trigger-formatting-options\" href=\"#nh-trigger-formatting-options\">").concat("Formatting options","</a>.\n        </p>\n        <aui-inline-dialog id=\"nh-trigger-formatting-options\" alignment=\"right middle\">\n            <div class=\"format-options-styling\">\n                <h2>").concat("Formatting options","</h2>\n                <ul>\n                    <li>decimal</li>\n                    <li>iso-2145</li>\n                    <li>full-decimal</li>\n                    <li>lower-latin</li>\n                    <li>lower-roman</li>\n                    <li>lower-greek</li>\n                    <li>upper-latin</li>\n                    <li>upper-roman</li>\n                    <li>upper-greek</li>\n                    <li>custom</li>\n                </ul>\n                <h2>").concat("Examples","</h2>\n                <h3>").concat("Heading 1","</h3>\n                <span class=\"toolbar-trigger-formatting-options-code\">\n                                <code>").concat("Chapter [h1.decimal]","</code>\n                            </span>\n                <p>").concat("Results in Chapter 1, Chapter 2, etc.","</p>\n                <h3>").concat("Heading 2","</h3>\n                <span class=\"toolbar-trigger-formatting-options-code\">\n                                <code>").concat("[h1.decimal].[h2.upper-latin]","</code>\n                            </span>\n                <p>").concat("Results in 1.A, 1.B, 2.A, 2.B, etc.","</p>\n            </div>\n        </aui-inline-dialog>\n\n        <div class=\"field-group\">\n            <label for=\"nh-customFormatFieldH1\">").concat("H1 format","</label>\n            <input class=\"text full-width-field\" type=\"text\"\n                   id=\"nh-customFormatFieldH1\" name=\"customFormatFieldH1\" value=\"").concat(a.customFormatFieldH1,"\">\n        </div>\n        <div class=\"field-group\">\n            <label for=\"nh-customFormatFieldH2\">").concat("H2 format","</label>\n            <input class=\"text full-width-field\" type=\"text\"\n                   id=\"nh-customFormatFieldH2\" name=\"customFormatFieldH2\" value=\"").concat(a.customFormatFieldH2,"\">\n        </div>\n        <div class=\"field-group\">\n            <label for=\"nh-customFormatFieldH3\">").concat("H3 format","</label>\n            <input class=\"text full-width-field\" type=\"text\"\n                   id=\"nh-customFormatFieldH3\" name=\"customFormatFieldH3\" value=\"").concat(a.customFormatFieldH3,"\">\n        </div>\n        <div class=\"field-group\">\n            <label for=\"nh-customFormatFieldH4\">").concat("H4 format","</label>\n            <input class=\"text full-width-field\" type=\"text\"\n                   id=\"nh-customFormatFieldH4\" name=\"customFormatFieldH4\" value=\"").concat(a.customFormatFieldH4,"\">\n        </div>\n        <div class=\"field-group\">\n            <label for=\"nh-customFormatFieldH5\">").concat("H5 format","</label>\n            <input class=\"text full-width-field\" type=\"text\"\n                   id=\"nh-customFormatFieldH5\" name=\"customFormatFieldH5\" value=\"").concat(a.customFormatFieldH5,"\">\n        </div>\n        <div class=\"field-group\">\n            <label for=\"nh-customFormatFieldH6\">").concat("H6 format","</label>\n            <input class=\"text full-width-field\" type=\"text\"\n                   id=\"nh-customFormatFieldH6\" name=\"customFormatFieldH6\" value=\"").concat(a.customFormatFieldH6,"\">\n        </div>\n    </div>\n</form>")}function g(a,b){var c={lastLevel:0,startAt:0,counts:[0,0,0,0,0,0]},d=b.startingHeadingField;c.startAt=void 0===d?0:d[1]-1;var e=b.startingNumberField;if(e!==void 0)for(var f,g=e.split(","),j=0;j<g.length;j++)f=parseInt(g[j],10),isNaN(f)||(c.counts[c.startAt+j]=f-1);G()(a).find("h1, h2, h3, h4, h5, h6").filter(function(b,c){var d=G()(c).parents("table[data-macro-name=numberedheadings]");return 0===d.size()||d.is(a)}).each(function(a,d){h(d.nodeName[1],b)?i(c,d,b):k(d)})}function h(a,b){var c=b.skipHeadingField;if(!c)return!0;a=parseInt(a,10);for(var d,e=c.split(","),f=0;f<e.length;f++)if(d=parseInt(G.a.trim(e[f])[1],10),d===a)return!1;return!0}function j(a,b){for(var c=b;6>c;c++)a.counts[c]=0}function i(a,b,c){var d=a.lastLevel,e=a.startAt,f=a.counts,g=c.numberFormatField||"decimal",k=Y[g],l=b.nodeName[1],m="";if(l>=e+1){d>l&&j(a,l),a.counts[l-1]++;for(var n=e;n<l;n++)h(n+1,c)&&n+1>d&&n+1<l&&(a.counts[n]=f[n]+1);if("custom"===g){for(var i=[],o=1;7>o;o++)i[o-1]=c["customFormatFieldH"+o]||"";m+=k.format(a,l,i)}else for(var p=e;p<l;p++)h(p+1,c)&&(m+=k.format(a,f[p]),(!k.shouldRenderSeparator||k.shouldRenderSeparator(p+1>=l))&&(m+="."));0<m.length&&(m+=" "),a.lastLevel=l}G()(b).attr("data-nh-numbering",m)}function k(a){G()(a).removeAttr("data-nh-numbering")}function l(a){G()(a).find("h1, h2, h3, h4, h5, h6").each(function(a,b){k(b)})}function m(a){var b=G()(a).attr("data-macro-parameters"),c={"number-format":"decimal"};if(b!==void 0)for(var d,e=n(b),f=0;f<e.length;f++)d=e[f].split("="),c[Z[d[0]]]=d[1];return c}function n(a){for(var b=o(a).split(/\|(?!\\)/),c=0;c<b.length;c++){b[c]=o(b[c]);var d=b[c].indexOf("\\|");d!==void 0&&(b[c]=b[c].substring(0,d)+b[c].substring(d+1,b[c].length))}return b}function o(a){return a.split("").reverse().join("")}function p(a){return new Promise(function(b){setTimeout(function(){return b()},a)})}function q(a){var b=G.a.get(_()()+"/rest/numberedheadings/1.0/page-configuration/"+a);return Promise.resolve(b).then(function(a){return qa=a,a})}function r(){G()("#wysiwygTextarea_ifr").contents().find("table[data-macro-name=numberedheadings]").each(function(a,b){g(b,m(b))})}function s(){if(qa.spaceNumbering.isEnabled&&!qa.pageNumbering.overrideSpaceNumbering){var a=qa,b=a.spaceNumbering;return b}var c=qa,d=c.pageNumbering;return d}function t(){G()("#wysiwygTextarea_ifr").contents().each(function(a,b){(qa.pageNumbering.isEnabled||qa.spaceNumbering.isEnabled)&&(qa.pageNumbering.isEnabled||!qa.pageNumbering.overrideSpaceNumbering)&&K?(g(b,s()),(ra.isButtonEnabled||qa.pageNumbering.isEnabled||qa.spaceNumbering.isEnabled&&!qa.pageNumbering.isEnabled)&&(G()("#rte-numbered-headings-button").addClass("active"),G()("#rte-numbering-button-control").addClass("active")),ra.isTriggerEnabled?G()("#rte-numbered-headings-button-trigger").addClass("active"):!ra.isTriggerEnabled&&G()("#rte-numbered-headings-button-trigger").removeClass("active")):(l(b),G()("#rte-numbered-headings-button").removeClass("active"),G()("#rte-numbering-button-control").removeClass("active"),G()("#rte-numbered-headings-button-trigger").removeClass("active")),r()})}function u(a){if(1===a.nodeType){var b=a.tagName.toLowerCase();if(/^h[1-6]$/.test(b))return!0;if(-1<G.a.inArray(b,["span","strong","em","u","s","sub","sup","code"]))return u(a.parentElement)}return!1}function v(){ra.isTriggerEnabled=!1}function w(){var a=G()("#nh-format-options-form");a.replaceWith(f(qa.pageNumbering))}function x(){var a=G()("#nh-numberFormatField");"custom"===qa.pageNumbering.numberFormatField&&G()(".toolbar-trigger-dialog-hidden").show(),a.on("change",function(){"custom"===G()(this).val()?G()(".toolbar-trigger-dialog-hidden").show():G()(".toolbar-trigger-dialog-hidden").hide()})}function y(){function a(){var a=b.serializeArray(),c=a.reduce(function(a,b){return a[b.name]=b.value,a},{});c.isEnabled=!0,ra.isButtonEnabled=!0,ra.isTriggerEnabled=!0,c.startingNumberField!==void 0&&P.test(c.startingNumberField)||(c.startingNumberField="1"),c.skipHeadingField!==void 0&&Q.test(c.skipHeadingField)||(c.skipHeadingField=""),qa.pageNumbering.overrideSpaceNumbering&&(c.overrideSpaceNumbering=!0),la()(qa.pageNumbering,c)||(qa.pageNumbering=c,t(),sa(!0))}var b=G()("#nh-format-options-form"),c=G()("#nh-startingNumberField"),d=G()("#nh-skipHeadingField");b.on("change",a),c.on("keyup",a),d.on("keyup",a)}function z(){return G()("#rte-numbered-headings-button")}function A(){return G()("#rte-numbered-headings-button-trigger")}function B(a){return"page"===a||"blogpost"===a}function C(){if(r(),0!==G()(".rte-toolbar-group-formatting").length){var a=G()(".rte-toolbar-group-formatting").first();if(G()("#rte-numbering-button-control").remove(),!K)return void a.append(W);if(!0===S.a.params.newPage&&!1===S.a.params.collaborativeContent)return void a.append(V);a.append(X),G()(".anti-flicker").css("display",""),document.getElementById("nh-page-numbering-configuration-dialog").addEventListener("aui-hide",v);var b=z(),c=A();if(t(),w(),y(),x(),b.click(function(a){a.preventDefault(),qa.spaceNumbering.isEnabled&&(qa.pageNumbering.isEnabled||qa.pageNumbering.overrideSpaceNumbering?(qa.pageNumbering.isEnabled=!qa.pageNumbering.isEnabled,ra.isButtonEnabled=!ra.isButtonEnabled):(qa.pageNumbering.overrideSpaceNumbering=!0,qa.pageNumbering.isEnabled=!1)),qa.spaceNumbering.isEnabled||(ra.isButtonEnabled||ra.isTriggerEnabled||""!==qa.pageNumbering.numberFormatField?(qa.pageNumbering.isEnabled=!qa.pageNumbering.isEnabled,ra.isButtonEnabled=!ra.isButtonEnabled):(qa.pageNumbering.isEnabled=!qa.pageNumbering.isEnabled,ra.isButtonEnabled=!ra.isButtonEnabled,qa.pageNumbering.numberFormatField="decimal",qa.pageNumbering.startingHeadingField="H1")),t(),sa(!1)}),c.click(function(a){qa.spaceNumbering.isEnabled&&(qa.pageNumbering.overrideSpaceNumbering=!0),G()("#nh-format-options-form input[data-aui-validation-novalidate]").attr("data-aui-validation-field",""),G()("#nh-format-options-form input[data-aui-validation-novalidate]").removeAttr("data-aui-validation-novalidate");var b=document.getElementById("nh-page-numbering-configuration-dialog");b.open=!b.open,ra.isTriggerEnabled=!!b.open,b.open&&(qa.pageNumbering.isEnabled=!0,ra.isButtonEnabled=!0),a.preventDefault(),t(),sa(!0)}),7>=L&&!M&&ra.isTriggerEnabled&&K){var d="Your Numbered Headings evaluation is about to end. There ";1===L||0===L?d+="is 1 day left to start your subscription.":d=d+"are "+L+" days left to start your subscription.",ba()({type:"warning",body:d,close:"manual"})}}}function D(a){return new Promise(function(b){if("3"===ja.a.majorVersion)var c=a.onInit.add(function(d){b(d),a.onEvent.remove(c)});else a.once("init",function(a){b(a)})})}function E(){return S.a.params.synchronyAppId&&0<S.a.params.synchronyAppId.length}c.r(b);var F=c(0),G=c.n(F),H=c(51),I=c.n(H);window.nhLicenseStatus||(window.nhLicenseStatus=I.a.claim("nl.avisi.confluence.plugins.numberedheadings:nh-license-data.license-status"));var J=window.nhLicenseStatus||{},K=J.active||!1,L=J.expiresInDays||0,M=J.subscription||!1,N=c(57),O=c(58),P=/(^[0-9]+(, ?[0-9]+)*$)/,Q=/(^H[1-6]+(, ?H[1-6])*$)/,R=c(2),S=c.n(R),T=c(1),U="7.6.0">S.a.version?"pre-ajs-7-6-0":"post-ajs-7-6-0",V=" <li class=\"nh-hotreload-element toolbar-item aui-button aui-button-subtle rte-numbered-headings-button ".concat(U,"\"\n    id=\"rte-numbering-button-control\"\n    data-tooltip=\"Cannot enable Numbered Headings on new pages when collaborative editing is disabled. After saving this page you can enable Numbered Headings.\" data-aui-trigger>\n    <a class=\"toolbar-trigger ").concat(U,"\" id=\"rte-numbered-headings\"><span class=\"nh-button-icon\"></a>\n</li>\n"),W="<li class=\"nh-hotreload-element toolbar-item aui-button aui-button-subtle rte-numbered-headings-button ".concat(U,"\"\n    id=\"rte-numbering-button-control\"\n    data-tooltip=\"Number headings\" aria-controls=\"buy-nh\" href=\"#buy-nh\" data-aui-trigger>\n    <a class=\"toolbar-trigger ").concat(U,"\" id=\"rte-numbered-headings\"><span class=\"nh-button-icon\"></a>\n\n    <!-- Wrap the dialogs in a display none so they don't flicker for half a second while initializing-->\n    <div class=\"anti-flicker\" style=\"display: none\">\n      <aui-inline-dialog class=\"nh-hotreload-element\" alignment=\"bottom left\" id=\"buy-nh\" class=\"aui-help\">\n          <h2>Number your headings</h2>\n          <p>Number all headings on this page with the click of a button.<br/>This button is part of Numbered\n              Headings Pro.</p>\n          <p>Try Numbered Headings Pro free for 30 days.<br/>Ask your admin to start your Numbered Headings trial.\n          </p>\n      </aui-inline-dialog>\n    </div>\n</li>\n"),X="<li class=\"nh-hotreload-element toolbar-item toolbar-splitbutton ".concat(U,"\" id=\"rte-numbering-button-control\">\n    <a class=\"toolbar-trigger aui-button rte-numbered-headings-button ").concat(U,"\"\n       aria-haspopup=\"true\" aria-controls=\"nh-space-wide-numbering\"\n       id=\"rte-numbered-headings-button\"\n       data-tooltip=\"Number headings\"><span class=\"nh-button-icon\"></span></a>\n        \n    <div class=\"aui-dd-parent dd-allocated\">\n        <a class=\"toolbar-trigger aui-dd-trigger aui-button rte-numbered-headings-button-trigger ").concat(U,"\"\n           aria-haspopup=\"true\" aria-controls=\"nh-page-numbering-configuration-dialog\"\n           id=\"rte-numbered-headings-button-trigger\"\n           data-tooltip=\"").concat("More formatting options","\">\n            <span class=\"icon aui-icon aui-icon-small aui-iconfont-dropdown\"></span>\n        </a>\n    </div>\n    \n    <!-- Wrap the dialogs in a display none so they don't flicker for half a second while initializing-->\n    <div class=\"anti-flicker\" style=\"display: none\">\n      <aui-inline-dialog alignment=\"bottom left\" id=\"nh-page-numbering-configuration-dialog\" class=\"nh-hotreload-element aui-info trigger-dialog-style\">\n          <h3>").concat("Numbered Headings options","</h3>\n          <div id=\"nh-format-options-form\">\n              <p>").concat("Numbered Headings options","</p>\n          </div>\n      </aui-inline-dialog>\n    </div>\n</li>"),Y={decimal:{format:function(a,b){return b}},"iso-2145":{format:function(a,b){return Y.decimal.format(a,b)},shouldRenderSeparator:function(a){return!a}},"full-decimal":{lowNumbers:["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"],highNumbers:["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"],format:function(a,b){if(b>this.lowNumbers.length-1){b=b.toString();var c=b[0],d=b[1],e=this.highNumbers[c];return 0<d&&(e+="-",e+=this.lowNumbers[d]),e}return this.lowNumbers[b]}},"lower-latin":{range:["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],format:function(a,b){return this.range[b-1]}},"upper-latin":{format:function(a,b){var c=Y["lower-latin"].format(a,b);return c.toUpperCase()}},"lower-greek":{range:["\u03B1","\u03B2","\u03B3","\u03B4","\u03B5","\u03B6","\u03B7","\u03B8","\u03B9","\u03BA","\u03BB","\u03BC","\u03BD","\u03BE","\u03BF","\u03C0","\u03C1","\u03C3","\u03C4","\u03C5","\u03C6","\u03C7","\u03C8","\u03C9"],format:function(a,b){return this.range[b-1]}},"upper-greek":{range:["\u0391","\u0392","\u0393","\u0394","\u0395","\u0396","\u0397","\u0398","\u0399","\u039A","\u039B","\u039C","\u039D","\u039E","\u039F","\u03A0","\u03A1","\u03A3","\u03A4","\u03A5","\u03A6","\u03A7","\u03A8","\u03A9"],format:function(a,b){return this.range[b-1]}},"lower-roman":{format:function(a,b){var c=Y["upper-roman"].format(a,b);return c.toLowerCase()}},"upper-roman":{units:["","I","II","III","IV","V","VI","VII","VIII","IX"],tens:["","X","XX","XXX","XL","L","LX","LXX","LXXX","XC"],hundreds:["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM"],format:function(a,b){return(this.hundreds[b/100]||"")+(this.tens[b/10]||"")+(this.units[b]||"")}},custom:{customFormatterRegex:/(\[h[1-6].[a-zA-Z0-9-]+\])/,parseCustomFormat:function(a,b){return b[a-1].split(this.customFormatterRegex)},format:function(a,b,c){for(var d,e=a.startAt,f=a.counts,g=this.parseCustomFormat(b,c),h="",j=0;j<g.length;j++)if(d=g[j],this.customFormatterRegex.test(d)){var i=d[2];if(i>=e+1&&i<=b){var k=d.substring(4,d.length-1);if("custom"!==k){var l=Y[k]||Y.decimal,m=f[i-1];h+=l.format(a,m)}}}else h+=d;return h}}},Z={"number-format":"numberFormatField","start-numbering-with":"startingNumberField","start-numbering-at":"startingHeadingField","skip-headings":"skipHeadingField",h1:"customFormatFieldH1",h2:"customFormatFieldH2",h3:"customFormatFieldH3",h4:"customFormatFieldH4",h5:"customFormatFieldH5",h6:"customFormatFieldH6"},$=c(8),_=c.n($),aa=c(4),ba=c.n(aa),ca=c(59),da=c(30),ea=c.n(da),fa=c(52),ga=c.n(fa),ha=function(){var a=ga()(ea.a.mark(function a(b,c,d,e){var f,g,h;return ea.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:f=0,g=!1,h=function(){return!0===b()||f>=e};case 3:return++f,h()&&(g=!0,c()),a.next=7,p(d);case 7:if(!g){a.next=3;break}case 8:case"end":return a.stop();}},a)}));return function(){return a.apply(this,arguments)}}(),ia=c(6),ja=c.n(ia),ka=c(53),la=c.n(ka),ma=c(54),na=c.n(ma),oa=c(55),pa=c.n(oa),qa={spaceNumbering:{isEnabled:!1,numberFormatField:"",startingNumberField:"",startingHeadingField:"",skipHeadingField:"",customFormatFieldH1:"",customFormatFieldH2:"",customFormatFieldH3:"",customFormatFieldH4:"",customFormatFieldH5:"",customFormatFieldH6:""},pageNumbering:{isEnabled:!1,overrideSpaceNumbering:!1,numberFormatField:"",startingNumberField:"",startingHeadingField:"",skipHeadingField:"",customFormatFieldH1:"",customFormatFieldH2:"",customFormatFieldH3:"",customFormatFieldH4:"",customFormatFieldH5:"",customFormatFieldH6:""}},ra={isButtonEnabled:!1,isTriggerEnabled:!1},sa=pa()(function(a){return new Promise(function(b,c){var d=na()(qa.pageNumbering);G.a.ajax({type:"PUT",contentType:"application/json",url:_()()+"/rest/numberedheadings/1.0/page-configuration/"+S.a.params.contentId,data:JSON.stringify(d),success:function(){b(),!1===a&&(qa.pageNumbering.isEnabled?ba()({type:"success",body:"Numbered Headings is enabled",close:"auto"}):ba()({type:"success",body:"Numbered Headings is disabled",close:"auto"}))},error:function(a){console.error("Failed saving page configuration",a),c(a),ba()({type:"error",title:"Unexpected error",body:"nl.avisi.confluence.plugins.numberedheadings.there.was.issue.enabling.numbered.headings",close:"auto"})},dataType:"json"})})},300,{leading:!0}),ta=c(56),ua=c.n(ta);ja.a.PluginManager.add("numberedheadings",function(){return{init:function(a){if(B(S.a.params.contentType)){var b=q(S.a.params.contentId);b.then(function(){E()&&(console.info("nl.avisi.nh: Synchrony is enabled, use polling async await"),ha(function(){return 1===G()("#wysiwygTextarea_ifr").contents().first().find(".synchrony-container").length},function(){console.log("nl.avisi.nh: Synchrony is initialized, initialize numbered headings"),t()},100,300))}),a.onNodeChange.add(function(a,b,c){if(u(c)){var d=G()(c).parents("table[data-macro-name=numberedheadings]"),e=1===d.size();if(e)g(d,m(d));else{var f=document.getElementById("nh-page-numbering-configuration-dialog");f&&f.open&&(f.open=!f.open),t()}}});var c=[b,D(a)];Promise.all(c).then(function(){try{C()}catch(a){console.error("Numbered headings threw an error",a)}});var d=!1;a.onEvent&&a.onEvent.add(function(){d||(r(),d=!0)})}},hotReload:function(){G()(".nh-hotreload-element").remove(),C()},getInfo:function(){return{longname:"Numbered Headings TinyMCE Plugin",author:"Avisi B.V.",authorurl:"http://avisi.nl",version:ja.a.majorVersion+"."+ja.a.minorVersion}}}}),ua.a.addTinyMcePluginInit(function(a){a.plugins+=",numberedheadings"}),!1},51:function(a){a.exports=WRM.data},56:function(a){a.exports=require("confluence-editor/loader/tinymce-bootstrap")},57:function(a){a.exports=void 0},58:function(a){a.exports=require("aui/inline-dialog2")},59:function(){}},[[144,12,13,0,2,1]]]);
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'nl.avisi.confluence.plugins.numberedheadings:entrypoint-nh-tinymce-plugin', location = 'bundled.runtime~nh-tinymce-plugin.a9d05a5f55f3acf92249.js' */
(function(a){function b(b){for(var d,e,h=b[0],j=b[1],k=b[2],l=0,m=[];l<h.length;l++)e=h[l],f[e]&&m.push(f[e][0]),f[e]=0;for(d in j)Object.prototype.hasOwnProperty.call(j,d)&&(a[d]=j[d]);for(i&&i(b);m.length;)m.shift()();return g.push.apply(g,k||[]),c()}function c(){for(var a,b=0;b<g.length;b++){for(var c,e=g[b],h=!0,i=1;i<e.length;i++)c=e[i],0!==f[c]&&(h=!1);h&&(g.splice(b--,1),a=d(d.s=e[0]))}return a}function d(b){if(e[b])return e[b].exports;var c=e[b]={i:b,l:!1,exports:{}};return a[b].call(c.exports,c,c.exports,d),c.l=!0,c.exports}var e={},f={12:0},g=[];d.m=a,d.c=e,d.d=function(a,b,c){d.o(a,b)||Object.defineProperty(a,b,{enumerable:!0,get:c})},d.r=function(a){'undefined'!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(a,Symbol.toStringTag,{value:'Module'}),Object.defineProperty(a,'__esModule',{value:!0})},d.t=function(a,b){if(1&b&&(a=d(a)),8&b)return a;if(4&b&&'object'==typeof a&&a&&a.__esModule)return a;var c=Object.create(null);if(d.r(c),Object.defineProperty(c,'default',{enumerable:!0,value:a}),2&b&&'string'!=typeof a)for(var e in a)d.d(c,e,function(b){return a[b]}.bind(null,e));return c},d.n=function(a){var b=a&&a.__esModule?function(){return a['default']}:function(){return a};return d.d(b,'a',b),b},d.o=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)},d.p='','undefined'!=typeof AJS&&(d.p=AJS.contextPath()+'/s/ace102f3-ff2e-4363-b0ab-bbceca03bc40/_/download/resources/nl.avisi.confluence.plugins.numberedheadings:assets-ace102f3-ff2e-4363-b0ab-bbceca03bc40/');var h=window.atlassianWebpackJsonp981e0f4effab173567f2d6cf31d7b23b=window.atlassianWebpackJsonp981e0f4effab173567f2d6cf31d7b23b||[],j=h.push.bind(h);h.push=b,h=h.slice();for(var k=0;k<h.length;k++)b(h[k]);var i=j;c()})([]);
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'nl.avisi.confluence.plugins.numberedheadings:split_nh-editor-events', location = 'nh-editor-events.55594d4cf71edc79ae22.js' */
(window.atlassianWebpackJsonp981e0f4effab173567f2d6cf31d7b23b=window.atlassianWebpackJsonp981e0f4effab173567f2d6cf31d7b23b||[]).push([[4],{138:function(a,b,c){(function(){function a(a){var c=b.MacroBrowser.selectedMacroDefinition;if(c&&"numberedheadings"===c.name){var e=b.$(d.confluence.macrobrowser.getCurrentNode()).attr("data-macro-id"),f=b.contextPath()+"/rest/numberedheadings/1.0/event/macro-edit/"+b.params.pageId+"/"+c.name+"/"+a+"?";f+="isNew="+!e,e&&(f+="&macroId="+e),b.$.ajax({url:f,type:"POST",data:JSON.stringify(c.params),contentType:"application/json; charset=utf-8",traditional:!0,error:function(a){b.log(a.responseText)}})}}var b=c(2),d=c(6);b.toInit(function(c){function f(){a("edit")}function g(){a("save")}function h(){a("cancel")}b.bind("show.dialog",function(a,b){"macro-browser-dialog"===b.dialog.id&&(f(),c("#macro-details-page button.ok").on("click",g),c("#macro-details-page a.button-panel-cancel-link").on("click",h))}),b.bind("hide.dialog",function(a,b){"macro-browser-dialog"===b.dialog.id&&(c("#macro-details-page button.ok").off("click",g),c("#macro-details-page a.button-panel-cancel-link").off("click",h))})})})()}},[[138,9,0,1]]]);
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'nl.avisi.confluence.plugins.numberedheadings:entrypoint-nh-editor-events', location = 'bundled.runtime~nh-editor-events.fb75c1dc7928daba01fc.js' */
(function(a){function b(b){for(var d,e,h=b[0],j=b[1],k=b[2],l=0,m=[];l<h.length;l++)e=h[l],f[e]&&m.push(f[e][0]),f[e]=0;for(d in j)Object.prototype.hasOwnProperty.call(j,d)&&(a[d]=j[d]);for(i&&i(b);m.length;)m.shift()();return g.push.apply(g,k||[]),c()}function c(){for(var a,b=0;b<g.length;b++){for(var c,e=g[b],h=!0,i=1;i<e.length;i++)c=e[i],0!==f[c]&&(h=!1);h&&(g.splice(b--,1),a=d(d.s=e[0]))}return a}function d(b){if(e[b])return e[b].exports;var c=e[b]={i:b,l:!1,exports:{}};return a[b].call(c.exports,c,c.exports,d),c.l=!0,c.exports}var e={},f={9:0},g=[];d.m=a,d.c=e,d.d=function(a,b,c){d.o(a,b)||Object.defineProperty(a,b,{enumerable:!0,get:c})},d.r=function(a){'undefined'!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(a,Symbol.toStringTag,{value:'Module'}),Object.defineProperty(a,'__esModule',{value:!0})},d.t=function(a,b){if(1&b&&(a=d(a)),8&b)return a;if(4&b&&'object'==typeof a&&a&&a.__esModule)return a;var c=Object.create(null);if(d.r(c),Object.defineProperty(c,'default',{enumerable:!0,value:a}),2&b&&'string'!=typeof a)for(var e in a)d.d(c,e,function(b){return a[b]}.bind(null,e));return c},d.n=function(a){var b=a&&a.__esModule?function(){return a['default']}:function(){return a};return d.d(b,'a',b),b},d.o=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)},d.p='','undefined'!=typeof AJS&&(d.p=AJS.contextPath()+'/s/ace102f3-ff2e-4363-b0ab-bbceca03bc40/_/download/resources/nl.avisi.confluence.plugins.numberedheadings:assets-ace102f3-ff2e-4363-b0ab-bbceca03bc40/');var h=window.atlassianWebpackJsonp981e0f4effab173567f2d6cf31d7b23b=window.atlassianWebpackJsonp981e0f4effab173567f2d6cf31d7b23b||[],j=h.push.bind(h);h.push=b,h=h.slice();for(var k=0;k<h.length;k++)b(h[k]);var i=j;c()})([]);
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.adaptavist.confluence.contentFormattingMacros:macro-analytics-bundle', location = 'frontend/bundles/macro-analytics.bundle.js' */
/*! For license information please see macro-analytics.bundle.js.LICENSE.txt */
(()=>{"use strict";const t={reportMacroInserted:function(t){var e=this.buildAnalyticData("Macro-Inserted",t);return this.reportAnalyticsToBackend(e)},reportMacroEdited:function(t){var e=this.buildAnalyticData("Macro-Edited",t);return this.reportAnalyticsToBackend(e)},reportMacrosDeleted:function(t){var e=this,r=(Array.isArray(t)?t:[t]).map((function(t){return e.buildAnalyticData("Macro-Deleted",t)}));return this.reportAnalyticsToBackend(r)},buildAnalyticData:function(t,e){return{eventType:[t],spaceKey:[AJS.params.spaceKey],pageId:[AJS.params.pageId],macroName:[e]}},reportAnalyticsToBackend:function(t){var e=Array.isArray(t)?t:[t];return $.ajax({type:"POST",contentType:"application/json",async:!0,url:AJS.params.baseUrl+"/plugins/servlet/cfm/analytics/macro-usage",data:JSON.stringify(e)}).error((function(){}))}};var e=function(t,e){for(var n=[],o=r(),a=t(),i=0;i<a.length;i++){var c=e(a[i]),u=o.filter((function(t){return t.macroName===c}));1===u.length&&n.push(u[0])}return n};function r(){return AJS.MacroBrowser.metadataList.filter((function(t){return"com.adaptavist.confluence.contentFormattingMacros"===t.pluginKey}))}var n=function(){return $("#wysiwygTextarea_ifr")[0].contentWindow.getSelection().getRangeAt(0).cloneContents().querySelectorAll("table.wysiwyg-macro, img.editor-inline-macro")},o=function(t){return t.dataset.macroName},a=function(){return $('div.aui-dropdown ol li.active a[class^="autocomplete-macro"]')},i=function(t){var e="autocomplete-macro-",r=$(t).attr("class");return r.substring(19+r.indexOf(e))},c=function(){return $("div#macro-insert-container input.macro-name")},u=function(){return $("#avst-custom-dialog-macro-name")},s=function(t){return t.value},l=function(r,a){if("Insert"===r){var i=e(c,s);t.reportMacroInserted(i[0].macroName)}else if("InsertCustomDialog"===r){var l=e(u,s);t.reportMacroInserted(l[0].macroName)}else if("Save"===r){var f=e(n,o);t.reportMacroEdited(f[0].macroName)}else if("SaveCustomDialog"===r){var p=e((function(){return a}),(function(){return a.find("#avst-custom-dialog-macro-name").attr("value")}));t.reportMacroEdited(p[0].macroName)}},f=function(r){if($(r.target).is('a[class*="autocomplete-macro"] span:first-child')){var n=e(a,i);if(!n.length)return;var o=n[0];o.anyParameterRequired||t.reportMacroInserted(o.macroName)}},p=function(t){var e=t.target;if(13===t.keyCode){var r=e.matches("div.macro-input-fields form div.macro-param-div .macro-param-input"),n="submit"===e.type,o=$("#macro-details-page").is(":visible")&&1===$("#macro-details-page").find(".button-panel-button.ok").size();if(!n&&(r||o)){var a=$("div#macro-details-page div.dialog-button-panel button.button-panel-button.ok")[0];l(a.innerText)}}},d=function(){var r=$(".macro-placeholder-property-panel-remove-button"),a=e(n,o);r.size()>0&&r.one("click.removeMacro",(function(){t.reportMacrosDeleted([a[0].macroName])}))},h=function(a){if(46===a.keyCode||8===a.keyCode){var i=e(n,o);if(!i||!i[0])return;var c=i.map((function(t){return t.macroName}));t.reportMacrosDeleted(c)}else if(13===a.keyCode){if($("#autocomplete-dropdown li.active").size()){var u=$("#autocomplete-dropdown li.active").text(),s=(l=u,r().find((function(t){return t.title===l})));s&&!s.anyParameterRequired&&t.reportMacroInserted(s.macroName)}}var l};function v(t){return v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},v(t)}function m(){m=function(){return e};var t,e={},r=Object.prototype,n=r.hasOwnProperty,o=Object.defineProperty||function(t,e,r){t[e]=r.value},a="function"==typeof Symbol?Symbol:{},i=a.iterator||"@@iterator",c=a.asyncIterator||"@@asyncIterator",u=a.toStringTag||"@@toStringTag";function s(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(t){s=function(t,e,r){return t[e]=r}}function l(t,e,r,n){var a=e&&e.prototype instanceof w?e:w,i=Object.create(a.prototype),c=new _(n||[]);return o(i,"_invoke",{value:M(t,r,c)}),i}function f(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}e.wrap=l;var p="suspendedStart",d="suspendedYield",h="executing",y="completed",g={};function w(){}function b(){}function x(){}var k={};s(k,i,(function(){return this}));var E=Object.getPrototypeOf,L=E&&E(E(P([])));L&&L!==r&&n.call(L,i)&&(k=L);var A=x.prototype=w.prototype=Object.create(k);function S(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function N(t,e){function r(o,a,i,c){var u=f(t[o],t,a);if("throw"!==u.type){var s=u.arg,l=s.value;return l&&"object"==v(l)&&n.call(l,"__await")?e.resolve(l.__await).then((function(t){r("next",t,i,c)}),(function(t){r("throw",t,i,c)})):e.resolve(l).then((function(t){s.value=t,i(s)}),(function(t){return r("throw",t,i,c)}))}c(u.arg)}var a;o(this,"_invoke",{value:function(t,n){function o(){return new e((function(e,o){r(t,n,e,o)}))}return a=a?a.then(o,o):o()}})}function M(e,r,n){var o=p;return function(a,i){if(o===h)throw new Error("Generator is already running");if(o===y){if("throw"===a)throw i;return{value:t,done:!0}}for(n.method=a,n.arg=i;;){var c=n.delegate;if(c){var u=T(c,n);if(u){if(u===g)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===p)throw o=y,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=h;var s=f(e,r,n);if("normal"===s.type){if(o=n.done?y:d,s.arg===g)continue;return{value:s.arg,done:n.done}}"throw"===s.type&&(o=y,n.method="throw",n.arg=s.arg)}}}function T(e,r){var n=r.method,o=e.iterator[n];if(o===t)return r.delegate=null,"throw"===n&&e.iterator.return&&(r.method="return",r.arg=t,T(e,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),g;var a=f(o,e.iterator,r.arg);if("throw"===a.type)return r.method="throw",r.arg=a.arg,r.delegate=null,g;var i=a.arg;return i?i.done?(r[e.resultName]=i.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,g):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,g)}function $(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function O(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function _(t){this.tryEntries=[{tryLoc:"root"}],t.forEach($,this),this.reset(!0)}function P(e){if(e||""===e){var r=e[i];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,a=function r(){for(;++o<e.length;)if(n.call(e,o))return r.value=e[o],r.done=!1,r;return r.value=t,r.done=!0,r};return a.next=a}}throw new TypeError(v(e)+" is not iterable")}return b.prototype=x,o(A,"constructor",{value:x,configurable:!0}),o(x,"constructor",{value:b,configurable:!0}),b.displayName=s(x,u,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===b||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,x):(t.__proto__=x,s(t,u,"GeneratorFunction")),t.prototype=Object.create(A),t},e.awrap=function(t){return{__await:t}},S(N.prototype),s(N.prototype,c,(function(){return this})),e.AsyncIterator=N,e.async=function(t,r,n,o,a){void 0===a&&(a=Promise);var i=new N(l(t,r,n,o),a);return e.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},S(A),s(A,u,"Generator"),s(A,i,(function(){return this})),s(A,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},e.values=P,_.prototype={constructor:_,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(O),!e)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function o(n,o){return c.type="throw",c.arg=e,r.next=n,o&&(r.method="next",r.arg=t),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],c=i.completion;if("root"===i.tryLoc)return o("end");if(i.tryLoc<=this.prev){var u=n.call(i,"catchLoc"),s=n.call(i,"finallyLoc");if(u&&s){if(this.prev<i.catchLoc)return o(i.catchLoc,!0);if(this.prev<i.finallyLoc)return o(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return o(i.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return o(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,g):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),g},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),O(r),g}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;O(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,r,n){return this.delegate={iterator:P(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),g}},e}function y(t,e,r,n,o,a,i){try{var c=t[a](i),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,o)}function g(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var a=t.apply(e,r);function i(t){y(a,n,o,i,c,"next",t)}function c(t){y(a,n,o,i,c,"throw",t)}i(void 0)}))}}function w(){var t;$("#editPageLink").off("click.enterEditMode",w),document.addEventListener("click",d,!0),document.addEventListener("click",f,!0),document.addEventListener("keydown",p,!0),L("#wysiwygTextarea_ifr",(function(t){(t.get(0).contentDocument||t.get(0).contentWindow.document).addEventListener("keydown",h,!0)})),t=function(t){t.find(".button-panel-button.ok")[0].addEventListener("click",function(t,e){var r=t.target;if(function(t){return t.matches("#buttongroup-dialog #insertButtonGroup")}(r)){var n=r.innerText;l(n+"CustomDialog",e)}else l(t.target.innerText)}(event,t),!0)},document.addEventListener("click",(function(){var e=$("#buttongroup-dialog").size()?$("#buttongroup-dialog"):$("#macro-details-page");e.size()&&"hiddenButton"!==event.target.id&&t(e)}),!0)}function b(t){return x.apply(this,arguments)}function x(){return(x=g(m().mark((function t(e){return m().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",new Promise((function(t){setTimeout(t,e)})));case 1:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function k(){return E.apply(this,arguments)}function E(){return(E=g(m().mark((function t(){var e,r;return m().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e=10,r=0;case 2:if(!(r<e)){t.next=10;break}if(void 0===AJS.Editor){t.next=5;break}return t.abrupt("return",Promise.resolve());case 5:return t.next=7,b(1e3);case 7:r++,t.next=2;break;case 10:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function L(t,e){var r=$(t);if(r.size())return r.ready((function(){e(r)}));window.requestAnimationFrame((function(){return L(t,e)}))}AJS.toInit((function(){g(m().mark((function t(){return m().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,k();case 3:AJS.Editor.isVisible()?w():$("#editPageLink").on("click.enterEditMode",w),t.next=9;break;case 6:t.prev=6,t.t0=t.catch(0);case 9:case"end":return t.stop()}}),t,null,[[0,6]])})))()}))})();
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.adaptavist.confluence.contentFormattingMacros:rest-table-js', location = 'soy/common.soy' */
// This file was automatically generated from common.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace ContentFormatting.Macro.Common.
 */

if (typeof ContentFormatting == 'undefined') { var ContentFormatting = {}; }
if (typeof ContentFormatting.Macro == 'undefined') { ContentFormatting.Macro = {}; }
if (typeof ContentFormatting.Macro.Common == 'undefined') { ContentFormatting.Macro.Common = {}; }


ContentFormatting.Macro.Common.requiredIcon = function(opt_data, opt_ignored) {
  return '<span class="aui-icon icon-required icon-required-moved"> required</span>';
};
if (goog.DEBUG) {
  ContentFormatting.Macro.Common.requiredIcon.soyTemplateName = 'ContentFormatting.Macro.Common.requiredIcon';
}


ContentFormatting.Macro.Common.descriptionDesc = function(opt_data, opt_ignored) {
  return '<div class="description">' + soy.$$escapeHtml('Displayed below the field') + '</div>';
};
if (goog.DEBUG) {
  ContentFormatting.Macro.Common.descriptionDesc.soyTemplateName = 'ContentFormatting.Macro.Common.descriptionDesc';
}


ContentFormatting.Macro.Common.velocityValueLink = function(opt_data, opt_ignored) {
  return '' + soy.$$escapeHtml('ID (relating to data attribute)');
};
if (goog.DEBUG) {
  ContentFormatting.Macro.Common.velocityValueLink.soyTemplateName = 'ContentFormatting.Macro.Common.velocityValueLink';
}


ContentFormatting.Macro.Common.footerContent = function(opt_data, opt_ignored) {
  return '<div class="custom-macro-footer"><div class="aui-group aui-group-split"><div class="aui-item"><a class="" href="' + soy.$$escapeHtml(opt_data.docHrefHtml) + '" target="_blank">' + soy.$$escapeHtml('Documentation') + '</a></div><div class="aui-item"><button class="aui-button aui-button-primary button-panel-button ok" id="insertButtonGroup" type="submit">' + soy.$$escapeHtml(opt_data.buttonTitle) + '</button><a class="aui-button aui-button-link" href="#" id="cancelButtonGroup">' + soy.$$escapeHtml('Cancel') + '</a></div></div></div>';
};
if (goog.DEBUG) {
  ContentFormatting.Macro.Common.footerContent.soyTemplateName = 'ContentFormatting.Macro.Common.footerContent';
}

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.adaptavist.confluence.contentFormattingMacros:rest-table-js', location = 'soy/rest-table-macro.soy' */
// This file was automatically generated from rest-table-macro.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace ContentFormatting.Macro.RestTable.
 */

if (typeof ContentFormatting == 'undefined') { var ContentFormatting = {}; }
if (typeof ContentFormatting.Macro == 'undefined') { ContentFormatting.Macro = {}; }
if (typeof ContentFormatting.Macro.RestTable == 'undefined') { ContentFormatting.Macro.RestTable = {}; }


ContentFormatting.Macro.RestTable.dialog = function(opt_data, opt_ignored) {
  return '' + aui.dialog.dialog2({id: 'buttongroup-dialog', titleText: opt_data.title, modal: true, size: 'xlarge', content: '' + ContentFormatting.Macro.RestTable.content(opt_data), footerActionContent: '' + ContentFormatting.Macro.Common.footerContent(soy.$$augmentMap(opt_data, {docHrefHtml: 'https://docs.adaptavist.com/display/CFM4CS/Restful+Table', buttonTitle: opt_data.buttonTitle}))});
};
if (goog.DEBUG) {
  ContentFormatting.Macro.RestTable.dialog.soyTemplateName = 'ContentFormatting.Macro.RestTable.dialog';
}


ContentFormatting.Macro.RestTable.content = function(opt_data, opt_ignored) {
  var output = '<div class="module custom-macro-dialog"><form id="buttonGroupForm" class="aui rest-table"><div role="application" class="aui-tabs horizontal-tabs"><ul role="tablist" class="tabs-menu"><li role="presentation" class="menu-item active-tab"><a aria-selected="true" role="tab" id="link-details" href="#tabs-details"><strong>' + soy.$$escapeHtml('Macro Options') + '</strong></a></li></ul><div aria-hidden="false" role="tabpanel" class="tabs-pane active-pane" id="tabs-details"><input id="avst-custom-dialog-macro-name" type="hidden" value="rest-table"><fieldset class="details"><legend>' + soy.$$escapeHtml('Rest Table Details') + '</legend><div class="aui-group aui-group-split"><div class="aui-item group-label"><label for="restURL">' + soy.$$escapeHtml('Resource URL') + '</label><input id="restURL" name="restURL" type="text" value="' + soy.$$escapeHtml(opt_data.restURL ? opt_data.restURL : '') + '" class="text" required="required"/><div class="description">' + soy.$$escapeHtml('URL of json data for table') + '</div></div></div></fieldset><fieldset class="rows"><legend>' + soy.$$escapeHtml('Add Table Column') + '</legend><div class="aui-group"><div class="aui-item create-button-rows"><table class="aui" id="dataTable"><thead><tr><th class="buttonLabel">' + soy.$$escapeHtml('Header') + '</th><th class="buttonValue">' + ContentFormatting.Macro.Common.velocityValueLink(null) + '</th><th class="actions">' + soy.$$escapeHtml('Actions') + '</th></tr></thead><tbody>';
  var valueList34 = opt_data.values;
  var valueListLen34 = valueList34.length;
  for (var valueIndex34 = 0; valueIndex34 < valueListLen34; valueIndex34++) {
    var valueData34 = valueList34[valueIndex34];
    output += ContentFormatting.Macro.RestTable.addRestTableRow({rowIndex: valueIndex34, size: opt_data.values.length, label: valueData34.label, value: valueData34.value});
  }
  output += '</tbody></table></div></div></fieldset></div></div><button class="hiddenButton" id="hiddenButton" type="submit"></button></form></div>';
  return output;
};
if (goog.DEBUG) {
  ContentFormatting.Macro.RestTable.content.soyTemplateName = 'ContentFormatting.Macro.RestTable.content';
}


ContentFormatting.Macro.RestTable.addRestTableRow = function(opt_data, opt_ignored) {
  return '<tr id="groupRow' + soy.$$escapeHtml(opt_data.rowIndex) + '"><td class="buttonLabel"><input class="text buttonInputLabel" name="buttonLabel" type="text" value="' + soy.$$escapeHtml(opt_data.label) + '"/></td><td class="buttonValue"><input class="text buttonInputValue" name="buttonValue" type="text" value="' + soy.$$escapeHtml(opt_data.value) + '"/></td><td class="actions"><input onclick="addRestTableRow(' + soy.$$escapeHtml(opt_data.rowIndex) + ')" type="button" class="aui-button" value="+"/><input onclick="removeRestTableGroupRow(' + soy.$$escapeHtml(opt_data.rowIndex) + ')" id="removeButton-' + soy.$$escapeHtml(opt_data.rowIndex) + '" type="button" class="aui-button" value="-" ' + ((opt_data.size == 1) ? 'disabled' : '') + '/></td></tr>';
};
if (goog.DEBUG) {
  ContentFormatting.Macro.RestTable.addRestTableRow.soyTemplateName = 'ContentFormatting.Macro.RestTable.addRestTableRow';
}

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.adaptavist.confluence.contentFormattingMacros:rest-table-js', location = 'js/rest-table-macro.js' */
AJS.bind("init.rte", function () {

    //Model for a Rest Table
    function RestTable(params) {

        this.getRestURL = function () {
            return params === undefined ? '' : params.restURL;
        };


        this.getValues = function () {
            if (params === undefined) {
                return [{
                    label: '',
                    value: ''
                }];
            } else {
                var counter = Number(params['counter']);
                var values = [];

                //Unfortunately, Confluence cannot parse a JSON string, so one needs to write each parameter individually
                for (var i = 0; i < counter; i++) {
                    values.push({
                        label: params[i.toString() + '_label'] === undefined ? "" : params[i.toString() + '_label'],
                        value: params[i.toString() + '_value'] === undefined ? "" : params[i.toString() + '_value']
                    });
                }
                return values;
            }
        };
    }

    //Fetches all Label/Values from each row, plus if it's selected.
    function getRowValues(values) {
        var counter = 0;

        //Unfortunately, Confluence cannot parse a JSON string, so one needs to write each parameter individually
        AJS.$('[id^="groupRow"]').each(function () {
            var label = $(this).find("input[name='buttonLabel']").val();
            var value = $(this).find("input[name='buttonValue']").val();

            values[counter + '_label'] = label;
            values[counter + '_value'] = value;

            counter++;
        });

        values['counter'] = counter;

        return values;
    }

    function getRestTableParams() {
        var values = {
            restURL: AJS.$('#restURL').val()
        };

        return getRowValues(values);
    }

    function setupEvents() {
        // Setups Tabs in AJS
        AJS.tabs.setup();

        //Hooks up the Cancel Button
        AJS.$('#cancelButtonGroup').click(function (e) {
            e.preventDefault();
            AJS.dialog2('#buttongroup-dialog').remove();
        });

        //Hooks up the Insert Button
        // The hidden button is required to submit the form because the dialog submit button is outside the form element.
        AJS.$('#insertButtonGroup').click(function () {
            AJS.$('#buttonGroupForm').submit();
        });
    }

    function createRestTable(macro) {

        //Creates a new Rest Table object that holds the parameters
        var restTable = new RestTable(macro.params);

        var dialogAndButtonTitle = macro.body === undefined ?
            "Insert" :
            "Save";
        //Calls the dialog with Edit or Insert accordingly.
        AJS.dialog2(ContentFormatting.Macro.RestTable.dialog({
            title: dialogAndButtonTitle + ' ' + "\u0027Restful Table\u0027 Macro",
            buttonTitle: dialogAndButtonTitle,
            restURL: restTable.getRestURL(),
            values: restTable.getValues()
        })).show();

        AJS.$('#insertButtonGroup').on('click', function (event) {
            AJS.$('#hiddenButton').click();
        });

        AJS.$('#buttonGroupForm').on('submit', function (e) {
            e.preventDefault();

                var t = tinymce.confluence.macrobrowser;

                AJS.Rte.BookmarkManager.restoreBookmark();

                if (t.editedMacroDiv) {
                    delete t.editedMacroDiv;
                }

                //Saves the Macro. Since the values is an array, it needs to convert it to JSON and then parse it back to display.
                tinymce.confluence.macrobrowser.macroBrowserComplete({
                    name: "rest-table",
                    "bodyHtml": undefined,
                    "params": getRestTableParams(),
                    "values": restTable.getValues()
                });

                AJS.dialog2('#buttongroup-dialog').remove();
        });

        setupEvents();
    }

    AJS.MacroBrowser.setMacroJsOverride('rest-table', {opener: createRestTable});
});

//Adds a new row Macro
function addRestTableRow(rowIndex) {
    AJS.$('#dataTable > tbody > tr#groupRow' + rowIndex).after(ContentFormatting.Macro.RestTable.addRestTableRow({
        rowIndex: AJS.$('[id^="groupRow"]').length,
        label: '',
        value: ''
    }));

    AJS.$('[id^="removeButton-"]')[0].disabled = false;
}
//Removes a row from Macro
function removeRestTableGroupRow(rowIndex) {
    AJS.$('#groupRow' + rowIndex).remove();

    if (AJS.$('[id^="removeButton-"]').length == 1) {
        AJS.$('[id^="removeButton-"]')[0].disabled = true;
    }
}

}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.tensixtwo.conf.latexmath:macro-editor-injectors', location = 'webapp/static/js/newEditor.pack.js' */
/*! For license information please see newEditor.pack.js.LICENSE.txt */
//# sourceMappingURL=newEditor.pack.js.map
}catch(e){WRMCB(e)};
;
try {
/* module-key = 'com.tensixtwo.conf.latexmath:macro-editor-injectors', location = 'mathlive/mathlive.js' */
/** MathLive 0.89.4 */
    (function(global,factory){typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'],factory):(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.MathLive = {}));})(this, (function (exports) { 'use strict';
var MathLive=(()=>{var Ii=Object.defineProperty,Qs=Object.defineProperties,el=Object.getOwnPropertyDescriptor,tl=Object.getOwnPropertyDescriptors,rl=Object.getOwnPropertyNames,tn=Object.getOwnPropertySymbols;var on=Object.prototype.hasOwnProperty,il=Object.prototype.propertyIsEnumerable;var rn=(r,e,t)=>e in r?Ii(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,y=(r,e)=>{for(var t in e||(e={}))on.call(e,t)&&rn(r,t,e[t]);if(tn)for(var t of tn(e))il.call(e,t)&&rn(r,t,e[t]);return r},D=(r,e)=>Qs(r,tl(e));var ol=(r,e)=>{for(var t in e)Ii(r,t,{get:e[t],enumerable:!0})},al=(r,e,t,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of rl(e))!on.call(r,o)&&o!==t&&Ii(r,o,{get:()=>e[o],enumerable:!(i=el(e,o))||i.enumerable});return r};var nl=r=>al(Ii({},"__esModule",{value:!0}),r);var Hu={};ol(Hu,{MathfieldElement:()=>tt,autoRenderMathInElement:()=>Qa,convertAsciiMathToLatex:()=>Eu,convertLatexToAsciiMath:()=>Tu,convertLatexToMarkup:()=>ja,convertLatexToMathMl:()=>Xa,convertLatexToSpeakableText:()=>Za,debug:()=>Vu,globalMathLive:()=>ce,makeSharedVirtualKeyboard:()=>Nu,renderMathInDocument:()=>Iu,renderMathInElement:()=>Ys,serializeMathJsonToLatex:()=>Ya,validateLatex:()=>Cu,version:()=>$u});function ee(r){return Array.isArray(r)}function Se(){return"window"in globalThis&&"document"in globalThis}function qi(){if(!Se())throw new Error(`<math-field> is an interactive component that needs to run in a browser environment
l10-10c34-36 62.7-77 86-123 3.3-8 5-13.3 5-16 0-5.3-6.7-8-20-8-7.3
 0-12.2.5-14.5 1.5-2.3 1-4.8 4.5-7.5 10.5-49.3 97.3-121.7 169.3-217 216-28
 14-57.3 25-88 33-6.7 2-11 3.8-13 5.5-2 1.7-3 4.2-3 7.5s1 5.8 3 7.5
c2 1.7 6.3 3.5 13 5.5 68 17.3 128.2 47.8 180.5 91.5 52.3 43.7 93.8 96.2 124.5
 157.5 9.3 8 15.3 12.3 18 13h6c12-.7 18-4 18-10 0-2-1.7-7-5-15-23.3-46-52-87
-86-123l-10-10h399738v-40H218c328 0 0 0 0 0l-10-8c-26.7-20-65.7-43-117-69 2.7
-2 6-3.7 10-5 36.7-16 72.3-37.3 107-64l10-8h399782v-40z
m8 0v40h399730v-40zm0 194v40h399730v-40z`,doublerightarrow:`M399738 392l
-10 10c-34 36-62.7 77-86 123-3.3 8-5 13.3-5 16 0 5.3 6.7 8 20 8 7.3 0 12.2-.5
 14.5-1.5 2.3-1 4.8-4.5 7.5-10.5 49.3-97.3 121.7-169.3 217-216 28-14 57.3-25 88
-33 6.7-2 11-3.8 13-5.5 2-1.7 3-4.2 3-7.5s-1-5.8-3-7.5c-2-1.7-6.3-3.5-13-5.5-68
-17.3-128.2-47.8-180.5-91.5-52.3-43.7-93.8-96.2-124.5-157.5-9.3-8-15.3-12.3-18
-13h-6c-12 .7-18 4-18 10 0 2 1.7 7 5 15 23.3 46 52 87 86 123l10 10H0v40h399782
c-328 0 0 0 0 0l10 8c26.7 20 65.7 43 117 69-2.7 2-6 3.7-10 5-36.7 16-72.3 37.3
-107 64l-10 8H0v40zM0 157v40h399730v-40zm0 194v40h399730v-40z`,leftarrow:`M400000 241H110l3-3c68.7-52.7 113.7-120
 135-202 4-14.7 6-23 6-25 0-7.3-7-11-21-11-8 0-13.2.8-15.5 2.5-2.3 1.7-4.2 5.8
-5.5 12.5-1.3 4.7-2.7 10.3-4 17-12 48.7-34.8 92-68.5 130S65.3 228.3 18 247
c-10 4-16 7.7-18 11 0 8.7 6 14.3 18 17 47.3 18.7 87.8 47 121.5 85S196 441.3 208
 490c.7 2 1.3 5 2 9s1.2 6.7 1.5 8c.3 1.3 1 3.3 2 6s2.2 4.5 3.5 5.5c1.3 1 3.3
 1.8 6 2.5s6 1 10 1c14 0 21-3.7 21-11 0-2-2-10.3-6-25-20-79.3-65-146.7-135-202
 l-3-3h399890zM100 241v40h399900v-40z`,leftbrace:`M6 548l-6-6v-35l6-11c56-104 135.3-181.3 238-232 57.3-28.7 117
-45 179-50h399577v120H403c-43.3 7-81 15-113 26-100.7 33-179.7 91-237 174-2.7
 5-6 9-10 13-.7 1-7.3 1-20 1H6z`,leftbraceunder:`M0 6l6-6h17c12.688 0 19.313.3 20 1 4 4 7.313 8.3 10 13
 35.313 51.3 80.813 93.8 136.5 127.5 55.688 33.7 117.188 55.8 184.5 66.5.688
 0 2 .3 4 1 18.688 2.7 76 4.3 172 5h399450v120H429l-6-1c-124.688-8-235-61.7
-331-161C60.687 138.7 32.312 99.3 7 54L0 41V6z`,overarc:"M529 0c179 0 524 115 524 115 5 1 9 5 9 10 0 1-1 2-1 3l-4 22c-1 5-5 9-11 9h-2s-338-93-512-92c-174 0-513 92-513 92h-2c-5 0-9-4-11-9l-5-22c-1-6 2-12 8-13 0 0 342-115 520-115z",underarc:`m 529 160
  c -179 0 -524 -115 -524 -115
  c -5 -1 -9 -5 -9 -10
  c 0 -1 1 -2 1 -3
  l 4 -22
  c 1 -5 5 -9 11 -9
  h 2
  s 338 93 512 92
  c 174 0 513 -92 513 -92
  h 2
  c 5 0 9 4 11 9
  l 5 22
  c 1 6 -2 12 -8 13
  c 0 0 -342 115 -520 115
  z
  `,leftgroup:`M400000 80
H435C64 80 168.3 229.4 21 260c-5.9 1.2-18 0-18 0-2 0-3-1-3-3v-38C76 61 257 0
 435 0h399565z`,leftgroupunder:`M400000 262
H435C64 262 168.3 112.6 21 82c-5.9-1.2-18 0-18 0-2 0-3 1-3 3v38c76 158 257 219
 435 219h399565z`,leftharpoon:`M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3
-3.3 10.2-9.5 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5
-18.3 3-21-1.3-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7
-196 228-6.7 4.7-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40z`,leftharpoonplus:`M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3-3.3 10.2-9.5
 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5-18.3 3-21-1.3
-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7-196 228-6.7 4.7
-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40zM0 435v40h400000v-40z
m0 0v40h400000v-40z`,leftharpoondown:`M7 241c-4 4-6.333 8.667-7 14 0 5.333.667 9 2 11s5.333
 5.333 12 10c90.667 54 156 130 196 228 3.333 10.667 6.333 16.333 9 17 2 .667 5
 1 9 1h5c10.667 0 16.667-2 18-6 2-2.667 1-9.667-3-21-32-87.333-82.667-157.667
-152-211l-3-3h399907v-40zM93 281 H400000 v-40L7 241z`,leftharpoondownplus:`M7 435c-4 4-6.3 8.7-7 14 0 5.3.7 9 2 11s5.3 5.3 12
 10c90.7 54 156 130 196 228 3.3 10.7 6.3 16.3 9 17 2 .7 5 1 9 1h5c10.7 0 16.7
-2 18-6 2-2.7 1-9.7-3-21-32-87.3-82.7-157.7-152-211l-3-3h399907v-40H7zm93 0
v40h399900v-40zM0 241v40h399900v-40zm0 0v40h399900v-40z`,lefthook:`M400000 281 H103s-33-11.2-61-33.5S0 197.3 0 164s14.2-61.2 42.5
-83.5C70.8 58.2 104 47 142 47 c16.7 0 25 6.7 25 20 0 12-8.7 18.7-26 20-40 3.3
-68.7 15.7-86 37-10 12-15 25.3-15 40 0 22.7 9.8 40.7 29.5 54 19.7 13.3 43.5 21
 71.5 23h399859zM103 281v-40h399897v40z`,leftlinesegment:`M40 281 V428 H0 V94 H40 V241 H400000 v40z
M40 281 V428 H0 V94 H40 V241 H400000 v40z`,leftmapsto:`M40 281 V448H0V74H40V241H400000v40z
M40 281 V448H0V74H40V241H400000v40z`,leftToFrom:`M0 147h400000v40H0zm0 214c68 40 115.7 95.7 143 167h22c15.3 0 23
-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69-70-101l-7-8h399905v-40H95l7-8
c28.7-32 52-65.7 70-101 10.7-23.3 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 265.3
 68 321 0 361zm0-174v-40h399900v40zm100 154v40h399900v-40z`,longequal:`M0 50 h400000 v40H0z m0 194h40000v40H0z
M0 50 h400000 v40H0z m0 194h40000v40H0z`,midbrace:`M200428 334
c-100.7-8.3-195.3-44-280-108-55.3-42-101.7-93-139-153l-9-14c-2.7 4-5.7 8.7-9 14
-53.3 86.7-123.7 153-211 199-66.7 36-137.3 56.3-212 62H0V214h199568c178.3-11.7
 311.7-78.3 403-201 6-8 9.7-12 11-12 .7-.7 6.7-1 18-1s17.3.3 18 1c1.3 0 5 4 11
 12 44.7 59.3 101.3 106.3 170 141s145.3 54.3 229 60h199572v120z`,midbraceunder:`M199572 214
c100.7 8.3 195.3 44 280 108 55.3 42 101.7 93 139 153l9 14c2.7-4 5.7-8.7 9-14
 53.3-86.7 123.7-153 211-199 66.7-36 137.3-56.3 212-62h199568v120H200432c-178.3
 11.7-311.7 78.3-403 201-6 8-9.7 12-11 12-.7.7-6.7 1-18 1s-17.3-.3-18-1c-1.3 0
-5-4-11-12-44.7-59.3-101.3-106.3-170-141s-145.3-54.3-229-60H0V214z`,oiintSize1:`M512.6 71.6c272.6 0 320.3 106.8 320.3 178.2 0 70.8-47.7 177.6
-320.3 177.6S193.1 320.6 193.1 249.8c0-71.4 46.9-178.2 319.5-178.2z
m368.1 178.2c0-86.4-60.9-215.4-368.1-215.4-306.4 0-367.3 129-367.3 215.4 0 85.8
60.9 214.8 367.3 214.8 307.2 0 368.1-129 368.1-214.8z`,oiintSize2:`M757.8 100.1c384.7 0 451.1 137.6 451.1 230 0 91.3-66.4 228.8
-451.1 228.8-386.3 0-452.7-137.5-452.7-228.8 0-92.4 66.4-230 452.7-230z
m502.4 230c0-111.2-82.4-277.2-502.4-277.2s-504 166-504 277.2
c0 110 84 276 504 276s502.4-166 502.4-276z`,oiiintSize1:`M681.4 71.6c408.9 0 480.5 106.8 480.5 178.2 0 70.8-71.6 177.6
-480.5 177.6S202.1 320.6 202.1 249.8c0-71.4 70.5-178.2 479.3-178.2z
m525.8 178.2c0-86.4-86.8-215.4-525.7-215.4-437.9 0-524.7 129-524.7 215.4 0
85.8 86.8 214.8 524.7 214.8 438.9 0 525.7-129 525.7-214.8z`,oiiintSize2:`M1021.2 53c603.6 0 707.8 165.8 707.8 277.2 0 110-104.2 275.8
-707.8 275.8-606 0-710.2-165.8-710.2-275.8C311 218.8 415.2 53 1021.2 53z
m770.4 277.1c0-131.2-126.4-327.6-770.5-327.6S248.4 198.9 248.4 330.1
c0 130 128.8 326.4 772.7 326.4s770.5-196.4 770.5-326.4z`,rightarrow:`M0 241v40h399891c-47.3 35.3-84 78-110 128
-16.7 32-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20
 11 8 0 13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7
 39-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85
-40.5-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5
-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67
 151.7 139 205zm0 0v40h399900v-40z`,rightbrace:`M400000 542l
-6 6h-17c-12.7 0-19.3-.3-20-1-4-4-7.3-8.3-10-13-35.3-51.3-80.8-93.8-136.5-127.5
s-117.2-55.8-184.5-66.5c-.7 0-2-.3-4-1-18.7-2.7-76-4.3-172-5H0V214h399571l6 1
c124.7 8 235 61.7 331 161 31.3 33.3 59.7 72.7 85 118l7 13v35z`,rightbraceunder:`M399994 0l6 6v35l-6 11c-56 104-135.3 181.3-238 232-57.3
 28.7-117 45-179 50H-300V214h399897c43.3-7 81-15 113-26 100.7-33 179.7-91 237
-174 2.7-5 6-9 10-13 .7-1 7.3-1 20-1h17z`,rightgroup:`M0 80h399565c371 0 266.7 149.4 414 180 5.9 1.2 18 0 18 0 2 0
 3-1 3-3v-38c-76-158-257-219-435-219H0z`,rightgroupunder:`M0 262h399565c371 0 266.7-149.4 414-180 5.9-1.2 18 0 18
 0 2 0 3 1 3 3v38c-76 158-257 219-435 219H0z`,rightharpoon:`M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3
-3.7-15.3-11-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2
-10.7 0-16.7 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58
 69.2 92 94.5zm0 0v40h399900v-40z`,rightharpoonplus:`M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3-3.7-15.3-11
-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2-10.7 0-16.7
 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58 69.2 92 94.5z
m0 0v40h399900v-40z m100 194v40h399900v-40zm0 0v40h399900v-40z`,rightharpoondown:`M399747 511c0 7.3 6.7 11 20 11 8 0 13-.8 15-2.5s4.7-6.8
 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3 8.5-5.8 9.5
-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3-64.7 57-92 95
-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 241v40h399900v-40z`,rightharpoondownplus:`M399747 705c0 7.3 6.7 11 20 11 8 0 13-.8
 15-2.5s4.7-6.8 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3
 8.5-5.8 9.5-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3
-64.7 57-92 95-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 435v40h399900v-40z
m0-194v40h400000v-40zm0 0v40h400000v-40z`,righthook:`M399859 241c-764 0 0 0 0 0 40-3.3 68.7-15.7 86-37 10-12 15-25.3
 15-40 0-22.7-9.8-40.7-29.5-54-19.7-13.3-43.5-21-71.5-23-17.3-1.3-26-8-26-20 0
-13.3 8.7-20 26-20 38 0 71 11.2 99 33.5 0 0 7 5.6 21 16.7 14 11.2 21 33.5 21
 66.8s-14 61.2-42 83.5c-28 22.3-61 33.5-99 33.5L0 241z M0 281v-40h399859v40z`,rightlinesegment:`M399960 241 V94 h40 V428 h-40 V281 H0 v-40z
M399960 241 V94 h40 V428 h-40 V281 H0 v-40z`,rightToFrom:`M400000 167c-70.7-42-118-97.7-142-167h-23c-15.3 0-23 .3-23
 1 0 1.3 5.3 13.7 16 37 18 35.3 41.3 69 70 101l7 8H0v40h399905l-7 8c-28.7 32
-52 65.7-70 101-10.7 23.3-16 35.7-16 37 0 .7 7.7 1 23 1h23c24-69.3 71.3-125 142
-167z M100 147v40h399900v-40zM0 341v40h399900v-40z`,twoheadleftarrow:`M0 167c68 40
 115.7 95.7 143 167h22c15.3 0 23-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69
-70-101l-7-8h125l9 7c50.7 39.3 85 86 103 140h46c0-4.7-6.3-18.7-19-42-18-35.3
-40-67.3-66-96l-9-9h399716v-40H284l9-9c26-28.7 48-60.7 66-96 12.7-23.333 19
-37.333 19-42h-46c-18 54-52.3 100.7-103 140l-9 7H95l7-8c28.7-32 52-65.7 70-101
 10.7-23.333 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 71.3 68 127 0 167z`,twoheadrightarrow:`M400000 167
c-68-40-115.7-95.7-143-167h-22c-15.3 0-23 .3-23 1 0 1.3 5.3 13.7 16 37 18 35.3
 41.3 69 70 101l7 8h-125l-9-7c-50.7-39.3-85-86-103-140h-46c0 4.7 6.3 18.7 19 42
 18 35.3 40 67.3 66 96l9 9H0v40h399716l-9 9c-26 28.7-48 60.7-66 96-12.7 23.333
-19 37.333-19 42h46c18-54 52.3-100.7 103-140l9-7h125l-7 8c-28.7 32-52 65.7-70
 101-10.7 23.333-16 35.7-16 37 0 .7 7.7 1 23 1h22c27.3-71.3 75-127 143-167z`,widetilde1:`M200 55.538c-77 0-168 73.953-177 73.953-3 0-7
-2.175-9-5.437L2 97c-1-2-2-4-2-6 0-4 2-7 5-9l20-12C116 12 171 0 207 0c86 0
 114 68 191 68 78 0 168-68 177-68 4 0 7 2 9 5l12 19c1 2.175 2 4.35 2 6.525 0
 4.35-2 7.613-5 9.788l-19 13.05c-92 63.077-116.937 75.308-183 76.128
-68.267.847-113-73.952-191-73.952z`,widetilde2:`M344 55.266c-142 0-300.638 81.316-311.5 86.418
-8.01 3.762-22.5 10.91-23.5 5.562L1 120c-1-2-1-3-1-4 0-5 3-9 8-10l18.4-9C160.9
 31.9 283 0 358 0c148 0 188 122 331 122s314-97 326-97c4 0 8 2 10 7l7 21.114
c1 2.14 1 3.21 1 4.28 0 5.347-3 9.626-7 10.696l-22.3 12.622C852.6 158.372 751
 181.476 676 181.476c-149 0-189-126.21-332-126.21z`,widetilde3:`M786 59C457 59 32 175.242 13 175.242c-6 0-10-3.457
-11-10.37L.15 138c-1-7 3-12 10-13l19.2-6.4C378.4 40.7 634.3 0 804.3 0c337 0
 411.8 157 746.8 157 328 0 754-112 773-112 5 0 10 3 11 9l1 14.075c1 8.066-.697
 16.595-6.697 17.492l-21.052 7.31c-367.9 98.146-609.15 122.696-778.15 122.696
 -338 0-409-156.573-744-156.573z`,widetilde4:`M786 58C457 58 32 177.487 13 177.487c-6 0-10-3.345
-11-10.035L.15 143c-1-7 3-12 10-13l22-6.7C381.2 35 637.15 0 807.15 0c337 0 409
 177 744 177 328 0 754-127 773-127 5 0 10 3 11 9l1 14.794c1 7.805-3 13.38-9
 14.495l-20.7 5.574c-366.85 99.79-607.3 139.372-776.3 139.372-338 0-409
 -175.236-744-175.236z`,vec:`M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5
3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11
10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63
-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1
-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59
H213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359
c-16-25.333-24-45-24-59z`,widehat1:`M529 0h5l519 115c5 1 9 5 9 10 0 1-1 2-1 3l-4 22
c-1 5-5 9-11 9h-2L532 67 19 159h-2c-5 0-9-4-11-9l-5-22c-1-6 2-12 8-13z`,widehat2:`M1181 0h2l1171 176c6 0 10 5 10 11l-2 23c-1 6-5 10
-11 10h-1L1182 67 15 220h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z`,widehat3:`M1181 0h2l1171 236c6 0 10 5 10 11l-2 23c-1 6-5 10
-11 10h-1L1182 67 15 280h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z`,widehat4:`M1181 0h2l1171 296c6 0 10 5 10 11l-2 23c-1 6-5 10
-11 10h-1L1182 67 15 340h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z`,widecheck1:`M529,159h5l519,-115c5,-1,9,-5,9,-10c0,-1,-1,-2,-1,-3l-4,-22c-1,
-5,-5,-9,-11,-9h-2l-512,92l-513,-92h-2c-5,0,-9,4,-11,9l-5,22c-1,6,2,12,8,13z`,widecheck2:`M1181,220h2l1171,-176c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,
-11,-10h-1l-1168,153l-1167,-153h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z`,widecheck3:`M1181,280h2l1171,-236c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,
-11,-10h-1l-1168,213l-1167,-213h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z`,widecheck4:`M1181,340h2l1171,-296c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,
-11,-10h-1l-1168,273l-1167,-273h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z`,baraboveleftarrow:`M400000 620h-399890l3 -3c68.7 -52.7 113.7 -120 135 -202
c4 -14.7 6 -23 6 -25c0 -7.3 -7 -11 -21 -11c-8 0 -13.2 0.8 -15.5 2.5
c-2.3 1.7 -4.2 5.8 -5.5 12.5c-1.3 4.7 -2.7 10.3 -4 17c-12 48.7 -34.8 92 -68.5 130
s-74.2 66.3 -121.5 85c-10 4 -16 7.7 -18 11c0 8.7 6 14.3 18 17c47.3 18.7 87.8 47
121.5 85s56.5 81.3 68.5 130c0.7 2 1.3 5 2 9s1.2 6.7 1.5 8c0.3 1.3 1 3.3 2 6
s2.2 4.5 3.5 5.5c1.3 1 3.3 1.8 6 2.5s6 1 10 1c14 0 21 -3.7 21 -11
c0 -2 -2 -10.3 -6 -25c-20 -79.3 -65 -146.7 -135 -202l-3 -3h399890z
M100 620v40h399900v-40z M0 241v40h399900v-40zM0 241v40h399900v-40z`,rightarrowabovebar:`M0 241v40h399891c-47.3 35.3-84 78-110 128-16.7 32
-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20 11 8 0
13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7 39
-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85-40.5
-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5
-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67
151.7 139 205zm96 379h399894v40H0zm0 0h399904v40H0z`,baraboveshortleftharpoon:`M507,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11
c1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17
c2,0.7,5,1,9,1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21
c-32,-87.3,-82.7,-157.7,-152,-211c0,0,-3,-3,-3,-3l399351,0l0,-40
c-398570,0,-399437,0,-399437,0z M593 435 v40 H399500 v-40z
M0 281 v-40 H399908 v40z M0 281 v-40 H399908 v40z`,rightharpoonaboveshortbar:`M0,241 l0,40c399126,0,399993,0,399993,0
c4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,
-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6
c-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z
M0 241 v40 H399908 v-40z M0 475 v-40 H399500 v40z M0 475 v-40 H399500 v40z`,shortbaraboveleftharpoon:`M7,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11
c1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17c2,0.7,5,1,9,
1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21c-32,-87.3,-82.7,-157.7,
-152,-211c0,0,-3,-3,-3,-3l399907,0l0,-40c-399126,0,-399993,0,-399993,0z
M93 435 v40 H400000 v-40z M500 241 v40 H400000 v-40z M500 241 v40 H400000 v-40z`,shortrightharpoonabovebar:`M53,241l0,40c398570,0,399437,0,399437,0
c4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,
-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6
c-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z
"cmd" modifier can only be used with macOS or iOS platform.`);i||(i=Ct()==="ios"?"ios":"macos"),t.win=!1,t.cmd=!1,t.meta=!0}if(t.win){if(i&&i!=="windows")throw new Error('Unexpected "win" modifier with platform "'+i+`"
"win" modifier can only be used with Windows platform.`);i="windows",t.win=!1,t.cmd=!1,t.meta=!0}if(i&&!Ac(i))return;if(/^\[.+\]$/.test(t.key))return D(y({},r),{ifPlatform:i,key:vi(t)});let o=Zn(t.key,e);if(!o)throw new Error('Invalid keybinding key "'+r.key+'"');if(o.shift&&t.shift||o.alt&&t.alt)throw new Error(`The keybinding ${r.key} (${fa(r.command)}) is conflicting with the key combination ${vi(o)} using the ${e.displayName} keyboard layout`);return o.shift=o.shift||t.shift,o.alt=o.alt||t.alt,o.meta=t.meta,o.ctrl=t.ctrl,D(y({},r),{ifPlatform:i,key:vi(o)})}function fa(r){if(Array.isArray(r)){let e=[...r];return e.shift()+"("+e.map(t=>typeof t=="string"?`"${t}"`:t.toString()).join(", ")+")"}return r}function os(r,e){let t=[],i=[];for(let o of r)try{let a=Lc(o,e);if(a){let n=t.filter(s=>s.key===a.key&&s.ifMode===a.ifMode);if(n.length>0)throw new Error(`Ambiguous key binding ${o.key} (${fa(o.command)}) matches ${n[0].key} (${fa(n[0].command)}) with the ${e.displayName} keyboard layout`);t.push(a)}}catch(a){a instanceof Error&&i.push(a.message)}return[t,i]}var ga="#mathlive-popover-panel{visibility:hidden;background-color:rgba(97,97,97,0.95);color:#fff;text-align:center;border-radius:8px;position:fixed;z-index:1;display:flex;flex-direction:column;justify-content:center;box-shadow:0 14px 28px rgba(0,0,0,0.25),0 10px 10px rgba(0,0,0,0.22);transition:all .2s cubic-bezier(.64, .09, .08, 1)}#mathlive-popover-panel::after{content:'';position:absolute;top:-5px;left:calc(50% - 3px);width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;font-size:1rem;border-bottom:5px solid rgba(97,97,97,0.9)}#mathlive-popover-panel.is-visible{visibility:inherit;animation:ML__fade-in cubic-bezier(0, 0, .2, 1) .15s}@keyframes ML__fade-in{from{opacity:0}to{opacity:1}}#mathlive-popover-panel ul{display:flex;flex-flow:column;list-style:none;margin:0;padding:0;align-items:flex-start;justify-content:center}#mathlive-popover-panel li{display:flex;flex-direction:row;justify-content:space-between;margin:8px;padding:8px;width:calc(100% - 16px - 16px);column-gap:1em;border-radius:8px;cursor:pointer}#mathlive-popover-panel li a{color:#5ea6fd;padding-top:.3em;margin-top:.4em;display:block}#mathlive-popover-panel li a:hover{color:#5ea6fd;text-decoration:underline}#mathlive-popover-panel li:hover,#mathlive-popover-panel li.is-pressed,#mathlive-popover-panel li.is-active{background:rgba(255,255,255,0.1)}.ML__popover__command{font-size:1.6rem;font-family:KaTeX_Main}.ML__popover__latex{font-family:'IBM Plex Mono','Source Code Pro',Consolas,'Roboto Mono',Menlo,'Bitstream Vera Sans Mono','DejaVu Sans Mono',Monaco,Courier,monospace;align-self:center}.ML__popover__keybinding{font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif;font-size:.8em;opacity:.7}.ML__shortcut-join{opacity:.5}";var He=".ML__sr-only{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0, 0, 0, 0);clip-path:inset(50%);white-space:nowrap;border:0}.ML__isInline{display:inline-block}.ML__base{visibility:inherit;display:inline-block;position:relative;cursor:text;padding:0;margin:0;box-sizing:content-box;border:0;outline:0;vertical-align:baseline;font-weight:inherit;font-family:inherit;font-style:inherit;text-decoration:none;width:min-content}body.ML__fonts-loading .ML__base{visibility:hidden}.ML__strut,.ML__strut--bottom{display:inline-block;min-height:.5em}.ML__small-delim{font-family:KaTeX_Main}.ML__text{font-family:var(--text-font-family, system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif);white-space:pre}.ML__cmr{font-family:KaTeX_Main;font-style:normal}.ML__mathit{font-family:KaTeX_Math;font-style:italic}.ML__mathbf{font-family:KaTeX_Main;font-weight:bold}.lcGreek.ML__mathbf{font-family:KaTeX_Math;font-weight:normal}.ML__mathbfit{font-family:KaTeX_Math;font-weight:bold;font-style:italic}.ML__ams{font-family:KaTeX_AMS}.ML__bb{font-family:KaTeX_AMS}.ML__cal{font-family:KaTeX_Caligraphic}.ML__frak{font-family:KaTeX_Fraktur}.ML__tt{font-family:KaTeX_Typewriter}.ML__script{font-family:KaTeX_Script}.ML__sans{font-family:KaTeX_SansSerif}.ML__series_ul{font-weight:100}.ML__series_el{font-weight:100}.ML__series_l{font-weight:200}.ML__series_sl{font-weight:300}.ML__series_sb{font-weight:500}.ML__bold,.ML__boldsymbol{font-weight:700}.ML__series_eb{font-weight:800}.ML__series_ub{font-weight:900}.ML__series_uc{font-stretch:ultra-condensed}.ML__series_ec{font-stretch:extra-condensed}.ML__series_c{font-stretch:condensed}.ML__series_sc{font-stretch:semi-condensed}.ML__series_sx{font-stretch:semi-expanded}.ML__series_x{font-stretch:expanded}.ML__series_ex{font-stretch:extra-expanded}.ML__series_ux{font-stretch:ultra-expanded}.ML__it{font-style:italic}.ML__shape_ol{-webkit-text-stroke:1px black;text-stroke:1px black;color:transparent}.ML__shape_sc{font-variant:small-caps}.ML__shape_sl{font-style:oblique}.ML__emph{color:#bc2612}.ML__emph .ML__emph{color:#0c7f99}.ML__highlight{color:#007cb2;background:#edd1b0}.ML__center{text-align:center}.ML__label_padding{padding:0 .5em}.ML__frac-line{width:100%;min-height:1px}.ML__frac-line:after{content:'';display:block;margin-top:-0.04em;min-height:.04em;-webkit-print-color-adjust:exact;print-color-adjust:exact;background:currentColor;box-sizing:content-box;transform:translate(0, 0)}.ML__sqrt{display:inline-block}.ML__sqrt-sign{display:inline-block;font-family:KaTeX_Main;position:relative}.ML__sqrt-line{display:inline-block;height:.04em;width:100%}.ML__sqrt-line:before{content:'';display:block;margin-top:-0.04em;min-height:.04em;-webkit-print-color-adjust:exact;print-color-adjust:exact;background:currentColor;transform:translate(0, 0)}.ML__sqrt-line:after{border-bottom-width:1px;content:' ';display:block;margin-top:-0.1em}.ML__sqrt-index{margin-left:.27777778em;margin-right:-0.55555556em}.ML__delim-size1{font-family:KaTeX_Size1}.ML__delim-size2{font-family:KaTeX_Size2}.ML__delim-size3{font-family:KaTeX_Size3}.ML__delim-size4{font-family:KaTeX_Size4}.ML__delim-mult .delim-size1>span{font-family:KaTeX_Size1}.ML__delim-mult .delim-size4>span{font-family:KaTeX_Size4}.ML__accent-body>span{font-family:KaTeX_Main;width:0}.ML__accent-vec>span{position:relative;left:.24em}.ML__mathlive{display:inline-block;direction:ltr;text-align:left;text-indent:0;text-rendering:auto;font-family:KaTeX_Main,'Times New Roman',serif;font-style:normal;font-size-adjust:none;font-stretch:normal;font-variant-caps:normal;letter-spacing:normal;line-height:1.2;word-wrap:normal;word-spacing:normal;white-space:nowrap;text-shadow:none;-webkit-user-select:none;user-select:none;width:min-content}.ML__mathlive .style-wrap{position:relative}.ML__mathlive .mfrac,.ML__mathlive .left-right{display:inline-block}.ML__mathlive .vlist-t{display:inline-table;table-layout:fixed;border-collapse:collapse}.ML__mathlive .vlist-r{display:table-row}.ML__mathlive .vlist{display:table-cell;vertical-align:bottom;position:relative}.ML__mathlive .vlist>span{display:block;height:0;position:relative}.ML__mathlive .vlist>span>span{display:inline-block}.ML__mathlive .vlist>span>.pstrut{overflow:hidden;width:0}.ML__mathlive .vlist-t2{margin-right:-2px}.ML__mathlive .vlist-s{display:table-cell;vertical-align:bottom;font-size:1px;width:2px;min-width:2px}.ML__mathlive .msubsup{text-align:left}.ML__mathlive .negativethinspace{display:inline-block;margin-left:-0.16667em;height:.71em}.ML__mathlive .thinspace{display:inline-block;width:.16667em;height:.71em}.ML__mathlive .mediumspace{display:inline-block;width:.22222em;height:.71em}.ML__mathlive .thickspace{display:inline-block;width:.27778em;height:.71em}.ML__mathlive .enspace{display:inline-block;width:.5em;height:.71em}.ML__mathlive .quad{display:inline-block;width:1em;height:.71em}.ML__mathlive .qquad{display:inline-block;width:2em;height:.71em}.ML__mathlive .llap,.ML__mathlive .rlap{width:0;position:relative;display:inline-block}.ML__mathlive .llap>.inner,.ML__mathlive .rlap>.inner{position:absolute}.ML__mathlive .llap>.fix,.ML__mathlive .rlap>.fix{display:inline-block}.ML__mathlive .llap>.inner{right:0}.ML__mathlive .rlap>.inner{left:0}.ML__mathlive .rule{display:inline-block;border:solid 0;position:relative;box-sizing:border-box}.ML__mathlive .overline .overline-line,.ML__mathlive .underline .underline-line{width:100%}.ML__mathlive .overline .overline-line:before,.ML__mathlive .underline .underline-line:before{border-bottom-style:solid;border-bottom-width:.04em;content:'';display:block}.ML__mathlive .overline .overline-line:after,.ML__mathlive .underline .underline-line:after{border-bottom-style:solid;border-bottom-width:.04em;min-height:thin;content:'';display:block;margin-top:-1px}.ML__mathlive .stretchy{display:block;position:absolute;width:100%;left:0;overflow:hidden}.ML__mathlive .stretchy:before,.ML__mathlive .stretchy:after{content:''}.ML__mathlive .stretchy svg{display:block;position:absolute;width:100%;height:inherit;fill:currentColor;stroke:currentColor;fill-rule:nonzero;fill-opacity:1;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1}.ML__mathlive .slice-1-of-2{display:inline-flex;position:absolute;left:0;width:50.2%;overflow:hidden}.ML__mathlive .slice-2-of-2{display:inline-flex;position:absolute;right:0;width:50.2%;overflow:hidden}.ML__mathlive .slice-1-of-3{display:inline-flex;position:absolute;left:0;width:25.1%;overflow:hidden}.ML__mathlive .slice-2-of-3{display:inline-flex;position:absolute;left:25%;width:50%;overflow:hidden}.ML__mathlive .slice-3-of-3{display:inline-flex;position:absolute;right:0;width:25.1%;overflow:hidden}.ML__mathlive .slice-1-of-1{display:inline-flex;position:absolute;width:100%;left:0;overflow:hidden}.ML__mathlive .nulldelimiter{width:.12em;display:inline-block}.ML__mathlive .op-group{display:inline-block}.ML__mathlive .op-symbol{position:relative}.ML__mathlive .op-symbol.small-op{font-family:KaTeX_Size1}.ML__mathlive .op-symbol.large-op{font-family:KaTeX_Size2}.ML__mathlive .accent>.vlist>span{text-align:center}.ML__mathlive .mtable .vertical-separator{display:inline-block;min-width:1px;box-sizing:border-box}.ML__mathlive .mtable .arraycolsep{display:inline-block}.ML__mathlive .mtable .col-align-m>.vlist-t{text-align:center}.ML__mathlive .mtable .col-align-c>.vlist-t{text-align:center}.ML__mathlive .mtable .col-align-l>.vlist-t{text-align:left}.ML__mathlive .mtable .col-align-r>.vlist-t{text-align:right}.ML__error{display:inline-block;background-image:radial-gradient(ellipse at center, hsl(341,100%,40%), rgba(0,0,0,0) 70%);background-color:hsla(341,100%,40%,0.1);background-repeat:repeat-x;background-size:3px 3px;padding-bottom:3px;background-position:0 100%}.ML__error>.ML__error{background:transparent;padding:0}.ML__composition{background:#fff1c2;color:black;text-decoration:underline var(--caret-color-computed, var(--ML__caret-color))}@media (prefers-color-scheme:dark){.ML__composition{background:#69571c;color:white}}.ML__placeholder{color:var(--placeholder-color, var(--ML__placeholder-color));opacity:var(--placeholder-opacity, .4);padding-left:.4ex;padding-right:.4ex;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif}.ML__placeholdercontainer{display:none}.ML__placeholdercontainer math-field{display:inline-block;position:absolute;z-index:1001;min-width:32px;padding-left:4px;padding-right:4px;border-radius:4px;border:1px solid var(--editable-border)}.ML__isReadOnly .ML__placeholdercontainer{display:block}.ML__notation{position:absolute;box-sizing:border-box}.ML__container{min-height:auto !important}";function fo(r){var e,t;typeof((e=r.listeners)==null?void 0:e.onSelectionDidChange)=="function"&&!r.suppressChangeNotifications&&(r.suppressChangeNotifications=!0,r.listeners.onSelectionDidChange(r),r.suppressChangeNotifications=!1),(t=r.mathfield.virtualKeyboard)==null||t.updateToolbar(r.mathfield)}function G(r,e={}){var i;if(r.suppressChangeNotifications||!r.mathfield.host)return!0;r.suppressChangeNotifications=!0;let t=r.mathfield.host.dispatchEvent(new InputEvent("beforeinput",D(y({},e),{data:e.data?e.data:(i=e.inputType)!=null?i:"",cancelable:!0,bubbles:!0,composed:!0})));return r.suppressChangeNotifications=!1,t}function Y(r,e){var t;r.suppressChangeNotifications||!r.mathfield.host||(r.suppressChangeNotifications=!0,r.mathfield.host.dispatchEvent(new InputEvent("input",D(y({},e),{data:e.data?e.data:(t=e.inputType)!=null?t:"",bubbles:!0,composed:!0}))),r.suppressChangeNotifications=!1)}function as(r,e){r.suppressChangeNotifications||!r.mathfield.host||(r.suppressChangeNotifications=!0,r.mathfield.host.dispatchEvent(new CustomEvent("placeholder-change",{detail:{placeholderId:e},bubbles:!0,composed:!0})),r.suppressChangeNotifications=!1)}var ya=class extends Z{constructor(){super("latex")}createAtom(e,t,i){return new ne(e,t)}onPaste(e,t){var o;if(!t)return!1;let i=typeof t=="string"?t:(o=t.getData("text/x-latex"))!=null?o:t.getData("text/plain");return i&&G(e.model,{inputType:"insertFromPaste",data:i})?(e.snapshot(),this.insert(e.model,i)&&(Y(e.model,{inputType:"insertFromPaste"}),oe(e)),!0):!1}insert(e,t,i){if(!G(e,{data:t,inputType:"insertText"}))return!1;i||(i={}),i.insertionMode||(i.insertionMode="replaceSelection"),i.selectionMode||(i.selectionMode="placeholder");let{suppressChangeNotifications:o}=e;i.suppressChangeNotifications&&(e.suppressChangeNotifications=!0);let a=e.suppressChangeNotifications;e.suppressChangeNotifications=!0,i.insertionMode==="replaceSelection"&&!e.selectionIsCollapsed?e.deleteAtoms(we(e.selection)):i.insertionMode==="replaceAll"?(e.root.setChildren([],"body"),e.position=0):i.insertionMode==="insertBefore"?e.collapseSelection("backward"):i.insertionMode==="insertAfter"&&e.collapseSelection("forward");let n=[];for(let c of t)cn.test(c)&&n.push(new ne(c,e.mathfield));let s=e.at(e.position);if(s instanceof Ze&&(s=s.lastChild),!(s.parent instanceof Ze)){let c=new Ze("",e.mathfield);s.parent.addChildAfter(c,s),s=c.firstChild}let l=s.parent.addChildrenAfter(n,s);return e.suppressChangeNotifications=a,i.selectionMode==="before"||(i.selectionMode==="item"?e.setSelection(e.anchor,e.offsetOf(l)):l&&(e.position=e.offsetOf(l))),Y(e,{data:t,inputType:"insertText"}),e.suppressChangeNotifications=o,!0}};function ns(r){return r.atoms.find(e=>e instanceof Ze)}function Sr(r){var t,i;let e=r.atoms.find(o=>o instanceof Ze);return e?(i=(t=e.body)==null?void 0:t.filter(o=>o instanceof ne))!=null?i:[]:[]}function go(r,e){var s;let t=0,i=!1,o=Number.isFinite(e==null?void 0:e.before)?(s=e==null?void 0:e.before)!=null?s:0:r.lastOffset;for(;t<=o&&!i;){let l=r.at(t);i=l instanceof ne&&l.isSuggestion,i||t++}if(!i)return[void 0,void 0];let a=t,n=!1;for(;a<=o&&!n;){let l=r.at(a);n=!(l instanceof ne&&l.isSuggestion),n||a++}return[t-1,a-1]}new ya;function wi(r){let e=Sr(r.model).filter(t=>t.isSuggestion);if(e.length!==0){r.model.position=r.model.offsetOf(e[0].leftSibling);for(let t of e)t.parent.removeChild(t)}}function Wr(r,e){var l;let{model:t}=r;wi(r);for(let c of Sr(t))c.isError=!1;if(!t.selectionIsCollapsed){Jr(r);return}let i=[],o=t.at(t.position);for(;o&&o instanceof ne&&/^[a-zA-Z\*]$/.test(o.value);)o=o.leftSibling;if(o&&o instanceof ne&&o.value==="\\")for(i.push(o),o=o.rightSibling;o&&o instanceof ne&&/^[a-zA-Z\*]$/.test(o.value);)i.push(o),o=o.rightSibling;let a=i.map(c=>c.value).join(""),n=a?fn(r,a):[];if(n.length===0){/^\\[a-zA-Z\*]+$/.test(a)&&i.forEach(c=>{c.isError=!0}),Jr(r);return}r.suggestionIndex=(l=e==null?void 0:e.atIndex)!=null?l:0,r.suggestionIndex<0&&(r.suggestionIndex=n.length-1);let s=n[r.suggestionIndex%n.length];if(s!==a){let c=i[i.length-1];c.parent.addChildrenAfter([...s.slice(a.length-s.length)].map(u=>new ne(u,r,{isSuggestion:!0})),c),oe(r)}ss(r,n)}function ba(r){let[e,t]=go(r,{before:r.position});if(e===void 0||t===void 0)return!1;let i=!1;return r.getAtoms([e,t]).forEach(o=>{o.isSuggestion&&(o.isSuggestion=!1,i=!0)}),i}function _t(r,e="accept",t){var s,l;Jr(r);let i=ns(r.model);if(!i)return!1;if(e==="accept-suggestion"){let c=Sr(r.model).filter(u=>u.isSuggestion);if(c.length===0)return!1;for(let u of c)u.isSuggestion=!1;return r.model.position=r.model.offsetOf(c[c.length-1]),!0}let a=Sr(r.model).filter(c=>!c.isSuggestion).map(c=>c.value).join(""),n=i.leftSibling;return i.parent.removeChild(i),r.model.position=r.model.offsetOf(n),r.mode=(s=t==null?void 0:t.mode)!=null?s:"math",e==="reject"||(Z.insert("math",r.model,a,{selectionMode:(l=t==null?void 0:t.selectItem)!=null&&l?"item":"placeholder",format:"latex"}),r.snapshot(),r.model.announce("replacement")),!0}var xa,va=null,ka=null;function Ec(r,e){let t=r,i=new g("root",t);i.body=be(e,t,{parseMode:"math"});let o=Zt(ht(new w(i.render(new B({registers:t.registers},{fontSize:We},"displaystyle")),{classes:"ML__base"})));return Ue(o,{classes:"ML__mathlive"}).toMarkup()}function ss(r,e){if(e.length===0||r.options.enablePopover===!1){Jr(r);return}e=e.slice(0,10);let t="<ul>";for(let o of e){let a=o,n=Ec(r,o),s=is(r.keybindings,a).join("<br>");t+=`<li role="button" data-command="${a}"><span class="ML__popover__latex">${a}</span><span class="ML__popover__command">${n}</span>`,s&&(t+=`<span class="ML__popover__keybinding">${s}</span>`),t+="</li>"}t+="</ul>",r.popover=Dc(r,t);let i=r.popover.querySelectorAll("ul li");for(let o of i)o.addEventListener("pointerdown",a=>a.preventDefault()),o.addEventListener("click",a=>{_t(r,"reject"),Z.insert("math",r.model,o.dataset.command,{selectionMode:"placeholder",format:"latex"}),r.dirty=!0,r.scrollIntoView(),r.focus()});setTimeout(()=>{let o=wr(r.field);o&&ls(r,o),r.popover&&(r.popover.classList.add("is-visible"),r.popoverVisible=!0)},32)}function Ur(r,e){var t;if(!(!r.element||r.element.mathfield!==r)&&!(!r.popover||!r.popoverVisible)){if(e!=null&&e.deferred){setTimeout(()=>Ur(r),100);return}if(((t=r.model.at(r.model.position))==null?void 0:t.type)!=="latex")Jr(r);else{let i=wr(r.field);i&&ls(r,i)}}}function ls(r,e){if(qi(),!r.popover||!r.popoverVisible)return;let t=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,i=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,o=window.innerWidth-document.documentElement.clientWidth,a=window.innerHeight-document.documentElement.clientHeight,n=r.virtualKeyboard.height;e.x+r.popover.offsetWidth/2>i-o?r.popover.style.left=`${i-r.popover.offsetWidth-o}px`:e.x-r.popover.offsetWidth/2<0?r.popover.style.left="0":r.popover.style.left=`${e.x-r.popover.offsetWidth/2}px`,e.y+r.popover.offsetHeight+5>t-a-n?(r.popover.classList.add("ML__popover--reverse-direction"),r.popover.style.top=`${e.y-e.height-r.popover.offsetHeight-5}px`):(r.popover.classList.remove("ML__popover--reverse-direction"),r.popover.style.top=`${e.y+5}px`)}function Jr(r){r.suggestionIndex=0,r.popoverVisible=!1,r.popover&&(r.popover.classList.remove("is-visible"),r.popover.innerHTML="")}function Dc(r,e){return r.popover?(r.popover.innerHTML=r.options.createHTML(e),r.popover):(r.popover=uo("mathlive-popover-panel"),xa===void 0&&(xa=Qe(ga).toString(36)),va=et(null,ga,xa),ka=et(null,He,Qe(He).toString(36)),r.popover.innerHTML=r.options.createHTML(e),r.popover)}function cs(r){mo(r.popover),va&&va.release(),ka&&ka.release(),delete r.popover}function Bc(r){let e=0;for(let t=0;t<r.length;t++)e=e*31+r.charCodeAt(t),e=e|0;return Math.abs(e)}function oe(r,e){r.dirty||(r.dirty=!0,requestAnimationFrame(()=>{Jt(r)&&r.dirty&&(r.atomBoundsCache=new Map,Pt(r,e),r.atomBoundsCache=void 0)}))}function Pc(r,e){var o;e=e!=null?e:{};let t=r.model.root.render(new B({registers:r.registers,atomIdsSettings:{seed:e.forHighlighting?Bc(g.serialize(r.model.root,{expandMacro:!1,defaultMode:r.options.defaultMode})):"random",groupNumbers:(o=e.forHighlighting)!=null?o:!1},renderPlaceholder:r.options.readOnly?(a,n)=>{if(n.placeholderId){let s=r.getPlaceholderField(n.placeholderId);return n.createMathfieldBox(a,s,n.placeholderId)}return n.createBox(a)}:void 0},{fontSize:We,letterShapeStyle:r.options.letterShapeStyle},r.options.defaultMode==="inline-math"?"textstyle":"displaystyle"));return Ue(ht(t,r.options.horizontalSpacingScale),{classes:"ML__mathlive",attributes:{translate:"no","aria-hidden":"true"}})}function Pt(r,e){var s;if(!Jt(r))return;e=e!=null?e:{};let{model:t}=r;t.root.caret="",t.root.isSelected=!1,t.root.containsCaret=!0;for(let l of t.atoms)l.caret="",l.isSelected=!1,l.containsCaret=!1;let i=!r.options.readOnly&&r.hasFocus();if(t.selectionIsCollapsed)t.at(t.position).caret=i?r.mode:"";else{let l=t.getAtoms(t.selection,{includeChildren:!0});for(let c of l)c.isSelected=!0}if(i){let l=t.at(t.position).parent;for(;l;)l.containsCaret=!0,l=l.parent}let o=Pc(r,e),a=r.field,n=a.classList.contains("ML__focused");n&&!i?a.classList.remove("ML__focused"):!n&&i&&a.classList.add("ML__focused"),a.innerHTML=r.options.createHTML(o.toMarkup()),r.fieldContent=a.querySelector(".ML__mathlive"),r.accessibleMathML.innerHTML=r.options.createHTML('<math xmlns="http://www.w3.org/1998/Math/MathML">'+V(t.root,r.options)+"</math>"),us(r),r.options.readOnly&&r.attachNestedMathfield(),(s=e.interactive)!=null&&s||setTimeout(()=>us(r),32),r.dirty=!1}function us(r){let e=r.field;if(!e)return;for(let n of e.querySelectorAll(".ML__selection, .ML__contains-highlight"))n.remove();if(!r.hasFocus())return;let t=r.model,i=parseFloat(getComputedStyle(e).width),a=e.getBoundingClientRect().width/i;if(a=isNaN(a)?1:a,t.selectionIsCollapsed){setTimeout(()=>Ur(r),32);let n=t.at(t.position);for(;n&&!(n.containsCaret&&n.displayContainsHighlight);)n=n.parent;if(n!=null&&n.containsCaret&&n.displayContainsHighlight){let s=oa(r,lr(r,n));if(s){s.left/=a,s.right/=a,s.top/=a,s.bottom/=a;let l=document.createElement("div");l.classList.add("ML__contains-highlight"),l.style.position="absolute",l.style.left=`${s.left}px`,l.style.top=`${s.top}px`,l.style.width=`${Math.ceil(s.right-s.left)}px`,l.style.height=`${Math.ceil(s.bottom-s.top-1)}px`,e.insertBefore(l,e.childNodes[0])}}return}for(let n of Oc(po(r,{excludeAtomsWithBackground:!0}))){n.left/=a,n.right/=a,n.top/=a,n.bottom/=a;let s=document.createElement("div");s.classList.add("ML__selection"),s.style.position="absolute",s.style.left=`${n.left}px`,s.style.top=`${n.top}px`,s.style.width=`${Math.ceil(n.right-n.left)}px`,s.style.height=`${Math.ceil(n.bottom-n.top-1)}px`,e.insertBefore(s,e.childNodes[0])}}function Oc(r){let e=[];for(let t of r){let i=!1;for(let o of e)if(t.left===o.left&&t.right===o.right&&t.top===o.top&&t.bottom===o.bottom){i=!0;break}i||e.push(t)}r=e,e=[];for(let t of r){let i=0;for(let o of r)if(t.left>=o.left&&t.right<=o.right&&t.top>=o.top&&t.bottom<=o.bottom&&(i+=1,i>1))break;i===1&&e.push(t)}return e}var Si=3,Ot={};function fe(r,e){e=e!=null?e:{target:"mathfield",canUndo:!1};for(let t of Object.keys(r))Ot[t],Ot[t]=D(y({},e),{fn:r[t]})}function Mr(r){var t;let e;return e=ee(r)?r[0]:r,e=e.replace(/-\w/g,i=>i[1].toUpperCase()),(t=Ot[e])==null?void 0:t.target}function ds(r,e){var s,l,c;if(!e)return!1;let t,i=[],o=!1,a=!1;ee(e)?(t=e[0],i=e.slice(1)):t=e,t=t.replace(/-\w/g,u=>u[1].toUpperCase());let n=(s=Ot[t])==null?void 0:s.target;if(n==="model"){if(r.options.readOnly&&/^(paste|cut|insert|delete|transpose|add)/.test(t))return r.model.announce("plonk"),!1;/^(delete|transpose|add)/.test(t)&&t!=="deleteBackward"&&r.flushInlineShortcutBuffer(),/^(delete|transpose|add)/.test(t)&&r.mode!=="latex"&&(r.popUndoStack(),r.snapshot()),r.mode==="latex"&&!/^(complete)/.test(t)&&wi(r),Ot[t].fn(r.model,...i),r.mode!=="latex"&&/^(delete|transpose|add)/.test(t)&&r.snapshot(),r.mode==="latex"&&Wr(r),a=!0,o=!0}else if(n==="virtual-keyboard")a=(c=(l=r.virtualKeyboard)==null?void 0:l.executeCommand(e))!=null?c:!1,o=!0;else if(Ot[t])/^(undo|redo)/.test(t)&&r.flushInlineShortcutBuffer(),a=Ot[t].fn(r,...i),o=!0;else throw new Error(`Unknown command "${t}"`);return n!=="virtual-keyboard"&&(!r.model.selectionIsCollapsed||/^(transpose|paste|complete|((moveToNextChar|moveToPreviousChar|extend).*))_$/.test(t))&&(r.flushInlineShortcutBuffer(),r.style={}),a&&oe(r),o}function Kc(r,e){r.focus(),r.options.keypressVibration&&Dr()&&navigator.vibrate(Si),e=e.replace(/-\w/g,i=>i[1].toUpperCase()),e==="moveToNextPlaceholder"||e==="moveToPreviousPlaceholder"||e==="complete"?r.playSound("return"):e==="deleteBackward"||e==="deleteForward"||e==="deletePreviousWord"||e==="deleteNextWord"||e==="deleteToGroupStart"||e==="deleteToGroupEnd"||e==="deleteToMathFieldStart"||e==="deleteToMathFieldEnd"?r.playSound("delete"):r.playSound("keypress");let t=r.executeCommand(e);return r.scrollIntoView(),t}fe({performWithFeedback:(r,e)=>Kc(r,e)});function zc(r){return Wr(r,{atIndex:r.suggestionIndex+1}),!1}function Rc(r){return Wr(r,{atIndex:r.suggestionIndex-1}),!1}fe({complete:_t,nextSuggestion:zc,previousSuggestion:Rc},{target:"mathfield",category:"autocomplete"});function _r(r,e,t){let i=D(y({},r),{textToSpeechMarkup:"",textToSpeechRulesOptions:D(y({},r.textToSpeechRulesOptions),{markup:"none"})});return e+Gt(t,i)}fe({speak:(r,e,t)=>Fc(r,e,t)},{target:"mathfield",category:"speech"});function Fc(r,e,t){var c,u;t=t!=null?t:{withHighlighting:!1};let{model:i}=r;function o(m){let d=null;switch(m){case"all":d=i.root;break;case"selection":d=i.getAtoms(i.selection);break;case"left":{d=i.getAtoms(i.offsetOf(i.at(i.position).leftSibling),i.position);break}case"right":{d=i.getAtoms(i.position,i.offsetOf(i.at(i.position).rightSibling));break}case"group":d=i.getAtoms(i.getSiblingsRange(i.position));break;case"parent":{let{parent:p}=i.at(i.position);p&&p.type!=="root"?d=p:d=i.root;break}default:d=i.root}return d}function a(m){let d="";switch(m){case"all":break;case"selection":d="no selection";break;case"left":d="at start";break;case"right":d="at end";break;case"group":break;case"parent":d="no parent";break;default:""+m;break}return d}let n=o(e);if(n===null)return(u=(c=r.options).speakHook)==null||u.call(c,a(e),r.options),!1;let s=y({},r.options);(t.withHighlighting||s.speechEngine==="amazon")&&(s.textToSpeechMarkup=globalThis.sre&&s.textToSpeechRules==="sre"?"ssml_step":"ssml");let l=Gt(n,s);return Se()&&t.withHighlighting?(ce().readAloudMathField=r,Pt(r,{forHighlighting:!0}),r.options.readAloudHook&&r.options.readAloudHook(r.field,l,r.options)):r.options.speakHook&&r.options.speakHook(l,s),!1}function ms(r,e){var t,i,o;if(Se()&&(e!=null||(e=(t=ce().config)!=null?t:{}),!!e))if(!e.speechEngine||e.speechEngine==="local"){let a=new SpeechSynthesisUtterance(r);window.speechSynthesis.speak(a)}else if(e.speechEngine==="amazon")if(!("AWS"in window))console.error("MathLive: AWS SDK not loaded. See https://www.npmjs.com/package/aws-sdk");else{let a=new globalThis.AWS.Polly({apiVersion:"2016-06-10"}),n={OutputFormat:"mp3",VoiceId:(i=e.speechEngineVoice)!=null?i:"Joanna",Engine:["Amy","Emma","Brian","Ivy","Joanna","Kendra","Kimberly","Salli","Joey","Justin","Matthew"].includes((o=e.speechEngineVoice)!=null?o:"Joanna")?"neural":"standard",Text:r,TextType:"ssml"};a.synthesizeSpeech(n,(s,l)=>{if(s)console.error("MathLive: polly.synthesizeSpeech() error:",s,s.stack);else if(l!=null&&l.AudioStream){let c=new Uint8Array(l.AudioStream),u=new Blob([c.buffer],{type:"audio/mpeg"}),m=URL.createObjectURL(u);new Audio(m).play().catch(p=>console.log(p))}})}else e.speechEngine==="google"&&console.error("MathLive: The Google speech engine is not supported yet. Please come again.")}function ps(r){if(r&&(r.classList.remove("ML__highlight"),r.children))for(let e of r.children)ps(e)}function wa(r,e){var t;r&&(!e||((t=r.dataset)==null?void 0:t.atomId)===e?(r.classList.add("ML__highlight"),r.children&&r.children.length>0&&[...r.children].forEach(i=>{i instanceof HTMLElement&&wa(i)})):(r.classList.remove("ML__highlight"),r.children&&r.children.length>0&&[...r.children].forEach(i=>{i instanceof HTMLElement&&wa(i,e)})))}function hs(r,e,t){var a;if(!Se())return;if(t!=null||(t=ce().config),t.speechEngine!=="amazon"){console.error("MathLive: Use Amazon TTS Engine for synchronized highlighting"),t.speakHook&&t.speakHook(e,t);return}if(!globalThis.AWS){console.error("MathLive: AWS SDK not loaded. See https://www.npmjs.com/package/aws-sdk");return}let i=new globalThis.AWS.Polly({apiVersion:"2016-06-10"}),o={OutputFormat:"json",VoiceId:(a=t.speechEngineVoice)!=null?a:"Joanna",Engine:"standard",Text:e,TextType:"ssml",SpeechMarkTypes:["ssml"]};ce().readAloudElement=r,i.synthesizeSpeech(o,(n,s)=>{if(n){console.error("MathLive: polly.synthesizeSpeech() error:",n,n.stack);return}if(!(s!=null&&s.AudioStream))return;let l=new TextDecoder("utf-8").decode(new Uint8Array(s.AudioStream));ce().readAloudMarks=l.split(`
`).map(c=>c?JSON.parse(c):{}),ce().readAloudTokens=[];for(let c of ce().readAloudMarks)c.value&&ce().readAloudTokens.push(c.value);ce().readAloudCurrentMark="",o.OutputFormat="mp3",o.SpeechMarkTypes=[],i.synthesizeSpeech(o,(c,u)=>{if(c){console.error("MathLive: polly.synthesizeSpeech(",e,") error:",c,c.stack);return}if(!(u!=null&&u.AudioStream))return;let m=new Uint8Array(u.AudioStream),d=new Blob([m.buffer],{type:"audio/mpeg"}),p=URL.createObjectURL(d),f=ce();f.readAloudAudio?f.readAloudAudio.pause():(f.readAloudAudio=new Audio,f.readAloudAudio.addEventListener("ended",()=>{let b=f.readAloudMathField;f.readAloudStatus="ended",document.body.dispatchEvent(new Event("read-aloud-status-change",{bubbles:!0,composed:!0})),b?(Pt(b),f.readAloudElement=null,f.readAloudMathField=null,f.readAloudTokens=[],f.readAloudMarks=[],f.readAloudCurrentMark=""):ps(f.readAloudElement)}),f.readAloudAudio.addEventListener("timeupdate",()=>{let b="",M=f.readAloudAudio.currentTime*1e3+100;for(let S of f.readAloudMarks)S.time<M&&(b=S.value);f.readAloudCurrentMark!==b&&(f.readAloudCurrentToken=b,b&&b===f.readAloudFinalToken?f.readAloudAudio.pause():(f.readAloudCurrentMark=b,wa(f.readAloudElement,f.readAloudCurrentMark)))})),f.readAloudAudio.src=p,f.readAloudStatus="playing",document.body.dispatchEvent(new Event("read-aloud-status-change",{bubbles:!0,composed:!0})),f.readAloudAudio.play()})})}function Mi(r,e){var i,o,a;let t=ur(r,Object.keys(r));for(let n of Object.keys(e))switch(n){case"scriptDepth":if(ee(e.scriptDepth))t.scriptDepth=[e.scriptDepth[0],e.scriptDepth[1]];else if(typeof e.scriptDepth=="number")t.scriptDepth=[e.scriptDepth,e.scriptDepth];else throw new TypeError("Unexpected value for scriptDepth");break;case"locale":e.locale==="auto"?t.locale=navigator.language.slice(0,5):t.locale=e.locale,ae.locale=t.locale;break;case"strings":ae.merge(e.strings),t.strings=ae.strings;break;case"virtualKeyboardLayout":t.virtualKeyboardLayout=e.virtualKeyboardLayout;break;case"virtualKeyboardMode":let s=e.virtualKeyboardMode.toLowerCase();s==="auto"?t.virtualKeyboardMode=$i()?"onfocus":"off":t.virtualKeyboardMode=s;break;case"customVirtualKeyboardLayers":t.customVirtualKeyboardLayers=y(y({},t.customVirtualKeyboardLayers),e.customVirtualKeyboardLayers);break;case"customVirtualKeyboards":t.customVirtualKeyboards=y(y({},t.customVirtualKeyboards),e.customVirtualKeyboards);break;case"letterShapeStyle":e.letterShapeStyle==="auto"?ae.locale.startsWith("fr")?t.letterShapeStyle="french":t.letterShapeStyle="tex":t.letterShapeStyle=e.letterShapeStyle;break;case"plonkSound":e.plonkSound!==void 0&&(t.plonkSound=e.plonkSound);break;case"keypressSound":e.keypressSound===null?t.keypressSound={default:null,delete:null,return:null,spacebar:null}:typeof e.keypressSound=="string"?t.keypressSound={delete:e.keypressSound,return:e.keypressSound,spacebar:e.keypressSound,default:e.keypressSound}:typeof e.keypressSound=="object"&&"default"in e.keypressSound&&(t.keypressSound=y({},e.keypressSound),t.keypressSound.delete=(i=t.keypressSound.delete)!=null?i:e.keypressSound.default,t.keypressSound.return=(o=t.keypressSound.return)!=null?o:e.keypressSound.default,t.keypressSound.spacebar=(a=t.keypressSound.spacebar)!=null?a:e.keypressSound.default);break;case"computeEngine":t.computeEngine=e.computeEngine;break;case"virtualKeyboardContainer":t.virtualKeyboardContainer=e.virtualKeyboardContainer;break;case"macros":t.macros=Ji(e.macros);break;default:ee(e[n])?t[n]=[...e[n]]:typeof e[n]=="object"?t[n]=y({},e[n]):t[n]=e[n]}return t}function ur(r,e){let t;typeof e=="string"?t=[e]:e===void 0?t=Object.keys(r):t=e;let i={};for(let o of t)r[o]===null?i[o]=null:ee(r[o])?i[o]=[...r[o]]:typeof r[o]=="object"&&!(r[o]instanceof Element)&&o!=="computeEngine"?i[o]=y({},r[o]):i[o]=r[o];return typeof e=="string"?i[e]:i}var Sa='<span style="width: 21px; margin-top: 4px;"><svg style="width: 21px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M528 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h480c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm16 336c0 8.823-7.177 16-16 16H48c-8.823 0-16-7.177-16-16V112c0-8.823 7.177-16 16-16h480c8.823 0 16 7.177 16 16v288zM168 268v-24c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12zm96 0v-24c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12zm96 0v-24c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12zm96 0v-24c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12zm-336 80v-24c0-6.627-5.373-12-12-12H84c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12zm384 0v-24c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12zM120 188v-24c0-6.627-5.373-12-12-12H84c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12zm96 0v-24c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12zm96 0v-24c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12zm96 0v-24c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12zm96 0v-24c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v24c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12zm-96 152v-8c0-6.627-5.373-12-12-12H180c-6.627 0-12 5.373-12 12v8c0 6.627 5.373 12 12 12h216c6.627 0 12-5.373 12-12z"/></svg></span>';function _i(){var r,e,t;return{readOnly:!1,createHTML:i=>i,fontsDirectory:"./fonts",soundsDirectory:"./sounds",computeEngine:void 0,defaultMode:"math",macros:Kr(),registers:{},colorMap:pr,backgroundColorMap:Br,horizontalSpacingScale:1,letterShapeStyle:ae.locale.startsWith("fr")?"french":"tex",smartMode:!1,smartFence:!0,smartSuperscript:!0,scriptDepth:[1/0,1/0],removeExtraneousParentheses:!0,mathModeSpace:"",decimalSeparator:".",fractionNavigationOrder:"numerator-denominator",placeholderSymbol:"\u25A2",enablePopover:!0,locale:ae.locale,strings:ae.strings,keybindings:ho,inlineShortcuts:so,inlineShortcutTimeout:0,virtualKeyboardToggleGlyph:Sa,virtualKeyboardMode:"auto",virtualKeyboards:"all",virtualKeyboardLayout:"auto",customVirtualKeyboardLayers:{},customVirtualKeyboards:{},virtualKeyboardTheme:/android|cros/i.test(navigator.userAgent)?"material":"apple",keypressVibration:!0,keypressSound:null,plonkSound:null,virtualKeyboardToolbar:"default",virtualKeyboardContainer:(e=(r=globalThis.document)==null?void 0:r.body)!=null?e:null,useSharedVirtualKeyboard:!1,sharedVirtualKeyboardTargetOrigin:(t=globalThis.window)==null?void 0:t.origin,originValidator:"same-origin",textToSpeechRules:"mathlive",textToSpeechMarkup:"",textToSpeechRulesOptions:{},speechEngine:"local",speechEngineVoice:"Joanna",speechEngineRate:"100%",speakHook:ms,readAloudHook:hs,onInlineShortcut:()=>"",onExport:Vn,value:""}}function yo(r){return r.defaultMode==="inline-math"?"math":r.defaultMode}var Ma="@keyframes ML__caret-blink{0%,100%{opacity:1}50%{opacity:0}}.ML__caret:after{content:'';border:none;border-radius:2px;border-right:2px solid var(--caret-color, var(--ML__caret-color));margin-right:-2px;position:relative;left:-1px;animation:ML__caret-blink 1.05s step-end forwards infinite}.ML__text-caret:after{content:'';border:none;border-radius:1px;border-right:1px solid var(--caret-color, var(--ML__caret-color));margin-right:-1px;position:relative;left:0;animation:ML__caret-blink 1.05s step-end forwards infinite}.ML__latex-caret:after{content:'_';border:none;margin-right:0;margin-right:calc(-1ex - 2px);position:relative;color:var(--caret-color, var(--ML__caret-color));animation:ML__caret-blink 1.05s step-end forwards infinite}.ML__container{display:flex;flex-flow:row;justify-content:space-between;align-items:flex-end;min-height:39px;width:100%;isolation:isolate;touch-action:none;--ML__selection-background-color:hsl(var(--hue, 212), 97%, 85%);--ML__text-highlight-background-color:hsla(var(--hue, 212), 40%, 50%, .1);--ML__contains-highlight-background-color:hsl(var(--hue, 212), 40%, 95%);--ML__selection-color:currentColor;--ML__caret-color:hsl(var(--hue, 212), 40%, 49%);--ML__smart-fence-color:currentColor;--ML__latex-color:var(--primary, hsl(var(--hue, 212), 40%, 50%));--ML__placeholder-color:hsl(var(--hue, 212), 40%, 49%)}@media (prefers-color-scheme:dark){.ML__container{--ML__selection-background-color:hsl(var(--hue, 212), 25%, 45%);--ML__text-highlight-background-color:hsla(var(--hue, 212), 40%, 50%, .2);--ML__contains-highlight-background-color:hsl(var(--hue, 212), 5%, 34%);--ML__caret-color:hsl(var(--hue, 212), 60%, 69%);--ML__latex-color:var(--primary, hsl(var(--hue, 212), 40%, 50%));--ML__placeholder-color:hsl(var(--hue, 212), 60%, 69%)}}.ML__content{display:flex;align-items:center;align-self:center;position:relative;overflow:hidden;padding:2px 0 2px 1px;width:100%}.ML__virtual-keyboard-toggle{display:none;box-sizing:border-box}.ML__virtual-keyboard-toggle>span{display:flex;align-self:center;align-items:center}.ML__virtual-keyboard-toggle.is-visible{display:flex;align-self:center;align-items:center;flex-shrink:0;flex-direction:column;justify-content:center;width:34px;height:34px;padding:0;margin-right:4px;cursor:pointer;border-radius:8px;border:1px solid transparent;transition:background .2s cubic-bezier(.64, .09, .08, 1);color:var(--primary, hsl(var(--hue, 212), 40%, 50%));fill:currentColor;background:transparent}.ML__virtual-keyboard-toggle.is-visible:hover{background:hsla(0,0%,70%,0.5);color:#333;fill:currentColor;border-radius:8px}.ML__keyboard-sink{display:inline-block;resize:none;outline:none;border:none;position:fixed;clip:rect(0 0 0 0);font-size:1em;font-family:KaTeX_Main}.ML__focused .ML__text{background:var(--highlight-text, var(--ML__text-highlight-background-color))}.ML__smart-fence__close{opacity:var(--smart-fence-opacity, .5);color:var(--smart-fence-color, var(--ML__smart-fence-color))}.ML__focused .ML__selection{background:var(--selection-background-color-focused, var(--selection-background-color, var(--ML__selection-background-color))) !important}.ML__focused .ML__selected,.ML__focused .ML__selected .ML__contains-caret,.ML__focused .ML__selected .ML__smart-fence__close,.ML__focused .ML__selected .ML__placeholder{color:var(--selection-color-focused, var(--selection-color, var(--ML__selection-color))) !important}.ML__selection{box-sizing:border-box;background:var(--selection-background-color, var(--ML__selection-background-color)) !important}.ML__selected,.ML__selected .ML__contains-caret,.ML__selected .ML__smart-fence__close,.ML__selected .ML__placeholder{color:var(--selection-color, var(--ML__selection-color));opacity:1}.ML__contains-caret.ML__close,.ML__contains-caret.ML__open,.ML__contains-caret>.ML__close,.ML__contains-caret>.ML__open,.ML__contains-caret .ML__sqrt-sign,.ML__contains-caret .ML__sqrt-line{color:var(--caret-color, var(--ML__caret-color))}.ML__contains-highlight{background:var(--contains-highlight-backround-color, var(--ML__contains-highlight));box-sizing:border-box}.ML__latex{font-family:'IBM Plex Mono','Source Code Pro',Consolas,'Roboto Mono',Menlo,'Bitstream Vera Sans Mono','DejaVu Sans Mono',Monaco,Courier,monospace;font-weight:400;color:var(--latex-color, var(--ML__latex-color))}.ML__suggestion{opacity:.5}.ML__virtual-keyboard-toggle.is-visible.is-pressed:hover{background:hsl(var(--hue, 212), 25%, 35%);color:#fafafa;fill:currentColor}.ML__virtual-keyboard-toggle:focus{outline:none;border-radius:8px;border:2px solid var(--primary, hsl(var(--hue, 212), 40%, 50%))}.ML__virtual-keyboard-toggle.is-pressed,.ML__virtual-keyboard-toggle.is-active:hover,.ML__virtual-keyboard-toggle.is-active{background:hsl(var(--hue, 212), 25%, 35%);color:#fafafa;fill:currentColor}.ML__tooltip-container{position:relative;transform:scale(0)}.ML__tooltip-container .ML__tooltip-content{position:fixed;display:inline-table;visibility:hidden;z-index:2;width:max-content;max-width:400px;padding:12px 12px;border-radius:8px;background:#616161;color:#fff;box-shadow:0 2px 2px 0 rgba(0,0,0,0.14),0 1px 5px 0 rgba(0,0,0,0.12),0 3px 1px -2px rgba(0,0,0,0.2);opacity:0;transition:opacity .15s cubic-bezier(.4, 0, 1, 1)}.ML__tooltip-container .ML__tooltip-content .ML__text{white-space:normal}.ML__tooltip-container .ML__tooltip-content .ML__base{display:contents}.ML__tooltip-container:hover .ML__tooltip-content{visibility:visible;opacity:1;font-size:.75em;transform:scale(1) translate(0, 3em)}[data-ML__tooltip]{position:relative}[data-ML__tooltip][data-placement='top']::after{top:inherit;bottom:100%}[data-ML__tooltip]::after{content:attr(data-ML__tooltip);position:absolute;display:none;z-index:2;right:110%;width:max-content;max-width:200px;padding:8px 8px;border-radius:2px;background:#616161;color:#fff;box-shadow:0 2px 2px 0 rgba(0,0,0,0.14),0 1px 5px 0 rgba(0,0,0,0.12),0 3px 1px -2px rgba(0,0,0,0.2);text-align:center;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif;font-weight:400;font-size:12px;opacity:0;transform:scale(.5);transition:all .15s cubic-bezier(.4, 0, 1, 1)}@media only screen and (max-width:767px){[data-ML__tooltip]::after{padding:8px 16px;font-size:16px}}:not(.tracking) [data-ML__tooltip]:hover{position:relative}:not(.tracking) [data-ML__tooltip]:hover::after{visibility:visible;display:inline-table;opacity:1;transform:scale(1)}[data-ML__tooltip][data-delay]::after{transition-delay:0s}[data-ML__tooltip][data-delay]:hover::after{transition-delay:1s}";function Ic(){let r=String(new Error().stack).replace(/^Error.*\n/,"").split(`
`);if(r.length===0)return console.error(`Can't use relative paths to specify assets location because the sourcefile location could not be determined (unexpected stack trace format "${new Error().stack}").`),"";let e=r[1],t=e.match(/http.*\.ts[\?:]/);return t&&(e=r[2]),t=e.match(/(https?:.*):[0-9]+:[0-9]+/),t||(t=e.match(/at (.*(\.ts))[\?:]/),t||(t=e.match(/at (.*(\.mjs|\.js))[\?:]/))),t?t[1]:(console.error(r),console.error(`Can't use relative paths to specify assets location because the source file location could not be determined (unexpected location "${e}").`),"")}var Ai=null,fs,gs,_a=((gs=(fs=globalThis==null?void 0:globalThis.document)==null?void 0:fs.currentScript)==null?void 0:gs.src)||Ic();async function bo(r){if(/^(?:[a-z+]+:)?\/\//i.test(r))return new URL(r).href;if(Ai===null)try{let e=await fetch(_a,{method:"HEAD"});e.status===200&&(Ai=e.url)}catch(e){console.error(`Invalid URL "${r}" (relative to "${_a}")`)}return new URL(r,Ai!=null?Ai:_a).href}function qc(r,e,t={}){return new FontFace(r,`url(${e}.woff2) format('woff2')`,t)}async function jr(r){var t;if(!(document.body.classList.contains("ML__fonts-loading")||(t=getComputedStyle(document.documentElement).getPropertyValue("--ML__static-fonts"))!=null&&t)&&(document.body.classList.remove("ML__fonts-did-not-load"),"fonts"in document)){let i=["KaTeX_Main","KaTeX_Math","KaTeX_AMS","KaTeX_Caligraphic","KaTeX_Fraktur","KaTeX_SansSerif","KaTeX_Script","KaTeX_Typewriter","KaTeX_Size1","KaTeX_Size2","KaTeX_Size3","KaTeX_Size4"],o=Array.from(document.fonts).map(s=>s.family);if(i.every(s=>o.includes(s)))return;document.body.classList.add("ML__fonts-loading");let a=await bo(r!=null?r:"./fonts");if(!a){document.body.classList.add("ML__fonts-did-not-load"),document.body.classList.remove("ML__fonts-loading");return}let n=[["KaTeX_Main-Regular"],["KaTeX_Main-BoldItalic",{style:"italic",weight:"bold"}],["KaTeX_Main-Bold",{weight:"bold"}],["KaTeX_Main-Italic",{style:"italic"}],["KaTeX_Math-Italic",{style:"italic"}],["KaTeX_Math-BoldItalic",{style:"italic",weight:"bold"}],["KaTeX_AMS-Regular"],["KaTeX_Caligraphic-Regular"],["KaTeX_Caligraphic-Bold",{weight:"bold"}],["KaTeX_Fraktur-Regular"],["KaTeX_Fraktur-Bold",{weight:"bold"}],["KaTeX_SansSerif-Regular",{style:"italic"}],["KaTeX_SansSerif-Bold",{weight:"bold"}],["KaTeX_SansSerif-Italic",{style:"italic"}],["KaTeX_Script-Regular"],["KaTeX_Typewriter-Regular"],["KaTeX_Size1-Regular"],["KaTeX_Size2-Regular"],["KaTeX_Size3-Regular"],["KaTeX_Size4-Regular"]].map(s=>qc(s[0].replace(/-[a-zA-Z]+$/,""),a+"/"+s[0],s[1]));try{(await Promise.all(n.map(l=>{try{return l.load()}catch(c){}}))).forEach(l=>document.fonts.add(l))}catch(s){console.error(`The MathLive fonts could not be loaded from "${a}"`,{cause:s}),document.body.classList.add("ML__fonts-did-not-load")}document.body.classList.remove("ML__fonts-loading")}}function Kt(r){return typeof r=="number"&&!Number.isNaN(r)}function Ar(r){return Array.isArray(r)&&r.length===2}function Xr(r){return r!=null&&typeof r=="object"&&"ranges"in r&&Array.isArray(r.ranges)}var Li={"\\ne":"\u2260","\\neq":"\u2260","\u2212":"-","-":"-","\\alpha":"alpha","\\beta":"beta","\\gamma":"gamma","\\delta":"delta","\\epsilon":"epsilon","\\varepsilon":"varepsilon","\\zeta":"zeta","\\eta":"eta","\\theta":"theta","\\vartheta":"vartheta","\\iota":"iota","\\kappa":"kappa","\\lambda":"lambda","\\mu":"mu","\\nu":"nu","\\xi":"xi","\\pi":"pi","\\rho":"rho","\\sigma":"sigma","\\tau":"tau","\\upsilon":"upsilon","\\phi":"phi","\\varphi":"varphi","\\chi":"chi","\\psi":"psi","\\omega":"omega","\\Gamma":"Gamma","\\Delta":"Delta","\\Theta":"Theta","\\Lambda":"Lambda","\\Xi":"Xi","\\Pi":"Pi","\\Sigma":"Sigma","\\Phi":"Phi","\\Psi":"Psi","\\Omega":"Omega","\\exponentialE":"e","\\imaginaryI":"i","\\imaginaryJ":"j","\\!":" ","\\,":" ","\\:":" ","\\;":" ","\\enskip":" ","\\enspace":" ","\\qquad":" ","\\quad":" "},Aa={"\\pm":"+-","\\times":"xx","\\colon":":","\\vert":"|","\\Vert":"||","\\mid":"|","\\lbrace":"{","\\rbrace":"}","\\lparen":"(","\\rparen":")","\\langle":"(:","\\rangle":":)"};function he(r){var o,a,n,s,l,c,u,m,d,p,f,b,M;if(!r)return"";if(ee(r)){if(r.length===0||(r[0].type==="first"&&(r=r.slice(1)),r.length===0))return"";let S="";if(r[0].mode==="latex")for(let L of r)S+=he(L);else if(r[0].mode==="text"){let L=0;for(S='"';((o=r[L])==null?void 0:o.mode)==="text";)S+=r[L].body?he(r[L].body):r[L].value,L++;S+='"'+he(r.slice(L))}else if(r[0].mode==="math"){let L=0;for(;r[L]&&r[L].mode==="math";)S+=he(r[L]),L++;S+=he(r.slice(L))}else console.warn("toASCIIMath: Unexpected mode");return S.trim()}if(r.mode==="text")return'"'+r.value+'"';let e="",{command:t}=r,i;switch(r.type){case"first":return"";case"group":case"root":e=(a=Li[t])!=null?a:he(r.body);break;case"genfrac":{let x=r;(x.leftDelim||x.rightDelim)&&(e+=x.leftDelim==="."||!x.leftDelim?"{:":x.leftDelim),x.hasBarLine?(e+="(",e+=he(x.above),e+=")/(",e+=he(x.below),e+=")"):(e+="("+he(x.above)+"),",e+="("+he(x.below)+")"),(x.leftDelim||x.rightDelim)&&(e+=x.rightDelim==="."||!x.rightDelim?"{:":x.rightDelim)}break;case"surd":e+=r.hasEmptyBranch("above")?"sqrt("+he(r.body)+")":"root("+he(r.above)+")("+he(r.body)+")";break;case"latex":e=r.value;break;case"leftright":{let x=r;e+=x.leftDelim==="."||!x.leftDelim?"{:":x.leftDelim,e+=he(x.body),e+=x.rightDelim==="."||!x.rightDelim?":}":x.rightDelim}break;case"sizeddelim":case"delim":break;case"overlap":break;case"overunder":break;case"mord":e=(s=(n=Li[t])!=null?n:t)!=null?s:typeof r.value=="string"?r.value:"",e.startsWith("\\")&&(e+=" "),i=t?t.match(/{?\\char"([\dabcdefABCDEF]*)}?/):null,i?e=String.fromCodePoint(Number.parseInt("0x"+i[1])):e.length>0&&e.startsWith("\\")&&(e=typeof r.value=="string"?r.value.charAt(0):r.command);break;case"mbin":case"mrel":case"minner":e=(c=(l=Li[t])!=null?l:Aa[t])!=null?c:r.value;break;case"mopen":case"mclose":e+=r.value;break;case"mpunct":e=(u=Aa[t])!=null?u:t;break;case"mop":r.value!=="\u200B"&&(e="",e+=t==="\\operatorname"?he(r.body):(m=r.value)!=null?m:t,e+=" ");break;case"array":let S=r.array,L=r.environmentName,E=(d={bmatrix:["[","]"],"bmatrix*":["[","]"]}[L])!=null?d:["(",")"],A=[];for(let x of S){let P=[];for(let K of x)P.push(E[0]+he(K)+E[1]);A.push(P.join(","))}let v=(p={bmatrix:["[","]"],"bmatrix*":["[","]"],cases:["{",":}"]}[L])!=null?p:["(",")"];e=v[0]+A.join(",")+v[1];break;case"box":break;case"spacing":e=(f=Li[t])!=null?f:" ";break;case"enclose":e="("+he(r.body)+")";break;case"space":e=" ";break;case"msubsup":e="";break;case"macro":e=(M=(b=Li[t])!=null?b:Aa[t])!=null?M:he(r.body);break}if(!r.hasEmptyBranch("subscript")){e+="_";let S=he(r.subscript);e+=S.length>1?"("+S+")":S}if(!r.hasEmptyBranch("superscript")){e+="^";let S=he(r.superscript);e+=S.length>1?"("+S+")":S}return e}function ys(r){let e;if(r.treeBranch==="body")e={enclose:"cross out",leftright:"delimiter",surd:"square root",root:"math field",mop:"operator"}[r.type];else if(r.parent.type==="genfrac"){if(r.treeBranch==="above")return"numerator";if(r.treeBranch==="below")return"denominator"}else r.parent.type==="surd"?r.treeBranch==="above"&&(e="index"):r.treeBranch==="superscript"?e="superscript":r.treeBranch==="subscript"&&(e="subscript");return e!=null?e:"parent"}function bs(r,e,t,i){let o="";e==="plonk"?(r.playSound("plonk"),r.flushInlineShortcutBuffer()):e==="delete"?o=_r(r.options,"deleted: ",i):e==="focus"||e.includes("move")?o=$c(r.model,t)+(r.model.selectionIsCollapsed?"":"selected: ")+Vc(r.model,r.options):e==="replacement"?o=_r(r.options,"",r.model.at(r.model.position)):e==="line"?(o=_r(r.options,"",r.model.root),r.keyboardDelegate.setAriaLabel("after: "+o)):o=i?_r(r.options,e+" ",i):e;let a=r.ariaLiveText.textContent.includes("\xA0")?" \u202F ":" \xA0 ";r.ariaLiveText.textContent=o+a}function $c(r,e){if(Number.isNaN(e))return"";let t=r.at(e);if(!t||t.treeDepth<=r.at(r.position).treeDepth)return"";let i="",o=t.parent,a=r.at(r.position).parent;for(;o!==r.root&&o!==a;)i+=`out of ${ys(o)};`,o=o.parent;return i}function Vc(r,e){if(!r.selectionIsCollapsed)return _r(e,"",r.getAtoms(r.selection));let t="",i=r.at(r.position),o=ys(i);return i.isFirstSibling&&(t=(o?"start of "+o:"unknown")+": "),i.isLastSibling?i.isFirstSibling||(t+=o?"end of "+o:"unknown"):t+=_r(e,"",i),t}var Ci=class{constructor(e,t,i){this.options=e,this._selection={ranges:[[0,0]],direction:"none"},this._anchor=0,this._position=0,this.mathfield=i,this.suppressChangeNotifications=!1,this.root=new g("root",i,{mode:e.mode}),this.root.body=[],this.setListeners(t)}get atoms(){return this.root.children}get selection(){return this._selection}set selection(e){this.setSelection(e)}setSelection(e,t){return this.deferNotifications({selection:!0},()=>{let i=this.normalizeSelection(e,t);if(i===void 0)throw new TypeError("Invalid selection");if(i.ranges.length===1&&i.ranges[0][0]===i.ranges[0][1]){let o=i.ranges[0][0];o>=0&&o<=this.lastOffset,this._position=o,this._anchor=o,this._selection=i}else{let o=we(i);i.direction==="backward"?[this._position,this._anchor]=o:[this._anchor,this._position]=o;let a=this.at(o[0]+1),n=this.at(o[1]),s=g.commonAncestor(a,n);(s==null?void 0:s.type)==="array"&&a.parent===s&&n.parent===s?this._selection={ranges:[o],direction:i.direction}:this._selection={ranges:[o],direction:i.direction},this._position>=0&&this._position<=this.lastOffset}})}setPositionHandlingPlaceholder(e){var t,i,o;((t=this.at(e))==null?void 0:t.type)==="placeholder"?this.setSelection(e-1,e):((o=(i=this.at(e))==null?void 0:i.rightSibling)==null?void 0:o.type)==="placeholder"?this.setSelection(e,e+1):this.position=e}getState(){return{content:this.root.toJson(),selection:this.selection}}setState(e,t){var a;let i=this.suppressChangeNotifications;this.suppressChangeNotifications=(a=t==null?void 0:t.suppressChangeNotifications)!=null?a:!0;let o={};(t==null?void 0:t.type)==="undo"&&(o={inputType:"historyUndo"}),(t==null?void 0:t.type)==="redo"&&(o={inputType:"historyRedo"}),G(this,o)&&(this.root=$e(e.content,this.mathfield),this.selection=e.selection,Y(this,o)),this.suppressChangeNotifications=i}get position(){return this._position}set position(e){this.setSelection(e,e)}get anchor(){return this._anchor}get selectionIsCollapsed(){return this._anchor===this._position}get selectionIsPlaceholder(){return Math.abs(this._anchor-this._position)===1?this.at(Math.max(this._anchor,this._position)).type==="placeholder":!1}collapseSelection(e="forward"){return this._anchor===this._position?!1:(e==="backward"?this.position=Math.min(this._anchor,this._position):this.position=Math.max(this._anchor,this._position),!0)}get lastOffset(){return this.atoms.length-1}at(e){return this.atoms[e]}offsetOf(e){return this.atoms.indexOf(e)}getSiblingsRange(e){let t=this.at(e),{parent:i}=t;if(!i)return[0,this.lastOffset];let o=t.parent.branch(t.treeBranch);return[this.offsetOf(o[0]),this.offsetOf(o[o.length-1])]}getBranchRange(e,t){let i=this.at(e).branch(t);return[this.offsetOf(i[0]),this.offsetOf(i[i.length-1])]}getAtoms(e,t,i){let o=i!=null?i:{};if(Xr(e)){if(o=t!=null?t:{},e.ranges.length>1)return e.ranges.reduce((u,m)=>[...u,...this.getAtoms(m,o)],[]);e=e.ranges[0]}let a,n;if(Kt(e)){if(a=e,!Kt(t))return[];n=t}else[a,n]=e,o=t!=null?t:{};if(!Number.isFinite(a))return[];o.includeChildren===void 0&&(o.includeChildren=!1),a<0&&(a=this.lastOffset-a+1),n<0&&(n=this.lastOffset-n+1);let s=Math.min(a,n)+1,l=Math.max(a,n);if(s===1&&l===this.lastOffset)return[this.root];let c=[];for(let u=s;u<=l;u++){let m=this.atoms[u];xs(this,m,s,l)&&c.push(m)}return o.includeChildren||(c=c.filter(u=>{let m=!1,{parent:d}=u;for(;d&&!m;)m=xs(this,d,s,l),d=d.parent;return!m})),c}getAllAtoms(e){let t=[],i=this.lastOffset;for(let o=e;o<=i;o++)t.push(this.atoms[o]);for(let o=0;o<e;o++)t.push(this.atoms[o]);return t}extractAtoms(e){let t=this.getAtoms(e);t.length===1&&t[0].type==="root"&&(t=t[0].children);for(let i of t)i.parent.removeChild(i);return t}deleteAtoms(e){this.extractAtoms(e),this.position=e[0]}atomToString(e,t){let i=t!=null?t:"latex";if(i.startsWith("latex"))return De.serialize([e],{expandMacro:i==="latex-expanded",skipStyles:i==="latex-unstyled",defaultMode:this.mathfield.options.defaultMode});if(i==="math-ml")return V(e,this.mathfield.options);if(i==="spoken")return Gt(e,this.mathfield.options);if(i==="spoken-text"){let o=this.mathfield.options.textToSpeechMarkup;this.mathfield.options.textToSpeechMarkup="";let a=Gt(e,this.mathfield.options);return this.mathfield.options.textToSpeechMarkup=o,a}if(i==="spoken-ssml"||i==="spoken-ssml-with-highlighting"){let o=this.mathfield.options.textToSpeechMarkup;this.mathfield.options.textToSpeechMarkup="ssml";let a=Gt(e,this.mathfield.options);return this.mathfield.options.textToSpeechMarkup=o,a}if(i==="math-json"){if(!this.mathfield.computeEngine)return globalThis[Symbol.for("io.cortexjs.compute-engine")]||console.error(`The CortexJS Compute Engine library is not available.
Load the library, for example with:
        <div class='rows'>
