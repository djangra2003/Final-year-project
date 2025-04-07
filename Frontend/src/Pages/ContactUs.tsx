"use client"

import { Email, Phone } from "@mui/icons-material"
import { Alert, Box, Button, Card, CardContent, Container, Snackbar, TextField, Typography } from "@mui/material"
import type React from "react"
import { useState } from "react"
import Footer from "../Components/Footer"
import Header from "../Components/Header"
import HeroSection from "../Components/HeroSection"

const ContactUs: React.FC = () => {
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
    <Box className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <HeroSection title="Need Assistance?" subtitle="We're Just a Message Away!" />
      <Container maxWidth="lg" className="flex-grow py-12">
        <Box className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Content */}
          <Box className="space-y-8">
            <Box className="space-y-4">
              <Typography variant="body1" className="text-gray-600 leading-relaxed">
                We would love to hear from you! Whether you have a query, suggestion, or collaboration request, feel
                free to reach out to us. Your thoughts and feedback are invaluable in helping us enhance our platform
                and bring you the best beach travel experience. If you have recommendations for new destinations,
                insider tips, or simply want to share your travel stories, we're all ears!
              </Typography>
              <Typography variant="body1" className="text-gray-600 leading-relaxed">
                We strive to provide prompt responses and assist you with all your beach-related inquiries. Whether you
                need travel advice, accommodation recommendations, or help planning your perfect beach getaway, our team
                is here to support you every step of the way.
              </Typography>
            </Box>

            <Box className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white shadow-md">
                <CardContent className="p-4">
                  <Typography variant="h6" className="font-semibold mb-2">
                    Customer Support
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    Our support team is available around the clock to address any concerns or queries you may have.
                  </Typography>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md">
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

              <Card className="bg-white shadow-md">
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
          <Card elevation={3} className="bg-white p-6 shadow-lg">
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
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  className="bg-blue-600 hover:bg-blue-700 py-3 text-white"
                  disabled={isSubmitting}
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
