"use client";

import api from "@/app/configs/axios";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import type { Project } from "@/types";
import { FolderOpen, Monitor, PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

const dummyProjects: Project[] = [
  {
    id: "dummy-1",
    name: "Modern Portfolio",
    initial_prompt: "A sleek portfolio website with dark mode and animations",
    current_code: "<html><body style='background:#0a0a0a;color:white;display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif'><h1>Modern Portfolio</h1></body></html>",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isPublished: true,
    conversation: [],
    versions: [],
    current_version_index: "",
  },
  {
    id: "dummy-2",
    name: "E-commerce Store",
    initial_prompt: "A clean e-commerce store for handmade crafts",
    current_code: "<html><body style='background:#1a1a2e;color:white;display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif'><h1>E-commerce Store</h1></body></html>",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    isPublished: false,
    conversation: [],
    versions: [],
    current_version_index: "",
  },
  {
    id: "dummy-3",
    name: "SaaS Landing Page",
    initial_prompt: "A conversion-focused landing page for a SaaS product",
    current_code: "<html><body style='background:#0f3460;color:white;display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif'><h1>SaaS Landing Page</h1></body></html>",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
    isPublished: true,
    conversation: [],
    versions: [],
    current_version_index: "",
  },
];

const ProjectsPage = () => {
  const [loading, setLoading] = React.useState(true);
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [useDummy, setUseDummy] = React.useState(false);

  const fetchProjects = async () => {
    try {
      const {data} = await api.get(`/api/user/projects`);
      if (data.projects?.length > 0) {
        setProjects(data.projects);
      } else {
        setProjects(dummyProjects);
        setUseDummy(true);
      }
      setLoading(false);
    } catch {
      setProjects(dummyProjects);
      setUseDummy(true);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="px-10 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2>Projects</h2>
        <Link href="/">
          <Button variant={"indigo"}>
            <PlusIcon /> New Project
          </Button>
        </Link>
      </div>

      {useDummy && (
        <p className="text-sm text-yellow-400 mb-4">
          Showing example projects — create one to see your own.
        </p>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <Spinner className="size-8" />
        </div>
      ) : (
        <div className="flex flex-wrap gap-3.5">
          {projects.map((project) => (
            <Link
              href={`/projects/${project.id}`}
              key={project.id}
              className="border rounded-lg w-125 hover:ring-2 hover:ring-indigo-500 transition-all block"
            >
              <div className="relative w-full h-40 bg-gray-900 rounded-t-lg overflow-hidden border-b border-gray-800">
                {project.current_code ? (
                  <iframe
                    srcDoc={project.current_code}
                    className="absolute top-0 left-0 w-[2000px] h-[800px] origin-top-left pointer-events-none"
                    sandbox="allow-scripts allow-same-origin"
                    style={{ transform: "scale(0.25)" }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <p>No Preview</p>
                  </div>
                )}
              </div>
              <div className="p-3">
                <div className="flex justify-between items-center">
                  <h4>{project.name}</h4>
                  {project.isPublished && (
                    <span className="text-xs text-green-400">Published</span>
                  )}
                </div>
                <p className="text-sm text-gray-400 mt-1 line-clamp-2">{project.initial_prompt}</p>
                <div className="flex items-center gap-2 mt-3">
                  <Button variant="outline" size="sm">
                    <Monitor /> Preview
                  </Button>
                  <Button variant="outline" size="sm">
                    <FolderOpen /> Open
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
