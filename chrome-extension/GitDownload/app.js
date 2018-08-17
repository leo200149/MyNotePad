$(document).ready(function() {
    var DownloadGit = function() {
        var repoInfo = {};

        var parseInfo = function(parameters) {
            var repoPath = new URL(parameters.url).pathname;
            var splitPath = repoPath.split("/");
            var info = {};

            info.author = splitPath[1];
            info.repository = splitPath[2];
            info.branch = splitPath[4];

            info.rootName = splitPath[splitPath.length - 1];
            if (!!splitPath[4]) {
                info.resPath = repoPath.substring(
                    repoPath.indexOf(splitPath[4]) + splitPath[4].length + 1
                );
            }
            info.urlPrefix = "https://api.github.com/repos/" +
                info.author + "/" + info.repository + "/contents/";
            info.urlPostfix = "?ref=" + info.branch;

            if (!parameters.fileName || parameters.fileName == "") {
                info.downloadFileName = info.rootName;
            } else {
                info.downloadFileName = parameters.fileName;
            }

            if (parameters.rootDirectory == "false") {
                info.rootDirectoryName = "";

            } else if (!parameters.rootDirectory || parameters.rootDirectory == "" ||
                parameters.rootDirectory == "true") {
                info.rootDirectoryName = info.rootName + "/";

            } else {
                info.rootDirectoryName = parameters.rootDirectory + "/";
            }

            return info;
        };

        var downloadDir = function() {
            var dirPaths = [];
            var files = [];

            dirPaths.push(repoInfo.resPath);
            mapFileAndDirectory(dirPaths, files);
        };

        var mapFileAndDirectory = function(dirPaths, files) {
            $.get(repoInfo.urlPrefix + dirPaths.pop() + repoInfo.urlPostfix).then(function(response) {
                for (var i = response.length - 1; i >= 0; i--) {
                    if (response[i].type == "dir") {
                        dirPaths.push(response[i].path);
                    } else {
                        if (response[i].download_url) {
                            files.push(getFile(response[i].path, response[i].download_url));
                        } else {
                            console.log(response[i]);
                        }
                    }
                }

                if (dirPaths.length <= 0) {
                    downloadFiles(files);
                } else {
                    mapFileAndDirectory(dirPaths, files);
                }
            });
        };

        var downloadFiles = function(files) {
            var zip = new JSZip();
            $.when(files).done(values => {
                setTimeout(function() {
                    for (var i = values.length - 1; i >= 0; i--) {
                        zip.file(
                            repoInfo.rootDirectoryName + values[i].filepath.substring(decodeURI(repoInfo.resPath).length + 1),
                            values[i].responseNative
                        );
                    }
                    zip.generateAsync({ type: "blob" }).then(function(content) {
                        saveAs(content, repoInfo.downloadFileName + ".zip");
                    });
                    $('.lmask').hide();
                }, 1000);
            });
        };

        var getFile = function(path, url) {
            var promise = $.ajax({ dataType:'native',url: url, xhrFields: { responseType: 'arraybuffer' } });
            promise.filepath = path;
            return promise;
        };

        var downloadFile = function(url) {
            var zip = new JSZip();
            setTimeout(function() {
                $.ajax({ dataType:'native',url: url, xhrFields: { responseType: 'arraybuffer' } }).then(function(file) {
                    zip.file(repoInfo.rootName, file);

                    zip.generateAsync({ type: "blob" }).then(function(content) {
                        saveAs(content, repoInfo.downloadFileName + ".zip");
                    });
                    $('.lmask').hide();
                }, function(error) {
                    console.log(error);
                });
            }, 1000);
        };

        return {
            downloadZippedFiles: function(parameters) {
                repoInfo = parseInfo(parameters);

                if (!repoInfo.resPath || repoInfo.resPath == "") {
                    if (!repoInfo.branch || repoInfo.branch == "") {
                        repoInfo.branch = "master";
                    }

                    var downloadUrl = "https://github.com/" + repoInfo.author + "/" +
                        repoInfo.repository + "/archive/" + repoInfo.branch + ".zip";

                    window.location = downloadUrl;

                } else {
                    $.get(repoInfo.urlPrefix + repoInfo.resPath + repoInfo.urlPostfix).then(function(response) {
                        if (response instanceof Array) {
                            downloadDir();
                        } else {
                            downloadFile(response.download_url);
                        }

                    }, function(error) {
                        console.log("probable big file.");
                        downloadFile("https://raw.githubusercontent.com/" + repoInfo.author + "/" +
                            repoInfo.repository + "/" + repoInfo.branch + "/" + repoInfo.resPath);
                    });
                }
            },
        };
    };

    var genDownloadUrl = function(path) {
        var protocol = location.protocol;
        var slashes = protocol.concat("//");
        var host = slashes.concat(window.location.hostname);
        return host + path;
    }

    var downloadGit = DownloadGit();

    window.initDownloadBtn = function() {
        var downloadBtn = document.getElementById('downloadBtn');
        if (downloadBtn == null) {
            var downBtn = $('<a>');
            downBtn.text('Download');
            downBtn.attr('id', 'downloadBtn');
            downBtn.addClass('js-pjax-capture-input btn btn-sm BtnGroup-item');
            downBtn.bind('click', function() {
                $('.lmask').show();
                var parameters = {
                    url: window.location
                };
                downloadGit.downloadZippedFiles(parameters);
            });
            $('.BtnGroup').prepend(downBtn);
        }

        $('.js-navigation-item').each(function() {
            var href = $(this).find('.js-navigation-open').attr('href');
            $(this).find('.icon').unbind('click');
            $(this).find('.icon').bind('click', function() {
                $('.lmask').show();
                var parameters = {
                    url: genDownloadUrl(href)
                };
                downloadGit.downloadZippedFiles(parameters);
            });
        });
    }

    $('body').append('<div class="lmask" style="display:none"></div>');

    $('.application-main').on('DOMSubtreeModified', function() {
        initDownloadBtn();
    });

    initDownloadBtn();
});
