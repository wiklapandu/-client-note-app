import Card from "@/components/card";
import LayoutDefault from "@/components/layouts/default";
import Note from "@/interfaces/note";
import { useEffect, useState } from "react";
import Head from 'next/head';
import axios from "axios";
import { Id, toast, ToastContainer } from "react-toastify";
import NotFoundComponent from "@/components/notfound";

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
    (async () => {
      try {
        const res = await axios.get(`${process.env.API_NOTE}/note`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          }
        })
        setNotes(res.data.data);
      } catch(error) {
        console.log('errorGet:', error);
      }

    })();
  }, [])

  return (
    <LayoutDefault pushNote={(note: Note) => {
      setNotes((prev) => [...prev, note]);
    }}>
      <Head>
        <title>Notes</title>
      </Head>
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

          <input type="text" placeholder="Seach here..." onChange={(event) => {
            event.preventDefault();
            
            setTimeout(() => {
              (async () => {
                try {
                  const res = await axios.get(`${process.env.API_NOTE}/note`, {
                    headers: {
                      Authorization: localStorage.getItem('token'),
                    },
                    params: {
                      search: event.target.value,
                    }
                  })
                  
                  setNotes(res.data.data);
                } catch(error) {
                  console.log('errorGet:', error);
                }
  
              })();
            }, 800)

          }} className="outline-none border-0 py-2 w-full"/>
        </div>
      </div>
      <div className="flex mb-8">
        <h1 className="text-5xl font-medium">Notes</h1>
      </div>
      <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-3">
        {notes.length >= 1 ? notes.map((note, key) => {
          return <Card 
            note={note} 
            color={note.color || 'card-orange'} 
            key={key}
            onClick={(note: Note) => {
              if(note._id) {
                axios.put(`${process.env.API_NOTE}/note/${note._id}`, note, {
                  headers: {
                    Authorization: localStorage.getItem('token'),
                  }
                })
                  .then((res) => {
                    toast.success(res.data.message, {
                      autoClose: 2000,
                    });
                    SaveNote(note, key, setNotes);
                  })
                  .catch((xhr: any) => {
                    toast.error(xhr.response.data.message, {
                      autoClose: 2000,
                    });
                  });
                } else {
                  axios.post(`${process.env.API_NOTE}/note/`, note, {
                    headers: {
                      Authorization: localStorage.getItem('token'),
                    }
                  })
                    .then((res) => {
                      toast.success(res.data.message, {
                        autoClose: 2000,
                      });
                      SaveNote(res.data.note, key, setNotes);
                    })
                    .catch((xhr: any) => {
                      toast.error(xhr.response.data.message, {
                        autoClose: 2000,
                      });
                    });
              }
            }}
            onDelete={(note) => {
              axios.delete(`${process.env.API_NOTE}/note/${note._id}`, {
                headers: {
                  Authorization: localStorage.getItem('token'),
                }
              }).then((res) => {
                const message = res.data.message;
                const filterNote = notes.filter((_, index) => index != key);
                setNotes(filterNote);
                toast.success(message, {
                  autoClose: 2000,
                })
              }).catch((xhr) => {
                toast.error(xhr.response.data.message, {
                  autoClose: 2000
                })
              });
            }}
            />;
        }) : <NotFoundComponent />}
      </div>
      
      <ToastContainer />
    </LayoutDefault>
  );
}
