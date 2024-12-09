import React, { useState, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import { Download } from 'lucide-react';
import { ApiKeyModal } from './components/ApiKeyModal';
import { DropZone } from './components/DropZone';
import { generateMetadata } from './utils/openai';
import { v4 as uuidv4 } from 'uuid';

interface Project {
  id: string;
  name: string;
  editorContent: string;
  commentContent: string;
  generated: boolean; // Indicates if metadata has been generated
}

interface AppProps {
  onGoHome: () => void;
}

function App({ onGoHome }: AppProps) {
  const [projects, setProjects] = useState<Project[]>(() => {
    const stored = localStorage.getItem('erc7730_projects');
    return stored ? JSON.parse(stored) : [];
  });

  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(() => {
    const storedId = localStorage.getItem('erc7730_selectedProjectId');
    return storedId || null;
  });

  const [showApiKeyModal, setShowApiKeyModal] = useState(!localStorage.getItem('openai_api_key'));
  const [loading, setLoading] = useState(false);

  const selectedProject = projects.find((p) => p.id === selectedProjectId) || null;

  const saveProjectsAndSelection = useCallback(
    (updatedProjects: Project[], updatedSelectedProjectId: string | null = selectedProjectId) => {
      setProjects(updatedProjects);
      if (updatedSelectedProjectId !== null) {
        setSelectedProjectId(updatedSelectedProjectId);
      }
      localStorage.setItem('erc7730_projects', JSON.stringify(updatedProjects));
      if (updatedSelectedProjectId) {
        localStorage.setItem('erc7730_selectedProjectId', updatedSelectedProjectId);
      } else {
        localStorage.removeItem('erc7730_selectedProjectId');
      }
    },
    [selectedProjectId]
  );

  const handleApiKeySubmit = useCallback((apiKey: string) => {
    localStorage.setItem('openai_api_key', apiKey);
    setShowApiKeyModal(false);
  }, []);

  // Updated to accept filename
const handleFileDrop = useCallback(
  async (content: string, filename: string) => {
    try {
      const apiKey = localStorage.getItem('openai_api_key');
      if (!apiKey) {
        setShowApiKeyModal(true);
        return;
      }

      setLoading(true);
      const fullResponse = await generateMetadata(apiKey, content);
      setLoading(false);

      const responseStr = typeof fullResponse === 'string' ? fullResponse : JSON.stringify(fullResponse);
      const codeBlockRegex = /```json\s*([\s\S]*?)```/i;
      const match = codeBlockRegex.exec(responseStr);

      let jsonOnly = '';
      let remainingComments = '';

      if (match && match[1]) {
        jsonOnly = match[1].trim();
        remainingComments = responseStr.replace(codeBlockRegex, '').trim();
      } else {
        jsonOnly = responseStr;
        remainingComments = '';
      }

      // Attempt to parse jsonOnly to find $id
      let baseName = 'New Project';
      try {
        const parsed = JSON.parse(jsonOnly);
        if (parsed.context && typeof parsed.context.$id === 'string' && parsed.context.$id.trim() !== '') {
          baseName = parsed.context.$id.trim();
        }
      } catch (e) {
        console.warn('Failed to parse JSON or find $id, using "New Project" as fallback.');
      }

      // If a project with this baseName already exists, append (n)
      let uniqueName = baseName;
      let counter = 2;
      while (projects.some((p) => p.name === uniqueName && p.id !== selectedProjectId)) {
        uniqueName = `${baseName}(${counter})`;
        counter++;
      }

      if (selectedProject) {
        const updatedProject: Project = {
          ...selectedProject,
          name: uniqueName,
          editorContent: jsonOnly,
          commentContent: remainingComments,
          generated: true,
        };
        const updatedProjects = projects.map((p) =>
          p.id === selectedProjectId ? updatedProject : p
        );
        saveProjectsAndSelection(updatedProjects);
      } else {
        const newProject: Project = {
          id: uuidv4(),
          name: uniqueName,
          editorContent: jsonOnly,
          commentContent: remainingComments,
          generated: true,
        };
        saveProjectsAndSelection([...projects, newProject], newProject.id);
      }
    } catch (error) {
      console.error('Error processing file:', error);
      alert('Error generating metadata from the Solidity file.');
      setLoading(false);
    }
  },
  [projects, selectedProject, selectedProjectId, saveProjectsAndSelection]
);



  const handleExport = useCallback(() => {
    if (!selectedProject) return;
    const blob = new Blob([selectedProject.editorContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedProject.name.replace(/\s+/g, '_')}_metadata.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [selectedProject]);

  const handleCreateProject = useCallback(() => {
    const newProject: Project = {
      id: uuidv4(),
      name: 'Untitled Project',
      editorContent: '// Generated metadata will appear here',
      commentContent: '',
      generated: false,
    };
    saveProjectsAndSelection([...projects, newProject], newProject.id);
  }, [projects, saveProjectsAndSelection]);

  const handleDeleteProject = useCallback(() => {
    if (!selectedProjectId) return;
    const updatedProjects = projects.filter((p) => p.id !== selectedProjectId);
    const newSelectedId = updatedProjects.length > 0 ? updatedProjects[0].id : null;
    saveProjectsAndSelection(updatedProjects, newSelectedId);
  }, [projects, selectedProjectId, saveProjectsAndSelection]);

  const handleChangeProjectName = useCallback(
    (newName: string) => {
      if (!selectedProjectId) return;
      const updatedProjects = projects.map((p) =>
        p.id === selectedProjectId ? { ...p, name: newName } : p
      );
      saveProjectsAndSelection(updatedProjects);
    },
    [projects, selectedProjectId, saveProjectsAndSelection]
  );

  const handleSelectProject = useCallback(
    (id: string) => {
      setSelectedProjectId(id);
      localStorage.setItem('erc7730_selectedProjectId', id);
    },
    []
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <ApiKeyModal isOpen={showApiKeyModal} onSubmit={handleApiKeySubmit} />

      <div className="max-w-6xl mx-auto space-y-8">
        <div className="bg-white rounded-lg shadow-md p-8 space-y-4">
          <h1 className="text-3xl font-bold">ERC-7730 Metadata Manager</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={handleCreateProject}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              New Project
            </button>

            {selectedProject && (
              <button
                onClick={handleDeleteProject}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Delete Project
              </button>
            )}

            <button
              onClick={onGoHome}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
            >
              Home Page
            </button>

            <div className="flex-1" />

            <div>
              <label className="mr-2 font-semibold">Project:</label>
              <select
                value={selectedProjectId || ''}
                onChange={(e) => handleSelectProject(e.target.value)}
                className="border rounded px-2 py-1"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
                {projects.length === 0 && <option value="">No Projects</option>}
              </select>
            </div>
          </div>
        </div>

        {selectedProject && (
          <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
            {!selectedProject.generated && !loading && (
              <DropZone onFileDrop={handleFileDrop} />
            )}

            {loading && (
              <div className="text-center text-lg font-semibold">
                Generating metadata, please wait...
              </div>
            )}

            {selectedProject.generated && !loading && (
              <div className="text-center text-green-700 font-semibold">
                Metadata generated! You can edit this JSON before exporting.
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="font-semibold">Project Name:</label>
                <input
                  type="text"
                  value={selectedProject.name}
                  onChange={(e) => handleChangeProjectName(e.target.value)}
                  className="border ml-2 px-2 py-1 rounded"
                />
              </div>

              {selectedProject.generated && (
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Generated Metadata</h2>
                  <button
                    onClick={handleExport}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    <Download className="w-4 h-4" />
                    Export JSON
                  </button>
                </div>
              )}

              {selectedProject.commentContent && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded mb-4">
                  <h3 className="font-semibold mb-2">Additional Notes</h3>
                  <p className="text-sm whitespace-pre-wrap">
                    {selectedProject.commentContent}
                  </p>
                </div>
              )}

              {selectedProject.generated && (
                <p className="text-sm text-gray-600">
                  This JSON is editable. Feel free to make changes before exporting.
                </p>
              )}

              <div className="h-[500px] border rounded">
                <Editor
                  height="100%"
                  defaultLanguage="json"
                  value={selectedProject.editorContent}
                  onChange={(value) => {
                    const newValue = value || '';
                    const updatedProjects = projects.map((p) =>
                      p.id === selectedProjectId ? { ...p, editorContent: newValue } : p
                    );
                    saveProjectsAndSelection(updatedProjects);
                  }}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    wordWrap: 'on'
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {!selectedProject && projects.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <p>No projects yet. Click 'New Project' to start.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
