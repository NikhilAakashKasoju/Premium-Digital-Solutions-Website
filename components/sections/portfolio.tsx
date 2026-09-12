"use client";

import { motion, type Variants } from "framer-motion";

import { PORTFOLIO_PROJECTS } from "@/config/portfolio";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { ProjectCard } from "@/components/sections/project-card";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function Portfolio() {
  return (
    <Section id="work">
      <Container>
        <SectionHeading
          title="Selected Work"
          description="Explore examples of the digital experiences and business systems we can build."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >
          {PORTFOLIO_PROJECTS.map((project) => (
            <motion.div key={project.slug} variants={card}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
