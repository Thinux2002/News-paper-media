"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, Check, Send } from "lucide-react";

interface QuoteDialogProps {
  trigger?: React.ReactElement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultService?: string;
}

export function QuoteDialog({ trigger, open, onOpenChange, defaultService = "Photography" }: QuoteDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: defaultService,
    budget: "$1,000 - $5,000",
    details: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const activeOpen = open !== undefined ? open : isOpen;
  const activeSetOpen = onOpenChange !== undefined ? onOpenChange : setIsOpen;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset form after delay
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: defaultService,
          budget: "$1,000 - $5,000",
          details: "",
        });
        activeSetOpen(false);
      }, 2000);
    }, 1500);
  };

  return (
    <Dialog open={activeOpen} onOpenChange={activeSetOpen}>
      {trigger && <DialogTrigger render={trigger} />}
      
      <DialogContent className="sm:max-w-lg bg-[#0a0a0c] border-[#222] text-[#f3f4f6] p-6 rounded-2xl ring-1 ring-[#e50914]/20 shadow-2xl">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#e50914]" />
            GET A QUOTE
          </DialogTitle>
          <DialogDescription className="text-zinc-400 text-sm">
            Tell us about your project requirements and budget. Our team will get back to you within 24 hours.
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 animate-in fade-in-50 duration-300">
            <div className="bg-[#e50914]/10 border border-[#e50914]/30 p-4 rounded-full text-[#e50914] animate-bounce">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <div className="space-y-1">
              <h3 className="font-extrabold text-xl text-white">Proposal Request Received!</h3>
              <p className="text-zinc-400 text-sm max-w-xs mx-auto">
                Thank you, {formData.name}. Our media specialists are preparing your customized brief.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 py-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="quote-name" className="text-zinc-300 text-xs font-semibold uppercase tracking-wider">Full Name</Label>
                <Input
                  id="quote-name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-[#121215] border-[#2a2a30] focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914]/30 text-white rounded-lg h-10 placeholder:text-zinc-600"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="quote-email" className="text-zinc-300 text-xs font-semibold uppercase tracking-wider">Email Address</Label>
                <Input
                  id="quote-email"
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-[#121215] border-[#2a2a30] focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914]/30 text-white rounded-lg h-10 placeholder:text-zinc-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="quote-phone" className="text-zinc-300 text-xs font-semibold uppercase tracking-wider">Phone Number</Label>
                <Input
                  id="quote-phone"
                  name="phone"
                  type="tel"
                  placeholder="+94 77 123 4567"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="bg-[#121215] border-[#2a2a30] focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914]/30 text-white rounded-lg h-10 placeholder:text-zinc-600"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="quote-service" className="text-zinc-300 text-xs font-semibold uppercase tracking-wider">Required Service</Label>
                <div className="relative">
                  <select
                    id="quote-service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-[#121215] border border-[#2a2a30] focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914]/30 text-white rounded-lg h-10 px-3 text-sm outline-none appearance-none cursor-pointer"
                  >
                    <option value="Photography">Photography</option>
                    <option value="Videography">Videography</option>
                    <option value="Branding">Branding</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Website Development">Website Development</option>
                    <option value="Podcast">Podcast</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-400">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="quote-budget" className="text-zinc-300 text-xs font-semibold uppercase tracking-wider">Estimated Budget (USD)</Label>
              <div className="relative">
                <select
                  id="quote-budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full bg-[#121215] border border-[#2a2a30] focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914]/30 text-white rounded-lg h-10 px-3 text-sm outline-none appearance-none cursor-pointer"
                >
                  <option value="Under $1,000">Under $1,000</option>
                  <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                  <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                  <option value="$10,000+">$10,000+ (Enterprise)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="quote-details" className="text-zinc-300 text-xs font-semibold uppercase tracking-wider">Project Details</Label>
              <textarea
                id="quote-details"
                name="details"
                rows={3}
                placeholder="Describe your goals, timeframe, or details about the creative shoot..."
                value={formData.details}
                onChange={handleChange}
                required
                className="w-full bg-[#121215] border border-[#2a2a30] focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914]/30 text-white rounded-lg p-3 text-sm outline-none resize-none placeholder:text-zinc-600"
              />
            </div>

            <DialogFooter className="mt-4 sm:mt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#e50914] hover:bg-[#b8070f] text-white font-bold h-11 rounded-lg shadow-lg shadow-[#e50914]/20 flex items-center justify-center gap-2 cursor-pointer transition-all duration-300"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    Processing Brief...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Request
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
