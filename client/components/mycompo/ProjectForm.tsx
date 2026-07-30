"use client";

import { Loader2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import api from "@/app/configs/axios";
import { redirect } from "next/navigation";

const ProjectForm = () => {
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!input.trim()) {
        return toast.error('Please enter a prompt')
      }
      setLoading(true)
      const { data } = await api.post('/api/user/project', { initial_prompt: input })
      setLoading(false);
      redirect(`/projects/${data.projectId}`);
    } catch (error: any) {
      setLoading(false);
      toast.error("Error from {onSubmitHandler} in page.tsx(client_part)", error.message);
      console.log(error);
    }
  };
  return (
    <div className="border">
      <div className="flex items-end">
        <div className="border w-7 h-5" />
        <div className="text-gray-500  border w-40 px-2 py-2 text-sm flex gap-3 items-center justify-center rounded-tl-xl rounded-tr-xl">
          <p>gemini 2.5 flash</p>
          <p>""</p>
        </div>
      </div>
      <form
        onSubmit={onSubmitHandler}
        className="bg-gray-950/20 max-w-2xl w-200 rounded-xl p-4 border border-indigo-600/70 ring-indigo-500 focus:outline-none transition-all"
      >
        <textarea
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          placeholder="Describe your details here . . ."
          className="bg-transparent outline-none text-gray-300 resize-none w-full"
          required
        />
        <button className="ml-auto w-40 h-10 text-center flex items-center justify-center gap-2 bg-linear-to-r from-[#CB52D4] to-indigo-600 rounded-md px-4">
          {!loading ?
            (
              // <p>Creating</p>
              <div className=" flex gap-2 animate-bounce">
                <p className="bg-white rounded w-1 h-1" />
                <p className="bg-white rounded w-1 h-1" />
                <p className="bg-white rounded w-1 h-1" />
              </div>
            )
            : (
              <>
                Creating . . . <Loader2 className="animate-spin size-4 text-white" />
              </>
            )}
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
