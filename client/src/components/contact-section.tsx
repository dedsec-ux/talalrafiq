import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema } from "@shared/schema";
import type { Profile, InsertContact } from "@shared/schema";
import { Mail, Phone, MapPin, Linkedin, Github, Twitter } from "lucide-react";
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
    <section id="contact" className="py-20 bg-muted/30 relative">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Get In Touch</h2>
          <p className="text-lg text-muted-foreground">Let's build the next mobile innovation together</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="bg-primary/10 p-3 rounded-lg mr-4">
                  <Mail className="text-primary text-xl" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">Email</p>
                  <p className="text-slate-600">{profile?.email}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-primary/10 p-3 rounded-lg mr-4">
                  <Phone className="text-primary text-xl" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">Phone</p>
                  <p className="text-slate-600">{profile?.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-primary/10 p-3 rounded-lg mr-4">
                  <MapPin className="text-primary text-xl" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">Location</p>
                  <p className="text-slate-600">{profile?.location}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="font-semibold text-slate-900 mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="bg-primary text-white p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Linkedin className="text-xl" />
                </a>
                <a
                  href="#"
                  className="bg-slate-800 text-white p-3 rounded-lg hover:bg-slate-700 transition-colors duration-200"
                >
                  <Github className="text-xl" />
                </a>
                <a
                  href="#"
                  className="bg-blue-400 text-white p-3 rounded-lg hover:bg-blue-500 transition-colors duration-200"
                >
                  <Twitter className="text-xl" />
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name
                </Label>
                <Input
                  id="name"
                  {...form.register("name")}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                />
                {form.formState.errors.name && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...form.register("email")}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                />
                {form.formState.errors.email && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                  Subject
                </Label>
                <Input
                  id="subject"
                  {...form.register("subject")}
                  placeholder="Project discussion"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                />
                {form.formState.errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.subject.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                  Message
                </Label>
                <Textarea
                  id="message"
                  rows={5}
                  {...form.register("message")}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
                />
                {form.formState.errors.message && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.message.message}</p>
                )}
              </div>
              
              <Button
                type="submit"
                disabled={contactMutation.isPending}
                className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                {contactMutation.isPending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
