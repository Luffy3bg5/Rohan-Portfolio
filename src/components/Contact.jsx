import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Check, 
  Copy, 
  ExternalLink, 
  AlertCircle, 
  CheckCircle2, 
  Loader2, 
  Info,
  CornerDownRight
} from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { personalInfo } from '../data/portfolioData';
import ScrollReveal from './ScrollReveal';

// Configurable Form Delivery Endpoint (Formspree, Web3Forms, or custom API)
// If not configured, transparent mailto fallback is used without false success pretense.
const FORM_ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT || '';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error' | 'fallback_opened'
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);

  // Field validation logic
  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'name':
        if (!value.trim()) return 'Name is required.';
        if (value.trim().length < 2) return 'Name must be at least 2 characters.';
        return '';
      case 'email':
        if (!value.trim()) return 'Email address is required.';
        // Standard RFC-compliant email regex
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value.trim())) {
          return 'Please enter a valid email address (e.g., name@domain.com).';
        }
        return '';
      case 'subject':
        if (value && value.trim().length < 2) {
          return 'Subject should be at least 2 characters if provided.';
        }
        return '';
      case 'message':
        if (!value.trim()) return 'Message is required.';
        if (value.trim().length < 10) return 'Message must be at least 10 characters long.';
        return '';
      default:
        return '';
    }
  };

  const validateAll = (data) => {
    const newErrors = {};
    const nameErr = validateField('name', data.name);
    if (nameErr) newErrors.name = nameErr;

    const emailErr = validateField('email', data.email);
    if (emailErr) newErrors.email = emailErr;

    const subjectErr = validateField('subject', data.subject);
    if (subjectErr) newErrors.subject = subjectErr;

    const messageErr = validateField('message', data.message);
    if (messageErr) newErrors.message = messageErr;

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Real-time validation if already touched
    if (touched[name]) {
      const err = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const err = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: err }));
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else if (type === 'phone') {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } else if (type === 'draft') {
      setCopiedDraft(true);
      setTimeout(() => setCopiedDraft(false), 2000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all as touched
    setTouched({ name: true, email: true, subject: true, message: true });
    const validationErrors = validateAll(formData);
    setErrors(validationErrors);

    // If validation fails, focus first invalid field
    if (Object.keys(validationErrors).length > 0) {
      const firstFieldId = `contact-${Object.keys(validationErrors)[0]}`;
      const firstEl = document.getElementById(firstFieldId);
      if (firstEl) firstEl.focus();
      return;
    }

    // Prevent duplicate submissions
    if (status === 'submitting') return;

    if (FORM_ENDPOINT) {
      // Approach A: Configured Backend / Form Provider Endpoint
      setStatus('submitting');
      setErrorMessage('');

      try {
        const response = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim(),
            subject: formData.subject.trim() || 'Portfolio Inquiry',
            message: formData.message.trim()
          })
        });

        if (response.ok) {
          // Genuine delivery acceptance confirmed by server
          setStatus('success');
          setFormData({ name: '', email: '', subject: '', message: '' });
          setTouched({});
        } else {
          const result = await response.json().catch(() => ({}));
          throw new Error(result.error || `Delivery service responded with status ${response.status}`);
        }
      } catch (err) {
        setStatus('error');
        setErrorMessage(
          err.message || 'Unable to reach the delivery service. Please retry or contact Rohan directly via email.'
        );
      }
    } else {
      // Approach B: Transparent, clearly labeled mailto fallback
      setStatus('fallback_opened');

      const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
        formData.subject.trim() || `Portfolio Inquiry from ${formData.name.trim()}`
      )}&body=${encodeURIComponent(
        `Hi Rohan,\n\nName: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\n\nMessage:\n${formData.message.trim()}`
      )}`;

      window.location.href = mailtoUrl;
    }
  };

  const handleResetForm = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setErrors({});
    setTouched({});
    setStatus('idle');
    setErrorMessage('');
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <div className="section-tag">Direct Communication</div>
            <h2 className="section-title">Let's Connect</h2>
            <p className="section-subtitle">
              Whether you are looking for an ambitious engineering intern at VJTI, want to discuss software systems, or collaborate on generative AI and security topics—reach out anytime.
            </p>
          </div>
        </ScrollReveal>

        <div className="contact-grid">
          {/* Contact Direct Channels Column */}
          <ScrollReveal delay={100} className="contact-info-col">
            <div>
              {/* Email Card (Displaying verified email) */}
              <div className="contact-card-box">
                <div className="contact-box-left">
                  <div className="contact-icon-bubble">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="contact-box-title">Email Address</div>
                    <a 
                      href={personalInfo.links.emailMailto} 
                      className="contact-box-val"
                      aria-label={`Send email to ${personalInfo.email}`}
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  className="contact-copy-btn"
                  onClick={() => copyToClipboard(personalInfo.email, 'email')}
                  aria-label="Copy email address to clipboard"
                >
                  {copiedEmail ? <Check size={14} color="#B8F36B" /> : <Copy size={14} />}
                  <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Phone Card */}
              <div className="contact-card-box">
                <div className="contact-box-left">
                  <div className="contact-icon-bubble">
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="contact-box-title">Phone Number</div>
                    <a 
                      href={personalInfo.links.phoneTel} 
                      className="contact-box-val"
                      aria-label={`Call phone number ${personalInfo.phone}`}
                    >
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  className="contact-copy-btn"
                  onClick={() => copyToClipboard(personalInfo.phone, 'phone')}
                  aria-label="Copy phone number to clipboard"
                >
                  {copiedPhone ? <Check size={14} color="#B8F36B" /> : <Copy size={14} />}
                  <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Location Card */}
              <div className="contact-card-box">
                <div className="contact-box-left">
                  <div className="contact-icon-bubble">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="contact-box-title">Current Base</div>
                    <div className="contact-box-val">{personalInfo.location}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      VJTI Campus, Matunga, Mumbai
                    </div>
                  </div>
                </div>
                <span className="badge badge-lime">India (IST)</span>
              </div>

              {/* Social Profiles row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginTop: '14px' }}>
                <a
                  href={personalInfo.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ justifyContent: 'space-between' }}
                  aria-label="Visit Rohan's GitHub Profile"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Github size={18} />
                    <span>GitHub</span>
                  </div>
                  <ExternalLink size={14} />
                </a>

                <a
                  href={personalInfo.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ justifyContent: 'space-between' }}
                  aria-label="Visit Rohan's LinkedIn Profile"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Linkedin size={18} />
                    <span>LinkedIn</span>
                  </div>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Interactive, Accessible Contact Message Form */}
          <ScrollReveal delay={180}>
            <div className="contact-form-panel">
              <div className="form-panel-header">
                <div>
                  <h3 className="form-panel-title">
                    Send a Direct Message
                  </h3>
                  <p className="form-panel-sub">
                    Fill in the form below. All fields marked with <span className="required-star">*</span> are required.
                  </p>
                </div>

                {/* Delivery mode indicator badge */}
                <div className="delivery-mode-pill">
                  <span className="pulse-beacon" />
                  <span>{FORM_ENDPOINT ? 'API Delivery Active' : 'Mail Client Mode'}</span>
                </div>
              </div>

              {/* Transparent info notice when in fallback mailto mode */}
              {!FORM_ENDPOINT && status !== 'success' && status !== 'fallback_opened' && (
                <div className="contact-notice-box" role="status">
                  <Info size={18} color="#B8F36B" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div className="notice-body">
                    <strong>Direct Mail Client Mode:</strong> No external form delivery API endpoint is configured in this deployment. Submitting this form will open your default email client with your message pre-addressed to <code>{personalInfo.email}</code>.
                  </div>
                </div>
              )}

              {/* Genuine Server-Verified Success Message */}
              {status === 'success' && (
                <div className="contact-banner-success" role="alert" aria-live="polite">
                  <CheckCircle2 size={24} color="#B8F36B" style={{ flexShrink: 0 }} />
                  <div className="banner-text">
                    <h4 className="banner-title">Message Delivered Successfully!</h4>
                    <p className="banner-desc">
                      Your message has been accepted by the delivery service and forwarded to <strong>{personalInfo.email}</strong>. Rohan will review your message and reply as soon as possible.
                    </p>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={handleResetForm}
                      style={{ marginTop: '12px' }}
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              )}

              {/* Server Delivery Error State */}
              {status === 'error' && (
                <div className="contact-banner-error" role="alert" aria-live="assertive">
                  <AlertCircle size={24} color="#FF6B6B" style={{ flexShrink: 0 }} />
                  <div className="banner-text">
                    <h4 className="banner-title" style={{ color: '#FF8585' }}>Delivery Error</h4>
                    <p className="banner-desc">
                      {errorMessage}
                    </p>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '12px', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={handleSubmit}
                      >
                        Retry Send
                      </button>
                      <a
                        href={personalInfo.links.emailMailto}
                        className="btn btn-primary btn-sm"
                      >
                        Email Directly via Mailto
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Transparent Mailto Fallback Notification */}
              {status === 'fallback_opened' && (
                <div className="contact-banner-fallback" role="status" aria-live="polite">
                  <CornerDownRight size={22} color="#B8F36B" style={{ flexShrink: 0 }} />
                  <div className="banner-text">
                    <h4 className="banner-title">Email Client Opened</h4>
                    <p className="banner-desc">
                      Your default mail program has been triggered with your pre-filled inquiry addressed to <strong>{personalInfo.email}</strong>. Please review and click <strong>Send</strong> in your mail application.
                    </p>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '12px', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => copyToClipboard(
                          `Subject: ${formData.subject || 'Portfolio Inquiry'}\n\nHi Rohan,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`,
                          'draft'
                        )}
                      >
                        {copiedDraft ? <Check size={14} color="#B8F36B" /> : <Copy size={14} />}
                        <span>{copiedDraft ? 'Copied Draft!' : 'Copy Message Text'}</span>
                      </button>
                      <button
                        type="button"
                        className="btn btn-ghost btn-sm"
                        onClick={handleResetForm}
                      >
                        Reset Form
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Accessible Form */}
              {status !== 'success' && (
                <form onSubmit={handleSubmit} noValidate aria-label="Contact Rohan Patil">
                  <div className="form-row-duo">
                    {/* Name Field */}
                    <div className="form-group">
                      <label htmlFor="contact-name" className="form-label">
                        Your Name <span className="required-star" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        disabled={status === 'submitting'}
                        aria-required="true"
                        aria-invalid={touched.name && Boolean(errors.name)}
                        aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
                        placeholder="e.g. Alex Sharma"
                        className={`form-input ${touched.name && errors.name ? 'input-error' : ''}`}
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.name && errors.name && (
                        <div id="name-error" className="field-error-msg" role="alert">
                          <AlertCircle size={13} />
                          <span>{errors.name}</span>
                        </div>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="form-group">
                      <label htmlFor="contact-email" className="form-label">
                        Email Address <span className="required-star" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        disabled={status === 'submitting'}
                        aria-required="true"
                        aria-invalid={touched.email && Boolean(errors.email)}
                        aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
                        placeholder="alex@company.com"
                        className={`form-input ${touched.email && errors.email ? 'input-error' : ''}`}
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.email && errors.email && (
                        <div id="email-error" className="field-error-msg" role="alert">
                          <AlertCircle size={13} />
                          <span>{errors.email}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div className="form-group">
                    <label htmlFor="contact-subject" className="form-label">
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      disabled={status === 'submitting'}
                      aria-invalid={touched.subject && Boolean(errors.subject)}
                      aria-describedby={touched.subject && errors.subject ? 'subject-error' : undefined}
                      placeholder="e.g. Summer Internship Opportunity / Project Collaboration"
                      className={`form-input ${touched.subject && errors.subject ? 'input-error' : ''}`}
                      value={formData.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.subject && errors.subject && (
                      <div id="subject-error" className="field-error-msg" role="alert">
                        <AlertCircle size={13} />
                        <span>{errors.subject}</span>
                      </div>
                    )}
                  </div>

                  {/* Message Field */}
                  <div className="form-group">
                    <label htmlFor="contact-message" className="form-label">
                      Message <span className="required-star" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      disabled={status === 'submitting'}
                      aria-required="true"
                      aria-invalid={touched.message && Boolean(errors.message)}
                      aria-describedby={touched.message && errors.message ? 'message-error' : undefined}
                      placeholder="Hi Rohan, I reviewed your work on Content-Forge and would like to discuss..."
                      className={`form-textarea ${touched.message && errors.message ? 'input-error' : ''}`}
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.message && errors.message && (
                      <div id="message-error" className="field-error-msg" role="alert">
                        <AlertCircle size={13} />
                        <span>{errors.message}</span>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                    disabled={status === 'submitting'}
                    aria-busy={status === 'submitting'}
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 size={16} className="btn-spinner" />
                        <span>Transmitting Message...</span>
                      </>
                    ) : FORM_ENDPOINT ? (
                      <>
                        <Send size={16} />
                        <span>Send Message</span>
                      </>
                    ) : (
                      <>
                        <Mail size={16} />
                        <span>Open in Email Client</span>
                      </>
                    )}
                  </button>

                  <p className="form-privacy-note">
                    {FORM_ENDPOINT 
                      ? 'Secure transmission to backend endpoint. Your details are never shared.'
                      : `Transparent client dispatch. Pre-fills message to ${personalInfo.email}.`}
                  </p>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
