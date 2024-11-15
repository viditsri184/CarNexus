export function Button({buttonText, onClick, color}){
    return(
        <button onClick={onClick} type="button" className={`text-white w-full ${color} hover:bg-gray-900 dark:bg-white dark:hover:bg-white dark:hover:text-black dark:text-black focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2`}>{buttonText}</button>
    )
}
