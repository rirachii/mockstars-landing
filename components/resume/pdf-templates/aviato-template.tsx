import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.4,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  leftColumn: {
    width: '35%',
    paddingRight: 20,
  },
  rightColumn: {
    width: '65%',
    paddingLeft: 10,
  },
  name: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    color: '#FF6B35',
    marginBottom: 5,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: '#F7931E',
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  contactInfo: {
    fontSize: 9,
    color: '#666666',
    lineHeight: 1.3,
  },
  contactItem: {
    marginBottom: 2,
  },
  summary: {
    fontSize: 10,
    color: '#333333',
    lineHeight: 1.4,
    textAlign: 'justify',
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#333333',
    marginTop: 20,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  experienceItem: {
    marginBottom: 15,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#333333',
    flex: 1,
  },
  company: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 3,
  },
  dateLocation: {
    fontSize: 9,
    color: '#666666',
    textAlign: 'right',
    minWidth: 120,
  },
  bulletPoints: {
    marginTop: 5,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 3,
    alignItems: 'flex-start',
  },
  bullet: {
    width: 8,
    fontSize: 10,
    color: '#333333',
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    color: '#333333',
    lineHeight: 1.3,
  },
  educationItem: {
    marginBottom: 8,
  },
  degree: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#333333',
  },
  school: {
    fontSize: 10,
    color: '#666666',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  skillItem: {
    fontSize: 10,
    color: '#333333',
    marginRight: 15,
    marginBottom: 3,
  },
  projectItem: {
    marginBottom: 10,
  },
  projectName: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#333333',
    marginBottom: 2,
  },
  projectDescription: {
    fontSize: 10,
    color: '#333333',
    marginBottom: 2,
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

interface AviatoTemplateProps {
  data: ResumeData;
}

export const AviatoTemplate: React.FC<AviatoTemplateProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.leftColumn}>
          <Text style={styles.name}>{data.personalInfo.name}</Text>
          <View style={styles.contactInfo}>
            <Text style={styles.contactItem}>{data.personalInfo.location}</Text>
            <Text style={styles.contactItem}>{data.personalInfo.phone}</Text>
            <Text style={styles.contactItem}>{data.personalInfo.email}</Text>
            {data.personalInfo.linkedin && (
              <Text style={styles.contactItem}>{data.personalInfo.linkedin}</Text>
            )}
            {data.personalInfo.website && (
              <Text style={styles.contactItem}>{data.personalInfo.website}</Text>
            )}
          </View>
        </View>
        
        <View style={styles.rightColumn}>
          <Text style={styles.title}>{data.personalInfo.title}</Text>
          {data.summary && (
            <Text style={styles.summary}>{data.summary}</Text>
          )}
        </View>
      </View>

      {/* Work Experience Section */}
      <Text style={styles.sectionTitle}>Work Experience</Text>
      {data.experience.map((job, index) => (
        <View key={index} style={styles.experienceItem}>
          <View style={styles.jobHeader}>
            <View style={{ flex: 1 }}>
              <Text style={styles.company}>
                {job.company} • {job.location || 'Remote'} • {job.startDate} - {job.endDate}
              </Text>
              <Text style={styles.jobTitle}>{job.title}</Text>
            </View>
          </View>
          
          <View style={styles.bulletPoints}>
            {job.description.map((bullet, bulletIndex) => (
              <View key={bulletIndex} style={styles.bulletPoint}>
                <Text style={styles.bullet}>-</Text>
                <Text style={styles.bulletText}>{bullet}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}

      {/* Education Section */}
      {data.education.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map((edu, index) => (
            <View key={index} style={styles.educationItem}>
              <Text style={styles.degree}>{edu.degree}</Text>
              <Text style={styles.school}>{edu.school} • {edu.year}</Text>
              {edu.gpa && <Text style={styles.school}>GPA: {edu.gpa}</Text>}
            </View>
          ))}
        </>
      )}

      {/* Skills Section */}
      {data.skills.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsContainer}>
            {data.skills.map((skill, index) => (
              <Text key={index} style={styles.skillItem}>
                {skill}
              </Text>
            ))}
          </View>
        </>
      )}

      {/* Projects Section */}
      {data.projects && data.projects.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Projects</Text>
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
    </Page>
  </Document>
);
