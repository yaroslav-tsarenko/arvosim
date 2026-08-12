'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, User, AlertCircle, Phone, MapPin, Calendar, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useState } from 'react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { useApp } from '@/hooks/AppProvider';

const BANNED_COUNTRIES = ['Russia', 'Belarus', 'Iran', 'North Korea'];

const ALL_COUNTRIES = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia',
  'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belgium',
  'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei',
  'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada', 'Central African Republic',
  'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus',
  'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt',
  'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland',
  'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea',
  'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iraq',
  'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait',
  'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania',
  'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands',
  'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro',
  'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand',
  'Nicaragua', 'Niger', 'Nigeria', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine',
  'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar',
  'Romania', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines',
  'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles',
  'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa',
  'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland',
  'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga',
  'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine',
  'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu',
  'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe',
].filter((c) => !BANNED_COUNTRIES.includes(c));

const STEPS = ['Account', 'Personal', 'Address', 'Confirm'];

const inputCls = 'w-full rounded-xl border border-border bg-surface/50 py-2.5 pl-10 pr-4 text-sm text-text placeholder:text-text-light/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20';
const inputNoPadCls = 'w-full rounded-xl border border-border bg-surface/50 py-2.5 px-4 text-sm text-text placeholder:text-text-light/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20';

