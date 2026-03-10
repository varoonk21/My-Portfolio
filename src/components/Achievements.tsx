import { useState, useMemo } from 'react';
import AchivementName from './cards/AchivementName';
import AchievementCard from './cards/AchievementCard';
import achievements from '../data/achievements.json'
export default function Achievements() {

  const [currentId, setCurrentId] = useState(1);
  const currentAchievement = useMemo(() => {
    return achievements.find(a => a.id === currentId);
  }, [currentId]);

  return (
    <section id="achievements" className="min-h-screen w-full text-[#3d3d3d] bg-[#f8f8f8] dark:bg-[#2a2a2a]  dark:text-white md:px-16 py-16 px-6" >
      <h2 className="text-4xl font-bold"><u>Achieve</u>ments</h2>
      {/* container */}
      <div className="mt-14 grid md:grid-cols-3 grid-cols-1 gap-7">
        {/* names */}
        <div className="col-span-1 space-y-3" id="achievementsNameDiv">
          {/* single div */}
          {achievements.map(achievement => <AchivementName key={achievement.id} achievement={achievement} isActive={achievement.id === currentId} setCurrentId={setCurrentId} />)}
        </div>
        {/* details */}
        <div className="col-span-2 p-6 rounded-sm space-y-3 bg-white dark:bg-[#3d3d3d]" id="achievementsDetailsDiv">
          {currentAchievement && <AchievementCard achievement={currentAchievement} />}
        </div>
      </div>
    </section>
  )
}
