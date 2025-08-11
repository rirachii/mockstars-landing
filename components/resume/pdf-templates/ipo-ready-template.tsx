import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/lib/resume/resume-data';
import { TemplateCustomization } from '@/lib/resume/template-types';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 50,
    fontFamily: 'Helvetica',
    fontSize: 11,
    lineHeight: 1.4,
  },
  header: {
    textAlign: 'center',
    marginBottom: 30,
    borderBottom: '2px solid #1565C0',
    paddingBottom: 20,
  },
  name: {
    fontSize: 26,
    fontFamily: 'Helvetica-Bold',
    color: '#1565C0',
    marginBottom: 8,
    letterSpacing: 1,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Helvetica',
    color: '#1976D2',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  contactInfo: {
    fontSize: 10,
    color: '#666666',
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
    color: '#1565C0',
    marginTop: 25,
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottom: '1px solid #1565C0',
    paddingBottom: 5,
  },
  firstSectionTitle: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    color: '#1565C0',
    marginTop: 0,
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottom: '1px solid #1565C0',
    paddingBottom: 5,
  },
  summary: {
    fontSize: 11,
    color: '#333333',
    lineHeight: 1.6,
    textAlign: 'justify',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  experienceItem: {
    marginBottom: 20,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    alignItems: 'baseline',
  },
  jobTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#333333',
    flex: 1,
  },
  dateRange: {
    fontSize: 11,
    color: '#1976D2',
    fontFamily: 'Helvetica-Bold',
    minWidth: 120,
    textAlign: 'right',
  },
  company: {
    fontSize: 11,
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
    width: 15,
    fontSize: 11,
    color: '#1565C0',
    fontFamily: 'Helvetica-Bold',
  },
  bulletText: {
    flex: 1,
    fontSize: 11,
    color: '#333333',
    lineHeight: 1.5,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  skillItem: {
    fontSize: 11,
    color: '#333333',
    backgroundColor: '#F5F5F5',
    padding: 5,
    marginRight: 10,
    marginBottom: 5,
    borderRadius: 3,
    borderLeft: '3px solid #1565C0',
  },
  educationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'baseline',
  },
  degree: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#333333',
    flex: 1,
  },
  educationDate: {
    fontSize: 11,
    color: '#1976D2',
    fontFamily: 'Helvetica-Bold',
    minWidth: 80,
    textAlign: 'right',
  },
  school: {
    fontSize: 11,
    color: '#666666',
    marginTop: 2,
  },
  projectItem: {
    marginBottom: 15,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    alignItems: 'baseline',
  },
  projectName: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#333333',
    flex: 1,
  },
  projectDate: {
    fontSize: 11,
    color: '#1976D2',
    minWidth: 100,
    textAlign: 'right',
  },
  projectDescription: {
    fontSize: 11,
    color: '#333333',
    marginBottom: 3,
  },
  technologies: {
    fontSize: 10,
    color: '#666666',
    fontStyle: 'italic',
  },
});




interface IpoReadyTemplateProps {
  data: ResumeData;
  customization?: TemplateCustomization
}

export const IpoReadyTemplate: React.FC<IpoReadyTemplateProps> = ({ data }) => {
  const formatContactInfo = () => {
    const parts = [];
    if (data.personalInfo.email) parts.push(data.personalInfo.email);
    if (data.personalInfo.phone) parts.push(data.personalInfo.phone);
    if (data.personalInfo.location) parts.push(data.personalInfo.location);
    if (data.personalInfo.links) parts.push(data.personalInfo.links.map((link) => link.url));
    
    return parts.map((part, index) => (
      <Text key={index} style={styles.contactItem}>{part}</Text>
    ));
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalInfo.name}</Text>
          <Text style={styles.title}>{data.personalInfo.title}</Text>
          <View style={styles.contactInfo}>
            {formatContactInfo()}
          </View>
        </View>

        {/* Executive Summary */}
        {data.summary && (
          <>
            <Text style={styles.firstSectionTitle}>Executive Summary</Text>
            <Text style={styles.summary}>{data.summary}</Text>
          </>
        )}

        {/* Professional Experience */}
        <Text style={styles.sectionTitle}>Professional Experience</Text>
        {data.experience.map((job, index) => (
          <View key={index} style={styles.experienceItem}>
            <View style={styles.jobHeader}>
              <Text style={styles.jobTitle}>{job.title}</Text>
              <Text style={styles.dateRange}>
                {job.startDate} - {job.endDate}
              </Text>
            </View>
            <Text style={styles.company}>
              {job.company} • {job.location || 'Remote'}
            </Text>
            
            <View style={styles.bulletPoints}>
              {(job.bullets || []).map((b, bulletIndex) => (
                <View key={bulletIndex} style={styles.bulletPoint}>
                  <Text style={styles.bullet}>• {b.text}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Core Competencies */}
        {data.skills.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Core Competencies</Text>
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
              <View key={index}>
                <View style={styles.educationItem}>
                  <Text style={styles.degree}>{edu.degree}</Text>
                  <Text style={styles.educationDate}>{[edu.startYear, edu.endYear].filter(Boolean).join(' - ')}</Text>
                </View>
                <Text style={styles.school}>
                  {edu.school} {edu.gpa && `• GPA: ${edu.gpa}`}
                </Text>
              </View>
            ))}
          </>
        )}

        {/* Key Achievements */}
        {data.projects && data.projects.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Key Achievements</Text>
            {data.projects.map((project, index) => (
              <View key={index} style={styles.projectItem}>
                <View style={styles.projectHeader}>
                  <Text style={styles.projectName}>{project.name}</Text>
                  <Text style={styles.projectDate}>{project.technologies[0] || 'Recent'}</Text>
                </View>
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
};
