import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

function FileDrop() {
  const [setFiles] = useState([]);

  const sendFileToServer = async (file) => {
    const data = new FormData();
    data.append('file', file);

    try {
      const response = await fetch('http://localhost:8080', {
        method: 'POST',
        body: data,
      });
      console.log(response.json())
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));

    acceptedFiles.forEach(file => sendFileToServer(file));
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop
  });

  return (
    <div
      style={{
        width: '200px',
        height: '200px',
        border: '1px solid black'
      }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <p>Drag & drop some files here, or click to select files</p>
    </div>
  );
}

export default FileDrop;
