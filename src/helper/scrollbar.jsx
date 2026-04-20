import { ArrowUp } from "lucide-react"; // Aap koi bhi icon library use kar sakte hain

export default function Footer() {
    
    // Top par scroll karne ka function
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth", // Smooth animation ke liye
        });
    };

    return (
        <footer className="relative bg-gray-900 text-white py-12 overflow-hidden">
            <div className="container mx-auto px-6 text-center">
                <p className="text-gray-400">© 2026 AI Resume Builder. All rights reserved.</p>
                
                {/* --- Round Scroll to Top Icon --- */}
                <div className="mt-8 flex justify-center">
                    <button
                        onClick={scrollToTop}
                        className="group flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 border border-blue-400/30"
                        title="Scroll to Top"
                    >
                        <ArrowUp className="w-6 h-6 text-white group-hover:-translate-y-1 transition-transform duration-300" />
                    </button>
                </div>
            </div>

            {/* Background design elements (optional) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        </footer>
    );
}