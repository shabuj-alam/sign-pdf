import React, { useState } from "react";

const PdfSigner = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [signatureName, setSignatureName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [signedPdfUrl, setSignedPdfUrl] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setError("");
      setSignedPdfUrl(null);
    } else {
      setSelectedFile(null);
      setError("Please select a valid PDF file");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setError("Please select a PDF file");
      return;
    }

    if (!signatureName.trim()) {
      setError("Please enter your name for the signature");
      return;
    }

    setIsLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("pdf", selectedFile);
    formData.append("signatureName", signatureName);

    try {
      const response = await fetch(
        "http://192.168.8.102:3000/api/upload-and-sign",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to sign PDF");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setSignedPdfUrl(url);
    } catch (err) {
      setError("Error signing PDF: " + err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (signedPdfUrl) {
      const a = document.createElement("a");
      a.href = signedPdfUrl;
      a.download = `signed-${selectedFile.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setSignatureName("");
    setSignedPdfUrl(null);
    setError("");
    if (signedPdfUrl) {
      URL.revokeObjectURL(signedPdfUrl);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-[800px] px-4 sm:px-0">
        <h1 className="text-center mb-4">PDF Signer</h1>

        {!signedPdfUrl ? (
          <form onSubmit={handleSubmit} className="flex-col gap-4 mt-4 sm:mt-8 p-2 sm:p-4">
            <div className="form-div">
              <label>Name:</label>
              <input
                type="text"
                value={signatureName}
                onChange={(e) => setSignatureName(e.target.value)}
                placeholder="Enter name"
              />
            </div>

            <div className="form-div">
              <label>Select PDF:</label>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
              />
              {selectedFile && (
                <p
                  className="mt-4 text-gray-600 text-sm"
                >
                  Selected: {selectedFile.name}
                </p>
              )}
            </div>

            {error && (
              <div
                className="bg-badge-red text-badge-red-text p-4 rounded-xl mb-5"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !selectedFile || !signatureName.trim()}
              className={`w-full px-3 py-3 sm:py-4
                ${isLoading 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-[#8e98ff] cursor-pointer"
                }`}
            >
              {isLoading ? "Signing PDF..." : "Upload & Sign PDF"}
            </button>
          </form>
        ) : (
          <div className="text-center mt-4">
            <div
              className="bg-badge-green text-badge-green-text p-4 rounded-xl mb-5"
            >
              PDF signed successfully!
            </div>

            <div
              className="border-2 border-gray-300 rounded-lg p-2.5 mb-5 bg-white"
            >
              <iframe
                src={signedPdfUrl}
                className="w-full border-none"
                style={{
                  height: "400px",
                }}
                title="Signed PDF Preview"
              />
            </div>

            <div
              className="flex flex-col sm:flex-row gap-2.5 justify-center w-full"
            >
              <button
                onClick={handleDownload}
                className="px-6 py-3 sm:py-4 bg-green-600 cursor-pointer w-full sm:w-auto"
              >
                Download Signed PDF
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-3 sm:py-4 bg-gray-600 cursor-pointer w-full sm:w-auto"
              >
                Sign Another PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfSigner;
