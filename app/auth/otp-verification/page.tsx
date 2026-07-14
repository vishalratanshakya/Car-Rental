'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function OTPVerificationPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`)?.focus();
      }
    }
  };

  const handleBackspace = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.join('').length === 6) {
      setIsLoading(true);
      setTimeout(() => {
        router.push('/');
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-lg shadow-lg border border-border p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">Verify your email</h1>
            <p className="text-muted-foreground">We&apos;ve sent a 6-digit code to your email address</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-4">Enter verification code</label>
              <div className="flex gap-2 justify-between">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    onKeyDown={(e) => handleBackspace(index, e)}
                    className="w-12 h-12 border-2 border-border rounded-lg text-center text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                  />
                ))}
              </div>
            </div>

            <Button type="submit" disabled={isLoading || otp.join('').length !== 6} className="w-full">
              {isLoading ? 'Verifying...' : 'Verify Email'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground mb-3">Didn&apos;t receive the code?</p>
            <button className="text-primary hover:text-primary/80 font-medium text-sm">Resend code</button>
          </div>
        </div>
      </div>
    </div>
  );
}
