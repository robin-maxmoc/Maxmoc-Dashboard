const fs = require('fs');

let axisX = '';
let axisY = '';
let select = '';
let rowValue, colValue;

function myFunction(xml) {
  let i;
  let xmlDoc = xml.responseXML;

  axisX =
    "<select id='xAxis' onclick='xAxis()' class='axis-x'><option value='-1'>Select</option>";
  axisY =
    "<select id='yAxis' onclick='yAxis()' class='axis-y'><option value='-1'>Select</option>";
  select =
    "<select id='dropDownId' class='axis-select' placeholder='Select' onclick='dropDownSelect()'><option value='-1'>Select</option>";
  let x = xmlDoc.getElementsByTagName('OneMap_0');
  for (i = 0; i < x.length; i++) {
    select +=
      '<option value=' +
      x[i].getAttribute('Map_Name_CZ') +
      ' data-column=' +
      x[i].getAttribute('Col_count') +
      ' data-row = ' +
      x[i].getAttribute('Row_count') +
      ' data-val= ' +
      x[i].getAttribute('Map_Name_CZ') +
      '>' +
      x[i].getAttribute('Map_Name_CZ') +
      '</option>';
    if (x[i].getAttribute('Row_count') == 1) {
      if (
        x[i].getAttribute('Map_Name_CZ') == 'Ex_Temp_Delta_Press_Factor [%]'
      ) {
        axisX +=
          '<option value=' +
          x[i].getAttribute('Map_Name_CZ') +
          ' data-column=' +
          x[i].getAttribute('Col_count') +
          ' data-row = ' +
          x[i].getAttribute('Row_count') +
          ' data-val=' +
          x[i].getAttribute('Map_Name_CZ') +
          '>' +
          x[i].getAttribute('Map_Name_CZ') +
          '</option>';
        axisY +=
          '<option value=' +
          x[i].getAttribute('Map_Name_CZ') +
          ' data-column=' +
          x[i].getAttribute('Col_count') +
          ' data-row = ' +
          x[i].getAttribute('Row_count') +
          ' data-val= ' +
          x[i].getAttribute('Map_Name_CZ') +
          '>' +
          x[i].getAttribute('Map_Name_CZ') +
          '</option>';
      } else if (x[i].getAttribute('Map_Name_CZ') == 'RPM [rpm]') {
        axisX +=
          '<option value=' +
          x[i].getAttribute('Map_Name_CZ') +
          ' data-column=' +
          x[i].getAttribute('Col_count') +
          ' data-row = ' +
          x[i].getAttribute('Row_count') +
          ' data-val=' +
          x[i].getAttribute('Map_Name_CZ') +
          '>' +
          x[i].getAttribute('Map_Name_CZ') +
          '</option>';
        axisY +=
          '<option value=' +
          x[i].getAttribute('Map_Name_CZ') +
          ' data-column=' +
          x[i].getAttribute('Col_count') +
          ' data-row = ' +
          x[i].getAttribute('Row_count') +
          ' data-val= ' +
          x[i].getAttribute('Map_Name_CZ') +
          ' disabled>' +
          x[i].getAttribute('Map_Name_CZ') +
          '</option>';
      } else if (x[i].getAttribute('Map_Name_CZ') == 'Delta_Press [kPa]') {
        axisX +=
          '<option value=' +
          x[i].getAttribute('Map_Name_CZ') +
          ' data-column=' +
          x[i].getAttribute('Col_count') +
          ' data-row = ' +
          x[i].getAttribute('Row_count') +
          ' data-val=' +
          x[i].getAttribute('Map_Name_CZ') +
          ' disabled>' +
          x[i].getAttribute('Map_Name_CZ') +
          '</option>';
        axisY +=
          '<option value=' +
          x[i].getAttribute('Map_Name_CZ') +
          ' data-column=' +
          x[i].getAttribute('Col_count') +
          ' data-row = ' +
          x[i].getAttribute('Row_count') +
          ' data-val= ' +
          x[i].getAttribute('Map_Name_CZ') +
          '>' +
          x[i].getAttribute('Map_Name_CZ') +
          '</option>';
      } else {
        axisX +=
          '<option value=' +
          x[i].getAttribute('Map_Name_CZ') +
          ' data-column=' +
          x[i].getAttribute('Col_count') +
          ' data-row = ' +
          x[i].getAttribute('Row_count') +
          ' data-val=' +
          x[i].getAttribute('Map_Name_CZ') +
          ' disabled>' +
          x[i].getAttribute('Map_Name_CZ') +
          '</option>';
        axisY +=
          '<option value=' +
          x[i].getAttribute('Map_Name_CZ') +
          ' data-column=' +
          x[i].getAttribute('Col_count') +
          ' data-row = ' +
          x[i].getAttribute('Row_count') +
          ' data-val= ' +
          x[i].getAttribute('Map_Name_CZ') +
          ' disabled>' +
          x[i].getAttribute('Map_Name_CZ') +
          '</option>';
      }
    }
  }
  select += '</select>';
  document.getElementById('sheet-selection').innerHTML = select;
  document.getElementById('axis-x').innerHTML = axisX;
  document.getElementById('axis-y').innerHTML = axisY;
}

