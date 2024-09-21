import React, { useEffect, useState } from 'react';
import { Window, WindowHeader, WindowContent, Button } from 'react95';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';
import './App.css';
import bg from './bg.jpg'; // Import bg.jpg
import beanImg from './bean.png'; // Import bean.jpg
import mrBeanImg from './mrbeans.png'; // Import mrbeans.png

function App() {
  const [beans, setBeans] = useState([]);
  const [wantedLevel, setWantedLevel] = useState(3);
  const [showAd, setShowAd] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [audio] = useState(new Audio('https://ia801000.us.archive.org/6/items/fgvsdf/Non-Stop%20Pop%20FM%20%28GTA%20V%29%20ALL%20SONGS%21%21.mp3'));

  useEffect(() => {
    const initialBeans = Array.from({ length: 50 }).map(() => ({
      id: Math.random(),
      left: Math.random() * 100,
      duration: Math.random() * 2 + 2,
      delay: Math.random() * 5,
    }));
    setBeans(initialBeans);

    // Show the ad after 5 seconds
    const timer = setTimeout(() => {
      setShowAd(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const toggleAudio = () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  const handleCloseAd = () => {
    setShowAd(false);
  };

  const togglePhone = () => {
    setShowPhone(prev => !prev);
  };

  const GTAStar = ({ filled }) => (
    <svg width="30" height="30" viewBox="0 0 24 24" fill={filled ? "#FFD700" : "none"} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
            stroke={filled ? "#FFD700" : "#555"} 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" />
    </svg>
  );

  const wantedStars = Array.from({ length: 5 }).map((_, index) => (
    <div key={index} className={`relative ${index < wantedLevel ? "animate-pulse" : ""}`}>
      <GTAStar filled={index < wantedLevel} />
      {index < wantedLevel && (
        <div className="absolute inset-0 bg-yellow-400 opacity-50 blur-sm rounded-full" />
      )}
    </div>
  ));

  return (
    <ThemeProvider theme={original}>
      <div
        className="h-screen w-screen flex justify-center items-center relative overflow-hidden"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >

        <div className='absolute top-0 w-screen py-1 bg-slate-300 text-[#000080] font-semibold text-center text-xs'>CA: XXXXXXXXXXXX</div>

        <div className='absolute top-2 left-2'>
          <img 
            src='sound.png' 
            className='size-28 cursor-pointer'
            onClick={toggleAudio} 
            alt="Toggle Sound" 
          />
        </div>

        {/* Raining beans */}
        {beans.map((bean) => (
          <span
            key={bean.id}
            className="bean"
            style={{
              left: `${bean.left}vw`,
              animationDuration: `${bean.duration}s`,
              animationDelay: `${bean.delay}s`,
            }}
          >
            🫘
          </span>
        ))}

          <div className="draggable-window">
            <Window style={{ width: 300 }}>
              <WindowHeader className="window-header flex justify-between items-center">
                <span>bean.sol</span>
                <Button size="sm" square>
                  <span>×</span>
                </Button>
              </WindowHeader>
              <WindowContent>
                <img src={beanImg} alt="bean" style={{ width: '100%', height: 'auto' }} />
              </WindowContent>
            </Window>
          </div>

        {/* Meme Ad Popup for mrbeans.png */}
        {showAd && (
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Window style={{ width: 350 }}>
              <WindowHeader className="flex justify-between items-center">
                <span>Limited Time Offer!</span>
                <Button size="sm" square onClick={handleCloseAd}>
                  <span>×</span>
                </Button>
              </WindowHeader>
              <WindowContent>
                <img src={mrBeanImg} alt="Mr. Bean" style={{ width: '100%', height: 'auto' }} />
                <div className="text-center mt-2">
                  <p className='font-bold text-xl'>Mr. Beans</p>
                  <p className="line-through text-red-500">Old Price: $19.99</p>
                  <p className="text-lg font-bold">Sale Price: $9.99</p>
                </div>
              </WindowContent>
            </Window>
          </div>
        )}

        {/* GTA Wanted Stars in the top-right corner */}
        <div className="absolute top-9 right-5 flex space-x-1 text-2xl">
          {wantedStars}
        </div>

        {/* GTA Phone */}
        <div className="absolute bottom-5 left-5">
          <Button onClick={togglePhone} className="bg-gray-800 text-white">
            {showPhone ? "Close Phone" : "Open Phone"}
          </Button>
        </div>

        {showPhone && (
          <div className="absolute bottom-20 left-5">
            <Window style={{ width: 300 }}>
              <WindowHeader className="flex justify-between items-center">
                <span>Phone</span>
                <Button size="sm" square onClick={togglePhone}>
                  <span>×</span>
                </Button>
              </WindowHeader>
              <WindowContent>
                <div className='space-x-2 flex text-lg text-[#000080] px-1 justify-center'>
                  <a href='' className='underline'>
                    <img src="XLogo.jpg" className='size-14'></img>
                  </a>
                  <a href='' className='underline'>
                    <img src='TG.png' className='size-14'></img>
                  </a>
                </div>
              </WindowContent>
            </Window>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;