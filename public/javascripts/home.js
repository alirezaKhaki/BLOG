$(function() {
    $.get('/api/allArticles', (err, data) => {
        console.log(err);
        console.log(data);
    })
})