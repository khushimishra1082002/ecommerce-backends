const express = require("express");
const cors = require("cors");
const path = require("path");

// Import DB and routes
const connectDB = require("./Backend/config/db");
const authRoutes = require("./Backend/routes/authRoutes");
const userRoutes = require("./Backend/routes/userRoutes");
const categoryRoutes = require("./Backend/routes/categoryRoutes");
const productRoutes = require("./Backend/routes/productRoutes");
const subcategoryRoutes = require("./Backend/routes/subcategoryRoutes");
const brandRoutes = require("./Backend/routes/brandRoutes");
const attributeOptionRoutes = require("./Backend/routes/attributeOptionRoutes");
const bannerRoutes = require("./Backend/routes/bannerRoutes");
const posterRoutes = require("./Backend/routes/posterRoutes");
const cartRoutes = require("./Backend/routes/cartRoutes");
const wishlistRoutes = require("./Backend/routes/wishlistRoutes");
const priceRangeRoutes = require("./Backend/routes/priceRangeRoutes");
const discountOptionsRoutes = require("./Backend/routes/discountOptionRoutes");
const deliveryInfoRoutes = require("./Backend/routes/deliveryInfoRoutes");
const orderRoutes = require("./Backend/routes/orderRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error", err));

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the ecommerce website");
});

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

// Serve static files (only works locally or on platforms that allow local file system access)
// app.use("/api/upload", express.static(path.join(__dirname, "uploads")));
const uploadsPath = path.join(__dirname, "uploads");

app.use("/api/upload", express.static(uploadsPath));

// Export the app for serverless function
module.exports = app;
