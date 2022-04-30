import React from 'react';
import {useDropzone} from 'react-dropzone';

const DropFile = (props) => {

  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({noClick: true});
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p>Drop file here...</p>
      </div>
      <aside>
        <ul>{files}</ul>
      </aside>
    </section>
  )
}

export default DropFile