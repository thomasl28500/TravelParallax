const API_KEY = 'bd5e378503939ddaee76f12ad7a97608';

        window.addEventListener("load", function() {
            const cityElement = document.querySelector('.city');
            const city = cityElement.textContent.trim();
            const cityMeteo = document.querySelector('.cityMeteo');

            // Requête pour les prévisions météo actuelles
            window.fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=fr&appid=${API_KEY}`)
                .then(res => res.json())
                .then(resJson => {
                    const weatherDescriptionElem = document.querySelector('.weather-description');
                    const currentTempElem = document.querySelector('.current-temp');
                    const minTempElem = document.querySelector('.min-temp');
                    const maxTempElem = document.querySelector('.max-temp');
                    const weatherIconElem = document.getElementById('wicon');

                    cityMeteo.textContent = resJson.name;
                    weatherDescriptionElem.textContent = resJson.weather[0].description;
                    currentTempElem.textContent = `${resJson.main.temp.toFixed(1)}°`;

                    minTempElem.textContent = `${resJson.main.temp_min.toFixed(1)}°`;
                    maxTempElem.textContent = `${resJson.main.temp_max.toFixed(1)}°`;
                    weatherIconElem.src = `http://openweathermap.org/img/wn/${resJson.weather[0].icon}@2x.png`;
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des données météo:', error);
                });

            // Requête pour les prévisions météo des 5 jours suivants
            window.fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=fr&appid=${API_KEY}`)
                .then(res => res.json())
                .then(resJson => {
                    console.log(resJson);

                    const prevMeteoElem = document.querySelector('.prevMeteo');
                    prevMeteoElem.innerHTML = '';

                    const forecastList = resJson.list;
                    for (let i = 0; i < forecastList.length; i += 8) {
                        const forecast = forecastList[i];
                        const date = new Date(forecast.dt * 1000);
                        const day = date.toLocaleDateString('fr-FR', { weekday: 'short' });
                        const tempMin = forecast.main.temp_min;
                        const tempMax = forecast.main.temp_max;
                        const icon = forecast.weather[0].icon;
                        const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

                        const forecastItem = `
                            <li>
                                <h3 class="h5">${day}</h3>
                                <p>
                                    <img src="${iconUrl}" alt="Weather icon" id="iconPrev"><br>
                                    <span class="red">${tempMin.toFixed(1)}°</span> | <span class="green">${tempMax.toFixed(1)}°</span>
                                </p>
                            </li>
                        `;

                        prevMeteoElem.innerHTML += forecastItem;
                    }
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des prévisions météo:', error);
                });
        });