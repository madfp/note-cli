import yargs from "yargs";
import {hideBin} from "yargs/helpers";
import {newNote, getNotes, clearNotes, filterNotes, removeNote} from "./utils/notes.js";

yargs(hideBin(process.argv))
  .command(
    "new <note>",
    "Create a new note",
    (yargs) => {
      return yargs.positional("note", {
        type: 'string',
        describe: "Information of the note",
      })
    }, 
    (argv)=>{
      console.log("Added new note: ", argv.note)
      const tags = argv.tags ? argv.tags.split(",") : []
      newNote({
        note: argv.note,
        tags: tags
      })
    }
  )
  .command(
    "list",
    "List all notes",
    (yargs)=>{
      return yargs.positional("tags", {
        type: 'string',
        describe: "Filter notes by tags"
      })
    },
    (argv)=>{
      getNotes()
    }
  )
  .command(
    "filter <filter>",
    "Filter notes by text",
    (yargs)=>{
      return yargs.positional("filter", {
        type: 'string',
        describe: "Filter notes by text"
      }
    )
    },
    (argv)=>{
      filterNotes(argv.filter)
    }
  )
  .command(
    "remove <id>", 
    "Remove a note", 
    (yargs) => {
      return yargs.positional("id", {
        type: 'number',
        describe: "ID of the note",
      }
    )
    }, (argv) => {
      removeNote(argv.id)
    })
    .command(
      "clear",
      "Clear all the stored notes", 
      ()=>{
        clearNotes()
      }
    )
    .option("tags", {
      alias:"t",
      type:'string',
      description:"Add tags to the note",
    })
    .demandCommand(1)
    .help(
      "h",
    )
    .showHelpOnFail(true)
    .parse();