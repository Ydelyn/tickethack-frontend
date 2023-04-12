//display cart with selected trips
fetch('https://tickethack-backend-sigma.vercel.app/trips/select', { method: "GET" })
.then(resp => resp.json())
.then(data => {
    if(data.trips.length != 0){
        document.querySelector('#cart').innerHTML = `
            <h3>My cart</h3>`

        for(trip of data.trips){
            document.querySelector('#cart').innerHTML += `
            <div class="grid grid-cols-6 grid-cols-[1fr_0.5fr_1fr_2fr_2fr_0.5fr] grid-rows-1 bg-slate-200 rounded-lg p-2 my-3 mx-6">
                <p style="display:none">${trip.date}</p>
                <p>${trip.departure}</p>
                <p>></p>
                <p>${trip.arrival}</p>
                <p data-locale="fr">${moment(trip.date).format('HH:mm')}</p>
                <p class="price" >${trip.price}€</p>
                <input type="button" value="X" class="book rounded text-white bg-[#4FAA91]">
            </div>`
        }
    }

    let total = 0;
    const prices = document.querySelectorAll('.price')
    for(price of prices){
        total += Number(price.textContent.replace(/€/g, ''))
    }
    if(total !== 0){
        document.querySelector('#cart').innerHTML += `
        <div class="flex justify-between content-center px-6 py-4 bg-blue-950 rounded-b-md mt-6">
            <div id="total" class="text-white">Total : ${total}€</div>
            <input type="button" value="Purchase" id="purchase" class="rounded text-white bg-[#4FAA91] py-1 px-2"></input>
        </div>`
    }
    


    //purchase selected trips
    document.querySelector('#purchase').addEventListener('click', function(){
        fetch('https://tickethack-backend-sigma.vercel.app/trips/book', {
            method: "POST"
        })
        .then(resp => resp.json())
        .then(data => {
            window.location.assign('booking.html')
        })
    })

    

    // remove a trip from cart
    let book = document.querySelectorAll('.book')
    for(button of book){
        button.addEventListener('click', function(){
            const date = this.parentNode.firstElementChild.textContent
            const departure = this.parentNode.firstElementChild.nextElementSibling.textContent
            const arrival = this.parentNode.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.textContent
            
            fetch('https://tickethack-backend-sigma.vercel.app/trips/select/remove', {
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
                total -= Number(this.previousElementSibling.textContent.replace(/€/g, ''))
                document.querySelector('#total').textContent = `Total : ${total}€`
                if(total === 0){
                    document.querySelector('#cart').innerHTML = `
                    <p class="m-2">No tickets in your cart.</p>
                    <p class="m-2">Why not <a href="index.html" class="text-[#4FAA91]">plan a trip?</a></p>`
                }

                this.parentNode.remove()
            })
        })
    }
})