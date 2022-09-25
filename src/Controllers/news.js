const News = require('../Models/news')


const index = async(req, res) => {


    try {

        const news = await News.find({})

        res.status(200).send(news);

    } catch (error) {
        return res.status(500).send(error.message)
    }

}
const create = async(req, res) => {


    try {
        const body = req.body;

        const news = new News({...body, reporter: req.reporter._id });
        await news.save()
        res.status(200).send(news);

    } catch (error) {
        return res.status(500).send(error.message)
    }


}


const update = async(req, res) => {

    try {

        const updates = Object.keys(req.body);
        const allowsUpdates = ['title', 'body']
        const isValidUpdates = updates.every(el => allowsUpdates.includes(el))


        if (!isValidUpdates) {
            return res.status(401).send('Not Allowed Update')
        }

        const _id = req.params.id

        const news = await News.findOne({ _id, reporter: req.reporter._id });

        if (!news) {
            return res.status(404).send('Not Found')
        }

        const body = req.body;

        updates.forEach(update => news[update] = body[update])
        await news.save()
        res.status(200).send(news);
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


const deleteFun = async(req, res) => {

    try {

        const _id = req.params.id
        const news = await News.findOneAndDelete({ _id, reporter: req.reporter._id });

        if (!news) {
            return res.status(404).send('Not Found')
        }

        res.status(200).send({ message: 'deleted' });
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


const getOne = async(req, res) => {

    try {

        const _id = req.params.id
        const news = await News.findById(_id);



        if (!news) {
            return res.status(404).send('Not Found')
        }
        res.status(200).send(news);
    } catch (error) {
        return res.status(500).send(error.message)
    }
}







module.exports = { index, create, update, deleteFun, getOne }