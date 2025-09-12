import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Send,
  Twitter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);

    const form = e.target;
    const formDataObj = new FormData(form);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataObj,
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Message sent! ✅",
          description: "Thank you for your message. I'll get back to you soon.",
        });
        form.reset(); // Clear the form fields on success
        setFormData({ name: "", email: "", message: "" }); // Reset form state
      } else {
        toast({
          title: "Something went wrong! 😔",
          description: data.message || "An error occurred while sending your message.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Network error",
        description: "Please check your internet connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Get In <span className="text-primary"> Touch</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Have a project in mind or want to collaborate? Feel free to reach out.
          I'm always open to discussing new opportunities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold mb-6">
              Contact Information
            </h3>

            <div className="space-y-6 justify-center">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium"> Email</h4>
                  <a
                    href="mailto:aliultan877@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    aliultan877@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium"> Location</h4>
                  <span className="text-muted-foreground">
                    Delhi, India
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <h4 className="font-medium mb-4 text-center"> Connect With Me</h4>
              <div className="flex space-x-4 justify-center">
                <a 
                  href="https://www.linkedin.com/in/alishfaq/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Visit LinkedIn profile"
                  className="text-foreground/80 hover:text-primary transition-colors"
                >
                  <Linkedin size={24} />
                </a>
                <a 
                  href="https://x.com/alishfaq007?t=PWFJqm3dSCs23UYZhB7Zvg&s=09" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Visit Twitter profile"
                  className="text-foreground/80 hover:text-primary transition-colors"
                >
                  <Twitter size={24} />
                </a>
                <a 
                  href="https://www.instagram.com/alishfaq001?igsh=MnNwaG9ndDZlbTV4" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Visit Instagram profile"
                  className="text-foreground/80 hover:text-primary transition-colors"
                >
                  <Instagram size={24} />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-card p-8 rounded-lg shadow-xs">
            <h3 className="text-2xl font-semibold mb-6"> Send a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input type="hidden" name="access_key" value="1825157d-06e3-4c72-a91f-ca889d703248"/>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={cn(
                    "w-full px-4 py-3 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary",
                    errors.name ? "border-red-500" : "border-input"
                  )}
                  placeholder="Name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={cn(
                    "w-full px-4 py-3 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary",
                    errors.email ? "border-red-500" : "border-input"
                  )}
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className={cn(
                    "w-full px-4 py-3 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none",
                    errors.message ? "border-red-500" : "border-input"
                  )}
                  placeholder="Hello, I'd like to talk about..."
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "cosmic-button w-full flex items-center justify-center gap-2"
                )}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};