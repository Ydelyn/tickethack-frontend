//view bookings (past & next trips)
fetch('https://tickethack-backend-sigma.vercel.app/trips/book', { method: "GET" })
.then(resp => resp.json())
.then(data => {
    if(data.trips.length != 0){
        data.trips.sort((a,b) => b.date - a.date);

        document.querySelector('#cart').innerHTML = `<h3>My bookings</h3>`;
        
        for(trip of data.trips){
            let departure = `<p class="text-[#4FAA91] font-semibold">Departure ${moment(trip.date).fromNow()}</p>`
            if(departure.includes('ago')){ departure = '<p class="text-red-700 font-semibold">Already departed</p>' }

            document.querySelector('#cart').innerHTML += `
            <div class="grid grid-cols-6 grid-cols-[1fr_0.5fr_1fr_2fr_2fr_4fr] grid-rows-1 bg-[#F6EEEF] rounded-lg p-2 my-3 mx-6">
                <p>${trip.departure}</p>
                <p>></p>
                <p>${trip.arrival}</p>
                <p data-locale="fr">${moment(trip.date).format('HH:mm')}</p>
                <p class="price" >${trip.price}€</p>
                ${departure}
            </div>`
        };

        document.querySelector('#cart').innerHTML += `
        <div>
            <hr class="w-1/2 mx-auto my-6 h-0.5 bg-black">
            <p class="m-4 text-[#4FAA91]">Enjoy your travels with Tickethack!</p>
        </div`;
    }
})