const link=  "http://api.weatherstack.com/current?access_key=b979457a77309d82d17558dd6c52eb15";

const root = document.getElementById ("root");
const popUp = document.getElementById ('popup');
const textInput = document.getElementById ('text-input');
const formSubmit = document.getElementById ('form');
const popupClose = document.getElementById ('close');

let store = {
    city: "Ney York",
    temperature: 0,
    observationTime: "00:00 AM",
    isDay: "yes",
    description: "",
    };



//function to fetch data
const fetchData = async () => {
    try {
    const query = localStorage.getItem("query") || store.city;
    const result = await fetch(`${link}&query=${query}`);
    const data = await result.json();


   // console.log(data.current.feelslike) - destructure
    const  { 
        location: {name},
        current: { 
            temperature,
            observation_time, 
            is_day, 
            weather_descriptions},
        } = data;
   
    console.log (data);
    
    store = {
        ...store,
        city: name,
        temperature: temperature,
        observationTime: observation_time,
        isDay: is_day,
        description: weather_descriptions [0],
    };
  
renderComponent();
} catch (err){
    console.log(err);
}
};

//change image
const getImg = (description) => {
    const value = description.toLowerCase();
  
    switch (value) {
      case "partly cloudy":
        return "partly.png";
      case "cloud":
        return "cloud.png";
      case "fog":
        return "fog.png";
      case "sunny":
        return "sunny.png";
      case "cloud":
        return "cloud.png";
      case "light drizzle and rain":
        return "cloud.png";
      default:
        return "the.png";
    }
  };



//result
 markup = () => {
    const {city, description, observationTime, temperature, isDay} = store;
    //day or night
    const contClassDay = isDay === 'yes' ? "is-day" : "";
    
      
    return `<div class="container ${contClassDay}">
              <div class="top">
                <div class="city">
                  <div class="city-subtitle">Weather Today in</div>
                    <div class="city-title" id="city">
                    <span>${city}</span>
                  </div>
                </div>
                <div class="city-info">
                  <div class="top-left">
                  <img class="icon" src="./img/${getImg(description)}" alt="" />
                  <div class="description">${description}</div>
                </div>
              
                <div class="top-right">
                  <div class="city-info__subtitle">as of ${observationTime}</div>
                  <div class="city-info__title">${temperature}°С</div>
                </div>
              </div>
            </div>
                  </div>`;
  };


  togglePopupClass=() => {
        popUp.classList.toggle ('active');
};

const renderComponent= () => {
    root.innerHTML = markup();

const cityByClick = document.getElementById ('city');
cityByClick.addEventListener ('click', togglePopupClass);
};

handleInput = (e) => {
    store = {
        ...store,
        city: e.target.value,
    };
};

handleSubmit = (e) => {
    e.preventDefault();
    e.preventDefault();
  const value = store.city;

  if (!value) return null;

  localStorage.setItem("query", value);
  fetchData();
  togglePopupClass();
};
    //console.log (store.city);


formSubmit.addEventListener ("submit", handleSubmit);
textInput.addEventListener('input', handleInput);
popupClose.onclick = togglePopupClass;

fetchData();