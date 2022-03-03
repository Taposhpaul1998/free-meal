const searchFood = () => {
    const searchFild = document.getElementById('search-fild');
    const searchText = searchFild.value;

    // clear data 
    searchFild.value = '';
    if (searchText == '') {
        alert('place type carent name')
    }
    else {
        // load data 
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => searchFildResult(data.meals))
    }


}

const searchFildResult = meals => {
    const searchResult = document.getElementById('searchResult');
    searchResult.textContent = '';
    // if (meals.length == 0) {
    //     alert('place type carent name')
    // }
    meals.forEach(meal => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div onclick="loadMealDetail(${meal.idMeal})" class="card">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                 <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
                 </div>
            </div>
        `;
        searchResult.appendChild(div);

        // console.log(result);
    });
}
// async meal detailes
const loadMealDetail = async mealId => {
    // console.log(mealId);
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    const res = await fetch(url);
    const data = await res.json();
    displayMealDetail(data.meals[0])

    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => displayMealDetail(data.meals[0]))
}

const displayMealDetail = meal => {
    // console.log(meal);
    const mealDetails = document.getElementById('meal-details');
    mealDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top " alt="...">
    <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
        <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
    </div>
    `;
    mealDetails.appendChild(div);
    mealDetails.scrollIntoView();
}