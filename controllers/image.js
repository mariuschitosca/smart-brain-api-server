const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '6f81018dca684f6ba58388e52785a183'
   });

const handleApiCall = (request, response) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, request.body.input)
        .then(data => {
            response.json(data);
        })
        .catch(error => response.status(400).json('Unable to work with Clarifai API.'))
}

const handleImage = (request, response, db) => {
    const { id } = request.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        response.json(entries[0]);
    })
    .catch(error => response.status(400).json('Unable to get entries.'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}