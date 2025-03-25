import React, { useState, useRef } from 'react'
import ResultModal from './ResultModal';

function TimerChallenge({ title, targetTime }) {

    // const [timerStarted, setTimerStarted] = useState(false);
    // const [timerExpired, setTimerExpired] = useState(false);

    const [remainingTime, setRemainingTime] = useState(targetTime * 1000);
    const timer = useRef(); // la variabile in cui salvo il timer, fuori così sarà accessibile da tutte le funzioni
    // siccome lo stato fa ripartire il componente la variabile timer viene inizializzata ogni volta QUINDI MEGLIO REF

    const dialog = useRef();

    const timerIsActive = remainingTime > 0 && remainingTime < targetTime * 1000

    if (remainingTime <= 0) {
        clearInterval(timer.current);
        dialog.current.open();

    }
    function handleReset() {
        setRemainingTime(targetTime * 1000)

    }

    //! funzione per startare il timer
    function handleStart() {
        // setTimerStarted(true);

        // timer.current = setTimeout(() => { 
        //     setTimerExpired(true);
        //     dialog.current.open(); //! ora fa riferimento al ref che abbiamo creato noi
        // }, targetTime * 1000);
        //! Dopo i tot ms fa partire la callback (funzione di stato)

        // dobbiamo calcolare quanti secondi mancano: quindi non va bene setTimeout ma setInterval
        timer.current = setInterval(() => {
            // dobbiamo tenere conto del tempo che rimane
            setRemainingTime(prevTimeRemaining => prevTimeRemaining - 20);
        }, 20) // non funziona come timeout, parte ogni volta che è passato il tempo segnato
    }

    function handleStop() {
        //! da questa funzione voglio stoppare il timer della funzione handleStart
        // clearTimeout(timer.current); // ha bisogno del pointer del timer
        dialog.current.open();
        clearInterval(timer.current);

    }

    return (
        <>
            <ResultModal
                ref={dialog}
                targetTime={targetTime}
                timeRemaining={remainingTime}
                onReset={handleReset}
            />
            <section className='challenge'>
                <h2>{title}</h2>
                {/* {timerExpired && <p>You lost</p>} */}
                <p className='challenge-time'>
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStop : handleStart}>
                        {timerIsActive ? 'Stop' : 'Start'} Challenge
                    </button>
                </p>
                <p className={timerIsActive ? 'active' : ''}>
                    {timerIsActive ? ' Time is running...' : 'Timer inactive'}
                </p>
            </section>
        </>
    )
}

export default TimerChallenge