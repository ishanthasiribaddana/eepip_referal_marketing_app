import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StepIndicator from '../components/Register/StepIndicator';
import PersonalInfoForm from '../components/Register/PersonalInfoForm';
import StudentForm from '../components/Register/StudentForm';
import PlacementForm from '../components/Register/PlacementForm';
import { formatLKR } from '../data/mockData';

const STEPS = [
  'Personal Info',
  'Student Nomination',
  'Placement',
  'Payment',
  'Review',
];

export default function Register() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isExistingMember, setIsExistingMember] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    fullName: '',
    email: '',
    phone: '',
    nic: '',
    address: '',
    city: '',

    // Step 2: Student Nomination
    hasStudent: false,
    studentName: '',
    studentEmail: '',
    studentPhone: '',
    studentNic: '',
    program: '',

    // Step 3: Placement
    sponsorNic: '',
    sponsorId: '',
    preferredLeg: '' as 'LEFT' | 'RIGHT' | '',

    // Step 4: Payment
    paymentMethod: 'EPIN' as 'EPIN' | 'BANK_TRANSFER',
    epinCode: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
      if (!formData.nic.trim()) newErrors.nic = 'NIC is required';
      // Skip address/city validation for existing members
      if (!isExistingMember) {
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
      }
    }

    if (step === 2 && formData.hasStudent) {
      if (!formData.studentName.trim()) newErrors.studentName = 'Student name is required';
      if (!formData.studentEmail.trim()) newErrors.studentEmail = 'Student email is required';
      if (!formData.studentPhone.trim()) newErrors.studentPhone = 'Student phone is required';
      if (!formData.studentNic.trim()) newErrors.studentNic = 'Student NIC is required';
      if (!formData.program) newErrors.program = 'Program is required';
    }

    if (step === 3) {
      if (!formData.sponsorNic.trim()) newErrors.sponsorNic = 'Sponsor NIC is required';
      if (!formData.preferredLeg) newErrors.preferredLeg = 'Please select a preferred leg';
    }

    if (step === 4) {
      if (formData.paymentMethod === 'EPIN' && !formData.epinCode.trim()) {
        newErrors.epinCode = 'EPIN code is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((s) => Math.min(STEPS.length, s + 1));
    }
  };

  const handleBack = () => {
    setCurrentStep((s) => Math.max(1, s - 1));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsComplete(true);
    setIsSubmitting(false);
  };

  const handleComplete = () => {
    navigate('/dashboard');
  };

  if (isComplete) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card text-center py-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
          <p className="text-gray-600 mb-6">
            Your AI Engineer enrollment has been submitted. You will receive a confirmation email shortly.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 text-left mb-6">
            <p className="text-sm text-gray-500 mb-2">Enrollment Summary</p>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span className="font-medium">{formData.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium">{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Sponsor NIC:</span>
                <span className="font-medium">{formData.sponsorNic}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Investment:</span>
                <span className="font-medium">{formatLKR(1800000)}</span>
              </div>
            </div>
          </div>
          <button onClick={handleComplete} className="btn-primary">
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">New Enrollment</h1>
        <p className="text-gray-500 text-sm">
          Complete the steps below to enroll as an AI Engineer.
        </p>
      </div>

      <StepIndicator currentStep={currentStep} totalSteps={STEPS.length} stepNames={STEPS} />

      <div className="card">
        {currentStep === 1 && (
          <PersonalInfoForm data={formData} onChange={setFormData} onMemberFound={setIsExistingMember} errors={errors} />
        )}

        {currentStep === 2 && (
          <StudentForm data={formData} onChange={setFormData} onSkip={handleNext} errors={errors} />
        )}

        {currentStep === 3 && (
          <PlacementForm data={formData} onChange={setFormData} errors={errors} />
        )}

        {currentStep === 4 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Payment Details</h3>
            <p className="text-sm text-gray-500">
              Select your payment method for the enrollment.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className={`card cursor-pointer border-2 ${formData.paymentMethod === 'EPIN' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="EPIN"
                  checked={formData.paymentMethod === 'EPIN'}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as any })}
                  className="sr-only"
                />
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 ${formData.paymentMethod === 'EPIN' ? 'border-primary-500 bg-primary-500' : 'border-gray-300'} flex items-center justify-center`}>
                    {formData.paymentMethod === 'EPIN' && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">EPIN</p>
                    <p className="text-xs text-gray-500">Use an existing EPIN code</p>
                  </div>
                </div>
              </label>

              <label className={`card cursor-pointer border-2 ${formData.paymentMethod === 'BANK_TRANSFER' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="BANK_TRANSFER"
                  checked={formData.paymentMethod === 'BANK_TRANSFER'}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as any })}
                  className="sr-only"
                />
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 ${formData.paymentMethod === 'BANK_TRANSFER' ? 'border-primary-500 bg-primary-500' : 'border-gray-300'} flex items-center justify-center`}>
                    {formData.paymentMethod === 'BANK_TRANSFER' && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Bank Transfer</p>
                    <p className="text-xs text-gray-500">Transfer via TEMCO Bank</p>
                  </div>
                </div>
              </label>
            </div>

            {formData.paymentMethod === 'EPIN' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  EPIN Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className={`input-field ${errors.epinCode ? 'border-red-300 focus:border-red-500' : ''}`}
                  placeholder="Enter your 6-digit EPIN code"
                  value={formData.epinCode}
                  onChange={(e) => setFormData({ ...formData, epinCode: e.target.value })}
                />
                {errors.epinCode && <p className="text-xs text-red-500 mt-1">{errors.epinCode}</p>}
              </div>
            )}

            {formData.paymentMethod === 'BANK_TRANSFER' && (
              <div className="card bg-gray-50 border-gray-200">
                <p className="text-sm font-semibold text-gray-700 mb-2">Bank Transfer Details</p>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><strong>Bank:</strong> TEMCO Bank</p>
                  <p><strong>Account:</strong> EEPIP Investment Account</p>
                  <p><strong>Account No:</strong> 1234567890</p>
                  <p><strong>Amount:</strong> {formatLKR(1800000)}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Review & Submit</h3>
            <p className="text-sm text-gray-500">
              Please review your enrollment details before submitting.
            </p>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Personal Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Name:</span>
                    <span className="font-medium">{formData.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Email:</span>
                    <span className="font-medium">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Phone:</span>
                    <span className="font-medium">{formData.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">NIC:</span>
                    <span className="font-medium">{formData.nic}</span>
                  </div>
                  <div className="flex justify-between sm:col-span-2">
                    <span className="text-gray-500">Address:</span>
                    <span className="font-medium">{formData.address}, {formData.city}</span>
                  </div>
                </div>
              </div>

              {formData.hasStudent && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Student Nomination</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Name:</span>
                      <span className="font-medium">{formData.studentName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Email:</span>
                      <span className="font-medium">{formData.studentEmail}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Program:</span>
                      <span className="font-medium">{formData.program === 'BSC_MPHIL' ? 'BSc + MPhil' : 'BSc Only'}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Placement</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Sponsor NIC:</span>
                    <span className="font-medium">{formData.sponsorNic}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Preferred Leg:</span>
                    <span className="font-medium">{formData.preferredLeg}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Payment</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Method:</span>
                    <span className="font-medium">{formData.paymentMethod === 'EPIN' ? 'EPIN' : 'Bank Transfer'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Investment:</span>
                    <span className="font-medium">{formatLKR(1800000)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between mt-6 pt-6 border-t border-gray-100">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>

          {currentStep < STEPS.length ? (
            <button type="button" onClick={handleNext} className="btn-primary">
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Enrollment'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
