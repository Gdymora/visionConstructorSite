import React, { useState } from 'react';

interface JsonUploaderProps {
  onDataLoaded: (data: any) => void;
}

const JsonUploader: React.FC<JsonUploaderProps> = ({ onDataLoaded }) => {
  const [jsonContent, setJsonContent] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.json')) {
      setError('Будь ласка, виберіть JSON файл');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      try {
        if (typeof e.target?.result === 'string') {
          const content = JSON.parse(e.target.result);
          setJsonContent(content);
          onDataLoaded(content);
          setError('');
        }
      } catch (err) {
        setError('Помилка парсингу JSON файлу');
        console.error('Помилка парсингу JSON:', err);
      }
    };

    reader.onerror = (error) => {
      setError('Помилка читання файлу');
      console.error('Помилка читання файлу:', error);
    };

    reader.readAsText(file);
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Завантажити JSON файл
        </label>
        <input
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-500 file:text-white
            hover:file:bg-blue-600"
        />
      </div>

      {error && (
        <div className="text-red-500 text-sm mb-4">
          {error}
        </div>
      )}

      {jsonContent && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Вміст файлу:
          </h3>
          <pre className="bg-gray-50 p-4 rounded-md overflow-auto max-h-60 text-sm">
            {JSON.stringify(jsonContent, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default JsonUploader;