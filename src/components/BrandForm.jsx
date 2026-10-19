
import { useState } from "react";

const BrandForm = ({ onGenerate, loading }) => {
  const [brandName, setBrandName] = useState("");
  const [industry, setIndustry] = useState("");
  const [objective, setObjective] = useState("");
  const [productDetails, setProductDetails] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onGenerate({
      brandName,
      industry,
      objective,
      productDetails,
    });
  };

  return (
    <section className="brand-form">
      <div className="form-heading">
        <p className="section-label">CAMPAIGN DETAILS</p>
        <h2>Brand Details</h2>
        <p className="form-description">
          Tell us about your brand to create personalized tweet ideas.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="brandName">
              Brand Name <span>(Optional)</span>
            </label>
            <input
              id="brandName"
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="e.g. Nike"
            />
          </div>

          <div className="form-group">
            <label htmlFor="industry">Industry or Category</label>
            <input
              id="industry"
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="e.g. Fitness, Education, Food"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="objective">Campaign Objective</label>
            <select
              id="objective"
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              required
            >
              <option value="">Select an objective</option>
              <option value="Increase brand awareness">
                Increase brand awareness
              </option>
              <option value="Promote a product">Promote a product</option>
              <option value="Increase engagement">Increase engagement</option>
              <option value="Drive website traffic">Drive website traffic</option>
              <option value="Announce a launch">Announce a launch</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="productDetails">
              Product or Service Details
            </label>
            <textarea
              id="productDetails"
              value={productDetails}
              onChange={(e) => setProductDetails(e.target.value)}
              placeholder="Describe your product, features, and benefits..."
              rows={4}
              required
            />
          </div>
        </div>

        <button
          className="generate-btn"
          type="submit"
          disabled={loading}
        >
          {loading ? "Generating..." : "✨ Generate 10 Tweets"}
        </button>

        <p className="form-note">
          Create content tailored to your brand and campaign goals.
        </p>
      </form>
    </section>
  );
};

export default BrandForm;
