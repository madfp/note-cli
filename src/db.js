import fs from "node:fs/promises"

// db path
const DB_PATH = new URL("../notes.json", import.meta.url).pathname

// get notes
export const getDB = async ()=>{
  const db  = await fs.readFile(DB_PATH, "utf-8")
  return JSON.parse(db)
}

// save notes
export const saveDB = async (db)=>{
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2))
  return db
}
