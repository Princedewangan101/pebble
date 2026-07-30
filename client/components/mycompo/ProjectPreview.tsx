import { iframeScript } from "@/assets/assets";
import { ProjectPreviewProps } from "@/types";
import React, { forwardRef, useRef } from "react";
import EditorPanel from "./EditorPanel";

export interface ProjectPreviewRef {
  getCode: () => string | undefined;
}

const ProjectPreview = forwardRef<ProjectPreviewRef, ProjectPreviewProps>(
  (
    { project, isGenerating, device = "desktop", showEditorPanel = true },
    ref
  ) => {
    const [selectedElement, setSelectedElement] = React.useState<any>(null);

    const iframeRef = useRef<HTMLIFrameElement>(null);
    const resolutions = {
      phone: "w-[412px]",
      tablet: "w-[768px]",
      desktop: "w-full",
    };

    React.useEffect(() => {
      const handleMessage = (event: MessageEvent) => {
        if (event.data.type === "ELEMENT_SELECTED") {
          setSelectedElement(event.data.payload);
        } else if (event.data.type === " CLEAR_SELECTION") {
          setSelectedElement(null);
        }
      };
      window.addEventListener("message", handleMessage);
      return () => {
        window.removeEventListener("message", handleMessage);
      };
    }, []);

    const handleUpdate = (updates: any) => { 
        if(iframeRef.current?.contentWindow){
          iframeRef.current.contentWindow.postMessage({
            type: 'UPDATE_ELEMENT',
            payload: updates
          }, '*')
        }
     }

    const injectPreview = (html: string) => {
      if (!html) return "";
      if (!showEditorPanel) return "html";
      if (!html.includes("</body>")) {
        return html.replace("</body>", iframeScript + "</body>");
      } else {
        return html + iframeScript;
      }
    };

    return (
      <div className="relative h-full">
        {project.current_code ? (
          <>
            <iframe
              ref={iframeRef}
              srcDoc={injectPreview(project.current_code)}
              className={`h-full ${resolutions[device]} mx-auto transition-all `}
            />
            {showEditorPanel && selectedElement && (
              <EditorPanel
                selectedElement={selectedElement}
                onUpdate={handleUpdate}
                onClose={() => {
                  setSelectedElement(null);
                  if (iframeRef.current?.contentWindow) {
                    iframeRef.current?.contentWindow.postMessage(
                      { type: "CLEAR_SELECTION_REQUEST" },
                      "*"
                    );
                  }
                }}
              />
            )}
          </>
        ) : (
          isGenerating && <>loading</>
        )}
      </div>
    );
  }
);

export default ProjectPreview;
