import { Request, Response } from "express";
import { Pembicara } from "../types/pembicara";
import { prisma } from "../lib/db";

let pembicara: Pembicara[] = [];
// menampilkan data pembicara
export const getPembicara = async (req: Request, res: Response) => {
  const allPembicara = await prisma.pembicaraa.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(allPembicara);
};
// menyimpan data pembicara
export const createPembicara = async (req: Request, res: Response) => {
  const { name, role } = req.body;
  if (!name || !role) {
    return res.status(400).json({ message: "nama dan role harus diisi" });
  }
  const newPembicara = await prisma.pembicaraa.create({
    data: { name, role },
  });
  res.status(201).json(newPembicara);
};

// mengambil daata pembicara berdasarkan id
export const getPembicaraById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const pembicara = await prisma.pembicaraa.findUnique({ where: { id } });
  if (!pembicara) {
    return res.status(404).json({ message: "pembicara tidak ditemukan" });
  }
  res.json(pembicara);
};
// mengubah data pembicara berdasarkan id
export const updatePembicara = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, role } = req.body;
  if (!name || !role) {
    return res.status(400).json({ message: "nama dan role harus diisi" });
  }
  const pembicara = await prisma.pembicaraa.findUnique({ where: { id } });
  if (!pembicara) {
    return res.status(404).json({ message: "pembicara tidak ditemukan" });
  }
  const updated = await prisma.pembicaraa.update({
    where: { id },
    data: { name, role },
  });
  res.json(updated);
};
// menghapus data pembicara berdasarkan id
export const deletePembicara = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const pembicara = await prisma.pembicaraa.findUnique({ where: { id } });
  if (!pembicara) {
    return res.status(404).json({ message: "pembicara tidak ditemukan" });
  }
  await prisma.pembicaraa.delete({ where: { id } });
  res.json({ message: "pembicara berhasil dihapus" });
};
