"use client";
import { useState, useEffect } from "react";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';

export default function RichTextEditor({ value, onChange, theme, placeholder }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Strike,
      Link,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
      Color,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (html !== value) {
        onChange(html);
      }
    },
    editorProps: {
      attributes: {
        class: 'focus:outline-none',
        'data-placeholder': placeholder || 'Write your message...',
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!isMounted) {
    return (
      <div className="flex-1 bg-transparent border-none outline-none">
        <textarea
          className="w-full h-full bg-transparent focus:outline-none resize-none"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{ 
            color: theme.text.primary,
            border: 'none',
            outline: 'none',
            boxShadow: 'none'
          }}
        />
      </div>
    );
  }

  if (!editor) {
    return null;
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 dark:border-gray-700" style={{ backgroundColor: theme.bg.accent }}>
        {/* Text Formatting */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
              editor.isActive('bold') 
                ? 'bg-blue-500 text-white' 
                : 'hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            style={{ color: editor.isActive('bold') ? '#ffffff' : theme.text.primary }}
            title="Bold"
          >
            B
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
              editor.isActive('italic') 
                ? 'bg-blue-500 text-white' 
                : 'hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            style={{ color: editor.isActive('italic') ? '#ffffff' : theme.text.primary }}
            title="Italic"
          >
            I
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
              editor.isActive('underline') 
                ? 'bg-blue-500 text-white' 
                : 'hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            style={{ color: editor.isActive('underline') ? '#ffffff' : theme.text.primary }}
            title="Underline"
          >
            U
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
              editor.isActive('strike') 
                ? 'bg-blue-500 text-white' 
                : 'hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            style={{ color: editor.isActive('strike') ? '#ffffff' : theme.text.primary }}
            title="Strikethrough"
          >
            S
          </button>
        </div>

        {/* Divider */}
        <div className="w-px h-4 bg-gray-300 dark:bg-gray-600 mx-1"></div>

        {/* Headers */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
              editor.isActive('heading', { level: 1 }) 
                ? 'bg-blue-500 text-white' 
                : 'hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            style={{ color: editor.isActive('heading', { level: 1 }) ? '#ffffff' : theme.text.primary }}
            title="Heading 1"
          >
            H1
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
              editor.isActive('heading', { level: 2 }) 
                ? 'bg-blue-500 text-white' 
                : 'hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            style={{ color: editor.isActive('heading', { level: 2 }) ? '#ffffff' : theme.text.primary }}
            title="Heading 2"
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
              editor.isActive('heading', { level: 3 }) 
                ? 'bg-blue-500 text-white' 
                : 'hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            style={{ color: editor.isActive('heading', { level: 3 }) ? '#ffffff' : theme.text.primary }}
            title="Heading 3"
          >
            H3
          </button>
        </div>

        {/* Divider */}
        <div className="w-px h-4 bg-gray-300 dark:bg-gray-600 mx-1"></div>

        {/* Lists */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
              editor.isActive('bulletList') 
                ? 'bg-blue-500 text-white' 
                : 'hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            style={{ color: editor.isActive('bulletList') ? '#ffffff' : theme.text.primary }}
            title="Bullet List"
          >
            •
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
              editor.isActive('orderedList') 
                ? 'bg-blue-500 text-white' 
                : 'hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            style={{ color: editor.isActive('orderedList') ? '#ffffff' : theme.text.primary }}
            title="Numbered List"
          >
            1.
          </button>
        </div>

        {/* Divider */}
        <div className="w-px h-4 bg-gray-300 dark:bg-gray-600 mx-1"></div>

        {/* Alignment */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
              editor.isActive({ textAlign: 'left' }) 
                ? 'bg-blue-500 text-white' 
                : 'hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            style={{ color: editor.isActive({ textAlign: 'left' }) ? '#ffffff' : theme.text.primary }}
            title="Align Left"
          >
            ←
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
              editor.isActive({ textAlign: 'center' }) 
                ? 'bg-blue-500 text-white' 
                : 'hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            style={{ color: editor.isActive({ textAlign: 'center' }) ? '#ffffff' : theme.text.primary }}
            title="Align Center"
          >
            ↔
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
              editor.isActive({ textAlign: 'right' }) 
                ? 'bg-blue-500 text-white' 
                : 'hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            style={{ color: editor.isActive({ textAlign: 'right' }) ? '#ffffff' : theme.text.primary }}
            title="Align Right"
          >
            →
          </button>
        </div>

        {/* Divider */}
        <div className="w-px h-4 bg-gray-300 dark:bg-gray-600 mx-1"></div>

        {/* Blockquote */}
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
            editor.isActive('blockquote') 
              ? 'bg-blue-500 text-white' 
              : 'hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          style={{ color: editor.isActive('blockquote') ? '#ffffff' : theme.text.primary }}
          title="Blockquote"
        >
          "
        </button>

        {/* Code */}
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
            editor.isActive('code') 
              ? 'bg-blue-500 text-white' 
              : 'hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          style={{ color: editor.isActive('code') ? '#ffffff' : theme.text.primary }}
          title="Code"
        >
          &lt;/&gt;
        </button>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-auto">
        <EditorContent 
          editor={editor} 
          className="h-full p-2"
          style={{ 
            color: theme.text.primary,
            backgroundColor: 'transparent'
          }}
        />
      </div>

      <style jsx global>{`
        .ProseMirror {
          outline: none !important;
          border: none !important;
          background: transparent !important;
          color: ${theme.text.primary} !important;
          min-height: 200px !important;
          padding: 0 !important;
          font-family: inherit !important;
          font-size: inherit !important;
          line-height: inherit !important;
        }
        
        .ProseMirror p.is-editor-empty:first-child::before {
          color: ${theme.text.secondary} !important;
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }
        
        .ProseMirror h1,
        .ProseMirror h2,
        .ProseMirror h3 {
          color: ${theme.text.primary} !important;
          margin: 0.5em 0 !important;
          font-weight: bold !important;
        }
        
        .ProseMirror h1 {
          font-size: 1.5em !important;
        }
        
        .ProseMirror h2 {
          font-size: 1.3em !important;
        }
        
        .ProseMirror h3 {
          font-size: 1.1em !important;
        }
        
        .ProseMirror ul,
        .ProseMirror ol {
          color: ${theme.text.primary} !important;
          margin: 0.5em 0 !important;
          padding-left: 1.5em !important;
        }
        
        .ProseMirror blockquote {
          color: ${theme.text.primary} !important;
          border-left: 3px solid ${theme.text.secondary} !important;
          margin: 0.5em 0 !important;
          padding-left: 1em !important;
          font-style: italic !important;
        }
        
        .ProseMirror code {
          background: ${theme.bg.accent} !important;
          color: ${theme.text.primary} !important;
          padding: 0.2em 0.4em !important;
          border-radius: 3px !important;
          font-family: monospace !important;
          font-size: 0.9em !important;
        }
        
        .ProseMirror a {
          color: #3b82f6 !important;
          text-decoration: underline !important;
        }
        
        .ProseMirror strong {
          font-weight: bold !important;
        }
        
        .ProseMirror em {
          font-style: italic !important;
        }
        
        .ProseMirror s {
          text-decoration: line-through !important;
        }
        
        .ProseMirror u {
          text-decoration: underline !important;
        }
      `}</style>
    </div>
  );
} 