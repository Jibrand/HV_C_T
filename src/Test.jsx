import React,{useRef,useState} from 'react'
import JoditEditor from 'jodit-react';

const Test = () => {
  const editor = useRef(null);
  const [content, setContent] = useState('');
  return (
    <div className='bg-white'>
    <p >dasdasd</p><JoditEditor
      ref={editor}
      value={content}
      onChange={newContent => { setContent(newContent) }}
    />
    <p>{content}</p></div>
  )
}

export default Test