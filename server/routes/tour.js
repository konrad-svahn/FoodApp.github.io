import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

import {
  createTour,
  deleteTour,
  getRelatedTours,
  getTour,
  getTours,
  getLikedTours,
  getToursBySearch,
  getToursByTag,
  getToursByUser,
  likeTour,
  getManyTours,
  addToShoping,
  updateTour,
} from "../controllers/tour.js";

router.get("/search", getToursBySearch);
router.get("/tag/:tag", getToursByTag);
router.post("/relatedTours", getRelatedTours);
router.get("/likedTours/:id", getLikedTours);
router.get("/", getTours);
router.get("/:id", getTour);

router.post("/shopping/getMany", getManyTours);
router.post("/", auth, createTour);
router.delete("/:id", auth, deleteTour);
router.patch("/:id", auth, updateTour);
router.get("/userTours/:id", auth, getToursByUser);
router.patch("/like/:id", auth, likeTour);
router.patch("/addToShoping/:id", auth, addToShoping);

export default router;