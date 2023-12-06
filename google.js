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

// Call the function to log cleaned company information in a table for each component
logCleanedCompanyInfoInTable();


<a jscontroller="DtlQN" jsaction="JIbuQc:bp1Ir; clickmod:UIoWcb" aria-label="Website" 
attributionsrc="" data-no-redirect="1" 
href=
"/aclk?sa=l&amp;ai=DChcSEwiZpb_UrfqCAxVSWg8CHSHMDEAYABAAGgJ0Yg&amp;ase=2&amp;gclid=CjwKCAiA1MCrBhAoEiwAC2d64TiPWfUvjJ10EpWxV9o2AexE8Yf0KmlHc418KmqJ2wrCSQneo9-H4xoC2ywQAvD_BwE&amp;sig=AOD64_1Oh0GuYlROWLWIkO6U6CRl2umbwA&amp;adurl&amp;ctype=99&amp;nis=4&amp;ved=0CCgQ8PwKahcKEwioqY3QrfqCAxUAAAAAHQAAAAAQCw">
<div data-website-url="/aclk?sa=l&amp;ai=DChcSEwiZpb_UrfqCAxVSWg8CHSHMDEAYABAAGgJ0Yg&amp;ase=2&amp;gclid=CjwKCAiA1MCrBhAoEiwAC2d64TiPWfUvjJ10EpWxV9o2AexE8Yf0KmlHc418KmqJ2wrCSQneo9-H4xoC2ywQAvD_BwE&amp;sig=AOD64_1Oh0GuYlROWLWIkO6U6CRl2umbwA&amp;adurl&amp;ctype=99&amp;nis=4" data-ved="0CCgQ8PwKahcKEwioqY3QrfqCAxUAAAAAHQAAAAAQCw" jscontroller="CCRWHf" jsaction="JIbuQc:THpQJf"><div class="VfPpkd-dgl2Hf-ppHlrf-sM5MNb" data-is-touch-wrapper="true"><button class="VfPpkd-LgbsSe VfPpkd-LgbsSe-OWXEXe-INsAgc VfPpkd-LgbsSe-OWXEXe-Bz112c-M1Soyc VfPpkd-LgbsSe-OWXEXe-dgl2Hf Rj2Mlf OLiIxf PDpWxe LQeN7 DDYJo s73B3c wF1tve Q8G3mf" jscontroller="soHxf" jsaction="click:cOuCgd; mousedown:UX7yZ; mouseup:lbsD7e; mouseenter:tfO1Yc; mouseleave:JywGue; touchstart:p6p2H; touchmove:FwuNnf; touchend:yfqBxc; touchcancel:JMtRjd; focus:AHmuwe; blur:O22p3e; contextmenu:mg9Pef;mlnRJb:fLiPzd;" data-idom-class="Rj2Mlf OLiIxf PDpWxe LQeN7 DDYJo s73B3c wF1tve Q8G3mf" aria-hidden="true" tabindex="-1"><div class="VfPpkd-Jh9lGc"></div><div class="VfPpkd-J1Ukfc-LhBDec"></div><div class="VfPpkd-RLmnJb"></div><span class="VfPpkd-kBDsod" aria-hidden="true"><svg width="24" height="24" viewBox="0 0 24 24" focusable="false" class=" NMm5M"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-.61.08-1.21.21-1.78L8.99 15v1c0 1.1.9 2 2 2v1.93C7.06 19.43 4 16.07 4 12zm13.89 5.4c-.26-.81-1-1.4-1.9-1.4h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41C17.92 5.77 20 8.65 20 12c0 2.08-.81 3.98-2.11 5.4z"></path></svg></span>
<span jsname="V67aGc" class="VfPpkd-vQzf8d">Website</span></button></div></div></a>