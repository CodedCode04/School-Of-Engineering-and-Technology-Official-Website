# SoET Website — Manual Test Checklist

> **Purpose:** Verify all 6 user roles and major features work correctly end-to-end.  
> **Setup:** Ensure both `soet-api` (port 5000) and `soet-client` (port 5173) are running, and MongoDB is connected.

---

## ✅ SETUP

- [ ] Backend starts without errors: `cd soet-api && npm run dev`
- [ ] Frontend starts without errors: `cd soet-client && npm run dev`
- [ ] `/health` endpoint returns `{ status: "ok" }`
- [ ] DB seeded with branches (CSE, ECE, ME, etc.)
- [ ] Admin account exists and can log in

---

## 1. 🌐 PUBLIC / UNAUTHENTICATED

- [ ] Home page loads with hero section, counters, and announcements
- [ ] About, Academics, Activities, Facilities, Contact pages load correctly
- [ ] Contact form submits (requires Turnstile in prod; works locally without it)
- [ ] Newsletter subscribe works
- [ ] `/login` and `/register/:role` are accessible without auth
- [ ] Navigating to protected routes redirects to `/login`
- [ ] 404 page shown for unknown routes

---

## 2. 🔑 AUTHENTICATION

### Registration
- [ ] Student registration with all required fields succeeds → redirects to awaiting approval or profile completion
- [ ] HOD registration succeeds → awaiting approval
- [ ] Teacher registration succeeds → awaiting approval
- [ ] Alumni registration succeeds → awaiting approval
- [ ] Duplicate email shows error
- [ ] Weak password (< 6 chars) blocked by client-side validation

### Login
- [ ] Correct credentials → correct dashboard redirect per role
- [ ] Wrong password → error toast shown
- [ ] Blocked user → "User is blocked" error
- [ ] Pending user after login → `/awaiting-approval` page shown
- [ ] JWT is stored in memory (not visible in Application → Storage tab)

### Logout
- [ ] Logout clears auth state and redirects to home

---

## 3. 👤 STUDENT ROLE

### Profile Flow
- [ ] After first login → redirected to `/student/profile-completion`
- [ ] Form requires enrollment no, branch, year, semester
- [ ] Photo upload (JPG/PNG, max 5MB) works; larger file blocked
- [ ] After submission → redirected to `/student/verification-pending`
- [ ] After HOD/Admin approves → `/student-dashboard` accessible

### Dashboard
- [ ] Student Dashboard loads with name and role badge
- [ ] Notification bell shows unread count
- [ ] Can navigate to Syllabus, Portfolio, Chat

### Syllabus
- [ ] `/syllabus` shows only own branch syllabi
- [ ] Branch filter and semester filter work
- [ ] PDF download/view link works (opens PDF or downloads)
- [ ] Attempting to POST to `/api/syllabus` returns 403

### Academic & Achievements Portfolio
- [ ] Can add academic record (semester, SGPA, CGPA, backlogs)
- [ ] Can edit and delete own academic records
- [ ] Can add achievement (title, category, date, certificate upload)
- [ ] Can add projects, internships, skills, LinkedIn, GitHub
- [ ] Resume upload works

### Alumni Features
- [ ] Can view `/alumni-directory`
- [ ] Can view `/job-referrals`
- [ ] Can send a mentorship request to an alumni
- [ ] Can view own mentorship request status

### Chat
- [ ] Can see own branch chat room
- [ ] Cannot see other branch rooms (API returns 403 if tried directly)
- [ ] Can send messages and see them appear in real-time
- [ ] Cannot send messages if chat-blocked

---

## 4. 🎓 HOD ROLE

### Dashboard & Approvals
- [ ] HOD Dashboard loads
- [ ] Can see pending student list
- [ ] Can approve / reject a student individually
- [ ] Can bulk approve students

### Syllabus Management
- [ ] `/manage-syllabus` accessible
- [ ] Can upload syllabus PDF (non-PDF blocked with error)
- [ ] Can upload for ANY branch (not just own)
- [ ] Can edit and delete syllabus entries
- [ ] AuditLog entry created for each change

