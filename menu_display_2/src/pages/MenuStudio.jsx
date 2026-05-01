import { useEffect, useMemo, useRef, useState } from 'react';
import {
  clearMenuStudioResult,
  loadStoredMenuStudioResult,
  saveMenuStudioResult,
} from '../lib/menuStudioStorage';
import { formatBytes, getClientFileError, apiBase, menuExampleImageBaseUrl } from '../lib/menuStudioUtils';
import MenuExamplesGallery from '../components/MenuStudio/MenuExamplesGallery';
import MenuUploadForm from '../components/MenuStudio/MenuUploadForm';
import MenuStudioResult from '../components/MenuStudio/MenuStudioResult';

function MenuStudio() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [extraction, setExtraction] = useState(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');
  const [isRestored, setIsRestored] = useState(false);
  const [menuExamples, setMenuExamples] = useState([]);
  const inputRef = useRef(null);
  const detailsRef = useRef(null);

  useEffect(() => {
    const stored = loadStoredMenuStudioResult();
    if (stored) {
      setExtraction(stored);
      setIsRestored(true);
    }
  }, []);

  useEffect(() => {
    fetch('/menu_examples.json')
      .then((response) => response.json())
      .then((data) => {
        const entries = Object.entries(data).map(([filename, info]) => ({
          filename,
          title: info.title,
          description: info.description,
          imageUrl: `${menuExampleImageBaseUrl}${filename}`,
        }));
        setMenuExamples(entries);
      })
      .catch(() => setMenuExamples([]));
  }, []);

  const jsonOutput = useMemo(
    () => (extraction ? JSON.stringify(extraction, null, 2) : ''),
    [extraction],
  );
  const hasExtraction = Boolean(extraction?.menu);

  const fileStatus = selectedFile
    ? `${selectedFile.name} · ${formatBytes(selectedFile.size)}`
    : 'No file selected';

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedFile(file);
    setError(file ? getClientFileError(file) : '');
    setCopyStatus('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const clientError = getClientFileError(selectedFile);

    if (clientError) {
      setError(clientError);
      return;
    }

    setError('');
    setCopyStatus('');
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.set('menuImage', selectedFile);

      const response = await fetch(`${apiBase}/menu-extractions`, {
        method: 'POST',
        body: formData,
      });
      const body = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(body?.error?.message || 'Menu extraction failed.');
      }

      setExtraction(body);
      setIsRestored(false);
      saveMenuStudioResult(body);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Menu extraction failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setExtraction(null);
    setError('');
    setCopyStatus('');
    setIsRestored(false);
    clearMenuStudioResult();
    if (inputRef.current) inputRef.current.value = '';
    setSelectedFile(null);
  };

  const handleCopy = async () => {
    if (!jsonOutput) return;

    try {
      await navigator.clipboard.writeText(jsonOutput);
      setCopyStatus('JSON copied');
    } catch {
      setCopyStatus('Copy unavailable');
    }
  };

  const handleLoadExample = async (filename) => {
    try {
      const jsonFilename = filename.replace(/\.(webp|png|jpe?g)$/i, '.json');
      const response = await fetch(`/menu_examples_json/${jsonFilename}`);
      if (!response.ok) throw new Error('Example not found');
      const data = await response.json();
      setExtraction(data);
      setIsRestored(false);
      saveMenuStudioResult(data);
      
      setSelectedFile(null);
      setError('');
      setCopyStatus('');
      if (inputRef.current) inputRef.current.value = '';
      
      if (detailsRef.current) {
        detailsRef.current.removeAttribute('open');
      }
      
      window.scrollTo({ top: 400, behavior: 'smooth' });
    } catch {
      setError('Failed to load example menu.');
    }
  };

  return (
    <div className="page-shell">
      <header className={`mx-auto max-w-7xl ${hasExtraction ? 'mb-8' : 'mb-10'}`}>
        <div className="strong-panel p-7 sm:p-10 lg:p-12">
          <p className="page-kicker">Menu studio</p>
          <h1 className="page-title max-w-4xl">Turn a menu photo into a refined text menu.</h1>
          <p className="page-lede mx-0 max-w-3xl">
            Upload a photographed menu, extract the visible details with OpenAI, and keep the result as clean structured JSON.
          </p>
        </div>
      </header>

      <MenuExamplesGallery
        menuExamples={menuExamples}
        handleLoadExample={handleLoadExample}
        detailsRef={detailsRef}
      />

      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <MenuUploadForm
          handleSubmit={handleSubmit}
          handleFileChange={handleFileChange}
          handleClear={handleClear}
          inputRef={inputRef}
          fileStatus={fileStatus}
          error={error}
          isRestored={isRestored}
          isSubmitting={isSubmitting}
        />

        <MenuStudioResult
          extraction={extraction}
          jsonOutput={jsonOutput}
          copyStatus={copyStatus}
          handleCopy={handleCopy}
        />
      </div>
    </div>
  );
}

export default MenuStudio;
