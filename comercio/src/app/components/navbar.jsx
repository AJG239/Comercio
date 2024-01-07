import Link from "next/link"
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function Navbar(){
    return(
        <nav className="m-4 p-2">
            <ul className= 'flex flex-row-reverse justify-between'>
                <li className="p-3">
                    <Link href='./../admin_login/admin_log'><i class="bi bi-person-vcard text-5xl"></i></Link>
                </li>

                <li className="p-3">
                    <Link href='./../comercio_login/shop_log' className="text-lg"><i class="bi bi-person-badge text-5xl"></i></Link>
                </li>

                <li className=" p-3">
                    <Link href='./../user_login/user_log'><i class="bi bi-people text-5xl"></i></Link>
                </li>

                <h2 className="p-3 antialiased hover:subpixel-antialiased">ShopView</h2>

                <li className="p-3">
                    <i class="bi bi-info-circle text-5xl"></i>
                </li>

                <li className="p-3">
                    <i class="bi bi-shop text-5xl"></i>
                </li>

                <li className="p-3">
                    <Link href='./../'><i class="bi bi-house text-5xl"></i></Link>
                </li> 
            </ul>
        </nav>
    )
}