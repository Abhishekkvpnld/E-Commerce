import { useState } from "react";
import moment from "moment";
import { CiUser } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import {
  FiRefreshCw,
  FiSearch,
  FiUsers,
  FiMail,
  FiCalendar,
} from "react-icons/fi";

import ChangeUserRole from "../components/ChangeUserRole";
import { useAllUsers } from "../hooks/users/useAllUsers";

const AllUsers = () => {
  const [openUpdateBox, setOpenUpdateBox] = useState(false);
  const [userData, setUserData] = useState(null);
  const [search, setSearch] = useState("");

  const {
    data: allUsers = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useAllUsers();

  // Search users
  const filteredUsers = allUsers?.data?.filter((user) =>
    `${user?.username || ""} ${user?.email || ""} ${user?.role || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleEdit = (user) => {
    setUserData(user);
    setOpenUpdateBox(true);
  };

  return (
    <div className="min-h-full bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Title */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm">
              <FiUsers size={21} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800">
                All Users
              </h2>

              <p className="text-sm text-slate-500">
                Manage registered users and their roles
              </p>
            </div>
          </div>

          {/* Refresh */}
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="flex w-fit items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiRefreshCw
              size={16}
              className={isFetching ? "animate-spin" : ""}
            />

            {isFetching ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {/* Search + Count */}
        {!isLoading && !isError && (
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-md">
              <FiSearch
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email or role..."
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-100"
              />
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="rounded-full bg-slate-100 px-3 py-1.5 font-medium text-slate-700">
                {allUsers.length} Users
              </span>

              {search && (
                <span className="text-xs text-slate-400">
                  {filteredUsers.length} result
                  {filteredUsers.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="m-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="animate-pulse">
            <div className="h-12 bg-slate-200" />

            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-4 border-t border-slate-100 px-4 py-4"
              >
                <div className="h-4 w-8 rounded bg-slate-200" />
                <div className="h-4 w-32 rounded bg-slate-200" />
                <div className="h-4 w-48 rounded bg-slate-200" />
                <div className="h-6 w-16 rounded-full bg-slate-200" />
                <div className="h-4 w-24 rounded bg-slate-200" />
                <div className="h-10 w-10 rounded-full bg-slate-200" />
                <div className="h-9 w-9 rounded-full bg-slate-200" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="flex min-h-[calc(100vh-220px)] items-center justify-center p-6">
          <div className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
              <FiUsers size={25} />
            </div>

            <h3 className="text-lg font-bold text-slate-800">
              Unable to load users
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              {error?.message || "Something went wrong while fetching users."}
            </p>

            <button
              onClick={() => refetch()}
              className="mt-5 rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-slate-700 active:scale-95"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Users Table */}
      {!isLoading && !isError && (
        <div className="p-4">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-900 text-left text-xs uppercase tracking-wider text-white">
                    <th className="px-5 py-4 font-semibold">#</th>

                    <th className="px-5 py-4 font-semibold">
                      User
                    </th>

                    <th className="px-5 py-4 font-semibold">
                      Email
                    </th>

                    <th className="px-5 py-4 font-semibold">
                      Role
                    </th>

                    <th className="px-5 py-4 font-semibold">
                      Created Date
                    </th>

                    <th className="px-5 py-4 text-center font-semibold">
                      Profile
                    </th>

                    <th className="px-5 py-4 text-center font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user, index) => (
                      <tr
                        key={user?._id}
                        className="group border-b border-slate-100 transition-all duration-200 last:border-0 hover:bg-slate-50"
                      >
                        {/* Number */}
                        <td className="px-5 py-4 text-sm font-medium text-slate-400">
                          {String(index + 1).padStart(2, "0")}
                        </td>

                        {/* User */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-100 text-slate-500 ring-2 ring-white transition-transform duration-200 group-hover:scale-105">
                              {user?.profilePicture ? (
                                <img
                                  src={user.profilePicture}
                                  alt={user?.username || "User"}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <CiUser size={24} />
                              )}
                            </div>

                            <div>
                              <p className="font-semibold text-slate-800">
                                {user?.username || "Unknown User"}
                              </p>

                              <p className="text-xs text-slate-400">
                                User account
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <FiMail
                              size={14}
                              className="text-slate-400"
                            />

                            {user?.email}
                          </div>
                        </td>

                        {/* Role */}
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${user?.role === "ADMIN"
                                ? "bg-purple-100 text-purple-700"
                                : "bg-blue-100 text-blue-700"
                              }`}
                          >
                            {user?.role}
                          </span>
                        </td>

                        {/* Created Date */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <FiCalendar
                              size={14}
                              className="text-slate-400"
                            />

                            {moment(user?.createdAt).format("LL")}
                          </div>
                        </td>

                        {/* Profile */}
                        <td className="px-5 py-4 text-center">
                          <div className="flex justify-center">
                            {user?.profilePicture ? (
                              <img
                                src={user.profilePicture}
                                alt={user?.username || "Profile"}
                                className="h-10 w-10 rounded-full object-cover ring-2 ring-slate-100 transition-all duration-200 group-hover:ring-slate-300"
                              />
                            ) : (
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                                <CiUser size={24} />
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Action */}
                        <td className="px-5 py-4 text-center">
                          <button
                            onClick={() => handleEdit(user)}
                            title="Edit user role"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all duration-200 hover:scale-110 hover:bg-green-100 hover:text-green-600 active:scale-95"
                          >
                            <FaEdit size={14} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">
                        <div className="flex min-h-[350px] flex-col items-center justify-center px-4 text-center">
                          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                            <FiUsers size={30} />
                          </div>

                          <h3 className="text-lg font-semibold text-slate-700">
                            {search
                              ? "No users found"
                              : "No users available"}
                          </h3>

                          <p className="mt-1 text-sm text-slate-400">
                            {search
                              ? "Try searching with a different name, email or role."
                              : "There are no registered users yet."}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Change User Role */}
      {openUpdateBox && userData && (
        <ChangeUserRole
          userId={userData?._id}
          username={userData?.username}
          email={userData?.email}
          role={userData?.role}
          onClose={() => {
            setOpenUpdateBox(false);
            setUserData(null);
          }}
        />
      )}
    </div>
  );
};

export default AllUsers;