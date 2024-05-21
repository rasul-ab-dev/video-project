import Dexie, { Table } from "dexie";

export interface Video {
  id?: number;
  blob: Blob;
}

export class MySubClassedDexie extends Dexie {
  videos!: Table<Video>;

  constructor() {
    super("app-db");
    this.version(1).stores({
      videos: "++id, blob",
    });
  }
}

export const db = new MySubClassedDexie();
