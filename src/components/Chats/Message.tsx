import { cn } from "@/lib/utils";
import { ExtendedtMessage } from "@/types/message";
import { Icons } from "../icons";

interface MessageProps {
  message: ExtendedtMessage;
  isNextMessageSamePerson: Boolean;
}

const Message = ({ message, isNextMessageSamePerson }: MessageProps) => {
  return (
    // if user's message display these messages in right side and if AI 's message display these in left side

    <div
      className={cn("flex items-end", {
        " justify-end": message.isUserMessage,
      })}
    >
      <div
        className={cn(
          "relative flex h-6 w-6 aspect-square items-center justify-center",
          {
            "order-2 bg-orange-500  rounded-sm": message.isUserMessage,
            "order-1 bg-yellow-500 rounded-sm ": !message.isUserMessage,
            invisible: isNextMessageSamePerson,
          }
        )}
      >
        {message.isUserMessage ? (
          <Icons.user className=" fill-zinc-200  text-zinc-200 h-3/4 w-3/4" />
        ) : (
          <Icons.logo className=" fill-zinc-300 h-3/4 w-3/4" />
        )}
      </div>
    </div>
  );
};

export default Message;
