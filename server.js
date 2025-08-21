// run for vercel

// const express = require("express");
// const cors = require("cors");
// const path = require("path");

// // Import DB and routes
// const connectDB = require("./config/db");
// const authRoutes = require("./routes/authRoutes");
// const userRoutes = require("./routes/userRoutes");
// const categoryRoutes = require("./routes/categoryRoutes");
// const productRoutes = require("./routes/productRoutes");
// const subcategoryRoutes = require("./routes/subcategoryRoutes");
// const brandRoutes = require("./routes/brandRoutes");
// const attributeOptionRoutes = require("./routes/attributeOptionRoutes");
// const bannerRoutes = require("./routes/bannerRoutes");
// const posterRoutes = require("./routes/posterRoutes");
// const cartRoutes = require("./routes/cartRoutes");
// const wishlistRoutes = require("./routes/wishlistRoutes");
// const priceRangeRoutes = require("./routes/priceRangeRoutes");
// const discountOptionsRoutes = require("./routes/discountOptionRoutes");
// const deliveryInfoRoutes = require("./routes/deliveryInfoRoutes");
// const orderRoutes = require("./routes/orderRoutes");
// const roleRoutes = require("./routes/roleRoutes")
// const permissionRoutes = require("./routes/permissionRoutes")


// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Connect to MongoDB
// connectDB()
//   .then(() => console.log("Database connected successfully"))
//   .catch((err) => console.error("Database connection error", err));

// // Routes
// app.get("/", (req, res) => {
//   res.send("Welcome to the ecommerce website");
// });

// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/category", categoryRoutes);
// app.use("/api/product", productRoutes);
// app.use("/api/subcategory", subcategoryRoutes);
// app.use("/api/brand", brandRoutes);
// app.use("/api/attributeOption", attributeOptionRoutes);
// app.use("/api/banner", bannerRoutes);
// app.use("/api/poster", posterRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/wishlist", wishlistRoutes);
// app.use("/api/priceRange", priceRangeRoutes);
// app.use("/api/discountOptions", discountOptionsRoutes);
// app.use("/api/deliveryInfo", deliveryInfoRoutes);
// app.use("/api/order", orderRoutes);
// app.use("/api/role",roleRoutes)
// app.use("/api/permission",permissionRoutes)


// // Serve static files (only works locally or on platforms that allow local file system access)
// // app.use("/api/upload", express.static(path.join(__dirname, "uploads")));
// const uploadsPath = path.join(__dirname, "uploads");

// app.use("/api/upload", express.static(uploadsPath));

// // Export the app for serverless function
// module.exports = app;

const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const subcategoryRoutes = require("./routes/subcategoryRoutes");
const brandRoutes = require("./routes/brandRoutes");
const attributeOptionRoutes = require("./routes/attributeOptionRoutes");
const bannerRoutes = require("./routes/bannerRoutes");
const posterRoutes = require("./routes/posterRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const priceRangeRoutes = require("./routes/priceRangeRoutes");
const discountOptionsRoutes = require("./routes/discountOptionRoutes");
const deliveryInfoRoutes = require("./routes/deliveryInfoRoutes");
const orderRoutes = require("./routes/orderRoutes");
const roleRoutes = require("./routes/roleRoutes")
const permissionRoutes = require("./routes/permissionRoutes")


// Locally run on port 8000
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
app.use("/api/role",roleRoutes)
app.use("/api/permission",permissionRoutes)

// Connect to DB
connectDB()
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
// ... other routes

app.use("/api/upload", express.static(path.join(__dirname, "uploads")));

// Start server locally
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
