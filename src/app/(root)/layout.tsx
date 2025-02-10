
import React from "react";
import { Navbar } from "@/components/shared/Navigation/Navbar";
import Footer from "@/components/shared/Footer/Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* Header */}
      <Navbar />

      {children}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;

