import React, { useContext } from "react";
import SpeechContext from "../context/SpeechContext";

const TextToSpeech = ({ text, children }) => {
  const { speechEnabled } = useContext(SpeechContext);

  const speakText = (text) => {
    if (!speechEnabled) return;

    // Очищаем очередь озвучивания перед воспроизведением
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US"; // Устанавливаем английский язык
    window.speechSynthesis.speak(utterance);
  };

  return (
    <span onMouseOver={() => speakText(text)}>
      {children}
    </span>
  );
};

export default TextToSpeech;
