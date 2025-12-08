import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  MessageCircle,
  X,
  Loader2,
  Send,
  Minimize2,
  Maximize2,
  User,
  Bot,
  Clock,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// Groq API Configuration
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || '';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
  timestamp?: Date;
}

// Generate system prompt for packages
const generateSystemPrompt = (packages: any[]): string => {
  const packageList = packages.map((pkg, index) => 
    `${index + 1}. ${pkg.name} - ₹${pkg.price} - ${pkg.description}`
  ).join('\n');

  return `You are a helpful travel package assistant for Sikkim monastery tours. You MUST STRICTLY stay in character and ONLY discuss travel packages, monastery tours, Sikkim tourism, and related topics.

## YOUR IDENTITY:
You are a friendly and knowledgeable travel consultant specializing in Sikkim monastery tours and spiritual journeys. You help visitors find the perfect travel package based on their needs, budget, and interests.

## AVAILABLE PACKAGES:
${packageList || 'Various travel packages are available for Sikkim monastery tours.'}

## IMPORTANT INFORMATION ABOUT SIKKIM (You MUST explain these when asked or when relevant):

### PERMITS & DOCUMENTATION:
- Inner Line Permit (ILP) is MANDATORY for all visitors to Sikkim (except Indian nationals from some states)
- ILP can be obtained at Rangpo, Melli, or Jorethang checkpoints
- For foreign nationals: Restricted Area Permit (RAP) required for certain areas
- Carry valid ID proof (Aadhar, Passport, Voter ID)
- Keep multiple photocopies of permits and ID

### BEST TIME TO VISIT:
- March to May: Spring season, pleasant weather, clear views
- October to December: Autumn/Winter, best for mountain views, festivals
- June to September: Monsoon season, heavy rainfall, landslides possible
- January to February: Cold but clear skies, fewer tourists

### WEATHER & CLOTHING:
- Temperature ranges from 5°C to 25°C depending on season and altitude
- Pack warm clothes, layers are essential
- Rain gear (umbrella/raincoat) especially during monsoon
- Comfortable walking shoes for monastery visits
- Sunscreen and sunglasses (high altitude = strong UV rays)
- Warm jacket, gloves, and cap for higher altitudes

### ALTITUDE & HEALTH:
- Gangtok is at 1,650m altitude
- Some monasteries are at 2,000-3,000m
- Acclimatize gradually, stay hydrated
- Watch for altitude sickness symptoms (headache, nausea, dizziness)
- Carry basic medicines, first aid kit
- Consult doctor if you have heart/lung conditions

### MONASTERY ETIQUETTE & RULES:
- Remove shoes before entering prayer halls
- Dress modestly (covered shoulders and knees)
- No photography inside prayer halls (check signs)
- Maintain silence and respect during prayers
- Walk clockwise around stupas and prayer wheels
- Do not point feet towards altars or monks
- Ask permission before taking photos of monks
- Donations are appreciated but not mandatory

### CULTURAL SENSITIVITY:
- Sikkim is a Buddhist state - respect local customs
- Greet with "Namaste" or "Tashi Delek" (Tibetan greeting)
- Remove hats inside monasteries
- Don't touch religious artifacts without permission
- Be respectful during prayer ceremonies
- Learn basic phrases: "Thank you" = "Dhanyabad" or "Thukjeche"

### TRANSPORTATION:
- Shared taxis and buses available
- Private taxis can be hired for day trips
- Roads can be narrow and winding - motion sickness possible
- Book transportation in advance during peak season
- Some remote monasteries require 4WD vehicles

### CURRENCY & PAYMENTS:
- Indian Rupees (INR) is the currency
- ATMs available in Gangtok and major towns
- Carry cash for remote areas and small shops
- Credit cards accepted in hotels and restaurants in cities
- UPI payments work in most places

### FOOD & DRINKS:
- Try local Sikkimese cuisine: momos, thukpa, gundruk
- Tibetan food widely available
- Bottled water recommended
- Avoid tap water, especially in remote areas
- Many restaurants serve vegetarian options
- Alcohol available but consume responsibly

### SAFETY TIPS:
- Register with local authorities if trekking
- Inform someone about your travel plans
- Keep emergency contacts handy
- Be cautious on mountain roads, especially during monsoon
- Respect wildlife and maintain distance
- Follow local guidelines for protected areas

### WHAT TO PACK:
- Warm clothing and layers
- Comfortable walking shoes
- Rain gear
- Sunscreen and sunglasses
- Basic medicines and first aid
- Power bank (electricity can be intermittent)
- Camera (with permission)
- Cash in small denominations
- Copies of permits and ID

### LANGUAGE:
- Nepali, Hindi, and English are widely spoken
- Tibetan language in monasteries
- Learn basic greetings: "Namaste", "Tashi Delek", "Dhanyabad"

### ELECTRICITY & CONNECTIVITY:
- 230V, Type C/D plugs (Indian standard)
- Mobile network available in cities, limited in remote areas
- WiFi available in hotels and cafes
- Carry power bank for remote areas

## STRICT RULES (YOU MUST FOLLOW):
1. You can ONLY answer questions about:
   - Travel packages for Sikkim monastery tours
   - Package details, pricing, features, and inclusions
   - Recommendations based on budget, duration, or interests
   - Sikkim tourism, monasteries, and spiritual journeys
   - Travel planning, accommodations, and itineraries
   - General information about Sikkim as a travel destination
   - Important pre-visit information (permits, weather, health, etiquette, etc.)

2. When visitors ask about "what to know before visiting" or "important things", proactively share the key information above.

3. If someone asks about ANYTHING outside your role (like coding, politics, general knowledge, math, science, news, celebrities, other unrelated topics), you MUST politely decline and redirect them back to travel packages.

4. NEVER provide information outside your knowledge base.

5. NEVER break character or acknowledge being an AI/language model.

6. If unsure about specific package details, suggest they check the package listings above or contact our travel experts.

7. Be warm, helpful, and enthusiastic about helping visitors plan their spiritual journey.

## RESPONSE STYLE:
- Speak naturally as a travel consultant would
- Keep responses concise (2-4 sentences for simple questions)
- Be warm, welcoming, and enthusiastic
- When explaining important information, be clear and organized
- Do NOT use markdown, bullet points, or special formatting unless necessary
- Speak as if talking to a customer in person

## EXAMPLE REDIRECTIONS:
- "I'm here to help you find the perfect Sikkim monastery tour package! What kind of experience are you looking for?"
- "That's outside my expertise as a travel consultant. Would you like to know about our available packages for monastery tours?"
- "I specialize in travel packages for Sikkim. Is there a specific package or type of tour you're interested in?"

Remember: You are ONLY a travel package consultant. Stay in your role at all times!`;
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
        model: 'llama-3.3-70b-versatile',
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

interface PackagesChatbotProps {
  packages?: any[];
  className?: string;
}

const PackagesChatbot: React.FC<PackagesChatbotProps> = ({ packages = [], className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<ChatMessage[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [textInput, setTextInput] = useState('');

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize system prompt with packages
  useEffect(() => {
    const systemMessage: Message = {
      role: 'system',
      content: generateSystemPrompt(packages)
    };
    setMessages([systemMessage]);
    
    // Add welcome message only once
    if (conversationHistory.length === 0 && packages.length > 0) {
      setConversationHistory([{
        role: 'assistant',
        text: 'Namaste! 🙏 Welcome! I\'m your travel assistant for Sikkim monastery tours. I can help you find the perfect package and answer questions about visiting Sikkim - including permits, weather, monastery etiquette, and more. What would you like to know?',
        timestamp: new Date()
      }]);
    } else if (conversationHistory.length === 0) {
      setConversationHistory([{
        role: 'assistant',
        text: 'Namaste! 🙏 Welcome! I\'m here to help you with Sikkim monastery tour packages. I can assist with package selection, travel planning, and important information about visiting Sikkim. How can I help you today?',
        timestamp: new Date()
      }]);
    }
  }, [packages]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      const container = chatContainerRef.current;
      const isNearBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 100;
      
      if (isNearBottom) {
        container.scrollTop = container.scrollHeight;
      }
    }
  }, [conversationHistory]);

  // Prevent page scroll when scrolling inside chatbot
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      const chatContainer = chatContainerRef.current;
      
      // Check if the event is inside chatbot
      if (chatContainer && (chatContainer.contains(target) || target === chatContainer)) {
        const isScrollable = chatContainer.scrollHeight > chatContainer.clientHeight;
        const isAtTop = chatContainer.scrollTop === 0;
        const isAtBottom = chatContainer.scrollTop + chatContainer.clientHeight >= chatContainer.scrollHeight - 1;
        
        // Prevent page scroll if we can scroll in chatbot
        if (isScrollable && (!isAtTop || e.deltaY > 0) && (!isAtBottom || e.deltaY < 0)) {
          e.stopPropagation();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('wheel', handleWheel, { passive: false });
      return () => {
        document.removeEventListener('wheel', handleWheel);
      };
    }
  }, [isOpen]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  // Handle user query
  const handleUserQuery = async (query: string) => {
    if (!query.trim()) return;

    setError(null);
    const userMessage: Message = { role: 'user', content: query };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    // Add user message to conversation
    setConversationHistory(prev => [...prev, { role: 'user', text: query, timestamp: new Date() }]);
    setTextInput('');
    setIsProcessing(true);

    try {
      // Call Groq API
      const responseText = await callGroqAPI(updatedMessages);

      // Add assistant response to messages
      const assistantMessage: Message = { role: 'assistant', content: responseText };
      setMessages(prev => [...prev, assistantMessage]);

      // Add to UI conversation
      setConversationHistory(prev => [...prev, { role: 'assistant', text: responseText, timestamp: new Date() }]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get response';
      setError(errorMessage);
      setConversationHistory(prev => [...prev, {
        role: 'assistant',
        text: 'I apologize, I encountered an issue. Please try again or check if the Groq API key is configured.',
        timestamp: new Date()
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textInput.trim() && !isProcessing) {
      handleUserQuery(textInput.trim());
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  // Debug: Log when component renders
  useEffect(() => {
    console.log('PackagesChatbot rendered', { isOpen, packagesCount: packages.length });
  }, [isOpen, packages.length]);

  return (
    <>
      {/* Chat Button - Always show when closed */}
      {!isOpen && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="fixed bottom-4 right-4 z-[9999]"
        >
          <Button
            onClick={toggleChat}
            size="lg"
            className="rounded-full h-14 w-14 shadow-2xl bg-gradient-to-r from-primary to-monastery-gold hover:from-primary/90 hover:to-monastery-gold/90 text-white"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </motion.div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "fixed bottom-4 right-4 w-96 h-[600px] flex flex-col bg-background border border-border rounded-lg shadow-2xl overflow-hidden z-[9999]",
            isMinimized && "h-16"
          )}
          style={{ position: 'fixed' }}
          onWheel={(e) => {
            // Prevent page scroll when interacting with chatbot
            e.stopPropagation();
          }}
          onTouchMove={(e) => {
            // Prevent page scroll on mobile
            e.stopPropagation();
          }}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary via-primary/95 to-monastery-gold text-white shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-base text-white">Package Assistant</h3>
                  <p className="text-xs text-white/80">Sikkim Travel Expert</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="h-8 w-8 p-0 text-white hover:bg-white/20"
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleChat}
                  className="h-8 w-8 p-0 text-white hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Chat Messages */}
                <div
                  ref={chatContainerRef}
                  className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-muted/20 via-background to-muted/10"
                  style={{ 
                    scrollBehavior: 'smooth',
                    overscrollBehavior: 'contain'
                  }}
                  onWheel={(e) => {
                    const container = chatContainerRef.current;
                    if (container) {
                      const { scrollTop, scrollHeight, clientHeight } = container;
                      const isAtTop = scrollTop === 0;
                      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
                      
                      // If we can scroll in the container, prevent page scroll
                      if ((!isAtTop && e.deltaY < 0) || (!isAtBottom && e.deltaY > 0)) {
                        e.stopPropagation();
                      }
                    } else {
                      e.stopPropagation();
                    }
                  }}
                  onTouchMove={(e) => {
                    // Prevent page scroll on mobile
                    e.stopPropagation();
                  }}
                  onScroll={(e) => {
                    // Prevent scroll event from bubbling to page
                    e.stopPropagation();
                  }}
                >
                  {conversationHistory.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={cn(
                        "flex items-end gap-2",
                        msg.role === 'user' ? 'justify-end' : 'justify-start'
                      )}
                    >
                      {msg.role === 'assistant' && (
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-monastery-gold flex items-center justify-center shadow-md">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                      )}
                      <div className="flex flex-col max-w-[75%]">
                        <div
                          className={cn(
                            "rounded-2xl px-4 py-3 shadow-sm",
                            msg.role === 'user'
                              ? 'bg-white dark:bg-white border border-gray-200 dark:border-gray-300 text-gray-900 rounded-br-sm'
                              : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-foreground rounded-bl-sm'
                          )}
                        >
                          <p className={cn(
                            "text-sm leading-relaxed whitespace-pre-wrap",
                            msg.role === 'user' ? 'text-gray-900' : ''
                          )}>{msg.text}</p>
                        </div>
                        {msg.timestamp && (
                          <span className={cn(
                            "text-xs mt-1 px-2",
                            msg.role === 'user' ? 'text-right text-muted-foreground' : 'text-left text-muted-foreground'
                          )}>
                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        )}
                      </div>
                      {msg.role === 'user' && (
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-monastery-gold to-primary flex items-center justify-center shadow-md">
                          <User className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </motion.div>
                  ))}

                  {isProcessing && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-end gap-2 justify-start"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-monastery-gold flex items-center justify-center shadow-md">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin text-primary" />
                          <span className="text-xs text-muted-foreground">Typing...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {error && (
                    <div className="flex justify-start">
                      <div className="bg-destructive/10 border border-destructive rounded-lg px-4 py-2">
                        <p className="text-sm text-destructive">{error}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <form 
                  onSubmit={handleSubmit} 
                  className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gradient-to-r from-background to-muted/20"
                  onWheel={(e) => e.stopPropagation()}
                  onTouchMove={(e) => e.stopPropagation()}
                >
                  <div className="flex gap-2 items-center">
                    <input
                      ref={inputRef}
                      type="text"
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      placeholder="Ask about packages, permits, weather, or anything about Sikkim..."
                      className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-foreground placeholder:text-muted-foreground transition-all"
                      disabled={isProcessing}
                      onWheel={(e) => e.stopPropagation()}
                      onTouchMove={(e) => e.stopPropagation()}
                    />
                    <Button
                      type="submit"
                      disabled={!textInput.trim() || isProcessing}
                      className="rounded-full h-11 w-11 p-0 bg-gradient-to-r from-primary to-monastery-gold hover:from-primary/90 hover:to-monastery-gold/90 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? (
                        <Loader2 className="h-4 w-4 animate-spin text-white" />
                      ) : (
                        <Send className="h-4 w-4 text-white" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 px-2">
                    Ask about packages, permits, weather, monastery etiquette, or travel tips
                  </p>
                </form>
              </>
            )}
          </motion.div>
        )}
    </>
  );
};

export default PackagesChatbot;

