import { useState } from 'react'
import Header from './Component/Header'
import MalikOptions from './Component/MalikOptions';
import Footer from './Component/Footer';
import AddProduct from './Component/AddProduct';
import ViewStock from './Component/ViewStock';
import EditProduct from './Component/EditProduct';
import DeleteProduct from './Component/DeleteProduct';
import Factures from './Component/Factures';
import FactureManager from './Component/FactureManager';
import { redirect } from 'react-router-dom';
function App() {
  const [Role,setRole]=useState("Vendeur");
  const [Mdp,setMDP]=useState("");
  const [Mdp0,setMdp0]=useState("")
  const [Action,setAction]=useState("Facture");
  const [Change,setChange]=useState("");
  const [Deleted,setDeleted]=useState("");
  const [Message,setMessage]=("")
  const handleButtonClick = (e) => {
  };
  const handleButtonClick2 = (e) => {
 setRole("Malik"),
 setMdp0("")
 setMDP('')
  };
  const handleLogin=()=>{
    setMDP(Mdp0);
    if(Mdp0==="malik1708")
      setRole('Malik')
    else 
      setMessage("Mot De Passe Incorrecte ")
  }
  const handleChange=(e)=>{
    setMdp0(e.target.value)
  }
  return (
    <>
    <div className='h-screen bg-blue-200'>
      <Header setMDP={setMDP} setMDP0={setMdp0}  Role={Role} setRole={setRole} />
      
      {Mdp!=""&&Mdp!="malik1708"&&     <div className="h-full flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <div className="mt-2 px-4 py-2 bg-red-100 text-red-700 border border-red-300 rounded-lg text-sm font-medium">
    Mot De Passe Incorrect
  </div>
          <button
          className="mt-4 w-full bg-gradient-to-r from-[#042142] to-[#2475AC] text-white font-semibold py-2 rounded-lg hover:opacity-90 transition"
          onClick={handleButtonClick2}
        >Retour</button>
      
      
        </div>
        </div>
     }

      {Role==="Malik"&&Mdp===""&&Mdp!="malik1708"&&Role==="Malik"&&<div>
          <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-[#042142] mb-6">
          Login
        </h2>

        <form className="flex flex-col gap-4">
       
          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2475AC]"
              placeholder="••••••••"
              value={Mdp0}
              onChange={handleChange}
              required
            />
         
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-[#2475AC] text-white py-3 rounded-lg mt-4 font-semibold hover:bg-[#153C6A] transition"
            onClick={()=>handleLogin()}
         
         >
            Login
          </button>
        </form>
        </div>
        </div>
        </div>}
      {Role==="Malik"&&Mdp==="malik1708"&&<div className='flex  h-full '>
        <div className='w-1/4 bg-blue-700 '>
       <MalikOptions
        buttons={["Ajouter un Produit", "Voir  Stock", "Modifier-Produit", "Supprimer Element","Facture","Factures"]}
        onClick={handleButtonClick}
        setAction={setAction}
      />
      </div>
      <div className=' w-full h-full bg-blue-200 mb-52'>
      {Action ==="Facture"&&<Factures/>}
      {Action ==="Factures"&&<FactureManager/>}   
      {Action ==="Ajouter un Produit"&&<AddProduct/>}
      {Action ==="Voir  Stock"&&<ViewStock Change={Change} setChange={setChange} setAction={setAction}/>}
      {Action==="Modifier-Produit"&& Change &&<EditProduct Change={Change} setChange={setChange} setAction={setAction}/>}
      {Action==="Modifier-Produit"&& !Change &&<div className='pr-52 pl-10'><h1 className='text-white text-5xl'>Choisis in produit</h1></div>}
      {Action==="Supprimer Element"&&<DeleteProduct Deleted={Deleted} setDeleted={setDeleted}/>}
      </div>
      </div>}
       {Role==="Vendeur"&&<div className='flex '>
        <Factures/>
        </div>
       }
     
    </div>
    </>
  )
}

export default App
