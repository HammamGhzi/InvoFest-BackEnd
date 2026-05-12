import { Request, Response } from "express";
import { Event } from "../types/event";

let events: Event[] = [];

// menampilkan data event
export const getEvents = (req: Request, res: Response) => {
  res.json(events);
};
// menyimpan data event
export const createEvent = (req: Request, res: Response) => {
      const { name, categoryId, tanggal, description } = req.body;
      if (!name || !categoryId || !tanggal) {
        return res.status(500).json({ message: "nama , category, tanggal harus diisi" });
      }
    //   simpan data event
        const newEvent: Event = {
          id: Date.now(), 
          name,
          categoryId,
          tanggal,
          description
        };
        // simpan data event ke array
        events.push(newEvent);
        // kirim response dengan data event yang baru dibuat
        res.status(201).json(newEvent);
};
// mengambil daata event berdasarkan id
export const getEventById = (req: Request, res: Response) => {
    const  id  =Number(req.params.id);
    const event = events.find((event) => event.id === id);
    if (!event) {
        return res.status(404).json({ message: "event tidak ditemukan" });
    }
    res.json(event);
};
// mengubah data event berdasarkan id
export const updateEvent = (req: Request, res: Response) => {
      const  id  =Number(req.params.id);
      const eventIndex = events.findIndex((event) => event.id === id);
      if (eventIndex === -1) {
        return res.status(404).json({ message: "event tidak ditemukan" });
      }
      const { name, categoryId, tanggal, description } = req.body;
      if (!name || !categoryId || !tanggal) {
        return res.status(500).json({ message: "nama , category, tanggal harus diisi" });
      }
      const updatedEvent: Event = {
        id,
        name, 
        categoryId,
        tanggal,
        description
      };
      events[eventIndex] = updatedEvent;
      res.json(updatedEvent);
};
// menghapus data event berdasarkan id
export const deleteEvent = (req: Request, res: Response) => {
    const  id  =Number(req.params.id);
    const eventIndex = events.findIndex((event) => event.id === id);
    if (eventIndex === -1) {
        return res.status(404).json({ message: "event tidak ditemukan" });
    } 
    events.splice(eventIndex, 1);
    res.json({ message: "event berhasil dihapus" })
};
