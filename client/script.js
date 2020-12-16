bindGenerateButton();
bindAddButton();
google.charts.load('current', {packages: ['corechart', 'line']});
//google.charts.setOnLoadCallback(drawBasic);


function bindGenerateButton() {
    document.getElementById('Generate').addEventListener('click', function(event) {    
        event.preventDefault();
        let entries = Array.from(document.getElementsByClassName('portfolio'));
        let date = document.getElementById('date').value;
        let data = {};
        data['stocks'] = {}
        data['date'] = date;
        let perctotal = 0;
        for (entry of entries) {
            let ticker = entry.firstElementChild;
            if (ticker.value != '') {
              let percentage = ticker.nextElementSibling;
              data['stocks'][ticker.value] = parseInt(percentage.value);
              perctotal += parseFloat(percentage.value);
            }
        }

        if (perctotal != 100) {
          alert('Percentages must total to 100!');
          return;
        }
        
        var request = new XMLHttpRequest();
        request.open('POST', '/getdata', true);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        request.addEventListener('load', function() {
          var response = JSON.parse(request.responseText);
            if (request.status >= 200 && request.status < 400) {
                
                console.log(response);
                //performance(response);

                drawBasic(performance(response));
            } else if (request.status == 500) {
                alert('Invalid ticker: '+ response);
                
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
  let rebal = 63;
  let balance=100;
  let periods = Math.floor(stockData[0].historical.length / rebal);
  let j=1/rebal;
  let i=0;
  for (stock of stockData) {
    stock.historical.reverse();
  }

  for (; j<periods; j++) {
    let period = Math.round(j*rebal);
    for (stock of stockData) {
      let historical = stock.historical;
      //console.log(period-1);
      let shares = stock.percentage*balance*0.01 / historical[period-1].open;
   
      
      for (i=period-1; i<(j+1)*rebal-1; i++) {
        let day = historical[i];

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
  balance = dataTable[stockData[0].historical[i-1].date];
  }

  for (stock of stockData) {
    let historical = stock.historical;
    
    let period = Math.round(j*rebal);
    
    //console.log(period-1);
    let shares = stock.percentage*balance*0.01 / historical[period-1].open;

    for (k=i;k<stock.historical.length; k++) {
      let day = historical[k];
      let amount = shares * day.close;
     // console.log(amount, stock.symbol);
      
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
  //console.log(tableOut)
  return tableOut;

}

function bindAddButton() {
  document.getElementById('add').addEventListener('click', function(event) {
    
    
    let row = document.createElement('li');
    row.setAttribute('class', 'portfolio');

    for (i=0; i<2; i++) {
      let input = document.createElement('input');
      row.appendChild(input);
    }

    document.getElementById('tickers').appendChild(row);
    console.log('added');

  })
}

