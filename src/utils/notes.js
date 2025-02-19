import {getDB, saveDB} from "../db.js"

// handle match note
const handleMatchNote= (notes, id)=>{
  return notes.find((note)=>{
    return note.id === id
  })
}

export const removeNote = async (id)=>{
  const db = await getDB()
  const match = handleMatchNote(db.notes, id)
  
  if (!match) {
    console.log("[x] No note found")
    return
  }

  db.notes = db.notes.filter((note)=> note.id !== id)
  await saveDB(db)
}

// update note
export const updateNote = async (id, match_text)=>{
  const db = await getDB()
  db.notes[index] = note
  await saveDB(db)
}

// get all the notes
export const getNotes = async (tags, match_text)=>{
  const db = await getDB()
  const notes = db.notes

  notes.length === 0 && console.log("[x] No notes found")

  if (tags){
    return notes.filter((note)=> note.tags.includes(tags) || note && note.note.toLowerCase().includes(match_text))
  } else (
    notes.forEach((note, index)=>{
      console.log(`[${index+1}] ${note.note}`)
    })
  )
}

// add new note
export const newNote = async (note)=>{
  const db = await getDB()
  db.notes.push({
    id: Date.now(),
    note: note.note,
    tags: note.tags
  })
  await saveDB(db)
}

// delete all the notes
export const clearNotes = async ()=>{
  console.log("All the notes are deleted...")
  const db = await getDB()
  db.notes = []
  await saveDB(db)
}

// Filter notes
export const filterNotes = async (filter)=>{
  const db = await getDB()
  const notes = db.notes.filter((note)=> note.note.toLowerCase().includes(filter))

  notes.length > 0 ? notes?.forEach((note)=>{
    console.log(`[${db.notes.indexOf(note)}] ${note.note}`)
  }) : console.log("[x] No notes found")
}