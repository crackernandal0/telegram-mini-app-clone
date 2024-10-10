import { Item } from "./item";
import { useApi } from "@/hooks/useApi"; // Make sure to import the hook
import React, { useContext } from "react";

import youtubeIcon from "@/assets/videos-icons/youtube-icon.svg";
import { AppContext } from "@/App";

const socials = [
  {
    id: 0,
    name: "Follow Youtube is clossin",
    icon: youtubeIcon,
    value: "100 000",
  },
  {
    id: 1,
    name: "Follow Youtube is clossin",
    icon: youtubeIcon,
    value: "100 000",
  },
  {
    id: 2,
    name: "Telegae  hhhj gous jod ",
    icon: youtubeIcon,
    value: "100 000",
  },
];

export function Videos() {
  const context = useContext(AppContext);
  const { user } = context;
  const videoTasks = user?.tasks?.video || [];

  return (
    <ul className="flex flex-col gap-2.5 mt-4">
      {videoTasks?.map((task) => (
        <Item
          key={task._id}
          id={task.task._id}
          title={task.task.videoTask.videoName}
          socialIcon={youtubeIcon}
          value={`${task.task.videoTask.coins} coins`}
          videoLink={task.task.videoTask.videoLink}
          status={task.taskStatus === "completed"}
          videoCode={task.task.videoTask.videoCode}
        />
      ))}
    </ul>
  );
}
