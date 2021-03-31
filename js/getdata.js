let $table = $('#table')
let tabledata = [];
let xmlhttp = new XMLHttpRequest();
let tmp1 = {};

xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(this.responseText).feed.entry;
        let i;

        for (i = 0; i < data.length; i++) {
            // let row = data[i];
            let event = data[i]["gsx$_cn6ca"]["$t"];
            let startdate = data[i]["gsx$startdate"]["$t"];
            let eventlength = data[i]["gsx$eventlength"]["$t"];
            let format = data[i]["gsx$format"]["$t"];
            let zone = data[i]["gsx$timezone"]["$t"];
            let notes = data[i]["gsx$notes"]["$t"];
            let link = data[i]["gsx$facebookdiscord"]["$t"];
            let tableto = data[i]["gsx$tabletopto"]["$t"];

            tabledata.push({
                'event': event,
                'startdate': startdate,
                'eventlength':eventlength ,
                'format': format,
                'zone': zone,
                'notes': notes,
                'link': link,
                'tableto':tableto
            });
        };

        debugger;
        $table.bootstrapTable('load', tabledata);
    };
};

$("#seachTable").on("keyup", function(){
    var value = $(this).val().toLowerCase();
    $("#table tbody tr").filter(function(){
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});
//xmlhttp.open("GET", "https://spreadsheets.google.com/feeds/list/1qoQgpwtAxbS3jrrUgiXpVbcivkotSQdy6KjyG3nDQGI/od6/public/values?alt=json", true);
xmlhttp.open("GET", "https://spreadsheets.google.com/feeds/list/1oM0L9V1yrfgT2pj0oEzNE3YC9XVYsGPp9-tQ4LFaURE/od6/public/values?alt=json", true);
xmlhttp.send();


