import React, { useState } from 'react';
import axios from 'axios';
import { api } from "./axios/Axiosmeta"; // Import axios instance from another folder 

export const SubmitButton = ({ nodes, edges }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('info'); // 'info', 'success', 'warning', 'error'

  const submitPipeline = async () => {
    if (nodes.length === 0) {
      showAlert('Please add at least one node to your pipeline before submitting.', 'error');
      console.log('Submitting pipeline:', { nodes, edges });
      return;
    }

    setIsSubmitting(true);
    

    try {
      const response = await axios.post('http://localhost:8000/pipelines/parse', {
        nodes,
        edges,
      });

      const { num_nodes, num_edges, is_dag } = response.data;
      const message = `Pipeline Analysis:\n• Nodes: ${num_nodes}\n• Edges: ${num_edges}\n• DAG: ${is_dag ? 'Yes' : 'No'}\n\n${
        is_dag ? '✅ Valid pipeline structure!' : '⚠️ Warning: Pipeline contains cycles.'
      }`;

      showAlert(message, is_dag ? 'success' : 'warning');
    } catch (error) {
      console.error('Error submitting pipeline:', error);
      showAlert(`Error: ${error.message}`, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const showAlert = (message, type = 'info') => {
    setAlertMessage(message);
    setAlertType(type);
    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 5000); // Auto-hide after 5s
  };

  return (
    <div className="fixed bottom-4 left-24  flex justify-end z-10">
      <button
        className={`
          px-4 py-2  text-white bg-black rounded-md shadow-sm
          hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-blue-300
          transition-colors duration-200 ease-in-out
          ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onClick={submitPipeline}
        disabled={isSubmitting}
        aria-label="Submit pipeline for analysis"
      >
        {isSubmitting ? (
          <span className="flex items-center">
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
            Submitting...
          </span>
        ) : (
          'Submit Pipeline'
        )}
      </button>

      {alertVisible && (
        <div
          className={`
            fixed top-3 right-4 max-w-sm p-4 rounded-lg border 
            transition-all duration-300 ease-in-out transform
            ${alertType === 'success' ? 'bg-green-50 text-green-800 border-green-200' : ' border-red-200'}
            ${alertType === 'warning' ? 'bg-yellow-50 text-yellow-800 border-red-200' : ''}
            ${alertType === 'error' ? 'bg-red-50 text-red-800 border-red-200' : ''}
            ${alertVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
          role="alert"
        >
          <button
            className="absolute top-2 text-xl right-2 text-gray-800 hover:text-gray-700"
            onClick={() => setAlertVisible(false)}
            aria-label="Close alert"
          >
            ×
          </button>
          <div className="text-sm">
            {alertMessage.split('\n').map((line, i) => (
              <p key={i} className="mb-1">
                {line}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};