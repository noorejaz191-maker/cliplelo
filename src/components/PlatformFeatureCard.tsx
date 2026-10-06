"use client";

import { FC, ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface PlatformFeatureCardProps {
  title: string;
  description: string[];
  icon?: ReactNode;
}

const PlatformFeatureCard: FC<PlatformFeatureCardProps> = ({ title, description, icon }) => {
  return (
    <div className="group cursor-pointer transform transition-all duration-300 hover:scale-[1.03]">
      <Card className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:border-blue-600 hover:shadow-md">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-gray-50 to-white opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
        </div>

        <div className="p-6 relative z-10 flex flex-col items-center text-center">
          {icon && (
            <div className="relative mb-4">
              <div className="p-4 rounded-full border border-gray-200 bg-gray-50 shadow-sm transform group-hover:scale-105 group-hover:border-blue-600 group-hover:bg-blue-50 transition-all duration-300">
                <div className="transform group-hover:rotate-6 transition-transform duration-500">
                  {icon}
                </div>
              </div>
            </div>
          )}

          <h3 className="mb-2 text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
            {title}
          </h3>

          <div className="space-y-1 max-w-sm">
            {description.map((line, idx) => (
              <p
                key={idx}
                className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300"
              >
                {line}
              </p>
            ))}
          </div>

          <div className="mt-4 w-8 h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent rounded-full group-hover:w-12 group-hover:via-blue-600 transition-all duration-300"></div>
        </div>
      </Card>
    </div>
  );
};

export default PlatformFeatureCard;
