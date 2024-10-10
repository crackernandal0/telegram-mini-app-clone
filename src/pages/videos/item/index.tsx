import { ChevronRight } from "lucide-react";
import { Video } from "@/components/video";
import dolar from "@/assets/dollar.svg";

interface ItemProps {
  title: string;
  socialIcon: string;
  value: string;
  videoLink: string;
  videoCode: string;
  status: boolean;
  id: number;

}

export function Item({
  socialIcon,
  title,
  value,
  videoLink,
  videoCode,
  status,
  id,
}: ItemProps) {
  return (
    <Video videoCode={videoCode} videoLink={videoLink}
    value={value}
    id={id}
    >
      {/* Pass videoCode as prop */}
      <li className="flex items-center justify-between bg-[#2C3649] rounded-[10px] p-4">
        <div className="flex items-center gap-2">
          <img src={socialIcon} alt="" className="w-7 h-7" />
          <div className="flex flex-col gap-[2px]">
            <strong className="text-[#F9F9F9] text-xs font-semibold">
              {title}
            </strong>
            <span className="flex items-center gap-1 text-[#E7E7E7] text-[11px]">
              <img src={dolar} alt="" className="w-3 h-3" /> {value}
            </span>
          </div>
        </div>

        {status ? (
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
          <ChevronRight color="#BEBEBE" size={32} />
        )}
      </li>
    </Video>
  );
}
