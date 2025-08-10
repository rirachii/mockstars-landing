import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.4,
  },
  leftColumn: {
    width: '35%',
    backgroundColor: '#37474F',
    color: '#FFFFFF',
    padding: 30,
    paddingTop: 40,
  },
  rightColumn: {
    width: '65%',
    padding: 40,
    paddingLeft: 35,
  },
  headerSection: {
    marginBottom: 30,
  },
  name: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
    lineHeight: 1.2,
  },
  title: {
    fontSize: 12,
    color: '#B0BEC5',
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  contactInfo: {
    fontSize: 9,
    color: '#CFD8DC',
    lineHeight: 1.3,
  },
  contactItem: {
    marginBottom: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactIcon: {
    width: 12,
    marginRight: 8,
    fontSize: 9,
    color: '#78909C',
  },
  leftSectionTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#FFFFFF',
    marginBottom: 12,
    marginTop: 25,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    borderBottom: '1px solid #546E7A',
    paddingBottom: 5,
  },
  firstLeftSectionTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#FFFFFF',
    marginBottom: 12,
    marginTop: 0,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    borderBottom: '1px solid #546E7A',
    paddingBottom: 5,
  },
  skillsList: {
    marginBottom: 20,
  },
  skillItem: {
    fontSize: 10,
    color: '#CFD8DC',
    marginBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  skillBullet: {
    width: 8,
    marginRight: 8,
    fontSize: 10,
    color: '#78909C',
  },
  educationItem: {
    marginBottom: 15,
  },
  degree: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#FFFFFF',
    marginBottom: 3,
  },
  school: {
    fontSize: 9,
    color: '#B0BEC5',
    marginBottom: 2,
  },
  educationDate: {
    fontSize: 9,
    color: '#78909C',
  },
  rightSectionTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#37474F',
    marginBottom: 15,
    marginTop: 25,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  firstRightSectionTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#37474F',
    marginBottom: 15,
    marginTop: 0,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  summary: {
    fontSize: 11,
    color: '#333333',
    lineHeight: 1.6,
    textAlign: 'justify',
    marginBottom: 20,
  },
  experienceItem: {
    marginBottom: 25,
    borderLeft: '3px solid #546E7A',
    paddingLeft: 15,
  },
  jobHeader: {
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#37474F',
    marginBottom: 3,
  },
  companyInfo: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 8,
  },
  bulletPoints: {
    marginTop: 5,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 4,
    alignItems: 'flex-start',
  },
  bullet: {
    width: 12,
    fontSize: 10,
    color: '#546E7A',
    marginRight: 5,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    color: '#333333',
    lineHeight: 1.4,
  },
  projectItem: {
    marginBottom: 18,
    padding: 15,
    backgroundColor: '#F5F5F5',
    borderLeft: '4px solid #37474F',
  },
  projectName: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#37474F',
    marginBottom: 5,
  },
  projectDescription: {
    fontSize: 10,
    color: '#333333',
    marginBottom: 5,
  },
  technologies: {
    fontSize: 9,
    color: '#666666',
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

interface ChromeBoneTemplateProps {
  data: ResumeData;
}

export const ChromeBoneTemplate: React.FC<ChromeBoneTemplateProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Left Column (Dark) */}
      <View style={styles.leftColumn}>
        {/* Header */}
        <View style={styles.headerSection}>
          <Text style={styles.name}>{data.personalInfo.name}</Text>
          <Text style={styles.title}>{data.personalInfo.title}</Text>
          
          <View style={styles.contactInfo}>
            <View style={styles.contactItem}>
              <Text style={styles.contactIcon}>●</Text>
              <Text>{data.personalInfo.email}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactIcon}>●</Text>
              <Text>{data.personalInfo.phone}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactIcon}>●</Text>
              <Text>{data.personalInfo.location}</Text>
            </View>
            {data.personalInfo.linkedin && (
              <View style={styles.contactItem}>
                <Text style={styles.contactIcon}>●</Text>
                <Text>{data.personalInfo.linkedin}</Text>
              </View>
            )}
            {data.personalInfo.website && (
              <View style={styles.contactItem}>
                <Text style={styles.contactIcon}>●</Text>
                <Text>{data.personalInfo.website}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Skills */}
        {data.skills.length > 0 && (
          <>
            <Text style={styles.firstLeftSectionTitle}>Skills</Text>
            <View style={styles.skillsList}>
              {data.skills.map((skill, index) => (
                <View key={index} style={styles.skillItem}>
                  <Text style={styles.skillBullet}>▸</Text>
                  <Text>{skill}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <>
            <Text style={styles.leftSectionTitle}>Education</Text>
            {data.education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <Text style={styles.degree}>{edu.degree}</Text>
                <Text style={styles.school}>{edu.school}</Text>
                <Text style={styles.educationDate}>{edu.year}</Text>
                {edu.gpa && <Text style={styles.educationDate}>GPA: {edu.gpa}</Text>}
              </View>
            ))}
          </>
        )}
      </View>

      {/* Right Column (Light) */}
      <View style={styles.rightColumn}>
        {/* Professional Summary */}
        {data.summary && (
          <>
            <Text style={styles.firstRightSectionTitle}>Professional Summary</Text>
            <Text style={styles.summary}>{data.summary}</Text>
          </>
        )}

        {/* Experience */}
        <Text style={styles.rightSectionTitle}>Experience</Text>
        {data.experience.map((job, index) => (
          <View key={index} style={styles.experienceItem}>
            <View style={styles.jobHeader}>
              <Text style={styles.jobTitle}>{job.title}</Text>
              <Text style={styles.companyInfo}>
                {job.company} ��� {job.location || 'Remote'} • {job.startDate} - {job.endDate}
              </Text>
            </View>
            
            <View style={styles.bulletPoints}>
              {job.description.map((bullet, bulletIndex) => (
                <View key={bulletIndex} style={styles.bulletPoint}>
                  <Text style={styles.bullet}>▪</Text>
                  <Text style={styles.bulletText}>{bullet}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <>
            <Text style={styles.rightSectionTitle}>Projects</Text>
            {data.projects.map((project, index) => (
              <View key={index} style={styles.projectItem}>
                <Text style={styles.projectName}>{project.name}</Text>
                <Text style={styles.projectDescription}>{project.description}</Text>
                <Text style={styles.technologies}>
                  Technologies: {project.technologies.join(', ')}
                </Text>
              </View>
            ))}
          </>
        )}
      </View>
    </Page>
  </Document>
);
