// Enrollment/Registration Component
const { useState, useEffect } = React;

const Enrollment = ({ user, onNavigate }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // AI Engineer Information
        aiEngineerName: '',
        aiEngineerEmail: '',
        aiEngineerPhone: '',
        aiEngineerNIC: '',
        aiEngineerAddress: '',
        
        // Student Information
        studentName: '',
        studentEmail: '',
        studentPhone: '',
        studentNIC: '',
        studentAddress: '',
        studentEducation: '',
        
        // Investment Details
        investmentAmount: '1800000',
        paymentMethod: '',
        sponsorId: user ? user.id : '',
        placementSide: '',
        
        // Terms
        acceptTerms: false,
        acceptPrivacy: false
    });
    
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setMessage({
                type: 'success',
                text: 'Enrollment submitted successfully! Your application is being processed.'
            });
            
            // Reset form after 3 seconds
            setTimeout(() => {
                setFormData({
                    aiEngineerName: '',
                    aiEngineerEmail: '',
                    aiEngineerPhone: '',
                    aiEngineerNIC: '',
                    aiEngineerAddress: '',
                    studentName: '',
                    studentEmail: '',
                    studentPhone: '',
                    studentNIC: '',
                    studentAddress: '',
                    studentEducation: '',
                    investmentAmount: '1800000',
                    paymentMethod: '',
                    sponsorId: user ? user.id : '',
                    placementSide: '',
                    acceptTerms: false,
                    acceptPrivacy: false
                });
                setCurrentStep(1);
                setMessage('');
            }, 3000);
        }, 2000);
    };

    const nextStep = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-LK', {
            style: 'currency',
            currency: 'LKR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const renderStepIndicator = () => {
        const steps = [
            { number: 1, title: 'AI Engineer Info' },
            { number: 2, title: 'Student Info' },
            { number: 3, title: 'Investment' },
            { number: 4, title: 'Review & Submit' }
        ];

        return (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
                {steps.map((step, index) => (
                    <div key={step.number} style={{ textAlign: 'center', flex: 1 }}>
                        <div
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                backgroundColor: currentStep >= step.number ? '#667eea' : '#e1e5e9',
                                color: currentStep >= step.number ? 'white' : '#666',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 10px',
                                fontWeight: '600'
                            }}
                        >
                            {step.number}
                        </div>
                        <div style={{ fontSize: '12px', color: currentStep >= step.number ? '#667eea' : '#666' }}>
                            {step.title}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderStep1 = () => (
        <div className="card">
            <h2 className="card-title">AI Engineer Information</h2>
            <form>
                <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                        type="text"
                        name="aiEngineerName"
                        className="form-input"
                        value={formData.aiEngineerName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input
                        type="email"
                        name="aiEngineerEmail"
                        className="form-input"
                        value={formData.aiEngineerEmail}
                        onChange={handleInputChange}
                        placeholder="Enter your email address"
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input
                        type="tel"
                        name="aiEngineerPhone"
                        className="form-input"
                        value={formData.aiEngineerPhone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">NIC Number *</label>
                    <input
                        type="text"
                        name="aiEngineerNIC"
                        className="form-input"
                        value={formData.aiEngineerNIC}
                        onChange={handleInputChange}
                        placeholder="Enter your NIC number"
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">Address *</label>
                    <textarea
                        name="aiEngineerAddress"
                        className="form-input"
                        value={formData.aiEngineerAddress}
                        onChange={handleInputChange}
                        placeholder="Enter your full address"
                        rows="3"
                        required
                    />
                </div>
            </form>
        </div>
    );

    const renderStep2 = () => (
        <div className="card">
            <h2 className="card-title">Student Information</h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>
                Enter the details of the student who will be benefiting from this education investment.
            </p>
            <form>
                <div className="form-group">
                    <label className="form-label">Student Full Name *</label>
                    <input
                        type="text"
                        name="studentName"
                        className="form-input"
                        value={formData.studentName}
                        onChange={handleInputChange}
                        placeholder="Enter student's full name"
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">Student Email Address *</label>
                    <input
                        type="email"
                        name="studentEmail"
                        className="form-input"
                        value={formData.studentEmail}
                        onChange={handleInputChange}
                        placeholder="Enter student's email address"
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">Student Phone Number *</label>
                    <input
                        type="tel"
                        name="studentPhone"
                        className="form-input"
                        value={formData.studentPhone}
                        onChange={handleInputChange}
                        placeholder="Enter student's phone number"
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">Student NIC Number *</label>
                    <input
                        type="text"
                        name="studentNIC"
                        className="form-input"
                        value={formData.studentNIC}
                        onChange={handleInputChange}
                        placeholder="Enter student's NIC number"
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">Student Address *</label>
                    <textarea
                        name="studentAddress"
                        className="form-input"
                        value={formData.studentAddress}
                        onChange={handleInputChange}
                        placeholder="Enter student's full address"
                        rows="3"
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">Educational Background *</label>
                    <select
                        name="studentEducation"
                        className="form-select"
                        value={formData.studentEducation}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select educational background</option>
                        <option value="alevel">GCE A/L</option>
                        <option value="olvel">GCE O/L</option>
                        <option value="diploma">Diploma</option>
                        <option value="other">Other</option>
                    </select>
                </div>
            </form>
        </div>
    );

    const renderStep3 = () => (
        <div className="card">
            <h2 className="card-title">Investment Details</h2>
            
            <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px' }}>Investment Summary</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                    <div>
                        <div style={{ fontSize: '14px', color: '#666' }}>Investment Amount</div>
                        <div style={{ fontSize: '20px', fontWeight: '600', color: '#28a745' }}>
                            {formatCurrency(formData.investmentAmount)}
                        </div>
                    </div>
                    <div>
                        <div style={{ fontSize: '14px', color: '#666' }}>Monthly Interest</div>
                        <div style={{ fontSize: '20px', fontWeight: '600', color: '#667eea' }}>
                            {formatCurrency(24000)}
                        </div>
                    </div>
                    <div>
                        <div style={{ fontSize: '14px', color: '#666' }}>Program Duration</div>
                        <div style={{ fontSize: '20px', fontWeight: '600', color: '#764ba2' }}>
                            3 Years + MPhil
                        </div>
                    </div>
                </div>
            </div>
            
            <form>
                <div className="form-group">
                    <label className="form-label">Payment Method *</label>
                    <select
                        name="paymentMethod"
                        className="form-select"
                        value={formData.paymentMethod}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select payment method</option>
                        <option value="bank_transfer">Bank Transfer</option>
                        <option value="cheque">Cheque</option>
                        <option value="cash">Cash Deposit</option>
                    </select>
                </div>
                
                <div className="form-group">
                    <label className="form-label">Sponsor ID</label>
                    <input
                        type="text"
                        name="sponsorId"
                        className="form-input"
                        value={formData.sponsorId}
                        onChange={handleInputChange}
                        placeholder="Enter sponsor ID (if applicable)"
                        readOnly={!!user}
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">Placement Side *</label>
                    <select
                        name="placementSide"
                        className="form-select"
                        value={formData.placementSide}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select placement side</option>
                        <option value="left">Left Leg</option>
                        <option value="right">Right Leg</option>
                    </select>
                </div>
            </form>
        </div>
    );

    const renderStep4 = () => (
        <div className="card">
            <h2 className="card-title">Review & Submit</h2>
            
            <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px' }}>Application Summary</h3>
                
                <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px', color: '#667eea' }}>AI Engineer Details</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', fontSize: '14px' }}>
                        <div><strong>Name:</strong> {formData.aiEngineerName}</div>
                        <div><strong>Email:</strong> {formData.aiEngineerEmail}</div>
                        <div><strong>Phone:</strong> {formData.aiEngineerPhone}</div>
                        <div><strong>NIC:</strong> {formData.aiEngineerNIC}</div>
                    </div>
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px', color: '#667eea' }}>Student Details</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', fontSize: '14px' }}>
                        <div><strong>Name:</strong> {formData.studentName}</div>
                        <div><strong>Email:</strong> {formData.studentEmail}</div>
                        <div><strong>Phone:</strong> {formData.studentPhone}</div>
                        <div><strong>Education:</strong> {formData.studentEducation}</div>
                    </div>
                </div>
                
                <div>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px', color: '#667eea' }}>Investment Details</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', fontSize: '14px' }}>
                        <div><strong>Amount:</strong> {formatCurrency(formData.investmentAmount)}</div>
                        <div><strong>Payment Method:</strong> {formData.paymentMethod}</div>
                        <div><strong>Sponsor ID:</strong> {formData.sponsorId}</div>
                        <div><strong>Placement:</strong> {formData.placementSide}</div>
                    </div>
                </div>
            </div>
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            name="acceptTerms"
                            checked={formData.acceptTerms}
                            onChange={handleInputChange}
                            required
                        />
                        <span style={{ fontSize: '14px' }}>
                            I accept the Terms and Conditions of the EEPIP program *
                        </span>
                    </label>
                </div>
                
                <div className="form-group">
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            name="acceptPrivacy"
                            checked={formData.acceptPrivacy}
                            onChange={handleInputChange}
                            required
                        />
                        <span style={{ fontSize: '14px' }}>
                            I accept the Privacy Policy and Data Processing Terms *
                        </span>
                    </label>
                </div>
                
                <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Processing...' : 'Submit Application'}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={prevStep}>
                        Previous
                    </button>
                </div>
            </form>
        </div>
    );

    return (
        <div className="container">
            <div style={{ padding: '40px 0' }}>
                <h1 style={{ fontSize: '32px', fontWeight: '700', color: 'white', marginBottom: '30px' }}>
                    Enrollment Application
                </h1>
                
                {message && (
                    <div className={`message ${message.type}`}>
                        {message.text}
                    </div>
                )}
                
                {renderStepIndicator()}
                
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}
                {currentStep === 4 && renderStep4()}
                
                {currentStep < 4 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                        <button 
                            className="btn btn-secondary" 
                            onClick={prevStep}
                            disabled={currentStep === 1}
                        >
                            Previous
                        </button>
                        <button 
                            className="btn btn-primary" 
                            onClick={nextStep}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
