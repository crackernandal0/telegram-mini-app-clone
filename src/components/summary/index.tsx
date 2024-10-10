import { AppContext } from "@/App";
import polygonImage from "@/assets/needupcoin.png";
import { useContext, useEffect, useState } from "react";
export function Summary() {
  const context = useContext(AppContext);

  const { user } = context;
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    if (user) {
      setBalance(user.token);
    }
  }, [user]);
  //States

  return (
    <header className="border-b border-[#47656C] pt-6 pb-4 flex flex-col gap-2.5 items-center">
      <span className="text-white text-base font-medium">Balance</span>
      <div className="flex items-center gap-2">
        <img src={polygonImage} alt="Polygon image" className="w-8 h-8" />
        <strong className="text-white font-extrabold text-3xl">
          {balance}
        </strong>
      </div>
    </header>
  );
}
