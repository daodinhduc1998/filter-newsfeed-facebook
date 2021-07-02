var temp;

document.addEventListener('DOMContentLoaded', onLoad);

function onLoad() {
    temp = JSON.parse(localStorage.getItem('set'));
    if (!temp) {
        temp = { mode: true, op1: false, op2: false, op3: false }
    }
    if (temp.op1 == true) {
        $('#op1').bootstrapToggle('on', true);
    } else {
        $('#op1').bootstrapToggle('off', true);
    }
    if (temp.op2 == true) {
        $('#op2').bootstrapToggle('on', true);
    } else {
        $('#op2').bootstrapToggle('off', true);
    }
    if (temp.op3 == true) {
        $('#op3').bootstrapToggle('on', true);
        $('#op3-ui').attr("hidden", false);
        showWord();
    } else {
        $('#op3').bootstrapToggle('off', true);
        var data = JSON.parse(localStorage.getItem('word'));
        if (data) {
            var total = data.length;
            document.querySelector('span.badge-info').textContent = total;
        } else {
            document.querySelector('span.badge-info').textContent = "0"
        }
        $('#op3-ui').attr("hidden", true);
    }
    if (temp.mode == true) {
        $('#mode').bootstrapToggle('on', true);
        $('#op1').bootstrapToggle('enable')
        $('#op2').bootstrapToggle('enable')
        $('#op3').bootstrapToggle('enable')
    } else {
        $('#mode').bootstrapToggle('off', true);
        $('#op1').bootstrapToggle('disable')
        $('#op2').bootstrapToggle('disable')
        $('#op3').bootstrapToggle('disable')
        $('#op3-ui').attr("hidden", true);
    }
}

$('#op1').change(function() {
    temp = JSON.parse(localStorage.getItem('set'));
    if (!temp) {
        temp = { mode: true, op1: false, op2: false, op3: false }
    }
    if ($('#op1').prop('checked')) {
        temp.op1 = true;
        localStorage.setItem('set', JSON.stringify(temp));
    } else {
        temp.op1 = false;
        localStorage.setItem('set', JSON.stringify(temp));
    }
})

$('#op2').change(function() {
    temp = JSON.parse(localStorage.getItem('set'));
    if (!temp) {
        temp = { mode: true, op1: false, op2: false, op3: false }
    }
    if ($('#op2').prop('checked')) {
        temp.op2 = true;
        localStorage.setItem('set', JSON.stringify(temp));
    } else {
        temp.op2 = false;
        localStorage.setItem('set', JSON.stringify(temp));
    }

})

$('#op3').change(function() {
    temp = JSON.parse(localStorage.getItem('set'));
    if (!temp) {
        temp = { mode: true, op1: false, op2: false, op3: false }
    }
    if ($('#op3').prop('checked')) {
        temp.op3 = true;
        localStorage.setItem('set', JSON.stringify(temp));
        $('#op3-ui').attr("hidden", false);
        showWord();
    } else {
        temp.op3 = false;
        localStorage.setItem('set', JSON.stringify(temp));
        showWord();
        $('#op3-ui').attr("hidden", true);
    }

})


$('#mode').change(function() {
    temp = JSON.parse(localStorage.getItem('set'));
    if (!temp) {
        temp = { mode: true, op1: false, op2: false, op3: false }
    }
    if ($('#mode').prop('checked')) {
        temp.mode = true;
        localStorage.setItem('set', JSON.stringify(temp));
        $('#op1').bootstrapToggle('enable')
        $('#op2').bootstrapToggle('enable')
        $('#op3').bootstrapToggle('enable')
        if (temp.op3) {
            $('#op3-ui').attr("hidden", false);
            showWord();
        }
    } else {
        temp.mode = false;
        localStorage.setItem('set', JSON.stringify(temp));
        $('#op1').bootstrapToggle('disable')
        $('#op2').bootstrapToggle('disable')
        $('#op3').bootstrapToggle('disable')
        $('#op3-ui').attr("hidden", true);
    }

})


