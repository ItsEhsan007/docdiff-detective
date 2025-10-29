// Basic file upload handler
console.log("Script loaded!");

document.addEventListener('DOMContentLoaded', function() {
    console.log("Document ready!");
    
    // Basic file selection handler
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        input.addEventListener('change', function(e) {
            if (this.files[0]) {
                console.log('File selected:', this.files[0].name);
                alert('File selected: ' + this.files[0].name);
            }
        });
    });
});
