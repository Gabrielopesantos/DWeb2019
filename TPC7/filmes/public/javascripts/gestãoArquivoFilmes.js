function removerFilme(id) {
    axios.delete('/filmes/' + id)
        .then(response => window.location.assign('/filmes/'))
        .catch(error => console.log(error))
}

function editarFilme(id) {

    content = {
        idFilme: id,
        title: document.getElementById('title').value,
        year: document.getElementById('year').value,
        cast: document.getElementById('cast').value,
        genres: document.getElementById('genres').value,
    }

    axios.put('/filmes/' + id, content)
        .then(response => window.location.assign('/filmes/'))
        // ?????????????????????
        .catch(error => window.location.assign('/filmes/'))
} 