const jwt = require('jsonwebtoken')
const Reporter = require('../Models/reporter')

const Auth = async(req, res, next) => {




    try {

        const token = req.header('Authorization').replace('Bearer ', '')
        const _id = jwt.verify(token, process.env.JWT_SECRET)._id;

        const reporter = await Reporter.findOne({ _id, tokens: token })

        if (!reporter) {
            return res.status(404).send({ error: true, message: 'Not Found' })
        }
        req.reporter = reporter;
        req.token = token;
        next()

    } catch (error) {

        res.status(401).send({ error: true, message: 'Please Authenticate' })
    }

}



module.exports = Auth;