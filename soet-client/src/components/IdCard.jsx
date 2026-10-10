import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import './IdCard.css';

import logoCircle from '../assets/id-card/university_logowithcircle.png';
import logoWatermark from '../assets/id-card/university_logo.png';
import signature from '../assets/id-card/chief_proctor_signature.png';

export default function IdCard({ student }) {
  const cardRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  const photoUrl = student.photo 
    ? (student.photo.startsWith('http') ? student.photo : `http://localhost:5000${student.photo}`) 
    : '';

  const downloadPDF = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        useCORS: true,
        allowTaint: true,
        scale: 4,
        backgroundColor: '#ffffff',
        logging: false
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [85.6, 53.98]
      });
      pdf.addImage(imgData, 'PNG', 0, 0, 85.6, 53.98);
      pdf.save(`${student.enrollmentNo}_ID_Card.pdf`);
    } catch (error) {
      console.error("PDF generation error:", error);
      alert('Error downloading PDF.');
    }
    setDownloading(false);
  };

  const downloadJPEG = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        useCORS: true,
        allowTaint: true,
        scale: 4,
        backgroundColor: '#ffffff',
        logging: false
      });
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const link = document.createElement('a');
      link.download = `${student.enrollmentNo}_ID_Card.jpg`;
      link.href = imgData;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("JPEG generation error:", error);
      alert('Error downloading JPEG.');
    }
    setDownloading(false);
  };

  return (
    <div className="id-card-wrapper">
      <div className="download-actions" style={{ marginBottom: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button onClick={downloadPDF} disabled={downloading} className="btn-primary" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          {downloading ? 'Processing...' : '📄 Download PDF'}
        </button>
        <button onClick={downloadJPEG} disabled={downloading} className="btn-secondary" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          {downloading ? 'Processing...' : '🖼️ Download JPEG'}
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="id-card-container" ref={cardRef}>
          <div className="id-card-watermark" style={{ backgroundImage: `url(${logoWatermark})` }}></div>
          
          <div className="card-front">
            <div className="card-header">
              <img src={logoCircle} className="card-logo" crossOrigin="anonymous" alt="Logo" />
              <div className="university-info">
                <div className="university-name">SAMRAT VIKRAMADITYA UNIVERSITY</div>
                <div className="university-school">SCHOOL OF ENGINEERING AND TECHNOLOGY</div>
              </div>
            </div>
            
            <div className="card-content">
              <div className="card-title-inline">Student ID Card</div>
              <div className="main-content">
                <div className="details-section">
                  <div className="detail-row">
                    <div className="detail-label">Enrollment. No</div>
                    <div className="detail-separator">:</div>
                    <div className="detail-value">{student.enrollmentNo}</div>
                  </div>
                  <div className="detail-row">
                    <div className="detail-label">Name</div>
                    <div className="detail-separator">:</div>
                    <div className="detail-value">{student.name}</div>
                  </div>
                  <div className="detail-row">
                    <div className="detail-label">Father's Name</div>
                    <div className="detail-separator">:</div>
                    <div className="detail-value">{student.fatherName}</div>
                  </div>
                  <div className="detail-row">
                    <div className="detail-label">Course</div>
                    <div className="detail-separator">:</div>
                    <div className="detail-value">{student.course}</div>
                  </div>
                  <div className="detail-row">
                    <div className="detail-label">Department</div>
                    <div className="detail-separator">:</div>
                    <div className="detail-value">{student.department || (student.branch && student.branch.name)}</div>
                  </div>
                  <div className="detail-row">
                    <div className="detail-label">Session/Batch</div>
                    <div className="detail-separator">:</div>
                    <div className="detail-value">{student.sessionBatch}</div>
                  </div>
                  <div className="detail-row">
                    <div className="detail-label">Phone No.</div>
                    <div className="detail-separator">:</div>
                    <div className="detail-value">{student.phone}</div>
                  </div>
                </div>
                
                <div className="right-section">
                  <div className="validity">
                    <span className="validity-label">Valid upto: </span>
                    <span className="validity-date">{student.validUntil}</span>
                  </div>
                  <div className="photo-section">
                    <div className="photo-placeholder">
                      {photoUrl ? (
                        <img src={photoUrl} alt="Student" crossOrigin="anonymous" />
                      ) : (
                        <span>PHOTO</span>
                      )}
                    </div>
                  </div>
                  <div className="signature-section">
                    <img src={signature} alt="Chief Proctor Signature" className="signature-img" crossOrigin="anonymous" />
                    <div className="signature-title">Chief Proctor</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
