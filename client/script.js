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
            let percentage = ticker.nextElementSibling;
            data[ticker.value] = percentage.value;
        }

        //console.log(JSON.stringify(data));

        
        var request = new XMLHttpRequest();
        request.open('POST', '/getdata', true);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        request.addEventListener('load', function() {
            if (request.status >= 200 && request.status < 400) {
                var response = JSON.parse(request.responseText);
                //console.log(response);
                //console.log(response[0].historical[0].date.split('-'));
               // console.log(response[0].historical[0].date.split('-'));
               for (stock of response) {
                 //console.log(stock.historical);
                 let dataTable = [];
                 //console.log(stock.historical);
                 for (day of stock.historical) {
                   console.log(day.close);
                   let dateArray = day.date.split('-');
                   
                   //[new Date(2018, 9, 27), 69];
                   dataTable.push([new Date(dateArray[0], dateArray[1], dateArray[2]), day.close]);
                 }
               }

                drawBasic();
            } else {
                console.log('Error in network request: ' + req.statusText);
            }
        })
        
        request.send(JSON.stringify(data));
    })
}


function drawBasic() {

      var data = new google.visualization.DataTable();
      data.addColumn('date', 'X');
      data.addColumn('number', 'Dogs');

      data.addRows([
        [new Date(2018, 9, 27), 69]
      ]);

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
