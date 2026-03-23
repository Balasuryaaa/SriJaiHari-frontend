import { useForm } from 'react-hook-form'
import { submitEnquiry } from '../lib/api'
import toast from 'react-hot-toast'
import { useLanguage } from '../context/LanguageContext'
import { motion } from 'framer-motion'

const RED = '#C41E3A'
const STEEL = '#8C8C8C'

function Enquiry() {
  const { t } = useLanguage()
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    try {
      await submitEnquiry(data)
      toast.success(t('enquiry.success'))
      reset()
    } catch (e) {
      toast.error(t('enquiry.error'))
    }
  }

  return (
    <div style={{ background: '#fff', minHeight: '100vh', padding: '4rem 1rem' }}>
      <div className="container-page" style={{ maxWidth: 800 }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#111', marginBottom: 16 }}
          >
            {t('enquiry.title')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ color: STEEL, fontSize: 16, maxWidth: 500, margin: '0 auto', lineHeight: 1.6 }}
          >
            {t('enquiry.subtitle')}
          </motion.p>
        </div>

        {/* Form Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
          style={{ background: '#fff', borderRadius: 24, padding: '3rem 2rem', border: '1.5px solid #eee', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}
        >
          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'grid', gap: 24 }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
              {/* Name */}
              <div>
                <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 700, color: '#444' }}>{t('enquiry.name')} *</label>
                <input 
                  style={{ width: '100%', padding: '14px 18px', borderRadius: 12, border: '1.5px solid #eee', outline: 'none', transition: 'border-color 0.2s', boxSizing:'border-box' }}
                  placeholder={t('enquiry.placeholderName')}
                  onFocus={e => e.target.style.borderColor = RED}
                  onBlur={e => e.target.style.borderColor = '#eee'}
                  {...register('name', { required: true })}
                />
              </div>

              {/* Email */}
              <div>
                <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 700, color: '#444' }}>{t('enquiry.email')} *</label>
                <input 
                  type="email"
                  style={{ width: '100%', padding: '14px 18px', borderRadius: 12, border: '1.5px solid #eee', outline: 'none', transition: 'border-color 0.2s', boxSizing:'border-box' }}
                  placeholder={t('enquiry.placeholderEmail')}
                  onFocus={e => e.target.style.borderColor = RED}
                  onBlur={e => e.target.style.borderColor = '#eee'}
                  {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 700, color: '#444' }}>{t('enquiry.phone')} *</label>
              <input 
                type="tel"
                style={{ width: '100%', padding: '14px 18px', borderRadius: 12, border: '1.5://eee', outline: 'none', border: '1.5px solid #eee', boxSizing:'border-box' }}
                placeholder={t('enquiry.placeholderPhone')}
                onFocus={e => e.target.style.borderColor = RED}
                onBlur={e => e.target.style.borderColor = '#eee'}
                {...register('phone', { required: true })}
              />
            </div>

            {/* Message */}
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 700, color: '#444' }}>{t('enquiry.message')} *</label>
              <textarea 
                rows={5}
                style={{ width: '100%', padding: '14px 18px', borderRadius: 12, border: '1.5px solid #eee', outline: 'none', resize: 'none', boxSizing:'border-box' }}
                placeholder={t('enquiry.placeholderMsg')}
                onFocus={e => e.target.style.borderColor = RED}
                onBlur={e => e.target.style.borderColor = '#eee'}
                {...register('message', { required: true })}
              />
            </div>

            {/* Quote Alert */}
            <div style={{ background: '#fdf2f4', border: `1px solid rgba(196,30,58,0.1)`, borderRadius: 14, padding: '1rem 1.25rem', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: RED, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0, marginTop: 2 }}>!</div>
              <p style={{ margin: 0, fontSize: 13, color: '#444', lineHeight: 1.5 }}>
                <strong style={{ color: RED }}>{t('enquiry.quickResponse')}</strong> {t('enquiry.quickSub')}
              </p>
            </div>

            {/* Submit */}
            <button 
              type="submit"
              className="btn"
              style={{ padding: '16px 32px', borderRadius: 14, alignSelf: 'center', minWidth: 200, fontSize: 16, boxShadow: `0 10px 30px rgba(196,30,58,0.3)` }}
            >
              {t('enquiry.send')}
            </button>

          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default Enquiry
