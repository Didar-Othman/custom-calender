import Image from "next/image";
import CustomCalendar from "@/components/custom-calender";

export default function Home() {
  return (
    <div className="h-screen flex flex-row justify-center items-center">
          <CustomCalendar />
    </div>
  );
}