const Reporter = require('../Models/reporter')


const index = async(req, res) => {


    try {

        res.status(200).send(req.reporter);

    } catch (error) {
        return res.status(500).send(error.message)
    }

}
const create = async(req, res) => {


    try {
        const body = req.body;

        const reporter = new Reporter(body);
        await reporter.save()
        const token = await reporter.generateToken()
        res.status(200).send({ reporter, token });

    } catch (error) {
        return res.status(500).send(error.message)
    }


}


const update = async(req, res) => {

    try {

        const updates = Object.keys(req.body);
        const allowsUpdates = ['email', 'phone', 'password']
        const isValidUpdates = updates.every(el => allowsUpdates.includes(el))


        if (!isValidUpdates) {
            return res.status(401).send('Not Allowed Update')
        }

        const _id = req.params.id

        const reporter = await Reporter.findById(_id);

        const body = req.body;

        updates.forEach(update => reporter[update] = body[update])
        await reporter.save()
        res.status(200).send(reporter);
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


const deleteFun = async(req, res) => {

    try {

        const _id = req.params.id
        const reporter = await Reporter.findByIdAndRemove(_id);

        res.status(200).send({ message: 'deleted' });
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


const login = async(req, res) => {

    try {

        const reporter = await Reporter.login(req.body.email, req.body.password);
        const token = await reporter.generateToken()

        res.status(200).send({ reporter, token });
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const logout = async(req, res) => {

    try {

        const reporter = req.reporter;

        const tokens = reporter.tokens.filter(el => el != req.token);
        reporter.tokens = tokens;
        await reporter.save();

        res.status(200).send({ message: 'logout successfully' });
    } catch (error) {
        return res.status(500).send(error.message)
    }
}




const uploadImage = async(req, res) => {

    try {

        const reporter = req.reporter;

        if (!req.file) {
            return res.status(500).send('Error')
        }
        reporter.image = req.file.buffer;
        await reporter.save();

        res.status(200).send(reporter);
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = { index, create, update, deleteFun, login, logout, uploadImage }