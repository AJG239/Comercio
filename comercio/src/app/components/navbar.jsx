import Link from "next/link"

export default function Navbar(){
    return(
        <nav className="m-4 p-4">
            <ul className= 'flex gap-4 flex-row-reverse'>
                <li className="bg-yellow-300 p-3 rounded-lg">
                    <Link href='./../admin_login'>Admin_Login</Link>
                </li>

                <li className="bg-yellow-300 p-3 rounded-lg">
                    <Link href='./../comercio_login' className="text-lg">Comercio_Login</Link>
                </li>

                <li className="bg-yellow-300 p-3 rounded-lg">
                    <Link href='./../user_login'>User_Login</Link>
                </li>

                <li className="bg-yellow-300 p-3 rounded-lg">
                    <Link href='./../'>Home_Page</Link>
                </li> 
            </ul>
        </nav>
    )
}