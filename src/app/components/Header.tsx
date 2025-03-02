import Link from "next/link"

export default function Header() {
    return (
        <header className="flex justify-center items-start h-20">
            <nav className="flex justify-around items-center w-[30%] h-[90%] shadow rounded-b-3xl bg-[#353535]">
                <Link className="text-white font-bold text-lg" href="/">Início</Link>
                <Link className="text-white font-bold text-lg" href="/cards">Cartas</Link>
                <Link className="text-white font-bold text-lg" href="/packs">Abrir Pacote</Link>
            </nav>
        </header>
    )
}   