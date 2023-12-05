// Function to clean up and log the content of elements with a specific class in a single table
function logCleanedCompanyInfoInTable() {
    // Define an array to store the cleaned information for each component
    var componentsData = [];

    // Select all elements with the specified class
    var components = document.querySelectorAll('.eyxqWe');

    // Function to extract 10-digit phone number
    function extractPhoneNumber(rawPhoneNumber) {
        // Remove non-numeric characters
        var numericOnly = rawPhoneNumber.replace(/\D/g, '');

        // If the number starts with +1, remove it
        if (numericOnly.startsWith('1')) {
            numericOnly = numericOnly.slice(1);
        }

        // Return the first 10 digits
        return numericOnly.slice(0, 10);
    }

    // Function to clean up address
    function cleanAddress(rawAddress) {
        // Remove ', United States' from the end
        return rawAddress.replace(', United States', '').trim();
    }

    // Loop through each component
    components.forEach(function(component) {
        // Extract information from the current component
        var companyName = component.querySelector('.rgnuSb.tZPcob');
        var googleReview = component.querySelector('.rGaJuf');
        var yearsInBusiness = component.querySelector('.FjZRNe');
        var phoneNumberElement = component.querySelector('.eigqqc');
        var website = component.querySelector('.Gx8NHe');
        var addressElement = component.querySelector('.fccl3c');

        // Create an object with the cleaned information for the current component
        var componentData = {
            'Company Name': companyName ? companyName.textContent.trim().replace(/'/g, '') : undefined,
            'Google Review': googleReview ? googleReview.textContent.trim().replace(/'/g, '') : undefined,
            'Years in Business': yearsInBusiness ? yearsInBusiness.textContent.trim().replace(/'/g, '') : undefined,
            'Phone Number': phoneNumberElement ? extractPhoneNumber(phoneNumberElement.textContent.trim()) : undefined,
            'Website': website ? website.textContent.trim().replace(/'/g, '') : undefined,
            'Office Address': addressElement ? cleanAddress(addressElement.textContent.trim()).replace(/'/g, '') : undefined,
        };

        // Add the current component's data to the array
        componentsData.push(componentData);
    });

    // Filter out entries where any value is undefined (Element not found)
    componentsData = componentsData.filter(function(data) {
        return Object.values(data).every(function(value) {
            return value !== undefined;
        });
    });

    // Log each index in table format
    componentsData.forEach(function(data) {
        console.table(data);
    });
}
a
// Call the function to log cleaned company information in a table for each component
logCleanedCompanyInfoInTable();
