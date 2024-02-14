"use client"
import { trpc } from "@/app/_trpc/client";
import UploadButton from "./UploadButton";
import { GhostIcon } from "lucide-react";

const { data: files, isLoading } = trpc.getUserFiles.useQuery()
const Dashboard = () => {
  return (
    <main className=" mx-auto max-w-7xl md:p-10">
      <div className=" mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className=" mb-3 font-bold text-5xl text-zinc-900"> My Files</h1>
        <UploadButton />
      </div>
      {/* display all user files */}
      {files && files?.length !== 0 ? (
        <div></div>
      ) : isLoading ? (
        <div></div>
      ) : (
        <div
          className=" mt-16 flex flex-col items-center gap-2
        "
        >
          <GhostIcon className="h-8 w-8 text-zinc-800" />
          <h3 className=" font-semibold text-xl">PREETY EMPTY AROUND HERE</h3>
          <p>let&aops;s upload your first pdf.</p>
        </div>
      )}
    </main>
  );
};

export default Dashboard;
