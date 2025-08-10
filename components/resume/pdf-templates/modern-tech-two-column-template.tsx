// modern-tech-two-column-template.tsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';

/** Data shape (must match exactly) */
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

/** Brand colors */
const PRIMARY = '#397DC2';
const BG_SOFT = '#FBF5E2';
const RULE = '#D3D0CE';

/** Styles */
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    paddingTop: 36,
    paddingBottom: 36,
    paddingHorizontal: 42,
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.35,
    color: '#111',
  },

  // Header
  header: {
    marginBottom: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: RULE,
  },
  name: {
    fontSize: 26,
    fontWeight: 700 as any,
    letterSpacing: 0.2,
  },
  title: {
    marginTop: 12,
    fontSize: 13,
    color: PRIMARY,
    fontWeight: 700 as any,
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12 as any,
  },
  contact: { fontSize: 9, color: '#333' },
  contactLink: { fontSize: 9, color: '#333', textDecoration: 'none' },

  // Two-column layout
  grid: { flexDirection: 'row', gap: 24 as any },
  left: { flexBasis: '60%', flexGrow: 0, flexShrink: 0 },
  right: { flexBasis: '40%', flexGrow: 1 },

  // Section
  section: { marginBottom: 18 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 as any, marginTop: 12 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700 as any,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  sectionRule: { height: 2, backgroundColor: '#000', marginTop: 6 },

  // Experience
  expCard: { marginTop: 10, marginBottom: 10 },
  expRole: { fontSize: 11.5, fontWeight: 700 as any },
  expCompany: { fontSize: 10, color: PRIMARY, marginTop: 2, fontWeight: 700 as any },
  expMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  expMeta: { fontSize: 9, color: '#444' },
  bullets: { marginTop: 6, gap: 4 as any },
  bulletRow: { flexDirection: 'row', gap: 6 as any },
  bulletDot: { width: 4, height: 4, marginTop: 4, borderRadius: 4, backgroundColor: PRIMARY },
  bulletText: { flex: 1 },

  // Projects
  projTitle: { fontSize: 11, fontWeight: 700 as any },
  projLink: { color: PRIMARY, textDecoration: 'none' },
  projMeta: { fontSize: 9, color: '#444', marginTop: 2 },

  // Right column blocks
  smallPara: { fontSize: 10, color: '#222', marginTop: 8 },
  eduDegree: { fontSize: 11, fontWeight: 700 as any },
  eduSchool: { color: PRIMARY, marginTop: 2, fontSize: 10, fontWeight: 700 as any },
  eduMeta: { fontSize: 9, color: '#444', marginTop: 2 },
  eduBadgeRow: { flexDirection: 'row', gap: 8 as any, marginTop: 4 },
  badge: {
    borderWidth: 1,
    borderColor: RULE,
    backgroundColor: BG_SOFT,
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 3,
    fontSize: 9,
  },

  // Skills list
  ul: { marginTop: 8, gap: 5 as any },
  liRow: { flexDirection: 'row', gap: 6 as any },
  liDot: { width: 3, height: 3, marginTop: 4, borderRadius: 3, backgroundColor: '#000' },
  liText: { flex: 1 },
});

/** Small helpers */
const Rule: React.FC<{ thick?: boolean }> = ({ thick }) => (
  <View style={[styles.sectionRule, { backgroundColor: thick ? '#000' : RULE }]} />
);

const Bullets: React.FC<{ items: string[] }> = ({ items }) => (
  <View style={styles.bullets}>
    {items.map((t, i) => (
      <View style={styles.bulletRow} key={i}>
        <View style={styles.bulletDot} />
        <Text style={styles.bulletText}>{t}</Text>
      </View>
    ))}
  </View>
);

interface ModernTechTwoColumnTemplateProps {
  data: ResumeData;
}

export const ModernTechTwoColumnTemplate: React.FC<ModernTechTwoColumnTemplateProps> = ({ data }) => {
  const { personalInfo, experience, projects, education, skills, summary } = data;

  const contacts = [
    personalInfo.email,
    personalInfo.phone,
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
            {contacts.map((c, i) =>
              c.startsWith('http') || c.includes('linkedin.com') ? (
                <Link key={i} src={c.startsWith('http') ? c : `https://${c}`} style={styles.contactLink}>
                  {c}
                </Link>
              ) : (
                <Text key={i} style={styles.contact}>
                  {c}
                </Text>
              )
            )}
          </View>
        </View>

        {/* Body grid */}
        <View style={styles.grid}>
          {/* LEFT: Work Experience + Projects */}
          <View style={styles.left}>
            {/* Work Experience */}
            <View style={styles.section}>
              <View style={styles.sectionTitleRow}>
                <Text style={styles.sectionTitle}>Work Experience</Text>
              </View>
              <Rule thick />

              {experience.map((exp, i) => (
                <View key={i} style={[styles.expCard, i === 1 ? { borderTopWidth: 1, borderTopColor: RULE, paddingTop: 10 } : {}]}>
                  <Text style={styles.expRole}>{exp.title}</Text>
                  <Text style={styles.expCompany}>{exp.company}</Text>
                  <View style={styles.expMetaRow}>
                    <Text style={styles.expMeta}>
                      {exp.startDate} - {exp.endDate}
                    </Text>
                    <Text style={styles.expMeta}>{exp.location || ''}</Text>
                  </View>
                  <Bullets items={exp.description} />
                </View>
              ))}
            </View>

            {/* Projects */}
            {projects && projects.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionTitleRow}>
                  <Text style={styles.sectionTitle}>Projects</Text>
                </View>
                <Rule thick />

                {projects.map((p, i) => (
                  <View key={i} style={{ marginTop: 10 }}>
                    <Text style={styles.projTitle}>{p.name}</Text>
                    <Text style={styles.smallPara}>{p.description}</Text>
                    {p.technologies?.length ? (
                      <Text style={styles.projMeta}>Tech: {p.technologies.join(', ')}</Text>
                    ) : null}
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* RIGHT: Objective, Education, Skills */}
          <View style={styles.right}>
            {/* Career Objective */}
            {(summary && summary.trim().length) ? (
              <View style={styles.section}>
                <View style={styles.sectionTitleRow}>
                  <Text style={styles.sectionTitle}>Career Objective</Text>
                </View>
                <Rule thick />
                <Text style={styles.smallPara}>{summary}</Text>
              </View>
            ) : null}

            {/* Education */}
            <View style={styles.section}>
              <View style={styles.sectionTitleRow}>
                <Text style={styles.sectionTitle}>Education</Text>
              </View>
              <Rule thick />

              {education.map((e, i) => (
                <View key={i} style={{ marginTop: 10 }}>
                  <Text style={styles.eduDegree}>{e.degree}</Text>
                  <Text style={styles.eduSchool}>{e.school}</Text>
                  <Text style={styles.eduMeta}>{e.year}</Text>
                  <View style={styles.eduBadgeRow}>
                    {e.gpa ? <Text style={styles.badge}>GPA {e.gpa}</Text> : null}
                  </View>
                </View>
              ))}
            </View>

            {/* Skills */}
            <View style={styles.section}>
              <View style={styles.sectionTitleRow}>
                <Text style={styles.sectionTitle}>Skills</Text>
              </View>
              <Rule thick />
              <View style={styles.ul}>
                {skills.map((s, i) => (
                  <View key={i} style={styles.liRow}>
                    <View style={styles.liDot} />
                    <Text style={styles.liText}>{s}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
