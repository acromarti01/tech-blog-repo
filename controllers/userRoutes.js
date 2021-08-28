const router = require("express").Router();
const User = require("../models/User")

router.get("/signUp", async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  res.render("signUp");
});

router.get("/login", async (req, res) => {
    // Send the rendered Handlebars.js template back as the response
    res.render("login");
  });

router.post("/signUp", async (req, res) => {
  try {    
    const userData = await User.create(req.body);
    req.session.save(() => {
      req.session.id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } 
  catch (err) { res.status(400).json(err); }
});

router.post("/login", async(req,res) => {
  try {
    const userData = await User.findOne({ where: { name: req.body.name } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });


router.get("/allusers", async (req,res) => {
  const users = await User.findAll();
  res.status(200).json(users);
})

module.exports = router;