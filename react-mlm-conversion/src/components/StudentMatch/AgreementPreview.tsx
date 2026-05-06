
interface AgreementPreviewProps {
  aiEngineerName: string;
  studentName: string;
  sponsorName: string;
  investmentAmount: number;
  productName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function AgreementPreview({
  aiEngineerName,
  studentName,
  sponsorName,
  investmentAmount,
  productName,
  onConfirm,
  onCancel,
}: AgreementPreviewProps) {
  return (
    <div className="card p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Tri-Party Agreement Preview</h2>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-6">
        <h3 className="font-semibold text-gray-700 mb-3">Education Easy-Pay Investment Plan Agreement</h3>

        <div className="space-y-3 text-sm text-gray-600">
          <p>
            This agreement is entered into between:
          </p>

          <div className="space-y-2 ml-4">
            <div className="flex gap-2">
              <span className="font-medium text-gray-700 w-32">AI Engineer:</span>
              <span>{aiEngineerName}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-medium text-gray-700 w-32">Student:</span>
              <span>{studentName}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-medium text-gray-700 w-32">Sponsor:</span>
              <span>{sponsorName}</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex gap-2">
              <span className="font-medium text-gray-700 w-32">Product:</span>
              <span>{productName}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-medium text-gray-700 w-32">Investment:</span>
              <span className="font-semibold text-gray-800">Rs. {investmentAmount.toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
            <p>
              By confirming this agreement, the AI Engineer agrees to sponsor the student's education through the EEPIP program. The student agrees to complete the program requirements. TEMCO Bank acts as the facilitator and holds the investment in trust.
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        <button
          onClick={onCancel}
          className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-6 py-2.5 rounded-lg bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors"
        >
          Confirm Match
        </button>
      </div>
    </div>
  );
}
