"use client";

import { Project } from "@/types";
import Image from "next/image";
import { useParams } from "next/navigation";
import favicon from "@/app/favicon.ico";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/mycompo/Sidebar";
import api from "@/app/configs/axios";
import { toast } from "sonner";
import { Laptop, Smartphone, Tablet } from "lucide-react";
import ProjectPreview, {
  ProjectPreviewRef,
} from "@/components/mycompo/ProjectPreview";

const ProjectBuilderPage = () => {
  const params = useParams();
  const projectId = params.projectId as string;

  const [project, setProject] = React.useState<Project | null>(null);
  const [isGenerating, setIsGenerating] = React.useState(true);
  const [device, setDevice] = useState<"phone" | "tablet" | "desktop">(
    "desktop"
  );
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const previewRef = useRef<ProjectPreviewRef>(null);

  const fetchProject = async () => {
    try {
      const { data } = await api.get(`/api/user/project/${projectId}`);
      setProject(data.project);
      setIsGenerating(data.project.current_code ? false : true);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast.error(
        "Error from {onSubmitHandler} in page.tsx(client_part)",
        error.message
      );
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchProject();
  }, []);

  React.useEffect(() => {
    if (project && !project.current_code) {
      const intervalId = setInterval(fetchProject, 10000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [project]);

  const saveProject = async () => {
    if (!previewRef.current) return;
    const code = previewRef.current.getCode();
    if (!code) return;
    setIsSaving(true);
    try {
      const { data } = await api.put(`/api/projects/save/${projectId}`, {
        code,
      });
      toast.success(data.message);
    } catch (error: any) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setIsSaving(false);
    }
  };

  const downloadCode = () => {
    const code = previewRef.current?.getCode() || project?.current_code;
    if (!code) {
      if (isGenerating) {
        return;
      }
      return;
    }
    const element = document.createElement("a");
    const file = new Blob([code], { type: "text/html" });
    element.href = URL.createObjectURL(file);
    element.download = "index.html";
    document.body.appendChild(element);
    element.click();
  };

  const togglePublish = async () => {
    try {
      const { data } = await api.get(`/api/user/publish-toggle/${projectId}`);
      toast.success(data.message);
      setProject((prev) => prev ? ({...prev, isPublished: !prev.isPublished}): null)
    } catch (error: any) {
      toast.error(error.message);
      console.log(error);
    }
  };

  if (!project) {
    return <p>Unable to load project!</p>;
  }

  if (isGenerating) {
    return <p>Generating project...</p>;
  }

  return (
    <>
      <div className="flex justify-between items-center py-2.5 px-6 bg-[#141414]">
        <div className="flex items-center">
          <div className="">
            <Image src={favicon} alt="logo" width={40} height={40} />
          </div>
          <h5>{project.name}</h5>
        </div>
        <div className="flex items-center">
          {/* mobile  laptop computer */}
          <div className="flex gap-1">
            <div
              onClick={() => setDevice("phone")}
              className="p-2 rounded-md hover:bg-muted  cursor-pointer"
            >
              <Smartphone className="size-8 text-muted-foreground hover:text-white" />
            </div>
            <div
              onClick={() => setDevice("tablet")}
              className="p-2 rounded-md hover:bg-muted  cursor-pointer"
            >
              <Tablet className="size-8 text-muted-foreground hover:text-white" />
            </div>
            <div
              onClick={() => setDevice("desktop")}
              className="p-2 rounded-md hover:bg-muted  cursor-pointer"
            >
              <Laptop className="size-8 text-muted-foreground hover:text-white" />
            </div>
          </div>

          {/* button */}
          <div className="flex gap-1">
            <Link href="">
              <Button variant="outline">Save</Button>
            </Link>
            <Link href="">
              <Button variant="outline">Preview</Button>
            </Link>
            <Link href="">
              <Button variant="outline">Download</Button>
            </Link>
            <Link href="">
              <Button variant="outline">Unpublish</Button>
            </Link>
          </div>
        </div>
      </div>

      <main className="flex h-[calc(100vh-67px)]">
        {/* sidebar */}
        <div className="">
          <Sidebar
            isMenuOpen={isMenuOpen}
            project={project}
            setProject={(p) => {
              setProject(p);
            }}
            isGenerating={isGenerating}
            setIsGenerating={setIsGenerating}
          />
        </div>

        {/* preview - area */}
        <div className="w-full h-full ">
          <ProjectPreview
            ref={previewRef}
            project={project}
            isGenerating={isGenerating}
            device={device}
            isMenuOpen={false}
          />
        </div>
      </main>
    </>
  );
};

export default ProjectBuilderPage;