### Announcements
- [ ] Can create, edit, pin/unpin, and delete announcements
- [ ] Rich text editor works (bold, lists, links)
- [ ] Cover image and attachments upload
- [ ] Published vs draft toggle works

### Chat
- [ ] Can access all branch rooms, teachers group, HOD group, administrative group

---

## 5. 👨‍💼 ADMIN ROLE

### User Management
- [ ] Can view all users filtered by role and status
- [ ] Can approve, reject, block, unblock any non-admin user
- [ ] Can delete users (not self or other admins)
- [ ] Can create TPO account directly

### Syllabus & Announcements
- [ ] All HOD permissions apply to Admin as well

### Audit Logs
- [ ] `/audit-logs` shows all changes with actor, action, entity, before/after
- [ ] Can filter by actor, action, and date range

### Chat Moderation
- [ ] `/admin/chat-moderation` lists all chat-blocked users
- [ ] Can block/mute a user with reason and optional end date
- [ ] Blocked user cannot send messages (server rejects)
- [ ] Can delete any message in any room

### Success Stories
- [ ] Can approve or reject alumni success story submissions

---

## 6. 📋 TPO ROLE

### Student Database
- [ ] `/tpo-dashboard` shows paginated verified student table
- [ ] Search by name, enrollment no, email, skills works
- [ ] Filters: branch, year/semester, CGPA range, placement status, has internship
- [ ] Column chooser shows/hides columns
- [ ] Clicking a row opens full student detail view with academics + achievements
- [ ] Export to Excel (.xlsx) downloads file with current filters applied
- [ ] Export to CSV downloads file with current filters applied

### Announcements
- [ ] TPO can create placement-category announcements
- [ ] TPO cannot create non-placement announcements (if restricted)

### Job Referrals
- [ ] TPO can view job referrals

---

## 7. 🎓 ALUMNI ROLE

### Profile
- [ ] After login → `/alumni/profile-completion` shown until profile submitted
- [ ] Can update profile (company, role, location, LinkedIn, photo)
- [ ] Photo preview shown after upload

### Alumni Dashboard
- [ ] Dashboard shows links to: profile, directory, job referrals, mentorship, success stories, chat, notifications

### Job Referrals
- [ ] Can post a job/internship referral with title, company, description, link, branch, expiry date
- [ ] Expired referrals not shown to students

### Mentorship
- [ ] Receives notification when a student sends a request
- [ ] Can view incoming mentorship requests
- [ ] Can accept or decline → student receives notification

### Success Stories
- [ ] Can submit a success story
- [ ] Story shows as "pending" until Admin approves
- [ ] Approved stories appear on the public `/success-stories` page

### Chat
- [ ] Can access Alumni Chat room

---

## 8. 🔒 SECURITY / IDOR CHECKS

- [ ] Student A cannot view Student B's profile by changing URL param
- [ ] CSE student calling `GET /api/chat/rooms/:eceRoomId/messages` returns 403
- [ ] Student calling `POST /api/syllabus` returns 403
- [ ] Teacher calling `DELETE /api/admin/users/:id` returns 403
- [ ] Non-admin calling `PUT /api/admin/users/:id/status` returns 403
- [ ] Uploading a `.exe` file to any upload endpoint is rejected
- [ ] Uploading an image to syllabus upload is rejected (PDF only)
- [ ] Unauthenticated request to any protected route returns 401
- [ ] Expired JWT returns 401 (not 500)

---

## 9. 📱 UI / UX

- [ ] All pages have loading states (spinners or skeleton)
- [ ] All error states show a toast message
- [ ] Empty states have friendly messages (e.g., "No syllabus uploaded yet")
- [ ] 404 page renders for invalid routes
- [ ] Site is responsive on mobile (< 768px)
- [ ] Toast notifications appear top-right and auto-dismiss

---

## 10. ⚡ REAL-TIME (Socket.IO)

- [ ] Opening chat in two browser tabs → messages appear in both
- [ ] Typing indicator shows when another user types
- [ ] Deleting a message marks it as deleted in all open tabs

---

*Last updated: October 2026 — covers all 6 roles and the full feature set.*
