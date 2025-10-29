'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, Check, AlertCircle } from 'lucide-react';

interface NewsletterFormProps {
  placeholder?: string;
  buttonText?: string;
  successMessage?: string;
  errorMessage?: string;
}

export function NewsletterForm({
  placeholder = 'Enter your email',
  buttonText = 'Subscribe',
  successMessage = 'Thanks for subscribing!',
  errorMessage = 'Please enter a valid email',
}: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      return;
    }

    setStatus('loading');

    // TODO: Implement actual newsletter subscription (e.g., with Mailchimp, ConvertKit, etc.)
    // For now, we'll simulate an API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      
      // Reset after 3 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="email"
            placeholder={placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading' || status === 'success'}
            className="pl-10"
            required
          />
        </div>
        <Button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="whitespace-nowrap"
        >
          {status === 'loading' && 'Subscribing...'}
          {status === 'success' && (
            <>
              <Check className="h-4 w-4 mr-2" />
              Subscribed!
            </>
          )}
          {(status === 'idle' || status === 'error') && buttonText}
        </Button>
      </div>
      
      {status === 'success' && (
        <p className="text-sm text-mint mt-2 flex items-center gap-1">
          <Check className="h-4 w-4" />
          {successMessage}
        </p>
      )}
      
      {status === 'error' && (
        <p className="text-sm text-destructive mt-2 flex items-center gap-1">
          <AlertCircle className="h-4 w-4" />
          {errorMessage}
        </p>
      )}
    </form>
  );
}

