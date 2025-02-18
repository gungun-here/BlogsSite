import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function BlogEditor({content,handleQuillContent}) {

    return (
        <div>
            <ReactQuill 
                value={content} 
                onChange={(value)=> handleQuillContent(value)} 
                modules={{
                    toolbar: [
                        [{ header: [1, 2, false] }],
                        ["bold", "italic", "underline"],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["image"], // Allow image upload
                    ],
                }}
            />
        </div>
    );
}
