const Banner = require("../models/BannerModel");

const getAllBanner = async (req, res) => {
  try {
    const allbanner = await Banner.find();
    console.log(allbanner);

    if (!allbanner) {
      res.status(404).json({ message: "Banner Not Found" });
    }
    res.status(200).json(allbanner);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getSingleBanner = async (req, res) => {
  try {
    const { bannerId } = req.params;
    if (!bannerId) {
      return res.status(400).json({ message: "bannerId  does not exist" });
    }
    const singleBrand = await Banner.findById(bannerId);
    res.status(200).json(singleBrand);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const createBanner = async (req, res) => {
  try {
    const { link, location, displayOrder, startDate, endDate, active } =
      req.body;
     const image = req.file ? req.file.path : null;
    const newbanner = await Banner.create({
      link,
      location,
      displayOrder,
      startDate,
      endDate,
      active,
      image,
    });
    res.status(200).json({
      message: "Banner added successfully",
      newbanner,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteBanner = async (req, res) => {
  const { bannerId } = req.params;
  try {
    const banner = await Banner.findByIdAndDelete(bannerId);
    if (!banner) {
      res.status(404).json({ message: "Banner not found" });
    }
    res.status(200).json({ message: "Banner deleted successsfully", banner });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateBanner = async (req, res) => {
  try {
    const { bannerId } = req.params;
    if (!bannerId) {
      return res.status(404).json({ message: "Banner ID not found" });
    }

    const { link, location, displayOrder, startDate, endDate, active } =
      req.body;
     const image = req.file ? req.file.path : null;

    const updatePayload = {
      link,
      location,
      displayOrder,
      startDate,
      endDate,
      active,
    };

    
    if (image) {
      updatePayload.image = image;
    }

    const updatedBanner = await Banner.findByIdAndUpdate(
      bannerId,
      updatePayload,
      { new: true }
    );

    if (!updatedBanner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    res.status(200).json({
      message: "Banner updated successfully",
      updatedBanner,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  getAllBanner,
  createBanner,
  deleteBanner,
  updateBanner,
  getSingleBanner,
};
