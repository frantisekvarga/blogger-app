
import React from "react";
import MDEditor from "@uiw/react-md-editor";

interface Props {
  content: string;
  setContent: (value: string) => void;
  onChange?: () => void;
}

const MarkdownEditor: React.FC<Props> = ({ content, setContent, onChange }) => {
  return (
    <div className="markdown-editor">
      <div data-color-mode="light">
        <MDEditor
          value={content}
          onChange={(val) => {
            setContent( val || "");
            if (onChange) onChange(); 
          }}
          height={400}
        />
      </div>
    </div>
  );
};

export default MarkdownEditor;