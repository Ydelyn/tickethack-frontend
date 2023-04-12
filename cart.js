//book trips
fetch('https://tickethack-backend-sigma.vercel.app/trips/select', { method: "GET" })
.then(resp => resp.json())
.then(data => {
    console.log(data)
    if(data.trips.length != 0){
        document.querySelector('#cart').innerHTML = `
        <div class="flex">
            <h3>My cart</h3> 
        </div>`
        for(trip of data.trips){
            document.querySelector('#cart').innerHTML += `
            <div class="flex">
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

    //total update
    let total = 0;
    const prices = document.querySelectorAll('.price')
    for(price of prices){
        total += Number(price.textContent.replace(/€/g, ''))
    }
    if(total !== 0){
        document.querySelector('#cart').innerHTML += `
        <div class="flex">
            <div id="total" >Total : ${total}€</div>
            <input type="button" value="Purchase" id="book" class="rounded text-white bg-[#4FAA91]"></input>
        </div>`
    }
    
    document.querySelector('#book').addEventListener('click', function(){
        fetch('https://tickethack-backend-sigma.vercel.app/trips/book', {
            method: "POST"
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
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
                console.log(data)
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