function myFunctionReadValues(xml) {
  document.getElementById('axis-display').innerHTML = '';
  let i, j;
  let xmlDoc = xml.responseXML;
  let tableFormat = '';
  tableFormat += "<table id='tab' class='spreadsheet'>";
  let x = xmlDoc.getElementsByTagName('ss:Table');
  for (i = 0; i < x.length; i++) {
    if ($('#dropDownId').val() == 'Ex_Temp_Delta_Press_Factor') {
      xAxisReading();
      yAxisReading();
      let y = x[i].getElementsByTagName('ss:Row');
      for (j = 0; j < y.length; j++) {
        let z = y[j].getElementsByTagName('ss:Cell');
        tableFormat += '<tr>';
        for (let k = 3; k < z.length; k++) {
          let a = z[k].getElementsByTagName('ss:Data');
          for (const element of a) {
            if (j != 0 && k != 3) {
              tableFormat += '<td>';
              tableFormat +=
                "<input type='text' size='2' value='" +
                element.innerHTML +
                "' disabled/>";
              tableFormat += '</td>';
            }
          }
        }
        tableFormat += '</tr>';
      }
    } else {
      document.getElementById('x-axis-bar').innerHTML = '';
      document.getElementById('y-axis-bar').innerHTML = '';
      let y = x[i].getElementsByTagName('ss:Row');
      for (j = 1; j == 1; j++) {
        let z = y[j].getElementsByTagName('ss:Cell');
        for (let k = 4; k < z.length; k++) {
          let a = z[k].getElementsByTagName('ss:Data');
          for (const element of a) {
            console.log(element.innerHTML + '\n');
            tableFormat += '<td>';
            tableFormat +=
              "<input type='text' size='2' value='" +
              element.innerHTML +
              "' disabled/>";
            tableFormat += '</td>';
          }
        }
      }
    }
  }

  tableFormat += '</table>';
  document.getElementById('axis-display').innerHTML = tableFormat;
  console.log(tableFormat);
}

function yAxis() {
  $('#yAxis').change(function () {
    rowValue = $(this).find(':selected').data('row');
    colValue = $(this).find(':selected').data('column');
    let tableFormat = '';

    tableFormat += "<table id='tab' class='spreadsheet'>";

    for (let i = 0; i < rowValue; i++) {
      for (let j = 0; j < colValue; j++) {
        tableFormat += '<tr><td>';
        tableFormat += "<input type='text' size='2' />";
        tableFormat += '</td></tr>';
      }
    }
    tableFormat += '</table>';
    document.getElementById('y-axis-bar').innerHTML = tableFormat;
  });
}

function xAxis() {
  $('#xAxis').change(function () {
    rowValue = $(this).find(':selected').data('row');
    colValue = $(this).find(':selected').data('column');
    let tableFormat = '';

    tableFormat += "<table id='tab' class='spreadsheet'>";

    for (let i = 0; i < rowValue; i++) {
      tableFormat += '<tr>';
      for (let j = 0; j < colValue; j++) {
        tableFormat += '<td>';
        tableFormat += "<input type='text' size='2' />";
        tableFormat += '</td>';
      }
      tableFormat += '</tr>';
    }
    tableFormat += '</table>';
    document.getElementById('x-axis-bar').innerHTML = tableFormat;
  });
}

