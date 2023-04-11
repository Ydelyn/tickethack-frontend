document.querySelector('#input-date').value = moment().format('YYYY-MM-DD');

//Chercher de billets de train
document.querySelector('#input-submit').addEventListener('click', function(){
    let departure = document.querySelector('#input-departure').value;
    departure = departure.charAt(0).toUpperCase() + departure.slice(1);

    let arrival = document.querySelector('#input-arrival').value;
    arrival = arrival.charAt(0).toUpperCase() + arrival.slice(1);

    let date = document.querySelector('#input-date').value;

    if(Boolean(departure) && Boolean(arrival) && Boolean(date)){
        fetch('https://tickethack-backend-sigma.vercel.app/trips/search', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                departure, 
                arrival, 
                date
            })
        })
        .then(resp => resp.json())
        .then(data => {
            document.querySelector('#result').innerHTML = ''
            for(trip of data.trips){
                document.querySelector('#result').innerHTML +=`
                <div class="flex"><p>${trip.departure} > ${trip.arrival}</p><p>${moment(trip.date).format('LT')}</p></p><p>${trip.price}€</p><input type="button" value="Book" class="book rounded text-white bg-[#4FAA91]"></div>
                `
            }
            
            
        })
    }    
})