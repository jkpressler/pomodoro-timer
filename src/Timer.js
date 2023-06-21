import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from './PlayButton';
import PauseButton from './PauseButton';
import SettingsButton from './SettingsButton';
import { useContext, useEffect, useState, useRef } from "react"
import SettingsContext from "./SettingsContext";

const coral = '#ff7f50';
const lightBlue = 'rgb(0,0,0,0)'

function Timer() {
    const currentSettings = useContext(SettingsContext);

    const [isPaused, setIsPaused] = useState(true);
    const [mode, setMode] = useState('work')
    const [secondsLeft, setSecondsLeft] = useState(0);

    const secondsLeftRef = useRef(secondsLeft);
    const isPausedRef = useRef(isPaused);
    const modeRef = useRef(mode);

    function tick() {
        secondsLeftRef.current--;
        setSecondsLeft(secondsLeftRef.current);
    }

    useEffect(() => {

        function switchMode() {
            const nextMode = modeRef.current === 'work' ? 'break' : 'work';
            const nextSeconds = (nextMode === 'work' ? currentSettings.workMinutes : currentSettings.breakMinutes) * 60
            setMode(nextMode);
            modeRef.current = nextMode;
            setSecondsLeft(nextSeconds)
            secondsLeftRef.current = nextSeconds;
        }

        secondsLeftRef.current = currentSettings.workMinutes * 60;
        setSecondsLeft(secondsLeftRef.current);

        const interval = setInterval(() => {
            if (isPausedRef.current) {
                return;
            }
            if (secondsLeftRef.current === 0) {
                switchMode();
            }

            tick();
        }, 1000);

        return () => clearInterval(interval);
    }, [currentSettings]);

    const totalSeconds = mode == 'work' ?
        currentSettings.workMinutes * 60 :
        currentSettings.breakMinutes * 60;
    const percentage = Math.round(secondsLeft / totalSeconds * 100);

    const minutes = Math.floor(secondsLeft / 60);
    let seconds = Math.floor(secondsLeft % 60);
    if (seconds < 10) seconds = '0' + seconds;

    return (
        <div>
            <CircularProgressbar
                value={percentage}
                text={minutes + ':' + seconds}
                styles={buildStyles({
                    pathColor: coral,
                    textColor: coral,
                    trailColor: lightBlue,
                    backgroundColor: coral,
                })} />
            <div style={{ marginTop: '24px' }}>
                {isPaused ?
                    <PlayButton onClick={() => { setIsPaused(false); isPausedRef.current = false; }} /> :
                    <PauseButton onClick={() => { setIsPaused(true); isPausedRef.current = true; }} />}
            </div>
            <div style={{ marginTop: '24px' }}>
                <SettingsButton onClick={() => currentSettings.setShowSettings(true)} />
            </div>
        </div>
    );
}

export default Timer;