import { useRef, useState } from 'react';
import { FaPlay, FaPause, FaVolumeUp } from 'react-icons/fa';
import styles from './AudioPlayer.module.scss';
import PropTypes from 'prop-types';

const AudioPlayer = ({ src, onPlay, onPause }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);

    const togglePlayPause = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            onPause();
        } else {
            audioRef.current.play().catch((error) => {
                console.error('Failed to play the audio:', error);
            });
            if (onPlay) onPlay();
        }
        setIsPlaying(!isPlaying);
    };

    const handleVolumeChange = (event) => {
        const volumeValue = event.target.value;
        setVolume(volumeValue);
        audioRef.current.volume = volumeValue;
    };

    return (
        <div className={styles.audioControls}>
            <audio ref={audioRef} src={src} loop>
                <track kind="captions" srcLang="en" label="English captions"/>
            </audio>
            <button onClick={togglePlayPause} className={styles.playPauseButton}>
                {isPlaying ? <FaPause/> : <FaPlay/>}
            </button>
            <div className={styles.volumeControl}>
                <FaVolumeUp className={styles.volumeIcon}/>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                />
            </div>
        </div>
    );
};

AudioPlayer.propTypes = {
    src: PropTypes.string.isRequired,
    onPlay: PropTypes.func,
    onPause: PropTypes.func,
};
export default AudioPlayer;
