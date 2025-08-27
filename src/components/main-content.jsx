import { useState } from "react";
import { Button } from "./ui/button";
import { Code, Eye, Smartphone, Monitor } from "lucide-react";
import { CodeViewer } from "./code-viewer";

export function MainContent({ activity, viewMode, onViewModeChange }) {
  const [iframeError, setIframeError] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  const handleIframeError = () => {
    setIframeError(true);
  };

  const toggleViewMode = () => {
    setIsMobileView(!isMobileView);
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="border-b p-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{activity.title}</h1>
            <p className="text-sm text-muted-foreground">{activity.content}</p>
          </div>
          <div className="flex gap-2">
            {viewMode === "preview" && (
              <Button
                variant="outline"
                size="sm"
                onClick={toggleViewMode}
                className="gap-2"
              >
                {isMobileView ? (
                  <>
                    <Monitor className="h-4 w-4" />
                    Desktop
                  </>
                ) : (
                  <>
                    <Smartphone className="h-4 w-4" />
                    Mobile
                  </>
                )}
              </Button>
            )}
            <Button
              variant={viewMode === "preview" ? "default" : "outline"}
              size="sm"
              onClick={() => onViewModeChange("preview")}
              className="gap-2"
            >
              <Eye className="h-4 w-4" />
              Preview
            </Button>
            <Button
              variant={viewMode === "code" ? "default" : "outline"}
              size="sm"
              onClick={() => onViewModeChange("code")}
              className="gap-2"
            >
              <Code className="h-4 w-4" />
              Code
            </Button>
          </div>
        </div>
      </div>

      <div className="p-2">
        {viewMode === "preview" ? (
          iframeError ? (
            <div className="flex flex-col items-center">
              {activity.img && (
                <img
                  src={activity.img}
                  alt={activity.title}
                  className="max-w-full h-auto rounded-lg border mb-4"
                />
              )}
              <div className="text-center text-muted-foreground">
                <p>No se pudo cargar la vista previa interactiva</p>
              </div>
            </div>
          ) : (
            <div className={`flex ${isMobileView ? 'justify-center' : ''}`}>
              <iframe
                src={`./activities/${activity.folder}/index.html`}
                className={
                  isMobileView
                    ? "w-[375px] h-[667px] rounded-lg border bg-background"
                    : "w-full h-[600px] rounded-lg border bg-background"
                }
                title={`Preview: ${activity.title}`}
                onError={handleIframeError}
                sandbox="allow-same-origin allow-scripts allow-forms"
              />
            </div>
          )
        ) : (
          <CodeViewer activity={activity} />
        )}
      </div>
    </div>
  );
}