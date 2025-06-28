"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, File, X, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ResumeUploadProps {
  value?: string;
  onChange: (url: string) => void;
  disabled?: boolean;
  className?: string;
}

export function ResumeUpload({
  value,
  onChange,
  disabled,
  className,
}: ResumeUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setUploading(true);
      setError(null);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload/resume", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Upload failed");
        }

        onChange(data.url);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setUploading(false);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
    disabled: disabled || uploading,
  });

  const removeFile = () => {
    onChange("");
    setError(null);
  };

  const getFileName = (url: string) => {
    return url.split("/").pop() || "resume";
  };

  return (
    <div className={cn("space-y-3", className)}>
      {!value ? (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
            isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400",
            (disabled || uploading) && "cursor-not-allowed opacity-50"
          )}
        >
          <input {...getInputProps()} />
          <div className="space-y-2">
            {uploading ? (
              <Loader2 className="w-8 h-8 mx-auto text-blue-500 animate-spin" />
            ) : (
              <Upload className="w-8 h-8 mx-auto text-gray-400" />
            )}
            <div>
              <p className="text-sm font-medium text-gray-700">
                {uploading
                  ? "Uploading..."
                  : isDragActive
                  ? "Drop your resume here"
                  : "Click to upload or drag and drop"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PDF, DOC, or DOCX up to 5MB
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between p-3 border rounded-lg bg-green-50 border-green-200">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <Check className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex items-center space-x-2">
              <File className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700 truncate max-w-xs">
                {getFileName(value)}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => window.open(value, "_blank")}
              className="text-blue-600 hover:text-blue-700"
            >
              View
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={removeFile}
              disabled={disabled}
              className="text-red-600 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
          {error}
        </div>
      )}
    </div>
  );
}
