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
            //let test1 = data[i]["gsx$facebookdiscord"]["$t"];
            
            //let tableto = data[i]["gsx$tabletopto"]["$t"];

            let link = "";
            if(data[i].hasOwnProperty('gsx$_d180g')){
                link = data[i]["gsx$_d180g"]["$t"];
            }
            let tableto ="";
            if(data[i].hasOwnProperty('gsx$_cssly')){
                tableto = data[i]["gsx$_cssly"]["$t"];
            }
            // if(thisSession.hasOwnProperty('merchant_id')){

            // }
            // let link = "";
            //if (data[i]["gsx$_d180g"] !== "undefined") {
            //    let link = data[i]["gsx$_d180g"]["$t"];
            //}
            // if (typeof data[i]["gsx$_d180g"] !== "undefined") {
            //     let link = data[i]["gsx$_d180g"]["$t"];
            // }


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
xmlhttp.open("GET", "https://spreadsheets.google.com/feeds/list/1FlL3OlZPGTMZF_lWH8l_VzyweMmtOpENRv0jkxZK8rc/od6/public/values?alt=json", true);
xmlhttp.send();

