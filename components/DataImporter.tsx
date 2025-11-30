'use client';

import { useState, useRef } from 'react';
import { importFromFile, generateSkillsTemplate, generateProjectsTemplate, generateLinksTemplate } from '@/lib/dataImporter';
import type { ImportedData } from '@/types';

interface DataImporterProps {
  onImport: (data: ImportedData) => void;
}

export default function DataImporter({ onImport }: DataImporterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImporting(true);
    setError(null);

    try {
      const data = await importFromFile(file);
      onImport(data);
      setIsOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to import file');
    } finally {
      setImporting(false);
    }
  };

  const downloadTemplate = (type: 'skills' | 'projects' | 'links') => {
    let content: string;
    let filename: string;

    switch (type) {
      case 'skills':
        content = generateSkillsTemplate();
        filename = 'skills_template.csv';
        break;
      case 'projects':
        content = generateProjectsTemplate();
        filename = 'projects_template.csv';
        break;
      case 'links':
        content = generateLinksTemplate();
        filename = 'links_template.csv';
        break;
    }

    const blob = new Blob([content], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-accent text-white px-4 py-2 rounded-lg shadow-lg hover:bg-text-hover transition-colors z-50"
      >
        Import Data
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-dark-bg rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <h2 className="text-xl font-bold mb-4">Import Data</h2>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            Import your data from JSON, CSV, or Excel files.
          </p>
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,.csv,.xlsx,.xls"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={importing}
            className="w-full bg-accent text-white py-2 rounded-lg hover:bg-text-hover transition-colors disabled:opacity-50"
          >
            {importing ? 'Importing...' : 'Select File'}
          </button>
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Download Templates:</p>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => downloadTemplate('skills')}
              className="text-sm px-3 py-1 border rounded hover:bg-light-accent transition-colors"
            >
              Skills CSV
            </button>
            <button
              onClick={() => downloadTemplate('projects')}
              className="text-sm px-3 py-1 border rounded hover:bg-light-accent transition-colors"
            >
              Projects CSV
            </button>
            <button
              onClick={() => downloadTemplate('links')}
              className="text-sm px-3 py-1 border rounded hover:bg-light-accent transition-colors"
            >
              Links CSV
            </button>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(false)}
          className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
