import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema } from "@shared/schema";
import type { Profile, InsertContact } from "@shared/schema";
import { Mail, Phone, MapPin, Linkedin, Github, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function ContactSection() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: profile, isLoading: profileLoading } = useQuery<Profile>({
    queryKey: ['/api/profile'],
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      const response = await apiRequest('POST', '/api/contact', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "I'll get back to you soon.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: InsertContact) => {
    contactMutation.mutate(data);
  };

  if (profileLoading) {
    return (
      <section id="contact" className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-10 bg-slate-200 rounded animate-pulse mb-4 max-w-md mx-auto"></div>
            <div className="h-6 bg-slate-200 rounded animate-pulse max-w-xs mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="h-8 bg-slate-200 rounded animate-pulse"></div>
              <div className="h-32 bg-slate-200 rounded animate-pulse"></div>
            </div>
            <div className="h-96 bg-slate-200 rounded animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center bg-muted/30 relative animate-fade-in">
      <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 drop-shadow-lg">Get In Touch</h2>
          <p className="text-lg text-muted-foreground">Let's build the next mobile innovation together</p>
        </div>
        <div className="flex flex-col space-y-12 max-w-xl mx-auto">
          <div className="animate-slide-in-left text-left">
            <h3 className="text-2xl font-semibold text-foreground mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Contact Information</h3>
            <div className="flex flex-col gap-6 w-full">
              <div className="glass p-4 rounded-xl flex items-center gap-4 shadow-lg hover:shadow-primary/20 transition-all duration-300 focus-within:outline focus-within:outline-2 focus-within:outline-primary focus-within:outline-offset-2">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Mail className="text-primary text-xl" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Email</p>
                  <p className="text-muted-foreground break-all">{profile?.email}</p>
                </div>
              </div>
              <div className="glass p-4 rounded-xl flex items-center gap-4 shadow-lg hover:shadow-accent/20 transition-all duration-300 focus-within:outline focus-within:outline-2 focus-within:outline-accent focus-within:outline-offset-2">
                <div className="bg-accent/10 p-3 rounded-lg">
                  <Phone className="text-accent text-xl" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Phone</p>
                  <p className="text-muted-foreground">{profile?.phone}</p>
                </div>
              </div>
              <div className="glass p-4 rounded-xl flex items-center gap-4 shadow-lg hover:shadow-primary/20 transition-all duration-300 focus-within:outline focus-within:outline-2 focus-within:outline-primary focus-within:outline-offset-2">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <MapPin className="text-primary text-xl" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Location</p>
                  <p className="text-muted-foreground">{profile?.location}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="animate-slide-in-left text-left">
            <h3 className="text-2xl font-semibold text-foreground mb-6 bg-gradient-to-r from-teal-500 to-emerald-600 bg-clip-text text-transparent">Connect With Me</h3>
            <div className="flex space-x-6">
              <a
                href="https://www.linkedin.com/in/talal-rafiq-8bb8b9275/"
                target="_blank"
                rel="noopener noreferrer"
                className="glass bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary p-3 rounded-lg transition-all duration-200 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
              >
                <Linkedin className="text-xl" />
              </a>
              <a
                href="https://github.com/dedsec-ux"
                target="_blank"
                rel="noopener noreferrer"
                className="glass bg-accent/10 hover:bg-accent hover:text-accent-foreground text-accent p-3 rounded-lg transition-all duration-200 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
              >
                <Github className="text-xl" />
              </a>
              <a
                href="https://www.instagram.com/itx_txr/"
                target="_blank"
                rel="noopener noreferrer"
                className="glass bg-accent/10 hover:bg-accent hover:text-accent-foreground text-accent p-3 rounded-lg transition-all duration-200 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
              >
                <Instagram className="text-xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
