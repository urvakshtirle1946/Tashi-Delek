import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  MessageCircle,
  X,
  Loader2,
  Sparkles,
  History,
  ChevronUp,
  ChevronDown,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// Types for the component
export interface ModelInfo {
  id: string;
  name: string;
  location: string;
  established: string;
  description: string;
  history: string;
  architecture: string;
  significance: string;
  visitingHours: string;
  bestTimeToVisit: string;
  nearbyAttractions: string[];
  facts: string[];
}

interface VoiceGuideProps {
  modelInfo: ModelInfo;
  className?: string;
}

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Groq API Configuration
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || '';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// Generate system prompt based on model info
const generateSystemPrompt = (modelInfo: ModelInfo): string => {
  return `You are ONLY a virtual tour guide for ${modelInfo.name}. You must STRICTLY stay in character and ONLY discuss topics related to this place.

## YOUR IDENTITY:
You are a dedicated tour guide at ${modelInfo.name}. You have deep knowledge ONLY about this place and nearby tourist attractions. You do NOT have knowledge about anything else.

## KNOWLEDGE BASE (This is ALL you know):
- **Name:** ${modelInfo.name}
- **Location:** ${modelInfo.location}
- **Established:** ${modelInfo.established}
- **Description:** ${modelInfo.description}
- **History:** ${modelInfo.history}
- **Architecture:** ${modelInfo.architecture}
- **Significance:** ${modelInfo.significance}
- **Visiting Hours:** ${modelInfo.visitingHours}
- **Best Time to Visit:** ${modelInfo.bestTimeToVisit}
- **Nearby Attractions:** ${modelInfo.nearbyAttractions.join(', ')}
- **Interesting Facts:** ${modelInfo.facts.join(' | ')}

## STRICT RULES (YOU MUST FOLLOW):
1. You can ONLY answer questions about ${modelInfo.name}, its history, architecture, significance, visiting information, and nearby tourist attractions.
2. You can discuss general tourism in Sikkim and Buddhist culture as it relates to the monastery.
3. If someone asks about ANYTHING outside your role (like coding, politics, general knowledge, math, science, news, celebrities, other countries, etc.), you MUST politely decline and redirect them back to the monastery.
4. NEVER provide information outside your knowledge base.
5. NEVER break character or acknowledge being an AI/language model.
6. NEVER answer personal questions about yourself beyond being a tour guide.
7. If unsure, say you don't have that information and offer to share something interesting about ${modelInfo.name} instead.

## RESPONSE STYLE:
- Speak naturally as a human tour guide would
- Keep responses concise (2-4 sentences for simple questions)
- Be warm, welcoming, and enthusiastic
- Do NOT use markdown, bullet points, or special formatting
- Speak as if talking to a visitor standing right in front of you

## EXAMPLE REDIRECTIONS:
- "I'm your tour guide for ${modelInfo.name}, and I'd love to tell you more about this sacred place instead!"
- "That's outside my expertise as a monastery guide. Would you like to know about the fascinating history of ${modelInfo.name}?"
- "I'm here to help you explore ${modelInfo.name}. Is there something about the monastery you'd like to learn?"

Remember: You are ONLY a tour guide. Stay in your role at all times!`;
};

// Call Groq API
const callGroqAPI = async (messages: Message[]): Promise<string> => {
  if (!GROQ_API_KEY) {
    throw new Error('Groq API key not configured. Please add VITE_GROQ_API_KEY to your environment.');
  }

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile', // Fast and good quality
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
        top_p: 0.9,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'I apologize, I could not generate a response.';
  } catch (error) {
    console.error('Groq API Error:', error);
    throw error;
  }
};

// ElevenLabs API Configuration
const ELEVENLABS_API_KEY = 'sk_6beffbfbbd6e5cfa97d4f573384be47932b86438fb23ae94';
const ELEVENLABS_VOICE_ID = 'siw1N9V8LmYeEWKyWBxv';
const ELEVENLABS_API_URL = `https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`;