export default function SignUpPage() {
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, isAuthenticated } = useApp();
  const router = useRouter();

  if (isAuthenticated) {
    router.push('/account');
    return null;
  }

  function validateStep(): boolean {
    setError('');
    if (step === 0) {
      if (!email) { setError('Email is required'); return false; }
      if (!password || password.length < 6) { setError('Password must be at least 6 characters'); return false; }
      if (password !== confirm) { setError('Passwords do not match'); return false; }
    }
    if (step === 1) {
      if (!firstName.trim()) { setError('First name is required'); return false; }
      if (!lastName.trim()) { setError('Last name is required'); return false; }
      if (!phone.trim()) { setError('Phone number is required'); return false; }
      if (!dateOfBirth) { setError('Date of birth is required'); return false; }
    }
    if (step === 2) {
      if (!street.trim()) { setError('Street is required'); return false; }
      if (!city.trim()) { setError('City is required'); return false; }
      if (!country) { setError('Country is required'); return false; }
      if (!postalCode.trim()) { setError('Postal code is required'); return false; }
    }
    if (step === 3) {
      if (!agreed) { setError('You must agree to the Terms of Service'); return false; }
    }
    return true;
  }

  function handleNext() {
    if (validateStep()) setStep(step + 1);
  }

  function handleBack() {
    setError('');
    setStep(step - 1);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateStep()) return;

    setLoading(true);
    const result = await register(`${firstName} ${lastName}`, email, password, {
      firstName,
      lastName,
      phone,
      dateOfBirth,
      address: { street, city, country, postalCode },
    });
    setLoading(false);

    if (result.ok) {
      router.push('/account');
    } else {
      setError(result.error || 'Registration failed');
    }
  }

  return (
    <section className="flex items-center justify-center px-4 py-16 md:py-24">
      <AnimatedSection className="w-full max-w-md">
        <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-text">Create your account</h1>
            <p className="mt-2 text-text-light">Join ArvoSim and stay connected wherever you travel</p>
          </div>

          {/* Step indicator */}
          <div className="mb-8 flex items-center justify-between">
            {STEPS.map((label, i) => (
              <div key={label} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                    i < step ? 'bg-success text-white' : i === step ? 'bg-primary text-white' : 'bg-surface text-text-light'
                  }`}>
                    {i < step ? <Check className="h-4 w-4" /> : i + 1}
                  </div>
                  <span className="mt-1 text-[10px] font-medium text-text-light">{label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`mx-1 h-0.5 w-6 sm:w-10 transition-colors ${i < step ? 'bg-success' : 'bg-border'}`} />
                )}
              </div>
            ))}
          </div>

          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-xl bg-danger/5 border border-danger/20 px-4 py-3 text-sm text-danger">
              <AlertCircle className="h-4 w-4 shrink-0" />{error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Step 0: Account */}
            {step === 0 && (
              <>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-text">Email address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-light" />
                    <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={inputCls} />
                  </div>
                </div>
                <div>
                  <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-text">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-light" />
                    <input id="password" type={showPassword ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Minimum 6 characters" className="w-full rounded-xl border border-border bg-surface/50 py-2.5 pl-10 pr-10 text-sm text-text placeholder:text-text-light/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-light hover:text-text">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor="confirm" className="mb-1.5 block text-sm font-medium text-text">Confirm password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-light" />
                    <input id="confirm" type={showConfirm ? 'text' : 'password'} required value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Re-enter your password" className="w-full rounded-xl border border-border bg-surface/50 py-2.5 pl-10 pr-10 text-sm text-text placeholder:text-text-light/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-light hover:text-text">
                      {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Step 1: Personal */}
            {step === 1 && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium text-text">First name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-light" />
                      <input id="firstName" type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="John" className={inputCls} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium text-text">Last name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-light" />
                      <input id="lastName" type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Smith" className={inputCls} />
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-text">Phone number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-light" />
                    <input id="phone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+44 7700 900000" className={inputCls} />
                  </div>
                </div>
                <div>
                  <label htmlFor="dob" className="mb-1.5 block text-sm font-medium text-text">Date of birth</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-light" />
                    <input id="dob" type="date" required value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} className={inputCls} />
                  </div>
                </div>
              </>
            )}

            {/* Step 2: Address */}
            {step === 2 && (
              <>
                <div>
                  <label htmlFor="street" className="mb-1.5 block text-sm font-medium text-text">Street</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-light" />
                    <input id="street" type="text" required value={street} onChange={(e) => setStreet(e.target.value)} placeholder="258–262 Romford Road" className={inputCls} />
                  </div>
                </div>
                <div>
                  <label htmlFor="city" className="mb-1.5 block text-sm font-medium text-text">City</label>
                  <input id="city" type="text" required value={city} onChange={(e) => setCity(e.target.value)} placeholder="London" className={inputNoPadCls} />
                </div>
                <div>
                  <label htmlFor="country" className="mb-1.5 block text-sm font-medium text-text">Country</label>
                  <select id="country" required value={country} onChange={(e) => setCountry(e.target.value)} className={inputNoPadCls}>
                    <option value="">Select country</option>
                    {ALL_COUNTRIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="postalCode" className="mb-1.5 block text-sm font-medium text-text">Postal code</label>
                  <input id="postalCode" type="text" required value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="E7 9HZ" className={inputNoPadCls} />
                </div>
              </>
            )}

            {/* Step 3: Confirm */}
            {step === 3 && (
              <>
                <div className="rounded-xl bg-surface p-4 space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-text-light">Email</span><span className="font-medium text-text">{email}</span></div>
                  <div className="flex justify-between"><span className="text-text-light">Name</span><span className="font-medium text-text">{firstName} {lastName}</span></div>
                  <div className="flex justify-between"><span className="text-text-light">Phone</span><span className="font-medium text-text">{phone}</span></div>
                  <div className="flex justify-between"><span className="text-text-light">Date of birth</span><span className="font-medium text-text">{dateOfBirth}</span></div>
                  <div className="flex justify-between"><span className="text-text-light">Address</span><span className="font-medium text-text text-right">{street}, {city}, {postalCode}, {country}</span></div>
                </div>
                <label className="flex items-start gap-2 text-sm text-text-light">
                  <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-border accent-primary" />
                  <span>I agree to the <Link href="/terms" className="font-medium text-primary hover:text-primary-dark">Terms of Service</Link> and <Link href="/privacy" className="font-medium text-primary hover:text-primary-dark">Privacy Policy</Link></span>
                </label>
              </>
            )}

            {/* Navigation buttons */}
            <div className="flex gap-3">
              {step > 0 && (
                <button type="button" onClick={handleBack} className="flex-1 flex items-center justify-center gap-1 rounded-xl border border-border py-2.5 text-sm font-medium text-text hover:bg-surface transition-colors">
                  <ChevronLeft className="h-4 w-4" /> Back
                </button>
              )}
              {step < 3 ? (
                <button type="button" onClick={handleNext} className="flex-1 flex items-center justify-center gap-1 rounded-xl bg-primary py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark transition-colors">
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button type="submit" disabled={loading} className="flex-1 rounded-xl bg-primary py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark transition-colors disabled:opacity-50">
                  {loading ? 'Creating account...' : 'Create Account'}
                </button>
              )}
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-text-light">
            Already have an account? <Link href="/sign-in" className="font-semibold text-primary hover:text-primary-dark">Sign in</Link>
          </p>
        </div>
      </AnimatedSection>
    </section>
  );
}
