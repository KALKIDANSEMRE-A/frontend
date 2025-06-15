import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { createPartnership } from "../api.jsx";
import toast from "react-hot-toast";
import {
  Clipboard,
  Building,
  Calendar,
  MapPin,
  GraduationCap,
  ActivitySquare,
  FileText,
  User,
  Mail,
  ListChecks,
  Target,
  DollarSign,
  FileSignature,
  PlusCircle,
  XCircle,
  Phone,
  Link,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function AddPartnership() {
  const initialFormData = {
    name: "",
    type: "",
    signedDate: "",
    endDate: "",
    region: "",
    country: "",
    college: "",
    schoolDepartmentUnit: "",
    status: "",
    description: "",
    mouFileUrl: "",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
    contactAddress: "",
    contactTitle: "",
    aauContactName: "",
    aauContactEmail: "",
    aauContactPhone: "",
    aauContactCollege: "",
    aauContactSchoolDepartmentUnit: "",
    objectives: [],
    scope: "",
    deliverables: [""],
    fundingAmount: "",
    reportingRequirements: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const validateField = (name, value) => {
    let errorMsg = "";
    // All fields that are required by the backend
    const requiredFields = [
      "name",
      "type",
      "signedDate",
      "endDate",
      "region",
      "country",
      "college",
      "status",
      "description",
      "contactPhone",
      "contactTitle",
      "contactAddress",
      "aauContactName",
      "aauContactEmail",
      "aauContactPhone",
      "aauContactCollege",
      "aauContactSchoolDepartmentUnit",
    ];
    const countryList = [
      "Afghanistan",
      "Albania",
      "Algeria",
      "Andorra",
      "Angola",
      "Argentina",
      "Armenia",
      "Australia",
      "Austria",
      "Azerbaijan",
      "Bahamas",
      "Bahrain",
      "Bangladesh",
      "Barbados",
      "Belarus",
      "Belgium",
      "Belize",
      "Benin",
      "Bhutan",
      "Bolivia",
      "Bosnia and Herzegovina",
      "Botswana",
      "Brazil",
      "Brunei",
      "Bulgaria",
      "Burkina Faso",
      "Burundi",
      "Cambodia",
      "Cameroon",
      "Canada",
      "Cape Verde",
      "Central African Republic",
      "Chad",
      "Chile",
      "China",
      "Colombia",
      "Comoros",
      "Congo (Brazzaville)",
      "Congo (Kinshasa)",
      "Costa Rica",
      "Croatia",
      "Cuba",
      "Cyprus",
      "Czech Republic",
      "Denmark",
      "Djibouti",
      "Dominica",
      "Dominican Republic",
      "Ecuador",
      "Egypt",
      "El Salvador",
      "Equatorial Guinea",
      "Eritrea",
      "Estonia",
      "Eswatini",
      "Ethiopia",
      "Fiji",
      "Finland",
      "France",
      "Gabon",
      "Gambia",
      "Georgia",
      "Germany",
      "Ghana",
      "Greece",
      "Grenada",
      "Guatemala",
      "Guinea",
      "Guinea-Bissau",
      "Guyana",
      "Haiti",
      "Honduras",
      "Hungary",
      "Iceland",
      "India",
      "Indonesia",
      "Iran",
      "Iraq",
      "Ireland",
      "Israel",
      "Italy",
      "Ivory Coast",
      "Jamaica",
      "Japan",
      "Jordan",
      "Kazakhstan",
      "Kenya",
      "Kiribati",
      "Kuwait",
      "Kyrgyzstan",
      "Laos",
      "Latvia",
      "Lebanon",
      "Lesotho",
      "Liberia",
      "Libya",
      "Liechtenstein",
      "Lithuania",
      "Luxembourg",
      "Madagascar",
      "Malawi",
      "Malaysia",
      "Maldives",
      "Mali",
      "Malta",
      "Marshall Islands",
      "Mauritania",
      "Mauritius",
      "Mexico",
      "Micronesia",
      "Moldova",
      "Monaco",
      "Mongolia",
      "Montenegro",
      "Morocco",
      "Mozambique",
      "Myanmar",
      "Namibia",
      "Nauru",
      "Nepal",
      "Netherlands",
      "New Zealand",
      "Nicaragua",
      "Niger",
      "Nigeria",
      "North Korea",
      "North Macedonia",
      "Norway",
      "Oman",
      "Pakistan",
      "Palau",
      "Palestine",
      "Panama",
      "Papua New Guinea",
      "Paraguay",
      "Peru",
      "Philippines",
      "Poland",
      "Portugal",
      "Qatar",
      "Romania",
      "Russia",
      "Rwanda",
      "Saint Kitts and Nevis",
      "Saint Lucia",
      "Saint Vincent",
      "Samoa",
      "San Marino",
      "Sao Tome and Principe",
      "Saudi Arabia",
      "Senegal",
      "Serbia",
      "Seychelles",
      "Sierra Leone",
      "Singapore",
      "Slovakia",
      "Slovenia",
      "Solomon Islands",
      "Somalia",
      "South Africa",
      "South Korea",
      "South Sudan",
      "Spain",
      "Sri Lanka",
      "Sudan",
      "Suriname",
      "Sweden",
      "Switzerland",
      "Syria",
      "Taiwan",
      "Tajikistan",
      "Tanzania",
      "Thailand",
      "Timor-Leste",
      "Togo",
      "Tonga",
      "Trinidad and Tobago",
      "Tunisia",
      "Turkey",
      "Turkmenistan",
      "Tuvalu",
      "Uganda",
      "Ukraine",
      "United Arab Emirates",
      "United Kingdom",
      "United States",
      "Uruguay",
      "Uzbekistan",
      "Vanuatu",
      "Vatican City",
      "Venezuela",
      "Vietnam",
      "Yemen",
      "Zambia",
      "Zimbabwe",
    ];
    if (requiredFields.includes(name) && !String(value).trim()) {
      // Creates a user-friendly field name like "Signed Date" from "signedDate"
      const fieldName =
        name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, " $1");
      errorMsg = `${fieldName} is required.`;
    } else if (
      (name === "contactEmail" || name === "aauContactEmail") &&
      value &&
      !/\S+@\S+\.\S+/.test(String(value))
    ) {
      errorMsg = "Invalid email format.";
    } else if (name === "fundingAmount" && value && isNaN(Number(value))) {
      errorMsg = "Funding amount must be a number.";
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    return !errorMsg;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateField(name, value);
  };

  const handleArrayChange = (e, index, fieldName) => {
    const { value } = e.target;
    const updatedArray = [...formData[fieldName]];
    updatedArray[index] = value;
    setFormData((prev) => ({
      ...prev,
      [fieldName]: updatedArray,
    }));
  };

  const addArrayItem = (fieldName) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: [...prev[fieldName], ""],
    }));
  };

  const removeArrayItem = (index, fieldName) => {
    const updatedArray = formData[fieldName].filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      [fieldName]: updatedArray.length > 0 ? updatedArray : [""],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    let formIsValid = true;
    // FIX: Consolidated validation. This single loop now handles all required fields, including description.
    for (const [key, value] of Object.entries(formData)) {
      if (!Array.isArray(value)) {
        if (!validateField(key, value)) {
          formIsValid = false;
        }
      }
    }

    if (!formIsValid) {
      toast.error("Please correct the errors in the form.");
      setIsSubmitting(false);
      return;
    }

    // Additional specific format validations after checking for presence
    const e164Regex = /^\+\d{10,15}$/;
    if (formData.contactPhone && !e164Regex.test(formData.contactPhone)) {
      setErrors((prev) => ({
        ...prev,
        contactPhone: "Phone must be in E.164 format (e.g. +251911234567)",
      }));
      formIsValid = false;
    }
    if (formData.aauContactPhone && !e164Regex.test(formData.aauContactPhone)) {
      setErrors((prev) => ({
        ...prev,
        aauContactPhone: "Phone must be in E.164 format (e.g. +251911234567)",
      }));
      formIsValid = false;
    }

    const startDate = new Date(formData.signedDate);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    if (startDate < now) {
      setErrors((prev) => ({
        ...prev,
        signedDate: "Start date cannot be in the past.",
      }));
      formIsValid = false;
    }

    if (!formIsValid) {
      toast.error("Please correct the validation errors.");
      setIsSubmitting(false);
      return;
    }

    // Payload construction remains the same
    const payload = {
      partnerInstitution: {
        name: formData.name,
        address: formData.region,
        country: formData.country,
        typeOfOrganization: formData.type,
      },
      aauContact: {
        interestedCollegeOrDepartment: formData.college,
      },
      potentialAreasOfCollaboration: formData.objectives,
      otherCollaborationArea: formData.objectives.includes("Other")
        ? formData.scope
        : undefined,
      potentialStartDate: formData.signedDate,
      durationOfPartnership: formData.endDate,
      partnerContactPerson: {
        name: formData.contactPerson,
        title: formData.contactTitle,
        institutionalEmail: formData.contactEmail,
        phoneNumber: formData.contactPhone,
        address: formData.contactAddress,
      },
      aauContactPerson: {
        name: formData.aauContactName,
        college: formData.aauContactCollege,
        schoolDepartmentUnit: formData.aauContactSchoolDepartmentUnit,
        institutionalEmail: formData.aauContactEmail,
        phoneNumber: formData.aauContactPhone,
      },
      description: formData.description.trim(),
      status: formData.status,
      ...(formData.mouFileUrl && { mouFileUrl: formData.mouFileUrl.trim() }),
    };

    // This part for removing empty optional fields is fine, but make sure your `requiredFields` list is accurate.
    // We will keep it as is, assuming the logic matches backend expectations.

    try {
      await createPartnership(payload);
      toast.success("Partnership created successfully!");
      navigate("/partnership");
      setFormData(initialFormData);
    } catch (error) {
      console.error("Failed to create partnership:", error);
      const errorMsg =
        error.response?.data?.message ||
        "Failed to create partnership. Please try again.";
      toast.error(errorMsg);
      if (error.response?.data?.errors) {
        setErrors((prev) => ({ ...prev, ...error.response.data.errors }));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const typeOfOrganizationOptions = [
    "Academic",
    "Research",
    "NGO",
    "INGO",
    "Government",
    "Private",
    "Other",
  ];
  const durationOptions = [
    "1 year",
    "2 years",
    "3 years",
    "4 years",
    "5 years",
  ];
  const collegeOptions = [
    "Central",
    "College of Business and Economics",
    "College of Social Science, Arts and Humanities",
    "College of Veterinary Medicine and Agriculture",
    "School of Law",
    "College of Technology and Built Environment",
    "College of Education and Language Studies",
    "College of Health Science",
  ];
  const collaborationOptions = [
    "Research/Technology Transfer",
    "Student/Staff/Researcher Mobility",
    "Funding Grant/Resource Mobilization",
    "Joint Courses/Programs",
    "University-Industry Linkage",
    "Consultancy",
    "Joint Training/Seminars/Workshops",
    "Other",
  ];
  const maxLengths = {
    name: 100,
    title: 100,
    email: 100,
    phone: 20,
    address: 200,
    department: 100,
    description: 200,
    institution: 200,
    country: 100,
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <NavBar />
      <div className="py-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Add New Partnership
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Fill in the details to create a new partnership entry.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-6">
              {/* Partnership Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  <div className="flex items-center gap-2">
                    <Building size={16} />
                    <span>Partnership Name</span>
                    <span className="text-red-500">*</span>
                  </div>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="e.g. Collaborative Research Initiative"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full p-2 border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                  maxLength={maxLengths.institution}
                  required
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* Partnership Type */}
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  <div className="flex items-center gap-2">
                    <Clipboard size={16} />
                    <span>Partnership Type</span>
                    <span className="text-red-500">*</span>
                  </div>
                </label>
                <div className="relative">
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className={`w-full p-2 border ${
                      errors.type ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer transition-colors`}
                    required
                  >
                    <option value="" disabled>
                      Select partnership type
                    </option>
                    {typeOfOrganizationOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5.516 7.548l4.484 4.484 4.484-4.484L16 9l-6 6-6-6z" />
                    </svg>
                  </div>
                </div>
                {errors.type && (
                  <p className="text-red-500 text-xs mt-1">{errors.type}</p>
                )}
              </div>

              {/* Signed Date */}
              <div>
                <label
                  htmlFor="signedDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>Signed Date</span>
                    <span className="text-red-500">*</span>
                  </div>
                </label>
                <input
                  type="date"
                  id="signedDate"
                  name="signedDate"
                  value={formData.signedDate}
                  onChange={handleChange}
                  className={`w-full p-2 border ${
                    errors.signedDate ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition-colors`}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
                {errors.signedDate && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.signedDate}
                  </p>
                )}
              </div>

              {/* End Date */}
              <div>
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>Duration</span>
                    <span className="text-red-500">*</span>
                  </div>
                </label>
                <div className="relative">
                  <select
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className={`w-full p-2 border ${
                      errors.endDate ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer transition-colors`}
                    required
                  >
                    <option value="">Select duration</option>
                    {durationOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5.516 7.548l4.484 4.484 4.484-4.484L16 9l-6 6-6-6z" />
                    </svg>
                  </div>
                </div>
                {errors.endDate && (
                  <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>
                )}
              </div>

              {/* Region */}
              <div>
                <label
                  htmlFor="region"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>Region</span>
                    <span className="text-red-500">*</span>
                  </div>
                </label>
                <input
                  type="text"
                  id="region"
                  name="region"
                  placeholder="e.g. National, Addis Ababa"
                  value={formData.region}
                  onChange={handleChange}
                  className={`w-full p-2 border ${
                    errors.region ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                  maxLength={maxLengths.address}
                  required
                />
                {errors.region && (
                  <p className="text-red-500 text-xs mt-1">{errors.region}</p>
                )}
              </div>

              {/* Country */}
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  <div className="flex items-center gap-2">
                    <Building size={16} />
                    <span>Partner Country</span>
                    <span className="text-red-500">*</span>
                  </div>
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  placeholder="Partner Country"
                  value={formData.country}
                  onChange={handleChange}
                  className={`w-full p-2 border ${
                    errors.country ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                  maxLength={maxLengths.country}
                  required
                />
                {errors.country && (
                  <p className="text-red-500 text-xs mt-1">{errors.country}</p>
                )}
              </div>

              {/* College */}
              <div>
                <label
                  htmlFor="college"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  <div className="flex items-center gap-2">
                    <GraduationCap size={16} />
                    <span>College</span>
                    <span className="text-red-500">*</span>
                  </div>
                </label>
                <div className="relative">
                  <select
                    id="college"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    className={`w-full p-2 border ${
                      errors.college ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer transition-colors`}
                    maxLength={maxLengths.department}
                    required
                  >
                    <option value="" disabled>
                      Select college
                    </option>
                    {collegeOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5.516 7.548l4.484 4.484 4.484-4.484L16 9l-6 6-6-6z" />
                    </svg>
                  </div>
                </div>
                {errors.college && (
                  <p className="text-red-500 text-xs mt-1">{errors.college}</p>
                )}
              </div>

              {/* Status */}
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  <div className="flex items-center gap-2">
                    <ActivitySquare size={16} />
                    <span>Status</span>
                    <span className="text-red-500">*</span>
                  </div>
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Pending">Pending</option>
                </select>
                {errors.status && (
                  <p className="text-red-500 text-xs mt-1">{errors.status}</p>
                )}
              </div>

              {/* Contact Person (Optional) */}
              <div>
                <label
                  htmlFor="contactPerson"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>Contact Person</span>
                  </div>
                </label>
                <input
                  type="text"
                  id="contactPerson"
                  name="contactPerson"
                  placeholder="e.g. Dr. Jane Doe"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  className={`w-full p-2 border ${
                    errors.contactPerson ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                  maxLength={maxLengths.name}
                />
                {errors.contactPerson && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.contactPerson}
                  </p>
                )}
              </div>

              {/* Contact Email (Optional) */}
              <div>
                <label
                  htmlFor="contactEmail"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  <div className="flex items-center gap-2">
                    <Mail size={16} />
                    <span>Contact Email</span>
                  </div>
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  placeholder="e.g. jane.doe@example.com"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  className={`w-full p-2 border ${
                    errors.contactEmail ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                  maxLength={maxLengths.email}
                />
                {errors.contactEmail && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.contactEmail}
                  </p>
                )}
              </div>

              {/* Partner Contact Phone */}
              <div>
                <label
                  htmlFor="contactPhone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  <div className="flex items-center gap-2">
                    <Phone size={16} />
                    <span>Partner Contact Phone</span>
                    <span className="text-red-500">*</span>
                  </div>
                </label>
                <input
                  type="text"
                  id="contactPhone"
                  name="contactPhone"
                  placeholder="+251911234567"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  className={`w-full p-2 border ${
                    errors.contactPhone ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                  maxLength={maxLengths.phone}
                  required
                />
                {errors.contactPhone && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.contactPhone}
                  </p>
                )}
              </div>

              {/* Partner Contact Title */}
              <div>
                <label
                  htmlFor="contactTitle"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>Contact Person Title</span>
                    <span className="text-red-500">*</span>
                  </div>
                </label>
                <input
                  type="text"
                  id="contactTitle"
                  name="contactTitle"
                  placeholder="e.g., Project Manager"
                  value={formData.contactTitle}
                  onChange={handleChange}
                  className={`w-full p-2 border ${
                    errors.contactTitle ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                  maxLength={maxLengths.title}
                  required
                />
                {errors.contactTitle && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.contactTitle}
                  </p>
                )}
              </div>

              {/* Partner Contact Address */}
              <div>
                <label
                  htmlFor="contactAddress"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>Contact Person Address</span>
                    <span className="text-red-500">*</span>
                  </div>
                </label>
                <input
                  type="text"
                  id="contactAddress"
                  name="contactAddress"
                  placeholder="e.g., 123 Innovation Dr, Addis Ababa"
                  value={formData.contactAddress}
                  onChange={handleChange}
                  className={`w-full p-2 border ${
                    errors.contactAddress ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                  maxLength={maxLengths.address}
                  required
                />
                {errors.contactAddress && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.contactAddress}
                  </p>
                )}
              </div>

              {/* AAU Contact Person Fields */}
              <div>
                <label
                  htmlFor="aauContactName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>AAU Contact Name</span>
                    <span className="text-red-500">*</span>
                  </div>
                </label>
                <input
                  type="text"
                  id="aauContactName"
                  name="aauContactName"
                  placeholder="e.g., Prof. John Smith"
                  value={formData.aauContactName}
                  onChange={handleChange}
                  className={`w-full p-2 border ${
                    errors.aauContactName ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                  maxLength={maxLengths.name}
                  required
                />
                {errors.aauContactName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.aauContactName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="aauContactEmail"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  <div className="flex items-center gap-2">
                    <Mail size={16} />
                    <span>AAU Contact Email</span>
                    <span className="text-red-500">*</span>
                  </div>
                </label>
                <input
                  type="email"
                  id="aauContactEmail"
                  name="aauContactEmail"
                  placeholder="e.g., john.smith@aau.edu.et"
                  value={formData.aauContactEmail}
                  onChange={handleChange}
                  className={`w-full p-2 border ${
                    errors.aauContactEmail
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                  maxLength={maxLengths.email}
                  required
                />
                {errors.aauContactEmail && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.aauContactEmail}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="aauContactPhone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  <div className="flex items-center gap-2">
                    <Phone size={16} />
                    <span>AAU Contact Phone</span>
                    <span className="text-red-500">*</span>
                  </div>
                </label>
                <input
                  type="text"
                  id="aauContactPhone"
                  name="aauContactPhone"
                  placeholder="+251912345678"
                  value={formData.aauContactPhone}
                  onChange={handleChange}
                  className={`w-full p-2 border ${
                    errors.aauContactPhone
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                  maxLength={maxLengths.phone}
                  required
                />
                {errors.aauContactPhone && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.aauContactPhone}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="aauContactCollege"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  <div className="flex items-center gap-2">
                    <GraduationCap size={16} />
                    <span>AAU Contact College</span>
                    <span className="text-red-500">*</span>
                  </div>
                </label>
                <div className="relative">
                  <select
                    id="aauContactCollege"
                    name="aauContactCollege"
                    value={formData.aauContactCollege}
                    onChange={handleChange}
                    className={`w-full p-2 border ${
                      errors.aauContactCollege
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer transition-colors`}
                    required
                  >
                    <option value="" disabled>
                      Select college
                    </option>
                    {collegeOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5.516 7.548l4.484 4.484 4.484-4.484L16 9l-6 6-6-6z" />
                    </svg>
                  </div>
                </div>
                {errors.aauContactCollege && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.aauContactCollege}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="aauContactSchoolDepartmentUnit"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  <div className="flex items-center gap-2">
                    <GraduationCap size={16} />
                    <span>AAU Contact School/Dept/Unit</span>
                    <span className="text-red-500">*</span>
                  </div>
                </label>
                <input
                  type="text"
                  id="aauContactSchoolDepartmentUnit"
                  name="aauContactSchoolDepartmentUnit"
                  placeholder="e.g., School of Information Science"
                  value={formData.aauContactSchoolDepartmentUnit}
                  onChange={handleChange}
                  className={`w-full p-2 border ${
                    errors.aauContactSchoolDepartmentUnit
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                  maxLength={maxLengths.department}
                  required
                />
                {errors.aauContactSchoolDepartmentUnit && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.aauContactSchoolDepartmentUnit}
                  </p>
                )}
              </div>

              {/* Funding Amount (Optional) */}
              <div>
                <label
                  htmlFor="fundingAmount"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  <div className="flex items-center gap-2">
                    <DollarSign size={16} />
                    <span>Funding Amount (Optional)</span>
                  </div>
                </label>
                <input
                  type="number"
                  id="fundingAmount"
                  name="fundingAmount"
                  placeholder="e.g. 50000"
                  value={formData.fundingAmount}
                  onChange={handleChange}
                  className={`w-full p-2 border ${
                    errors.fundingAmount ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                />
                {errors.fundingAmount && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.fundingAmount}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                <div className="flex items-center gap-2">
                  <FileText size={16} />
                  <span>Description</span>
                  <span className="text-red-500">*</span>
                </div>
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                placeholder="Detailed description of the partnership..."
                value={formData.description}
                required
                maxLength={500}
                onChange={handleChange}
                className={`w-full p-2 border ${
                  errors.description ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Scope (Optional) */}
            <div className="mb-6">
              <label
                htmlFor="scope"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                <div className="flex items-center gap-2">
                  <Target size={16} />
                  <span>Scope (Optional)</span>
                </div>
              </label>
              <textarea
                id="scope"
                name="scope"
                rows="3"
                placeholder="Define the scope of the partnership..."
                value={formData.scope}
                onChange={handleChange}
                className={`w-full p-2 border ${
                  errors.scope ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              ></textarea>
              {errors.scope && (
                <p className="text-red-500 text-xs mt-1">{errors.scope}</p>
              )}
            </div>

            {/* Reporting Requirements (Optional) */}
            <div className="mb-6">
              <label
                htmlFor="reportingRequirements"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                <div className="flex items-center gap-2">
                  <FileSignature size={16} />
                  <span>Reporting Requirements (Optional)</span>
                </div>
              </label>
              <textarea
                id="reportingRequirements"
                name="reportingRequirements"
                rows="3"
                placeholder="Detail any reporting requirements..."
                value={formData.reportingRequirements}
                onChange={handleChange}
                className={`w-full p-2 border ${
                  errors.reportingRequirements
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              ></textarea>
              {errors.reportingRequirements && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.reportingRequirements}
                </p>
              )}
            </div>

            {/* Objectives (Optional) */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center gap-2">
                  <ListChecks size={16} />
                  <span>Objectives (Optional)</span>
                </div>
              </label>
              <select
                name="objectives"
                multiple
                value={formData.objectives}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    objectives: Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    ),
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                size={8}
              >
                {collaborationOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {errors.objectives && (
                <p className="text-red-500 text-xs mt-1">{errors.objectives}</p>
              )}
            </div>

            {/* Deliverables (Optional) */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center gap-2">
                  <ListChecks size={16} />
                  <span>Deliverables (Optional)</span>
                </div>
              </label>
              {formData.deliverables.map((deliverable, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    placeholder={`Deliverable ${index + 1}`}
                    value={deliverable}
                    onChange={(e) =>
                      handleArrayChange(e, index, "deliverables")
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  />
                  {formData.deliverables.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem(index, "deliverables")}
                      className="p-1 text-red-500 hover:text-red-700"
                      title="Remove deliverable"
                    >
                      <XCircle size={20} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem("deliverables")}
                className="mt-1 flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium py-1 px-2 rounded-md hover:bg-blue-50 transition-colors"
              >
                <PlusCircle size={16} />
                Add Deliverable
              </button>
              {errors.deliverables && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.deliverables}
                </p>
              )}
            </div>
            {/* <input
              type="url"
              name="mouFileUrl"
              placeholder="Google Drive MOU Link"
              value={formData.mouFileUrl || ''}
              onChange={(e) => setFormData({ ...formData, mouFileUrl: e.target.value })}
            />
            {errors.mouFileUrl && <span className="error">{errors.mouFileUrl}</span>} */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Partnership Document
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Google Drive Document Link
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                      <Link className="h-5 w-5" />
                    </span>
                    <input
                      type="url"
                      name="mouFileUrl"
                      value={formData.mouFileUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, mouFileUrl: e.target.value })
                      }
                      placeholder="https://drive.google.com/..."
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Paste the Google Drive link to your partnership document
                    (MOU/MOA)
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
              >
                {isSubmitting ? "Submitting..." : "Add Partnership"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddPartnership;
