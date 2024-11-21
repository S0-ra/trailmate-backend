import { addReview, getReviewsByEquipment } from "../models/review.mjs";

export const createReview = async (req, res) => {
  try {
    const { equipmentid, rating, reviewtext } = req.body;
    const userid = req.user.id; 
    const newReview = await addReview(equipmentid, userid, rating, reviewtext);
    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const listReviews = async (req, res) => {
  try {
    const { equipmentid } = req.params;
    const reviews = await getReviewsByEquipment(equipmentid);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
