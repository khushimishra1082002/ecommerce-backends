const Poster = require("../models/PosterModel");

const getAllPoster = async (req, res) => {
  try {
    const allPoster = await Poster.find();
    if (!allPoster) {
      res.status(404).json({ message: "Poster Not Found" });
    }
    res.status(200).json(allPoster);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getSinglePoster = async (req, res) => {
  try {
    const { posterId } = req.params;

    const poster = await Poster.findById(posterId);

    if (!poster) {
      return res.status(404).json({ message: "Poster not found" });
    }

    res.status(200).json(poster);
  } catch (err) {
    console.error("Get single poster error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


const createPoster = async (req, res) => {
  try {
    const {
      link,
      title,
      subtitle,
      description,
      location,
      displayOrder,
      startDate,
      endDate,
      active,
    } = req.body;

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const image = req.file ? req.file.path : null;

    const newPoster = await Poster.create({
      link,
      title,
      subtitle,
      description,
      location,
      displayOrder,
      startDate,
      endDate,
      active,
      image,
    });

    res.status(200).json({
      message: "Poster added successfully",
      newPoster,
    });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deletePoster = async (req, res) => {
  const { posterId } = req.params;
  try {
    const poster = await Poster.findByIdAndDelete(posterId);
    if (!poster) {
      res.status(404).json({ message: "Poster not found" });
    }
    res.status(200).json({ message: "Poster deleted successsfully", poster });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updatePoster = async (req, res) => {
  try {
    const { posterId } = req.params;

    const {
      link,
      title,
      subtitle,
      description,
      location,
      displayOrder,
      startDate,
      endDate,
      active,
    } = req.body;

   
    const poster = await Poster.findById(posterId);
    if (!poster) {
      return res.status(404).json({ message: "Poster not found" });
    }

   
    let image = poster.image;
    if (req.file) {
      image = req.file.path;
    }

    const updatedPoster = await Poster.findByIdAndUpdate(
      posterId,
      {
        link,
        title,
        subtitle,
        description,
        location,
        displayOrder,
        startDate,
        endDate,
        active,
        image,
      },
      { new: true },
    );

    res.status(200).json({
      message: "Poster updated successfully",
      updatedPoster,
    });
  } catch (err) {
    console.error("Update poster error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};



module.exports = {
  getAllPoster,
  getSinglePoster,
  createPoster,
  deletePoster,
  updatePoster
};
