"use client";
import { trpc } from "@/app/_trpc/client";
import UploadButton from "./UploadButton";
import Skeleton from "react-loading-skeleton";
import {
  GhostIcon,
  Loader,
  MessageSquare,
  Plus,
  Trash,
  TrashIcon,
} from "lucide-react";
import { date } from "zod";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { useState } from "react";
import { getUserSubscriptionPlan } from "@/lib/stripe";

interface PageProps {
  subscriptionPlan: Awaited<ReturnType<typeof getUserSubscriptionPlan>>;
}

const Dashboard = ({ subscriptionPlan }: PageProps) => {
  const [curentDeletingFile, setCurrentlyDeletingFile] = useState<
    string | null
  >(null);

  const utils = trpc.useContext();

  const { data: files, isLoading } = trpc.getUserFiles.useQuery();

  const { mutate: deleteFile } = trpc.deleteFile.useMutation({
    onSuccess: () => {
      utils.getUserFiles.invalidate();
    },

    onMutate: ({ id }) => {
      setCurrentlyDeletingFile(id);
    },

    onSettled() {
      setCurrentlyDeletingFile(null);
    },
  });
  return (
    <main className=" mx-auto max-w-7xl md:p-10">
      <div className=" mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className=" mb-3 font-bold text-5xl text-zinc-900"> My Files</h1>
        <UploadButton isSubscribed={subscriptionPlan.isSubscribed} />
      </div>

      {/* display all user files */}

      {files && files?.length !== 0 ? (
        <ul className=" mt-8 grid grid-col gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
          {files
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((files) => (
              <li
                key={files.id}
                className=" col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg
            "
              >
                <Link
                  href={`/dashboard/${files.id}`}
                  className="flex flex-col gap-2"
                >
                  <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-orange-500 to-red-500" />
                    <div className="flex-1 truncate">
                      <div className="flex items-center space-x-3">
                        <h3 className="truncate text-lg font-medium text-zinc-900">
                          {files.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className=" px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500">
                  <div className=" flex items-center gap-2">
                    <Plus className=" h-4 w-4" />
                    {format(new Date(files.createdAt), "MMM dd yyyy")}
                  </div>
                  <div className=" flex items-center gap-2">
                    <MessageSquare className=" h-4 w-4" />
                    mocked
                  </div>
                  <Button
                    onClick={() => deleteFile({ id: files.id })}
                    size="sm"
                    className="w-full"
                    variant="destructive"
                  >
                    {curentDeletingFile === files.id ? (
                      <Loader className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </li>
            ))}
        </ul>
      ) : isLoading ? (
        <Skeleton height={100} className=" my-2" count={6} />
      ) : (
        <div
          className=" mt-16 flex flex-col items-center gap-2
        "
        >
          <GhostIcon className="h-8 w-8 text-zinc-800" />
          <h3 className=" font-semibold text-xl">Nothing present here. 😥</h3>
          <p>let&apos;s upload your first pdf.</p>
        </div>
      )}
    </main>
  );
};

export default Dashboard;
