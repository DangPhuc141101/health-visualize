import React from 'react';
import {useDropzone} from 'react-dropzone';

const DropFile = (props) => {

  const {acceptedFiles, getRootProps, getInputProps} = useDropzone(
    {noClick: true,
    accept: {
      	'string': []
    }
    });
  // console.log(useDropzone())
  console.log(acceptedFiles)
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      {/* {console.log(file.path))} */}
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