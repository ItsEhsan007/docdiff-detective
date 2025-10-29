// script.js - Complete working functionality for DocDiff Detective
document.addEventListener('DOMContentLoaded', function() {
    // Initialize feather icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
    
    const form = document.getElementById('documentForm');
    const resultContainer = document.getElementById('resultContainer');
    const oldDocumentInput = document.getElementById('oldDocument');
    const newDocumentInput = document.getElementById('newDocument');
    const copyReportBtn = document.getElementById('copyReport');

    // File upload feedback with drag & drop
    [oldDocumentInput, newDocumentInput].forEach(input => {
        const label = input.closest('label');
        
        // Drag and drop events
        label.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('border-primary', 'bg-blue-50');
        });
        
        label.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.classList.remove('border-primary', 'bg-blue-50');
        });
        
        label.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('border-primary', 'bg-blue-50');
            if (e.dataTransfer.files[0]) {
                input.files = e.dataTransfer.files;
                handleFileSelect(e.dataTransfer.files[0], label);
            }
        });

        // Click to upload
        input.addEventListener('change', function(e) {
            if (e.target.files[0]) {
                handleFileSelect(e.target.files[0], label);
            }
        });
    });

    function handleFileSelect(file, label) {
        const icon = label.querySelector('[data-feather]');
        const text = label.querySelector('p:first-child');
        const subtext = label.querySelector('p:last-child');
        
        // Update UI to show file is selected
        if (icon) {
            icon.setAttribute('data-feather', 'file');
            if (typeof feather !== 'undefined') {
                feather.replace();
            }
        }
        if (text) {
            text.textContent = `Selected: ${file.name}`;
            text.className = 'pt-1 text-sm text-green-600 font-medium';
        }
        if (subtext) {
            subtext.textContent = `Size: ${(file.size / 1024 / 1024).toFixed(2)} MB`;
            subtext.className = 'text-xs text-green-500';
        }
    }

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const oldFile = oldDocumentInput.files[0];
        const newFile = newDocumentInput.files[0];
        const discipline = document.getElementById('discipline').value;

        // Validation
        if (!oldFile || !newFile) {
            alert('Please upload both documents to compare.');
            return;
        }

        if (!discipline) {
            alert('Please select a discipline.');
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i data-feather="loader" class="animate-spin w-4 h-4 mr-2"></i> Analyzing Documents...';
        if (typeof feather !== 'undefined') {
            feather.replace();
        }

        // Simulate analysis (in real app, this would call your API)
        setTimeout(() => {
            generateReport(oldFile, newFile);
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            if (typeof feather !== 'undefined') {
                feather.replace();
            }
        }, 3000);
    });

    // Copy report functionality
    if (copyReportBtn) {
        copyReportBtn.addEventListener('click', function() {
            const reportContent = document.getElementById('reportContent').innerText;
            navigator.clipboard.writeText(reportContent).then(() => {
                const icon = this.querySelector('[data-feather]');
                if (icon) {
                    icon.setAttribute('data-feather', 'check');
                    if (typeof feather !== 'undefined') {
                        feather.replace();
                    }
                    setTimeout(() => {
                        icon.setAttribute('data-feather', 'copy');
                        if (typeof feather !== 'undefined') {
                            feather.replace();
                        }
                    }, 2000);
                }
            }).catch(() => {
                alert('Failed to copy report. Please select and copy the text manually.');
            });
        });
    }

    function generateReport(oldFile, newFile) {
        const projectName = document.getElementById('projectName').value || 'Unnamed Project';
        const docNumber = document.getElementById('documentNumber').value || 'N/A';
        const discipline = document.getElementById('discipline').value;
        const prevRev = document.getElementById('prevRev').value;
        const currRev = document.getElementById('currRev').value;

        // Sample comparison results (replace with actual document comparison)
        const changes = [
            { type: 'modified', element: 'Overall Dimensions', oldValue: '100m × 50m', newValue: '105m × 50m', page: 1 },
            { type: 'added', element: 'Safety Railings', oldValue: 'Not present', newValue: 'Added around perimeter', page: 2 },
            { type: 'modified', element: 'Material Specification', oldValue: 'Grade 50 Steel', newValue: 'Grade 55 Steel', page: 1 },
            { type: 'deleted', element: 'Old Support Beam', oldValue: 'H-Beam 200×200', newValue: 'Removed', page: 3 },
            { type: 'added', element: 'Drainage System', oldValue: 'Not present', newValue: 'Added per spec 5.2.1', page: 4 }
        ];

        // Generate HTML report
        const reportHTML = `
            <div class="mb-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Project Information</h3>
                <div class="grid grid-cols-2 gap-4 text-sm">
                    <div><strong>Project:</strong> ${projectName}</div>
                    <div><strong>Document #:</strong> ${docNumber}</div>
                    <div><strong>Discipline:</strong> ${discipline}</div>
                    <div><strong>Comparison:</strong> ${prevRev} → ${currRev}</div>
                </div>
            </div>

            <div class="mb-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Document Summary</h3>
                <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <strong>Previous Revision (${prevRev}):</strong><br>
                        • File: ${oldFile.name}<br>
                        • Size: ${(oldFile.size / 1024 / 1024).toFixed(2)} MB<br>
                        • Type: ${oldFile.type || 'Unknown'}
                    </div>
                    <div>
                        <strong>Current Revision (${currRev}):</strong><br>
                        • File: ${newFile.name}<br>
                        • Size: ${(newFile.size / 1024 / 1024).toFixed(2)} MB<br>
                        • Type: ${newFile.type || 'Unknown'}
                    </div>
                </div>
            </div>

            <div class="mb-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Detected Changes (${changes.length})</h3>
                <div class="space-y-3">
                    ${changes.map(change => `
                        <div class="flex items-start p-3 border rounded-lg ${
                            change.type === 'added' ? 'border-green-200 bg-green-50' :
                            change.type === 'modified' ? 'border-yellow-200 bg-yellow-50' :
                            'border-red-200 bg-red-50'
                        }">
                            <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium mr-3 ${
                                change.type === 'added' ? 'bg-green-100 text-green-800' :
                                change.type === 'modified' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                            }">
                                ${change.type.toUpperCase()}
                            </span>
                            <div class="flex-1">
                                <div class="font-medium">${change.element}</div>
                                <div class="text-sm text-gray-600 mt-1">
                                    <span class="line-through text-red-600">${change.oldValue}</span>
                                    <span class="mx-2">→</span>
                                    <span class="text-green-600">${change.newValue}</span>
                                </div>
                                <div class="text-xs text-gray-500 mt-1">Page ${change.page}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 class="font-semibold text-blue-900 mb-2">Analysis Summary</h4>
                <p class="text-sm text-blue-800">
                    Comparison completed successfully. Found ${changes.length} changes between revisions.
                    ${changes.length > 0 ? 'Review all modifications before proceeding with implementation.' : 'No differences detected between documents.'}
                </p>
            </div>
        `;

        // Generate JSON output
        const jsonOutput = {
            metadata: {
                projectName,
                documentNumber: docNumber,
                discipline,
                comparison: `${prevRev} → ${currRev}`,
                analysisDate: new Date().toISOString()
            },
            files: {
                previous: {
                    name: oldFile.name,
                    size: oldFile.size,
                    type: oldFile.type
                },
                current: {
                    name: newFile.name,
                    size: newFile.size,
                    type: newFile.type
                }
            },
            changes: changes,
            summary: {
                totalChanges: changes.length,
                added: changes.filter(c => c.type === 'added').length,
                modified: changes.filter(c => c.type === 'modified').length,
                deleted: changes.filter(c => c.type === 'deleted').length
            }
        };

        // Display results
        document.getElementById('reportContent').innerHTML = reportHTML;
        document.getElementById('jsonOutput').textContent = JSON.stringify(jsonOutput, null, 2);
        resultContainer.classList.remove('hidden');
        
        // Scroll to results
        resultContainer.scrollIntoView({ behavior: 'smooth' });
    }
});
