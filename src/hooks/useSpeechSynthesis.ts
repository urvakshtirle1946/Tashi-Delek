import { useState, useCallback, useEffect } from 'react';

interface UseSpeechSynthesisReturn {
  speak: (text: string) => Promise<void>;
  stop: () => void;
  pause: () => void;
  resume: () => void;
  isSpeaking: boolean;
  isPaused: boolean;
  isLoading: boolean;
}

export const useSpeechSynthesis = (): UseSpeechSynthesisReturn => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  // Check speech synthesis status periodically
  useEffect(() => {
    if (!utterance) return;

    const checkStatus = () => {
      if (window.speechSynthesis.speaking) {
        if (window.speechSynthesis.paused) {
          setIsPaused(true);
          setIsSpeaking(true);
        } else {
          setIsPaused(false);
          setIsSpeaking(true);
        }
      } else {
        setIsSpeaking(false);
        setIsPaused(false);
      }
    };

    const interval = setInterval(checkStatus, 100);

    return () => {
      clearInterval(interval);
    };
  }, [utterance]);

  // Cleanup: Stop speech when component unmounts
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
      setUtterance(null);
    };
  }, []);

  const stop = useCallback(() => {
    if (utterance) {
      window.speechSynthesis.cancel();
      setUtterance(null);
    }
    setIsSpeaking(false);
    setIsPaused(false);
  }, [utterance]);

  const pause = useCallback(() => {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsSpeaking(true);
    }
  }, []);

  const resume = useCallback(() => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsSpeaking(true);
    }
  }, []);

  const speak = useCallback(async (text: string) => {
    // Stop any ongoing speech
    if (utterance) {
      window.speechSynthesis.cancel();
      setUtterance(null);
    }

    if (!text.trim()) return;

    setIsLoading(true);
    setIsSpeaking(true);

    // Use browser speech synthesis
    if ('speechSynthesis' in window) {
      const newUtterance = new SpeechSynthesisUtterance(text);
      newUtterance.rate = 0.95;
      newUtterance.pitch = 1;
      newUtterance.volume = 1;
      
      setUtterance(newUtterance);

      newUtterance.onend = () => {
        setIsSpeaking(false);
        setIsLoading(false);
        setIsPaused(false);
        setUtterance(null);
      };

      newUtterance.onerror = () => {
        setIsSpeaking(false);
        setIsLoading(false);
        setIsPaused(false);
        setUtterance(null);
      };

      window.speechSynthesis.speak(newUtterance);
      setIsLoading(false);
    } else {
      setIsSpeaking(false);
      setIsLoading(false);
    }
  }, [utterance]);

  return { speak, stop, pause, resume, isSpeaking, isPaused, isLoading };
};

