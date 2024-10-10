import { Item } from "../../components/item";
import youtubeIcon from "@/assets/videos-icons/youtube-icon.svg";
import xIcon from "@/assets/videos-icons/x-icon.svg";
import telegramIcon from "@/assets/videos-icons/telegram-icon.svg";
import whatsappIcon from "@/assets/videos-icons/whatsapp-icon.svg";
import instagramIcon from "@/assets/videos-icons/instagram-icon.svg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { AppContext } from "@/App";

const socialPlatforms = {
  instagram: {
    name: "Follow Instagram",
    icon: instagramIcon,
  },
  twitter: {
    name: "Follow X Handle",
    icon: xIcon,
  },
  telegram: {
    name: "Follow Telegram",
    icon: telegramIcon,
  },
  whatsapp: {
    name: "Follow WhatsApp",
    icon: whatsappIcon,
  },
  youtube: {
    name: "Follow YouTube",
    icon: youtubeIcon,
  },
};

export function Socials() {
  const context = useContext(AppContext);
  const { user } = context;
  const socialTasks = user?.tasks?.social || [];

  return (
    <div>
      <ToastContainer position="top-center" closeOnClick />
      <ul className="flex flex-col gap-2.5 mt-4">
        {socialTasks.map((task, index) => {
          const platform = task.task.socialTask.platform;
          const socialInfo = socialPlatforms[platform];

          if (!socialInfo) return null; // Skip if platform is not recognized

          return (
            <Item
              key={task.task._id}
              title={socialInfo.name}
              socialIcon={socialInfo.icon}
              value={task.task.socialTask.coins}
              isClaimed={task.taskStatus === "completed"}
              url={task.task.socialTask.link}
              id={task.task._id}
              onUpdate={() => {}}
            />
          );
        })}
      </ul>
    </div>
  );
}
