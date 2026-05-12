import { Request, Response } from "express";
import { Category } from "../types/category";

let categories: Category[] = [];

// menampilkan data category
export const getCategories = (req: Request, res: Response) => {
  res.json(categories);
};
// menyimpan data category
export const createCategory = (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name) {
        return res.status(500).json({ message: "nama harus diisi" });
    }
    // simpan data category
    const newCategory: Category = {
        id: Date.now(),
        name
    };  
    // simpan data category ke array
    categories.push(newCategory);   
    // kirim response dengan data category yang baru dibuat
    res.status(201).json(newCategory);    

  

};
// mengambil daata category berdasarkan id
export const getCategoryById = (req: Request, res: Response) => {
    const  id  =Number(req.params.id);
    const category = categories.find((category) => category.id === id); 
    if (!category) {
        return res.status(404).json({ message: "category tidak ditemukan" });
    }
    res.json(category);
};
// mengubah data category berdasarkan id
export const updateCategory = (req: Request, res: Response) => {
    const  id  =Number(req.params.id);
    const categoryIndex = categories.findIndex((category) => category.id === id);
    if (categoryIndex === -1) {
        return res.status(404).json({ message: "category tidak ditemukan" });
    }   
    const { name } = req.body;
    if (!name) {
        return res.status(500).json({ message: "nama harus diisi" });
    }
    const updatedCategory: Category = {
        id,
        name
    };
    categories[categoryIndex] = updatedCategory;
    res.json(updatedCategory);
};
// menghapus data category berdasarkan id
export const deleteCategory = (req: Request, res: Response) => {
    const  id  =Number(req.params.id);
    const categoryIndex = categories.findIndex((category) => category.id === id);
    if (categoryIndex === -1) {
        return res.status(404).json({ message: "category tidak ditemukan" });
    }   
};
