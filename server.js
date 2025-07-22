const express = require("express");
const app = express();
const connectDB = require("../Backend/config/db");
const cors = require("cors");
const authRoutes = require("../Backend/routes/authRoutes");
const userRoutes = require("../Backend/routes/userRoutes");
const categoryRoutes = require("../Backend/routes/categoryRoutes");
const productRoutes = require("../Backend/routes/productRoutes");
const subcategoryRoutes = require("../Backend/routes/subcategoryRoutes");
const brandRoutes = require("../Backend/routes/brandRoutes");
const attributeOptionRoutes = require("../Backend/routes/attributeOptionRoutes");
const bannerRoutes = require("../Backend/routes/bannerRoutes");
const posterRoutes = require("../Backend/routes/posterRoutes");
const cartRoutes = require("../Backend/routes/cartRoutes");
const path = require("path");
const wishlistRoutes = require("../Backend/routes/wishlistRoutes");
const priceRangeRoutes = require("../Backend/routes/priceRangeRoutes");
const discountOptionsRoutes = require("../Backend/routes/discountOptionRoutes");
const deliveryInfoRoutes = require("../Backend/routes/deliveryInfoRoutes");
const orderRoutes = require("../Backend/routes/orderRoutes");

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://ecommerce-frontend-git-main-khushis-projects-d9085b1c.vercel.app"
  ],
  credentials: true
};

app.use(cors(corsOptions));



//Connect to the database
connectDB()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error", err));

app.get("/", (req, res) => {
  res.send("Welcome to the ecommerce website");
});

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/subcategory", subcategoryRoutes);
app.use("/api/brand", brandRoutes);
app.use("/api/attributeOption", attributeOptionRoutes);
app.use("/api/banner", bannerRoutes);
app.use("/api/poster", posterRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/priceRange", priceRangeRoutes);
app.use("/api/discountOptions", discountOptionsRoutes);
app.use("/api/deliveryInfo", deliveryInfoRoutes);
app.use("/api/order", orderRoutes);

app.use("/api/upload", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

