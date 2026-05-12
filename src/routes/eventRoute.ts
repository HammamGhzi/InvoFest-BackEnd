import express  from "express";
import { createEvent, deleteEvent, getEventById, getEvents, updateEvent } from "../controllers/eventController";

const router = express.Router();

router.get("/", getEvents);  // menampilkan data event
router.post("/", createEvent); // menyimpan data event
router.get("/:id", getEventById); // mengambil daata event berdasarkan id
router.put("/:id", updateEvent);// mengubah data event berdasarkan id
router.delete("/:id", deleteEvent);// menghapus data event berdasarkan id

export default router;