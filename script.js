document.getElementById('coverForm').addEventListener('submit', function(event) {
    event.preventDefault();


    const formData = new FormData(event.target);
    let documentContent = '';

    documentContent += `<p > Topic Name: <strong>${formData.get('topicName')}</strong></p>`;
    documentContent += `<p > Course Code: <strong>${formData.get('courseCode')}</strong></p>`;
    documentContent += `<p > Course Title: <strong>${formData.get('courseTitle')}</strong></p>`;
    documentContent += `<p>   </p>`;
    documentContent += `<p class="underline"> <strong>Submitted To:  </strong></p>`;
    documentContent += `<p class="space">Name: <strong>${formData.get('submittedToName')}</strong></p>`;
    documentContent += `<p class="space">Designation: <strong>${formData.get('submittedToDesignation')}</strong></p>`;
    documentContent += `<p class="space">Department: <strong>${formData.get('submittedToDepartment')}</strong></p>`;
    documentContent += `<p class="space"><strong>Daffodil International University</strong></p>`;
    documentContent += `<p>   </p>`;
    documentContent += `<p class="underline"><strong> Submitted By:  </strong></p>`;
    documentContent += `<p class="space">Name: <strong>${formData.get('submittedByName')} </strong></p>`;
    documentContent += `<p class="space">ID: <strong>${formData.get('studentId')}</strong></p>`;
    documentContent += `<p class="space">Section: <strong>${formData.get('section')}</strong></p>`;
    documentContent += `<p class="space">Semester: <strong>${formData.get('semester')}</strong></p>`;
    documentContent += `<p class="space">Department: <strong>${formData.get('submittedByDepartment')}</strong></p>`;
    documentContent += `<p class="space"><strong>Daffodil International University  </strong></p>`;
    documentContent += `<p>   </p>`;
    documentContent += `<p class="underline"> Submission Date: <strong>${formData.get('submissionDate')}</strong></p>`;

    document.getElementById('documentContent').innerHTML = documentContent;
    document.querySelector('.form').style.display = 'none';
    document.getElementById('document').style.display = 'block';
});

const inputs = document.querySelectorAll('input');
inputs.forEach((input, index) => {
    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const nextInput = inputs[index + 1];
            if (nextInput) {
                nextInput.focus();
            } else {
                document.querySelector('.submit').focus();
            }
        }
    });
});

function hideButtons() {
    document.getElementById('downloadPdf').style.display = 'none';
    document.getElementById('downloadImage').style.display = 'none';
}

function showButtons() {
    document.getElementById('downloadPdf').style.display = 'block';
    document.getElementById('downloadImage').style.display = 'block';
}

document.getElementById('downloadPdf').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'pt', 'a4');  // Set to 'p' for portrait, 'pt' for point units, 'a4' for size

    hideButtons();  // Hide buttons before generating the PDF
    doc.html(document.getElementById('document'), {
        callback: function (doc) {
            doc.save('cover-page.pdf');
            showButtons();  // Show buttons after generating the PDF
        },
        x: 10,
        y: 10,
        width: 575,  // Width of the content on the PDF
        windowWidth: 800,  // Window width to capture the content properly
        html2canvas: {
            backgroundColor: '#ffffff' // Set background color to white
        }
    });
});


document.getElementById('downloadImage').addEventListener('click', function() {
    hideButtons();  // Hide buttons before generating the image

    html2canvas(document.getElementById('document'), {
        scale: 4,  // Increase the scale for higher quality
        useCORS: true,  // Use this option if you have cross-origin images
        backgroundColor: '#ffffff'
    }).then(canvas => {
        // Adjust the canvas dimensions for higher quality
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/jpeg', 0.7);  // Set the quality to 1.0
        link.download = 'cover-page.jpg';
        link.click();

        showButtons();  // Show buttons after generating the image
    });
});



