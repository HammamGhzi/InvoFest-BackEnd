import { Request, Response } from "express";
import { Event } from "../types/event";
import { prisma } from "../lib/db";

let events: Event[] = [];

// menampilkan data event
export const getEvents = async (req: Request, res: Response) => {
  const AllEvent = await prisma.event.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      category: true,   
      pembicara: true   
    }
  });
  res.json(AllEvent);
};
// menyimpan data event
export const createEvent = async (req: Request, res: Response) => {
  const { name, categoryId, pembicaraId, tanggal, description } = req.body;
  if (!name || !categoryId || !pembicaraId || !tanggal) {
    return res
      .status(400)
      .json({ message: "nama, category, pembicara, tanggal harus diisi" });
  }
  const newEvent = await prisma.event.create({
    data: {
      name,
      categoryId: Number(categoryId),
      pembicaraId: Number(pembicaraId),
      tanggal: new Date(tanggal),
      description,
    },
  });
  res.status(201).json(newEvent);
};
// mengambil daata event berdasarkan id
export const getEventById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      category: true,
      pembicara: true,
    },
  });
  if (!event) {
    return res.status(404).json({ message: "event tidak ditemukan" });
  }
  res.json(event);
};
// mengubah data event berdasarkan id
export const updateEvent = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, categoryId, pembicaraId, tanggal, description } = req.body;
  if (!name || !categoryId || !pembicaraId || !tanggal) {
    return res.status(400).json({ message: "nama, category, pembicara, tanggal harus diisi" });
  }
  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) {
    return res.status(404).json({ message: "event tidak ditemukan" });
  }
  const updated = await prisma.event.update({
    where: { id },
    data: {
      name,
      categoryId: Number(categoryId),
      pembicaraId: Number(pembicaraId),
      tanggal: new Date(tanggal),
      description
    }
  });
  res.json(updated);
};
// menghapus data event berdasarkan id
export const deleteEvent = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) {
    return res.status(404).json({ message: "event tidak ditemukan" });
  }
  await prisma.event.delete({ where: { id } });
  res.json({ message: "event berhasil dihapus" });
};
