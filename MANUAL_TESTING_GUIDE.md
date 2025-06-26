# Manual Testing Guide for User Form Validation

## Overview
This guide provides step-by-step instructions to manually test the enhanced validation rules implemented in the Add User modal.

## Prerequisites
1. Start the development server: `npm run dev`
2. Open http://localhost:5173 in your browser
3. Click the "Add User" button to open the modal

## Test Cases

### 1. Name Field Validation

#### Test 1.1: Required Validation
- **Steps**: Leave Name field empty and click "Add"
- **Expected**: Error message "Name is required"

#### Test 1.2: Maximum Length Validation
- **Steps**: Enter 51 characters in Name field (e.g., "a" repeated 51 times)
- **Expected**: Error message "Name must be at most 50 characters"

#### Test 1.3: Pattern Validation - Invalid Characters
- **Steps**: Enter "John@Doe!" in Name field
- **Expected**: Error message "Name must contain only letters, numbers, underscores, and spaces"

#### Test 1.4: Pattern Validation - Valid Input
- **Steps**: Enter "John Doe_123" in Name field
- **Expected**: No error message should appear

### 2. Username Field Validation

#### Test 2.1: Required Validation
- **Steps**: Leave Username field empty and click "Add"
- **Expected**: Error message "Username is required"

#### Test 2.2: Maximum Length Validation
- **Steps**: Enter 51 characters in Username field
- **Expected**: Error message "Username must be at most 50 characters"

#### Test 2.3: Pattern Validation - Invalid Characters
- **Steps**: Enter "user@name!" in Username field
- **Expected**: Error message "Username must contain only letters, numbers, underscores, and spaces"

#### Test 2.4: Pattern Validation - Valid Input
- **Steps**: Enter "user_name123" in Username field
- **Expected**: No error message should appear

### 3. Email Field Validation

#### Test 3.1: Required Validation
- **Steps**: Leave Email field empty and click "Add"
- **Expected**: Error message "Email is required"

#### Test 3.2: Maximum Length Validation
- **Steps**: Enter an email longer than 50 characters (e.g., "verylongusernamethatexceedsfiftychars@domain.com")
- **Expected**: Error message "Email must be at most 50 characters"

#### Test 3.3: Pattern Validation - Invalid Email Format
- **Steps**: Enter "invalid-email" in Email field
- **Expected**: Error message "Email must be a valid email address"

#### Test 3.4: Pattern Validation - Valid Input
- **Steps**: Enter "john@example.com" in Email field
- **Expected**: No error message should appear

### 4. TIN Field Validation

#### Test 4.1: Required Validation
- **Steps**: Leave TIN field empty and click "Add"
- **Expected**: Error message "TIN is required"

#### Test 4.2: Pattern Validation - Less than 9 digits
- **Steps**: Enter "12345" in TIN field
- **Expected**: Error message "TIN must be exactly 9 digits"

#### Test 4.3: Pattern Validation - More than 9 digits
- **Steps**: Enter "1234567890" in TIN field
- **Expected**: Error message "TIN must be exactly 9 digits"

#### Test 4.4: Pattern Validation - Contains letters
- **Steps**: Enter "123abc789" in TIN field
- **Expected**: Error message "TIN must be exactly 9 digits"

#### Test 4.5: Pattern Validation - Valid Input
- **Steps**: Enter "123456789" in TIN field
- **Expected**: No error message should appear

### 5. Phone Field Validation

#### Test 5.1: Required Validation
- **Steps**: Leave Phone field empty and click "Add"
- **Expected**: Error message "Phone is required"

#### Test 5.2: Pattern Validation - Less than 10 digits
- **Steps**: Enter "12345" in Phone field
- **Expected**: Error message "Phone must be exactly 10 digits"

#### Test 5.3: Pattern Validation - More than 10 digits
- **Steps**: Enter "12345678901" in Phone field
- **Expected**: Error message "Phone must be exactly 10 digits"

#### Test 5.4: Pattern Validation - Contains letters
- **Steps**: Enter "123abc7890" in Phone field
- **Expected**: Error message "Phone must be exactly 10 digits"

#### Test 5.5: Pattern Validation - Valid Input
- **Steps**: Enter "1234567890" in Phone field
- **Expected**: No error message should appear

### 6. Website Field Validation (Optional Field)

#### Test 6.1: Empty Field (Should be valid)
- **Steps**: Leave Website field empty and ensure other fields are valid
- **Expected**: Form should submit successfully (no error for Website)

#### Test 6.2: Pattern Validation - Invalid URL
- **Steps**: Enter "invalid-url" in Website field
- **Expected**: Error message "Website must be a valid URL (starting with http:// or https://)"

#### Test 6.3: Pattern Validation - Valid HTTP URL
- **Steps**: Enter "http://example.com" in Website field
- **Expected**: No error message should appear

#### Test 6.4: Pattern Validation - Valid HTTPS URL
- **Steps**: Enter "https://example.com" in Website field
- **Expected**: No error message should appear

### 7. Complete Form Submission

#### Test 7.1: Valid Form Submission
- **Steps**: Fill all fields with valid data:
  - Name: "John Doe"
  - Username: "john_doe123"
  - Email: "john@example.com"
  - TIN: "123456789"
  - Phone: "1234567890"
  - Website: "https://johndoe.com"
- **Expected**: Form submits successfully, modal closes, and new user appears in the table

## Validation Rules Summary

- **Name**: Required, max 50 chars, alphanumeric + underscore + spaces only
- **Username**: Required, max 50 chars, alphanumeric + underscore + spaces only
- **Email**: Required, max 50 chars, valid email format
- **TIN**: Required, exactly 9 digits
- **Phone**: Required, exactly 10 digits
- **Website**: Optional, must be valid URL with http:// or https://

## Notes
- Validation errors appear immediately when the "Add" button is clicked
- Each field is validated independently
- The form will not submit until all validation errors are resolved
- Red error messages appear below each field with validation issues