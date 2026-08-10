---
sidebar_position: 10
title: Security
---

Security
========

## Secure Coding Guidelines

For general information about security development of Joomla extensions, see the generic [Security](../security/fundamentals.md) section. 

## Policies and Best Practices

It's barely a question *if* your extension will ever have a security vulnerability, it's just a matter of when. So, establishing security best practices, policies and workflows is a vital part of developing Joomla extensions.

### 1. Establish a clear security reporting channel

Every publicly available Joomla extension should provide an obvious way to report security vulnerabilities.

Recommended:

* A dedicated security contact such as `security@example.com`
* A `SECURITY.md` file in the source repository
* A security page on the vendor website
* Clear instructions on what information should be included
* An explicit statement that security reports should **not** be submitted through public issue trackers

The reporting channel should ideally support encrypted communication for sensitive reports.

A security policy should state:

* How reports are received
* Expected response times
* How vulnerabilities are handled
* How disclosure is coordinated
* Whether reporters are credited
* Whether CVE IDs are assigned

This follows the general principles of **ISO/IEC 29147**, which covers receiving vulnerability reports and communicating remediation information.

---

### 2. Treat security reports confidentially

A vulnerability report should initially be treated as confidential.

Do **not**:

* Create a public GitHub issue
* Publish the proof of concept
* Discuss the vulnerability publicly
* Include exploit details in public commit messages or changelogs

until a coordinated disclosure date has been agreed upon.

Internally, the report should receive a unique tracking ID and have a clearly defined owner.

A useful lifecycle is:

```text
Reported
   ↓
Acknowledged
   ↓
Validated
   ↓
Severity assessed
   ↓
Fix developed
   ↓
Fix verified
   ↓
CVE assigned
   ↓
Coordinated disclosure
   ↓
Public advisory
   ↓
Post-disclosure monitoring
```

---

### 3. Acknowledge the reporter quickly

A reporter should receive an acknowledgement even if the vulnerability has not yet been validated.

Recommended targets:

* **Within 1 business day:** acknowledge receipt
* **Within 3–5 business days:** provide an initial assessment
* **During longer investigations:** provide regular status updates

The acknowledgement should explain:

* That the report was received
* Who is handling it
* Whether additional information is required
* What the next steps are

---

### 4. Validate the vulnerability

The maintainer should establish:

* Affected extension/component
* Affected versions
* Supported Joomla versions
* Attack prerequisites
* Required user privileges
* Whether authentication is required
* Whether user interaction is required
* Actual security impact
* Exploitability
* Whether the issue has already been publicly disclosed
* Whether another vendor or dependency is affected

The reporter should be given the opportunity to provide additional technical information or a proof of concept.

---

### 5. Distinguish security bugs from ordinary bugs

Not every bug is a security vulnerability.

Examples of typical security vulnerabilities include:

* SQL Injection
* Cross-Site Scripting (XSS)
* Cross-Site Request Forgery (CSRF)
* Authentication bypass
* Authorization/access-control bypass
* Privilege escalation
* Arbitrary file upload
* Arbitrary file deletion
* Path traversal
* Remote or local code execution
* Sensitive information disclosure
* Insecure deserialization
* Server-Side Request Forgery (SSRF)

A vulnerability should be assessed based on its **security impact**, not merely on how severe the underlying coding mistake appears.

---

### 6. Assess severity consistently

Use a standardized scoring system rather than arbitrary labels such as "critical" or "minor".

**CVSS 4.0** is the recommended standard for communicating vulnerability severity.

At minimum, record:

```text
CVSS:4.0/...
Base Score: 8.3
Severity: High
```

Also document the practical prerequisites, for example:

```text
Attack Vector: Network
Privileges Required: Low
User Interaction: Required
Affected functionality: Administrator
Exploitability: Requires authenticated Joomla user
```

Do not treat the CVSS Base Score as the complete risk assessment. Consider the actual deployment environment and current threat situation as well.

---

### 7. Develop the fix privately

The fix should be developed without exposing the vulnerability.

Recommended practices:

* Private branch
* Private repository where necessary
* Security-specific test cases
* Regression tests
* Review by at least one additional developer
* Testing against all supported Joomla versions

The security fix should ideally include a regression test that:

1. Fails against the vulnerable implementation
2. Passes against the fixed implementation

---

### 8. Consider downstream dependencies

A Joomla extension may itself contain or depend on other software.

Before disclosure, check whether the vulnerability also affects:

* Joomla itself
* Another Joomla extension
* A third-party PHP library
* JavaScript dependencies
* An API or external service
* Another vendor's product
* Bundled or copied code

If multiple parties are affected, use **Coordinated Vulnerability Disclosure (CVD)** rather than disclosing independently.

---

### 9. Coordinate a disclosure date

The goal should not be to keep a vulnerability secret indefinitely.

Instead, agree on a reasonable disclosure timeline.

A practical model:

```text
Day 0       Report received
Day 1       Acknowledgement
Day 3–5     Initial assessment
             ↓
             Fix development
             ↓
             CVE coordination
             ↓
             Fixed version released
             ↓
             Public advisory
```

The exact timeline should depend on severity and exploitability.

For a vulnerability that is already being exploited in the wild, the process should be accelerated substantially.

For vulnerabilities affecting several vendors, the disclosure date should be coordinated between all relevant parties.

---

### 10. CVE IDs

A **CVE ID identifies a vulnerability**, not a software release or a particular patch.

For example:

```text
CVE-2026-12345
```

is associated with the vulnerability itself.

Do **not** create a separate CVE merely because different releases address the same vulnerability.

Separate vulnerabilities should normally receive separate CVE IDs.

### Joomla extensions

Joomla extension developers can request a CVE ID from the Joomla security team by contacting:

