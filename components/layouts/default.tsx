import IconPlus from "@/icons/plus";
import DropDown from "../dropdown";
import Note from "@/interfaces/note";
import { useEffect, useState } from "react";
import LoginComponent from "../login";

export default function LayoutDefault({ children, pushNote }: {children: any, pushNote: CallableFunction})
{
    const [isLogin, setLogin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setLogin(typeof token == 'string' && token != '');
    }, [])

    return (
        <div className="min-h-screen grid grid-cols-12">
            {
            !isLogin 
            ? 
            <LoginComponent /> 
            : 
            <></>}
            
            <div className="col-span-2 white h-screen overflow-hidden bg-white border-r-2 border-gray-300">
                    <div className="p-4">
                        <ul>
                            <li>
                                <DropDown icon={<IconPlus/>} onClickChild={(color: string) => {
                                    const note: Note = {
                                        title: 'Untitled',
                                        content: '',
                                        status: 'open',
                                        author: 'wikla',
                                        color: color,
                                        created_at: new Date,
                                        updated_at: new Date,
                                        edit: true,
                                    }

                                    pushNote(note)
                                }} colors={['card-orange', 'card-red', 'card-blue']}></DropDown>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-span-10 min-h-full p-8">
                    {children}
                </div>

        </div>
    );
}