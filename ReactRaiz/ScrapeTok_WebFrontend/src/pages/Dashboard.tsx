import React from "react";
import Summary from "../components/Summary";
import ViewCategories from "../components/ViewCategories";

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-16">
      <Summary />
      <ViewCategories />
    </div>
  );
};

export default Dashboard;
