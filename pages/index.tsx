import Card from "@/components/card";
import LayoutDefault from "@/components/layouts/default";
import Note from "@/interfaces/note";
import { useEffect, useState } from "react";

const SaveNote = (note: Note, index: any, setNotes: CallableFunction) => {
  setNotes((prev: Note[]) => {
    prev[index] = note;
    return prev;
  })

  if(note.edit) {
    let rawNotes = localStorage.getItem('notes')?.toString();
    const notes = rawNotes ? JSON.parse(rawNotes) : [];
    notes[index] = {
      ...note,
      edit: false,
    };

    localStorage.setItem('notes', JSON.stringify(notes));
  }
}

export default function Home() {
  const [notes, setNotes] = useState <Note[]>([]);

  useEffect(() => {
    const data = localStorage.getItem('notes');
    const decode = data ? JSON.parse(data) : [];

    setNotes(decode);
  }, [])

  return (
    <LayoutDefault pushNote={(note: Note) => {
      setNotes((prev) => [...prev, note]);
    }}>
      <div className="flex mb-12">
        <div className="text-gray-600 md:w-3/12 form border-2 rounded-lg overflow-hidden flex items-center px-4 gap-2 focus-within:ring focus-within:ring-blue-600 focus-within:ring-offset-1 focus-within:border-blue-600">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            height="1em"
            width="1em"
          >
            <path d="M10 18a7.952 7.952 0 004.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0018 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z" />
          </svg>

          <input type="text" placeholder="Seach here..." className="outline-none border-0 py-2 w-full"/>
        </div>
      </div>
      <div className="flex mb-8">
        <h1 className="text-5xl font-medium">Notes</h1>
      </div>
      <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-3">
        {notes?.map((note, key) => {
          return <Card 
            note={note} 
            color={note.color || 'card-orange'} 
            key={key} 
            onClick={(note: Note) => {
              SaveNote(note, key, setNotes);
            }} />;
        })}
      </div>
    </LayoutDefault>
  );
}
