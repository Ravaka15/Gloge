import React from "react";
import Sidebar from "../layout/Sidebar";
import AppPageContent from "../pages/AppPageContent/PageContent";
export default function MainLayout() {
  return (
    <div>
      <div className="App">
        <div className="Home">
          <div className="HomeGlass">
            <Sidebar />
            <AppPageContent />
          </div>
        </div>
      </div>
    </div>
  );
}
