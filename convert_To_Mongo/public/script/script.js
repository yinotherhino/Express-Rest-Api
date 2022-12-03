
let editButtons = document.getElementsByClassName('edit-button')
for(let i=0; i<editButtons.length; i++){
    editButtons[i].addEventListener('click', (e)=>{
        document.getElementsByClassName('modal')[0].style.display = 'block';
        // console.log(e.path[3])
        let title = document.getElementById(e.target.id.slice(4)).innerHTML
        document.getElementById('titleinput').setAttribute('value', title)
    })
}

let deleteButtons = document.getElementsByClassName('delete-button')
for(let i=0; i<deleteButtons.length; i++){

    deleteButtons[i].addEventListener('click', (e)=>{
        let id = e.target.id.slice(6);
        axios.post(`/deletemovie`, { id },{withCredentials: true})
        .then(apiRes =>{
            alert("deleted successfully")
            location.reload();
        })
        .catch(err =>{
            alert('Error deleting movie')
        })
    })

}

document.getElementsByTagName('body')[0].addEventListener('click', function(e) {
    if (e.target.className == 'modal') {
        document.getElementsByClassName('modal')[0].style.display= 'none';
    }
    });