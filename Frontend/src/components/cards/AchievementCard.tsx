import { Icon } from "@iconify/react";

interface Achievement {
  name: string,
  time: string,
  shortDesc: string,
  KeyAchievement: string[],
  url: string,
  place: string
}

interface Props {
  achievement: Achievement
}
export default function AchievementCard({ achievement }: Props) {
  return (
    <>
      <div className="flex gap-2 items-center">
        <Icon icon="uil:calender" className="h-4 w-4 text-gray-600 dark:text-gray-100"></Icon>
        <h3 className="text-sm font-normal text-gray-500 dark:text-gray-100">{achievement.time}</h3>
      </div>
      <h3 className="text-xl font-bold">{achievement.name}</h3>
      <a href={achievement.url} target='_blank' className="group hover:underline text-sm flex font-normal items-center">{achievement.place}
        <Icon icon="heroicons:arrow-up-right-16-solid"
          className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"></Icon></a>

      <div className="space-y-5 mt-2">
        <p dangerouslySetInnerHTML={{ __html: achievement.shortDesc }} />
        <h3 className="text-sm font-bold">KEY ACHIEVEMENTS</h3>
      </div>
      <ul className="list-disc pl-5 space-y-2">
        {achievement.KeyAchievement.map((KeyAchievement, index) => (<li key={index}>{KeyAchievement}</li>))}
      </ul>
    </>
  )
}