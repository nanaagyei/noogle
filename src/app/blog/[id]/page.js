"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "../../../contexts/ThemeContext";
import blog from "../../../data/blog.json";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function BlogPost() {
  const { theme, isDark } = useTheme();
  const params = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundPost = blog.find(p => p.id === params.id);
    setPost(foundPost);
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-lg mb-4">Blog post not found</div>
        <Link 
          href="/search?q=blog"
          className="px-4 py-2 rounded-md"
          style={{ 
            backgroundColor: theme.bg.accent,
            color: theme.text.primary
          }}
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  const renderContent = (content) => {
    return content.map((item, index) => {
      switch (item.type) {
        case "paragraph":
          return (
            <p key={index} className="mb-4 leading-relaxed">
              {item.text}
            </p>
          );
        case "heading":
          return (
            <h2 key={index} className="text-2xl font-semibold mb-4 mt-8" style={{ color: theme.text.primary }}>
              {item.text}
            </h2>
          );
        case "image":
          return (
            <div key={index} className="my-8">
              <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                />
              </div>
              {item.caption && (
                <p className="text-sm text-center mt-2 opacity-75" style={{ color: theme.text.muted }}>
                  {item.caption}
                </p>
              )}
            </div>
          );
        case "code":
          return (
            <div key={index} className="my-6">
              <div 
                className="rounded-lg overflow-hidden shadow-lg"
                style={{ 
                  backgroundColor: isDark ? '#282c34' : '#fafafa',
                  border: `1px solid ${isDark ? '#3e4451' : '#e1e5e9'}`
                }}
              >
                {/* Code Editor Header */}
                <div 
                  className="flex items-center justify-between px-4 py-2 border-b"
                  style={{ 
                    borderColor: isDark ? '#3e4451' : '#e1e5e9',
                    backgroundColor: isDark ? '#21252b' : '#f5f5f5'
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ff5f56' }}></div>
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ffbd2e' }}></div>
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#27ca3f' }}></div>
                    </div>
                    <span 
                      className="text-xs font-medium ml-2"
                      style={{ 
                        color: isDark ? '#abb2bf' : '#5a5a5a'
                      }}
                    >
                      {item.language}
                    </span>
                  </div>
                </div>
                
                {/* Code Content */}
                <SyntaxHighlighter
                  language={item.language}
                  style={isDark ? oneDark : oneLight}
                  customStyle={{
                    margin: 0,
                    padding: '1rem',
                    background: 'transparent',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    fontFamily: '"SF Mono", Monaco, Inconsolata, "Roboto Mono", "Source Code Pro", Menlo, Consolas, "DejaVu Sans Mono", monospace',
                  }}
                  showLineNumbers={true}
                  wrapLines={true}
                  lineNumberStyle={{
                    color: isDark ? '#636d83' : '#999',
                    fontSize: '12px',
                    paddingRight: '1rem',
                    minWidth: '2.5rem',
                  }}
                >
                  {item.code}
                </SyntaxHighlighter>
              </div>
            </div>
          );
        case "list":
          return (
            <ul key={index} className="list-disc list-inside mb-4 space-y-2">
              {item.items.map((listItem, listIndex) => (
                <li key={listIndex} className="leading-relaxed">
                  {listItem}
                </li>
              ))}
            </ul>
          );
        default:
          return null;
      }
    });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.bg.primary }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: theme.border.primary }}>
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link 
            href="/search?q=blog"
            className="inline-flex items-center gap-x-2 mb-6 hover:opacity-70 transition-opacity"
            style={{ color: theme.text.secondary }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Blog
          </Link>
          
          <div className="mb-6">
            <div className="flex items-center gap-x-2 mb-2">
              <span className="text-sm" style={{ color: theme.text.muted }}>
                {post.timeline}
              </span>
              <span className="text-sm" style={{ color: theme.text.muted }}>•</span>
              <span className="text-sm" style={{ color: theme.text.muted }}>
                {post.readTime}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: theme.text.primary }}>
              {post.title}
            </h1>
            <p className="text-lg mb-4" style={{ color: theme.text.secondary }}>
              {post.excerpt}
            </p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="text-sm px-3 py-1 rounded-full"
                  style={{ 
                    backgroundColor: theme.bg.tertiary,
                    color: theme.text.secondary
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <article className="prose prose-lg max-w-none" style={{ color: theme.text.primary }}>
          {renderContent(post.content)}
        </article>
      </div>

      {/* Footer */}
      <div className="border-t mt-12" style={{ borderColor: theme.border.primary }}>
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link 
              href="/search?q=blog"
              className="px-4 py-2 rounded-md hover:opacity-70 transition-opacity"
              style={{ 
                backgroundColor: theme.bg.accent,
                color: theme.text.primary
              }}
            >
              Back to Blog
            </Link>
            <div className="text-sm" style={{ color: theme.text.muted }}>
              Thanks for reading!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 