// dashboard
let dashboardButtons = ['deletemovie', 'deleteuser', 'adduser', 'updateuser', 'addmovie', 'updatemovie', 'getusermovie']
let dashboardDivs = ['delete-movie-div', 'delete-user-div', 'add-user-div', 'update-user-div', 'add-movie-div', 'update-movie-div', 'get-user-movie-div']

dashboardButtons.forEach((item, index) =>{
    document.getElementById(item).addEventListener('click', ()=> {
        dashboardDivs.forEach(elem => {
            document.getElementById(elem).style.display = 'none';
        })
        document.getElementById(dashboardDivs[index]).style.display = 'inline-block';
    })
})

