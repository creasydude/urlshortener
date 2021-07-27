import express from 'express';
import urlSchema from '../db/urlSchema.js'
import generateLink from '../linkGenerator.js'
const Router = express.Router();


Router.get('/', (req, res) => {
    res.status(403).json({ message: "403 Forbidden!" })
})

Router.get('/:id', async (req, res) => {
    const urlShortener = await urlSchema.findOne({ shortenedUrl: req.params.id });
    if (urlShortener !== null) {
        res.status(200).json(urlShortener);
    } else {
        res.status(404).json({ message: "404 Not Found!" })
    }
})

Router.post('/', async (req, res) => {
    const urlShortener = new urlSchema({
        normalUrl: req.body.normalUrl,
        shortenedUrl: await generateLink(),
    });

    try {
        const saveUrl = await urlShortener.save()
        res.status(200).json({ saveUrl })
    } catch (err) {
        res.status(400).json({ message: err })
    }

})

export default Router;