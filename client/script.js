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
      data.addColumn('number', 'Dogs');

      data.addRows(table);

      var options = {
        hAxis: {
          title: 'Time'
        },
        vAxis: {
          title: 'Popularity'
        }
      };

      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

      chart.draw(data, options);
    }


function performance(stockData) {
  let first = true;
  let dataTable = {};
  let tableOut = [];
  for (stock of stockData) {
    let shares = stock.percentage / stock.historical[0].open; 
    //console.log(shares);
    
    for (day of stock.historical) {
      let amount = shares * day.close;
      //console.log(amount);
      if ( !(day.date in dataTable)) {
        dataTable[day.date] = amount;
        console.log('new')
      }
      else {
        dataTable[day.date] += amount;
        console.log('old') 
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