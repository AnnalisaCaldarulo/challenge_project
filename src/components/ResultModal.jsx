import React, { useImperativeHandle, useRef } from 'react'
import { createPortal } from 'react-dom';
function ResultModal({ targetTime, ref, timeRemaining, onReset }) {

    const formattedRemainingTime = (timeRemaining / 1000).toFixed(2)
    // lo scopo è arrivare più vicino possibile a 0
    const score = Math.round((1 - timeRemaining / (targetTime * 1000)) * 100)
    // const score = (formattedRemainingTime/targetTime) * 100
    const userLost = timeRemaining <= 0;
    const dialog = useRef()

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        }
    });
    return createPortal(
        <dialog ref={dialog} className='result-modal' onClose={onReset} >
            {userLost ? <h2> You lost</h2> : <h2>Your Score: {score}</h2>}
            <p>The target time was  <span className='font-bold'>{targetTime} second{targetTime > 1 ? 's' : ''}.</span></p>
            <p>You stopped the timer with  <span className='font-bold'>{formattedRemainingTime} second{formattedRemainingTime > 1 ? 's' : ''} left.</span></p>
            <form method="dialog" onSubmit={onReset}>
                <button >close</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    )
}

export default ResultModal