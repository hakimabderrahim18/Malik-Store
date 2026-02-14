import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header({Role,setMDP,setRole,setMDP0}) {
  const [isOpen, setIsOpen] = useState(false);
  const handlDeconnecter=()=>{
    setMDP0("")
    setMDP("");
    setRole("Vendeur")
  }
  return (
    <header className="bg-gradient-to-r from-[#042142] to-[#2475AC] text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-wide">
          Stock<span className="text-[#3DE0FC]">Manager</span>
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8">
          <button  onClick={()=>setRole("Malik")} className="hover:text-[#E977F5] transition-colors" >Malik Dashboard</button>
          {Role==="Malik"&&<button  onClick={()=>handlDeconnecter()}className="hover:text-[#E977F5] transition-colors">Deconnecter</button>}
          
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded hover:bg-white/10"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <nav className="md:hidden bg-[#042142] border-t border-white/10 flex flex-col space-y-2 p-4">
          <button  className="hover:text-[#E977F5] transition-colors" onClick={()=>setRole("Malik")}>Malik Dashboard</button>
          <button  className="hover:text-[#E977F5] transition-colors"onClick={()=>setRole("Vendeur")}>Vendeur Dashboard</button>
          <button  className="hover:text-[#E977F5] transition-colors"onClick={()=>setRole("hakim")}>Produits</button>
        </nav>
      )}
    </header>
  );
}
