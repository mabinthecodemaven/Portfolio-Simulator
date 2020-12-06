bindGenerateButton();
google.charts.load('current', {packages: ['corechart', 'line']});
//google.charts.setOnLoadCallback(drawBasic);


function bindGenerateButton() {
    document.getElementById('Generate').addEventListener('click', function(event) {    
        event.preventDefault();
        let entries = Array.from(document.getElementsByClassName('ticker'));
        var data = {};
        for (entry of entries) {
            let ticker = entry.firstElementChild;
            if (ticker.value != '') {
              let percentage = ticker.nextElementSibling;
              data[ticker.value] = parseInt(percentage.value);
            }
        }
        
        var request = new XMLHttpRequest();
        request.open('POST', '/getdata', true);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        request.addEventListener('load', function() {
            if (request.status >= 200 && request.status < 400) {
                var response = JSON.parse(request.responseText);
                //console.log(response);
                //performance(response);

                drawBasic(performance(response));
            } else {
                console.log('Error in network request: ' + req.statusText);
            }
        })
        
        request.send(JSON.stringify(data));
    })
}


function drawBasic(table) {

      var data = new google.visualization.DataTable();
      data.addColumn('date', 'X');
      data.addColumn('number', 'Balance');

      data.addRows(table);

      var options = {
        hAxis: {
          title: 'Time'
        },
        vAxis: {
          title: 'Balance'
        }
      };

      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

      chart.draw(data, options);
    }


function performance(stockData) {
  let dataTable = {};
  let tableOut = [];

  
  for (stock of stockData) {
    let historical = stock.historical.reverse()
    let shares = stock.percentage / historical[0].open; 
    let rebal = 63;
    
    for (day of historical) {

      let amount = shares * day.close;
      //console.log(amount);
      if ( !(day.date in dataTable)) {
        dataTable[day.date] = amount;
      }
      else {
        dataTable[day.date] += amount;
      }
    }
  }
  for (date in dataTable) {
    let dateArray = date.split('-');
    let datum = [new Date(dateArray[0], dateArray[1]-1, dateArray[2]), dataTable[date]];
    tableOut.push(datum);
  }
  return tableOut;

}