// modern-executive-template.tsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

/**
 * Mockstars Resume Data Shape (must match exactly)
 */
interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    website?: string;
  };
  summary?: string;
  experience: Array<{
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string[];
    location?: string;
  }>;
  education: Array<{
    degree: string;
    school: string;
    year: string;
    gpa?: string;
  }>;
  skills: string[];
  projects?: Array<{
    name: string;
    description: string;
    technologies: string[];
  }>;
}

/**
 * Styles — modern, minimal, two-column with left rail
 * Brand colors:
 *   Primary: #397DC2
 *   Background: #FBF5E2 (used sparingly as chips)
 *   Dark Grey rule: #D3D0CE
 */
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    paddingTop: 36,
    paddingBottom: 36,
    paddingHorizontal: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.35,
    color: '#111111',
  },

  // Header
  header: {
    marginBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#D3D0CE',
    paddingBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: 700 as any,
    marginBottom: 4, // add space between name and title
  },
  title: {
    fontSize: 11,
    color: '#397DC2',
    fontWeight: 700 as any,
    marginBottom: 8, // extra space before contact row
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10 as any,
  },
  contactItem: {
    fontSize: 9,
    color: '#333333',
  },

  // Two-column body
  sectionWrap: {
    display: 'flex',
    flexDirection: 'row',
    gap: 14 as any,
  },
  leftRail: {
    width: 110,
    paddingTop: 2,
  },
  rightCol: {
    flex: 1,
  },

  // Section heading (left rail)
  sectionTitle: {
    fontSize: 10,
    fontWeight: 700 as any,
    color: '#111111',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sectionRule: {
    height: 2,
    backgroundColor: '#397DC2',
    width: 18,
    marginTop: 6,
    marginBottom: 6,
  },

  // Blocks
  block: {
    marginBottom: 16,
  },

  // Summary
  summaryText: {
    fontSize: 10,
    color: '#171717',
  },

  // Experience
  expItem: {
    marginBottom: 10,
  },
  expHeaderRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8 as any,
  },
  expRole: {
    fontSize: 11,
    fontWeight: 700 as any,
  },
  expMeta: {
    fontSize: 9,
    color: '#444444',
  },
  expCompanyRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  expCompany: {
    fontSize: 10,
    color: '#111111',
  },
  bullets: {
    marginTop: 5,
    display: 'flex',
    flexDirection: 'column',
    gap: 3 as any,
  },
  bulletRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 6 as any,
  },
  bulletDot: {
    width: 3,
    height: 3,
    marginTop: 4,
    borderRadius: 3,
    backgroundColor: '#397DC2',
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
  },

  // Education
  eduRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  eduDegree: {
    fontSize: 10,
    fontWeight: 700 as any,
  },
  eduMeta: {
    fontSize: 9,
    color: '#444444',
  },

  // Skills (chip list)
  skillsWrap: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6 as any,
  },
  chip: {
    borderWidth: 1,
    borderColor: '#D3D0CE',
    backgroundColor: '#FBF5E2',
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 3,
    fontSize: 9,
  },

  // Projects
  projItem: {
    marginBottom: 8,
  },
  projTitle: {
    fontSize: 10,
    fontWeight: 700 as any,
  },
  projDesc: {
    marginTop: 2,
    fontSize: 10,
  },
  projTech: {
    marginTop: 2,
    fontSize: 9,
    color: '#444444',
  },
});

interface ModernExecutiveTemplateProps {
  data: ResumeData;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <View style={[styles.sectionWrap, styles.block]}>
    <View style={styles.leftRail}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionRule} />
    </View>
    <View style={styles.rightCol}>{children}</View>
  </View>
);

const ContactItem: React.FC<{ text?: string }> = ({ text }) =>
  text ? <Text style={styles.contactItem}>{text}</Text> : null;

const Bullets: React.FC<{ items: string[] }> = ({ items }) => (
  <View style={styles.bullets}>
    {items.map((it, idx) => (
      <View key={idx} style={styles.bulletRow}>
        <View style={styles.bulletDot} />
        <Text style={styles.bulletText}>{it}</Text>
      </View>
    ))}
  </View>
);

export const ModernExecutiveTemplate: React.FC<ModernExecutiveTemplateProps> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects } = data;

  const contactChunks = [
    personalInfo.phone,
    personalInfo.email,
    personalInfo.location,
    personalInfo.linkedin,
    personalInfo.website,
  ].filter(Boolean) as string[];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.name}</Text>
          <Text style={styles.title}>{personalInfo.title}</Text>
          <View style={styles.contactRow}>
            {contactChunks.map((c, i) => (
              <ContactItem key={i} text={c} />
            ))}
          </View>
        </View>

        {/* Summary */}
        {summary ? (
          <Section title="Summary">
            <Text style={styles.summaryText}>{summary}</Text>
          </Section>
        ) : null}

        {/* Experience */}
        <Section title="Experience">
          <View>
            {experience.map((exp, i) => (
              <View key={i} style={styles.expItem}>
                <View style={styles.expHeaderRow}>
                  <Text style={styles.expRole}>{exp.title}</Text>
                  <Text style={styles.expMeta}>
                    {exp.startDate} – {exp.endDate}
                  </Text>
                </View>
                <View style={styles.expCompanyRow}>
                  <Text style={styles.expCompany}>{exp.company}</Text>
                  <Text style={styles.expMeta}>{exp.location || ''}</Text>
                </View>
                <Bullets items={exp.description} />
              </View>
            ))}
          </View>
        </Section>

        {/* Education */}
        <Section title="Education">
          <View>
            {education.map((edu, i) => (
              <View key={i} style={styles.eduRow}>
                <Text style={styles.eduDegree}>
                  {edu.degree} — {edu.school}
                </Text>
                <Text style={styles.eduMeta}>
                  {edu.year}
                  {edu.gpa ? ` • GPA ${edu.gpa}` : ''}
                </Text>
              </View>
            ))}
          </View>
        </Section>

        {/* Skills */}
        <Section title="Technical Skills">
          <View style={styles.skillsWrap}>
            {skills.map((s, i) => (
              <Text key={i} style={styles.chip}>
                {s}
              </Text>
            ))}
          </View>
        </Section>

        {/* Projects (optional) */}
        {projects && projects.length > 0 ? (
          <Section title="Projects">
            <View>
              {projects.map((p, i) => (
                <View key={i} style={styles.projItem}>
                  <Text style={styles.projTitle}>{p.name}</Text>
                  <Text style={styles.projDesc}>{p.description}</Text>
                  <Text style={styles.projTech}>Tech: {p.technologies.join(', ')}</Text>
                </View>
              ))}
            </View>
          </Section>
        ) : null}
      </Page>
    </Document>
  );
};
