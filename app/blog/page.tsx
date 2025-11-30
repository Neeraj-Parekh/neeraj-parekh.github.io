'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Watermark from '@/components/Watermark';
import ThemeToggle from '@/components/ThemeToggle';
import blogsData from '@/data/blogs.json';

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  platform: string;
  url: string;
  embedUrl?: string;
  date: string;
  readTime: string;
  tags: string[];
  image?: string;
}

function BlogCard({ blog, onPreview }: { blog: Blog; onPreview: () => void }) {
  const platformColors: Record<string, string> = {
    'Medium': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'Dev.to': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    'Hashnode': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'LinkedIn': 'bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200',
    'Personal': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
  };

  return (
    <article className="blog-card group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Image */}
      {blog.image && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${platformColors[blog.platform] || platformColors['Personal']}`}>
            {blog.platform}
          </span>
        </div>
      )}
      
      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
          <time dateTime={blog.date}>
            {new Date(blog.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </time>
          <span>•</span>
          <span>{blog.readTime}</span>
        </div>
        
        <h3 className="text-xl font-bold font-serif mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {blog.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {blog.excerpt}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {blog.tags.map((tag) => (
            <span 
              key={tag} 
              className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>
        
        {/* Actions */}
        <div className="flex gap-3">
          <a
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors"
          >
            Read on {blog.platform} →
          </a>
          {blog.embedUrl && (
            <button
              onClick={onPreview}
              className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Preview
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function BlogPreviewModal({ blog, onClose }: { blog: Blog; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold font-serif">{blog.title}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          {blog.embedUrl ? (
            <iframe
              src={blog.embedUrl}
              className="w-full h-[600px] border-0 rounded-lg"
              title={blog.title}
              loading="lazy"
            />
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h4 className="text-xl font-bold mb-2">Full Article Preview</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                {blog.excerpt}
              </p>
              <a
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Read Full Article on {blog.platform}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BlogPage() {
  const blogs = blogsData as Blog[];
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [filter, setFilter] = useState<string>('all');

  // Get unique platforms
  const platforms = ['all', ...Array.from(new Set(blogs.map(b => b.platform)))];

  // Filter blogs
  const filteredBlogs = filter === 'all' 
    ? blogs 
    : blogs.filter(b => b.platform === filter);

  return (
    <div className="min-h-screen">
      <Watermark />

      {/* Header */}
      <div id="header-name-ldm" className="flex w-full items-center justify-between pt-4">
        <h1 id="name" className="animate-name text-4xl md:text-6xl font-serif font-bold">
          Neeraj Parekh
        </h1>
        <ThemeToggle />
      </div>

      {/* Slogan */}
      <p id="slogan" className="animate-slogan mt-2 font-sans">
        ENTC engineer
      </p>

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="mt-8">
        {/* Page Header */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4">
            Blog & Articles
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            Thoughts, tutorials, and insights on technology, programming, and engineering. 
            Read the full articles on their respective platforms.
          </p>
        </div>

        {/* Platform Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {platforms.map((platform) => (
            <button
              key={platform}
              onClick={() => setFilter(platform)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === platform
                  ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {platform === 'all' ? 'All Platforms' : platform}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              onPreview={() => setSelectedBlog(blog)}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredBlogs.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-bold mb-2">No blogs found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              No articles available for the selected platform.
            </p>
          </div>
        )}

        {/* Subscribe Section */}
        <section className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
          <div className="max-w-2xl">
            <h3 className="text-2xl md:text-3xl font-bold font-serif mb-4">
              Stay Updated
            </h3>
            <p className="text-blue-100 mb-6">
              Follow me on these platforms to get notified when I publish new articles and tutorials.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://medium.com/@neerajparekh"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Follow on Medium
              </a>
              <a
                href="https://dev.to/neerajparekh"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white/20 text-white rounded-lg font-medium hover:bg-white/30 transition-colors border border-white/30"
              >
                Follow on Dev.to
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Preview Modal */}
      {selectedBlog && (
        <BlogPreviewModal
          blog={selectedBlog}
          onClose={() => setSelectedBlog(null)}
        />
      )}
    </div>
  );
}
