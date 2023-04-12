//view bookings (past & next trips)
fetch('https://tickethack-backend-sigma.vercel.app/trips/book', { method: "GET" })
.then(resp => resp.json())
.then(data => {
    if(data.trips.length != 0){
        data.trips.sort((a,b) => b.date - a.date);

        document.querySelector('#cart').innerHTML = `<h3>My bookings</h3>`;
        
        for(trip of data.trips){
            let departure = `Departure ${moment(trip.date).fromNow()}`
            if(departure.includes('ago')){ departure = 'Already departed' }

            document.querySelector('#cart').innerHTML += `
            <div class="grid grid-cols-6 grid-cols-[1fr_0.5fr_1fr_2fr_2fr_4fr] grid-rows-1 bg-slate-200 rounded-lg p-2 my-3 mx-6">
                <p>${trip.departure}</p>
                <p>></p>
                <p>${trip.arrival}</p>
                <p data-locale="fr">${moment(trip.date).format('HH:mm')}</p>
                <p class="price" >${trip.price}€</p>
                <p>${departure}</p>
            </div>`
        };

        document.querySelector('#cart').innerHTML += `
        <div>
            <hr>
            <p>Enjoy your travels with Tickethack!</p>
        </div`;
    }
})