const handle = require("../controller/news.controller");
const multer_cloudinary = require("../middleware/multer_cloudinary");
const protect_route_admin = require("../security/protect_route_admin");

const news_route = (app) => {
  app.post(
    "/upload-news",
    protect_route_admin,
    multer_cloudinary.fields([{ name: "photo" }, { name: "logo" }]), // Updated to use multer_cloudinary
    handle.create
  );

  app.put(
    "/edit-news/:id",
    protect_route_admin,
    multer_cloudinary.fields([{ name: "photo" }, { name: "logo" }]), // Updated to use multer_cloudinary
    handle.updateNews
  );

  app.delete("/remove-news/:id", protect_route_admin, handle.deleteNews);

  app.get("/get-all", handle.getAll);
  app.get("/getone/:id", handle.getOne);
};

module.exports = news_route;
