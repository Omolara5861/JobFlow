const register = async (req, res) => {
    res.status(201).send('User Registered');
}

const login = async (req, res) => {
    res.status(200).send('User Logged In')
}

module.exports = {
    register,
    login
}