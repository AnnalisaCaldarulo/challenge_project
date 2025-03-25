import React, { useState, useRef } from 'react'
import ResultModal from './ResultModal';

function TimerChallenge({ title, targetTime }) {

    const [timerStarted, setTimerStarted] = useState(false);
    const [timerExpired, setTimerExpired] = useState(false);

    const timer = useRef(); // la variabile in cui salvo il timer, fuori così sarà accessibile da tutte le funzioni
    // siccome lo stato fa ripartire il componente la variabile timer viene inizializzata ogni volta QUINDI MEGLIO REF

    const dialog = useRef();

    //! funzione per startare il timer
    function handleStart() {
        setTimerStarted(true);

        timer.current = setTimeout(() => {
            setTimerExpired(true);
            dialog.current.open(); //! ora fa riferimento al ref che abbiamo creato noi
        }, targetTime * 1000);
        //! Dopo i tot ms fa partire la callback (funzione di stato)

    }

    function handleStop() {
        //! da questa funzione voglio stoppare il timer della funzione handleStart
        clearTimeout(timer.current); // ha bisogno del pointer del timer
    }

    return (
        <>
            <ResultModal ref={dialog} targetTime={targetTime} result="lost" />
            <section className='challenge'>
                <h2>{title}</h2>
                {/* {timerExpired && <p>You lost</p>} */}
                <p className='challenge-time'>
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerStarted ? handleStop : handleStart}>
                        {timerStarted ? 'Stop' : 'Start'} Challenge
                    </button>
                </p>
                <p className={timerStarted ? 'active' : ''}>
                    {timerStarted ? ' Time is running...' : 'Timer inactive'}
                </p>
            </section>
        </>
    )
}

export default TimerChallenge