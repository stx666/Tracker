let $table = $('#table')
let tabledata = [];
let xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(this.responseText).feed.entry;
        let i;

        for (i = 0; i < data.length; i++) {
            if (!data[i].hasOwnProperty("gsx$_cn6ca")) { break; }

            let event = data[i]["gsx$_cn6ca"]["$t"];
            let startdate = data[i]["gsx$startdate"]["$t"];
            let eventDate = new Date(startdate);
            let eventlength = data[i]["gsx$eventlength"]["$t"];
            let format = data[i]["gsx$format"]["$t"];
            let zone = data[i]["gsx$timezone"]["$t"];
            let notes = data[i]["gsx$notes"]["$t"];

            let link = "";
            if(data[i].hasOwnProperty("gsx$_d180g")){
                link = data[i]["gsx$_d180g"]["$t"];
            }
            let tableto = "";
            if(data[i].hasOwnProperty("gsx$_cssly")){
                tableto = data[i]["gsx$_cssly"]["$t"];
            }
 
            tabledata.push({
                'event': event,
                'startdate': eventDate.toISOString().split("T")[0],
                'eventlength':eventlength ,
                'format': format,
                'zone': zone,
                'notes': notes,
                'link': link,
                'tableto':tableto
            });
        };

        $table.bootstrapTable('load', tabledata);
    };
};

function discordFormatter(value, row) {
   if(row.link.length > 0) {
        return "<a href='" + row.link + "' target='_blank'>Click</a>";
   }
   return "";
}

function tabletoFormatter(value, row) {
   if(row.tableto.length > 0) {
        return "<a href='" + row.tableto + "' target='_blank'>Click</a>";
   }
   return "";
}

$("#seachTable").on("keyup", function(){
    var value = $(this).val().toLowerCase();
    $("#table tbody tr").filter(function(){
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});

xmlhttp.open("GET", "https://spreadsheets.google.com/feeds/list/1FlL3OlZPGTMZF_lWH8l_VzyweMmtOpENRv0jkxZK8rc/od6/public/values?alt=json", true);
xmlhttp.send();

