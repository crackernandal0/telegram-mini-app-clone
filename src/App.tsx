import { BrowserRouter } from "react-router-dom";
import { RoutesProvider } from "./routes";
import { createContext, useState, useEffect } from "react";
import { useApi } from "@/hooks/useApi"; // Make sure to import the hook
import React from "react";
import axios from "axios"; // Import Axios

// Define interfaces
interface Task {
  id: string;
  category: "social" | "video" | "referral";
}

interface TelegramUser {
  id: number;
  mine: boolean;
  token: string;
  wallet: string;
  username: string;
  friends: string[];
  tasks: {
    social: Task[];
    video: Task[];
    referral: Task[];
  };
}

interface AppContextType {
  user: TelegramUser | null;
  updateUser: (updates: Partial<TelegramUser>) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function App() {
  const [telegramUserId, setTelegramUserId] = useState<number | null>();
  const [telegramUsername, setTelegramUsername] = useState<string | null>(null);
  const [referralTelegramId, setReferralTelegramId] = useState<string | null>(
    null
  );
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [taskUpdated, setTaskUpdated] = useState(false);
  const api = useApi();
  const [tasksData, setTasksData] = useState<Task[] | null>(null);
  const [userData, setUserData] = useState<any>(null); // Store user-specific data here

  // Fetch tasks based on telegramUserId
  useEffect(() => {
    if (telegramUserId) {
      const fetchTasks = async () => {
        try {
          console.log("taskingdata");
          const response = await axios.get(
            `https://api.needup.in/users/tasks/${telegramUserId}`
          );
          // console.log("Tasks:", response);
          setTasksData(response.data.data);
          setTaskUpdated(true);
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      };
      fetchTasks();
    }
  }, [telegramUserId]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const referralId = urlParams.get("startapp");
    if (referralId) {
      setReferralTelegramId(referralId);
      console.log("Referral Telegram ID:", referralId);
    }
  }, []);

  // Initialize Telegram WebApp and fetch user data
  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe;

      const userId = initDataUnsafe?.user?.id;
      const username = initDataUnsafe?.user?.username;

      setTelegramUserId(userId);
      setTelegramUsername(username);

      updateUser({
        id: userId,
        username: username,
      });

      // console.log("Telegram User ID:", userId);
      // console.log("Telegram Username:", username);

      if (userId) {
        sendReferralData(userId);
      }
    }
    // sendReferralData(673140005);
  }, []);

  // Handle tasks data update
  useEffect(() => {
    if (tasksData) {
      console.log("taskData", tasksData);
      const socialTasks = tasksData?.filter(
        (task) => task.task.category === "social"
      );
      const videoTasks = tasksData?.filter(
        (task) => task.task.category === "video"
      );
      const referralTasks = tasksData?.filter(
        (task) => task.task.category === "referral"
      );
      console.log("videoTasks", videoTasks);
      updateUser({
        tasks: {
          social: socialTasks,
          video: videoTasks,
          referral: referralTasks,
        },
      });

      setTaskUpdated(false);
    }
  }, [tasksData, taskUpdated]);

  useEffect(() => {
    if (!taskUpdated && api.data) {
      setUserData(api.data.data);
      // console.log("Login user data:", userData);
      updateUser({
        token: userData?.coins,
        mine: userData?.mine,
        friends: userData?.friends,
      });
    }
  }, [api.data, taskUpdated, userData]);

  // Function to send referral data
  const sendReferralData = async (userId: number | null) => {
    try {
      updateUser({ id: userId });
      const response = await api.post("/users/signup-tele", {
        telegramUserId: userId,
        telegramUserName: telegramUsername,
        referralTelegramId,
      });
    } catch (error) {
      console.error("Error sending referral data:", error);
    }
  };

  const updateUser = (updates: Partial<TelegramUser>) => {
    setUser((prevUser) => {
      if (!prevUser) return updates as TelegramUser;
      return { ...prevUser, ...updates };
    });
  };

  return (
    <AppContext.Provider value={{ user, updateUser }}>
      <BrowserRouter>
        <RoutesProvider />
      </BrowserRouter>
    </AppContext.Provider>
  );
}
