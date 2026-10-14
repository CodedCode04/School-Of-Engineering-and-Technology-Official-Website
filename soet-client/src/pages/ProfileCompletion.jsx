import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import FormPageLayout from '../components/FormPageLayout';

export default function ProfileCompletion() {
    const { api, logout } = useAuth();
    const navigate = useNavigate();
    const [branches, setBranches] = useState([]);
    const [isResubmit, setIsResubmit] = useState(false);
    const [rejectionReason, setRejectionReason] = useState('');
    
    const [formData, setFormData] = useState({
        enrollmentNo: '',
        name: '',
        fatherName: '',
        course: '',
        department: '',
        sessionBatch: '',
        phone: '',
        validUntil: '',
        email: '',
        currentYear: '',
        semester: '',
        branch: ''
    });
    const [photo, setPhoto] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [existingPhotoUrl, setExistingPhotoUrl] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    useEffect(() => {
        document.title = "Student Profile Completion - SoET | Samrat Vikramaditya Vishwavidyalaya Ujjain";
        
        // Fetch branches
        api.get('/branches').then(res => setBranches(res.data)).catch(console.error);
        
        // Check if profile exists (for resubmission)
        api.get('/student/profile').then(res => {
            if (res.data) {
                if (res.data.verificationStatus === 'rejected') {
                    setIsResubmit(true);
                    setRejectionReason(res.data.rejectionReason);
                    // Pre-fill
                    const { _id, user, photo: fetchedPhoto, verificationStatus, rejectionReason, verifiedBy, verifiedAt, createdAt, updatedAt, __v, ...rest } = res.data;
                    
                    // Format date for input
                    if (rest.validUntil) {
                        rest.validUntil = new Date(rest.validUntil).toISOString().split('T')[0];
                    }
                    
                    if (rest.branch && rest.branch._id) {
                        rest.branch = rest.branch._id;
                    }

                    if (fetchedPhoto) {
                        setExistingPhotoUrl(fetchedPhoto);
                    }
                    
                    setFormData(rest);
                } else {
                    // If it's pending or verified, they shouldn't be here
                    navigate('/student-dashboard');
                }
            }
        }).catch(err => {
            // 404 means not submitted, which is normal for first time
            console.log('No profile found, please submit');
        });
    }, []);

    // Clean up photo object URL to prevent memory leaks
    useEffect(() => {
        if (!photo) {
            setPreviewUrl(null);
            return;
        }
        const objectUrl = URL.createObjectURL(photo);
        setPreviewUrl(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [photo]);

    const handleChange = (e) => {
        if (submitError) setSubmitError('');
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (submitError) setSubmitError('');
        if (!file) {
            setPhoto(null);
            return;
        }

        const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!validTypes.includes(file.type)) {
            toast.error("Invalid file type. Only JPG, PNG, and GIF are allowed.");
            e.target.value = '';
            setPhoto(null);
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error("File size exceeds 5MB limit.");
            e.target.value = '';
            setPhoto(null);
            return;
        }

        setPhoto(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError('');
        
        if (!photo && !isResubmit && !existingPhotoUrl) {
            const err = "Photo is required";
            setSubmitError(err);
            toast.error(err);
            return;
        }

        const data = new FormData();
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });
        if (photo) {
            data.append('photo', photo);
        }

        setIsSubmitting(true);
        try {
            await api.post('/student/profile', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success("Profile submitted successfully");
            navigate('/student/verification-pending');
        } catch (error) {
            const errorMsg = error.response?.data?.error || "Submission failed";
            setSubmitError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <FormPageLayout
            title="Student Profile Completion"
            subtitle="You must complete your profile before accessing the dashboard."
            onLogout={logout}
        >
            {isResubmit && (
                <div className="form-alert-error" role="alert" aria-live="polite">
                    <i className="fas fa-exclamation-circle form-alert-icon" aria-hidden="true"></i>
                    <div className="form-alert-content">
                        <strong>Your previous submission was rejected.</strong><br/>
                        Reason: {rejectionReason}
                    </div>
                </div>
            )}

            {submitError && (
                <div className="form-alert-error" role="alert" aria-live="assertive">
                    <i className="fas fa-exclamation-circle form-alert-icon" aria-hidden="true"></i>
                    <div className="form-alert-content">
                        <strong>Submission Error:</strong> {submitError}
                    </div>
                </div>
            )}
            
            <form onSubmit={handleSubmit} noValidate={false}>
                {/* Section 1: Personal Details */}
                <fieldset className="form-section-fieldset">
                    <legend className="form-section-legend">
                        <span className="form-section-icon-circle" aria-hidden="true">
                            <i className="fas fa-user"></i>
                        </span>
                        <span className="form-section-title">Personal Details</span>
                    </legend>
                    <div className="form-fields-grid">
                        <div className="form-field-group">
                            <label htmlFor="studentName" className="form-field-label">
                                Full Name <span className="form-field-required" aria-hidden="true">*</span>
                            </label>
                            <input
                                id="studentName"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                autoComplete="name"
                                className="form-input-control"
                            />
                        </div>
                        <div className="form-field-group">
                            <label htmlFor="studentFatherName" className="form-field-label">
                                Father's Name <span className="form-field-required" aria-hidden="true">*</span>
                            </label>
                            <input
                                id="studentFatherName"
                                type="text"
                                name="fatherName"
                                value={formData.fatherName}
                                onChange={handleChange}
                                required
                                className="form-input-control"
                            />
                        </div>
                        <div className="form-field-group">
                            <label htmlFor="studentEmail" className="form-field-label">
                                Email <span className="form-field-required" aria-hidden="true">*</span>
                            </label>
                            <input
                                id="studentEmail"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                autoComplete="email"
                                className="form-input-control"
                            />
                        </div>
                        <div className="form-field-group">
                            <label htmlFor="studentPhone" className="form-field-label">
                                Phone Number <span className="form-field-required" aria-hidden="true">*</span>
                            </label>
                            <input
                                id="studentPhone"
                                type="tel"
                                inputMode="tel"
                                autoComplete="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="form-input-control"
                            />
                        </div>
                    </div>
                </fieldset>

                {/* Section 2: Academic Details */}
                <fieldset className="form-section-fieldset">
                    <legend className="form-section-legend">
                        <span className="form-section-icon-circle" aria-hidden="true">
                            <i className="fas fa-graduation-cap"></i>
                        </span>
                        <span className="form-section-title">Academic Details</span>
                    </legend>
                    <div className="form-fields-grid">
                        <div className="form-field-group">
                            <label htmlFor="studentEnrollmentNo" className="form-field-label">
                                Enrollment Number <span className="form-field-required" aria-hidden="true">*</span>
                            </label>
                            <input
                                id="studentEnrollmentNo"
                                type="text"
                                name="enrollmentNo"
                                value={formData.enrollmentNo}
                                onChange={handleChange}
                                required
                                className="form-input-control"
                            />
                        </div>
                        <div className="form-field-group">
                            <label htmlFor="studentCourse" className="form-field-label">
                                Course <span className="form-field-required" aria-hidden="true">*</span>
                            </label>
                            <input
                                id="studentCourse"
                                type="text"
                                name="course"
                                value={formData.course}
                                onChange={handleChange}
                                required
                                className="form-input-control"
                            />
                        </div>
                        <div className="form-field-group">
                            <label htmlFor="studentDepartment" className="form-field-label">
                                Department <span className="form-field-required" aria-hidden="true">*</span>
                            </label>
                            <input
                                id="studentDepartment"
                                type="text"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                required
                                className="form-input-control"
                            />
                        </div>
                        <div className="form-field-group">
                            <label htmlFor="studentBranch" className="form-field-label">
                                Branch <span className="form-field-required" aria-hidden="true">*</span>
                            </label>
                            <select
                                id="studentBranch"
                                name="branch"
                                value={formData.branch}
                                onChange={handleChange}
                                required
                                className={`form-select-control ${!formData.branch ? 'is-placeholder' : ''}`}
                            >
                                <option value="">Select Branch</option>
                                {branches.map(b => (
                                    <option key={b._id} value={b._id}>
                                        {b.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-field-group">
                            <label htmlFor="studentSessionBatch" className="form-field-label">
                                Session / Batch <span className="form-field-required" aria-hidden="true">*</span>
                            </label>
                            <input
                                id="studentSessionBatch"
                                type="text"
                                name="sessionBatch"
                                value={formData.sessionBatch}
                                onChange={handleChange}
                                required
                                placeholder="e.g. 2023-2027"
                                className="form-input-control"
                            />
                        </div>
                        <div className="form-field-group">
                            <label htmlFor="studentCurrentYear" className="form-field-label">
                                Current Year <span className="form-field-required" aria-hidden="true">*</span>
                            </label>
                            <input
                                id="studentCurrentYear"
                                type="text"
                                name="currentYear"
                                value={formData.currentYear}
                                onChange={handleChange}
                                required
                                className="form-input-control"
                            />
                        </div>
                        <div className="form-field-group">
                            <label htmlFor="studentSemester" className="form-field-label">
                                Semester <span className="form-field-required" aria-hidden="true">*</span>
                            </label>
                            <input
                                id="studentSemester"
                                type="text"
                                name="semester"
                                value={formData.semester}
                                onChange={handleChange}
                                required
                                className="form-input-control"
                            />
                        </div>
                    </div>
                </fieldset>

                {/* Section 3: ID Card Details */}
                <fieldset className="form-section-fieldset">
                    <legend className="form-section-legend">
                        <span className="form-section-icon-circle" aria-hidden="true">
                            <i className="fas fa-id-card"></i>
                        </span>
                        <span className="form-section-title">ID Card Details</span>
                    </legend>
                    <div className="form-fields-grid">
                        <div className="form-field-group">
                            <label htmlFor="studentValidUntil" className="form-field-label">
                                Valid Until <span className="form-field-required" aria-hidden="true">*</span>
                            </label>
                            <input
                                id="studentValidUntil"
                                type="date"
                                name="validUntil"
                                value={formData.validUntil}
                                onChange={handleChange}
                                required
                                className="form-date-control"
                            />
                        </div>
                        <div className="form-field-group form-field-span-full">
                            <label htmlFor="studentPhoto" className="form-field-label">
                                Photo <span className="form-field-required" aria-hidden="true">*</span>
                            </label>
                            <span id="photoHelperText" className="form-field-helper-msg" style={{ marginTop: '-4px', marginBottom: '8px' }}>
                                (JPG/PNG/GIF, max 5MB)
                            </span>
                            <div className="form-file-upload-block">
                                <div className="form-file-preview-tile" aria-hidden="true">
                                    {previewUrl || existingPhotoUrl ? (
                                        <img
                                            src={previewUrl || existingPhotoUrl}
                                            alt="Preview"
                                            className="form-file-preview-img"
                                        />
                                    ) : (
                                        <div className="form-file-empty-icon">
                                            <i className="fas fa-image"></i>
                                        </div>
                                    )}
                                </div>
                                <div className="form-file-actions-col">
                                    <div className="form-file-trigger-row">
                                        <label
                                            htmlFor="studentPhoto"
                                            className="form-file-trigger-btn"
                                            tabIndex={0}
                                            role="button"
                                            aria-label="Choose profile photo"
                                            onKeyDown={(e) => {
                                                if (e.key === ' ' || e.key === 'Enter') {
                                                    e.preventDefault();
                                                    document.getElementById('studentPhoto')?.click();
                                                }
                                            }}
                                        >
                                            <i className="fas fa-folder-open" aria-hidden="true"></i>
                                            <span>Choose file</span>
                                        </label>
                                        <span className={`form-file-chosen-name ${!photo && !existingPhotoUrl ? 'is-empty' : ''}`}>
                                            {photo ? photo.name : (existingPhotoUrl ? 'Previous photo attached' : 'No file chosen')}
                                        </span>
                                    </div>
                                </div>
                                <input
                                    id="studentPhoto"
                                    type="file"
                                    name="photo"
                                    accept="image/jpeg, image/png, image/gif"
                                    onChange={handlePhotoChange}
                                    required={!isResubmit && !existingPhotoUrl}
                                    aria-describedby="photoHelperText"
                                    className="visually-hidden-file-input"
                                />
                            </div>
                        </div>
                    </div>
                </fieldset>

                <div className="form-submit-row">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="form-submit-btn"
                        aria-busy={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <i className="fas fa-circle-notch fa-spin form-submit-arrow-icon" aria-hidden="true"></i>
                                <span>Submitting...</span>
                            </>
                        ) : (
                            <>
                                <span>{isResubmit ? 'Resubmit Profile' : 'Submit Profile'}</span>
                                <i className="fas fa-arrow-right form-submit-arrow-icon" aria-hidden="true"></i>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </FormPageLayout>
    );
}
