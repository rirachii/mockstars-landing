// Modern Template Filled Example with MockStars Brand Colors
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { mockProfile } from './mock-profile';

// Using MockStars brand colors from style sheet
const BRAND_COLOR = '#397DC2'; // Main color from MockStars style sheet
const BACKGROUND_COLOR = '#FBF5E2'; // Background color from style sheet
const DARK_GREY = '#D3D0CE'; // Dark grey from style sheet

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
    borderBottomColor: BRAND_COLOR,
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: BRAND_COLOR,
    marginBottom: 5,
    lineHeight: 1.2,
  },
  title: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 10,
    lineHeight: 1.2,
  },
  contact: {
    fontSize: 10,
    color: '#666666',
    flexDirection: 'row',
    justifyContent: 'space-between',
    lineHeight: 1.2,
  },
  section: {
    marginTop: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: BRAND_COLOR,
    marginBottom: 8,
    textTransform: 'uppercase',
    borderBottom: 1,
    borderBottomColor: BRAND_COLOR,
    paddingBottom: 2,
    lineHeight: 1.2,
  },
  experienceItem: {
    marginBottom: 12,
    backgroundColor: BACKGROUND_COLOR,
    padding: 12,
    borderRadius: 4,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333333',
    lineHeight: 1.2,
  },
  company: {
    fontSize: 11,
    color: '#666666',
    marginBottom: 2,
    lineHeight: 1.2,
  },
  dates: {
    fontSize: 10,
    color: '#888888',
    marginBottom: 4,
    lineHeight: 1.2,
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
    backgroundColor: BACKGROUND_COLOR,
    padding: 4,
    borderRadius: 3,
    marginRight: 5,
    marginBottom: 5,
    lineHeight: 1.2,
    border: `1px solid ${DARK_GREY}`,
  },
  bulletPoint: {
    fontSize: 10,
    marginBottom: 3,
    color: '#333333',
    paddingLeft: 10,
    lineHeight: 1.4,
  },
  summaryBox: {
    backgroundColor: BACKGROUND_COLOR,
    padding: 12,
    borderRadius: 4,
    borderLeft: `4px solid ${BRAND_COLOR}`,
  },
  projectItem: {
    marginBottom: 12,
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 4,
    borderLeft: `3px solid ${BRAND_COLOR}`,
  },
  projectName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: BRAND_COLOR,
    marginBottom: 3,
  },
  technologies: {
    fontSize: 9,
    color: '#666666',
    fontStyle: 'italic',
    marginTop: 3,
  },
});

export const FilledModernTemplate: React.FC = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.name}>{mockProfile.personalInfo.name}</Text>
        <Text style={styles.title}>{mockProfile.personalInfo.title}</Text>
        <View style={styles.contact}>
          <Text>{mockProfile.personalInfo.email}</Text>
          <Text>{mockProfile.personalInfo.phone}</Text>
          <Text>{mockProfile.personalInfo.location}</Text>
        </View>
        <View style={[styles.contact, { marginTop: 5 }]}>
          <Text>{mockProfile.personalInfo.linkedin}</Text>
          <Text>{mockProfile.personalInfo.website}</Text>
        </View>
      </View>

      {/* Summary Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Summary</Text>
        <View style={styles.summaryBox}>
          <Text style={styles.description}>{mockProfile.summary}</Text>
        </View>
      </View>

      {/* Experience Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Experience</Text>
        {mockProfile.experience.map((job, index) => (
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

      {/* Skills Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Technical Skills</Text>
        <View style={styles.skillsContainer}>
          {mockProfile.skills.map((skill, index) => (
            <Text key={index} style={styles.skill}>{skill}</Text>
          ))}
        </View>
      </View>

      {/* Education Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        {mockProfile.education.map((edu, index) => (
          <View key={index} style={styles.experienceItem}>
            <Text style={styles.jobTitle}>{edu.degree}</Text>
            <Text style={styles.company}>{edu.school}</Text>
            <Text style={styles.dates}>{edu.year}</Text>
            {edu.gpa && <Text style={styles.description}>GPA: {edu.gpa}</Text>}
          </View>
        ))}
      </View>

      {/* Projects Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notable Projects</Text>
        {mockProfile.projects?.map((project, index) => (
          <View key={index} style={styles.projectItem}>
            <Text style={styles.projectName}>{project.name}</Text>
            <Text style={styles.description}>{project.description}</Text>
            <Text style={styles.technologies}>
              Technologies: {project.technologies.join(', ')}
            </Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);
