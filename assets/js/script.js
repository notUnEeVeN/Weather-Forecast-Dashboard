$(document).ready(function(){
    $('#search-button').on('click', function() {
        var inputValue = $('#search-input').val();

        var apiKey = "2c9bcb2e033ed7202d80b7f29fc73541";
        
        var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?" + 
        "q=" + inputValue + "&limit=5&appid=" + apiKey;

        fetch(apiUrl)
        .then(function (response) {
            if (!response.ok) {
                console.error('Network response failed');
                return;
            }
            return response.json();
        })
        .then(function (data) {
            var lat = data[0].lat;
            var lon = data[0].lon;

            var secondApiUrl = "http://api.openweathermap.org/data/2.5/forecast?" +
            "lat=" + lat +
            "&lon=" + lon +
            "&appid=" + apiKey;

            fetch(secondApiUrl)
            .then(function(response) {
                if (!response.ok) {
                    console.error('Network response failed')
                }
                return response.json();
            })
            .then(function(secondData) {
                console.log(secondData);
                
            })
        })
    });
});