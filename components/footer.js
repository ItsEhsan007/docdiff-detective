// components/footer.js
class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer class="bg-white border-t border-gray-200 mt-12">
                <div class="container mx-auto px-4 py-6">
                    <div class="text-center text-sm text-gray-500">
                        <p>DocDiff Detective &copy; 2025 - Engineering Document Comparison Tool</p>
                    </div>
                </div>
            </footer>
        `;
    }
}

customElements.define('custom-footer', CustomFooter);
