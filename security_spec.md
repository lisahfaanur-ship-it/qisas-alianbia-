# Security Specification: Light Stories for Children

## Data Invariants
1.  **Admins Only:** The `admins` and `audit_logs` collections are strictly restricted to users with the `super_admin` role or specific admin roles.
2.  **Public Content:** `prophets` (stories) are readable by everyone, but only writable by `content_manager` or `super_admin`.
3.  **User Ownership:** A user can only read and write their own document in the `users` collection.
4.  **Audit Integrity:** Audit logs are append-only (create only) and cannot be modified or deleted by anyone once written.
5.  **Role Protection:** No user (including admins) can change their own role to `super_admin`. Only an existing `super_admin` can promote others.

## The "Dirty Dozen" Payloads (Forbidden)

1.  **Privilege Escalation:** A regular user attempting to create an entry in `admins` with their own UID.
2.  **Shadow Field Injection:** Adding `isAdmin: true` to a story document to bypass future logic.
3.  **Identity Spoofing:** Creating an audit log with someone else's `userId`.
4.  **Content Defacement:** A `viewer` admin attempting to update a prophet story's text.
5.  **User Data Theft:** User A trying to `get` User B's achievement data.
6.  **Log Tampering:** Attempting to `delete` or `update` an existing audit log entry.
7.  **Resource Poisoning:** Injecting a 2MB string into a prophet story name field (limit 100 chars).
8.  **Orphaned Content:** Creating a story with a reference to a non-existent category.
9.  **Bypassing Verification:** Setting a story status to `verified` without being a `content_manager`.
10. **Self-Promotion:** A `content_manager` attempting to update their own role in `admins` to `super_admin`.
11. **PII Leak:** A public `list` query on `users` that returns emails.
12. **Future-Dating Logs:** Creating an audit log with a timestamp in the year 2099.

## Evaluation Plan
-   All writes must use `isValid[Entity]()` helpers.
-   All updates must use `affectedKeys().hasOnly()` to prevent shadow fields.
-   Admins must be verified via `exists(/databases/$(database)/documents/admins/$(request.auth.uid))`.
