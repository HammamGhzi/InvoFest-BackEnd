import express from 'express';
import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from '../controllers/categoryController';

const router = express.Router();

router.get("/", getCategories);  // menampilkan data category
router.post("/", createCategory); // menyimpan data category
router.get("/:id", getCategoryById); // mengambil daata category berdasarkan id
router.put("/:id", updateCategory);// mengubah data category berdasarkan id
router.delete("/:id", deleteCategory);// menghapus data category berdasarkan id

export default router;