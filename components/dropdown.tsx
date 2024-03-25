import { useState } from "react"

export default function DropDown({ className, icon, onClickChild, colors = ['card-orange', 'card-red', 'card-blue'] }: { buttonText?: string, className?: string, icon?: any, onClickChild: CallableFunction, colors?: string[] })
{
    const [show, setShow] = useState<boolean>(false);

    return (
    <div className="grid place-items-center my-12">
        <button 
        className={`mb-8 w-10 duration-150 ${show ? 'rotate-45' : 'rotate-0'} h-10 text-center flex items-center justify-center rounded-full bg-black text-white ${className}` }
        onClick={() => setShow(!show)}
        >{icon}</button>
        
        <ul className={`grid gap-4 transition-all ease-in-out ${show ? 'scale-100' : 'scale-0'}`} style={{transitionDelay: `${colors?.length > 1 ? colors?.length * 150 : 150}ms`}}>
            {colors?.map((color, index) => {
                const number = index + 1;
                const delay = number * 100;
                
                return <li 
                style={{transitionDelay: `${delay}ms`}} 
                key={index} onClick={() => {
                    onClickChild(color);
                    setShow(false);
                }}
                className={`content-[''] w-10 h-10 ${color} rounded-full transition-all duration-100 ${show ? 'translate-y-0 opacity-100' : 'opacity-0 -translate-y-10'}`}></li>
            })}
        </ul>

    </div>
    )
}