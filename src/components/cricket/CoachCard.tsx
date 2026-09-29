import React from 'react';
import { Coach } from '@/types';
import { Phone, Mail, Award, CheckCircle2 } from 'lucide-react';

interface CoachCardProps {
  coach: Coach;
}

export const CoachCard: React.FC<CoachCardProps> = ({ coach }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#D1EAEF] shadow-sm hover:shadow-xl hover:border-[#0A9396]/60 transition-all duration-300 flex flex-col justify-between">
      {/* Top Banner with Dark Navy & Teal */}
      <div className="h-1.5 bg-gradient-to-r from-[#0B222E] via-[#00B4D8] to-[#0A9396]" />

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-4">
          {/* Coach Avatar */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-[#00B4D8]/30 shadow-md shrink-0 group-hover:scale-105 transition-transform duration-300">
            <img
              src={coach.photoUrl}
              alt={coach.name}
              className="w-full h-full object-cover object-top"
            />
          </div>

          <div className="flex-1 min-w-0">
            <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider text-[#0A9396] bg-[#E0F7FA] px-2 py-0.5 rounded-md border border-[#00B4D8]/20">
              {coach.role}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[#0B222E] truncate mt-1">
              {coach.name}
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              {coach.experience}
            </p>
          </div>
        </div>

        {/* Specialization Tags */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Specialization:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {coach.specialization.map((spec, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-lg bg-[#F8FCFD] text-[#0F2C3A] border border-[#D1EAEF] font-medium"
              >
                <CheckCircle2 className="w-2.5 h-2.5 text-[#00DF82]" />
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Bio summary */}
        <p className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {coach.bio}
        </p>

        {/* Contact info */}
        <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600 font-mono">
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-[#0A9396]" />
            <span>{coach.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-[#00B4D8]" />
            <span className="truncate">{coach.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
