const { func } = require('joi');
const url = require('url');
const generalTools = {};
const multer = require('multer')
const fs = require("fs");
const path = require("path");

generalTools.sessionChecker = function(req, res, next) {
    if (req.cookies.user_sid && req.session.user) {
        return res.redirect('/api/dashboard')
    };

    return next()
};

generalTools.loginChecker = function(req, res, next) {
    if (!req.session.user) {
        return res.redirect("/api/login")
    };

    return next()
};
const avatarStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../public/images/avatars'))
    },
    filename: function(req, file, cb) {
        cb(null, `${req.session.user.username}-${Date.now()}-${file.originalname}`)
    }
});


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

//CREAT AVATAR FOLDER

module.exports = (function() {
    // createAdmin();
    (fs.existsSync(path.join(__dirname, '../public/images')) || fs.mkdirSync(path.join(__dirname, '../public/images')));
    (fs.existsSync(path.join(__dirname, '../public/images/avatars')) || fs.mkdirSync(path.join(__dirname, '../public/images/avatars')));

})();



module.exports = generalTools