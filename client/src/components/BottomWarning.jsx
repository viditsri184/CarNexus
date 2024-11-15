import { Link } from "react-router-dom"

export function BottomWarning({label, linkText, to}){
    return <div className="flex items-center w-full h-[40px] justify-center">
        <label htmlFor="sign_in" className="font-medium">{label} </label>
        <Link to={to} className="indent-2 font-semibold underline">{linkText}</Link>
    </div>
}