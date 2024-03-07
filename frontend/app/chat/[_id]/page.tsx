"use client"

import ChatLeft from "@/app/components/ChatLeft";
import ChatNav from "@/app/components/ChatNav";
import ChatRight from "@/app/components/ChatRight";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { IoMdSend } from "react-icons/io";
import { useSelector } from "react-redux";

const User = (props: any) => {

    const currentUser = useSelector((state: any) => state.user)

    const [user, setUser]: any = useState(null)
    const [isLoading, setIsLoading]: any = useState(false)
    const [messages, setMessages]: any = useState([])
    const [toggleMessage, setToggleMessage] = useState(false)

    const inputRef: any = useRef()

    useEffect(() => {
        getUser(props?.params?._id)
        getMessages(props?.params?._id)
    }, [props?.params?._id])

    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, [messages])

    const getUser = (id: string) => {
        axios.get(`/api/user?id=${id}`, { withCredentials: true })
            .then(response => {
                // console.log(response.data.user);
                setUser(response.data.user);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const getMessages = async (id: any) => {
        try {
            setIsLoading(true)
            const resp = await axios.get(`/api/message?id=${id}`, { withCredentials: true })
            setMessages(resp.data.messages)
            setIsLoading(false)
        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    }

    const submitHandler = async (e: any) => {

        e.preventDefault()

        if (inputRef.current.value.trim() === "") {
            return
        }

        try {

            const resp = await axios.post("/api/message",
                {
                    message: inputRef.current.value,
                    to_id: user?._id,
                    from_id: currentUser._id
                },
                { withCredentials: true })

            getMessages(user?._id)
            setToggleMessage(!toggleMessage)
            e.target.reset()


        } catch (error) {
            console.log(error);
            return;

        }

    }

    useEffect(() => {

        // socket logic

    }, [currentUser, user?._id])

    return (
        <div className="w-full sm:w-[600px] m-auto pb-[4rem]">
            <ChatNav firstName={user?.firstName} lastName={user?.lastName} isMe={currentUser?._id === user?._id} _id={user?._id} />
            <div className="flex flex-col-reverse gap-4 p-4 bg-[#fefefe] text-slate-800">
                {
                    isLoading && <div className="w-full h-full flex justify-center items-center mt-[12rem]"><span className="load"></span></div>
                }
                {
                    messages.length < 1 ? null :
                        messages.map((message: any, index: number) => {
                            return (
                                <React.Fragment key={index}>
                                    {currentUser?._id === message.from_id ?
                                        <ChatRight message={message?.message} time={message?.createdOn} />
                                        :
                                        <ChatLeft message={message?.message} time={message?.createdOn} />
                                    }
                                </React.Fragment>
                            );
                        })
                }
            </div>
            <>
                <form onSubmit={submitHandler} className='w-full sm:w-[600px] fixed bg-white border-t border-l border-r bottom-0 z-50 p-2 flex items-center gap-2'>
                    <input ref={inputRef} type="text" placeholder='Type something...'
                        className='w-full p-2 rounded-md bg-gray-100 text-sm'
                    />
                    <button type="submit"><IoMdSend className='w-[1.5rem] h-[1.5rem] cursor-pointer' /></button>
                </form>
            </>
        </div>
    )
}

export default User