function loadValues() {
  let initialTags =
    `<?xml version="1.0"?>
<ss:Workbook xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
    <ss:Styles>
        <ss:Style ss:ID="1">
            <ss:Font ss:Bold="1" />
        </ss:Style>
    </ss:Styles>
    <ss:Worksheet ss:Name="1_` +
    $('#dropDownId').val() +
    `">
        <ss:Table>
            <ss:Column ss:Width="80" />
            <ss:Column ss:Width="80" />
            <ss:Row ss:StyleID="1">
                <ss:Cell>
                    <ss:Data ss:Type="String">Popis</ss:Data>
                </ss:Cell>
                <ss:Cell>
                    <ss:Data ss:Type="String">Hodnota</ss:Data>
                </ss:Cell>
                <ss:Cell></ss:Cell>
                <ss:Cell>
                    <ss:Data ss:Type="String">osa Y/osa X</ss:Data>
                </ss:Cell>
                <ss:Cell>
                    <ss:Data ss:Type="Number">800</ss:Data>
                </ss:Cell>
                <ss:Cell>
                    <ss:Data ss:Type="Number">900</ss:Data>
                </ss:Cell>
                <ss:Cell>
                    <ss:Data ss:Type="Number">1000</ss:Data>
                </ss:Cell>
                <ss:Cell>
                    <ss:Data ss:Type="Number">1100</ss:Data>
                </ss:Cell>
                <ss:Cell>
                    <ss:Data ss:Type="Number">1200</ss:Data>
                </ss:Cell>
                <ss:Cell>
                    <ss:Data ss:Type="Number">1300</ss:Data>
                </ss:Cell>
                <ss:Cell>
                    <ss:Data ss:Type="Number">1400</ss:Data>
                </ss:Cell>
                <ss:Cell>
                    <ss:Data ss:Type="Number">1500</ss:Data>
                </ss:Cell>
                <ss:Cell>
                    <ss:Data ss:Type="Number">1600</ss:Data>
                </ss:Cell>
                <ss:Cell>
                    <ss:Data ss:Type="Number">1700</ss:Data>
                </ss:Cell>
                <ss:Cell>
                    <ss:Data ss:Type="Number">1800</ss:Data>
                </ss:Cell>
                <ss:Cell>
                    <ss:Data ss:Type="Number">1900</ss:Data>
                </ss:Cell>
                <ss:Cell>
                    <ss:Data ss:Type="Number">2000</ss:Data>
                </ss:Cell>
                <ss:Cell>
                    <ss:Data ss:Type="Number">2100</ss:Data>
                </ss:Cell>
                <ss:Cell>
                    <ss:Data ss:Type="Number">2200</ss:Data>
                </ss:Cell>
                <ss:Cell>
                    <ss:Data ss:Type="Number">2300</ss:Data>
                </ss:Cell>
            </ss:Row>`;

  $('#tab')
    .find('tr')
    .each(function () {
      initialTags += `<ss:Row>
<ss:Cell>
    <ss:Data ss:Type="String">ID of map</ss:Data>
</ss:Cell>
<ss:Cell>
    <ss:Data ss:Type="String">7</ss:Data>
</ss:Cell>
<ss:Cell></ss:Cell>
<ss:Cell>
    <ss:Data ss:Type="Number">100</ss:Data>
</ss:Cell>`;
      for (let j = 0; j < colValue; j++) {
        initialTags +=
          `<ss:Cell>
                <ss:Data ss:Type="Number">` +
          $(this)
            .find('td:eq(' + j + ") input[type='text']")
            .val() +
          `</ss:Data>
                </ss:Cell>`;
      }
      initialTags += `</ss:Row>`;
    });
  initialTags += `</ss:Table>
</ss:Worksheet>
</ss:Workbook>`;
  try {
    fs.writeFile(
      './resources/' + $('#dropDownId').val() + '_sample.xml',
      initialTags,
      (err) => {
        if (!err) {
          alert('successfully saved');
          document.querySelector('.active-work-map').disabled = true;
          document.querySelector(
            '.x-axis-bar'
          ).innerHTML = `<span>Axis X</span>`;
          document.querySelector(
            '.y-axis-bar'
          ).innerHTML = `<span>Axis Y</span>`;
          document.querySelector('.axis-display').innerHTML = '';
          document.querySelector('.axis-x').selectedIndex = 0;
          document.querySelector('.axis-y').selectedIndex = 0;
          document.querySelector('.axis-select').selectedIndex = 0;
        } else {
          alert('something went wrong');
          document.querySelector('.active-work-map').disabled = true;
        }
      }
    );
  } catch (e) {
    alert('Failed to save the file !');
  }
}

