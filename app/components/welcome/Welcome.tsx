import { useEffect, useState } from 'react';
import AudioPlayer from '../../components/audio-player/AudioPlayer';
import RS_SCHOOL_LOGO from '../../../public/assets/icons_and_logos/rs_school.svg';
import EP_PHOTO from '../../../public/assets/photoes/EP.jpg';
import MG_PHOTO from '../../../public/assets/photoes/MG.png';
import DN_PHOTO from '../../../public/assets/photoes/DN.jpg';
import './Welcome.scss';
import Swiper from '../swiper/Swiper';
import Button from '@mui/material/Button';

const RS_SCHOOL_LOGO_URL: string = RS_SCHOOL_LOGO as unknown as string;
const RS_SCHOOL_URL: string = 'https://rs.school/';

const teamMembers = [
    {
        name: 'Maksim Gurbanow',
        role: 'Team Lead and Frontend Developer',
        bio: 'Максим руководит архитектурой проекта и интеграцией с commercetools API...',
        photo: MG_PHOTO as string,
        github: 'https://github.com/MaksimGurbanow',
    },
    {
        name: 'Egor Panevin',
        role: 'Frontend Developer',
        bio: 'Егор отвечает за управление данными в commercetools API...',
        photo: EP_PHOTO as string,
        github: 'https://github.com/predsedatel228',
    },
    {
        name: 'Dmitry Nikolayev',
        role: 'Frontend Developer',
        bio: 'Дмитрий отвечает за UI/UX дизайн и интерактивные элементы приложения...',
        photo: DN_PHOTO as string,
        github: 'https://github.com/Grammeri',
    },
];

const Welcome = () => {
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handlePlay = () => {
        setIsAnimating(true);
    };

    const handlePause = () => {
        setIsAnimating(false);
    };

    return (
        <div className="about-us-container">
            <h1 className={`welcomeTitle ${isAnimating ? 'animate' : ''}`}>React Group</h1>
            <div className="audio-block">
                <div>
                    <h2 className="audio-heading">Готовься к собесам вместе с нами!</h2>
                    <div className="audio-player-container">
                        <AudioPlayer src="/assets/audio/Track.mp3" onPlay={handlePlay} onPause={handlePause} />
                    </div>
                </div>
            </div>

            {isMobileView ? (
                <Swiper>
                    {teamMembers.map((member) => (
                        <div key={member.name} className={`team-member ${isAnimating ? 'animate' : ''}`}>
                            <img
                                src={member.photo}
                                alt={`Фото ${member.name}`}
                                className="team-member-photo"
                            />
                            <h2>{member.name}</h2>
                            <h3>{member.role}</h3>
                            <p>{member.bio}</p>
                            <div className="github-button-container">
                                <a href={member.github} target="_blank" rel="noopener noreferrer">
                                    <Button variant="contained" color="primary" sx={{ textTransform: 'none' }}>
                                        GitHub профиль
                                    </Button>
                                </a>
                            </div>
                        </div>
                    ))}
                </Swiper>
            ) : (
                <div className="team-section">
                    {teamMembers.map((member) => (
                        <div key={member.name} className={`team-member ${isAnimating ? 'animate' : ''}`}>
                            <img
                                src={member.photo}
                                alt={`Фото ${member.name}`}
                                className="team-member-photo"
                            />
                            <h2>{member.name}</h2>
                            <h3>{member.role}</h3>
                            <p>{member.bio}</p>
                            <div className="github-button-container">
                                <a href={member.github} target="_blank" rel="noopener noreferrer">
                                    <Button variant="contained" color="primary" sx={{ textTransform: 'none' }}>
                                        GitHub профиль
                                    </Button>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="bottom-text-and-logo">
                <p className="school-info">Мы являемся студентами курса по веб-разработке в RS School.</p>
                <div className="rs-school-logo">
                    <a href={RS_SCHOOL_URL} target="_blank" rel="noopener noreferrer">
                        <img src={RS_SCHOOL_LOGO_URL} alt="RS School Logo"/>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
