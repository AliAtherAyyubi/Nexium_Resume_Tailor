interface ResumeUploadResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

export async function sendResumeToAPI(
  resumeFile: File,
  jobDescription: string
): Promise<ResumeUploadResponse> {
  try {
    // Create FormData to send file and text data
    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('jobDescription', jobDescription);
    console.log(formData.get('jobDescription'))
    // Send POST request to the external API
    const response = await fetch('https://aliather.app.n8n.cloud/webhook-test/resume-upload', {
      method: 'POST',
      body: formData,
    });

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the response
    const result = await response.json();

    return {
      success: true,
      message: 'Resume uploaded successfully',
      data: result
    };

  } catch (error) {
    console.error('Error sending resume to API:', error);
    
    return {
      success: false,
      message: 'Failed to upload resume',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

// Alternative function that accepts additional metadata
export async function sendResumeWithMetadata(
  resumeFile: File,
  jobDescription: string,
  metadata?: {
    jobTitle?: string;
    company?: string;
    userId?: string;
    [key: string]: any;
  }
): Promise<ResumeUploadResponse> {
  try {
    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('jobDescription', jobDescription);
    
    // Add metadata if provided
    if (metadata) {
      Object.entries(metadata).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value.toString());
        }
      });
    }

    const response = await fetch('https://aliather.app.n8n.cloud/webhook-test/resume-upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    return {
      success: true,
      message: 'Resume uploaded successfully',
      data: result
    };

  } catch (error) {
    console.error('Error sending resume to API:', error);
    
    return {
      success: false,
      message: 'Failed to upload resume',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
} 