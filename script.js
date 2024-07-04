const container = document.querySelector(".continer");
const seats = document.querySelectorAll(".row .seat:not(ocipaid)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
populate();
let ticketPrice = +movieSelect.value;

/////save selected movie index price//////
function seatMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

//////update selectedseat
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const seatIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  localStorage.setItem(" selectedSeats", JSON.stringify(seatIndex));
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}
///////////////////get data from localstorage and papulate ui////
function populate() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats != null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
}
/////////////////////////movie select event//
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  seatMovieData(e.target.seatIndex, e.target.value);
  updateSelectedCount();
});
/////////////////////////seat click event///
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("ocipaid")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});
