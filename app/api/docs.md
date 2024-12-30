POST /api/jobs
Request body: { "title": "string", "description": "string", "location": "string", "requirements": "string", "contact_email": "string", "application_deadline": "date" }
Response: { "message": "Job submitted successfully", "jobId": "string" }

GET /api/employers/jobs
Query parameters: employerId=string
Response: [ { "jobId": "string", "title": "string", "status": "Pending/Approved/Rejected" } ]
Backend Panel Functionality

PUT /api/jobs/{jobId}/approve
Response: { "message": "Job approved successfully" }

DELETE /api/jobs/{jobId}
Response: { "message": "Job deleted successfully" }

GET /api/admin/jobs
Query parameters: status=Pending/Approved/Rejected (Optional)
Response: [ { "jobId": "string", "title": "string", "employer": "string", "status": "string" } ]
Student Functionality

GET /api/jobs
Query parameters: page=number (Optional for pagination), search=string (Optional for keyword search)
Response: [ { "jobId": "string", "title": "string", "description": "string", "location": "string", "requirements": "string", "application_deadline": "date" } ]

POST /api/jobs/{jobId}/apply
Request body: { "studentId": "string", "resume": "string (base64-encoded file or URL)", "coverLetter": "string" }
Response: { "message": "Application submitted successfully" }

GET /api/students/{studentId}/applications
Response: [ { "jobId": "string", "title": "string", "status": "Applied/Under Review/Accepted/Rejected" } ]
Authentication and User Management

POST /api/auth/register/employer
Request body: { "name": "string", "email": "string", "password": "string" }
Response: { "message": "Employer registered successfully", "employerId": "string" }

POST /api/auth/register/student
Request body: { "name": "string", "email": "string", "password": "string" }
Response: { "message": "Student registered successfully", "studentId": "string" }

POST /api/auth/login
Request body: { "email": "string", "password": "string" }
Response: { "token": "string", "role": "Student/Employer/Admin" }

POST /api/auth/logout
Response: { "message": "Logged out successfully" }

GET /api/jobs/{jobId}
Response: { "jobId": "string", "title": "string", "description": "string", "location": "string", "requirements": "string", "contact_email": "string", "application_deadline": "date" }

GET /api/admin/metrics
Response: { "totalJobs": number, "pendingJobs": number, "approvedJobs": number, "totalApplications": number }
