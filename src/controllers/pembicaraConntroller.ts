import { Request, Response } from "express";
import { Pembicara } from "../types/pembicara";

let pembicara: Pembicara[] = [];
// menampilkan data pembicara
export const getPembicara = (req: Request, res: Response) => {
    res.json(pembicara);
}
// menyimpan data pembicara
export const createPembicara = (req: Request, res: Response) => {
      const { name, role } = req.body;
      if (!name || !role) {
        return res.status(500).json({ message: "nama dan role harus diisi" });
      }
    //   simpan data pembicara
        const newPembicara: Pembicara = {
          name,
          role,
          id: Date.now(),   
        };
        // simpan data pembicara ke array
        pembicara.push(newPembicara);
        // kirim response dengan data pembicara yang baru dibuat
        res.status(201).json(newPembicara);
};
// mengambil daata pembicara berdasarkan id
export const getPembicaraById = (req: Request, res: Response) => {
    const  id  =Number(req.params.id);
    const pembicaraById = pembicara.find((pembicara) => pembicara.id === id);
    if (!pembicaraById) {
        return res.status(404).json({ message: "pembicara tidak ditemukan" });
    }
    res.json(pembicaraById);
};
// mengubah data pembicara berdasarkan id
export const updatePembicara = (req: Request, res: Response) => {
      const  id  =Number(req.params.id);
      const pembicaraIndex = pembicara.findIndex((pembicara) => pembicara.id === id);
      if (pembicaraIndex === -1) {
        return res.status(404).json({ message: "pembicara tidak ditemukan" });
      }
      const { name, role } = req.body;
      if (!name || !role) {
        return res.status(500).json({ message: "nama dan role harus diisi" });
      }
      const updatedPembicara: Pembicara = {
        id,
        name, 
        role
      };
      pembicara[pembicaraIndex] = updatedPembicara;
      res.json(updatedPembicara); 
};
// menghapus data pembicara berdasarkan id
export const deletePembicara = (req: Request, res: Response) => {
      const  id  =Number(req.params.id);
      const pembicaraIndex = pembicara.findIndex((pembicara) => pembicara.id === id);
      if (pembicaraIndex === -1) {
        return res.status(404).json({ message: "pembicara tidak ditemukan" });
      }
      pembicara.splice(pembicaraIndex, 1);
      res.json({ message: "pembicara berhasil dihapus" });
};