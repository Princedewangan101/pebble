import { Dispatch, SetStateAction } from "react";

export interface Message {
  id: string;
  role: any;
  content: string;
  timestamp: string;
}

export interface Version {
  id: string;
  timestamp: string;
  code: string;
}

export interface Project {
  id: string;
  name: string;
  initial_prompt: string;
  current_code: string;
  createdAt: string;
  updatedAt: string;
  isPublished?: boolean;
  versionId?: string;
  conversation: Message[];
  versions: Version[];
  current_version_index: string;
}

export interface ClientPartOfPricingPageButtonProps {
  planId: string;
}

export interface SiderbarProps {
  isMenuOpen: boolean;
  project: Project;
  setProject: Dispatch<SetStateAction<Project | null>>;
  isGenerating: boolean;
  setIsGenerating: Dispatch<SetStateAction<boolean>>;
}

export interface ProjectPreviewProps {
  isMenuOpen: boolean;
  project: Project;
  isGenerating: boolean;
  device? : "phone" | "tablet" | "desktop";
  showEditorPanel?: boolean;
}

export interface EditorPanelProps {
  selectedElement: {
    tagName: string;
    className: string;
    text: string;
    styles: {
      padding: string;
      margin: string;
      backgroundColour: string;
      color: string;
      fontSize: string;
    };
  } | null;
  onUpdate: (update: any) => void;
  onClose: () => void;
}
