include("../NewFile/NewFile.js");

WATCH_TIME = 2;
LAST_MODIFIED = null;
var enableWatch = false;
/**
 * \class Watch
 * \brief Handles all user interaction to open documents.
 * \ingroup ecma_file
 */
function Watch(guiAction) {
    NewFile.call(this, guiAction);
}

Watch.prototype = new NewFile();

Watch.prototype.beginEvent = function () {
    File.prototype.beginEvent.call(this);

    enableWatch = !enableWatch;

    var interval = WATCH_TIME * 1000;
    var fileName = EAction.getDocument().getFileName();

    Watch.watchTimer = new QTimer(this);
    Watch.watchTimer.interval = interval;
    Watch.watchTimer.timeout.connect(Watch, "watch");

    if (enableWatch) {
        var appWin = EAction.getMainWindow();
        QMessageBox.information(
            appWin,
            qsTr("Info"),
            qsTr('Start watch: ' + fileName)
        );
        Watch.watchTimer.start(interval);
    }
    else {
        QMessageBox.information(
            appWin,
            qsTr("Info"),
            qsTr('Stop watch: ' + fileName)
        );
        Watch.watchTimer.stop();
    }
};

Watch.getTimestamp = function () {
    return QTime.currentTime().toString("hh:mm:ss");
};

Watch.watch = function () {
    //qDebug(Watch.getTimestamp());
    if (!enableWatch) {
        return;
    }
    var document = EAction.getDocument();
    var fileName = document.getFileName();
    var fi = new QFileInfo(fileName);
    if (fi.lastModified().toString() != LAST_MODIFIED) {
        if (LAST_MODIFIED != null) {
            qDebug('reload');
            Watch.reloadFile(fileName);
            EAction.handleUserMessage("[" + Watch.getTimestamp() + "] "
            + qsTr("Reload complete."));
        }
        LAST_MODIFIED = fi.lastModified().toString();
    }
};

Watch.reloadFile = function (fileName) {
    var appWin = EAction.getMainWindow();
    var mdiArea = appWin.getMdiArea();
    var tabBar = appWin.getTabBar();
    var currentIndex = tabBar.currentIndex;
    NewFile.createMdiChild(fileName);
    mdiArea.closeTab(currentIndex);
};