```text
security@joomla.org
```

The CVE assignment should be coordinated with Joomla's **CVE Numbering Authority (CNA)** rather than inventing or requesting an arbitrary CVE number.

---

### 11. Assign the CVE before public disclosure

Ideally, the first public security advisory should already contain the CVE ID.

Extension developers can request the CVE ID from:

```text
security@joomla.org
```

before public disclosure so that it can be included in the initial announcement.

The CVE ID should be associated with the vulnerability and consistently referenced across:

* Security advisory
* Changelog
* Release notes
* CVE record
* Joomla security communication
* Other relevant security databases

Follow the current CVE Program and CNA publication requirements and coordinate embargoes where applicable.

---

### 12. Credit the security researcher

**Always offer appropriate credit to the reporter.**

For example:

```text
This vulnerability was responsibly reported by
Jane Doe (@janedoe).

We thank Jane for responsibly reporting this issue
and helping us improve the security of this extension.
```

However:

> **Never publish a reporter's name, handle, company or other identifying information without their consent.**

Ask the reporter exactly how they want to be credited.

Possible choices include:

```text
Name:
Jane Doe

Handle:
@janedoe

Organization:
Security Research Lab

Anonymous:
Yes
```

Confirm that the proposed credit is acceptable before publication.

---

### 13. Publish a security advisory

Do not rely exclusively on a generic changelog such as:

```text
1.4.2
- Various bug fixes and improvements
```

Publish a dedicated security advisory.

A proper advisory should contain:

```text
Security Advisory

Product
Example Joomla Extension

Vulnerability
Stored Cross-Site Scripting

CVE
CVE-2026-12345

Affected Versions
1.0.0 – 1.4.1

Fixed Versions
1.4.2 and later

Severity
High

CVSS
CVSS:4.0/...

Impact
An authenticated user with ... can ...

Description
...

Solution
Update to version 1.4.2 or later.

Credits
Reported by Jane Doe.

Timeline
2026-07-01  Report received
2026-07-02  Vulnerability confirmed
2026-07-15  Fix released
2026-07-15  Advisory published
```

Joomla's own security advisories provide a useful model: they identify affected versions, impact, severity, exploit type, report/fix dates, CVE number, description, solution and reporter.

---

### 14. Tell users what they need to do

The most important information for users is:

> **Am I affected, and what should I do?**

Every advisory should clearly state:

#### Affected versions

```text
Versions 2.0.0 through 2.4.7 are affected.
```

#### Fixed versions

```text
Upgrade to 2.4.8 or later.
```

#### Recommended action

```text
All users running an affected version should update immediately.
```

If updating is not possible, provide a mitigation where one genuinely exists.

For example:

```text
Until the extension can be updated, disable the affected
administrator endpoint.
```

Do not recommend a mitigation that has not been tested.

---

### 15. Explain the vulnerability without unnecessarily publishing an exploit

A security advisory should provide enough information for administrators to understand the risk.

It should answer:

* What is the vulnerability?
* Who can exploit it?
* Is authentication required?
* What can an attacker accomplish?
* Which versions are affected?
* Is exploitation known?
* How can users fix it?

A vendor does **not necessarily need to publish a working exploit/PoC** immediately.

Especially for high-impact vulnerabilities, avoid publishing exploit details that materially increase the risk to users who have not yet updated.

The principle should be:

> **Transparency sufficient for risk assessment, without unnecessarily increasing exploitability.**

---

### 16. Notify users through appropriate channels

Security fixes should be communicated through channels users actually monitor.

Depending on the extension:

* Extension update mechanism
* Joomla Extension Directory
* Vendor website
* Security advisory page
* Mailing list
* RSS feed
* GitHub Security Advisory
* Newsletter
* Social media, where appropriate

The Joomla Security Centre provides a public security announcement feed that users can subscribe to.

For particularly severe vulnerabilities, do not rely exclusively on a changelog.

---

### 17. Do not hide security fixes in vague language

Avoid:

```text
Various bug fixes and improvements
```

when a security vulnerability was fixed.

Prefer:

```text
Security: Fixed an authenticated SQL injection vulnerability
in the administrator filtering functionality.

CVE-2026-12345
```

Security transparency helps users make informed decisions about updates.

---

### 18. Preserve the disclosure timeline

Maintain an internal timeline for every security issue:

```text
2026-07-01  Vulnerability reported
2026-07-01  Report acknowledged
2026-07-03  Vulnerability confirmed
2026-07-04  CVE requested
2026-07-08  Fix completed
2026-07-10  Fix provided to reporter for verification
2026-07-12  Fixed release published
2026-07-12  CVE published
2026-07-12  Security advisory published
```

This is useful for:

* Internal audits
* Communication with researchers
* CVE records
* Incident response
* Process improvements

---

### 19. Handle reports that are already public

Sometimes a researcher publishes a vulnerability before contacting the vendor.

Do not automatically treat this as malicious.

Instead:

1. Acknowledge the report
2. Assess the vulnerability
3. Determine whether a CVE already exists
4. Coordinate with the reporter where possible
5. Release a fix as quickly as practical
6. Publish an advisory

The CVE process also provides mechanisms for vulnerabilities that have already been publicly disclosed.

---

### 20. Do not retaliate against good-faith researchers

A responsible disclosure process should explicitly state that good-faith security research is welcome.

A useful policy statement is:

> We welcome good-faith security research and responsible vulnerability disclosure. Researchers who follow this policy will not be subject to legal action by us solely for activities conducted in accordance with this policy.

However, define reasonable boundaries around:

* Accessing other users' data
* Destructive testing
* Denial-of-service testing
* Social engineering
* Automated scanning of third-party infrastructure
* Persistence
* Data exfiltration

---
