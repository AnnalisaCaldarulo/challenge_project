import React, { useState } from 'react'

function TimerChallenge({ title, targetTime }) {

    const [timerStarted, setTimerStarted] = useState(false);
    const [timerExpired, setTimerExpired] = useState(false);

    let timer; // la variabile in cui salvo il timer, fuori così sarà accessibile da tutte le funzioni
    //! funzione per startare il timer
    function handleStart() {
        setTimerStarted(true);

        timer = setTimeout(() => {
            setTimerExpired(true)
        }, targetTime * 1000);
        //! Dopo i tot ms fa partire la callback (funzione di stato)

    }

    function handleStop() {
        //! da questa funzione voglio stoppare il timer della funzione handleStart
        clearTimeout(timer); // ha bisogno del pointer del timer
      
    }

    return (
        <section className='challenge'>
            <h2>{title}</h2>
            {timerExpired && <p>You lost</p>}
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
    )
}

export default TimerChallenge