import { motion } from "framer-motion";
import { HelpCircle, Book, MessageCircle, Mail, ExternalLink, Search, ChevronRight } from "lucide-react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I ask questions to the AI Agent?",
    answer: "Simply navigate to the AI Chat page and type your question in natural language. The agent understands business context and can answer questions about vendors, claims, trends, and more."
  },
  {
    question: "What types of charts and visualizations are available?",
    answer: "The dashboard supports area charts, bar charts, line charts, and pie charts. All visualizations are interactive and update in real-time based on your data."
  },
  {
    question: "How does duplicate claim detection work?",
    answer: "Our AI agent analyzes claim patterns, submission times, vendor behavior, and multiple data points to identify potential duplicate claims with high accuracy."
  },
  {
    question: "Can I export reports and data?",
    answer: "Yes! You can export data from the Data Explorer page and generate PDF reports from the Reports section. Both scheduled and on-demand reports are supported."
  },
  {
    question: "How do I add a new vendor?",
    answer: "Go to the Vendors page and click the 'Add Vendor' button. Fill in the required information and the vendor will be added to the system."
  },
  {
    question: "What languages does the AI support?",
    answer: "The AI agent automatically detects your language and responds accordingly. Currently supported: English, Spanish, French, German, Hindi, and more."
  },
];

const resources = [
  { icon: Book, title: "Documentation", desc: "Complete API and feature docs", link: "#" },
  { icon: MessageCircle, title: "Community Forum", desc: "Connect with other users", link: "#" },
  { icon: Mail, title: "Email Support", desc: "Get help from our team", link: "#" },
];

const HelpPage = () => {
  return (
    <DashboardLayout title="Help Center" subtitle="Find answers and get support">
      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto mb-8"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search for help..."
            className="pl-12 py-6 text-lg bg-muted/30 border-border/50"
          />
        </div>
      </motion.div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {resources.map((resource, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard className="p-5 cursor-pointer" hover>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <resource.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{resource.title}</p>
                    <p className="text-sm text-muted-foreground">{resource.desc}</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* FAQ */}
      <GlassCard>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-primary" />
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-border/50">
              <AccordionTrigger className="text-left hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </GlassCard>

      {/* Contact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 text-center"
      >
        <GlassCard className="p-8 max-w-lg mx-auto">
          <h3 className="text-lg font-semibold mb-2">Still need help?</h3>
          <p className="text-muted-foreground mb-4">
            Our support team is available 24/7 to assist you.
          </p>
          <Button className="gap-2">
            <MessageCircle className="w-4 h-4" />
            Contact Support
          </Button>
        </GlassCard>
      </motion.div>
    </DashboardLayout>
  );
};

export default HelpPage;
