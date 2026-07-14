'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Mail, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setSubmitted(true);
      setIsLoading(false);
    }, 500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-lg shadow-lg border border-border p-8 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Check your email</h1>
            <p className="text-muted-foreground mb-6">
              We&apos;ve sent a password reset link to {email}. Click the link to set a new password.
            </p>

            <Button onClick={() => router.push('/auth/login')} className="w-full mb-3">
              Back to Sign In
            </Button>
            <button
              onClick={() => setSubmitted(false)}
              className="w-full py-2 px-4 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              Try another email
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-lg shadow-lg border border-border p-8">
          <button
            onClick={() => router.push('/auth/login')}
            className="flex items-center text-primary hover:text-primary/80 mb-6 font-medium"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Login
          </button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Reset password</h1>
            <p className="text-muted-foreground">Enter your email address and we&apos;ll send you a link to reset your password</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                />
              </div>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Remember your password?{' '}
            <Link href="/auth/login" className="text-primary hover:text-primary/80 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
