const Url = require('../models/url');
const User = require('../models/user');

exports.getAllAnalytics = async (req, res) => {
    try {
        const urls = await Url.find();
        res.json({ urls });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteUrl = async (req, res) => {
    try {
        const url = await Url.findById(req.params.id);
        if (!url) {
            return res.status(404).json({ message: 'URL not found' });
        }
        await url.remove();
        res.json({ message: 'URL deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.blockUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.blocked = true;
        await user.save();
        res.json({ message: 'User blocked successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

