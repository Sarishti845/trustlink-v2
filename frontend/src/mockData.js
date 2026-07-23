import React from 'react'; // It's good practice to import React when using JSX
import { FaWrench, FaBolt, FaHammer, FaGraduationCap, FaMagic, FaPaintBrush, FaTree, FaCog } from 'react-icons/fa';

export const mockProfessionals = [
  {
    id: 1,
    name: "Mike's Professional Plumbing",
    service: "Plumbing",
    price: 85.00,
    rating: 4.9,
    reviews: 127,
    experience: 12,
    location: "New York, NY",
    isVerified: true,
    image: "https://savvyplumbing.co.za/wp-content/uploads/2022/05/Plumbing-Services.jpg"
  },
  {
    id: 2,
    name: "Davis Electric Solutions",
    service: "Electrical",
    price: 95.00,
    rating: 4.8,
    reviews: 89,
    experience: 8,
    location: "New York, NY",
    isVerified: true,
    image: "https://images.pexels.com/photos/577210/pexels-photo-577210.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 3,
    name: "Custom Carpentry Works",
    service: "Carpentry",
    price: 75.00,
    rating: 4.9,
    reviews: 156,
    experience: 15,
    location: "New York, NY",
    isVerified: true,
    image: "https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
];

export const popularServices = [
  { name: 'Plumbing', providers: 128, icon: <FaWrench /> },
  { name: 'Electrical', providers: 218, icon: <FaBolt /> },
  { name: 'Carpentry', providers: 101, icon: <FaHammer /> },
  { name: 'Tutoring', providers: 64, icon: <FaGraduationCap /> },
  { name: 'Cleaning', providers: 64, icon: <FaMagic /> },
  { name: 'Painting', providers: 245, icon: <FaPaintBrush /> },
  { name: 'Gardening', providers: 128, icon: <FaTree /> },
  { name: 'Handyman', providers: 117, icon: <FaCog /> },
];

