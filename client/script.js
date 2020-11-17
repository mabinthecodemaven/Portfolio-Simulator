bindGenerateButton();

function bindGenerateButton() {
    document.getElementById('Generate').addEventListener('click', function(event) {
        var form = document.getElementsByTagName('form')[0];
        var portfolio = {};
        alert(form.childNodes);

        
        /*var request = new XMLHttpRequest();
        request.open('GET', '/getdata', true);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        
        request.send(null); */
        event.preventDefault();
    })
}
