import { motion } from 'motion/react';

interface Achievement {
  id: number;
  name: string;
  place: string;
}

interface Props {
  achievement: Achievement;
  isActive: boolean;
  setCurrentId: (id: number) => void;
}

// This component is no longer used in the redesigned layout
// Kept for backwards compatibility if needed

export default function AchivementName({ achievement, isActive, setCurrentId }: Props) {
  return (
    <motion.div
      whileHover={{ x: 4 }}
      onClick={() => setCurrentId(achievement.id)}
      className={`p-4 cursor-pointer border-l-4 transition-all duration-200 rounded-sm ${
        isActive
          ? 'border-[#3d3d3d] dark:border-white bg-white dark:bg-[#3d3d3d] shadow-sm'
          : 'border-transparent hover:border-[#3d3d3d] dark:hover:border-white'
      }`}
    >
      <h3 className="text-base font-semibold">{achievement.name}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{achievement.place}</p>
    </motion.div>
  );
}