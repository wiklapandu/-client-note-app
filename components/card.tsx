import Note from "@/interfaces/note";
import { useState } from "react";
import TextArea from "./textarea";

export default function Card({ note, onClick, color = 'orange' }: {note: Note, onClick?: (note: Note) => void, color: string})
{
    const [newNote, setNewNote] = useState <Note>(note);

    return (
        <div className={`min-h-24 ${color} rounded-lg`}>
          <div className="p-4 text-xl mx-3">
            <div className="description mb-8">
              {
              newNote.edit ? <TextArea placeholder="Type here..." onChange={(value) => {
                setNewNote({
                  ...newNote,
                  content: value,
                })
              }}>{newNote.content}</TextArea>
              : 
              <p>
                {newNote.content}
              </p>
              }
            </div>

            <div className="flex items-center">
              <span className="font-medium text-lg mr-auto">Maret 26, 2024</span>
              <div>
                <button type="button" onClick={() => {
                  setNewNote((note: Note) => {
                    return {
                      ...note,
                      edit: !note.edit,
                    }
                  });

                  if(onClick) {
                    onClick(newNote);
                  }
                }} className="bg-black text-white w-10 h-10 flex items-center justify-center rounded-full duration-150 hover:scale-95 active:ring active:ring-white">
                  {newNote.edit 
                    ? 
                    (<svg
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      height="1em"
                      width="1em"
                    >
                      <path d="M12.736 3.97a.733.733 0 011.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 01-1.065.02L3.217 8.384a.757.757 0 010-1.06.733.733 0 011.047 0l3.052 3.093 5.4-6.425a.247.247 0 01.02-.022z" />
                    </svg>) 
                    : (<svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    height="1em"
                    width="1em"
                  >
                    <path d="M8.707 19.707L18 10.414 13.586 6l-9.293 9.293a1.003 1.003 0 00-.263.464L3 21l5.242-1.03c.176-.044.337-.135.465-.263zM21 7.414a2 2 0 000-2.828L19.414 3a2 2 0 00-2.828 0L15 4.586 19.414 9 21 7.414z" />
                  </svg>)}
                </button>
              </div>
            </div>
          </div>
        </div>
    );
}