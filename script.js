document.querySelector('#input-date').value = moment().format('YYYY-MM-DD');

//Chercher des billets de train et en sélectionner un
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
            if(data.trips.length === 0){
                document.querySelector('#result').innerHTML = `
                <img src="./img/notfound.png" alt="Image de train" class="m-auto w-1/2">
                <hr class="w-3/4 mx-auto my-6 h-0.5 bg-[#4FAA91]">
                <p class="">No trip found.</p>`
            }else{
                for(trip of data.trips){
                    document.querySelector('#result').innerHTML +=`
                    <div class="flex justify-between bg-zinc-400 p-2 m-1 rounded-lg">
                        <p style="display:none">${trip.date}</p>
                        <p>${trip.departure}</p>
                        <p class="mx-1">></p>
                        <p class="mx-1">${trip.arrival}</p>
                        <p data-locale="fr" class="mx-1">${moment(trip.date).format('HH:mm')}</p>
                        <p class="mx-1">${trip.price}€</p>
                        <input type="button" value="Book" class="cart rounded text-white bg-[#4FAA91] mx-1 p-1">
                    </div>
                    `
                }
                const select = document.querySelectorAll('.cart')
                for(button of select){
                    button.addEventListener('click', function(){
                        const date = this.parentNode.firstElementChild.textContent
                        const departure = this.parentNode.firstElementChild.nextElementSibling.textContent
                        const arrival = this.parentNode.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.textContent
                        fetch('https://tickethack-backend-sigma.vercel.app/trips/select', {
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
                            window.location.assign('cart.html')
                        })
                    })
                }
            } 
        })
    }    
})