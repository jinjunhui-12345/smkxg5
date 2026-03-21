import { motion } from 'motion/react';

const studentsData = [
   {
    id: 1,
    title: '榜样力量',
    name: '王同学、周同学、黄同学等',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop',
    description: '多人荣获国家级励志奖学金，更受邀在从医行分享保研经验贴，用实际行动传承学习力量。',
  },
  {
    id: 2,
    title: '学海共渡',
    name: '解剖科技协会全体社员',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=2073&auto=format&fit=crop',
    description: '营造出浓厚的学习氛围，鼓励成员主动求知、互助交流，在共同学习与经验分享中，巩固专业知识，实现个人能力提升。',
  },
  {
    id: 3,
    title: '步履实践',
    name: '志愿服务队',
    image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=2089&auto=format&fit=crop',
    description: '通过基层实践，增强社会意识与责任感，践行新时代医学生的使命担当。',
  },
  {
    id: 4,
    title: '科创逐梦',
    name: '莘莘学子',
    image: 'https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?q=80&w=2070&auto=format&fit=crop',
    description: '用智慧与担当书写新时代医学生的科创答卷，为医学领域的创新发展注入青春力量。',
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
