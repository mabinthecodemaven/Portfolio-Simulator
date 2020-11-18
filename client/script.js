bindGenerateButton();

function bindGenerateButton() {
    document.getElementById('Generate').addEventListener('click', function(event) {
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
        
        request.send(JSON.stringify(data));
        event.preventDefault();
    })
}
