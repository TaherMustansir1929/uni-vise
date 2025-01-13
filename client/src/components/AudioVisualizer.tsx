import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

const AudioVisualizer = ({playAudio}: {playAudio: boolean}) => {
  // State for toggling audio and visual indicator
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);

  // Refs for audio and navigation container
  const audioElementRef = useRef(null);

  // Toggle audio and visual indicator
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  // Manage audio playback
  useEffect(() => {
    audioElementRef.current.volume = 0.1;
    isAudioPlaying ? audioElementRef.current.play() : audioElementRef.current.pause();
  }, [isAudioPlaying]);

  useEffect(()=>{
    setIsAudioPlaying(playAudio);
    setIsIndicatorActive(playAudio);
  },[playAudio]);

  return (
    <div>
      <button
        onClick={toggleAudioIndicator}
        className="ml-10 flex items-center space-x-0.5  h-[60px] w-[60px] z-10"
      >
        <audio
          ref={audioElementRef}
          className="hidden"
          src="/audio/loop.mp3"
          loop
        />
        {[1, 2, 3, 4, 5, 6, 7, 8].map((bar) => (
          <div
            key={bar}
            className={clsx("indicator-line", {
              active: isIndicatorActive,
            })}
            style={{
              animationDelay: `${bar * 0.1}s`,
            }}
          />
        ))}
      </button>
    </div>
  );
};

export default AudioVisualizer;
