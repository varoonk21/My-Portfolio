import { Icon } from "@iconify/react";
import formatDate from "../../utils/formatDate";

interface projectInterface {
  html_url: string,
  created_at: string,
  updated_at: string
  full_name: string,
  description: string,
  topics: string[],
  name: string,
  homepage: string
}
interface Props {
  project: projectInterface
}
export default function WebProjectCard({ project }: Props) {

  function GenerateImageUrl(repo: string) {
    return `https://raw.githubusercontent.com/${repo}/main/assets/preview.webp`
  }
  
  return (
    <div
      onClick={() => window.open(`${project.homepage || project.html_url}`, '_blank')}
      className="cursor-pointer group flex flex-col justify-between items-start transition-all duration-300 hover:-translate-y-1.5 bg-white dark:bg-[#222222] shadow-sm 
      hover:shadow-xl dark:shadow-none dark:hover:shadow-lg dark:hover:shadow-black/40 border border-gray-100 dark:border-white/5 rounded-2xl overflow-hidden h-full">

      <div className="w-full relative overflow-hidden aspect-16/10 bg-neutral-100 dark:bg-white/5">
        <img
          alt={project.name}
          src={GenerateImageUrl(project.full_name)}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 border-b border-black/5 dark:border-white/5 group-hover:opacity-0 transition-opacity"></div>
      </div>

      <div className="flex flex-col grow p-5 sm:p-6 w-full">
        <div className="flex justify-between items-center w-full mb-3">
          <h3 className="text-[11px] sm:text-xs font-bold text-neutral-500 dark:text-blue-400 tracking-wider uppercase">
            {formatDate(project.created_at, project.updated_at)}
          </h3>
          <a href={project.homepage || project.html_url} onClick={e => e.stopPropagation()} target="_blank" className="p-1.5 sm:p-2 rounded-full bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-500/20 dark:hover:text-blue-300 transition-colors">
            <Icon icon="heroicons:arrow-up-right-20-solid" width="18" height="18" className="transition-transform group-hover:rotate-45" />
          </a>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-neutral-800 dark:text-white mb-2 line-clamp-1 capitalize group-hover:text-neutral-900 dark:group-hover:text-blue-400 transition-colors">
          {project.name.replaceAll('-', ' ')}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-[15px] leading-relaxed mb-6 line-clamp-3 grow">
          {project.description || "No description provided for this project."}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          {project.topics.filter(t => t !== 'include').slice(0, 4).map(tech => (
            <span key={tech} className="px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold bg-neutral-100 text-neutral-700 dark:bg-[#333333]
             dark:text-neutral-300 capitalize transition-colors group-hover:bg-neutral-800 group-hover:text-white dark:group-hover:bg-blue-500/20 dark:group-hover:text-blue-300">
              {tech.replaceAll('-', ' ')}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}