const fs = require('fs');
const path = require('path');
const vCardParser = require('vcard-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Specify the folder containing .vcf files
const folderPath = path.join(__dirname, 'Contacts');  // Folder containing .vcf files
const outputCsvPath = path.join(__dirname, 'output.csv');  // Output CSV file path

// Initialize the CSV writer with column headers
const csvWriter = createCsvWriter({
  path: outputCsvPath, // Output file path
  header: [
    { id: 'fullName', title: 'Full Name' },   // First column: Full Name
    { id: 'phoneNumber', title: 'Phone Number' },  // Second column: Phone Number
    { id: 'altPhoneNumber', title: 'Alternative Phone Number' },  // Second column: Phone Number
  ]
});

// Initialize an array to store the parsed vCard data for CSV
const dataForCsv = [];

// Function to process vCard files and save to CSV
const processVcfFiles = (folderPath) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error('Unable to read folder:', err);
      return;
    }

    // Filter out only .vcf files
    const vcfFiles = files.filter(file => path.extname(file).toLowerCase() === '.vcf');
    
    // Process each .vcf file and return a promise
    const promises = vcfFiles.map(file => {
      return new Promise((resolve, reject) => {
        const filePath = path.join(folderPath, file);

        // Read the .vcf file
        fs.readFile(filePath, 'utf-8', (err, data) => {
          if (err) {
            console.error('Error reading file:', file, err);
            return reject(err);
          }

          // Parse the vCard data
          const parsedData = vCardParser.parse(data);
          
          // Log the structure of parsedData for debugging
          console.log(`Parsed data for file ${file}:`, JSON.stringify(parsedData, null, 2));

          if (parsedData.length === 0) {
            console.error(`No valid contacts found in file: ${file}`);
            return resolve();
          }

          const fullNames = parsedData?.fn || [];
          const phoneNumbers = parsedData?.tel || [];
          console.log(fullNames,phoneNumbers)

          // Iterate over both full names and phone numbers, assuming they correspond
          for (let i = 0; i < Math.max(fullNames.length, phoneNumbers.length); i++) {
            const fullName = fullNames[i]?.value || 'N/A';  // Get the full name at index i
            const phoneNumber = phoneNumbers[i]?.value || 'N/A';  // Get the phone number at index i
            // Add the extracted data to the CSV data array
            dataForCsv.push({ fullName, phoneNumber });
          }

          resolve();  // Resolve the promise after the file is processed
        });
      });
    });

    // Wait for all files to be processed
    Promise.all(promises)
      .then(() => {
        // After all files have been processed, write to the CSV file
        console.log("Final Data for CSV:", JSON.stringify(dataForCsv, null, 2));
        writeToCsv(dataForCsv);
      })
      .catch(err => {
        console.error('Error processing files:', err);
      });
  });
};

// Function to write data to the CSV file
const writeToCsv = (data) => {
  csvWriter.writeRecords(data)
    .then(() => {
      console.log('Data written to CSV file:', outputCsvPath);
    })
    .catch(err => {
      console.error('Error writing CSV file:', err);
    });
};

// Call the function to start processing files
processVcfFiles(folderPath);
