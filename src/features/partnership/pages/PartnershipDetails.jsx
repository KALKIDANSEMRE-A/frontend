import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Users,
  Building2,
  Clock,
  FileText,
  ExternalLink,
} from "lucide-react";
import NavBar from "../../../components/NavBar";
import StatusBadge from "../components/StatusBadge";
import { getPartnershipById } from "../../../api.jsx";

const PartnershipDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPartner() {
      setLoading(true);
      try {
        const response = await getPartnershipById(id);
        setPartner(response.data);
      } catch (err) {
        setError("Partnership not found");
      } finally {
        setLoading(false);
      }
    }
    fetchPartner();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span>Loading...</span>
      </div>
    );
  }

  if (error || !partner) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1 bg-gray-50 py-8 px-4 md:px-8">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              {error || "Partnership not found"}
            </h2>
            <Link
              to="/partnership"
              className="mt-4 inline-flex items-center text-[#004165] hover:underline"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // Safely access nested fields
  const partnerInstitution = partner.partnerInstitution || {};
  const partnerContact = partner.partnerContactPerson || {};
  const aauContact = partner.aauContactPerson || {};
  const aauContactMeta = partner.aauContact || {};
  const areas = Array.isArray(partner.potentialAreasOfCollaboration)
    ? partner.potentialAreasOfCollaboration
    : [];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 bg-gray-50 py-8 px-4 md:px-8">
        <div className="container mx-auto">
          <Link
            to="/partnership"
            className="mt-4 inline-flex items-center text-[#004165] hover:underline"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>

          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <img
                  src={partner.logo || "/placeholder.svg"}
                  alt={partnerInstitution.name || "-"}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {partnerInstitution.name || "-"}
                  </h1>
                  <div className="mt-2">
                    <StatusBadge status={partner.status || "-"} />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-8">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-gray-800" />
                    <div>
                      <p className="text-sm text-gray-500">Type</p>
                      <p className="font-medium">
                        {partnerInstitution.typeOfOrganization || "-"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="h-5 w-5 text-gray-800">🏢</span>
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium">
                        {partnerInstitution.address || "-"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="h-5 w-5 text-gray-800">🌍</span>
                    <div>
                      <p className="text-sm text-gray-500">Country</p>
                      <p className="font-medium">
                        {partnerInstitution.country || "-"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-gray-800" />
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-medium">
                        {partner.durationOfPartnership || "-"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gray-800" />
                    <div>
                      <p className="text-sm text-gray-500">Start Date</p>
                      <p className="font-medium">
                        {partner.potentialStartDate
                          ? new Date(
                              partner.potentialStartDate
                            ).toLocaleDateString()
                          : "-"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="h-5 w-5 text-gray-800">🏫</span>
                    <div>
                      <p className="text-sm text-gray-500">AAU Department</p>
                      <p className="font-medium">
                        {aauContactMeta.interestedCollegeOrDepartment || "-"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="h-5 w-5 text-gray-800">🔖</span>
                    <div>
                      <p className="text-sm text-gray-500">
                        Areas of Collaboration
                      </p>
                      <p className="font-medium">
                        {areas.length > 0 ? areas.join(", ") : "-"}
                      </p>
                    </div>
                  </div>
                  {partner.otherCollaborationArea && (
                    <div className="flex items-center gap-3">
                      <span className="h-5 w-5 text-gray-800">📝</span>
                      <div>
                        <p className="text-sm text-gray-500">
                          Other Collaboration Area
                        </p>
                        <p className="font-medium">
                          {partner.otherCollaborationArea}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">
                    Partnership Description
                  </h3>
                  <p className="text-gray-600">
                    {partner.description || "No description provided."}
                  </p>
                </div>
              </div>

              {/* Contacts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Partner Contact Person
                  </h3>
                  <div>
                    <span className="font-medium">Name:</span>{" "}
                    {partnerContact.name || "-"}
                  </div>
                  <div>
                    <span className="font-medium">Title:</span>{" "}
                    {partnerContact.title || "-"}
                  </div>
                  <div>
                    <span className="font-medium">Email:</span>{" "}
                    {partnerContact.institutionalEmail || "-"}
                  </div>
                  <div>
                    <span className="font-medium">Phone:</span>{" "}
                    {partnerContact.phoneNumber || "-"}
                  </div>
                  <div>
                    <span className="font-medium">Address:</span>{" "}
                    {partnerContact.address || "-"}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    AAU Contact Person
                  </h3>
                  <div>
                    <span className="font-medium">Name:</span>{" "}
                    {aauContact.name || "-"}
                  </div>
                  <div>
                    <span className="font-medium">College:</span>{" "}
                    {aauContact.college || "-"}
                  </div>
                  <div>
                    <span className="font-medium">Department/Unit:</span>{" "}
                    {aauContact.schoolDepartmentUnit || "-"}
                  </div>
                  <div>
                    <span className="font-medium">Email:</span>{" "}
                    {aauContact.institutionalEmail || "-"}
                  </div>
                  <div>
                    <span className="font-medium">Phone:</span>{" "}
                    {aauContact.phoneNumber || "-"}
                  </div>
                  {partner.mouFileUrl && (
                    <div className="pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 mb-2 block">
                          Partnership Agreement
                        </span>
                      </div>
                      <a
                        href={partner.mouFileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center space-x-3 w-full p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg hover:from-blue-100 hover:to-indigo-100 hover:border-blue-200 transition-all duration-200 hover:shadow-sm"
                      >
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
                            <FileText className="w-4 h-4 text-blue-600" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 group-hover:text-blue-900 transition-colors duration-200">
                            MOU Document
                          </p>
                          <p className="text-xs text-gray-500 group-hover:text-blue-700 transition-colors duration-200">
                            Click to view partnership agreement
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <ExternalLink className="w-4 h-4 text-gray-800 group-hover:text-blue-600 transition-colors duration-200" />
                        </div>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PartnershipDetail;