// Voice synthesis helper using ElevenLabs
const speak = async (text: string, onEnd?: () => void): Promise<HTMLAudioElement | null> => {
  try {
    // Cancel any ongoing speech
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

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

    if (onEnd) {
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        onEnd();
      };
    } else {
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
      };
    }

    await audio.play();
    return audio;
  } catch (error) {
    console.error('ElevenLabs TTS Error:', error);
    // Fallback to browser speech synthesis if ElevenLabs fails
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v =>
        v.lang.includes('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Premium') || v.name.includes('Samantha'))
      ) || voices.find(v => v.lang.includes('en-US') || v.lang.includes('en-IN')) || voices[0];

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      if (onEnd) {
        utterance.onend = onEnd;
      }

      window.speechSynthesis.speak(utterance);
      return null;
    }
    return null;
  }
};

// Quick action buttons data
const quickActions = [
  { id: 'history', label: 'History', icon: History, query: 'Tell me about the history of this place' },
  { id: 'architecture', label: 'Architecture', icon: Sparkles, query: 'Describe the architecture and design' },
  { id: 'significance', label: 'Why Special?', icon: MessageCircle, query: 'What makes this place special and significant?' },
  { id: 'facts', label: 'Fun Facts', icon: Sparkles, query: 'Share some interesting facts I might not know' },
];

