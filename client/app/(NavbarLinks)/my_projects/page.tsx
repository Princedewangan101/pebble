"use client";

import api from "@/app/configs/axios";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Project } from "@/types";
import { ExternalLink, Eye, PlusIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

const My_ProjectPage = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async () => {
    try {
      const {data} = await api.get(`/api/user/projects`);
      setProjects(data.projects)
      setLoading(false)
    } catch (error: any) {
      console.log(error);
      toast.error(error.message)
    }
  };

  const deleteProject = async (projectId: string) => {
    try {
      const confirm = window.confirm(`Are you sure you want to delete this project ?`)
      if (!confirm) return;
      const {data} = await api.delete(`/api/projects/${projectId}`);
      toast.success(data.message);
      setProjects((prev) => prev.filter((p) => p.id !== projectId));
    } catch (error: any) {
      console.log(error);
      toast.error(error.message)
    }
  };

  React.useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="px-6 md:px-10 py-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl">My Projects</h2>
          <p className="text-gray-400 text-sm mt-1">{projects.length} project{projects.length !== 1 ? "s" : ""}</p>
        </div>
        <Link href="/">
          <Button variant={"indigo"}>
            <PlusIcon /> New Project
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Spinner className="size-8" />
        </div>
      ) : projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group border border-slate-800 rounded-xl overflow-hidden bg-slate-900/50 hover:border-indigo-600/50 hover:shadow-lg hover:shadow-indigo-600/5 transition-all duration-300"
            >
              {/* Preview */}
              <Link href={`/projects/${project.id}`} className="block">
                <div className="relative w-full h-44 bg-gray-950 overflow-hidden border-b border-slate-800">
                  {project.current_code ? (
                    <>
                      <iframe
                        srcDoc={project.current_code}
                        className="absolute top-0 left-0 w-[2000px] h-[800px] origin-top-left pointer-events-none"
                        sandbox="allow-scripts allow-same-origin"
                        style={{ transform: "scale(0.22)" }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-600">
                      <Eye className="size-8" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2 flex gap-1.5">
                    {project.isPublished && (
                      <span className="text-[11px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full border border-green-500/30">
                        Published
                      </span>
                    )}
                  </div>
                </div>
              </Link>

              {/* Info */}
              <div className="p-4">
                <Link href={`/projects/${project.id}`}>
                  <h4 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
                    {project.name}
                  </h4>
                </Link>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                  {project.initial_prompt}
                </p>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-800">
                  <span className="text-xs text-gray-600">
                    {new Date(project.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <div className="flex items-center gap-1">
                    <Link href={`/preview/${project.id}`}>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="size-4" />
                      </Button>
                    </Link>
                    <Link href={`/projects/${project.id}`}>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <ExternalLink className="size-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:text-red-400 hover:bg-red-500/10"
                      onClick={() => deleteProject(project.id)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="size-16 rounded-full bg-slate-800 flex items-center justify-center mb-4">
            <Eye className="size-6 text-gray-500" />
          </div>
          <p className="text-gray-400 text-lg mb-1">No projects yet</p>
          <p className="text-gray-600 text-sm mb-6">Create your first AI-powered website</p>
          <Link href="/">
            <Button variant={"indigo"} size="sm">
              <PlusIcon /> New Project
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default My_ProjectPage;
