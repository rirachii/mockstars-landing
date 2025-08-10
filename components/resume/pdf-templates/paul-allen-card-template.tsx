import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FCFCFC',
    padding: 60,
    fontFamily: 'Times-Roman',
    fontSize: 11,
    lineHeight: 1.5,
  },
  header: {
    textAlign: 'center',
    marginBottom: 40,
    borderBottom: '1px solid #E0E0E0',
    paddingBottom: 30,
  },
  name: {
    fontSize: 28,
    fontFamily: 'Times-Bold',
    color: '#2E2E2E',
    marginBottom: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 14,
    fontFamily: 'Times-Italic',
    color: '#666666',
    marginBottom: 20,
    letterSpacing: 1,
  },
  contactInfo: {
    fontSize: 10,
    color: '#666666',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  contactItem: {
    marginHorizontal: 12,
  },
  contactSeparator: {
    marginHorizontal: 8,
    color: '#CCCCCC',
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Times-Bold',
    color: '#2E2E2E',
    marginTop: 35,
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
    borderTop: '1px solid #E0E0E0',
    borderBottom: '1px solid #E0E0E0',
    paddingVertical: 8,
  },
  firstSectionTitle: {
    fontSize: 12,
    fontFamily: 'Times-Bold',
    color: '#2E2E2E',
    marginTop: 0,
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
    borderTop: '1px solid #E0E0E0',
    borderBottom: '1px solid #E0E0E0',
    paddingVertical: 8,
  },
  summary: {
    fontSize: 11,
    color: '#333333',
    lineHeight: 1.7,
    textAlign: 'center',
    marginBottom: 30,
    fontStyle: 'italic',
    paddingHorizontal: 40,
  },
  experienceItem: {
    marginBottom: 30,
    textAlign: 'center',
    borderBottom: '1px dotted #DDDDDD',
    paddingBottom: 25,
  },
  jobHeader: {
    marginBottom: 12,
  },
  jobTitle: {
    fontSize: 13,
    fontFamily: 'Times-Bold',
    color: '#2E2E2E',
    marginBottom: 5,
    letterSpacing: 1,
  },
  companyInfo: {
    fontSize: 11,
    color: '#666666',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  bulletPoints: {
    marginTop: 10,
    textAlign: 'left',
    paddingHorizontal: 40,
  },
  bulletPoint: {
    marginBottom: 8,
    fontSize: 11,
    color: '#333333',
    lineHeight: 1.6,
    textAlign: 'justify',
  },
  bulletPrefix: {
    fontFamily: 'Times-Bold',
    color: '#666666',
    marginRight: 8,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  skillItem: {
    fontSize: 11,
    color: '#333333',
    backgroundColor: '#F8F8F8',
    padding: 8,
    margin: 4,
    borderRadius: 2,
    border: '1px solid #E8E8E8',
    textAlign: 'center',
    minWidth: 80,
  },
  educationSection: {
    textAlign: 'center',
  },
  educationItem: {
    marginBottom: 20,
  },
  degree: {
    fontSize: 12,
    fontFamily: 'Times-Bold',
    color: '#2E2E2E',
    marginBottom: 5,
    letterSpacing: 1,
  },
  school: {
    fontSize: 11,
    color: '#666666',
    marginBottom: 3,
    fontStyle: 'italic',
  },
  educationDate: {
    fontSize: 10,
    color: '#888888',
  },
  projectsSection: {
    textAlign: 'center',
  },
  projectItem: {
    marginBottom: 25,
    padding: 20,
    backgroundColor: '#F9F9F9',
    border: '1px solid #EEEEEE',
  },
  projectName: {
    fontSize: 12,
    fontFamily: 'Times-Bold',
    color: '#2E2E2E',
    marginBottom: 8,
    letterSpacing: 1,
  },
  projectDescription: {
    fontSize: 11,
    color: '#333333',
    marginBottom: 8,
    lineHeight: 1.6,
    textAlign: 'center',
  },
  technologies: {
    fontSize: 10,
    color: '#666666',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  signature: {
    marginTop: 40,
    textAlign: 'center',
    borderTop: '1px solid #E0E0E0',
    paddingTop: 20,
  },
  signatureText: {
    fontSize: 10,
    color: '#AAAAAA',
    fontStyle: 'italic',
    letterSpacing: 1,
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

interface PaulAllenCardTemplateProps {
  data: ResumeData;
}

export const PaulAllenCardTemplate: React.FC<PaulAllenCardTemplateProps> = ({ data }) => {
  const formatContactInfo = () => {
    const parts = [];
    if (data.personalInfo.email) parts.push(data.personalInfo.email);
    if (data.personalInfo.phone) parts.push(data.personalInfo.phone);
    if (data.personalInfo.location) parts.push(data.personalInfo.location);
    if (data.personalInfo.linkedin) parts.push(data.personalInfo.linkedin);
    if (data.personalInfo.website) parts.push(data.personalInfo.website);
    
    return parts.map((part, index) => (
      <React.Fragment key={index}>
        <Text style={styles.contactItem}>{part}</Text>
        {index < parts.length - 1 && <Text style={styles.contactSeparator}>•</Text>}
      </React.Fragment>
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

        {/* Professional Summary */}
        {data.summary && (
          <>
            <Text style={styles.firstSectionTitle}>Professional Summary</Text>
            <Text style={styles.summary}>"{data.summary}"</Text>
          </>
        )}

        {/* Professional Experience */}
        <Text style={styles.sectionTitle}>Professional Experience</Text>
        {data.experience.map((job, index) => (
          <View key={index} style={styles.experienceItem}>
            <View style={styles.jobHeader}>
              <Text style={styles.jobTitle}>{job.title}</Text>
              <Text style={styles.companyInfo}>
                {job.company} • {job.location || 'Remote'} • {job.startDate} - {job.endDate}
              </Text>
            </View>
            
            <View style={styles.bulletPoints}>
              {job.description.map((bullet, bulletIndex) => (
                <Text key={bulletIndex} style={styles.bulletPoint}>
                  <Text style={styles.bulletPrefix}>◦</Text>
                  {bullet}
                </Text>
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
            <View style={styles.educationSection}>
              {data.education.map((edu, index) => (
                <View key={index} style={styles.educationItem}>
                  <Text style={styles.degree}>{edu.degree}</Text>
                  <Text style={styles.school}>{edu.school}</Text>
                  <Text style={styles.educationDate}>
                    {edu.year} {edu.gpa && `• Magna Cum Laude • GPA: ${edu.gpa}`}
                  </Text>
                </View>
              ))}
            </View>
          </>
        )}

        {/* Notable Achievements */}
        {data.projects && data.projects.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Notable Achievements</Text>
            <View style={styles.projectsSection}>
              {data.projects.map((project, index) => (
                <View key={index} style={styles.projectItem}>
                  <Text style={styles.projectName}>{project.name}</Text>
                  <Text style={styles.projectDescription}>{project.description}</Text>
                  <Text style={styles.technologies}>
                    {project.technologies.join(' • ')}
                  </Text>
                </View>
              ))}
            </View>
          </>
        )}

        {/* Signature */}
        <View style={styles.signature}>
          <Text style={styles.signatureText}>
            "Look at that subtle off-white coloring. The tasteful thickness."
          </Text>
        </View>
      </Page>
    </Document>
  );
};
