// verano-glow-template.tsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFEF7',
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 25,
    backgroundColor: '#FEF3C7',
    padding: 25,
    borderRadius: 20,
    textAlign: 'center',
  },
  name: {
    fontSize: 26,
    fontFamily: 'Helvetica-Bold',
    color: '#F59E0B',
    marginBottom: 8,
    letterSpacing: 2,
  },
  title: {
    fontSize: 14,
    color: '#D97706',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  contactInfo: {
    fontSize: 10,
    color: '#92400E',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  contactItem: {
    marginHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    color: '#F59E0B',
    marginTop: 25,
    marginBottom: 15,
    textAlign: 'center',
    backgroundColor: '#FEF3C7',
    padding: 8,
    borderRadius: 15,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  firstSectionTitle: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    color: '#F59E0B',
    marginTop: 0,
    marginBottom: 15,
    textAlign: 'center',
    backgroundColor: '#FEF3C7',
    padding: 8,
    borderRadius: 15,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  summary: {
    fontSize: 11,
    color: '#374151',
    lineHeight: 1.6,
    textAlign: 'center',
    marginBottom: 20,
    backgroundColor: '#FFFBEB',
    padding: 15,
    borderRadius: 12,
    fontStyle: 'italic',
  },
});

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

interface VeranoGlowTemplateProps {
  data: ResumeData;
}

export const VeranoGlowTemplate: React.FC<VeranoGlowTemplateProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.personalInfo.name}</Text>
        <Text style={styles.title}>{data.personalInfo.title}</Text>
        <View style={styles.contactInfo}>
          <Text style={styles.contactItem}>{data.personalInfo.email}</Text>
          <Text style={styles.contactItem}>★</Text>
          <Text style={styles.contactItem}>{data.personalInfo.phone}</Text>
          <Text style={styles.contactItem}>★</Text>
          <Text style={styles.contactItem}>{data.personalInfo.location}</Text>
          {data.personalInfo.linkedin && (
            <>
              <Text style={styles.contactItem}>★</Text>
              <Text style={styles.contactItem}>{data.personalInfo.linkedin}</Text>
            </>
          )}
        </View>
      </View>

      {/* Summary */}
      {data.summary && (
        <>
          <Text style={styles.firstSectionTitle}>✨ About Me ✨</Text>
          <Text style={styles.summary}>{data.summary}</Text>
        </>
      )}

      {/* Experience */}
      <Text style={styles.sectionTitle}>🚀 Experience</Text>
      {/* Add experience section */}

      {/* Skills */}
      {data.skills.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>💫 Skills</Text>
          {/* Add skills section */}
        </>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>🎓 Education</Text>
          {/* Add education section */}
        </>
      )}
    </Page>
  </Document>
);