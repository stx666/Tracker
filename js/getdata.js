const $filterDate = $("#switchPastEvents");
const $table = $("#table");
const $tableSearch = $("#seachTable");
const spreadsheetId = "1FlL3OlZPGTMZF_lWH8l_VzyweMmtOpENRv0jkxZK8rc";
let tabledata = [];

$table.on("sort.bs.table", function (e, name, order) {
  setTimeout(function () {
    dateFilter();
  }, 125);
});

function discordFormatter(value, row) {
  if (row.link.length > 0) {
    return row.link.startsWith("loading")
      ? ""
      : "<a href='" + row.link + "' target='_blank'>Click</a>";
  }
  return "";
}

function tabletoFormatter(value, row) {
  if (row.tableto.length > 0) {
    return row.tableto.startsWith("loading")
      ? ""
      : "<a href='" + row.tableto + "' target='_blank'>Click</a>";
  }
  return "";
}

function dateFilter() {
  let currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 1);
  let hideDates = $filterDate.is(":checked");
  $("#table tbody tr").each(
    function () // iterate through each tr inside the table
    {
      let data = $(this).find("td").eq(1).text();
      if (hideDates) {
        if (currentDate.getTime() > new Date(data).getTime()) {
          $(this).hide();
        } else {
          $(this).show();
        }
      } else {
        $(this).show();
      }
    }
  );
}

$tableSearch.on("keyup", function () {
  var value = $(this).val().toLowerCase();
  $("#table tbody tr").filter(function () {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
  });
  if (value.length == 0) {
    dateFilter();
  }
});

$filterDate.on("click", function () {
  dateFilter();
});

fetch(
  `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json`
)
  .then((res) => res.text())
  .then((text) => {
    const json = JSON.parse(text.substr(47).slice(0, -2));

    const data = json.table.rows;
    for (let i = 0; i < data.length; i++) {
      let event = data[i].c[0] === null ? "" : data[i].c[0].v;
      let startdate = data[i].c[1] === null ? "" : data[i].c[1];
      let eventDate =
        startdate === null || startdate === ""
          ? ""
          : new Date(startdate.f + " UTC").toISOString().split("T")[0];
      let eventlength = data[i].c[2] === null ? "" : data[i].c[2].v;
      let format = data[i].c[3] === null ? "" : data[i].c[3].v;
      let zone = data[i].c[4] === null ? "" : data[i].c[4].v;
      let notes = data[i].c[5] === null ? "" : data[i].c[5].v;
      let link = data[i].c[10] === null ? "" : data[i].c[10].v;
      let tableto = data[i].c[12] === null ? "" : data[i].c[12].v;

      tabledata.push({
        event: event,
        startdate: eventDate,
        eventlength: eventlength,
        format: format,
        zone: zone,
        notes: notes,
        link: link,
        tableto: tableto,
      });
      $table.bootstrapTable("load", tabledata);
      dateFilter();
      $("#loading").hide();
    }
  });
