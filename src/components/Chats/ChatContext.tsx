import { type } from "os";
import React, { ReactNode, createContext, useState } from "react";
import { useToast } from "../ui/use-toast";
import { useMutation } from "@tanstack/react-query";
type StreamResponse = {
  addMessage: () => void;
  message: string;
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isLoading: boolean;
};

export const ChartContext = createContext<StreamResponse>({
  addMessage: () => {},
  message: "",
  handleInputChange: () => {},
  isLoading: false,
});

interface Props {
  fileId: string;
  children: ReactNode;
}

export const ChartContextProvider = ({ fileId, children }: Props) => {
  // State for messages and loading status
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();
  const { mutate: sendMessage } = useMutation({
    mutationFn: async ({ message }: { message: string }) => {
      const response = await fetch("/api/message", {
        method: "POST",
        body: JSON.stringify({
          fileId,
          message,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      return response.body;
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const addMessage = () => sendMessage({ message });
  return (
    <ChartContext.Provider
      value={{
        addMessage,
        message,
        handleInputChange,
        isLoading,
      }}
    >
      {children}
    </ChartContext.Provider>
  );
};
