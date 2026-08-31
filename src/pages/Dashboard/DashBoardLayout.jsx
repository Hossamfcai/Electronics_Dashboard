import { Outlet } from "react-router-dom";
import SideBar from "../../Components/SidBar";

export default function DashBoardLayout() {
  return (
    <div className="flex">
      <div className="w-[25%]">
        {" "}
        <SideBar />{" "}
      </div>
      <div className="h-screen w-full p-3">
        <Outlet />
      </div>
    </div>
  );
}
