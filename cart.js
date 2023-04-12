fetch('https://tickethack-backend-sigma.vercel.app/trips/select', { method: "GET" })
.then(resp => resp.json())
.then(data => {
    console.log(data)
    document.querySelector('#cart').innerHTML = `
    <div class="flex">
        <h3>My cart</h3> 
    </div>`
    let total = 0;
    for(trip of data.trips){
        document.querySelector('#cart').innerHTML += `
        <div class="flex">
            <p style="display:none">${trip.date}</p>
            <p>${trip.departure}</p>
            <p>></p>
            <p>${trip.arrival}</p>
            <p data-locale="fr">${moment(trip.date).format('HH:mm')}</p>
            <p>${trip.price}€</p>
            <input type="button" value="X" class="book rounded text-white bg-[#4FAA91]">
        </div>`
        total += trip.price;
    }

    document.querySelector('#cart').innerHTML += `
    <div class="flex">
        <div>Total : ${total}€</div>
        <input type="button" value="Purchase" id="book" class="rounded text-white bg-[#4FAA91]"></input>
    </div>`
    
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

    const book = document.querySelectorAll('.book')
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
                this.parentNode.remove()


            })
        })
    }
})



