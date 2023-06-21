import ReactSlider from "react-slider"
import './slider.css'
import { useContext } from "react"
import SettingsContext from "./SettingsContext";
import BackButton from "./BackButton";

function Settings() {
    const currentSettings = useContext(SettingsContext);
    return (
        <div style={{ textAlign: 'left' }}>
            <label style={{ marginBottom: '24px' }} >work minutes: {currentSettings.workMinutes}</label>
            <ReactSlider
                className="slider"
                thumbClassName="thumb"
                trackClassName="track"
                value={currentSettings.workMinutes}
                onChange={newValue => currentSettings.setWorkMinutes(newValue)}
                min={1}
                max={120}
            />
            <label style={{ marginTop: '24px', marginBottom: '24px' }}>break minutes: {currentSettings.breakMinutes}</label>
            <ReactSlider
                className="slider"
                thumbClassName="thumb"
                trackClassName="track"
                value={currentSettings.breakMinutes}
                onChange={newValue => currentSettings.setBreakMinutes(newValue)}
                min={1}
                max={120}
            />
            <div style={{ textAlign: 'center', marginTop: '48px' }}>
                <BackButton onClick={() => currentSettings.setShowSettings(false)} />
            </div>
        </div>
    )
}

export default Settings