const weatherForm = document.querySelector("form")
const Search = document.querySelector("input")
const msg_1 = document.querySelector("#msg_1")
const msg_2 = document.querySelector("#msg_2")



weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const location = Search.value

    msg_1.innerHTML = "Loding..."
    msg_2.innerHTML = ""
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {

                msg_1.innerHTML = data.error
            } else {

                msg_1.innerHTML = "<br>" + data.Location
                msg_2.innerHTML = "<br>" + "Day_Temperature :- " + data.Day_Temperature + "°C" + "<br>" + "Pressure :- " + data.Pressure + "<br>" + "Rain_Probability :- " + data.Rain_Probability + "<br>" + "Sky :- " + data.Sky + "<br>" + "humidity :- " + data.humidity
            }

        })
    })

})
