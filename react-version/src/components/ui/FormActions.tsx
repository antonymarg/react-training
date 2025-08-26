interface FormActionsProps {
  onCancel: () => void;
  submitText: string;
  cancelText?: string;
  isSubmitting?: boolean;
}

export function FormActions({ 
  onCancel, 
  submitText, 
  cancelText = "Cancel", 
  isSubmitting = false 
}: FormActionsProps) {
  return (
    <div className="flex justify-end space-x-3 pt-6 border-t">
      <button
        type="button"
        onClick={onCancel}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {cancelText}
      </button>
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 text-sm font-medium text-black bg-yellow-400 border border-transparent rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitText}
      </button>
    </div>
  );
}
