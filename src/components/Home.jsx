import React from 'react'
import { useState, useEffect } from 'react';
import '../styles/home.css'
import { db } from '../firebase.config';
import {
    collection,
    onSnapshot,
    query,
    orderBy,
} from "firebase/firestore";

const Home = () => {

    const [blogs, setBlogs] = useState([]);

    const blogsCollectionRef = collection(db, "blogs");
    const sortRef = query(blogsCollectionRef, orderBy('createdAt'));
    useEffect(() => {
        onSnapshot(sortRef, (snapshot) => {
            setBlogs(
                snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                })
            );
        });
    }, []);

    return (
        <>
            <div className="card-setter">
                {
                    blogs.map((blog) => {
                        return (
                            <>
                                <div className='cards flexy'>
                                    <div className="card shadow-box-hig custom-card bg-base-100 shadow-xl">
                                        <figure>
                                        <img src={blog.blogImage} className="image-fixed-height" alt="blog image" />
                                        </figure>
                                        <div className="card-body">
                                            <h2 className="card-title">
                                                Shoes!
                                                <div className="badge badge-secondary">NEW</div>
                                            </h2>
                                            <p>If a dog chews shoes whose shoes does he choose?</p>
                                            <div className="card-actions justify-end">
                                                <button className="badge p-4 badge-primary">Open Blog</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Home