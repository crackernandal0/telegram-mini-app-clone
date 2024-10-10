import { AppContext } from "@/App";
import { TabBar } from "../../components/tab-bar";
import { Invite } from "./invite";
import { useContext, useState } from "react";

export function Invites() {
  const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe;
  const userId = initDataUnsafe?.user?.id;
  const userName = initDataUnsafe?.user?.username;
  const context = useContext(AppContext);
  const { user } = context;
  console.log("user", user);
  const referralLink = `t.me/NeedUpbot/needup?startapp=${userId}&message=${encodeURIComponent(
    userName
  )} invites you to join this app!`;

  const [isCopied, setIsCopied] = useState(false);

  // Copy the referral link to clipboard and show "Copied!" message
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    });
  };

  // Invite a friend - Open Telegram chat for selecting a friend
  const inviteFriend = () => {
    window.Telegram.WebApp.openLink(
      `https://t.me/share/url?url=${encodeURIComponent(referralLink)}`
    );
  };

  return (
    <div className="h-screen bg-[#242C3B] flex flex-col">
      <div className="flex flex-col flex-1 pt-2 px-6 overflow-y-scroll max-w-[728px] mx-auto w-full">
        <header className="border-b border-[#47656C] pt-6 pb-4 flex flex-col gap-2.5 items-center">
          <span className="text-white text-base font-medium">Invites</span>
          <strong className="text-white font-extrabold text-3xl">0</strong>
        </header>

        <main className="flex flex-col mt-6">
          <div className="flex flex-col gap-4 mb-4 bg-[#2C3649]/70 border-2 border-[#2C3649] p-4 rounded-md">
            <div className="flex justify-between items-center">
              <strong className="text-white text-xl">Your Invite Link</strong>
              <button
                className="rounded-md text-white flex justify-center items-center w-[84px] h-[40px] bg-button"
                onClick={copyToClipboard}
              >
                copy
              </button>
            </div>
            {isCopied && (
              <span className="text-sm text-green-400 mt-2">
                Copied to clipboard!
              </span>
            )}

            {/* <span className="text-base text-white/60">{referralLink}</span> */}

            {/* Invite a Friend Button */}
            <button
              className="mt-4 flex items-center justify-center gap-2 py-2 px-4 bg-green-500 text-white rounded-md"
              onClick={inviteFriend}
            >
              <span>Invite a Friend</span>
              <span className="text-2xl">+</span>
            </button>
          </div>

          <div className="h-[2px] rounded-full w-full bg-[#2C3649]/50" />

          <div className="mt-4 flex flex-col gap-2">
            <strong className="text-white">My Referrals:</strong>
            <div className="overflow-y-scroll max-h-[500px]">
              <ul className="flex flex-col gap-2.5">
                {user?.friends?.map((item, index) => (
                  <Invite
                    name={item.username}
                    value={item.coins}
                    key={index}
                    checked={index % 2 === 0}
                  />
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>

      <TabBar />
    </div>
  );
}