$('#textWord').keyup(function(e) {
    fastSearch(this.value);
    if (e.key === 'Enter' || e.keyCode === 13) {
        var word;
        if (localStorage.getItem('word')) {
            word = JSON.parse(localStorage.getItem('word'));
        } else {
            word = [];
        }
        var lc = [];
        if (word.length) {
            word.forEach(element => {
                lc.push(element.toLowerCase());
            });
        }

        if (this.value && (this.value !== " " && this.value !== "  " && this.value !== "   ")) {
            if (lc.length) {
                if (lc.indexOf(this.value.toLowerCase()) < 0) {
                    word.push(this.value);
                    localStorage.setItem('word', JSON.stringify(word));
                }
            } else {
                word.push(this.value);
                localStorage.setItem('word', JSON.stringify(word));
            }
        }
        this.value = "";
        showWord();
    }
})

function showWord() {
    var data;
    temp = JSON.parse(localStorage.getItem('set'));
    if (!temp) {
        temp = { mode: true, op1: false, op2: false, op3: false }
    }
    data = JSON.parse(localStorage.getItem('word'));
    if (!data) { data = []; }
    if (temp.op3) {
        if (data.length) {
            var total = data.length;
            document.querySelector('span.badge-info').textContent = total;
            var str = "";
            var aW = data.reverse();
            for (i = 0; i < aW.length; i++) {
                str = str + `<tr>
                <td><input type="text" style="user-select: none" value="` + aW[i] + `" readonly></td>
                <th>
                    <div class="icon-trash" data="` + aW[i] + `"><i class="fas fa-trash-alt"></i></div>
                </th>
            </tr>`
            }
            document.getElementById('listW').innerHTML = str;

            //Add event ondblclick
            var b = document.getElementById('listW').querySelectorAll('input');
            b.forEach(element => {
                element.ondblclick = function() {
                    this.readOnly = false;
                }
                element.onfocusout = function() {
                    var c = document.getElementById('listW').querySelectorAll('input');
                    var arr = [];
                    c.forEach(element1 => {
                        if (element1.value) {
                            arr.push(element1.value);
                            element1.readOnly = true;
                        } else {
                            element1.parentNode.parentNode.remove();
                        }
                    });
                    arr.reverse();
                    localStorage.setItem('word', JSON.stringify(arr));
                }
            });
            var icon = document.getElementById('listW').querySelectorAll('.icon-trash');
            for (i = 0; i < icon.length; i++) {
                icon[i].onclick = function() {

                    $(this).closest('tr').remove();
                    var tr = document.getElementById('listW').querySelectorAll('tr');
                    if (tr.length) {
                        var arr = [];
                        tr.forEach(element => {
                            arr.push(element.querySelector('input').value);
                        });
                        arr.reverse();
                        localStorage.setItem('word', JSON.stringify(arr));
                    } else {
                        var arr = [];
                        localStorage.setItem('word', JSON.stringify(arr));
                        document.getElementById('listW').innerHTML = "Chưa có dữ liệu"
                    }
                    var total = tr.length;
                    document.querySelector('span.badge-info').textContent = total;
                }
            }

        } else {
            var total = data.length;
            document.querySelector('span.badge-info').textContent = total;
            document.getElementById('listW').innerHTML = "Chưa có dữ liệu"
        }
    }
}

function fastSearch(keyw) {
    var tr = keyw == "";
    var rg = new RegExp(keyw, "g");

    for (i = 0; i < document.getElementById('listW').querySelectorAll('tr').length; i++) {
        if (!tr && !rg.test(document.getElementById('listW').querySelectorAll('tr')[0].querySelector('input').value)) {
            document.getElementById('listW').querySelectorAll('tr')[i].hidden = true;
        } else {
            document.getElementById('listW').querySelectorAll('tr')[i].hidden = false;
        }
    }
}