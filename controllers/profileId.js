const handleProfileId = (request, response, db) => {
	const { id } = request.params;
	// let found = false;
    db.select('*').from('users').where({
        id: id
    })
    .then(user => {
        // console.log(user)
        if (user.length) {
            response.json(user[0])
        } else {
            response.status(400).json('Not found.')
        }
    })
    .catch(error => response.status(400).json('Error getting user.'))
}

module.exports = {
    handleProfileId: handleProfileId
}