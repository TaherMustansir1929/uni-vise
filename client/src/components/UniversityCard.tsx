import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface UniversityCardProps {
  name: string;
  location: string;
  programs: string[];
  ranking: number;
}

export const UniversityCard = ({
  name,
  location,
  programs,
  ranking,
}: UniversityCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="glass-card p-6 rounded-xl relative overflow-hidden cursor-pointer"
    >
      <div className="absolute top-0 right-0 p-4">
        <Badge variant="secondary" className="bg-primary/10 text-primary">
          {Math.floor(Math.random() * 40)+60}%
        </Badge>
      </div>

      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-muted-foreground text-sm mb-4">{location}</p>

      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-2">Available Programs</p>
          <div className="flex flex-wrap gap-2">
            {programs.map((program) => (
              <Badge key={ranking} variant="outline" className="hover:bg-gray-800">
                {program}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">National Ranking</span>
          <span className="font-medium">#{ranking}</span>
        </div>
      </div>
    </motion.div>
  );
};