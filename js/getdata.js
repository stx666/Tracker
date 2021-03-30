let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(this.responseText).feed.entry;
        let i;
        for (i = 0; i < data.length; i++) {
            let row = data[i];
            let event = data[i]["gsx$event"]["$t"];
            let startdate = data[i]["gsx$startdate"]["$t"];
            let eventlength = data[i]["gsx$eventlength"]["$t"];
            let format = data[i]["gsx$format"]["$t"];
            let zone = data[i]["gsx$timezone"]["$t"];
            let notes = data[i]["gsx$notes"]["$t"];
            let link = data[i]["gsx$facebookdiscord"]["$t"];
            let tableto = data[i]["gsx$tabletopto"]["$t"];

            document.getElementById("demo").innerHTML +=
                "<tr>" +
                "<td>" +
                event +
                "</td>" +
                "<td>" +
                startdate +
                "</td>" +
                "<td>" +
                eventlength +
                "</td>" +
                "<td>" +
                format +
                "</td>" +
                "<td>" +
                zone +
                "</td>" +
                "<td>" +
                notes +
                "</td>" +
                "<td>" +
                link +
                "</td>" +
                "<td>" +
                tableto +
                "</td>" +
                "</tr>";
        }
    }
};

xmlhttp.open("GET", "https://spreadsheets.google.com/feeds/list/1oM0L9V1yrfgT2pj0oEzNE3YC9XVYsGPp9-tQ4LFaURE/od6/public/values?alt=json", true);
xmlhttp.send();
