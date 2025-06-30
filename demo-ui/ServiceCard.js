import React from 'react';
import { useParams } from 'react-router-dom';

const serviceData = {
  1: { name: "Dry Cleaning", description: "Premium dry cleaning services.", image: "/images/dry-cleaning.jpg" },
  2: { name: "Garment Repair", description: "Professional garment repair services.", image: "/images/garment-repair.jpg" },
  3: { name: "Laundry & Folding", description: "Full-service laundry and folding.", image: "/images/laundry.jpg" }
};

const ServiceDetails = () => {
  const { id } = useParams();  // Get the dynamic ID from URL
  const service = serviceData[id];

  if (!service) return <h2>Service not found</h2>;

  return (
    <div>
      <h1>{service.name}</h1>
      <img src={service.image} alt={service.name} width="300" />
      <p>{service.description}</p>
    </div>
  );
};

export default ServiceDetails;
