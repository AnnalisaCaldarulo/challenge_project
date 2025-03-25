import React, { useImperativeHandle, useRef } from 'react'

function ResultModal({ result, targetTime, ref }) {

    const dialog = useRef()

    useImperativeHandle(ref, () => {
        return {
            open() { 
                dialog.current.showModal();
            }
        }
    });
    return (
        <dialog ref={dialog} className='result-modal' >
            <h2> You {result} </h2>
            <p>The target time was  <span className='font-bold'>{targetTime} seconds.</span></p>
            <p>You stopped teh timer with  <span className='font-bold'>X seconds left.</span></p>
            <form method="dialog">
                <button>close</button>
            </form>
        </dialog>
    )
}

export default ResultModal