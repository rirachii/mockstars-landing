import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FBF5E2',
    padding: 40,
    fontFamily: 'Times-Roman',
    fontSize: 10,
    lineHeight: 1.4,
  },
  leftColumn: {
    width: '65%',
    paddingRight: 25,
  },
  rightColumn: {
    width: '35%',
    paddingLeft: 15,
  },
  header: {
    marginBottom: 25,
  },
  name: {
    fontSize: 18,
    fontFamily: 'Times-Bold',
    color: '#D2691E',
    marginBottom: 3,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Times-Italic',
    color: '#CD853F',
    marginBottom: 15,
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
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#333333',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  experienceItem: {
    marginBottom: 20,
  },
  jobHeader: {
    marginBottom: 8,
  },
  company: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#333333',
    marginBottom: 2,
  },
  jobDetails: {
    fontSize: 9,
    color: '#666666',
    marginBottom: 3,
  },
  jobTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#333333',
    marginBottom: 5,
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
    width: 10,
    fontSize: 10,
    color: '#333333',
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    color: '#333333',
    lineHeight: 1.3,
  },
  rightSectionTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#333333',
    marginBottom: 12,
    marginTop: 20,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  skillsList: {
    marginBottom: 20,
  },
  skillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  skillBullet: {
    width: 8,
    fontSize: 10,
    color: '#333333',
    marginRight: 5,
  },
  skillText: {
    fontSize: 10,
    color: '#333333',
    flex: 1,
  },
  educationItem: {
    marginBottom: 12,
  },
  degree: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#333333',
    marginBottom: 2,
  },
  school: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 1,
  },
  educationDate: {
    fontSize: 9,
    color: '#666666',
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

interface MarblesTemplateProps {
  data: ResumeData;
}

export const MarblesTemplate: React.FC<MarblesTemplateProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Left Column */}
      <View style={styles.leftColumn}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalInfo.name}</Text>
          <Text style={styles.title}>{data.personalInfo.title}</Text>
          
          <View style={styles.contactInfo}>
            <Text style={styles.contactItem}>{data.personalInfo.location}</Text>
            <Text style={styles.contactItem}>{data.personalInfo.phone}</Text>
            <Text style={styles.contactItem}>{data.personalInfo.email}</Text>
            {(data.personalInfo.links || []).map((l) => (
              <Text key={l.id} style={styles.contactItem}>{l.label}: {l.url}</Text>
            ))}
          </View>
        </View>

        {/* Summary Section */}
        {data.summary && (
          <Text style={styles.summary}>{data.summary}</Text>
        )}

        {/* Work Experience Section */}
        <Text style={styles.sectionTitle}>Work Experience</Text>
        {data.experience.map((job, index) => (
          <View key={index} style={styles.experienceItem}>
            <View style={styles.jobHeader}>
              <Text style={styles.company}>{job.company}</Text>
              <Text style={styles.jobDetails}>
                {job.location || 'Remote'} • {job.startDate} - {job.endDate}
              </Text>
              <Text style={styles.jobTitle}>{job.title}</Text>
            </View>
            
            <View style={styles.bulletPoints}>
              {(job.bullets || []).map((b, bulletIndex) => (
                <Text key={bulletIndex} style={styles.bullet}>• {b.text}</Text>
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
                <Text style={styles.school}>{edu.school}</Text>
                <Text style={styles.educationDate}>{[edu.startYear, edu.endYear].filter(Boolean).join(' - ')}</Text>
                {edu.gpa && <Text style={styles.educationDate}>GPA: {edu.gpa}</Text>}
              </View>
            ))}
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
      </View>

      {/* Right Column */}
      <View style={styles.rightColumn}>
        {/* Skills Section */}
        {data.skills.length > 0 && (
          <>
            <Text style={styles.rightSectionTitle}>Skills</Text>
            <View style={styles.skillsList}>
              {data.skills.map((skill, index) => (
                <View key={index} style={styles.skillItem}>
                  <Text style={styles.skillBullet}>•</Text>
                  <Text style={styles.skillText}>{typeof skill === 'string' ? skill : (skill as any).name}</Text>
                </View>
              ))}
            </View>
          </>
        )}
      </View>
    </Page>
  </Document>
);
