/*used in PostForm--> main question is how do we get the reference of this editor in our PostForm. We 
could also do this by using forwardRef but instead we'll use 'Controller'. */
import React from 'react'
import {Editor } from '@tinymce/tinymce-react';
import {Controller } from 'react-hook-form';


export default function RTE({name, control, label, defaultValue =""}) {
return (
    <div className='w-full'> 
    {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

    <Controller /*'Controller'--> wrapper component and it  is the one that actually passes the 
    control to the parent component.*/
    name={name || "content"}
    control={control} //Parent element will give this control
    render={({field: {onChange}}) => (  /*Object destructuring --> It extracts the onChange function from
    the field object.*/
        <Editor
        apiKey='20djbzvandcuef9tn5s5r1gihxnkvmw8epvfajxygwy1iczq'
        initialValue={defaultValue}
        init={{
            initialValue: defaultValue,
            height: 500,
            menubar: true,
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
        onEditorChange={onChange}
        /*When the content of the editor changes, onChange is called, updating the form state
                managed by react-hook-form.*/
        />
    )}
    />

    </div>
)
}

/*Why CONTROLLER instead of forwardRef?
While it's technically possible to use forwardRef to pass refs to custom input 
components in react-hook-form, using Controller offers additional benefits in terms 
of form state management, validation integration, performance optimization, and overall 
consistency with the library's API. Therefore, it's often recommended to use Controller 
when working with react-hook-form for more complex forms.
*/

/*Difference between control and Controller? 
In react-hook-form, control is an object that manages the form state and provides methods 
to interact with it. When you pass control to a child component, that component gains 
access to the form's state and validation rules.

Controller is a wrapper component provided by react-hook-form to integrate custom input components 
with the form state. It handles tasks such as registering the input field with react-hook-form, m
anaging its value, and integrating any validation rules. Inside the RTE component, you use Controller 
to wrap the RTE editor, allowing it to interact with the form state managed by react-hook-form.
*/

/*Why use Controller instead of register
While both Controller and register serve similar purposes, Controller offers additional convenience 
and abstraction. It's useful when you have complex custom input components or when you want tighter 
integration with react-hook-form.
*/