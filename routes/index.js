var express = require('express');
var router = express.Router();
const userModel = require("./users")
const postsModel = require("./posts")
const passport = require("passport");
const upload = require("./multer");

const localStrategy = require("passport-local")
passport.use(new localStrategy(userModel.authenticate()))

/* GET home page. */
router.get('/', function (req, res, next) {
  // Pass error messages and modal state (login or register) to the home page
  res.render('home', {
    error: req.flash('error'), errortwo: req.flash('errortwo'),
  });
});

router.get('/logout', function (req, res, next) {
  res.redirect("/")
  res.render('home', {
    error: req.flash('error'), errortwo: req.flash('errortwo'),
  });
});

router.post('/upload', IsLoggedIn, upload.single('file'), async (req, res)=>{
  if(!req.file){
    return res.status(404).send('No files were uploaded.')
  }
  const user = await userModel.findOne({username: req.session.passport.user});
  const post = await postsModel.create({
    image: req.file.filename,
    imageText: req.body.filecaption,
    user: user._id,
  })

  user.posts.push(post._id);
  await user.save()
  res.render("main-profile")
});

// Profile page
router.get('/profile', IsLoggedIn, async function (req, res, next) {
  let user = await userModel.findOne({
    username: req.session.passport.user,
  })
  res.render("profile", {user});
});

router.get('/main-profile', IsLoggedIn, async function (req, res, next) {
  let user = await userModel.findOne({
    username: req.session.passport.user,
  })
  .populate("posts")
  res.render("main-profile", {user});
});

// Register route
router.post("/register", async function (req, res) {
  const { username, email, fullname, password } = req.body;

  try {
    // Create a new user instance
    const userData = new userModel({ username, email, fullName: fullname});

    // Register the user
    await userModel.register(userData, password);

    // Authenticate and redirect to the profile page
    passport.authenticate("local")(req, res, function () {
      res.redirect("/profile");
    });
  }
  catch (err) {
    console.error(err);
    // Flash error and modal type, then redirect back to the home page
    req.flash('errortwo', 'Registration failed: ' + err.message);
    req.flash('showModal', 'register');
    res.redirect("/");
  }
});

router.post("/login", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
      if (err) return next(err);

      if (!user) {
          req.flash("error", "Invalid username or password.");
          return res.render("home", {
              error: req.flash("error"),
              errortwo: "",
          });
      }

      req.logIn(user, function (err) {
          if (err) return next(err);
          return res.redirect("/profile");
      });
  })(req, res, next);
});


// Middleware to check if the user is authenticated
function IsLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/");
}

// router.get('/allposts', async function (req, res, next) {
//   let user = await userModel.findOne({_id: "67323bf755d43839bfbf82aa"}).populate('posts')
//   res.send(user)
// });

// router.get('/createuser', async function (req, res, next) {
//   let createduser = await userModel.create({
//     username: "harsh",
//     password: "harsh",
//     posts: [],
//     email: "harsh@gmail.com",
//     fullName: "Harsh Vandana Sharma"
//   })

//   res.send(createduser)
// });

// router.get('/createpost', async function (req, res, next) {
//   let createdpost = await postsModel.create({
//     postText: "Hello Kase ho sare",
//     user: "67323bf755d43839bfbf82aa"
//   })
//   let user = await userModel.findOne({_id: "67323bf755d43839bfbf82aa"})
//   user.posts.push(createdpost._id);
//   await user.save();
//   res.send("done")
// });

module.exports = router;
