import React, { useEffect, useState, useRef } from "react";

import axios from "axios";

import { CountdownCircleTimer } from "react-countdown-circle-timer";

import styles from "./Start.module.css";
import {
  ArrowRightIcon,
  CaptionIcon,
  FullScreenIcon,
  NoCaptionIcon,
  PlayButton,
  RePlayButton,
} from "../assets/icons";

function shuffleArray(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

const Start = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState([]);

  const [options, setOptions] = useState([]);

  const [isVideoEnded, setIsVideoEnded] = useState(false);

  const [isCaptions, setIsCaptions] = useState(null);

  const videoRef = useRef(null);

  const playPause = useRef(null);

  const [isFinished, setIsFinished] = useState(false);

  const remainFinished = () => {
    const options = document.querySelectorAll("#options");

    options.forEach((option) => {
      if (option.textContent === data.answer) {
        option.setAttribute("disabled", "");
        option.classList.add("correct");
      } else {
        option.setAttribute("disabled", "");
        option.classList.add("wrong");
      }
      setIsFinished(true);
    });
  };

  const getVideo = async () => {
    try {
      const response = await axios.get(
        "https://be-exposed.herokuapp.com/video"
      );
      await setData(response.data);
      await setOptions(
        shuffleArray([response.data.answer, response.data.distractor])
      );
      await setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getVideo();
  }, [setData]);

  const toggleVideo = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      playPause.current.style = "display: none";
    } else {
      videoRef.current.pause();
    }
  };

  const onVideoEnded = () => {
    playPause.current.style = "display: block";
    !isVideoEnded && setIsVideoEnded(true);
  };

  const getFullscreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
      videoRef.current.play();
    } else if (videoRef.current.webkitRequestFullscreen) {
      videoRef.current.webkitRequestFullscreen();
      videoRef.current.play();
    } else if (videoRef.current.msRequestFullscreen) {
      videoRef.current.msRequestFullscreen();
      videoRef.current.play();
    }
  };

  const yesCaptions = () => {
    setIsCaptions(true);
  };

  const noCaptions = () => {
    setIsCaptions(false);
  };

  const doSelection = (e) => {
    if (e.target.textContent === data.answer) {
      e.target.classList.add("correct");
    } else {
      e.target.classList.add("wrong");
    }
    setIsFinished(true);
  };

  const getNewVideo = async () => {
    await setIsLoading(true);
    await setIsVideoEnded(false);
    await setIsCaptions(null);
    await setIsFinished(false);
    await getVideo();
  };

  return isLoading ? (
    <h1>Loading </h1>
  ) : (
    <section className={styles.start}>
      <div className={styles.video}>
        <div className={styles.actions}>
          {isFinished && (
            <div className={styles.finished}>
              <button onClick={() => getNewVideo()}>
                <ArrowRightIcon />
              </button>
            </div>
          )}
          {isCaptions !== null && (
            <div className={styles.remaining}>
              <CountdownCircleTimer
                isPlaying
                duration={isFinished ? 2 : 10}
                colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                colorsTime={[7, 5, 2, 0]}
                onComplete={remainFinished}
              >
                {({ remainingTime }) => remainingTime}
              </CountdownCircleTimer>
            </div>
          )}
          <div className={styles.fullscreen}>
            <button onClick={getFullscreen}>
              <FullScreenIcon />
              Full Screen
            </button>
          </div>
          <div className={styles.playpause} ref={playPause}>
            <button onClick={toggleVideo}>
              {!isVideoEnded ? <PlayButton /> : <RePlayButton />}
            </button>
          </div>

          {isVideoEnded && isCaptions === null && (
            <div className={styles.selectCaptions}>
              <button onClick={yesCaptions}>
                <CaptionIcon />
                With Captions
              </button>
              <button onClick={noCaptions}>
                <NoCaptionIcon />
                Without Captions
              </button>
            </div>
          )}

          {isCaptions && <div className={styles.captions}>{data.subtitle}</div>}

          {isCaptions !== null && (
            <div className={styles.options}>
              <button onClick={doSelection} id="options">
                {options[1]}
              </button>
              <button onClick={doSelection} id="options">
                {options[0]}
              </button>
            </div>
          )}
        </div>
        <video
          ref={videoRef}
          src={data.path}
          onEnded={onVideoEnded}
          controlsList="nodownload"
        />
      </div>
    </section>
  );
};

export default Start;
