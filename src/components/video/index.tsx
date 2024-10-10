import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { FormEvent, forwardRef, ReactNode, useContext, useState } from "react";
import polygonImage from "@/assets/dollar.svg";
import person from "@/assets/person.svg";
import { AppContext } from "@/App";
import { useApi } from "@/hooks/useApi"; // Make sure to import the hook

interface VideoProps {
  children: ReactNode;
  videoCode?: string | null; // Code for checking, or null if video is needed
  videoLink: string;
  id: number;
  value: number;
  onClaim: (id: number) => void; // Add callback for claiming
}

export const Video = forwardRef<HTMLDivElement, VideoProps>(
  ({ children, videoCode, videoLink, id, value, onClaim }, ref) => {
    const [finish, setFinish] = useState(false);
    const [inputCode, setInputCode] = useState(""); // Track user input for the code
    const [error, setError] = useState(""); // Handle error message
    const [open, setOpen] = useState(false); // Control sheet visibility
    const context = useContext(AppContext);
    const { user, updateUser } = context;
    const api = useApi();
    function handleSetFinish(event: FormEvent) {
      event.preventDefault();

      if (videoCode && inputCode.trim() === videoCode) {
        setFinish(true);
        setError("");
      } else {
        setError("Incorrect code. Please try again."); // Error if the code doesn't match
      }
    }

    function handleOpenVideo() {
      setFinish(true);
      if (videoLink) {
        window.open(videoLink, "_blank"); // Open the YouTube video in a new tab
      }
    }
    function handleClaimToken() {
      updateUser({
        ...user,
        tasks: {
          ...user?.tasks,
          video: user?.tasks?.video?.map((task) => {
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
      const hasVideoCode = !!videoCode; // Set to true if videoCode has a value, otherwise false

      try {
        console.log("user.id", user.id);
        api.post("/users/tasks/status", {
          telegramUserId: user.id,
          taskId: id,
          code: hasVideoCode,
          ...(hasVideoCode && { videoCode }), 
        });
        // console.log("Referral API response:", response.data);
      } catch (error) {
        console.error("Error sending referral data:", error);
      }
      setOpen(false);
    }

    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>{children}</SheetTrigger>
        {!finish ? (
          <SheetContent
            side="bottom"
            className="bg-[#262F41] border border-[#262F41] rounded-t-3xl flex flex-col"
            ref={ref}
          >
            <SheetHeader className="justify-center items-center">
              <img src={person} className="w-16" />
              <SheetTitle className="text-[#7B7878] text-lg">
                {videoCode
                  ? "Watch the video, find the code, and enter it here"
                  : "Watch the video and claim your token"}
              </SheetTitle>
              <SheetDescription />
            </SheetHeader>

            {!videoCode ? (
              // No form, just a claim button for opening the video in a new tab
              <div className="flex flex-col items-center">
                <button
                  className="text-white flex justify-center items-center bg-button px-4 rounded-base h-12 w-full mt-4"
                  onClick={handleOpenVideo}
                >
                  Claim
                </button>
              </div>
            ) : (
              // Render form for entering code if videoCode is provided
              <form className="flex flex-col gap-4" onSubmit={handleSetFinish}>
                <input
                  type="text"
                  placeholder="Enter code"
                  value={inputCode} // Bind input value to state
                  onChange={(e) => setInputCode(e.target.value)} // Update state on input change
                  className="flex-1 custom-input h-12 bg-[#242C3B] rounded-lg text-white p-2 border-none outline-none"
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}{" "}
                {/* Show error if the code is incorrect */}
                <button className="text-white flex justify-center items-center bg-button px-4 rounded-base h-12 w-full">
                  Go
                </button>
              </form>
            )}
          </SheetContent>
        ) : (
          <SheetContent
            side="bottom"
            className="bg-[#262F41] border border-[#262F41] rounded-t-3xl flex flex-col items-center"
            ref={ref}
          >
            <SheetHeader className="justify-center items-center">
              <img src={person} className="w-16" />
              <SheetTitle className="text-[#7B7878] text-lg">
                Congratulations, you have completed the task!
              </SheetTitle>
              <SheetDescription />
            </SheetHeader>

            <div className="flex items-center gap-1 mt-2 mb-4">
              <img
                src={polygonImage}
                alt="Polygon image"
                className="text-2xl"
              />
              <strong className="text-white font-extrabold text-3xl">
                {value}
              </strong>
            </div>

            <button
              className="text-white flex justify-center items-center bg-button px-4 rounded-md h-12 w-[114px]"
              onClick={handleClaimToken} // Handle claim and close
            >
              Claimed
            </button>
          </SheetContent>
        )}
      </Sheet>
    );
  }
);
