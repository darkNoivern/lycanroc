import React, { useState, useEffect } from 'react'
import '../styles/createblog.css'
import { Input, Textarea, Card, Button } from 'react-daisyui'

import { db, storage } from '../firebase.config'
import { doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import {
    collection,
    addDoc,
    serverTimestamp,
} from "firebase/firestore";

const Createblog = () => {

    const defaultUrl = "https://images.unsplash.com/photo-1557933106-fcc80f11b3c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMDg4MDd8MHwxfHNlYXJjaHw0fHx3YWxsYXBlcnxlbnwwfHx8fDE2NjY5MDkwNTQ&ixlib=rb-4.0.3&q=80&w=1080";
    const [url, setUrl] = useState(defaultUrl);

    const [form, setForm] = useState({
        blogTitle: "",
        blogDescription: "",
        blogImage: defaultUrl,
    });

    //  MAKING AND ADDING A BLOG
    const blogsCollectionRef = collection(db, "blogs");

    const submitBlog = () => {
        
        addDoc(blogsCollectionRef, {
            blogTitle: form.blogTitle, 
            blogDescription: form.blogDescription,
            blogImage: url,
            createdAt: serverTimestamp()
        });
        
        setForm({
            blogTitle: "",
            blogDescription: "",
            blogImage: defaultUrl,
        })
        document.querySelector('.file-input').value = null;
    }

    //  UPLOADING A IMAGE 
    const handleFireBaseUpload = (e) => {

        const imageAsFile = e.target[0].files[0]
        e.preventDefault()

        console.log('start of upload')
        // async magic goes here...
        if (imageAsFile === '') {
            console.error(`not an image, the image file is a ${typeof (imageAsFile)}`)
        }

        const storageRef = ref(storage, `/images/${imageAsFile.name}`)
        const uploadTask = uploadBytesResumable(storageRef, imageAsFile);

        uploadTask.on(
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((imageAsUrl) => {
                        setUrl(imageAsUrl);
                        setForm({ ...form, blogImage: imageAsUrl });
                })
            }
        );
    }

    useEffect(()=>{
        if(url!==defaultUrl){
            submitBlog();
        }
    },[url])

    return (
        <>
            <div className="pad-lr">
                <Card className='rem-border'>
                    <Card.Image
                        className='image-fixed-height'
                        src={url}
                        alt="Shoes"
                    />
                </Card>
            </div>
            <div className="flex w-full mouse400 component-preview p-4 items-center justify-center gap-2 font-sans">
                <form className="form-control w-full max-w-xs" onSubmit={handleFireBaseUpload}>
                    <label className="label">
                        <span className="label-text">Blog Image</span>
                    </label>
                    <Input
                        className='file-input'
                        type={`file`} />
                    <label className="label">
                        <span className="label-text">Blog Title</span>
                    </label>
                    <Input
                        value={form.blogTitle}
                        onChange={(event) => {
                            setForm({ ...form, blogTitle: event.target.value });
                        }} />
                    <label className="label" style={{ marginTop: `1rem` }}>
                        <span className="label-text">Write your blog here</span>
                    </label>
                    <Textarea
                        value={form.blogDescription}
                        onChange={(event) => {
                            setForm({ ...form, blogDescription: event.target.value });
                        }} />
                    <Button
                        className='submit-btn'
                        color="success">
                        Submit
                    </Button>
                </form>
            </div>
        </>
    )
}

export default Createblog