$(document).ready(function(){
    $('#search-button').on('click', function() {
        var inputValue = $('#search-input').val();
        
        var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?" + 
        "q=" + inputValue + "&limit=5&appid=2c9bcb2e033ed7202d80b7f29fc73541";

        fetch(apiUrl)
        .then(function (response) {
            if (!response.ok) {
                console.error('Network response was not ok');
                return;
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
    });
});