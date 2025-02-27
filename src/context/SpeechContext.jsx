import { createContext } from "react";

const SpeechContext = createContext({
  speechEnabled: true,
  setSpeechEnabled: () => {},
});

export default SpeechContext;
