import Note from "@/interfaces/note";
import { useState } from "react";
import TextArea from "./textarea";
import moment from "moment";


interface CardProps {
  note: Note;
  onClick?: (note: Note) => void;
  color?: string;
  onDelete?: (note: Note) => void;
}

export default function Card({ note, onClick, onDelete, color = 'orange' }: CardProps)
{
    const [newNote, setNewNote] = useState <Note>(note);

    return (
        <div className={`min-h-24 ${color} rounded-lg`}>
          <div className="p-4 text-xl mx-3">
            <div className="flex">
              <div className="title mb-8">
                {
                newNote.edit
                ? <input className="text-2xl font-medium bg-transparent outline-none" value={newNote.title} onChange={(event) => setNewNote({...newNote, title: event.target.value})} /> 
                : <h2 className="text-2xl font-medium">{newNote.title}</h2>}
              </div>
            </div>
            <div className="flex">
              <div className="description mb-8 w-full">
                {
                newNote.edit ? <TextArea placeholder="Type here..." onChange={(value) => {
                  setNewNote({
                    ...newNote,
                    content: value,
                  })
                }}>{newNote.content}</TextArea>
                : 
                <p dangerouslySetInnerHTML={{__html: newNote.content.replaceAll('\n', '<br>')}}></p>
                }
              </div>
              
              <div className="pl-2">
                <button 
                  type="button" 
                  className="w-10 h-10 flex justify-center bg-red-600 text-white items-center rounded-full duration-150 ease-in hover:scale-95"
                  onClick={() => {
                    if(onDelete) {
                      onDelete(note);
                    }
                  }}
                  >
                  <svg
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    height="1em"
                    width="1em"
                  >
                    <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z" />
                    <path
                      fillRule="evenodd"
                      d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <span className="font-medium text-lg mr-auto">{moment(newNote.created_at).format('MMM DD, YYYY')}</span>
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