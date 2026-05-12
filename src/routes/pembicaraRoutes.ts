import express  from "express";

import { createPembicara, deletePembicara, getPembicara, getPembicaraById, updatePembicara } from "../controllers/pembicaraConntroller";

const router = express.Router();

router.get("/", getPembicara);  // menampilkan data pembicara
router.post("/", createPembicara); // menyimpan data pembicara
router.get("/:id", getPembicaraById); // mengambil daata pembicara berdasarkan id
router.put("/:id", updatePembicara);// mengubah data pembicara berdasarkan id
router.delete("/:id", deletePembicara);// menghapus data pembicara berdasarkan id

export default router;