const { func } = require('joi');
const url = require('url');
const generalTools = {};
const multer = require('multer')
const fs = require("fs");
const path = require("path");

//check if the clinet is logged in then redirects them to dashboard page
generalTools.sessionChecker = function(req, res, next) {
    if (req.cookies.user_sid && req.session.user) {
        return res.redirect('/api/dashboard')
    };

    return next()
};

//check if the clinet isn't logged in the redirects them to login page
generalTools.loginChecker = function(req, res, next) {
    if (!req.session.user) {
        return res.redirect("/api/login")
    };

    return next()
};

//path of the user's avatar
const avatarStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../public/images/avatars'))
    },
    filename: function(req, file, cb) {
        cb(null, `${req.session.user.username}-${Date.now()}-${file.originalname}`)
    }
});

//path of the article's avatar
const articleStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../public/images/avatars'))
    },
    filename: function(req, file, cb) {
        cb(null, `${req.session.user._id}-${Date.now()}-${file.originalname}`)
    }
});

//check the file type for article's avatar
generalTools.uploadArticle = multer({
        storage: articleStorage,
        fileFilter: function(req, file, cb) {
            checkFile(file, cb)
        }
    })
    //check the file type for users's avatar
generalTools.uploadAvatar = multer({
    storage: avatarStorage,
    fileFilter: function(req, file, cb) {
        checkFile(file, cb)
    }
})





//CHECK TYPE OF UPLOADING FILE
function checkFile(file, cb) { //allowed ectentions
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }

}



module.exports = generalTools