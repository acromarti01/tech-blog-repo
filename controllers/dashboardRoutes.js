const router = require("express").Router();
const withAuth = require("../utils/authentication");
const { User, Blog } = require("../models")

router.get("/", withAuth, async(req, res) => {
  try {
    if (req.session.logged_in) { next(); } 
    else { res.redirect("/user/login"); }
    const dbBlogData = await Blog.findAll({
      where: { user_id: 1 },
      include: [
        {
          model: User,
          attributes: ["name"],
        }
      ]
    });
    const blogs = dbBlogData.map((blog) => blog.get({ plain: true }));

    // Send the rendered Handlebars.js template back as the response  
    res.render("dashboard", {
      blogs,
      logged_in: req.session.logged_in,
    });
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/create-post", async(req, res) => {
  try{
    res.render("create-post");
  }
  catch (err) { res.status(500).json(err); }  
});

router.get("/edit-blog", async(req, res) => {
  try{
    console.log("SESSION", req.session);
    const blog = {
      title: req.session.title,
      content: req.session.content,
    }
    res.render("edit-blog", {
      blog,
    });
  }
  catch (err) { res.status(500).json(err); }  
});

router.post("/", async (req, res) => {
  try {
    const date = new Date().toLocaleDateString();
    const mySqlDate = modifyDateForMySql(date);
    const { title, content } = req.body;
    const blog = {
      title: title,
      content: content,
      posted_date: mySqlDate, 
      user_id: 1, //req.session.user_id
    }
    await Blog.create(blog);
    res.status(200).json({message: "Blog is Successfully Created"});
  }
  catch (err) { res.status(500).json(err); }
});

router.post("/edit-blog", async(req,res) => {
  try{
    req.session.save(() => {
      req.session.title = req.body.title;
      req.session.content = req.body.content;      
    });
    res.status(200).json({message: "Success"});
  }
  catch (err) {res.status(500).json(err);}
  
});

module.exports = router;

function modifyDateForMySql(date) {
  const dateArray = date.split("/");
  return dateArray[2] + "/" + dateArray[0] + "/" + dateArray[1];
}