import React from "react";

const MalikOptions = ({ buttons, onClick,setAction }) => {
  const handle=(btn)=>{
    setAction(btn)
    onClick(btn)
  }
  return (
    <div className="flex flex-col  gap-3 justify-center p-4">
      {buttons.map((btn, index) => (
        <button
          key={index}
          
          onClick={() =>{ handle(btn)}}

          className="bg-white  text-blue-950 px-4 py-2 rounded-xl hover:bg-blue-100 active:scale-95 transition-transform"
        >
          {btn}
        </button>
      ))}
    </div>
  );
};

export default MalikOptions;
