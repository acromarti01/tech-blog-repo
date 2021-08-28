const router = require("express").Router();
const { User, Blog } = require("../models");

router.get("/", async(req, res) => {
  // Send the rendered Handlebars.js template back as the response 
  try{
    const dbBlogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        }
      ]
    });

    const blogs = dbBlogData.map((blog) => blog.get({ plain: true }));
    res.render("homepage", {
      blogs,
      //logged_in: req.session.logged_in
    });
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  } 
});

// router.post("/", async(req, res) => {
  
// })

router.get("/allBlogs", async(req, res) => {
  const dbBlogData = await Blog.findAll({ where: { user_id: 1 },
    include: [
      {
        model: User,
        attributes: ["name"],
      }
    ]
  });
  res.json(dbBlogData);

});

module.exports = router;
