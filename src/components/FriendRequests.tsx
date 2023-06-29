'use client'

interface params {
    sessionId: string
    requestList: {
        senderEmail: string
        senderId: string
    }[]
}

const FriendRequests = ({requestList, sessionId}: params) => {

    return (<>
        {requestList.length === 0 
        ?   <div className='flex items-center w-full h-fit justify-center pt-2'>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className='w-24 h-24'>
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
                </svg>
                <h1 className='font-normal text-5xl'>No request yet</h1>
            </div>
        :   <div className="text-white h-fit w-full grid grid-cols-2 pt-2">
                {requestList.map((request) => <>
                    <div className="text-white h-fit w-full bg-[#202020] rounded-md border border-gray-700 flex p-2 items-center justify-between gap-1" key={request.senderId}>
                        <h1 className='font-bold'>{request.senderEmail}</h1>
                        <form className='flex gap-3'>
                            <button>
                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className='w-8 h-8 hover:fill-green-600 transition-colors duration-200 ease-linear'>
                                    <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                    <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                                </svg>
                            </button>
                            <button>
                                <svg width="16" height="16" fill="currentColor" className="h-8 w-8 hover:fill-red-600 transition-colors duration-200 ease-linear" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M11 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"/>
                                    <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                </svg>
                            </button>
                        </form>
                    </div>
                </>)}
            </div>
        }
    </>)
}

export default FriendRequests