const VoiceGuide: React.FC<VoiceGuideProps> = ({ modelInfo, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [conversationHistory, setConversationHistory] = useState<{ role: 'user' | 'assistant', text: string }[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [textInput, setTextInput] = useState('');

  const recognitionRef = useRef<any>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize system prompt
  useEffect(() => {
    const systemMessage: Message = {
      role: 'system',
      content: generateSystemPrompt(modelInfo)
    };
    setMessages([systemMessage]);
  }, [modelInfo]);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        setTranscript(transcriptText);

        if (event.results[current].isFinal) {
          handleUserQuery(transcriptText);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);

        switch (event.error) {
          case 'not-allowed':
            setError('Microphone access denied. Please click the lock icon in your browser\'s address bar, allow microphone access, and refresh the page.');
            break;
          case 'no-speech':
            setError('No speech detected. Please try speaking again.');
            break;
          case 'audio-capture':
            setError('No microphone found. Please check your microphone connection.');
            break;
          case 'network':
            setError('Network error occurred. Please check your internet connection.');
            break;
          case 'aborted':
            // User cancelled, no need to show error
            break;
          default:
            setError(`Voice recognition error: ${event.error}. Please try again.`);
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    // Load voices
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      // Some browsers need this event
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      // Cleanup audio
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current = null;
      }
      window.speechSynthesis?.cancel();
    };
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [conversationHistory, isProcessing]);

  // Handle user query - call Groq API
  const handleUserQuery = useCallback(async (query: string) => {
    if (!query.trim()) return;

    setError(null);
    setIsProcessing(true);
    setShowQuickActions(false);
    setTranscript('');

    // Add user message to UI
    setConversationHistory(prev => [...prev, { role: 'user', text: query }]);

    // Add user message to API messages
    const userMessage: Message = { role: 'user', content: query };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    try {
      // Call Groq API
      const responseText = await callGroqAPI(updatedMessages);

      // Add assistant response to messages
      const assistantMessage: Message = { role: 'assistant', content: responseText };
      setMessages(prev => [...prev, assistantMessage]);

      // Add to UI conversation
      setConversationHistory(prev => [...prev, { role: 'assistant', text: responseText }]);

      // Speak the response if not muted
      if (!isMuted) {
        setIsSpeaking(true);
        const audio = await speak(responseText, () => {
          setIsSpeaking(false);
        });
        if (audio) {
          currentAudioRef.current = audio;
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get response';
      setError(errorMessage);
      setConversationHistory(prev => [...prev, {
        role: 'assistant',
        text: 'I apologize, I encountered an issue. Please try again.'
      }]);
    } finally {
      setIsProcessing(false);
    }
  }, [messages, isMuted]);

  // Request microphone permission
  const requestMicrophonePermission = useCallback(async (): Promise<boolean> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Stop the stream immediately after getting permission
      stream.getTracks().forEach(track => track.stop());
      return true;
    } catch (err) {
      console.error('Microphone permission error:', err);
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          setError('Microphone access denied. Please click the lock icon in your browser\'s address bar and allow microphone access, then refresh the page.');
        } else if (err.name === 'NotFoundError') {
          setError('No microphone found. Please connect a microphone and try again.');
        } else {
          setError(`Microphone error: ${err.message}`);
        }
      }
      return false;
    }
  }, []);

  // Toggle listening
  const toggleListening = useCallback(async () => {
    if (!recognitionRef.current) {
      setError('Speech recognition is not supported in your browser. Please try Chrome or Edge.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      // First request microphone permission
      const hasPermission = await requestMicrophonePermission();
      if (!hasPermission) {
        return;
      }

      setTranscript('');
      setError(null);

      try {
        recognitionRef.current.start();
        setIsListening(true);

        // Stop any ongoing speech
        if (currentAudioRef.current) {
          currentAudioRef.current.pause();
          currentAudioRef.current.currentTime = 0;
          currentAudioRef.current = null;
        }
        window.speechSynthesis?.cancel();
        setIsSpeaking(false);
      } catch (err) {
        console.error('Failed to start recognition:', err);
        setError('Failed to start voice recognition. Please try again.');
        setIsListening(false);
      }
    }
  }, [isListening, requestMicrophonePermission]);

  // Toggle mute
  const toggleMute = useCallback(() => {
    if (!isMuted) {
      // Stop ElevenLabs audio
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current.currentTime = 0;
        currentAudioRef.current = null;
      }
      // Stop browser speech synthesis as fallback
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
    }
    setIsMuted(!isMuted);
  }, [isMuted]);

  // Stop speaking
  const stopSpeaking = useCallback(() => {
    // Stop ElevenLabs audio
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      currentAudioRef.current = null;
    }
    // Stop browser speech synthesis as fallback
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  }, []);

  // Handle quick action click
  const handleQuickAction = useCallback((query: string) => {
    handleUserQuery(query);
  }, [handleUserQuery]);

  // Handle text input submit
  const handleTextSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (textInput.trim()) {
      handleUserQuery(textInput);
      setTextInput('');
    }
  }, [textInput, handleUserQuery]);

  // Welcome message on first open
  useEffect(() => {
    if (isOpen && conversationHistory.length === 0 && GROQ_API_KEY) {
      const welcomeMessage = `Namaste and welcome! I'm your virtual guide for ${modelInfo.name}. I'm here to share the rich history, beautiful architecture, and spiritual significance of this sacred place. Feel free to ask me anything - just tap the microphone and speak, or type your question below!`;
      setConversationHistory([{ role: 'assistant', text: welcomeMessage }]);

      if (!isMuted) {
        setIsSpeaking(true);
        speak(welcomeMessage, () => {
          setIsSpeaking(false);
        }).then((audio) => {
          if (audio) {
            currentAudioRef.current = audio;
          }
        });
      }
    } else if (isOpen && !GROQ_API_KEY) {
      setError('API key not configured. Please add VITE_GROQ_API_KEY to your .env file.');
    }
  }, [isOpen, modelInfo.name, isMuted]);

  return (
    <>
      {/* Floating Button - Bottom Right */}
      <div className={cn("fixed bottom-24 right-6 z-50", className)}>
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <Button
                onClick={() => setIsOpen(true)}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-2xl shadow-amber-500/30 border-0 relative overflow-hidden group"
              >
                {/* Animated rings */}
                <span className="absolute inset-0 rounded-full border-2 border-amber-400/50 animate-ping" />
                <span className="absolute inset-2 rounded-full border border-amber-300/30 animate-pulse" />

                <MessageCircle className="w-7 h-7 relative z-10" />

                {/* Sparkle effect */}
                <Sparkles className="w-4 h-4 absolute top-2 right-2 text-amber-200 animate-pulse" />
              </Button>

            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)]"
          >
            <Card className="bg-slate-900/95 backdrop-blur-2xl border-white/10 shadow-2xl shadow-black/50 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-b border-white/10 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center relative">
                      <MessageCircle className="w-5 h-5 text-white" />
                      {/* Online indicator */}
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                        AI Tour Guide
                        <span className="text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded">LIVE</span>
                      </h3>
                      <p className="text-amber-400/80 text-xs">{modelInfo.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleMute}
                      className="w-8 h-8 rounded-full text-white/60 hover:text-white hover:bg-white/10"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setIsOpen(false);
                        stopSpeaking();
                      }}
                      className="w-8 h-8 rounded-full text-white/60 hover:text-white hover:bg-white/10"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Error Banner */}
              {error && (
                <div className="bg-red-500/20 border-b border-red-500/30 px-4 py-2">
                  <p className="text-red-400 text-xs">{error}</p>
                </div>
              )}

              {/* Chat Content */}
              <div
                ref={chatContainerRef}
                className="h-[300px] overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10"
              >
                {conversationHistory.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex",
                      msg.role === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm",
                        msg.role === 'user'
                          ? 'bg-amber-500 text-white rounded-br-md'
                          : 'bg-white/10 text-white/90 rounded-bl-md'
                      )}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}

                {/* Processing indicator */}
                {isProcessing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white/10 rounded-2xl rounded-bl-md px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 text-amber-400 animate-spin" />
                        <span className="text-white/60 text-sm">Thinking...</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Listening indicator */}
                {isListening && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-end"
                  >
                    <div className="bg-amber-500/20 border border-amber-500/30 rounded-2xl rounded-br-md px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                        <span className="text-amber-400 text-sm">
                          {transcript || 'Listening...'}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Quick Actions */}
              <AnimatePresence>
                {showQuickActions && conversationHistory.length <= 1 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-white/10 overflow-hidden"
                  >
                    <div className="p-3">
                      <p className="text-white/40 text-xs mb-2 px-1">Quick questions:</p>
                      <div className="flex flex-wrap gap-2">
                        {quickActions.map((action) => (
                          <Button
                            key={action.id}
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuickAction(action.query)}
                            disabled={isProcessing}
                            className="bg-white/5 border-white/10 text-white/70 hover:text-white hover:bg-white/10 text-xs h-8 rounded-full disabled:opacity-50"
                          >
                            <action.icon className="w-3 h-3 mr-1.5" />
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Input Section */}
              <div className="border-t border-white/10 p-4">
                {/* Text Input */}
                <form onSubmit={handleTextSubmit} className="flex items-center gap-2 mb-3">
                  <input
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Type a message..."
                    disabled={isProcessing || isListening}
                    className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50 disabled:opacity-50"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!textInput.trim() || isProcessing}
                    className="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </form>

                {/* Voice Controls */}
                <div className="flex items-center justify-center gap-4">
                  {/* Speaking indicator */}
                  {isSpeaking && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={stopSpeaking}
                      className="bg-white/5 border-white/10 text-white/70 hover:text-white text-xs"
                    >
                      <VolumeX className="w-3 h-3 mr-1.5" />
                      Stop
                    </Button>
                  )}

                  {/* Main Mic Button */}
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleListening}
                    disabled={isProcessing}
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 relative",
                      isListening
                        ? "bg-red-500 shadow-lg shadow-red-500/30"
                        : "bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/30",
                      isProcessing && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {/* Animated ring when listening */}
                    {isListening && (
                      <>
                        <span className="absolute inset-0 rounded-full border-2 border-red-400 animate-ping" />
                        <span className="absolute inset-0 rounded-full bg-red-500/20 animate-pulse" />
                      </>
                    )}

                    {isListening ? (
                      <MicOff className="w-5 h-5 text-white relative z-10" />
                    ) : (
                      <Mic className="w-5 h-5 text-white relative z-10" />
                    )}
                  </motion.button>

                  {/* Show more quick actions */}
                  {conversationHistory.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowQuickActions(!showQuickActions)}
                      className="bg-white/5 border-white/10 text-white/70 hover:text-white text-xs"
                    >
                      {showQuickActions ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
                    </Button>
                  )}
                </div>

                <p className="text-center text-white/40 text-xs mt-2">
                  {isListening ? '🎤 Speak now...' : 'Tap mic to speak or type below'}
                </p>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VoiceGuide;
