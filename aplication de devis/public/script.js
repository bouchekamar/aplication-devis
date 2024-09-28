document.getElementById('quoteForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('quantity', document.getElementById('quantity').value);
    formData.append('unitPrice', document.getElementById('unitPrice').value);
    formData.append('width', document.getElementById('width').value);
    formData.append('height', document.getElementById('height').value);
    formData.append('printFile', document.getElementById('printFile').files[0]);

    const response = await fetch('/calculate', {
        method: 'POST',
        body: formData
    });

    const result = await response.json();

    document.getElementById('result').innerHTML = `
        Total Cost: $${result.totalCost}<br>
        Uploaded File: ${result.fileName || 'No file uploaded'}
    `;
});

