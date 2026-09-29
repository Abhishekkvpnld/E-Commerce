import React, { useState } from "react";
import { ROLE } from "../common/role";
import { IoMdClose } from "react-icons/io";
import { FiUser, FiMail, FiShield, FiCheck, FiLoader } from "react-icons/fi";
import axios from "axios";
import endPoints from "../common/configApi";
import toast from "react-hot-toast";

const ChangeUserRole = ({
  username,
  email,
  role,
  userId,
  onClose,
  callFunc,
}) => {
  const [userRole, setUserRole] = useState(role);
  const [loading, setLoading] = useState(false);

  const handleSelectRole = (e) => {
    setUserRole(e.target.value);
  };

  const updateUserRole = async () => {
    if (userRole === role) {
      toast.error("Please select a different role");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        endPoints.update_User_role.url,
        {
          username,
          email,
          role: userRole,
          userId,
        },
        {
          withCredentials: true,
        }
      );

      if (response?.data?.success) {
        toast.success(
          response?.data?.message || "User role updated successfully"
        );

        onClose();
        callFunc();
      }

      if (response?.data?.error) {
        toast.error(response?.data?.message || "Failed to update role");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-slate-900/50
        p-4
        backdrop-blur-sm
        animate-[fadeIn_0.2s_ease-out]
      "
      onClick={onClose}
    >
      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full max-w-md
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-2xl
          animate-[modalIn_0.25s_ease-out]
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-3">
            <div
              className="
                flex h-11 w-11 items-center justify-center
                rounded-xl bg-green-50 text-green-600
              "
            >
              <FiShield size={21} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Change User Role
              </h2>

              <p className="text-xs text-slate-400">
                Update user permissions
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={loading}
            className="
              flex h-9 w-9 items-center justify-center
              rounded-full
              text-slate-400
              transition-all duration-200
              hover:rotate-90
              hover:bg-slate-100
              hover:text-slate-700
              disabled:opacity-50
            "
          >
            <IoMdClose size={21} />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-5 px-6 py-6">
          {/* User Info */}
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            {/* Username */}
            <div className="flex items-center gap-3">
              <div
                className="
                  flex h-10 w-10 shrink-0 items-center justify-center
                  rounded-full bg-white
                  text-slate-500
                  shadow-sm
                "
              >
                <FiUser size={18} />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Username
                </p>

                <p className="truncate font-semibold text-slate-700">
                  {username}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="mt-4 flex items-center gap-3 border-t border-slate-200 pt-4">
              <div
                className="
                  flex h-10 w-10 shrink-0 items-center justify-center
                  rounded-full bg-white
                  text-slate-500
                  shadow-sm
                "
              >
                <FiMail size={18} />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Email
                </p>

                <p className="truncate text-sm font-medium text-slate-700">
                  {email}
                </p>
              </div>
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Select Role
            </label>

            <div className="relative">
              <FiShield
                size={18}
                className="
                  absolute left-3 top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <select
                value={userRole}
                onChange={handleSelectRole}
                disabled={loading}
                className="
                  w-full appearance-none
                  rounded-xl
                  border border-slate-200
                  bg-white
                  py-3 pl-10 pr-4
                  text-sm font-medium
                  capitalize text-slate-700
                  outline-none
                  transition-all duration-200
                  hover:border-slate-300
                  focus:border-green-500
                  focus:ring-4 focus:ring-green-50
                  disabled:cursor-not-allowed
                  disabled:bg-slate-50
                "
              >
                {Object.values(ROLE).map((role) => (
                  <option value={role} key={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Role Preview */}
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">
                  Current Role
                </p>

                <span className="mt-1 inline-block rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold capitalize text-slate-600">
                  {role}
                </span>
              </div>

              <div className="text-lg text-slate-300">
                →
              </div>

              <div className="text-right">
                <p className="text-xs text-slate-400">
                  New Role
                </p>

                <span
                  className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                    userRole === role
                      ? "bg-slate-200 text-slate-500"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {userRole}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4">
          <button
            onClick={onClose}
            disabled={loading}
            className="
              rounded-lg
              border border-slate-200
              bg-white
              px-4 py-2
              text-sm font-semibold
              text-slate-600
              transition-all duration-200
              hover:bg-slate-100
              active:scale-95
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Cancel
          </button>

          <button
            onClick={updateUserRole}
            disabled={loading || userRole === role}
            className="
              flex min-w-[130px]
              items-center justify-center gap-2
              rounded-lg
              bg-green-600
              px-4 py-2
              text-sm font-semibold
              text-white
              shadow-sm
              transition-all duration-200
              hover:bg-green-700
              hover:shadow-md
              active:scale-95
              disabled:cursor-not-allowed
              disabled:bg-slate-300
              disabled:text-slate-500
            "
          >
            {loading ? (
              <>
                <FiLoader
                  size={16}
                  className="animate-spin"
                />
                Updating...
              </>
            ) : (
              <>
                <FiCheck size={16} />
                Update Role
              </>
            )}
          </button>
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes modalIn {
            from {
              opacity: 0;
              transform: scale(0.95) translateY(15px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default ChangeUserRole;