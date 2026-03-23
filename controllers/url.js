import { nanoid } from "nanoid";

import URL from '../models/url.js'

async function handleGenerateNewShortUrl(req, res) {
    const shortId = nanoid(8);
    const body = req.body;
    if(!body.url){ return res.status(400).json({error : 'url required'})}
    await URL.create({
        shortId : shortId,
        redirectUrl: body.url,
        visitHistory : [],
        createdBy :req.user._id,
    })
    const urls = await URL.find({createdBy : req.user._id});
    res.render("home" , {         //to render on home page
    id : shortId,                  // used in home.ejs as locals.id
    urls: urls                    // used to show all urls on the home page after creating a new short url
})
}

async function handleGetAnalytics(req,res) {
    const shortId = req.params.shortid;
    const result = await URL.findOne({ shortId : shortId})
    res.json({totalClicks : result.visitHistory.length , analytics : result.visitHistory})
}


export {
    handleGenerateNewShortUrl,
    handleGetAnalytics,
}