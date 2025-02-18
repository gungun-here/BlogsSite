import { useMemo, useRef, useState } from "react";
import JoditEditor from "jodit-react";

function TextEditor({ placeholder, width, height = "633.5px", value, onChangeHandler }) {
  const editorRef = useRef(null);

  const config = useMemo(
    () => ({
      placeholder: placeholder,
      speechRecognize: false,
      autofocus: true,
      spellcheck: true,
      width: width,
      height: height,
      toolbarSticky: false,
      askBeforePasteHTML: false, // Disables "Keep as HTML?" prompt
      askBeforePasteFromWord: false, // Disables prompt when pasting from Word
      defaultActionOnPaste: "insert_clear_html" 
    }),
    [placeholder, width]
  );

  return (
     <JoditEditor
        ref={editorRef}
        value={value}
        config={config}
        onChange={(newContent) => onChangeHandler(newContent)}
      />
    
  );
}

export default TextEditor;