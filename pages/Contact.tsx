"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { WorldMap } from "@/components/worldmap";
import { motion, AnimatePresence } from "motion/react";
import emailjs from "@emailjs/browser";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter valid email";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Minimum 10 characters required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (!formRef.current) return;

    setLoading(true);

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(
        () => {
          setLoading(false);

          gsap.to(formRef.current, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => setSubmitted(true),
          });

          formRef.current?.reset();
        },
        (error) => {
          console.error(error);
          setLoading(false);
          alert("Failed to send message");
        }
      );
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", message: "" });
    setErrors({});
    setSubmitted(false);
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="min-h-screen bg-black py-20 p-10"
    >
      <div className="max-w-6xl pt-20 mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* LEFT SIDE */}
        <div>
          <h2 className="font-bold text-3xl md:text-4xl text-white">
            Let's{" "}
            <span className="text-neon-blue">
              {"Connect".split("").map((letter, idx) => (
                <motion.span
                  key={idx}
                  className="inline-block"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.04 }}
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          </h2>

          <p className="text-sm md:text-base text-slate-100 mt-4 leading-relaxed">
            Building digital experiences across the globe. Let’s connect and
            create something impactful.
          </p>

          <div className="mt-6 h-[220px] md:h-[300px] w-full">
            <WorldMap dots={[ { start: { lat: 64.2008, lng: -149.4937 }, end: { lat: 34.0522, lng: -118.2437 }, }, { start: { lat: 64.2008, lng: -149.4937 }, end: { lat: -15.7975, lng: -47.8919 }, }, { start: { lat: -15.7975, lng: -47.8919 }, end: { lat: 38.7223, lng: -9.1393 }, }, { start: { lat: 51.5074, lng: -0.1278 }, end: { lat: 28.6139, lng: 77.209 }, }, { start: { lat: 28.6139, lng: 77.209 }, end: { lat: 43.1332, lng: 131.9113 }, }, { start: { lat: 28.6139, lng: 77.209 }, end: { lat: -1.2921, lng: 36.8219 }, }, ]} />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              ref={formRef}
              onSubmit={sendEmail}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="w-full space-y-6 bg-neutral-900/40 backdrop-blur-md p-6 md:p-8 rounded-xl border border-neutral-800"
            >
              {/* NAME */}
              <div>
                <label className="text-white">Name</label>
                <input
                  name="user_name"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full p-2 bg-gray-800 text-white rounded"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-white">Email</label>
                <input
                  name="user_email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full p-2 bg-gray-800 text-white rounded"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              {/* MESSAGE */}
              <div>
                <label className="text-white">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full p-2 bg-gray-800 text-white rounded"
                  rows={5}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 py-3 rounded text-white font-bold hover:cursor-pointer"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-white text-center"
            >
              <h2 className="text-2xl font-bold mb-2">
                Message Sent 🚀
              </h2>
              <p className="mb-4">
                Thanks! I’ll get back to you soon.
              </p>

              <button
                onClick={handleReset}
                className="bg-white text-black px-6 py-2 rounded"
              >
                Send Another
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}