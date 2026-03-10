interface Achievement {
  id: number,
  name: string,
  place: string
}
interface Props {
  achievement: Achievement,
  isActive: boolean,
  setCurrentId: (id: number) => void
}
export default function AchivementName({ achievement, isActive, setCurrentId }: Props) {
  return (
    <div id="name_${achievement.id}" onClick={() => setCurrentId(achievement.id)} className={`p-3 cursor-pointer border-l-4 border-[#3d3d3d] dark:border-white ${isActive ? 'bg-white dark:bg-[#3d3d3d] dark:text-white' : 'hover:bg-white dark:hover:bg-[#3d3d3d] active:bg-white'}`}>
      <h3 className="text-lg font-bold">{achievement.name}</h3>
      <p className="text-sm font-normal">{achievement.place}</p>
    </div>
  )
}