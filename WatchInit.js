function init(basePath) {
    var action = new RGuiAction(qsTranslate("Watch", "&Watch"), RMainWindowQt.getMainWindow());
    action.setRequiresDocument(false);
    action.setScriptFile(basePath + "/Watch.js");
    action.setIcon(basePath + "/Watch.png");
    action.setDefaultCommands(["watch"]);
    action.setNoState();
    action.setGroupSortOrder(1000);
    action.setSortOrder(100);
    action.setWidgetNames(["FileMenu", "FileToolBar"]);
}
