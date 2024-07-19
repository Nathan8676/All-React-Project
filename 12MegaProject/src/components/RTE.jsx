import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import {Controller} from 'react-hook-form'
import { useSelector } from 'react-redux'
function RTE({Name , control , label, defaultValue = ""}) {
const {isDarkMode} = useSelector((state) => state.theme)
  return (
    <div className='w-full'>
        {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
        <Controller
        name={Name? Name : "content"}
        control={control}
        render={({field: {onChange}}) => (
            <Editor 
            tinymceScriptSrc={"/tinymce/tinymce.min.js"}
            licenseKey='gpl'
            initialValue={defaultValue}
            init={{
                height:"500",
                menubar: true,
                plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
                ],
                toolbar: 'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
                content_style:    
                `body {
                  @apply ${isDarkMode ? 'bg-zinc-950 border-black text-white' : 'bg-white text-black'};
                  font-family: Helvetica, Arial, sans-serif;
                  font-size: 14px;
                }`,
                content_css_cors: true
             
            }}
            onEditorChange={onChange}
            
            />
        )}
        />
    </div>
  )
}

export default RTE


// should fix the fetch posts problem and auth error