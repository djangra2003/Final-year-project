"use client"

import { Email, Phone } from "@mui/icons-material"
import { Alert, Box, Button, Card, CardContent, Container, Snackbar, TextField, Typography, useTheme } from "@mui/material"
import { motion } from "framer-motion"
import type React from "react"
import { useState } from "react"
import Footer from "../Components/Footer"
import Header from "../Components/Header"
import HeroSection from "../Components/HeroSection"

const ContactUs: React.FC = () => {
  const theme = useTheme()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  })
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [severity, setSeverity] = useState<"success" | "error">("success")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('http://localhost:5000/api/contacts/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSnackbarMessage("Message sent successfully! We'll get back to you soon.")
        setSeverity("success")
        setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" })
      } else {
        setSnackbarMessage(data.message || "Failed to send message. Please try again.")
        setSeverity("error")
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setSnackbarMessage("Failed to send message. Please try again later.")
      setSeverity("error")
    } finally {
      setIsSubmitting(false)
      setOpenSnackbar(true)
    }
  }

  return (
    <Box 
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col"
      sx={{
        background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.1) 100%)",
          pointerEvents: "none"
        }
      }}>
      <Header />
      <HeroSection title="Need Assistance?" subtitle="We're Just a Message Away!" />
      <Container maxWidth="lg" className="flex-grow py-12">
        <Box className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Content */}
          <Box className="space-y-8">
            <Box className="space-y-4">
              <Typography variant="body1" className="text-black-800 leading-relaxed">
                We would love to hear from you! Whether you have a query, suggestion, or collaboration request, feel
                free to reach out to us. Your thoughts and feedback are invaluable in helping us enhance our platform
                and bring you the best beach travel experience. If you have recommendations for new destinations,
                insider tips, or simply want to share your travel stories, we're all ears!
              </Typography>
              <Typography variant="body1" className="text-black-600 leading-relaxed">
                We strive to provide prompt responses and assist you with all your beach-related inquiries. Whether you
                need travel advice, accommodation recommendations, or help planning your perfect beach getaway, our team
                is here to support you every step of the way.
              </Typography>
            </Box>

            <Box className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card
                component={motion.div}
                variants={itemVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                sx={{
                  background: "linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)",
                  borderRadius: 2,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.3)"
                }}>
                <CardContent className="p-4">
                  <Typography variant="h6" className="font-semibold mb-2">
                    Customer Support
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    Our support team is available around the clock to address any concerns or queries you may have.
                  </Typography>
                </CardContent>
              </Card>

              <Card
                component={motion.div}
                variants={itemVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                sx={{
                  background: "linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)",
                  borderRadius: 2,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.3)"
                }}>
                <CardContent className="p-4">
                  <Typography variant="h6" className="font-semibold mb-2">
                    Feedback and Suggestions
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    We value your feedback and are continuously working to improve. Your input is crucial in shaping the
                    future Beach Buddy.
                  </Typography>
                </CardContent>
              </Card>

              <Card
                component={motion.div}
                variants={itemVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                sx={{
                  background: "linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)",
                  borderRadius: 2,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.3)"
                }}>
                <CardContent className="p-4">
                  <Typography variant="h6" className="font-semibold mb-2">
                    Media Inquiries
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    For media related questions or press inquiries, please contact us at media beachbuddy@gmail.com.
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Box>

          {/* Contact Form */}
          <Card
            component={motion.div}
            variants={itemVariants}
            elevation={3}
            sx={{
              background: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(10px)",
              borderRadius: 2,
              p: 6,
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              border: "1px solid rgba(255,255,255,0.3)"
            }}>
            <CardContent>
              <Typography variant="h5" className="font-semibold mb-6">
                Get in Touch
              </Typography>
              <Typography variant="subtitle1" className="text-gray-600 mb-6">
                You can reach us anytime
              </Typography>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    variant="outlined"
                    required
                  />
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    variant="outlined"
                    required
                  />
                </Box>

                <TextField
                  fullWidth
                  label="Your Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  InputProps={{
                    startAdornment: <Email className="text-gray-400 mr-2" />,
                  }}
                />

                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  InputProps={{
                    startAdornment: <Phone className="text-gray-400 mr-2" />,
                  }}
                />

                <TextField
                  fullWidth
                  label="How can we help?"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  variant="outlined"
                  required
                />

                <Button
                  component={motion.button}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={isSubmitting}
                  sx={{
                    background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
                    color: "white",
                    py: 1.5,
                    mt: 2,
                    "&:hover": {
                      background: "linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)"
                    }
                  }}
                >
                  {isSubmitting ? "Sending..." : "Submit"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Container>

      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert 
          severity={severity} 
          onClose={() => setOpenSnackbar(false)}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Footer />
    </Box>
  )
}

export default ContactUs
