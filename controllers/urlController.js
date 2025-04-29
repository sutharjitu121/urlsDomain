const shortid = require('shortid');
const Url = require('../models/url');

exports.shortenUrl = async (req, res) => {
    try {
        const { originalUrl } = req.body;
        const base = process.env.BASE_URL || 'http://localhost:3000';

        const shortCode = costomAlias || shortid.generate();
        const exists = await Url.findOne({ shortCode });
        if (exists) {
            return res.status(400).json({ message: 'Short code already exists' });
        }
        const shortUrl = `${base}/${shortCode}`;
        const url = new Url({ originalUrl, shortCode, shortUrl, createdBy: req.user.id });
        await url.save();
        res.json({ shortUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.redirectUrl = async (req, res) => {
    try {
        const url = await Url.findOne({ shortCode: req.params.shortCode });
        if (!url) {
            return res.status(404).json({ message: 'URL not found' });
        }
        url.click.push({
            userAgent: req.headers['user-agent'],
            ip: req.ip
        })
        await url.save();
        return res.redirect(url.originalUrl);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAnalytics = async (req, res) => {
    try {
        const urls = await Url.find({ createdBy: req.user.id });
        res.json({ urls });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};