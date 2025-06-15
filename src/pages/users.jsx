// users.jsx
import React, { useState, useEffect } from "react";
import {
  TrashIcon,
  PencilIcon,
  EyeIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import NavBar from "../components/NavBar";
import { getUsers, addUser, updateUser, deleteUser } from "../api";
import { toast } from "react-hot-toast";

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Name");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "Admin",
    campusId: "",
    status: "active",
  });
  const [newUserCredentials, setNewUserCredentials] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsers();
      setUsers(response.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      const errorMsg =
        error.response?.data?.message ||
        "Failed to fetch users. Please check authentication.";
      toast.error(errorMsg);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const openAddModal = () => {
    setEditMode(false);
    setCurrentUser(null);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      role: "Admin",
      campusId: "",
      status: "active",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setEditMode(true);
    setCurrentUser(user);
    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      role: user.role || "Admin",
      campusId: user.campusId || "",
      status: user.status || "active",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.role !== "SuperAdmin" && !formData.campusId) {
      toast.error("Campus ID is required for Admin role.");
      return;
    }
    try {
      console.log("Submitting userData:", formData); // Debug
      if (editMode && currentUser) {
        await updateUser(currentUser._id, formData);
        toast.success("User updated successfully");
      } else {
        const response = await addUser(formData);
        const responseData = response.data;
        toast.success(responseData.message || "User added successfully!");
        setNewUserCredentials({
          email: responseData.email,
          password: responseData.generatedPassword,
        });
      }
      setIsModalOpen(false);
      fetchUsers();
    } catch (error) {
      console.error("Error saving user:", error);
      const errorMsg =
        error.response?.data?.error ||
        (error.response?.status === 401
          ? "Unauthorized. Please log in again."
          : "Server error. Please try again.");
      toast.error(errorMsg);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId);
        toast.success("User deleted successfully");
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("Failed to delete user");
      }
    }
  };

  const closeCredentialsModal = () => {
    setNewUserCredentials(null);
  };

  const filterOptions = ["Name", "Email", "Role", "Status"];
  const filteredUsers = users.filter((user) => {
    const searchLower = searchQuery.toLowerCase();
    const fullName = `${user.firstName || ""} ${
      user.lastName || ""
    }`.toLowerCase();
    const email = user.email?.toLowerCase() || "";
    const role = user.role?.toLowerCase() || "";
    const status = user.status?.toLowerCase() || "";

    switch (activeFilter) {
      case "Name":
        return fullName.includes(searchLower);
      case "Email":
        return email.includes(searchLower);
      case "Role":
        return role.includes(searchLower);
      case "Status":
        return status.includes(searchLower);
      default:
        return (
          fullName.includes(searchLower) ||
          email.includes(searchLower) ||
          role.includes(searchLower)
        );
    }
  });

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <NavBar />
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Users Management</h1>
          <button
            onClick={openAddModal}
            className="bg-[#004165] text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
          >
            <PlusIcon className="h-5 w-5 mr-1" /> Add User
          </button>
        </div>

        {/* Search and Filter UI */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder={`Search by ${activeFilter}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-800"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex items-center ml-4">
              <span className="text-sm font-medium text-gray-600 mr-2">
                Filter by:
              </span>
              <div className="flex ml-2 space-x-1">
                {filterOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setActiveFilter(option)}
                    className={`px-3 py-1 rounded-md text-sm ${
                      activeFilter === option
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#004165]"></div>
              <span className="ml-3 text-[#004165] font-medium">
                Loading...
              </span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-7 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium encapsulated text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-6 py-4 text-center text-sm text-gray-500"
                      >
                        {users.length === 0
                          ? "No users found"
                          : "No matching users found"}
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center justify-start">
                            <div className="flex-shrink-0 h-10 w-10 bg-[#004165] rounded-full flex items-center justify-center text-white font-bold">
                              {user.firstName ? user.firstName.charAt(0) : ""}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{`${
                                user.firstName || ""
                              } ${user.lastName || ""}`}</div>
                              {user.campusId && (
                                <div className="text-xs text-gray-500">
                                  ID: {user.campusId}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.role === "SuperAdmin"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {user.status || "active"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                          <div className="flex justify-center space-x-2">
                            <button
                              onClick={() => handleDeleteUser(user._id)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete User"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => openEditModal(user)}
                              className="text-blue-600 hover:text-blue-900"
                              title="Edit User"
                            >
                              <PencilIcon className="h-5 w-5" />
                            </button>
                            <button
                              className="text-gray-600 hover:text-gray-900"
                              title="View User Details"
                            >
                              <EyeIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <form onSubmit={handleSubmit} className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {editMode ? "Edit User" : "Add New User"}
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="campusId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Campus ID
                  </label>
                  <input
                    type="text"
                    id="campusId"
                    name="campusId"
                    value={formData.campusId}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Admin">Admin</option>
                    <option value="SuperAdmin">SuperAdmin</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#004165] hover:bg-blue-700"
                >
                  {editMode ? "Update User" : "Add User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New User Credentials Modal */}
      {newUserCredentials && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h3 className="text-lg font-semibold text-gray-900">
              User Created Successfully
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Please provide the following credentials to the new user for their
              first login. This password cannot be recovered.
            </p>
            <div className="mt-4 space-y-3 bg-gray-50 p-4 rounded-md border">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email:
                </label>
                <p className="text-md font-mono bg-gray-200 p-2 rounded mt-1">
                  {newUserCredentials.email}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Temporary Password:
                </label>
                <p className="text-md font-mono bg-gray-200 p-2 rounded mt-1">
                  {newUserCredentials.password}
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeCredentialsModal}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#004165] hover:bg-blue-700"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