function readValues() {
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      myFunctionReadValues(this);
    }
  };
  let text = $('#dropDownId').val();

  const myArray = text.split(' ');

  let word = '../../resources/' + myArray[0] + '_sample.xml';
  xmlhttp.open('GET', word, true);
  xmlhttp.send();
}

function xAxisReading() {
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      xAxisReadValues(this);
    }
  };

  let rPM = '../../resources/RPM_sample.xml';
  xmlhttp.open('GET', rPM, true);
  xmlhttp.send();
}

function yAxisReading() {
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      yAxisReadValues(this);
    }
  };

  let rPM = '../../resources/Delta_Press_sample.xml';
  xmlhttp.open('GET', rPM, true);
  xmlhttp.send();
}

function yAxisReadValues(xml) {
  let i, j;
  let xmlDoc = xml.responseXML;
  document.getElementById('y-axis-bar').innerHTML = '';
  let yAxisFormatvalues = '';
  yAxisFormatvalues += "<table class='spreadsheet'>";

  let x = xmlDoc.getElementsByTagName('ss:Table');
  for (i = 0; i < x.length; i++) {
    let y = x[i].getElementsByTagName('ss:Row');
    for (j = 1; j == 1; j++) {
      let z = y[j].getElementsByTagName('ss:Cell');
      for (let k = 4; k < z.length; k++) {
        let a = z[k].getElementsByTagName('ss:Data');
        for (let l = 0; l < a.length; l++) {
          yAxisFormatvalues += '<tr><td>';
          yAxisFormatvalues +=
            "<input type='text' size='2' value='" +
            a[l].innerHTML +
            "' disabled/>";
          yAxisFormatvalues += '</td></tr>';
        }
      }
    }
    yAxisFormatvalues += '</table>';
    document.getElementById('y-axis-bar').innerHTML = yAxisFormatvalues;
  }
}

function xAxisReadValues(xml) {
  let i, j;
  let xmlDoc = xml.responseXML;
  document.getElementById('x-axis-bar').innerHTML = '';
  let xAxisFormatvalues = '';
  xAxisFormatvalues += "<table class='spreadsheet'><tr>";
  let yAxisFormatvalues = '';
  yAxisFormatvalues += "<table class='spreadsheet'>";

  let x = xmlDoc.getElementsByTagName('ss:Table');
  for (i = 0; i < x.length; i++) {
    let y = x[i].getElementsByTagName('ss:Row');
    for (j = 1; j == 1; j++) {
      let z = y[j].getElementsByTagName('ss:Cell');
      for (let k = 4; k < z.length; k++) {
        let a = z[k].getElementsByTagName('ss:Data');
        for (let l = 0; l < a.length; l++) {
          xAxisFormatvalues += '<td>';
          xAxisFormatvalues +=
            "<input type='text' size='2' value='" +
            a[l].innerHTML +
            "' disabled/>";
          xAxisFormatvalues += '</td>';
        }
      }
    }
    xAxisFormatvalues += '</tr></table>';
    document.getElementById('x-axis-bar').innerHTML = xAxisFormatvalues;
  }
}

function dropDownSelect() {
  document.querySelector('.active-work-map').disabled = false;
  let i, j;
  let tableFormat = '';
  $('#dropDownId').change(function () {
    rowValue = $(this).find(':selected').data('row');
    colValue = $(this).find(':selected').data('column');
    tableFormat += "<table id='tab' class='spreadsheet'>";

    for (i = 0; i < rowValue; i++) {
      tableFormat += '<tr>';
      for (j = 0; j < colValue; j++) {
        tableFormat += '<td>';
        tableFormat += "<input type='text' size='2' />";
        tableFormat += '</td>';
      }
      tableFormat += '</tr>';
    }
    tableFormat += '</table>';
    document.getElementById('axis-display').innerHTML = tableFormat;
  });
}
