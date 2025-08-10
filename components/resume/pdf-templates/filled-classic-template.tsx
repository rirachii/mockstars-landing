// Classic Template Filled Example
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { mockProfile } from './mock-profile';

// Copy the original styles from classic-template.tsx
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 50,
    fontFamily: 'Times-Roman',
  },
  header: {
    textAlign: 'center',
    marginBottom: 30,
    paddingBottom: 20,
    borderBottom: 1,
    borderBottomColor: '#000',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    fontSize: 12,
    marginBottom: 10,
    fontStyle: 'italic',
  },
  contact: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 10,
  },
  section: {
    marginTop: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    textAlign: 'left',
    borderBottom: 0.5,
    borderBottomColor: '#000',
    paddingBottom: 3,
  },
  experienceItem: {
    marginBottom: 15,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  dates: {
    fontSize: 10,
    fontStyle: 'italic',
  },
  company: {
    fontSize: 10,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 10,
    lineHeight: 1.3,
    marginLeft: 15,
  },
  bulletPoint: {
    fontSize: 10,
    marginBottom: 2,
    paddingLeft: 10,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skill: {
    fontSize: 10,
    marginRight: 15,
    marginBottom: 3,
  },
  twoColumn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftColumn: {
    width: '48%',
  },
  rightColumn: {
    width: '48%',
  },
});

// Filled Classic Template with Mock Data
export const FilledClassicTemplate: React.FC = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.name}>{mockProfile.personalInfo.name}</Text>
        <Text style={styles.title}>{mockProfile.personalInfo.title}</Text>
        <View style={styles.contact}>
          <Text>
            {mockProfile.personalInfo.email} • {mockProfile.personalInfo.phone} • {mockProfile.personalInfo.location}
          </Text>
          <Text style={{ marginTop: 3 }}>
            LinkedIn: {mockProfile.personalInfo.linkedin} • Website: {mockProfile.personalInfo.website}
          </Text>
        </View>
      </View>

      {/* Summary Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Summary</Text>
        <Text style={styles.description}>{mockProfile.summary}</Text>
      </View>

      {/* Experience Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Experience</Text>
        {mockProfile.experience.map((job, index) => (
          <View key={index} style={styles.experienceItem}>
            <View style={styles.jobHeader}>
              <Text style={styles.jobTitle}>{job.title}</Text>
              <Text style={styles.dates}>{job.startDate} - {job.endDate}</Text>
            </View>
            <Text style={styles.company}>{job.company}, {job.location}</Text>
            {job.description.map((bullet, bulletIndex) => (
              <Text key={bulletIndex} style={styles.bulletPoint}>
                • {bullet}
              </Text>
            ))}
          </View>
        ))}
      </View>

      {/* Two Column Layout for Education and Skills */}
      <View style={styles.twoColumn}>
        {/* Education Section */}
        <View style={[styles.section, styles.leftColumn]}>
          <Text style={styles.sectionTitle}>Education</Text>
          {mockProfile.education.map((edu, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text style={styles.jobTitle}>{edu.degree}</Text>
              <Text style={styles.company}>{edu.school}</Text>
              <Text style={styles.dates}>{edu.year}</Text>
              {edu.gpa && <Text style={styles.dates}>GPA: {edu.gpa}</Text>}
            </View>
          ))}
        </View>

        {/* Skills Section */}
        <View style={[styles.section, styles.rightColumn]}>
          <Text style={styles.sectionTitle}>Technical Skills</Text>
          <View style={styles.skillsGrid}>
            {mockProfile.skills.slice(0, 16).map((skill, index) => (
              <Text key={index} style={styles.skill}>• {skill}</Text>
            ))}
          </View>
        </View>
      </View>

      {/* Projects Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notable Projects</Text>
        {mockProfile.projects?.map((project, index) => (
          <View key={index} style={styles.experienceItem}>
            <Text style={styles.jobTitle}>{project.name}</Text>
            <Text style={styles.description}>{project.description}</Text>
            <Text style={[styles.description, { fontStyle: 'italic', marginTop: 3 }]}>
              Technologies: {project.technologies.join(', ')}
            </Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);
