// components/navbar.js
class CustomNavbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="bg-white shadow-sm border-b border-gray-200">
                <div class="container mx-auto px-4">
                    <div class="flex justify-between items-center h-16">
                        <div class="flex items-center">
                            <span class="text-xl font-bold text-primary">DocDiff Detective</span>
                        </div>
                        <div class="flex items-center space-x-4">
                            <span class="text-sm text-gray-500">v1.0</span>
                        </div>
                    </div>
                </div>
            </nav>
        `;
    }
}

customElements.define('custom-navbar', CustomNavbar);
