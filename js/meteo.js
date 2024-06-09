const API_KEY = 'bd5e378503939ddaee76f12ad7a97608';

        window.addEventListener("load", function() {
            const cityElement = document.querySelector('.city');
            const city = cityElement.textContent.trim();

            // Requête pour les prévisions météo actuelles
            window.fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=fr&appid=${API_KEY}`)
                .then(res => res.json())
                .then(resJson => {
                    const currentTempElem = document.querySelector('.current-temp');
                    const minTempElem = document.querySelector('.min-temp');
                    const maxTempElem = document.querySelector('.max-temp');

                    currentTempElem.textContent = `${resJson.main.temp.toFixed(1)}°C`;

                    minTempElem.textContent = `${resJson.main.temp_min.toFixed(1)}°C`;
                    maxTempElem.textContent = `${resJson.main.temp_max.toFixed(1)}°C`;
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des données météo:', error);
                });
        });