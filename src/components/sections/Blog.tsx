import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { blogPosts } from '@/data/portfolio';

const BlogCard = ({ post, index }: { post: typeof blogPosts[0]; index: number }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group"
    >
      <div className="relative h-full rounded-2xl glass overflow-hidden hover:glow-sm transition-all duration-300">
        {/* Image/Preview Area */}
        <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
          <span className="text-6xl font-bold text-primary/20">
            {index + 1}
          </span>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
          
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
            {post.excerpt}
          </p>
          
          {/* Meta */}
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
          
          {/* Read More Link */}
          <motion.a
            href="#"
            className="inline-flex items-center gap-2 text-primary font-medium group/link"
            whileHover={{ x: 5 }}
          >
            Read More
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.span>
          </motion.a>
        </div>
      </div>
    </motion.article>
  );
};

const Blog = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="blog" ref={sectionRef} className="py-32 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-primary mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Latest Articles
          </motion.span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            My <span className="gradient-text">Blog</span>
          </h2>
          
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Thoughts, tutorials, and insights on software development
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <motion.a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Articles
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
