import ChatIcon from '@mui/icons-material/Chat';
import MinimizeIcon from '@mui/icons-material/Remove';
import SendIcon from '@mui/icons-material/Send';
import { Box, Collapse, IconButton, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const chatLogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      const response = await fetch('/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      if (data.assistant_message) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.assistant_message }]);
      }
    } catch (err) {
      console.error('Error:', err);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error: Unable to connect to server.' }]);
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
        bottom: 20,
        right: 20,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
      }}
    >
      <Collapse in={isOpen} orientation="vertical" timeout={300}>
        <Paper
          elevation={3}
          sx={{
            width: 320,
            height: 450,
            mb: 2,
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
        }}
      >
        <ChatIcon />
      </IconButton>
    </Box>
  );
};

export default ChatBot;