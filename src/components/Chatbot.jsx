import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';

const chatbotResponses = {
  "bonjour": "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
  "salut": "Salut ! Que puis-je faire pour vous ?",
  "aide": "Bien sûr. Vous pouvez me poser des questions sur MORICE, comment démarrer un dossier, ou sur le processus d'arbitrage.",
  "morice": "MORICE est une plateforme d'arbitrage virtuel qui utilise l'IA pour analyser des litiges et proposer des solutions équitables, conformément au droit québécois.",
  "dossier": "Pour démarrer un dossier, cliquez sur 'Démarrer une analyse' sur la page d'accueil. Vous devrez vous inscrire ou vous connecter, puis suivre les étapes pour soumettre votre cas.",
  "processus": "Le processus est simple : 1. Soumettez votre dossier. 2. Notre IA analyse vos documents. 3. Vous répondez à quelques questions de clarification. 4. Vous recevez un rapport complet.",
  "coût": "L'analyse initiale d'un dossier est soumise à des frais de traitement. Pour plus de détails, veuillez consulter notre page de tarification (bientôt disponible).",
  "avocat": "MORICE ne remplace pas un avocat, mais peut servir d'outil pour vous et votre conseiller juridique. Vous pouvez indiquer si vous êtes représenté par un avocat lors de l'inscription.",
  "sécurité": "La sécurité de vos données est notre priorité. Toutes les informations sont chiffrées et traitées de manière confidentielle.",
  "default": "Je ne suis pas sûr de comprendre. Pouvez-vous reformuler ? Vous pouvez demander 'aide' pour voir ce que je peux faire."
};

const getBotResponse = (userMessage) => {
  const msg = userMessage.toLowerCase();
  if (msg.includes("bonjour") || msg.includes("salut")) return chatbotResponses.bonjour;
  if (msg.includes("aide")) return chatbotResponses.aide;
  if (msg.includes("morice")) return chatbotResponses.morice;
  if (msg.includes("dossier") || msg.includes("commencer")) return chatbotResponses.dossier;
  if (msg.includes("processus") || msg.includes("comment ça marche")) return chatbotResponses.processus;
  if (msg.includes("coût") || msg.includes("prix") || msg.includes("tarif")) return chatbotResponses.coût;
  if (msg.includes("avocat")) return chatbotResponses.avocat;
  if (msg.includes("sécurité") || msg.includes("confidentiel")) return chatbotResponses.sécurité;
  return chatbotResponses.default;
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Bonjour ! Je suis l\'assistant virtuel de MORICE. Comment puis-je vous aider ?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const userMessage = { sender: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    setTimeout(() => {
      const botResponse = { sender: 'bot', text: getBotResponse(inputValue) };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, type: 'spring' }}
        >
          <Button
            onClick={handleToggle}
            className="rounded-full w-16 h-16 bg-primary-blue hover:bg-accent-cyan shadow-lg"
          >
            <AnimatePresence>
              {isOpen ? (
                <motion.div key="close" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <X className="w-8 h-8" />
                </motion.div>
              ) : (
                <motion.div key="open" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <MessageSquare className="w-8 h-8" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-50 w-full max-w-sm"
          >
            <div className="glass-effect rounded-xl shadow-2xl flex flex-col h-[60vh]">
              <header className="p-4 border-b border-dark-border flex items-center space-x-3">
                <Bot className="w-7 h-7 text-primary-blue" />
                <div>
                  <h3 className="font-bold text-text-primary text-lg">Assistant MORICE</h3>
                  <p className="text-xs text-success-green flex items-center">
                    <span className="w-2 h-2 bg-success-green rounded-full mr-1.5"></span>
                    En ligne
                  </p>
                </div>
              </header>

              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.sender === 'bot' && <Bot className="w-6 h-6 text-primary-blue flex-shrink-0" />}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`max-w-[80%] p-3 rounded-xl ${msg.sender === 'user' ? 'bg-primary-blue text-white rounded-br-none' : 'bg-dark-bg text-text-primary rounded-bl-none'}`}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </motion.div>
                     {msg.sender === 'user' && <User className="w-6 h-6 text-text-secondary flex-shrink-0" />}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <footer className="p-4 border-t border-dark-border">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                  <Input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Posez votre question..."
                    className="flex-1"
                    autoComplete="off"
                  />
                  <Button type="submit" size="icon" className="btn-primary flex-shrink-0">
                    <Send className="w-5 h-5" />
                  </Button>
                </form>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;