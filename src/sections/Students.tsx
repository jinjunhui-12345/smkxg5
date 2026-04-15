import { motion } from 'motion/react';

const studentsData = [
  {
    id: 1,
    title: '社团风采',
    name: '解剖科技协会',
    image: 'https://lsmdescription.pages.dev/photo/hz2.jpg',
    description: '以热爱为炬，探生命之秘，聚青春力量，筑解剖科普高地',
  },
  {
    id: 2,
    title: '社会实践',
    name: '知行合一，服务为民',
    image: 'https://lsmdescription.pages.dev/photo/sxx2.png',
    description: '扎根基层服务，践行医保使命，传递医者温度',
  },
  {
    id: 3,
    title: '科创逐梦',
    name: '以赛砺能，笃行致远',
    image: 'https://lsmdescription.pages.dev/photo/comp4.jpg',
    description: '以赛促学砺锋芒，青春逐梦创佳绩，勇攀医学科创高峰',
  },
  {
    id: 4,
    title: '活动风采',
    name: '青春向党，情暖社会',
    image: 'https://lsmdescription.pages.dev/photo/xc4.png',
    description: '融社会温情，展青年担当，以青春赴家国之梦',
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

      <div className="flex gap-6 md:gap-8 px-6 lg:px-[calc((100vw-80rem)/2+1.5rem)] overflow-x-auto snap-x snap-mandatory pb-12 custom-scrollbar">
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
