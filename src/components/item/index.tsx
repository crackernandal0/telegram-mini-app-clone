import { ChevronRight, Coins } from "lucide-react";
import poly from "@/assets/dollar.svg";
import { useEffect, useState, useContext } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useApi } from "@/hooks/useApi"; // Make sure to import the hook
import { AppContext } from "@/App";

interface ItemProps {
  title: string;
  socialIcon: string;
  value: number;
  url: string;
  id: number;
  isClaimed: boolean;
  onUpdate: () => void;
}

export function Item({
  socialIcon,
  title,
  value,
  url,
  id,
  isClaimed,
  onUpdate,
}: ItemProps) {
  const api = useApi();
  const context = useContext(AppContext);
  const { user, updateUser } = context;
  // console.log("isClaimed", isClaimed);

  const [loading, setLoading] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [claimedDone, setClaimedDone] = useState(isClaimed);

  useEffect(() => {
    setClaimedDone(isClaimed);
  });
  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setClaimed(true);
    }, 5000);
  };
  // console.log("user", user?.tasks?.social);

  const handleUpdate = async () => {
    //  api.post('users/tasks/status',{
    //   telegramUserId:user.id,
    //   taskId:id
    //  })
    console.log("value", value);
    console.log("user", user?.tasks?.social);
    // console.log("taskid", id);

    updateUser({
      ...user,
      tasks: {
        ...user?.tasks,
        social: user?.tasks?.social?.map((task) => {
          console.log("Task ID being updated:", task.task); // Log the task ID
          if (task.task._id === id && task.taskStatus === "pending") {
            console.log("task", task.task);
            task.taskStatus = "completed";
            return {
              ...task,
              // task: {
              //   ...task.task,
              //   status: "completed", // Update the task status to 'completed'
              // },
            };
          }
          return task;
        }),
      },
      token: user.token + value, // Add token value to the user's token balance
    });

    try {
      console.log("user.id", user.id);
      const response = await api.post("/users/tasks/status", {
        telegramUserId: user.id,
        taskId: id,
        code: false,
      });
      // console.log("Referral API response:", response.data);
    } catch (error) {
      console.error("Error sending referral data:", error);
    }

    console.log("user", user?.tasks?.social);
  };

  return (
    <div>
      <li className="flex items-center justify-between bg-[#2C3649] rounded-[10px] p-4">
        <div className="flex items-center gap-2">
          <img src={socialIcon} alt="" className="w-7 h-7" />
          <div className="flex flex-col gap-[2px]">
            <strong className="text-[#F9F9F9] text-xs font-semibold">
              {title}
            </strong>
            <span className="flex items-center gap-1 text-[#E7E7E7] text-[11px]">
              <img src={poly} alt="" className="w-3 h-3" /> {value}
            </span>
          </div>
        </div>
        {loading ? (
          <ClipLoader color="#F9F9F9" size={24} />
        ) : claimed ? (
          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white rounded-[10px] px-4 py-2"
          >
            Claim
          </button>
        ) : claimedDone ? (
          <div className="circle flex justify-center items-center mr-2 bg-green-500  rounded-full w-6 h-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        ) : (
          <a
            onClick={handleClick}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ChevronRight color="#BEBEBE" size={32} />
          </a>
        )}
      </li>
    </div>
  );
}
