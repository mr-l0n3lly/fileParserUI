import React, {useEffect, useMemo, useState} from 'react'

import Uploady, {UPLOADER_EVENTS, useUploady} from '@rpldy/uploady'
import UploadButton from '@rpldy/upload-button'
import InfiniteScroll from 'react-infinite-scroll-component';
import { asUploadButton } from "@rpldy/upload-button";
import tenor from '../../assets/tenor.gif';

import {ENV} from '../../env'

import UploadProgress from './UploadProgress'

const DivUploadButton = asUploadButton((props) => {
    return <div {...props} style={{ cursor: "pointer" }}>
        Încarcă
    </div>
});

const FileUpload = (props) => {
    const [response, setResponse] = useState([])
    const [loading, setLoading] = useState(false);

    const [count, setCount] = useState({
        prev: 0,
        next: 10
    })
    
    const [hasMore, setHasMore] = useState(true);

    const [current, setCurrent] = useState(response.slice(count.prev, count.next))
    const getMoreData = () => {
        if (current.length === response.length) {
            setHasMore(false);
            return;
        }

        setTimeout(() => {
            setCurrent(current.concat(response.slice(count.prev + 10, count.next + 10)))
        }, 1)

        setCount((prevState) => ({ prev: prevState.prev + 10, next: prevState.next + 10 }))
    }

    const listeners = useMemo(() => ({
        [UPLOADER_EVENTS.ITEM_FINISH]: (item) => {
            setResponse(item.uploadResponse.data.data)
        },
        [UPLOADER_EVENTS.ITEM_START]: (item) => {
            setLoading(true);
            setResponse([]);
        },
    }),[])

    useEffect(() => {
        setCurrent(response.slice(count.prev, count.next));
    }, [response])

    return (
        <Uploady
            listeners={listeners}
            clearPendingOnAdd
            destination={{
                url: `http://${ENV.API_HOST}/api/v1/upload/file`,
                headers: {
                    Authorization: props.token,
                },
            }}
            accept=".xlsx"
        >
            <div className="bg-white rounded-lg px-4 py-10 sm:px-12 lg:px-24 mt-3">
                <strong className="text-lg md:text-xl font-bold">Încarcă fișier</strong>
                <label
                    className="block relative mt-8 border border-dashed border-gray-400 rounded-lg relative overflow-hidden hover:border-gray-700 transition duration-300 ease-in-out">
                    <div className="p-5 flex flex-col items-center justify-center">
                        <DivUploadButton className="rounded-md bg-gray-300 py-3 px-8 border-2 border-transparent focus:border-gray-400 focus:bg-transparent transition duration-300 ease-in-out text-lg font-bold text-gray-600 mt-5"  />
                    </div>
                </label>
            </div>

            <div className="bg-white rounded-lg px-4 py-10 sm:px-12 lg:px-24 mt-8 flex flex-col items-center justify-center">
                <div className="rounded-full bg-gray-200 overflow-hidden mt-4 mb-4">
                    <UploadProgress className="h-3 bg-green-400 rounded-full"/>
                </div>
                { loading && !response.length && <img src={tenor} />}
                {
                    response.length ? (
                        <>
                            {/*<div className={`"rounded-full rounded ${response[0] === 'Success' ? 'bg-green-500' : 'bg-red-500'}  h-24 w-24 p-10 flex flex-col items-center justify-center color-white"`}>{ response[0] === 'Success' ? `Success!` : `Eroare!`}</div>*/}
                                <div className={`w-20 h-20 mx-auto p-2 ${response[0] === 'Success' ? 'bg-green-400' : 'bg-red-400'} text-white rounded-full mt-8 mb-6 flex align-middle`}>
                                    {
                                        response[0] === 'Success' ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                      d="M5 13l4 4L19 7" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        )
                                    }

                                </div>

                            {
                                response[0] === 'Success' ? (
                                    <h1>Datele au fost incarcate cu success</h1>
                                ): (
                                    <h1>Eroare la incarcare!</h1>
                                )
                            }

                            <ul className="mt-6 list-disc">
                            <InfiniteScroll
                                dataLength={current.length}
                                next={getMoreData}
                                hasMore={hasMore}
                                loader={<h4>...</h4>}
                            >
                                <div>
                                    {current && current.map(((item, index) => (
                                    <div key={index} className="post">
                                        <p>{item}</p>
                                    </div>
                                    )))
                                    }
                                </div>
                            </InfiniteScroll>
                            </ul>
                        </>
                    ) : null
                }

            </div>

        </Uploady>
    )
}

export default FileUpload
