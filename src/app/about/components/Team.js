import TeamMemberCard from "./TeamMemberCard";
import teamData from "@/data/team.json";

export default function Team() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <h2 className="text-lg md:text-xl xl:text-3xl font-bold font-poppins text-[#1e3a8a] text-center">
        Notre équipe
      </h2>
      <p className="text-base font-medium text-gray-600 text-center max-w-2xl">
        Notre équipe réunit des experts passionnés en développement, design et gestion de projet, dédiés à concrétiser vos idées.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 max-w-4xl">
        {teamData.map((member, index) => (
          <TeamMemberCard key={index} {...member} />
        ))}
      </div>
    </div>
  );
}