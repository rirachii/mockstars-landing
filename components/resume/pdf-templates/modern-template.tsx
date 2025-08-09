import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Register fonts (you'll need to add font files to your public folder)
// Font.register({
//   family: 'Inter',
//   src: '/fonts/Inter-Regular.ttf',
// });

// Define styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 40,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    borderBottom: 2,
    borderBottomColor: '#397DC2',
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#397DC2',
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 10,
  },
  contact: {
    fontSize: 10,
    color: '#666666',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  section: {
    marginTop: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#397DC2',
    marginBottom: 8,
    textTransform: 'uppercase',
    borderBottom: 1,
    borderBottomColor: '#397DC2',
    paddingBottom: 2,
  },
  experienceItem: {
    marginBottom: 12,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333333',
  },
  company: {
    fontSize: 11,
    color: '#666666',
    marginBottom: 2,
  },
  dates: {
    fontSize: 10,
    color: '#888888',
    marginBottom: 4,
  },
  description: {
    fontSize: 10,
    lineHeight: 1.4,
    color: '#333333',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  skill: {
    fontSize: 10,
    backgroundColor: '#f0f0f0',
    padding: 3,
    borderRadius: 3,
    marginRight: 5,
    marginBottom: 5,
  },
  bulletPoint: {
    fontSize: 10,
    marginBottom: 3,
    color: '#333333',
    paddingLeft: 10,
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

interface ModernTemplateProps {
  data: ResumeData;
}

export const ModernTemplate: React.FC<ModernTemplateProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.personalInfo.name}</Text>
        <Text style={styles.title}>{data.personalInfo.title}</Text>
        <View style={styles.contact}>
          <Text>{data.personalInfo.email}</Text>
          <Text>{data.personalInfo.phone}</Text>
          <Text>{data.personalInfo.location}</Text>
        </View>
      </View>

      {/* Summary Section */}
      {data.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.description}>{data.summary}</Text>
        </View>
      )}

      {/* Experience Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Experience</Text>
        {data.experience.map((job, index) => (
          <View key={index} style={styles.experienceItem}>
            <Text style={styles.jobTitle}>{job.title}</Text>
            <Text style={styles.company}>{job.company} | {job.location}</Text>
            <Text style={styles.dates}>{job.startDate} - {job.endDate}</Text>
            {job.description.map((bullet, bulletIndex) => (
              <Text key={bulletIndex} style={styles.bulletPoint}>
                • {bullet}
              </Text>
            ))}
          </View>
        ))}
      </View>

      {/* Education Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        {data.education.map((edu, index) => (
          <View key={index} style={styles.experienceItem}>
            <Text style={styles.jobTitle}>{edu.degree}</Text>
            <Text style={styles.company}>{edu.school}</Text>
            <Text style={styles.dates}>{edu.year}</Text>
            {edu.gpa && <Text style={styles.description}>GPA: {edu.gpa}</Text>}
          </View>
        ))}
      </View>

      {/* Skills Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Technical Skills</Text>
        <View style={styles.skillsContainer}>
          {data.skills.map((skill, index) => (
            <Text key={index} style={styles.skill}>{skill}</Text>
          ))}
        </View>
      </View>

      {/* Projects Section */}
      {data.projects && data.projects.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          {data.projects.map((project, index) => (
            <View key={index} style={styles.experienceItem}>
              <Text style={styles.jobTitle}>{project.name}</Text>
              <Text style={styles.description}>{project.description}</Text>
              <Text style={styles.company}>
                Technologies: {project.technologies.join(', ')}
              </Text>
            </View>
          ))}
        </View>
      )}
    </Page>
  </Document>
);
