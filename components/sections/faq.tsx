"use client";

import { motion } from "framer-motion";

import { siteConfig } from "@/config/site";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Accordion } from "@/components/ui/accordion";

export function Faq() {
  return (
    <Section id="faq">
      <Container>
        <SectionHeading
          title="Frequently Asked Questions"
          description="Answers to what most businesses ask before starting a project."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-12 max-w-3xl"
        >
          <Accordion items={siteConfig.faq} />
        </motion.div>
      </Container>
    </Section>
  );
}
