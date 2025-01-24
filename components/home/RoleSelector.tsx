"use client";

type UserRole = "student" | "employer" | "admin";

import { FaUserGraduate, FaBriefcase, FaUserShield } from "react-icons/fa";

export const RoleSelector = ({
  selectedRole,
  onRoleSelect,
}: {
  selectedRole: UserRole | null;
  onRoleSelect: (role: UserRole) => void;
}) => {
  const roles: { type: UserRole; title: string; icon: React.ReactNode }[] = [
    {
      type: "student",
      title: "Student",
      icon: <FaUserGraduate size={24} />,
    },
    {
      type: "employer",
      title: "Employer",
      icon: <FaBriefcase size={24} />,
    },
    {
      type: "admin",
      title: "Admin",
      icon: <FaUserShield size={24} />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {roles.map((role) => (
        <div
          key={role.type}
          className={`p-4 border rounded-lg cursor-pointer transition-all flex flex-col items-center justify-center
            ${
              selectedRole === role.type
                ? "border-[#5771FF] bg-[#5771FF]/10"
                : "border-gray-200 hover:border-[#5771FF]/50"
            }`}
          onClick={() => onRoleSelect(role.type)}
        >
          <div className="flex justify-center items-center mb-2">
            {role.icon}
          </div>
          <h3 className="font-semibold text-sm text-center">{role.title}</h3>
        </div>
      ))}
    </div>
  );
};
