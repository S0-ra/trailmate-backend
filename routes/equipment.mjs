import express from "express";
import {
  createEquipment,
  getEquipment,
  getEquipmentDetails,
  modifyEquipment,
  removeEquipment,
  searchEquipment
} from "../controllers/equipmentController.mjs";
import { authenticateToken, authorizeRoles } from "../middleware/auth.mjs";

const router = express.Router();

router.get("/", getEquipment);
router.get("/:id", getEquipmentDetails);
router.get("/search", searchEquipment);


router.post("/", authenticateToken, authorizeRoles(["admin", "vendor"]), createEquipment);
router.put("/:id", authenticateToken, authorizeRoles(["admin", "vendor"]), modifyEquipment);
router.delete("/:id", authenticateToken, authorizeRoles(["admin", "vendor"]), removeEquipment);

export default router;
