const shortid = require('shortid');
const Url = require('../models/url');

exports.shortenUrl = async (req, res) => {
    try {
        const { originalUrl, customAlias } = req?.body;
        if(originalUrl){
            const base = process.env.BASE_URL || 'http://localhost:3000';

            const shortCode = customAlias || shortid.generate();
            const exists = await Url.findOne({ shortCode });
            if (exists) {
                return res.status(400).json({ message: 'Short code already exists' });
            }
            const shortUrl = `${base}/${shortCode}`;
            console.log('req.user.id', req);
            const url = new Url({ originalUrl, shortCode, shortUrl, createdBy: req.user.id });
            await url.save();
            res.json({ shortUrl });
        } else {
            res.status(400).json({ message: 'Original URL is required' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.redirectUrl = async (req, res) => {
    try {
        if(req?.params?.shortCode){
            const url = await Url.findOne({ shortCode: req.params.shortCode });
            if (!url) {
                return res.status(404).json({ message: 'URL not found' });
            }
            url?.clicks.push({
                userAgent: req.headers['user-agent'],
                ip: req.ip
            })
            await url.save();
            return res.status(200).json({ url: url.originalUrl });
        } else {
            res.status(400).json({ message: 'Short code is required' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAnalytics = async (req, res) => {
    try {
        console.log('req.user.id', req.user.id);
        const urls = await Url.find({ createdBy: req.user.id });
        res.json({ urls });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};