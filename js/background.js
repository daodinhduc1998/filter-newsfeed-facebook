var temp, word;
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.command == "cleanNewsfeed" && request.from == "content_script.js" && request.to == "background.js") {
            temp = JSON.parse(localStorage.getItem('set'));
            word = JSON.parse(localStorage.getItem('word'));
            if (!temp) {
                temp = { mode: true, op1: false, op2: false, op3: false }
            }
            if (!word) {
                word = [];
            }
            sendResponse({
                result: {
                    code: 200,
                    data: JSON.stringify(temp),
                    word: JSON.stringify(word)
                }
            });
        }

    }
);