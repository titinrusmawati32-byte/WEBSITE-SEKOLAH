# Security Specification: SD Nusantara Registration System

## 1. Data Invariants
- **Authentication**: Anyone can create an applicant record (public registration). 
- **Read Access (Get)**: Anyone can read a specific applicant record by dynamic `applicantId` (checked via `isValidId()`) to allow status checking, or if authorized (e.g. admins can read all).
- **Read Access (List)**: Only authenticated Admins can query or list all applicant records.
- **Update/Delete Access**: Only authenticated Admins can edit or delete applicant records to change status or correct information.
- **System Integrity (Status lock)**: No external user can set status or update status fields except certified admins.
- **ID Integrity**: Document ID must match `^[a-zA-Z0-9_\-]+$` and be <= 128 characters.

## 2. The "Dirty Dozen" Payloads (Vulnerability Test Scenarios)
These malicious payloads target the system's endpoints and must be rejected by Fire Store:
1. Set an arbitrary document ID with 1MB emoji overload to bypass limits.
2. Edit an existing applicant's status to 'Diterima' without admin credentials.
3. Query other applicants' information using blanket list reads (scraping all registrants' PII).
4. Create an applicant document missing required fields like `namaLengkap`.
5. Spoof identity by updating another student's registration using client SDK.
6. Submit registration with a future timestamp pretending to be past.
7. Inject a malicious script or wrong type (e.g. boolean instead of string name) into `namaLengkap`.
8. Inject massive "Ghost Fields" under shadow update attacks.
9. Admin privilege escalation by client-side self-assigned claims.
10. Delete an existing applicant file without admin authorization.
11. Bypassing state checks by sending `null` value for key fields.
12. Attempting database denial-of-service via huge arrays.

## 3. Test Cases (Represented below as assertions)
- Expect permission denied on listing collections for non-admins.
- Expect permission denied on writing/updating for non-admins.
- Expect success on individual `get` of a valid applicant, but failure if applicant ID is malicious.
