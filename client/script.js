bindGenerateButton();

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
                console.log(response)
            } else {
                console.log('Error in network request: ' + req.statusText);
            }
        })
        
        request.send(JSON.stringify(data));
    })
}
