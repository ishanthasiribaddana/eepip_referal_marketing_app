import { useState } from 'react'
import { UserPlus, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { aiEngineerService } from '../services/aiEngineerService'
import { productService } from '../services/productService'
import type { AiEngineerDTO } from '../types'

interface FormData {
  firstName: string
  lastName: string
  nic: string
  email: string
  phone: string
  sponsor: string
  position: 'LEFT' | 'RIGHT'
  epin: string
}

interface FormErrors {
  [key: string]: string
}

const initialForm: FormData = {
  firstName: '',
  lastName: '',
  nic: '',
  email: '',
  phone: '',
  sponsor: 'ishantha',
  position: 'LEFT',
  epin: '',
}

const inputClass = (error?: string) =>
  `w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
    error ? 'border-red-400 bg-red-50' : 'border-gray-300'
  }`

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p className="flex items-center gap-1 text-xs text-red-600 mt-1">
      <AlertCircle size={12} />
      {message}
    </p>
  )
}

export default function Enrollment() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState<FormData>(initialForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [productId, setProductId] = useState<number>(1)

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [field]: e.target.value })
    if (errors[field]) {
      const next = { ...errors }
      delete next[field]
      setErrors(next)
    }
  }

  function validateStep1(): boolean {
    const errs: FormErrors = {}
    if (!form.firstName.trim()) errs.firstName = 'First name is required'
    if (!form.lastName.trim()) errs.lastName = 'Last name is required'
    if (!form.nic.trim()) errs.nic = 'NIC number is required'
    else if (!/^[0-9]{9}[vVxX]$|^[0-9]{12}$/.test(form.nic.trim())) errs.nic = 'Enter valid NIC (e.g., 200012345678 or 912345678V)'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email'
    if (!form.phone.trim()) errs.phone = 'Phone is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function validateStep2(): boolean {
    const errs: FormErrors = {}
    if (!form.sponsor.trim()) errs.sponsor = 'Sponsor is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function validateStep3(): boolean {
    const errs: FormErrors = {}
    if (!form.epin.trim()) errs.epin = 'ePin code is required'
    else if (form.epin.trim().length !== 6) errs.epin = 'ePin must be exactly 6 characters'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function handleSubmit() {
    if (validateStep3()) {
      setLoading(true)
      setError(null)
      try {
        // Get active product
        const product = await productService.getActive()
        const activeProductId = product.id || 1
        
        // Map form data to DTO
        const dto: AiEngineerDTO = {
          memberId: 0, // Will be set by backend based on member table
          productId: activeProductId,
          parentId: form.sponsor === 'ishantha' ? undefined : parseInt(form.sponsor), // If 'ishantha', it's the root
          position: form.position,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          investmentAmount: product.investmentAmount || 1800000,
          status: 'INVESTED',
        }
        
        await aiEngineerService.create(dto)
        setSubmitted(true)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to enroll. Please try again.')
      } finally {
        setLoading(false)
      }
    }
  }

  if (submitted) {
    return (
      <div className="p-4 sm:p-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Enrollment Submitted</h2>
          <p className="text-gray-500 mb-2">
            <strong>{form.firstName} {form.lastName}</strong> has been registered.
          </p>
          <p className="text-gray-400 text-sm">Pending ePin validation and KYC verification.</p>
          <button
            onClick={() => { setSubmitted(false); setStep(1); setForm(initialForm); setErrors({}) }}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Enroll Another
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">New Enrollment</h1>
        <p className="text-gray-500 text-sm mt-1">Register a new AI Engineer into your network</p>
      </div>

      {/* Step Indicator */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
        {['Personal Details', 'Sponsor & Position', 'Payment (ePin)'].map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${
              step > i + 1 ? 'bg-green-500 text-white' :
              step === i + 1 ? 'bg-blue-600 text-white' :
              'bg-gray-200 text-gray-500'
            }`}>
              {step > i + 1 ? '✓' : i + 1}
            </div>
            <span className={`text-sm font-medium hidden sm:inline ${step === i + 1 ? 'text-gray-900' : 'text-gray-400'}`}>
              {label}
            </span>
            {i < 2 && <div className="w-8 sm:w-12 h-px bg-gray-300 mx-1 sm:mx-2"></div>}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 max-w-2xl">
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              <UserPlus size={20} className="inline mr-2" />Personal Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                <input type="text" value={form.firstName} onChange={set('firstName')} className={inputClass(errors.firstName)} placeholder="Enter first name" />
                <FieldError message={errors.firstName} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                <input type="text" value={form.lastName} onChange={set('lastName')} className={inputClass(errors.lastName)} placeholder="Enter last name" />
                <FieldError message={errors.lastName} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">NIC Number *</label>
              <input type="text" value={form.nic} onChange={set('nic')} className={inputClass(errors.nic)} placeholder="e.g., 200012345678" />
              <FieldError message={errors.nic} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input type="email" value={form.email} onChange={set('email')} className={inputClass(errors.email)} placeholder="email@example.com" />
              <FieldError message={errors.email} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
              <input type="tel" value={form.phone} onChange={set('phone')} className={inputClass(errors.phone)} placeholder="+94 XX XXX XXXX" />
              <FieldError message={errors.phone} />
            </div>
            <button
              onClick={() => { if (validateStep1()) setStep(2) }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Next: Sponsor &amp; Position
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Sponsor &amp; Tree Position</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sponsor ID / Username *</label>
              <input type="text" value={form.sponsor} onChange={set('sponsor')} className={inputClass(errors.sponsor)} />
              <FieldError message={errors.sponsor} />
              <p className="text-xs text-gray-400 mt-1">The person who referred this new member</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tree Position *</label>
              <div className="flex gap-4">
                <label className={`flex items-center gap-2 border rounded-lg px-4 py-3 cursor-pointer transition-colors ${
                  form.position === 'LEFT' ? 'bg-blue-100 border-blue-400' : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                }`}>
                  <input type="radio" name="position" value="LEFT" checked={form.position === 'LEFT'} onChange={() => setForm({ ...form, position: 'LEFT' })} className="text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Left Leg</span>
                </label>
                <label className={`flex items-center gap-2 border rounded-lg px-4 py-3 cursor-pointer transition-colors ${
                  form.position === 'RIGHT' ? 'bg-green-100 border-green-400' : 'bg-green-50 border-green-200 hover:bg-green-100'
                }`}>
                  <input type="radio" name="position" value="RIGHT" checked={form.position === 'RIGHT'} onChange={() => setForm({ ...form, position: 'RIGHT' })} className="text-green-600" />
                  <span className="text-sm font-medium text-green-800">Right Leg</span>
                </label>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => { if (validateStep2()) setStep(3) }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Next: Payment
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Confirmation (ePin)</h2>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-sm text-amber-800">
                <strong>Investment Amount:</strong> Rs. 1,800,000 LKR
              </p>
              <p className="text-xs text-amber-600 mt-1">
                Payment must be made to TEMCO Bank. After verification, the bank will issue an ePin.
              </p>
            </div>

            {/* Review summary */}
            <div className="bg-gray-50 rounded-lg p-4 text-sm space-y-1">
              <p className="font-medium text-gray-700 mb-2">Review Details:</p>
              <p className="text-gray-600"><strong>Name:</strong> {form.firstName} {form.lastName}</p>
              <p className="text-gray-600"><strong>NIC:</strong> {form.nic}</p>
              <p className="text-gray-600"><strong>Email:</strong> {form.email}</p>
              <p className="text-gray-600"><strong>Sponsor:</strong> {form.sponsor}</p>
              <p className="text-gray-600"><strong>Position:</strong> {form.position} Leg</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ePin Code *</label>
              <input
                type="text"
                maxLength={6}
                value={form.epin}
                onChange={set('epin')}
                className={`${inputClass(errors.epin)} font-mono text-lg tracking-widest uppercase`}
                placeholder="XXXXXX"
              />
              <FieldError message={errors.epin} />
              <p className="text-xs text-gray-400 mt-1">6-character alphanumeric code issued by TEMCO Bank</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : null}
                {loading ? 'Submitting...' : 'Submit Enrollment'}
              </button>
            </div>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600 flex items-center gap-2">
                  <AlertCircle size={14} />
                  {error}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
