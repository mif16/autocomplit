export default function getAllCities(url) {
    return new Promise((success) => {

        let all_cities = [];
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", url, true);
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let cities: Array = JSON.parse(this.responseText);
                for (let i = 0; i < cities.length; i++)
                    all_cities.push(cities[i].City);
                success(all_cities);
            }
        };
        xmlhttp.send();

    });
}