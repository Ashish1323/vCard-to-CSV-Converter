# vCard to CSV Converter

## Overview

This project contains a Node.js script that processes `.vcf` (vCard) files from a specified folder and extracts the contact information such as full name and phone numbers. The extracted data is then written to a CSV file with columns for full names and phone numbers. 

## Features

- Extracts full names and phone numbers from `.vcf` files.
- Supports multiple `.vcf` files within a specified folder.
- Outputs data to a CSV file with three columns: Full Name, Phone Number, and Alternative Phone Number.

## Dependencies

This script uses the following npm packages:

- `fs`: Node.js built-in package for file system operations.
- `path`: Node.js built-in package for handling file paths.
- `vcard-parser`: Parses `.vcf` files into a readable JavaScript object format.
- `csv-writer`: Utility for writing data to CSV files.

## Installation

1. Clone the repository or copy the script into your project folder.

2. Install the required npm packages by running:

   ```bash
   npm install vcard-parser csv-writer
   ```

3. Make sure Node.js is installed in your environment. You can verify this by running:

   ```bash
   node -v
   ```

## Usage

### Steps to use the script:

1. **Specify the folder containing `.vcf` files**: Update the `folderPath` variable with the path to the folder where your `.vcf` files are stored. For example:
   
   ```javascript
   const folderPath = '/Users/ashish/Documents/Contacts';
   ```

2. **Specify the output CSV file path**: Update the `outputCsvPath` variable with the desired output location for the CSV file. For example:

   ```javascript
   const outputCsvPath = '/Users/ashish/Documents/output.csv';
   ```

3. **Run the script**:

   After making these changes, you can run the script using Node.js:

   ```bash
   node index.js
   ```

   The script will read all `.vcf` files in the specified folder, extract full names and phone numbers, and save them into a CSV file at the location you specified.

### CSV Output

The output CSV file will have the following columns:

- **Full Name**: The contact's full name.
- **Phone Number**: The primary phone number associated with the contact.
- **Alternative Phone Number**: Currently not populated in this script, but included for future use if you want to add alternate phone number extraction logic.

### Logging

For each `.vcf` file, the script logs the parsed data to the console for debugging purposes. Additionally, it will log any errors encountered during file reading or CSV writing.

## Error Handling

- If a `.vcf` file does not contain any valid contact information, an error message is displayed in the console, and that file is skipped.
- If the script encounters issues while reading or writing files, the corresponding error messages are logged.

## Customization

- You can extend the script to capture more fields from the vCard such as email addresses, alternative phone numbers, or addresses by modifying the relevant sections of the parsing logic.
  
## Example

Example `.vcf` content:

```vcard
BEGIN:VCARD
FN:John Doe
TEL:+1234567890
END:VCARD
```

This will generate the following output in the CSV file:

| Full Name | Phone Number | Alternative Phone Number |
|-----------|--------------|--------------------------|
| John Doe  | +1234567890  | N/A                      |

## License

This project is licensed under the MIT License.
