import React, { useState, useRef } from 'react';

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(30);

  // References for OTP input fields
  const inputRefs = useRef([]);

  const handleMobileSubmit = (e) => {
    e.preventDefault();
    // Simulate OTP sending
    setOtpSent(true);
    startCountdown();
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    console.log('Verifying OTP:', enteredOtp, 'for mobile:', mobileNumber);
    // Add your verification logic here
  };

  const handleOtpChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Auto focus next input if current field is filled
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace to move to previous input
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleResendOtp = () => {
    setIsResending(true);
    // Simulate OTP resending
    setTimeout(() => {
      setIsResending(false);
      startCountdown();
    }, 1000);
  };

  const startCountdown = () => {
    setCountdown(30);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 4).split('');
    if (pastedData.length && pastedData.every((char) => /^\d$/.test(char))) {
      const newOtp = [...otp];
      pastedData.forEach((value, index) => {
        if (index < 4) newOtp[index] = value;
      });
      setOtp(newOtp);
      if (pastedData.length === 4) {
        inputRefs.current[3].focus();
      } else {
        inputRefs.current[pastedData.length].focus();
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative z-10">
      {/* Login Container with Glassmorphism */}
      <div className="w-full max-w-md p-8 mx-4 bg-white rounded-2xl shadow-lg backdrop-blur-xl bg-opacity-70">
        {/* Branding Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center">
            <svg
              className="w-8 h-8 mr-2 text-[#4CAF50]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 17.0001C7 16.0743 7 15.611 7.44655 15.3056C7.66556 15.1648 7.92089 15.0819 8.18353 15.0681C8.75876 15.0382 9.27518 15.5546 10.308 16.5874L11.184 17.4634C11.4049 17.6843 11.5153 17.7947 11.6458 17.8442C11.7593 17.8866 11.8796 17.8866 11.9931 17.8442C12.1236 17.7947 12.234 17.6843 12.4549 17.4634L14.9996 14.9187C16.2529 13.6654 16.8795 13.0387 16.7601 12.4224C16.7116 12.1679 16.6028 11.9265 16.4426 11.7157C16.1145 11.2791 15.3253 11.0553 13.7468 10.6076C11.8604 10.0662 10.9172 9.79553 10.1336 10.0077C9.66743 10.1248 9.24322 10.35 8.897 10.6569C8.28702 11.1877 8.00912 12.0369 7.45333 13.7354C7.15452 14.6441 7.00512 15.0984 7.00001 15.5172C6.99759 15.7215 7.02517 15.925 7.08167 16.1209C7.18601 16.4814 7.4662 16.7616 8.02655 17.3221C8.02744 17.323 8.02832 17.3238 8.02921 17.3247"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
            <h1 className="text-4xl font-bold text-[#4CAF50]">Memora</h1>
          </div>
          <p className="mt-2 text-lg text-[#2E3B4E]">
            Your AI-powered <b>Diary</b> and <b>Memory</b> assistant
          </p>
        </div>
        
        <h2 className="text-xl font-semibold text-center text-[#2E3B4E] mb-6">
          {otpSent ? 'Verify Your Phone' : 'Login with Mobile'}
        </h2>
        
        {!otpSent ? (
          <form onSubmit={handleMobileSubmit}>
            <div className="mb-6">
              <label htmlFor="mobile" className="block text-sm font-medium text-[#2E3B4E] mb-1">
                Mobile Number
              </label>
              <div className="flex">
                <div className="bg-[#F1F8E9] border border-[#8E8E93] rounded-l-lg px-3 flex items-center text-[#2E3B4E]">
                  +91
                </div>
                <input
                  id="mobile"
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    if (value.length <= 10) setMobileNumber(value);
                  }}
                  className="w-full px-4 py-3 rounded-r-lg border border-[#8E8E93] focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-all duration-200"
                  placeholder="Enter your mobile number"
                  maxLength={10}
                  required
                />
              </div>
              <p className="mt-2 text-xs text-[#8E8E93]">We'll send a 4-digit OTP to verify your number</p>
            </div>
            
            <button
              type="submit"
              className="w-full bg-[#4CAF50] text-white font-medium py-3 px-4 rounded-lg hover:bg-[#43A047] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4CAF50]"
              disabled={mobileNumber.length !== 10}
            >
              Get OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit}>
            <p className="text-center text-[#2E3B4E] mb-4">
              Enter the 4-digit code sent to <br />
              <span className="font-medium">+91 {mobileNumber}</span>
            </p>
            
            <div className="flex justify-center gap-3 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-12 h-14 text-center text-xl font-bold border border-[#8E8E93] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-all duration-200"
                  maxLength={1}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                />
              ))}
            </div>
            
            <button
              type="submit"
              className="w-full bg-[#4CAF50] text-white font-medium py-3 px-4 rounded-lg hover:bg-[#43A047] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4CAF50] mb-4"
              disabled={otp.some((digit) => digit === '')}
            >
              Verify OTP
            </button>
            
            <div className="flex justify-center">
              {countdown > 0 ? (
                <p className="text-sm text-[#8E8E93]">Resend OTP in {countdown}s</p>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-sm text-[#4CAF50] hover:text-[#43A047] transition-colors focus:outline-none"
                  disabled={isResending}
                >
                  {isResending ? 'Sending...' : 'Resend OTP'}
                </button>
              )}
            </div>
            
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setOtpSent(false)}
                className="text-sm text-[#4CAF50] hover:text-[#43A047] transition-colors focus:outline-none"
              >
                Change Mobile Number
              </button>
            </div>
          </form>
        )}
        
        <div className="mt-8 text-center">
          <p className="text-[#8E8E93] text-sm">
            Don't have an account?{' '}
            <a href="#" className="text-[#4CAF50] hover:text-[#43A047] font-medium transition-colors">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
