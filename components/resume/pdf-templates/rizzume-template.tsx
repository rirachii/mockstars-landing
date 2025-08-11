import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 25,
    textAlign: 'center',
    backgroundColor: '#F8F9FA',
    padding: 20,
    borderRadius: 12,
    border: '2px solid #E9ECEF',
  },
  name: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    color: '#212529',
    marginBottom: 8,
    letterSpacing: 1,
  },
  title: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 12,
  },
  contactInfo: {
    fontSize: 10,
    color: '#6C757D',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  contactItem: {
    marginHorizontal: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#212529',
    marginTop: 20,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  firstSectionTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#212529',
    marginTop: 0,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  summary: {
    fontSize: 11,
    color: '#495057',
    lineHeight: 1.5,
    textAlign: 'justify',
    marginBottom: 15,
    backgroundColor: '#F8F9FA',
    padding: 15,
    borderRadius: 8,
  },
  experienceItem: {
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    border: '1px solid #E9ECEF',
    padding: 15,
    borderRadius: 8,
  },
  jobTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#212529',
    marginBottom: 3,
  },
  companyInfo: {
    fontSize: 10,
    color: '#6C757D',
    marginBottom: 8,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 3,
    alignItems: 'flex-start',
  },
  bullet: {
    width: 10,
    fontSize: 10,
    color: '#495057',
    marginRight: 5,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    color: '#495057',
    lineHeight: 1.4,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  skillItem: {
    fontSize: 10,
    color: '#495057',
    backgroundColor: '#F8F9FA',
    padding: 6,
    margin: 3,
    borderRadius: 4,
    border: '1px solid #E9ECEF',
  },
});

interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    links?: Array<{ id: string; label: string; url: string }>;
  };
  summary?: string;
  experience: Array<{
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    bullets: Array<{ text: string }>;
    location?: string;
  }>;
  education: Array<{
    degree: string;
    school: string;
    startYear: string;
    endYear: string;
    gpa?: string;
  }>;
  skills: string[];
  projects?: Array<{
    name: string;
    description: string;
    technologies: string[];
  }>;
}

interface RizzumeTemplateProps {
  data: ResumeData;
}

export const RizzumeTemplate: React.FC<RizzumeTemplateProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.personalInfo.name}</Text>
        <Text style={styles.title}>{data.personalInfo.title}</Text>
        <View style={styles.contactInfo}>
          <Text style={styles.contactItem}>{data.personalInfo.email}</Text>
          <Text style={styles.contactItem}>|</Text>
          <Text style={styles.contactItem}>{data.personalInfo.phone}</Text>
          <Text style={styles.contactItem}>|</Text>
          <Text style={styles.contactItem}>{data.personalInfo.location}</Text>
          {(data.personalInfo.links || []).map((l) => (
            <Text key={l.id} style={styles.contactItem}>{l.label}: {l.url}</Text>
          ))}
        </View>
      </View>

      {/* Summary */}
      {data.summary && (
        <>
          <Text style={styles.firstSectionTitle}>Professional Summary</Text>
          <Text style={styles.summary}>{data.summary}</Text>
        </>
      )}

      {/* Experience */}
      <Text style={styles.sectionTitle}>Work Experience</Text>
      {data.experience.map((job, index) => (
        <View key={index} style={styles.experienceItem}>
          <Text style={styles.jobTitle}>{job.title}</Text>
          <Text style={styles.companyInfo}>
            {job.company} • {job.location || 'Remote'} • {job.startDate} - {job.endDate}
          </Text>
          {(job.bullets || []).map((b, bulletIndex) => (
            <View key={bulletIndex} style={styles.bulletPoint}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>{b.text}</Text>
            </View>
          ))}
        </View>
      ))}

      {/* Skills */}
      {data.skills.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsContainer}>
            {data.skills.map((skill, index) => (
              <Text key={index} style={styles.skillItem}>{skill}</Text>
            ))}
          </View>
        </>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map((edu, index) => (
            <View key={index} style={styles.experienceItem}>
              <Text style={styles.jobTitle}>{edu.degree}</Text>
              <Text style={styles.companyInfo}>{edu.school} • {[edu.startYear, edu.endYear].filter(Boolean).join(' - ')}</Text>
              {edu.gpa && <Text style={styles.companyInfo}>GPA: {edu.gpa}</Text>}
            </View>
          ))}
        </>
      )}
    </Page>
  </Document>
);
