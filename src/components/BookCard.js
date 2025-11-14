import React, { useState, useRef, useEffect } from 'react';

// Global reference to track currently playing audio
let currentlyPlayingAudio = null;

function BookCard({ book }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const handlePlayPause = async (e) => {
    e.stopPropagation();
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          // Pause any currently playing audio
          if (currentlyPlayingAudio && currentlyPlayingAudio !== audioRef.current) {
            currentlyPlayingAudio.pause();
          }
          await audioRef.current.play();
          currentlyPlayingAudio = audioRef.current;
          setIsPlaying(true);
        }
      } catch (error) {
        console.error('Audio play error:', error);
        setIsPlaying(false);
      }
    }
  };

  // Listen for when audio is paused externally
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    audio.addEventListener('pause', handlePause);
    audio.addEventListener('play', handlePlay);

    return () => {
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('play', handlePlay);
    };
  }, []);

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progressPercent = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progressPercent);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };


  const handleCardClick = (e) => {
    // Don't toggle if clicking the play button
    if (e.target.closest('.audio-play-btn')) {
      return;
    }
    // Toggle hover state for mobile
    setIsHovered(!isHovered);
  };

  return (
    <div
      className="book-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <img className="book-cover" src={book.image} alt={book.title} />
      <div className="book-info">
        <div className="book-title">{book.title}</div>
        <div className="book-author">{book.author}</div>
      </div>

      {book.audioUrl && (
        <div className={`book-audio-player ${isHovered ? 'visible' : ''}`}>
          <button className="audio-play-btn" onClick={handlePlayPause}>
            <img
              src={isPlaying ? '/images/pause-play.png' : '/images/play.png'}
              alt={isPlaying ? 'Pause' : 'Play'}
              className="audio-btn-icon"
            />
          </button>
          <audio
            ref={audioRef}
            src={book.audioUrl}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            preload="metadata"
            playsInline
          />
          <div className="audio-progress">
            <div className="audio-progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="audio-time">
            {formatTime(duration)}
          </div>
        </div>
      )}
    </div>
  );
}

export default BookCard;
