// dashboard
let dashboardButtons = ['deletemovie', 'updateuser', 'addmovie', 'updatemovie']
let dashboardDivs = ['delete-movie-div', 'update-user-div', 'add-movie-div', 'update-movie-div']

dashboardButtons.forEach((item, index) =>{
    document.getElementById(item).addEventListener('click', ()=> {
        dashboardDivs.forEach(elem => {
            document.getElementById(elem).style.display = 'none';
        })
        document.getElementById(dashboardDivs[index]).style.display = 'inline-block';
    })
})
