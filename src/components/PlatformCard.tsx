"use client";

import { FC, ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { PlatformInfo } from "@/types";

interface PlatformCardProps {
  platform: PlatformInfo;
  isSelected: boolean;
  onClick: () => void;
}

const PlatformCard: FC<PlatformCardProps> = ({ platform, isSelected, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer transform transition-all duration-300 hover:scale-[1.03]"
    >
      <Card className={`relative overflow-hidden rounded-xl border transition-all ${
        isSelected 
          ? 'border-blue-600 bg-blue-50 shadow-md' 
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
      }`}>
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-tr from-gray-50 to-white opacity-60 transition-opacity duration-300 ${
            isSelected ? 'opacity-80' : 'group-hover:opacity-70'
          }`}></div>
        </div>

        <div className="p-6 relative z-10 flex flex-col items-center text-center">
          <div className="relative mb-4">
            <div className={`p-4 rounded-full border transition-all duration-300 ${
              isSelected
                ? 'border-blue-600 bg-blue-100 shadow-sm'
                : 'border-gray-200 bg-gray-50 group-hover:border-gray-300 group-hover:shadow-sm'
            }`}>
              <div className={`transform transition-transform duration-500 ${
                isSelected ? 'scale-110' : 'group-hover:scale-105'
              }`}>
                {platform.icon}
              </div>
            </div>
          </div>

          <h3 className={`mb-2 text-lg font-semibold transition-colors duration-300 ${
            isSelected ? 'text-blue-700' : 'text-gray-900 group-hover:text-blue-600'
          }`}>
            {platform.name}
          </h3>

          <div className="space-y-1 max-w-sm">
            <p className={`text-sm leading-relaxed transition-colors duration-300 ${
              isSelected ? 'text-blue-600' : 'text-gray-600 group-hover:text-gray-700'
            }`}>
              {platform.description}
            </p>
          </div>

          <div className={`mt-4 h-0.5 rounded-full transition-all duration-300 ${
            isSelected
              ? 'w-12 bg-blue-600'
              : 'w-8 bg-gradient-to-r from-transparent via-gray-400 to-transparent group-hover:w-12 group-hover:via-blue-600'
          }`}></div>
        </div>
      </Card>
    </div>
  );
};

export default PlatformCard;
