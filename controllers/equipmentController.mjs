import { addEquipment, getAllEquipment, getEquipmentById, updateEquipment, deleteEquipment,searchEquipmentByName } from "../models/equipment.mjs";


export const createEquipment = async (req, res) => {
  try {
    const { userid, categoryid, name, description, noofitems, avaibilitystatus, location } = req.body;

    if (!userid || !categoryid || !name || !description || !noofitems || !avaibilitystatus || !location) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newEquipment = await addEquipment(userid, categoryid, name, description, noofitems, avaibilitystatus, location);
    res.status(201).json(newEquipment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error adding equipment." });
  }
};

export const getEquipment = async (req, res) => {
  try {
    const equipment = await getAllEquipment();
    res.json(equipment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching equipment." });
  }
};

export const getEquipmentDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const equipment = await getEquipmentById(id);

    if (!equipment) {
      return res.status(404).json({ error: "Equipment not found." });
    }

    res.json(equipment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching equipment details." });
  }
};


export const modifyEquipment = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: "No updates provided." });
    }

    const updatedEquipment = await updateEquipment(id, updates);
    res.json(updatedEquipment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating equipment." });
  }
};

export const removeEquipment = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteEquipment(id);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting equipment." });
  }
};

export const searchEquipment = async (req, res) => {
  try {
    const { query } = req.query;
    const results = await searchEquipmentByName(query);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
