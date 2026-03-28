import { useState, useMemo } from "react";
import AchivementName from "../cards/AchivementName";
import AchievementCard from "../cards/AchievementCard";
import achievements from "../../data/achievements.json";
import { motion, AnimatePresence } from "framer-motion";

export default function Achievements() {
  const [currentId, setCurrentId] = useState(1);
  const currentAchievement = useMemo(() => {
    return achievements.find((a) => a.id === currentId);
  }, [currentId]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section
      id="achievements"
      className="h-full w-full text-neutral-900 bg-[#f0f0f0] dark:bg-[#2a2a2a] dark:text-white md:px-16 py-16 px-6"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl cabinet font-bold">Achievements</h2>
        <div className="text-xl cabinet text-neutral-600 dark:text-neutral-300 mt-4">
          Here are some of my notable achievements and certificates.
        </div>
      </motion.div>

      {/* Container */}
      <div className="mt-14 grid md:grid-cols-3 grid-cols-1 gap-7">
        {/* Achievement Names List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="col-span-1 space-y-3 bg-neutral-100/50"
          id="achievementsNameDiv"
        >
          {achievements.map((achievement) => (
            <motion.div key={achievement.id} variants={itemVariants}>
              <AchivementName
                achievement={achievement}
                isActive={achievement.id === currentId}
                setCurrentId={setCurrentId}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Achievement Details */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="col-span-2 p-6 rounded-lg bg-white dark:bg-[#3d3d3d] shadow-sm"
          id="achievementsDetailsDiv"
        >
          <AnimatePresence mode="wait">
            {currentAchievement && (
              <motion.div
                key={currentAchievement.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <AchievementCard achievement={currentAchievement} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
