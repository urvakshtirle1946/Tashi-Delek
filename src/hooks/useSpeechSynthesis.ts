import { useState, useCallback, useEffect, useRef } from 'react';

interface UseSpeechSynthesisReturn {
  speak: (text: string) => Promise<void>;
  stop: () => void;
  pause: () => void;
  resume: () => void;
  isSpeaking: boolean;
  isPaused: boolean;
  isLoading: boolean;
}

// ElevenLabs API Configuration
const ELEVENLABS_API_KEY = 'sk_6beffbfbbd6e5cfa97d4f573384be47932b86438fb23ae94';
const ELEVENLABS_VOICE_ID = 'siw1N9V8LmYeEWKyWBxv';
const ELEVENLABS_API_URL = `https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`;

export const useSpeechSynthesis = (): UseSpeechSynthesisReturn => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const pausedTimeRef = useRef<number>(0);

  // Check audio status periodically
  useEffect(() => {
    if (!currentAudioRef.current) return;

    const checkStatus = () => {
      const audio = currentAudioRef.current;
      if (audio) {
        if (!audio.paused && !audio.ended) {
          setIsPaused(false);
          setIsSpeaking(true);
        } else if (audio.paused && !audio.ended) {
          setIsPaused(true);
          setIsSpeaking(true);
        } else {
          setIsSpeaking(false);
          setIsPaused(false);
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
  }, []);

  // Cleanup: Stop speech when component unmounts
  useEffect(() => {
    return () => {
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current = null;
      }
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
      pausedTimeRef.current = 0;
    };
  }, []);

  const stop = useCallback(() => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      currentAudioRef.current = null;
    }
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    pausedTimeRef.current = 0;
  }, []);

  const pause = useCallback(() => {
    if (currentAudioRef.current && !currentAudioRef.current.paused) {
      pausedTimeRef.current = currentAudioRef.current.currentTime;
      currentAudioRef.current.pause();
      setIsPaused(true);
      setIsSpeaking(true);
    }
  }, []);

  const resume = useCallback(() => {
    if (currentAudioRef.current && currentAudioRef.current.paused) {
      currentAudioRef.current.currentTime = pausedTimeRef.current;
      currentAudioRef.current.play();
      setIsPaused(false);
      setIsSpeaking(true);
    }
  }, []);

  const speak = useCallback(async (text: string) => {
    // Stop any ongoing speech
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    window.speechSynthesis?.cancel();

    if (!text.trim()) return;

    setIsLoading(true);
    setIsSpeaking(true);
    setIsPaused(false);
    pausedTimeRef.current = 0;

    try {
      // Call ElevenLabs API
      const response = await fetch(ELEVENLABS_API_URL, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
          text: text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0.0,
            use_speaker_boost: true
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status}`);
      }

      // Get audio blob
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      // Create audio element and play
      const audio = new Audio(audioUrl);
      audio.volume = 1;
      currentAudioRef.current = audio;

      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        setIsSpeaking(false);
        setIsLoading(false);
        setIsPaused(false);
        currentAudioRef.current = null;
        pausedTimeRef.current = 0;
      };

      audio.onerror = () => {
        URL.revokeObjectURL(audioUrl);
        setIsSpeaking(false);
        setIsLoading(false);
        setIsPaused(false);
        currentAudioRef.current = null;
        pausedTimeRef.current = 0;
      };

      await audio.play();
      setIsLoading(false);
    } catch (error) {
      console.error('ElevenLabs TTS Error:', error);
      // Fallback to browser speech synthesis if ElevenLabs fails
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const newUtterance = new SpeechSynthesisUtterance(text);
        newUtterance.rate = 0.95;
        newUtterance.pitch = 1;
        newUtterance.volume = 1;

        newUtterance.onend = () => {
          setIsSpeaking(false);
          setIsLoading(false);
          setIsPaused(false);
        };

        newUtterance.onerror = () => {
          setIsSpeaking(false);
          setIsLoading(false);
          setIsPaused(false);
        };

        window.speechSynthesis.speak(newUtterance);
        setIsLoading(false);
      } else {
        setIsSpeaking(false);
        setIsLoading(false);
      }
    }
  }, []);

  return { speak, stop, pause, resume, isSpeaking, isPaused, isLoading };
};

