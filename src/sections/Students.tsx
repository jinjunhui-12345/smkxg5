import { motion } from 'motion/react';

const studentsData = [
  {
    id: 1,
    title: '临床技能大赛一等奖',
    name: '张同学 & 李同学',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop',
    description: '在全国医学生临床技能大赛中，我校代表队凭借扎实的基本功和出色的临场应变能力，荣获特等奖。',
  },
  {
    id: 2,
    title: '《Nature》子刊发表论文',
    name: '王同学',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop',
    description: '我院博士研究生在肿瘤免疫治疗领域取得重大突破，相关研究成果发表于国际顶级期刊。',
  },
  {
    id: 3,
    title: '暑期“三下乡”医疗服务',
    name: '志愿服务队',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=2070&auto=format&fit=crop',
    description: '深入偏远山区开展义诊活动，普及健康知识，用实际行动践行“医者仁心”的誓言。',
  },
  {
    id: 4,
    title: '国际医学交流论坛',
    name: '赵同学',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop',
    description: '受邀参加全球青年医学领袖峰会，就公共卫生政策与全球健康议题发表演讲。',
  },
];

export default function Students() {
  return (
    <section id="students" className="py-32 bg-zinc-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
        >
          <motion.h2
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
            className="text-sm uppercase tracking-[0.3em] text-emerald-400 mb-4 font-semibold"
          >
            02 / 学生风采
          </motion.h2>
          <motion.h3
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white"
          >
            青春力量
          </motion.h3>
        </motion.div>
      </div>

      <div className="flex gap-6 md:gap-8 px-6 lg:px-[calc((100vw-80rem)/2+1.5rem)] overflow-x-auto snap-x snap-mandatory pb-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {studentsData.map((student, index) => (
          <motion.div
            key={student.id}
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative w-[85vw] md:w-[450px] lg:w-[500px] h-[500px] md:h-[600px] flex-shrink-0 overflow-hidden rounded-3xl bg-zinc-800 snap-center md:snap-start"
          >
            <img
              src={student.image}
              alt={student.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <p className="text-emerald-400 font-medium mb-2">{student.name}</p>
              <h4 className="text-2xl md:text-3xl font-bold text-white mb-4">{student.title}</h4>
              <p className="text-zinc-300 line-clamp-3">{student.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
