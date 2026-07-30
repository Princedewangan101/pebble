import React, { useRef } from "react";
import { Textarea } from "../ui/textarea";
import { BotIcon, EyeIcon, SendIcon, UserIcon } from "lucide-react";
import { Message, SiderbarProps, Version } from "@/types";
import { timeStamp } from "console";
import { Button } from "../ui/button";
import Link from "next/link";
import { Spinner } from "../ui/spinner";
import api from "@/app/configs/axios";
import { toast } from "sonner";

const Sidebar = ({
  isMenuOpen,
  project,
  setProject,
  isGenerating,
  setIsGenerating,
}: SiderbarProps) => {
  const messageRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = React.useState<string>();

  const fetchProject = async () => {
    try {
      const { data } = await api.get(`/api/user/project/${project.id}`);
      setProject(data.project);
    } catch (error: any) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const handleRoleBack = async (versionId: string) => {
    try {
      const confirm = window.confirm(`Are you sure you want to rollback to this version ?`)
      if (!confirm) return;
      setIsGenerating(true)
      const {data} = await api.get(`/api/project/rollback/${project.id}/${versionId}`);
      const {data: dataSecond} = await api.get(`/api/user/project/${project.id}`);
      toast.success(data.message)
      setProject(dataSecond.project)
      setIsGenerating(false)
    } catch (error: any) {
      setIsGenerating(false)
      toast.error(error.message);
      console.log(error);
    }
  };

  const handleRevisions = async (e: React.FormEvent) => {
    e.preventDefault();
    let interval: ReturnType<typeof setInterval> | undefined;
    try {
      setIsGenerating(true);
      interval = setInterval(() => {
        fetchProject();
      }, 10000);
      const { data } = await api.post(`/api/project/revision/${project.id}`, {
        message: input,
      });
      fetchProject();
      toast.success(data.message);
      setInput("");
      clearInterval(interval);
      setIsGenerating(false);
    } catch (error: any) {
      setIsGenerating(false);
      toast.error(error.message);
      console.log(error);
      clearInterval(interval);
    }
  };

  React.useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [project.conversation.length, isGenerating]);

  return (
    <>
      <div className="relative flex items-end w-120 h-full bg-slate-900">
        <div className="relative w-full h-full">
          {/* message container */}
          <div className="relative flex flex-col h-full overflow-auto custom-scrollbar px-3 pb-16 gap-4">
            {[...project.conversation, ...project.versions]
              .sort(
                (a, b) =>
                  new Date(a.timestamp).getTime() -
                  new Date(b.timestamp).getTime()
              )
              .map((message) => {
                const isMessage = "content" in message;
                if (isMessage) {
                  const msg = message as Message;
                  const isUser = msg.role === "user";
                  return (
                    <div
                      key={msg.id}
                      className={`flex items-start gap-1.5 ${
                        isUser ? "justify-end" : "justify-start"
                      }`}
                    >
                      {!isUser && (
                        <div className="bg-slate-800 p-2 rounded-md">
                          <BotIcon />
                        </div>
                      )}
                      <div
                        className={`max-w-[85%] px-2.5 py-2 my-2 rounded-md ${
                          isUser ? "bg-indigo-600" : "bg-gray-700"
                        }`}
                      >
                        {msg.content}
                      </div>
                      {isUser && (
                        <div className="bg-slate-800 p-2 rounded-md">
                          <UserIcon />
                        </div>
                      )}
                    </div>
                  );
                } else {
                  const ver = message as Version;
                  return (
                    <div key={ver.id} className=" p-10 rounded-lg bg-slate-800">
                      <div>
                        <span className="font-bold text-2xl">Code updated</span>
                        <br />
                        <span>{new Date(ver.timestamp).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center mt-5 gap-1.5">
                        {project.current_version_index === ver.id ? (
                          <Button variant={"indigo"}>Current Version</Button>
                        ) : (
                          <Button
                            onClick={() => handleRoleBack(ver.id)}
                            variant={"indigo"}
                          >
                            Roll back to this version
                          </Button>
                        )}
                        <Link
                          href={`/preview/${project.id}/${ver.id}`}
                          target="blank"
                        >
                          <div className="bg-slate-700 hover:bg-slate-600 p-1.5 rounded-lg">
                            <EyeIcon className="size-6" />
                          </div>
                        </Link>
                      </div>
                    </div>
                  );
                }
              })}
            {isGenerating && (
              <div>
                <div className="bg-slate-700 p-2">
                  <BotIcon />
                </div>
                <div className="flex gap-1.5 h-full items-end">
                  <span
                    className="size-2 rounded-full animate-bounce bg-gray-600"
                    style={{ animationDelay: "0s" }}
                  />
                  <span
                    className="size-2 rounded-full animate-bounce bg-gray-600"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <span
                    className="size-2 rounded-full animate-bounce bg-gray-600"
                    style={{ animationDelay: "0.4s" }}
                  />
                </div>
              </div>
            )}
            <div ref={messageRef} />
          </div>

          {/* textarea , sendbtn */}
          <div className="absolute bottom-0 bg-slate-900 px-1 py-2 rounded-t-md w-full flex items-center gap-1.5">
            <Textarea
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              placeholder="Type your message here."
              className="resize-none w-full"
              disabled={isGenerating}
            />
            <div className="border p-4.5 rounded-lg hover:bg-slate-800 hover:border-slate-500">
              {isGenerating ? <Spinner /> : <SendIcon className="size-8" />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
