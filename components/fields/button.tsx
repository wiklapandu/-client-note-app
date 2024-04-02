
interface ButtonType {
    type: "submit" | "reset" | "button";
    className?: string;
    children?:any;
    disabled?: boolean;
}

export default function Button({type, className = '', disabled = false, children}: ButtonType)
{
    return <button type={type} className={`text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${className}`}>{children}</button>
}