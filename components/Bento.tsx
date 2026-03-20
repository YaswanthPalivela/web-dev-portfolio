import { cn } from "@/lib/utils";
import Image from "next/image";


export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?:string | React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group flex flex-col justify-between space-y-4 rounded-xl border-2 border-neutral-200 p-4 shadow-sm transition hover:shadow-xl dark:border-white/[0.2] dark:bg-black",
        className
      )}
    >
      <div className="relative w-full h-50">
        {typeof header === "string" ? (
        <Image src={header} alt={title as string} fill={true} className="object-cover rounded-xl"/>
      ) : (
        header
      )}
      </div>

      <div className="transition group-hover:translate-x-2">
        {icon}
        <div className="mt-2 font-bold text-white dark:text-neutral-200">
          {title}
        </div>
        <div className="text-xs text-slate-300 dark:text-neutral-300 font-semibold">
          {description}
        </div>
      </div>
    </div>
  );
};