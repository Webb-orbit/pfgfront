/* eslint-disable react/no-unknown-property */
import { useState } from 'react'
import axios from 'axios'
import plaintohtml from "markdown-to-htm"
import parse from 'html-react-parser';
import "./edit.css"

function App() {
  const [file, setFile] = useState(null);
  const [data, setdata] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('pdfile', file);

    try {
      const response = await axios.post('/api/filecom', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setdata(response.data)
      console.log('File uploaded successfully:', response.data);
    } catch (error) {
      console.log('Error uploading file:', error);
    }
  };

  return (
    <>
    <div className='w-full flex flex-col items-center'>

      <form onSubmit={handleSubmit}>
        <input type="file" name="pdfile" accept='.pdf' onChange={(e)=> setFile(e.target.files[0])} enctype="multipart/form-data" />
        <button type="submit">Upload</button>
      </form>

      <div className=' grid grid-cols-2 w-full gap-1'>
        <div className=' bg-zinc-900 p-2 text-neutral-300 font-sans max-h-[90vh] min-h-10 overflow-y-scroll whitespace-pre-wrap'>{data && data.main}</div>
        <div className=' bg-zinc-900 p-2 text-neutral-300 font-mono max-h-[90vh] min-h-10  overflow-y-scroll whitespace-pre-wrap'>{data && parse(plaintohtml(data.res))}</div>
      </div>
    </div>
    </>
  );
}

export default App;
