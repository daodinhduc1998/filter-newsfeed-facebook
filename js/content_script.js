document.onreadystatechange = function() {
    filterNewsfeed();
    if (document.readyState === 'complete') {
        window.onscroll = function() {
            filterNewsfeed();
        };
    }
}


function filterNewsfeed() {
    //var a;
    try {
        //Gửi request tới background kiểm tra tồn tại biến cài đặt
        chrome.runtime.sendMessage({ command: "cleanNewsfeed", from: "content_script.js", to: "background.js" }, function(response) {
            //a = JSON.parse(response.result.data);
            //localStorage.setItem('cleanEx', response.result.data)
            var temp = JSON.parse(response.result.data);
            var word = JSON.parse(response.result.word);
            if (temp.mode) {
                removeAdsRight();
                if (temp.op1) {
                    var a = document.querySelectorAll('div');
                    a.forEach(element => {
                        if (element.hasAttribute('data-pagelet')) {
                            if (element.getAttribute('data-visualcompletion') == 'ignore-late-mutation') {
                                var b = element.querySelectorAll('span');
                                b.forEach(element1 => {
                                    if (/Được tài trợ/.test(element1.outerHTML)) {
                                        element.hidden = true;
                                        //console.log("[Hidden tag \"Được tài trợ\" ]");
                                    }
                                });
                            }
                        }
                    });
                }
                if (temp.op2) {
                    var c = document.querySelectorAll('div');
                    c.forEach(element2 => {
                        if (element2.hasAttribute('data-pagelet')) {
                            if (element2.getAttribute('data-visualcompletion') == 'ignore-late-mutation') {
                                var d = element2.querySelectorAll('span');
                                d.forEach(element3 => {
                                    if (/Gợi ý cho bạn/.test(element3.outerHTML)) {
                                        element2.hidden = true;
                                        //console.log("[Hidden tag \"Gợi ý cho bạn\" ]");
                                    }
                                });
                            }
                        }
                    });
                }
                if (temp.op3) {
                    var c = document.querySelectorAll('div');
                    c.forEach(element2 => {
                        if (element2.hasAttribute('data-pagelet')) {
                            var d = element2.querySelectorAll('div,span,strong');
                            d.forEach(element3 => {
                                if (word.length) {
                                    word.forEach(element => {
                                        var reg = new RegExp(element.toLowerCase(), "g");
                                        if (reg.test(element3.outerHTML.toLowerCase())) {
                                            element2.hidden = true;
                                            return;
                                        }
                                    });
                                }
                            });

                        }
                    });
                }
            }
        });
    } catch (e) {}

}

function removeAdsRight() {
    var a = document.querySelectorAll('div');
    a.forEach(element => {
        if (element.hasAttribute('data-pagelet')) {
            if (element.getAttribute('data-pagelet') == 'RightRail') {
                var e = element.querySelector('div');
                e.hidden = true;
            }
        }
    });
}