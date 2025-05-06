import ChatIcon from '@mui/icons-material/Chat';
import MinimizeIcon from '@mui/icons-material/Remove';
import SendIcon from '@mui/icons-material/Send';
import { Box, Collapse, IconButton, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const GEMINI_API_KEY = 'AIzaSyDrMMEEtmiUcokCTyYQv94JZBqfS2LLDa0';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const chatLogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
  
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
  
    try {
      const response = await fetch('http://localhost:5000/api/chatbot/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Backend Error:', errorData);
        throw new Error(errorData.error || 'Failed to get response from backend');
      }
  
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
  
    } catch (err) {
      console.error('Error details:', err);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again in a moment.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: { xs: 0, sm: 20 },
        right: { xs: 0, sm: 20 },
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        width: { xs: '100%', sm: 'auto' }
      }}
    >
      <Collapse in={isOpen} orientation="vertical" timeout={300} sx={{ width: '100%' }}>
        <Paper
          elevation={3}
          sx={{
            width: { xs: '100%', sm: 320 },
            height: { xs: '100vh', sm: 450 },
            mb: { xs: 0, sm: 2 },
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              p: 2,
              backgroundColor: 'primary.main',
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6">Beach buddy</Typography>
            <IconButton
              size="small"
              sx={{ color: 'white' }}
              onClick={() => setIsOpen(false)}
            >
              <MinimizeIcon />
            </IconButton>
          </Box>

          <Box
            ref={chatLogRef}
            sx={{
              flex: 1,
              overflow: 'auto',
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
                  backgroundColor: message.role === 'user' ? 'primary.main' : 'grey.200',
                  color: message.role === 'user' ? 'white' : 'text.primary',
                  p: 1,
                  px: 2,
                  borderRadius: 2,
                  maxWidth: '80%',
                  wordBreak: 'break-word',
                }}
              >
                {message.content}
              </Box>
            ))}
          </Box>

          <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <IconButton color="primary" onClick={handleSend}>
                <SendIcon />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      </Collapse>

      <IconButton
        onClick={() => setIsOpen(true)}
        sx={{
          width: 56,
          height: 56,
          backgroundColor: 'primary.main',
          color: 'white',
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
          display: isOpen ? 'none' : 'flex',
          position: { xs: 'fixed', sm: 'static' },
          bottom: { xs: 20, sm: 'auto' },
          right: { xs: 20, sm: 'auto' },
        }}
      >
        <ChatIcon />
      </IconButton>
    </Box>
  );
};

export default ChatBot;