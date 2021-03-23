function scriptToExecute() {
    var showData1 = $('#show-data1');
    var showData2 = $('#show-data2');


    $.getJSON('example.json', function (data) {
        console.log(data);

        var items = data.items.map(function (item) {
            return item.key + ': ' + item.value;
        });

        showData1.empty();
        showData2.empty();

        if (items.length) {
            var content = '<li>' + items.join('</li><li>') + '</li>';
            var list = $('<ul />').html(content);
            showData1.append(list);
            showData2.append(list);
        }
    });

    showData1.text('Loading the JSON file.');
    showData2.text('Loading the JSON file.');
    console.log('test');
}

// function runWhenReady() {
//     if (window.$)
//         scriptToExecute();
//     else
//         setTimeout(runWhenReady, 100);
// }
// runWhenReady();

document.getElementById("app").onload = function () { myFunction() };

function myFunction() {
    //   document.getElementById("app").innerHTML = "Iframe is loaded.";
    scriptToExecute();
}

// $(document).ready(function () {
//     var showData1 = $('#show-data1');
//     var showData2 = $('#show-data2');


//     $.getJSON('example.json', function (data) {
//         console.log(data);

//         var items = data.items.map(function (item) {
//             return item.key + ': ' + item.value;
//         });

//         showData1.empty();
//         showData2.empty();

//         if (items.length) {
//             var content = '<li>' + items.join('</li><li>') + '</li>';
//             var list = $('<ul />').html(content);
//             showData1.append(list);
//             showData2.append(list);
//         }
//     });

//     showData.text('Loading the JSON file.');
// });
